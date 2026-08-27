import React, { useState, useEffect } from 'react';

const SECTIONS = [
  ['brand', 'Thương hiệu'],
  ['navigation', 'Menu & dropdown'],
  ['hero', 'Hero'],
  ['stats', 'Chỉ số'],
  ['services', 'Dịch vụ'],
  ['projects', 'Dự án'],
  ['process', 'Quy trình'],
  ['cta', 'CTA & Liên hệ'],
  ['seo', 'SEO'],
];

const COLLECTION_TEMPLATES = {
  stats: { value: '00+', label: 'chỉ số mới' },
  services: { number: '01', title: 'Dịch vụ mới', description: 'Mô tả dịch vụ', tags: [] },
  projects: { category: 'NEW PROJECT', title: 'Dự án mới', description: 'Mô tả dự án', metric: '0%', metricLabel: 'kết quả', color: 'cyan' },
  process: { step: '01', title: 'Bước mới', text: 'Mô tả bước' }
};

export default function AdminApp() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('brand');
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTokenInput, setLoginTokenInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(null); // { message: '', isError: false }

  // Modal states for CRUD operations
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [activeCollection, setActiveCollection] = useState(null); // 'stats' | 'services' | 'projects' | 'process'
  const [currentItem, setCurrentItem] = useState(null); // the item structure being edited/created

  const verifyToken = async (t) => {
    try {
      const r = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: t })
      });
      const res = await r.json();
      return r.ok && res.valid;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('admin_token');
      if (savedToken) {
        const isValid = await verifyToken(savedToken);
        if (isValid) {
          setToken(savedToken);
          setIsLoggedIn(true);
          loadData();
        } else {
          localStorage.removeItem('admin_token');
          setToken('');
        }
      }
    };
    initAuth();
  }, []);

  const loadData = () => {
    fetch('/api/site')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load data');
        return r.json();
      })
      .then((d) => setData(d))
      .catch((err) => {
        console.error(err);
        showNotice('Không thể tải dữ liệu cấu hình.', true);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const isValid = await verifyToken(loginTokenInput);
    if (isValid) {
      localStorage.setItem('admin_token', loginTokenInput);
      setToken(loginTokenInput);
      setIsLoggedIn(true);
      loadData();
    } else {
      setLoginError('Mã quản trị không chính xác.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsLoggedIn(false);
    setData(null);
  };

  const showNotice = (msg, error = false) => {
    setNotice({ message: msg, isError: error });
    setTimeout(() => {
      setNotice(null);
    }, 3000);
  };

  const handleSaveSetting = async (key) => {
    if (!data) return;
    const payload = key === 'cta' ? { cta: data.cta, contact: data.contact } : data[key];

    try {
      if (key === 'cta') {
        const rCta = await fetch('/api/settings/cta', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data.cta),
        });
        if (!rCta.ok) {
          const out = await rCta.json();
          throw new Error(out.error || 'Lỗi cập nhật CTA');
        }

        const rContact = await fetch('/api/settings/contact', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data.contact),
        });
        if (!rContact.ok) {
          const out = await rContact.json();
          throw new Error(out.error || 'Lỗi cập nhật Contact');
        }
      } else {
        const r = await fetch(`/api/settings/${key}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const out = await r.json();
        if (!r.ok) throw new Error(out.error || 'Network error occurred');
      }

      showNotice(`Đã lưu và cập nhật cấu hình thành công.`);
    } catch (err) {
      showNotice(err.message, true);
    }
  };

  const setNestedField = (path, value) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      const lastKey = parts[parts.length - 1];
      current[lastKey] = value;
      return copy;
    });
  };

  const renderField = (path, label, area = false, full = false) => {
    const parts = path.split('.');
    let val = data;
    for (const part of parts) {
      if (val === undefined || val === null) break;
      val = val[part];
    }

    const valueStr = val !== undefined && val !== null ? String(val) : '';

    return (
      <label className={`field ${full ? 'full' : ''}`} key={path}>
        <span>{label}</span>
        {area ? (
          <textarea
            value={valueStr}
            onChange={(e) => setNestedField(path, e.target.value)}
          />
        ) : (
          <input
            type="text"
            value={valueStr}
            onChange={(e) => setNestedField(path, e.target.value)}
          />
        )}
      </label>
    );
  };

  // CRUD Item Click Handlers
  const openCreateModal = (collection) => {
    setActiveCollection(collection);
    setModalMode('create');
    const template = JSON.parse(JSON.stringify(COLLECTION_TEMPLATES[collection]));
    if (collection === 'services') {
      template.number = String(data.services.length + 1).padStart(2, '0');
    }
    if (collection === 'process') {
      template.step = String(data.process.length + 1).padStart(2, '0');
    }
    setCurrentItem(template);
    setModalOpen(true);
  };

  const openEditModal = (collection, item) => {
    setActiveCollection(collection);
    setModalMode('edit');
    setCurrentItem(JSON.parse(JSON.stringify(item)));
    setModalOpen(true);
  };

  const handleDeleteItem = async (collection, id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.')) return;

    try {
      const r = await fetch(`/api/${collection}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const out = await r.json();
      if (!r.ok) throw new Error(out.error || 'Failed to delete item');

      setData((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        copy[collection] = copy[collection].filter((x) => x._id !== id);
        return copy;
      });
      showNotice('Đã xóa phần tử thành công.');
    } catch (err) {
      showNotice(err.message, true);
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    if (!currentItem) return;

    try {
      const isEdit = modalMode === 'edit';
      const url = isEdit ? `/api/${activeCollection}/${currentItem._id}` : `/api/${activeCollection}`;
      const method = isEdit ? 'PUT' : 'POST';

      const r = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem),
      });

      const out = await r.json();
      if (!r.ok) throw new Error(out.error || 'Failed to save item');

      setData((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if (isEdit) {
          copy[activeCollection] = copy[activeCollection].map((x) => (x._id === out._id ? out : x));
        } else {
          copy[activeCollection].push(out);
        }
        return copy;
      });

      setModalOpen(false);
      showNotice(isEdit ? 'Đã cập nhật phần tử thành công.' : 'Đã thêm mới phần tử thành công.');
    } catch (err) {
      showNotice(err.message, true);
    }
  };

  const updateCurrentItemField = (key, value) => {
    setCurrentItem((prev) => {
      if (!prev) return null;
      if (key === 'tags') {
        return {
          ...prev,
          tags: value.split(',').map((x) => x.trim()).filter(Boolean)
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  };

  // Custom Navigation update logic
  const handleAddNavItem = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.navigation.items.push({ label: 'Menu mới', href: '#' });
      return copy;
    });
  };

  const handleRemoveNavItem = (idx) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.navigation.items.splice(idx, 1);
      return copy;
    });
  };

  const handleAddSolutionGroup = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.navigation.solutionGroups.push({ title: 'Nhóm giải pháp mới', href: '#services', children: [] });
      return copy;
    });
  };

  const handleRemoveSolutionGroup = (idx) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.navigation.solutionGroups.splice(idx, 1);
      return copy;
    });
  };

  const handleAddSolutionChild = (groupIndex) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const group = copy.navigation.solutionGroups[groupIndex];
      if (!group.children) group.children = [];
      group.children.push({ label: 'Mục con mới', href: '#services' });
      return copy;
    });
  };

  const handleRemoveSolutionChild = (groupIndex, childIndex) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.navigation.solutionGroups[groupIndex].children.splice(childIndex, 1);
      return copy;
    });
  };

  // Auth gate
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src="/logo-tag-transparent.png" alt="TAGTECH" />
          </div>
          <h2>TAGTECH Content Studio</h2>
          <p>Nhập mã quản trị để tiếp tục</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="field">
              <span>Mã quản trị</span>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mã bảo mật..."
                  value={loginTokenInput}
                  onChange={(e) => setLoginTokenInput(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {loginError && <span className="login-error">{loginError}</span>}
            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-loading">
        Đang tải trang quản trị...
      </div>
    );
  }

  return (
    <>
      <aside>
        <a className="brand brand-logo" href="/">
          <img src="/logo-tag-transparent.png" alt="TAG Technology Group" />
        </a>
        <p>CONTENT STUDIO</p>
        <nav id="tabs">
          {SECTIONS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={activeTab === id ? 'active' : ''}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="aside-foot">
          <span>
            <i style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', marginRight: '7px' }}></i> API ONLINE
          </span>
          <button type="button" onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
          <a href="/" target="_blank" rel="noreferrer" style={{ marginTop: '10px' }}>
            Mở website ↗
          </a>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <small>WEBSITE CONTENT</small>
            <h1>Quản trị nội dung</h1>
          </div>
          <div className="actions">
            <span className="admin-status">
              <i></i>
              Đã xác thực quản trị
            </span>
          </div>
        </header>

        {notice && (
          <div id="notice" className={`show ${notice.isError ? 'error' : ''}`}>
            {notice.message}
          </div>
        )}

        <div id="editor-container">
          {/* Brand */}
          {activeTab === 'brand' && (
            <section className="panel active">
              <div className="panel-title">
                <h2>Thương hiệu</h2>
                <p>Thông tin nhận diện xuất hiện toàn trang</p>
              </div>
              <div className="grid">
                {renderField('brand.name', 'Tên thương hiệu')}
                {renderField('brand.tagline', 'Tagline')}
              </div>
              <button className="singleton-save" onClick={() => handleSaveSetting('brand')}>
                Lưu thương hiệu
              </button>
            </section>
          )}

          {/* Navigation */}
          {activeTab === 'navigation' && (
            <section className="panel active">
              <div className="panel-title">
                <h2>Menu & dropdown</h2>
                <p>Chỉnh sửa nội dung và liên kết hiển thị trên thanh điều hướng</p>
              </div>

              <h3 className="subheading">MENU CHÍNH</h3>
              <div className="collection">
                {data.navigation.items.map((item, idx) => (
                  <div className="item" key={idx}>
                    <h3>MENU {String(idx + 1).padStart(2, '0')}</h3>
                    <button
                      type="button"
                      className="remove"
                      onClick={() => handleRemoveNavItem(idx)}
                    >
                      ×
                    </button>
                    <div className="item-grid">
                      {renderField(`navigation.items.${idx}.label`, 'Nhãn')}
                      {renderField(`navigation.items.${idx}.href`, 'Liên kết')}
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="add" onClick={handleAddNavItem}>
                + Thêm menu
              </button>

              <h3 className="subheading dropdown-heading">NỘI DUNG DROPDOWN GIẢI PHÁP</h3>
              <div className="collection">
                {data.navigation.solutionGroups.map((group, idx) => (
                  <div className="item dropdown-item" key={idx}>
                    <h3>NHÓM DROPDOWN {String(idx + 1).padStart(2, '0')}</h3>
                    <button
                      type="button"
                      className="remove"
                      onClick={() => handleRemoveSolutionGroup(idx)}
                    >
                      ×
                    </button>
                    <div className="item-grid">
                      {renderField(`navigation.solutionGroups.${idx}.title`, 'Tiêu đề')}
                      {renderField(`navigation.solutionGroups.${idx}.href`, 'Liên kết')}
                    </div>
                    <div className="children">
                      <h4>MỤC CON</h4>
                      {(group.children || []).map((child, cIdx) => (
                        <div className="child-row" key={cIdx}>
                          {renderField(`navigation.solutionGroups.${idx}.children.${cIdx}.label`, 'Nhãn')}
                          {renderField(`navigation.solutionGroups.${idx}.children.${cIdx}.href`, 'Liên kết')}
                          <button
                            type="button"
                            className="remove-child"
                            aria-label="Xóa mục con"
                            onClick={() => handleRemoveSolutionChild(idx, cIdx)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-child"
                        onClick={() => handleAddSolutionChild(idx)}
                      >
                        + Thêm mục con
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="add" onClick={handleAddSolutionGroup}>
                + Thêm nhóm dropdown
              </button>
              <div style={{ marginTop: '20px' }}>
                <button className="singleton-save" onClick={() => handleSaveSetting('navigation')}>
                  Lưu cấu hình Menu
                </button>
              </div>
            </section>
          )}

          {/* Hero */}
          {activeTab === 'hero' && (
            <section className="panel active">
              <div className="panel-title">
                <h2>Khu vực mở đầu</h2>
                <p>Thông điệp quan trọng nhất khi khách hàng truy cập</p>
              </div>
              <div className="grid">
                {renderField('hero.eyebrow', 'Nhãn nhỏ', true, true)}
                {renderField('hero.title', 'Tiêu đề', true, true)}
                {renderField('hero.description', 'Mô tả', true, true)}
                {renderField('hero.primaryCta', 'Nút chính')}
                {renderField('hero.secondaryCta', 'Nút phụ')}
              </div>
              <button className="singleton-save" onClick={() => handleSaveSetting('hero')}>
                Lưu Hero
              </button>
            </section>
          )}

          {/* Stats */}
          {activeTab === 'stats' && (
            <section className="panel active">
              <div className="panel-header">
                <div className="panel-title">
                  <h2>Chỉ số</h2>
                  <p>Các con số tạo dựng niềm tin</p>
                </div>
                <button className="btn-create-new" onClick={() => openCreateModal('stats')}>
                  + Thêm chỉ số mới
                </button>
              </div>
              <div className="crud-list">
                {data.stats.map((stat) => (
                  <div className="crud-item" key={stat._id}>
                    <div className="crud-info">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                    <div className="crud-actions">
                      <button className="btn-edit" onClick={() => openEditModal('stats', stat)}>
                        Sửa
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteItem('stats', stat._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          {activeTab === 'services' && (
            <section className="panel active">
              <div className="panel-header">
                <div className="panel-title">
                  <h2>Dịch vụ</h2>
                  <p>Năng lực cốt lõi của doanh nghiệp</p>
                </div>
                <button className="btn-create-new" onClick={() => openCreateModal('services')}>
                  + Thêm dịch vụ mới
                </button>
              </div>
              <div className="crud-list">
                {data.services.map((service) => (
                  <div className="crud-item" key={service._id}>
                    <div className="crud-info">
                      <strong>{service.number} - {service.title}</strong>
                      <span>{service.description}</span>
                      <span style={{ marginTop: '5px', display: 'block' }}>
                        Tags: {service.tags.map((t, idx) => (
                          <span key={idx} style={{ background: 'rgba(77,124,255,0.1)', color: '#4d7cff', padding: '2px 6px', borderRadius: '3px', marginRight: '5px', fontSize: '10px' }}>
                            {t}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="crud-actions">
                      <button className="btn-edit" onClick={() => openEditModal('services', service)}>
                        Sửa
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteItem('services', service._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <section className="panel active">
              <div className="panel-header">
                <div className="panel-title">
                  <h2>Dự án</h2>
                  <p>Những case study nổi bật</p>
                </div>
                <button className="btn-create-new" onClick={() => openCreateModal('projects')}>
                  + Thêm dự án mới
                </button>
              </div>
              <div className="crud-list">
                {data.projects.map((project) => (
                  <div className="crud-item" key={project._id}>
                    <div className="crud-info">
                      <strong>
                        {project.title}
                        <span className={`color-tag ${project.color}`}>
                          {project.color}
                        </span>
                      </strong>
                      <span>Category: {project.category} | Metric: {project.metric} ({project.metricLabel})</span>
                      <span style={{ fontSize: '11px', opacity: 0.7 }}>{project.description}</span>
                    </div>
                    <div className="crud-actions">
                      <button className="btn-edit" onClick={() => openEditModal('projects', project)}>
                        Sửa
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteItem('projects', project._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Process */}
          {activeTab === 'process' && (
            <section className="panel active">
              <div className="panel-header">
                <div className="panel-title">
                  <h2>Quy trình</h2>
                  <p>Các bước hợp tác</p>
                </div>
                <button className="btn-create-new" onClick={() => openCreateModal('process')}>
                  + Thêm bước mới
                </button>
              </div>
              <div className="crud-list">
                {data.process.map((step) => (
                  <div className="crud-item" key={step._id}>
                    <div className="crud-info">
                      <strong>Bước {step.step}: {step.title}</strong>
                      <span>{step.text}</span>
                    </div>
                    <div className="crud-actions">
                      <button className="btn-edit" onClick={() => openEditModal('process', step)}>
                        Sửa
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteItem('process', step._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA & Contact */}
          {activeTab === 'cta' && (
            <section className="panel active">
              <div className="panel-title">
                <h2>CTA & Liên hệ</h2>
                <p>Thông tin chuyển đổi ở cuối trang</p>
              </div>
              <div className="grid">
                {renderField('cta.title', 'Tiêu đề CTA', true, true)}
                {renderField('cta.text', 'Mô tả', true, true)}
                {renderField('cta.button', 'Nội dung nút')}
                {renderField('contact.email', 'Email')}
                {renderField('contact.phone', 'Điện thoại')}
                {renderField('contact.address', 'Địa chỉ', true, true)}
              </div>
              <button className="singleton-save" onClick={() => handleSaveSetting('cta')}>
                Lưu liên hệ
              </button>
            </section>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <section className="panel active">
              <div className="panel-title">
                <h2>SEO</h2>
                <p>Nội dung hiển thị trên công cụ tìm kiếm</p>
              </div>
              <div className="grid">
                {renderField('seo.title', 'Meta title', true, true)}
                {renderField('seo.description', 'Meta description', true, true)}
              </div>
              <button className="singleton-save" onClick={() => handleSaveSetting('seo')}>
                Lưu SEO
              </button>
            </section>
          )}
        </div>
      </main>

      {/* CRUD Edit/Create Modal overlay */}
      {modalOpen && currentItem && (
        <div className={`modal-overlay ${modalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {modalMode === 'edit' ? 'Chỉnh sửa' : 'Thêm mới'}{' '}
                {activeCollection === 'stats' && 'Chỉ số'}
                {activeCollection === 'services' && 'Dịch vụ'}
                {activeCollection === 'projects' && 'Dự án'}
                {activeCollection === 'process' && 'Bước quy trình'}
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleModalSave}>
              <div className="grid">
                {/* Stats collection fields */}
                {activeCollection === 'stats' && (
                  <>
                    <label className="field">
                      <span>Giá trị (ví dụ: 120+, 98%)</span>
                      <input
                        type="text"
                        required
                        value={currentItem.value || ''}
                        onChange={(e) => updateCurrentItemField('value', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Nhãn giải thích</span>
                      <input
                        type="text"
                        required
                        value={currentItem.label || ''}
                        onChange={(e) => updateCurrentItemField('label', e.target.value)}
                      />
                    </label>
                  </>
                )}

                {/* Services collection fields */}
                {activeCollection === 'services' && (
                  <>
                    <label className="field">
                      <span>Số hiệu (ví dụ: 01, 02)</span>
                      <input
                        type="text"
                        required
                        value={currentItem.number || ''}
                        onChange={(e) => updateCurrentItemField('number', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Tên dịch vụ</span>
                      <input
                        type="text"
                        required
                        value={currentItem.title || ''}
                        onChange={(e) => updateCurrentItemField('title', e.target.value)}
                      />
                    </label>
                    <label className="field full">
                      <span>Mô tả dịch vụ</span>
                      <textarea
                        required
                        value={currentItem.description || ''}
                        onChange={(e) => updateCurrentItemField('description', e.target.value)}
                      />
                    </label>
                    <label className="field full">
                      <span>Tags (Phân cách bằng dấu phẩy)</span>
                      <input
                        type="text"
                        value={currentItem.tags ? currentItem.tags.join(', ') : ''}
                        onChange={(e) => updateCurrentItemField('tags', e.target.value)}
                      />
                    </label>
                  </>
                )}

                {/* Projects collection fields */}
                {activeCollection === 'projects' && (
                  <>
                    <label className="field">
                      <span>Danh mục dự án</span>
                      <input
                        type="text"
                        required
                        value={currentItem.category || ''}
                        onChange={(e) => updateCurrentItemField('category', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Tên dự án</span>
                      <input
                        type="text"
                        required
                        value={currentItem.title || ''}
                        onChange={(e) => updateCurrentItemField('title', e.target.value)}
                      />
                    </label>
                    <label className="field full">
                      <span>Mô tả chi tiết dự án</span>
                      <textarea
                        required
                        value={currentItem.description || ''}
                        onChange={(e) => updateCurrentItemField('description', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Chỉ số kết quả (ví dụ: 2.4x)</span>
                      <input
                        type="text"
                        required
                        value={currentItem.metric || ''}
                        onChange={(e) => updateCurrentItemField('metric', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Nhãn chỉ số (ví dụ: tăng chuyển đổi)</span>
                      <input
                        type="text"
                        required
                        value={currentItem.metricLabel || ''}
                        onChange={(e) => updateCurrentItemField('metricLabel', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Màu sắc khối visual</span>
                      <select
                        value={currentItem.color || 'cyan'}
                        onChange={(e) => updateCurrentItemField('color', e.target.value)}
                      >
                        <option value="cyan">Xanh dương (Cyan)</option>
                        <option value="lime">Xanh lá (Lime)</option>
                      </select>
                    </label>
                  </>
                )}

                {/* Process collection fields */}
                {activeCollection === 'process' && (
                  <>
                    <label className="field">
                      <span>Số thứ tự bước (ví dụ: 01)</span>
                      <input
                        type="text"
                        required
                        value={currentItem.step || ''}
                        onChange={(e) => updateCurrentItemField('step', e.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Tiêu đề bước</span>
                      <input
                        type="text"
                        required
                        value={currentItem.title || ''}
                        onChange={(e) => updateCurrentItemField('title', e.target.value)}
                      />
                    </label>
                    <label className="field full">
                      <span>Nội dung mô tả bước</span>
                      <textarea
                        required
                        value={currentItem.text || ''}
                        onChange={(e) => updateCurrentItemField('text', e.target.value)}
                      />
                    </label>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  {modalMode === 'edit' ? 'Lưu thay đổi' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
