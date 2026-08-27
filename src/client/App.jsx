import React, { useState, useEffect } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/site')
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((d) => {
        setData(d);
        if (d.seo && d.seo.title) {
          document.title = d.seo.title;
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (!data) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => io.observe(el));

    return () => {
      revealElements.forEach((el) => io.unobserve(el));
    };
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('header')) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  };

  const renderNavigation = () => {
    if (!data?.navigation) return null;
    const groups = data.navigation.solutionGroups || [];
    return data.navigation.items.map((item, idx) => {
      if (item.type !== 'solutions') {
        return (
          <a key={idx} className="nav-link" href={item.href} onClick={closeMobileMenu}>
            {item.label}
          </a>
        );
      }
      return (
        <div key={idx} className={`nav-entry nav-solutions ${solutionsOpen ? 'open' : ''}`}>
          <button
            className="nav-solutions-toggle"
            type="button"
            aria-expanded={solutionsOpen}
            onClick={(e) => {
              e.stopPropagation();
              setSolutionsOpen((prev) => !prev);
            }}
          >
            {item.label}
            <span className="nav-chevron" aria-hidden="true"></span>
          </button>
          <div className="solutions-menu">
            <div className="solutions-heading">
              <span>Giải pháp công nghệ</span>
              <small>TAG TECHNOLOGY GROUP</small>
            </div>
            {groups.map((group, gIdx) => (
              <div className="solution-group" key={gIdx}>
                <a className="solution-title" href={group.href || '#services'} onClick={closeMobileMenu}>
                  <span>›</span>
                  {group.title}
                </a>
                {group.children && group.children.length > 0 && (
                  <div className="solution-children">
                    {group.children.map((child, cIdx) => (
                      <a key={cIdx} href={child.href} onClick={closeMobileMenu}>
                        <span>→</span>
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  if (!data && !error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#05091a', color: '#4d7cff' }}>
        Loading...
      </div>
    );
  }

  const brandName = data?.brand?.name || '';
  const brandTagline = data?.brand?.tagline || '';
  const heroEyebrow = data?.hero?.eyebrow || '';
  const heroTitle = error ? 'Không thể tải nội dung.' : (data?.hero?.title || '');
  const heroDescription = data?.hero?.description || '';
  const primaryCta = data?.hero?.primaryCta || '';
  const secondaryCta = data?.hero?.secondaryCta || '';

  return (
    <>
      <div className="noise"></div>
      <header>
        <a className="logo logo-image" href="#" aria-label="TAG Technology Group">
          <img src="/logo-tag-transparent.png" alt="TAG Technology Group" />
        </a>
        <nav id="nav" className={mobileMenuOpen ? 'open' : ''}>
          {renderNavigation()}
        </nav>
        <button
          className="menu"
          aria-label="Mở menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <a href="#contact" className="nav-cta">
          Kết nối <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero">
          <ParticleCanvas />
          <div className="hero-content reveal">
            <p className="eyebrow" id="hero-eyebrow">{heroEyebrow}</p>
            <h1 id="hero-title">{heroTitle}</h1>
            <p className="hero-copy" id="hero-description">{heroDescription}</p>
            <div className="hero-actions">
              <a id="primary-cta" className="button primary" href="#contact">{primaryCta}</a>
              <a id="secondary-cta" className="button ghost" href="#services">{secondaryCta}</a>
            </div>
          </div>
          <div className="scroll-note">
            SCROLL TO EXPLORE <span>↓</span>
          </div>
          <div className="system-status">
            <i></i> SYSTEMS ONLINE
          </div>
        </section>

        {data?.stats && (
          <section className="stats" id="stats">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="reveal">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
        )}

        {data?.services && (
          <section className="section" id="services">
            <div className="section-head reveal">
              <p className="eyebrow">NĂNG LỰC CỐT LÕI</p>
              <h2>
                Công nghệ tạo ra
                <br />
                <em>chuyển động thật.</em>
              </h2>
              <p>
                Đội ngũ đa ngành cùng biến thách thức kinh doanh thành những sản phẩm rõ ràng, hữu ích và có thể mở rộng.
              </p>
            </div>
            <div className="service-list" id="service-list">
              {data.services.map((service, idx) => (
                <article className="service reveal" key={idx}>
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="tags">
                    {service.tags.map((tag, tIdx) => (
                      <i key={tIdx}>{tag}</i>
                    ))}
                  </div>
                  <b>↗</b>
                </article>
              ))}
            </div>
          </section>
        )}

        {data?.projects && (
          <section className="work section" id="projects">
            <div className="section-head compact reveal">
              <p className="eyebrow">DỰ ÁN TIÊU BIỂU</p>
              <h2>
                Được đo bằng
                <br />
                <em>kết quả.</em>
              </h2>
            </div>
            <div id="project-grid" className="project-grid">
              {data.projects.map((project, idx) => (
                <article className={`project ${project.color || ''} reveal`} key={idx}>
                  <div className="project-visual">
                    <span className="scan"></span>
                    <b>{project.metric}</b>
                    <small>{project.metricLabel}</small>
                  </div>
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {data?.process && (
          <section className="process section">
            <div className="section-head reveal">
              <p className="eyebrow">CÁCH CHÚNG TÔI LÀM</p>
              <h2>
                Từ chưa rõ ràng
                <br />
                <em>đến đột phá.</em>
              </h2>
            </div>
            <div id="project-grid" className="process-grid">
              {data.process.map((step, idx) => (
                <article className="reveal" key={idx}>
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {data?.cta && data?.contact && (
          <section className="contact" id="contact">
            <div className="orb"></div>
            <p className="eyebrow">START SOMETHING MEANINGFUL</p>
            <h2 id="cta-title">{data.cta.title}</h2>
            <p id="cta-text">{data.cta.text}</p>
            <a id="cta-button" className="button primary" href={`mailto:${data.contact.email}`}>
              {data.cta.button}
            </a>
          </section>
        )}
      </main>

      {data?.brand && data?.contact && (
        <footer>
          <div>
            <a className="logo logo-image footer-logo" href="#" aria-label="TAG Technology Group">
              <img src="/logo-tag-transparent.png" alt="TAG Technology Group" />
            </a>
            <p id="tagline">{brandTagline}</p>
          </div>
          <div>
            <small>LIÊN HỆ</small>
            <a id="email" href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
            <span id="phone">{data.contact.phone}</span>
            <span id="address">{data.contact.address}</span>
          </div>
          <div>
            <small>ĐIỀU HƯỚNG</small>
            <a href="#services">Năng lực</a>
            <a href="#projects">Dự án</a>
            <a href="/admin">Quản trị nội dung</a>
          </div>
          <p className="copyright">© 2026 TAGTECH. ALL SYSTEMS GO.</p>
        </footer>
      )}
    </>
  );
}
