import React, { useEffect, useState } from 'react';

const nav = [['Trang chủ','/'],['Giải pháp','/giai-phap'],['Sản phẩm','/san-pham'],['Dự án','/du-an'],['Tin tức','/tin-tuc'],['Về TAGTECH','/ve-tagtech']];
const values = [
  ['↗','Hiệu quả','Tối ưu quy trình, nâng cao hiệu suất vận hành.'],['◇','Tin cậy','Công nghệ ổn định, bảo mật và an toàn.'],
  ['⌘','Dễ sử dụng','Giao diện thân thiện, trải nghiệm đơn giản.'],['◷','Hỗ trợ 24/7','Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ.']
];
const solutionFallback = [
  ['✣','Y tế số','Hiện đại hóa quy trình khám chữa bệnh và nâng cao trải nghiệm người dân.'],
  ['▣','Chính quyền số','Hỗ trợ đơn vị hành chính, nâng cao hiệu quả phục vụ người dân.'],
  ['◇','Giáo dục số','Chuyển đổi số trong giáo dục, đào tạo và quản lý.'],
  ['⌂','Doanh nghiệp số','Công nghệ hỗ trợ quản lý và vận hành doanh nghiệp.']
];
const products = [
  ['kiosk','Kiosk thông minh','Kiosk y tế thông minh','Đăng ký khám, tra cứu, thanh toán và lấy số thuận tiện.'],
  ['kiosk','Kiosk thông minh','Kiosk hành chính công','Hỗ trợ người dân thực hiện dịch vụ hành chính dễ dàng.'],
  ['screen','Phần mềm','Quản lý bệnh viện','Nền tảng quản lý và vận hành nghiệp vụ y tế tập trung.']
];
const productCatalog = [
 {category:'Kiosk thông minh',type:'kiosk',title:'Kiosk y tế thông minh',description:'Hỗ trợ đăng ký khám, tra cứu thông tin, thanh toán, lấy số và các tiện ích dành cho người bệnh.'},
 {category:'Kiosk thông minh',type:'kiosk',title:'Kiosk hành chính công',description:'Hỗ trợ người dân lấy số, tra cứu thủ tục, khai báo và thực hiện dịch vụ hành chính.'},
 {category:'Phần mềm',type:'screen',title:'Phần mềm quản lý bệnh viện',description:'Nền tảng hỗ trợ quản lý và vận hành các nghiệp vụ trong cơ sở y tế.'},
 {category:'Phần mềm',type:'payment',title:'Nền tảng thanh toán thông minh',description:'Hỗ trợ thanh toán điện tử, QR Code và kết nối nhiều phương thức thanh toán.'},
 {category:'Phần mềm',type:'education',title:'Phần mềm quản lý giáo dục',description:'Giải pháp quản lý đào tạo, học tập và dữ liệu giáo dục.'},
 {category:'Thiết bị',type:'iot',title:'Thiết bị IoT & cảm biến',description:'Hệ thống thiết bị thông minh phục vụ thu thập dữ liệu và giám sát.'}
];  


const projects = [
  ['Y tế','2025','Triển khai hệ thống Kiosk y tế','Rút ngắn thời gian chờ và nâng cao trải nghiệm người bệnh.'],
  ['Chính quyền','2024','Kiosk hành chính công','Số hóa quy trình tiếp nhận và phục vụ người dân.'],
  ['Giáo dục','2024','Giải pháp số hóa trường học','Kết nối quản lý, giảng dạy và dữ liệu giáo dục.']
];
const projectCatalog = [
 {category:'Y tế',year:'2025',tone:'medical',title:'Triển khai hệ thống Kiosk y tế tại Bệnh viện Đa khoa',description:'Tự động hóa đăng ký khám, lấy số và thanh toán, giúp giảm thời gian chờ cho người bệnh.'},
 {category:'Chính quyền',year:'2024',tone:'government',title:'Hệ thống Kiosk hành chính công tỉnh',description:'Số hóa quy trình tra cứu thủ tục, lấy số và đánh giá chất lượng phục vụ người dân.'},
 {category:'Y tế',year:'2023',tone:'hospital',title:'Hệ thống quản lý bệnh viện toàn diện',description:'Kết nối dữ liệu khám chữa bệnh và hỗ trợ vận hành tập trung cho cơ sở y tế.'},
 {category:'Giáo dục',year:'2023',tone:'education',title:'Giải pháp số hóa trường học thông minh',description:'Nền tảng quản lý đào tạo, học tập và tương tác giữa nhà trường với phụ huynh.'},
 {category:'Y tế',year:'2023',tone:'payment',title:'Hệ thống thanh toán thông minh cho bệnh viện',description:'Tích hợp QR Code và nhiều phương thức thanh toán không dùng tiền mặt.'},
 {category:'Doanh nghiệp',year:'2022',tone:'business',title:'Cổng dịch vụ công trực tuyến thế hệ mới',description:'Chuẩn hóa quy trình xử lý hồ sơ và nâng cao hiệu quả phối hợp giữa các đơn vị.'}
];
const news = [
  ['Công nghệ','20/08/2026','Chuyển đổi số y tế: Xu hướng tất yếu trong thời đại công nghệ 4.0'],
  ['Giải pháp','12/08/2026','Kiosk hành chính công – Nâng cao chất lượng phục vụ'],
  ['Kiến thức','05/08/2026','Thanh toán không dùng tiền mặt trong y tế']
];
const newsCatalog = [
 {slug:'chuyen-doi-so-y-te',category:'Công nghệ',date:'20/08/2026',title:'Chuyển đổi số y tế: Xu hướng tất yếu trong thời đại công nghệ 4.0',description:'Chuyển đổi số đang thay đổi toàn diện ngành y tế, mang lại lợi ích thiết thực cho cả cơ sở y tế và người bệnh.',tone:'blue'},
 {slug:'kiosk-hanh-chinh-cong',category:'Tin tức',date:'10/08/2026',title:'Kiosk hành chính công – Giải pháp nâng cao chất lượng phục vụ',description:'Công nghệ giúp đơn giản hóa quy trình và nâng cao trải nghiệm của người dân.',tone:'office'},
 {slug:'ai-quan-ly-benh-vien',category:'Công nghệ',date:'06/08/2026',title:'Ứng dụng AI trong quản lý bệnh viện thông minh',description:'Khai thác dữ liệu để hỗ trợ vận hành và ra quyết định hiệu quả.',tone:'data'},
 {slug:'thanh-toan-khong-tien-mat',category:'Kiến thức',date:'28/07/2026',title:'Thanh toán không dùng tiền mặt trong y tế',description:'Nâng cao tiện ích và giảm thời gian chờ cho người bệnh.',tone:'payment'},
 {slug:'bao-mat-du-lieu-y-te',category:'Kiến thức',date:'18/07/2026',title:'5 nguyên tắc bảo mật dữ liệu trong hệ thống y tế số',description:'Những lưu ý quan trọng khi xây dựng nền tảng dữ liệu an toàn.',tone:'security'},
 {slug:'tagtech-su-kien-chuyen-doi-so',category:'Sự kiện',date:'05/07/2026',title:'TAGTECH đồng hành cùng hội thảo chuyển đổi số 2026',description:'Chia sẻ kinh nghiệm triển khai giải pháp công nghệ thực tiễn.',tone:'event'}
];
const statFallback = [['10+','Năm kinh nghiệm'],['200+','Dự án đã triển khai'],['100+','Đối tác & Khách hàng'],['50+','Nhân sự chuyên gia']];
const coreValues = [
 {icon:'↗',title:'Đổi mới',description:'Không ngừng nghiên cứu và cải tiến công nghệ.'},
 {icon:'◇',title:'Chuyên nghiệp',description:'Cam kết chất lượng trong từng sản phẩm và dự án.'},
 {icon:'⌘',title:'Tin cậy',description:'Xây dựng mối quan hệ dài hạn với khách hàng và đối tác.'}
];
const leadership = [
 {name:'Nguyễn Văn A',role:'Giám đốc điều hành',initials:'NA'},
 {name:'Trần Thị B',role:'Giám đốc kinh doanh',initials:'TB'},
 {name:'Lê Văn C',role:'Giám đốc kỹ thuật',initials:'LC'},
 {name:'Phạm Thị D',role:'Giám đốc dự án',initials:'PD'}
];

function Header({open,setOpen,path}) { return <header className="site-header"><div className="container header-inner">
  <a className="brand-logo" href="/"><img src="/logo-tag-transparent.png" alt="TAGTECH" /></a>
  <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Mở menu">☰</button>
  <nav className={open?'open':''}>{nav.map(([label,href])=><a className={path===href?'active':''} href={href} key={label} onClick={()=>setOpen(false)}>{label}</a>)}<a className={`nav-contact ${path==='/lien-he'?'active':''}`} href="/lien-he">Liên hệ</a></nav>
</div></header> }
function Heading({eyebrow,title,href}) { return <div className="section-heading"><div><span>{eyebrow}</span><h2>{title}</h2></div><a href={href}>Xem tất cả →</a></div> }
function StatsSection({stats,className=''}) { return <section className={`stats-section ${className}`}><div className="container stats-grid">{stats.map((x,i)=><article key={x._id||x.label||i}><strong>{x.value}</strong><span>{x.label}</span></article>)}</div></section> }
function Visual({type}) { return <div className={`product-visual ${type}`}>{type==='kiosk'?<div className="kiosk-device"><i/><b>TAG</b><span/></div>:type==='iot'?<div className="iot-device"><i/><i/><span/></div>:type==='payment'?<div className="payment-device"><b>QR</b><i/><span/></div>:<div className="software-screen"><span/><i/><i/><i/></div>}</div> }
function Footer({contact={},tagline}) { return <footer id="about"><div className="container footer-grid">
  <div className="footer-brand"><img src="/logo-tag-transparent.png" alt="TAGTECH"/><p>{tagline||'Giải pháp công nghệ tạo giá trị thực cho cuộc sống.'}</p></div>
  <div><h3>Giải pháp</h3><a href="#solutions">Y tế số</a><a href="#solutions">Chính quyền số</a><a href="#solutions">Giáo dục số</a><a href="#solutions">Doanh nghiệp số</a></div>
  <div><h3>Sản phẩm</h3><a href="#products">Kiosk y tế</a><a href="#products">Kiosk hành chính công</a><a href="#products">Nền tảng phần mềm</a><a href="#products">Thiết bị IoT</a></div>
  <div><h3>Công ty</h3><a href="#about">Về TAGTECH</a><a href="#projects">Dự án</a><a href="#news">Tin tức</a><a href="#contact">Liên hệ</a></div>
 </div><div className="container footer-bottom"><span>© 2026 TAGTECH. All rights reserved.</span><span>{contact.email||'info@tagtech.vn'} · {contact.phone||'Hotline hỗ trợ'}</span></div></footer> }

const solutionDetails = [
 {category:'Y tế số',slug:'y-te-so',icon:'✣',tone:'medical',description:'Ứng dụng công nghệ trong quản lý bệnh viện, khám chữa bệnh, thanh toán không dùng tiền mặt và nâng cao trải nghiệm người bệnh.'},
 {category:'Chính quyền số',slug:'chinh-quyen-so',icon:'▣',tone:'government',description:'Số hóa quy trình thủ tục hành chính, nâng cao hiệu quả phục vụ người dân và doanh nghiệp.'},
 {category:'Giáo dục số',slug:'giao-duc-so',icon:'◇',tone:'education',description:'Hệ sinh thái quản lý đào tạo, học tập trực tuyến và các giải pháp công nghệ phục vụ giáo dục.'},
 {category:'Doanh nghiệp số',slug:'doanh-nghiep-so',icon:'⌂',tone:'business',description:'Tư vấn và triển khai giải pháp chuyển đổi số giúp doanh nghiệp tối ưu vận hành và quản trị.'}
];

function SolutionScene({tone,icon}) { return <div className={`solution-scene ${tone}`} aria-hidden="true"><div className="scene-window"><span/><span/><span/></div><div className="scene-desk"/><i>{icon}</i></div> }
function SolutionsPage({data,open,setOpen}){
 const [filter,setFilter]=useState('Tất cả');
 const items=solutionDetails.map(item=>({...item,title:`Giải pháp ${item.category}`}));
 const shown=filter==='Tất cả'?items:items.filter(x=>x.category===filter);
 useEffect(()=>{document.title='Giải pháp công nghệ | TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/giai-phap"/><main className="inner-main">
  <section className="page-hero solutions-page-hero"><div className="container page-hero-grid"><div><h1>Giải pháp</h1><p>Các giải pháp công nghệ toàn diện giúp tối ưu quy trình, nâng cao hiệu quả hoạt động và tạo ra giá trị bền vững.</p></div><div className="hero-diagram"><i>01</i><i>02</i><i>03</i><i>04</i><b>TAGTECH</b></div></div></section>
  <section className="solutions-list-section"><div className="container"><div className="filter-tabs solution-tabs" role="tablist">{['Tất cả',...solutionDetails.map(x=>x.category)].map(x=><button type="button" aria-pressed={filter===x} className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="solutions-list">{shown.map(x=><article className="solution-row" key={x.category}><SolutionScene tone={x.tone} icon={x.icon}/><div className="solution-row-copy"><h2>{x.title}</h2><p>{x.description}</p></div><a className="solution-row-link" href="/lien-he" aria-label={`Xem chi tiết ${x.title}`}>Xem chi tiết <b>→</b></a></article>)}</div></div></section>
  <section className="solution-cta"><div className="container"><div><i>▤</i><span><b>Bạn cần tư vấn giải pháp phù hợp?</b><small>Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ.</small></span></div><a className="button primary" href="/lien-he">Liên hệ ngay</a></div></section>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function ProductsPage({data,open,setOpen}){
 const [filter,setFilter]=useState('Tất cả');
 const shown=filter==='Tất cả'?productCatalog:productCatalog.filter(x=>x.category===filter);
 useEffect(()=>{document.title='Sản phẩm công nghệ | TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/san-pham"/><main className="inner-main">
  <section className="page-hero product-page-hero"><div className="container page-hero-grid"><div><span>SẢN PHẨM TAGTECH</span><h1>Sản phẩm</h1><p>Các sản phẩm công nghệ do TAGTECH nghiên cứu và triển khai nhằm giải quyết các bài toán vận hành thực tế.</p></div><div className="product-hero-art"><div className="mini-kiosk"><i/><b>TAG</b><span/></div><div className="mini-screen"><span/><i/><i/><i/></div></div></div></section>
  <section className="product-catalog-section"><div className="container">
   <div className="filter-tabs" role="tablist">{['Tất cả','Kiosk thông minh','Phần mềm','Thiết bị'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
   <div className="product-catalog-grid">{shown.map(item=><article className="product-catalog-card" key={item.title}><Visual type={item.type}/><div className="product-catalog-copy"><span>{item.category}</span><h2>{item.title}</h2><p>{item.description}</p><a href="/lien-he">Xem chi tiết <b>→</b></a></div></article>)}</div>
  </div></section>
  <section className="solution-cta product-consult"><div className="container"><div><i>♧</i><span><b>Bạn cần tư vấn sản phẩm phù hợp?</b><small>Chúng tôi sẵn sàng hỗ trợ và demo sản phẩm miễn phí.</small></span></div><a className="button primary" href="/lien-he">Liên hệ ngay</a></div></section>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function NewsVisual({tone,compact=false}) { return <div className={`news-cover cover-${tone} ${compact?'compact-cover':''}`} aria-hidden="true"><div className="cover-grid"/><i>TAGTECH</i><span/></div> }
function NewsPage({data,open,setOpen}){
 const [filter,setFilter]=useState('Tất cả');
 const shown=filter==='Tất cả'?newsCatalog:newsCatalog.filter(x=>x.category===filter);
 const featured=shown[0]||newsCatalog[0], side=shown.slice(1,4), latest=shown.slice(filter==='Tất cả'?3:1);
 useEffect(()=>{document.title='Tin tức & Sự kiện | TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/tin-tuc"/><main className="inner-main">
  <section className="page-hero news-page-hero"><div className="container page-hero-grid"><div><span>GÓC TAGTECH</span><h1>Tin tức & Sự kiện</h1><p>Cập nhật những thông tin mới nhất từ TAGTECH và các xu hướng công nghệ nổi bật.</p></div><div className="news-hero-art"><div/><i>NEWS</i><span/></div></div></section>
  <section className="news-content-section"><div className="container">
   <div className="filter-tabs" role="tablist">{['Tất cả','Tin tức','Sự kiện','Công nghệ','Kiến thức'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
   <div className="featured-news-layout"><article className="featured-article"><NewsVisual tone={featured.tone}/><div><span>{featured.category} · {featured.date}</span><h2>{featured.title}</h2><p>{featured.description}</p><a href={`/tin-tuc/${featured.slug}`}>Xem chi tiết <b>→</b></a></div></article><aside>{side.length?side.map(item=><article className="side-news" key={item.slug}><NewsVisual tone={item.tone} compact/><div><span>{item.category}</span><h3>{item.title}</h3><small>{item.date}</small></div></article>):<p className="empty-news">Các bài viết mới đang được cập nhật.</p>}</aside></div>
   <div className="latest-heading"><h2>Bài viết mới nhất</h2><span>{shown.length} bài viết</span></div>
   <div className="latest-news-grid">{latest.length?latest.map(item=><article className="latest-news-card" key={item.slug}><NewsVisual tone={item.tone}/><div><span>{item.category} · {item.date}</span><h3>{item.title}</h3><p>{item.description}</p><a href={`/tin-tuc/${item.slug}`}>Đọc bài viết →</a></div></article>):<p className="empty-news">Chưa có thêm bài viết trong danh mục này.</p>}</div>
  </div></section>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function ArticlePage({data,open,setOpen,slug}){
 const article=newsCatalog.find(x=>x.slug===slug)||newsCatalog[0];
 const related=newsCatalog.filter(x=>x.slug!==article.slug).slice(0,4);
 useEffect(()=>{document.title=`${article.title} | TAGTECH`},[article.title]);
 return <><Header open={open} setOpen={setOpen} path="/tin-tuc"/><main className="inner-main article-page">
  <div className="container breadcrumb"><a href="/">Trang chủ</a><span>›</span><a href="/tin-tuc">Tin tức</a><span>›</span><b>{article.category}</b></div>
  <section className="article-header"><div className="container"><span>{article.category}</span><h1>{article.title}</h1><div className="article-meta"><time>{article.date}</time><i/> <span>6 phút đọc</span></div></div></section>
  <div className="container article-layout"><article className="article-content"><NewsVisual tone={article.tone}/><p className="article-lead">{article.description}</p><p>Trong bối cảnh nhu cầu nâng cao chất lượng dịch vụ ngày càng lớn, chuyển đổi số không còn là lựa chọn mà đã trở thành một phần quan trọng trong chiến lược phát triển của các tổ chức. Việc ứng dụng đúng giải pháp giúp tối ưu nguồn lực, chuẩn hóa quy trình và tạo ra trải nghiệm thuận tiện hơn cho người sử dụng.</p><h2>Công nghệ tạo ra thay đổi thiết thực</h2><p>Các nền tảng số hiện đại cho phép kết nối dữ liệu xuyên suốt, giảm thao tác thủ công và hỗ trợ đội ngũ vận hành đưa ra quyết định nhanh chóng. Giá trị của công nghệ được thể hiện rõ nhất khi giải quyết được những vấn đề thực tế trong công việc hằng ngày.</p><ul><li>Nâng cao hiệu quả quản lý và vận hành.</li><li>Rút ngắn thời gian chờ, tối ưu quy trình phục vụ.</li><li>Quản lý dữ liệu tập trung, bảo mật và dễ dàng chia sẻ.</li><li>Thanh toán và tương tác thuận tiện trên nhiều kênh.</li><li>Hỗ trợ chăm sóc, theo dõi và phản hồi kịp thời.</li></ul><div className="article-note"><b>TAGTECH Insight</b><p>Một lộ trình chuyển đổi số hiệu quả nên bắt đầu từ bài toán thực tế, được đo lường bằng kết quả và triển khai theo từng giai đoạn phù hợp.</p></div><h2>Lộ trình triển khai bền vững</h2><p>Thay vì đầu tư dàn trải, tổ chức nên ưu tiên những hạng mục có tác động rõ ràng, thử nghiệm trong phạm vi kiểm soát và mở rộng dựa trên dữ liệu. Con người, quy trình và công nghệ cần được xem xét đồng thời để bảo đảm giải pháp được sử dụng hiệu quả lâu dài.</p><h3>Kết luận</h3><p>Chuyển đổi số thành công không chỉ phụ thuộc vào công nghệ mới, mà còn nằm ở khả năng lựa chọn giải pháp phù hợp và đồng hành cùng một đội ngũ triển khai có kinh nghiệm.</p></article><aside className="related-news"><h2>Tin tức liên quan</h2>{related.map(item=><a className="related-item" href={`/tin-tuc/${item.slug}`} key={item.slug}><NewsVisual tone={item.tone} compact/><div><span>{item.category}</span><h3>{item.title}</h3><small>{item.date}</small></div></a>)}</aside></div>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function ProjectVisual({tone,index}) { return <div className={`case-visual case-${tone}`} aria-hidden="true"><div className="case-building"><i/><i/><i/></div><span>0{index+1}</span><b>TAGTECH PROJECT</b></div> }
function ProjectsPage({data,open,setOpen}){
 const [filter,setFilter]=useState('Tất cả');
 const shown=filter==='Tất cả'?projectCatalog:projectCatalog.filter(x=>x.category===filter);
 useEffect(()=>{document.title='Dự án tiêu biểu | TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/du-an"/><main className="inner-main">
  <section className="page-hero project-page-hero"><div className="container page-hero-grid"><div><span>CASE STUDY</span><h1>Dự án tiêu biểu</h1><p>Những dự án TAGTECH đã triển khai và mang lại giá trị thực tế cho khách hàng.</p></div><div className="project-hero-art"><div/><div/><div/><b>200+</b><span>DỰ ÁN ĐÃ TRIỂN KHAI</span></div></div></section>
  <section className="projects-catalog-section"><div className="container"><div className="filter-tabs" role="tablist">{['Tất cả','Y tế','Chính quyền','Giáo dục','Doanh nghiệp'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="projects-catalog-grid">{shown.map((item,index)=><article className="project-catalog-card" key={item.title}><ProjectVisual tone={item.tone} index={projectCatalog.indexOf(item)}/><div className="project-catalog-copy"><div><span>{item.category}</span><time>{item.year}</time></div><h2>{item.title}</h2><p>{item.description}</p><a href="/lien-he">Xem chi tiết <b>→</b></a></div></article>)}</div></div></section>
  <section className="solution-cta project-consult"><div className="container"><div><i>♧</i><span><b>Bạn có dự án cần triển khai?</b><small>TAGTECH sẵn sàng đồng hành từ tư vấn đến vận hành.</small></span></div><a className="button primary" href="/lien-he">Liên hệ ngay</a></div></section>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function OfficeVisual(){ return <div className="about-office" role="img" aria-label="Minh họa văn phòng TAGTECH"><div className="office-building"><b>TAGTECH</b><div>{Array.from({length:18},(_,i)=><i key={i}/>)}</div></div><span/><span/><span/></div> }
function AboutPage({data,open,setOpen}){
 const stats=statFallback.map(([value,label])=>({value,label}));
 useEffect(()=>{document.title='Về TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/ve-tagtech"/><main className="inner-main about-page">
  <section className="about-hero"><div className="container about-hero-grid"><div className="about-hero-copy"><span>VỀ CHÚNG TÔI</span><h1>Về TAGTECH</h1><h2>Đổi mới <i/> Chuyên nghiệp <i/> Tin cậy</h2><p>TAGTECH là doanh nghiệp công nghệ thông tin tại Việt Nam, tập trung nghiên cứu và triển khai các giải pháp chuyển đổi số trong nhiều lĩnh vực, đặc biệt là y tế, chính quyền và giáo dục.</p></div><OfficeVisual/></div></section>
  <section className="about-intro"><div className="container"><div className="about-story"><div><span>TAGTECH LÀ AI?</span><h2>Công nghệ tạo nên<br/>giá trị thực tiễn</h2></div><p>Chúng tôi đồng hành cùng tổ chức và doanh nghiệp trong hành trình chuyển đổi số bằng những sản phẩm dễ sử dụng, ổn định và phù hợp với nhu cầu vận hành thực tế.</p></div><div className="purpose-grid"><article><i>◎</i><div><span>01</span><h3>Tầm nhìn</h3><p>Trở thành doanh nghiệp công nghệ uy tín, cung cấp các sản phẩm và giải pháp có giá trị thực tiễn cao.</p></div></article><article><i>◇</i><div><span>02</span><h3>Sứ mệnh</h3><p>Mang công nghệ đến gần hơn với cuộc sống, góp phần nâng cao chất lượng quản lý, vận hành và phục vụ cộng đồng.</p></div></article></div></div></section>
  <section className="core-values-section"><div className="container"><div className="about-section-heading"><span>NỀN TẢNG PHÁT TRIỂN</span><h2>Giá trị cốt lõi</h2><p>Những nguyên tắc định hướng cách TAGTECH tạo ra sản phẩm và đồng hành cùng khách hàng.</p></div><div className="core-values-grid">{coreValues.map((item,index)=><article key={item.title}><b>0{index+1}</b><i>{item.icon}</i><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
  <StatsSection stats={stats} className="about-stats"/>
  <section className="leadership-section"><div className="container"><div className="about-section-heading"><span>CON NGƯỜI TAGTECH</span><h2>Đội ngũ lãnh đạo</h2><p>Đội ngũ giàu kinh nghiệm, cùng chung định hướng phát triển công nghệ bền vững.</p></div><div className="leadership-grid">{leadership.map(item=><article key={item.name}><div className="leader-placeholder"><span>{item.initials}</span></div><h3>{item.name}</h3><p>{item.role}</p></article>)}</div></div></section>
  <section className="solution-cta about-consult"><div className="container"><div><i>↗</i><span><b>Sẵn sàng đồng hành cùng TAGTECH?</b><small>Hãy cùng chúng tôi biến bài toán thực tế thành giải pháp hiệu quả.</small></span></div><a className="button primary" href="/lien-he">Liên hệ ngay</a></div></section>
 </main><Footer contact={data.contact} tagline={data.brand?.tagline}/></>
}

function ContactForm({email}){
 const [form,setForm]=useState({name:'',email:'',phone:'',message:''}),[errors,setErrors]=useState({}),[notice,setNotice]=useState('');
 const update=e=>{setForm({...form,[e.target.name]:e.target.value});setErrors({...errors,[e.target.name]:''});setNotice('')};
 const submit=e=>{e.preventDefault();const next={};if(!form.name.trim())next.name='Vui lòng nhập họ và tên.';if(!/^\S+@\S+\.\S+$/.test(form.email))next.email='Email chưa đúng định dạng.';if(!/^[0-9+().\s-]{8,18}$/.test(form.phone))next.phone='Số điện thoại chưa hợp lệ.';if(form.message.trim().length<10)next.message='Nội dung cần ít nhất 10 ký tự.';setErrors(next);if(Object.keys(next).length)return;const subject=encodeURIComponent(`Yêu cầu tư vấn từ ${form.name.trim()}`),body=encodeURIComponent(`Họ tên: ${form.name.trim()}\nEmail: ${form.email.trim()}\nSố điện thoại: ${form.phone.trim()}\n\nNội dung:\n${form.message.trim()}`);setNotice('Thông tin đã hợp lệ. Ứng dụng email đang được mở để bạn xác nhận gửi.');window.location.href=`mailto:${email}?subject=${subject}&body=${body}`};
 return <form className="contact-form" onSubmit={submit} noValidate><div className="form-heading"><span>GỬI YÊU CẦU</span><h2>Gửi thông tin cho chúng tôi</h2><p>Điền thông tin bên dưới, đội ngũ TAGTECH sẽ hỗ trợ bạn qua email.</p></div><label>Họ và tên <b>*</b><input name="name" value={form.name} onChange={update} aria-invalid={!!errors.name}/>{errors.name&&<small>{errors.name}</small>}</label><label>Email <b>*</b><input type="email" name="email" value={form.email} onChange={update} aria-invalid={!!errors.email}/>{errors.email&&<small>{errors.email}</small>}</label><label>Số điện thoại <b>*</b><input inputMode="tel" name="phone" value={form.phone} onChange={update} aria-invalid={!!errors.phone}/>{errors.phone&&<small>{errors.phone}</small>}</label><label>Nội dung <b>*</b><textarea name="message" rows="5" value={form.message} onChange={update} aria-invalid={!!errors.message}/>{errors.message&&<small>{errors.message}</small>}</label><button type="submit">Gửi thông tin <span>→</span></button>{notice&&<p className="form-notice" role="status">{notice}</p>}<p className="form-disclaimer">Form sử dụng ứng dụng email trên thiết bị; website chưa lưu thông tin của bạn.</p></form>
}
function ContactPage({data,open,setOpen}){
 const contact=data.contact||{},email=contact.email||'info@tagtech.vn';
 const details=[{icon:'⌖',label:'Trụ sở chính',value:contact.address||'Đang cập nhật'},{icon:'⌕',label:'Hotline',value:contact.phone||'Đang cập nhật',href:contact.phone?`tel:${contact.phone.replace(/\s/g,'')}`:null},{icon:'✉',label:'Email',value:email,href:`mailto:${email}`},{icon:'◎',label:'Website',value:contact.website||email.split('@')[1]||'Đang cập nhật'},{icon:'◷',label:'Giờ làm việc',value:contact.workingHours||'Đang cập nhật'}];
 useEffect(()=>{document.title='Liên hệ | TAGTECH'},[]);
 return <><Header open={open} setOpen={setOpen} path="/lien-he"/><main className="inner-main contact-page"><section className="contact-hero"><div className="container"><span>KẾT NỐI VỚI TAGTECH</span><h1>Liên hệ với chúng tôi</h1><p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.</p></div></section><section className="contact-content"><div className="container contact-layout"><aside className="contact-details"><div><span>THÔNG TIN LIÊN HỆ</span><h2>Hãy bắt đầu một cuộc trò chuyện</h2><p>Chia sẻ nhu cầu của bạn để TAGTECH có thể tư vấn giải pháp phù hợp nhất.</p></div><div className="contact-list">{details.map(item=><article key={item.label}><i>{item.icon}</i><div><b>{item.label}</b>{item.href?<a href={item.href}>{item.value}</a>:<span>{item.value}</span>}</div></article>)}</div></aside><ContactForm email={email}/></div></section><section className="contact-map"><div className="map-grid"/><div className="map-river"/><div className="map-pin">●</div><div className="map-card"><img src="/logo-tag-transparent.png" alt="TAGTECH"/><p>{contact.address||'Địa chỉ đang được cập nhật'}</p></div></section></main><Footer contact={contact} tagline={data.brand?.tagline}/></>
}

export default function App(){
 const [data,setData]=useState(null),[open,setOpen]=useState(false);
 useEffect(()=>{fetch('/api/site').then(r=>r.ok?r.json():Promise.reject()).then(setData).catch(()=>setData({}));document.title='TAGTECH | Giải pháp công nghệ & Chuyển đổi số'},[]);
 if(!data)return <div className="page-loading"><span/><p>Đang tải nội dung...</p></div>;
 const path=window.location.pathname.replace(/\/$/,'')||'/';
 if(path==='/giai-phap') return <SolutionsPage data={data} open={open} setOpen={setOpen}/>;
 if(path==='/san-pham') return <ProductsPage data={data} open={open} setOpen={setOpen}/>;
 if(path==='/tin-tuc') return <NewsPage data={data} open={open} setOpen={setOpen}/>;
 if(path.startsWith('/tin-tuc/')) return <ArticlePage data={data} open={open} setOpen={setOpen} slug={path.split('/').pop()}/>;
 if(path==='/du-an') return <ProjectsPage data={data} open={open} setOpen={setOpen}/>;
 if(path==='/ve-tagtech') return <AboutPage data={data} open={open} setOpen={setOpen}/>;
 if(path==='/lien-he') return <ContactPage data={data} open={open} setOpen={setOpen}/>;
 const solutions=solutionFallback.map(([icon,title,description])=>({icon,title,description}));
 const stats=statFallback.map(([value,label])=>({value,label})); const contact=data.contact||{};
 return <><Header open={open} setOpen={setOpen} path="/"/><main className="home-page">
  <section className="home-hero"><div className="container hero-grid"><div className="hero-copy-block"><p className="hero-kicker">CÔNG NGHỆ · HIỆU QUẢ · TIN CẬY</p><h1>Giải pháp công nghệ<br/>tạo <em>giá trị thực</em> cho<br/>cuộc sống</h1><p>TAGTECH cung cấp các giải pháp và sản phẩm công nghệ hiện đại, giúp nâng cao hiệu quả quản lý, vận hành và chất lượng dịch vụ cho tổ chức, doanh nghiệp.</p><div className="hero-buttons"><a className="button primary" href="/giai-phap">Khám phá giải pháp</a><a className="button secondary" href="/san-pham">Xem sản phẩm</a></div></div><div className="hero-art"><div className="hero-ring"/><div className="hero-office"><span/><span/><span/><i/></div><div className="kiosk-large"><i/><b>TAGTECH</b><span/><small/></div></div></div></section>
  <section className="value-strip"><div className="container value-grid">{values.map(([icon,title,text])=><article key={title}><i>{icon}</i><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
  <section className="section home-solutions" id="solutions"><div className="container"><Heading eyebrow="" title="Giải pháp nổi bật" href="/giai-phap"/><div className="solution-grid">{solutions.map((x,i)=><article className="solution-card" key={x._id||x.title}><i>{x.icon||solutionFallback[i]?.[0]}</i><h3>{x.title}</h3><p>{x.description}</p><a href="/giai-phap">Tìm hiểu thêm →</a></article>)}</div></div></section>
  <StatsSection stats={stats} className="home-stats"/>
  <section className="section soft-section" id="products"><div className="container"><Heading eyebrow="SẢN PHẨM TAGTECH" title="Sản phẩm nổi bật" href="#products"/><div className="card-grid">{products.map(([type,category,title,text])=><article className="content-card" key={title}><Visual type={type}/><div className="card-body"><span>{category}</span><h3>{title}</h3><p>{text}</p><a href="#contact">Xem chi tiết →</a></div></article>)}</div></div></section>
  <section className="section" id="projects"><div className="container"><Heading eyebrow="GIÁ TRỊ THỰC TẾ" title="Dự án tiêu biểu" href="#projects"/><div className="card-grid">{projects.map(([category,year,title,text],i)=><article className="content-card" key={title}><div className={`project-image image-${i+1}`}><span>TAGTECH CASE STUDY</span></div><div className="card-body"><span>{category} · {year}</span><h3>{title}</h3><p>{text}</p><a href="#contact">Xem dự án →</a></div></article>)}</div></div></section>
  <section className="section" id="news"><div className="container"><Heading eyebrow="GÓC CÔNG NGHỆ" title="Tin tức mới" href="#news"/><div className="card-grid">{news.map(([category,date,title],i)=><article className="news-card" key={title}><div className={`news-image news-${i+1}`}><i>TAG</i></div><div><span>{category} · {date}</span><h3>{title}</h3><a href="#news">Đọc bài viết →</a></div></article>)}</div></div></section>
  <section className="partners"><div className="container"><p>KHÁCH HÀNG & ĐỐI TÁC ĐỒNG HÀNH</p><div>{['BỆNH VIỆN','CƠ QUAN NHÀ NƯỚC','TRƯỜNG HỌC','DOANH NGHIỆP','ĐỐI TÁC CÔNG NGHỆ'].map(x=><span key={x}>{x}</span>)}</div></div></section>
  <section className="cta-section" id="contact"><div><span>ĐỒNG HÀNH CÙNG TAGTECH</span><h2>Sẵn sàng chuyển đổi số<br/>cùng TAGTECH?</h2><p>Hãy chia sẻ bài toán của bạn. Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn giải pháp phù hợp.</p><a className="button white" href={`mailto:${contact.email||'info@tagtech.vn'}`}>Liên hệ ngay</a></div></section>
 </main><Footer contact={contact} tagline={data.brand?.tagline}/></>
}
