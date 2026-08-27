# NHIỆM VỤ

Bạn là Senior Frontend Developer + UI Engineer.

Tôi sẽ cung cấp:

1. Source code website hiện tại.
2. Ảnh thiết kế tham chiếu gồm các page từ **01 đến 08**.

Hãy dựa trực tiếp vào các ảnh tham chiếu để **xây dựng lại giao diện website TAGTECH**.

Mục tiêu là website:

* Hiện đại.
* Sạch.
* Nhẹ nhàng.
* Chuyên nghiệp.
* Có cảm giác công nghệ nhưng **không quá AI, không quá futuristic, không lạm dụng glow/neon/3D**.
* Phù hợp website doanh nghiệp CNTT tại Việt Nam.
* Giao diện sáng, chủ đạo trắng + xanh TAGTECH.
* Responsive tốt trên desktop, tablet và mobile.

---

# I. NGUYÊN TẮC CHUNG

## 1. Không làm lại toàn bộ project nếu không cần thiết

Trước tiên hãy:

* Phân tích cấu trúc project hiện tại.
* Xác định framework đang dùng.
* Xác định router.
* Xác định component dùng chung.
* Xác định CSS framework.
* Xác định asset hiện có.
* Xác định API/data hiện tại.

Ưu tiên:

* Tái sử dụng code hiện có.
* Tái sử dụng component.
* Refactor những phần cần thiết.
* Không phá chức năng đang chạy.

Không tự ý đổi:

* Framework.
* Build system.
* Routing system.
* API architecture.
* Backend integration.

Trừ khi thực sự bắt buộc.

---

# II. DESIGN SYSTEM CHUNG

Toàn bộ 8 page phải dùng chung một design system.

## Màu sắc

Phong cách:

* White / very light gray background.
* Primary blue theo nhận diện TAGTECH.
* Navy dùng cho heading hoặc footer.
* Light blue dùng cho section background.
* Border xám xanh rất nhẹ.

Không sử dụng:

* Neon quá mạnh.
* Glow dày.
* Cyberpunk.
* Gradient nhiều màu.
* Background quá tối.
* Hình AI sci-fi quá mức.

Có thể dùng gradient xanh rất nhẹ ở hero hoặc CTA.

---

## Typography

Ưu tiên font sans-serif hiện đại như:

* Inter
* Be Vietnam Pro
* Manrope
* hoặc font hiện tại của project nếu phù hợp.

Hierarchy rõ:

H1:

* 44–56px desktop.
* 32–38px tablet.
* 28–32px mobile.

H2:

* 32–40px.

H3:

* 20–24px.

Body:

* 15–17px.

Line-height thoáng.

Không dùng font quá futuristic.

---

# III. COMPONENT DÙNG CHUNG

Không code mỗi page riêng biệt một cách lặp lại.

Hãy tạo/reuse các component:

* Header
* Navigation
* MobileMenu
* PageHero
* SectionHeading
* SolutionCard
* ProductCard
* ProjectCard
* NewsCard
* StatsSection
* CTASection
* Footer
* Breadcrumb
* FilterTabs
* ContactForm
* PartnerLogoList

Nếu project đã có component tương đương thì refactor lại thay vì tạo duplicate.

---

# IV. HEADER

Header dùng chung toàn website.

Menu chính:

* Trang chủ
* Giải pháp
* Sản phẩm
* Dự án
* Tin tức
* Về TAGTECH

Button bên phải:

**Liên hệ**

Header:

* nền trắng.
* sticky khi scroll nếu phù hợp.
* shadow rất nhẹ sau khi scroll.
* logo TAGTECH bên trái.

Hover menu:

* xanh.
* underline hoặc indicator nhẹ.

Active page phải được highlight.

Mobile:

* hamburger menu.
* menu slide/dropdown sạch.
* không overflow.

---

# V. PHASE TRIỂN KHAI

PHẢI triển khai theo đúng thứ tự sau.

Không làm tất cả cùng lúc.

---

# PHASE 01 — TRANG CHỦ

Route:

`/`

Thiết kế theo ảnh **01. TRANG CHỦ (HOMEPAGE)**.

## Hero

Bên trái:

Eyebrow:

**CÔNG NGHỆ • HIỆU QUẢ • TIN CẬY**

Heading:

**Giải pháp công nghệ
tạo giá trị thực cho
cuộc sống**

Description:

TAGTECH cung cấp các giải pháp và sản phẩm công nghệ hiện đại, giúp nâng cao hiệu quả quản lý, vận hành và chất lượng dịch vụ cho tổ chức, doanh nghiệp.

CTA:

**Khám phá giải pháp**

Secondary CTA:

**Xem sản phẩm**

Bên phải:

* sử dụng hình kiosk / sản phẩm công nghệ của TAGTECH.
* background xanh rất nhạt.
* có thể sử dụng shape mềm phía sau.
* không tạo AI city/cyberpunk.

---

## Value Proposition

4 item:

### Hiệu quả

Tối ưu quy trình, nâng cao hiệu suất vận hành.

### Tin cậy

Công nghệ ổn định, bảo mật và an toàn.

### Dễ sử dụng

Giao diện thân thiện, trải nghiệm đơn giản.

### Hỗ trợ 24/7

Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ.

---

## Giải pháp nổi bật

4 card:

### Y tế số

Giải pháp hiện đại hóa quy trình khám chữa bệnh và nâng cao trải nghiệm người dân.

### Chính quyền số

Giải pháp hỗ trợ đơn vị hành chính, nâng cao hiệu quả phục vụ người dân.

### Giáo dục số

Giải pháp chuyển đổi số trong giáo dục, đào tạo và quản lý.

### Doanh nghiệp số

Giải pháp công nghệ hỗ trợ quản lý và vận hành doanh nghiệp.

Có link:

**Xem tất cả**

---

## Thành tựu / Stats

Hiển thị:

**10+**
Năm kinh nghiệm

**200+**
Dự án đã triển khai

**100+**
Đối tác & Khách hàng

**50+**
Nhân sự chuyên gia

Các số liệu này nên khai báo trong data/config để sau này dễ chỉnh.

---

## Các section tiếp theo

Trang chủ nên tiếp tục có:

### Sản phẩm nổi bật

3–4 sản phẩm.

### Dự án tiêu biểu

3 case study.

### Tin tức mới

3 bài viết.

### Khách hàng & đối tác

Logo dạng grid hoặc horizontal list.

### CTA cuối trang

Heading:

**Sẵn sàng chuyển đổi số cùng TAGTECH?**

Description ngắn.

Button:

**Liên hệ ngay**

---

Sau khi hoàn thành Phase 01:

* kiểm tra desktop.
* tablet.
* mobile.
* kiểm tra spacing.
* kiểm tra menu.
* kiểm tra footer.
* kiểm tra loading.

Sau đó mới sang Phase 02.

---

# PHASE 02 — GIẢI PHÁP

Route:

`/giai-phap`

Thiết kế theo ảnh **02. GIẢI PHÁP**.

Hero đơn giản:

Heading:

**Giải pháp**

Description:

Các giải pháp công nghệ toàn diện giúp tối ưu quy trình, nâng cao hiệu quả hoạt động và tạo ra giá trị bền vững.

---

## Danh sách giải pháp

Tabs:

* Tất cả
* Y tế số
* Chính quyền số
* Giáo dục số
* Doanh nghiệp số

Các solution card dạng horizontal.

Mỗi card gồm:

* Thumbnail.
* Tên.
* Mô tả.
* Button/Xem chi tiết.

### Y tế số

Ứng dụng công nghệ trong quản lý bệnh viện, khám chữa bệnh, thanh toán không dùng tiền mặt, kiosk y tế thông minh.

### Chính quyền số

Số hóa quy trình thủ tục hành chính, nâng cao hiệu quả phục vụ người dân và doanh nghiệp.

### Giáo dục số

Hệ sinh thái quản lý đào tạo, học tập trực tuyến và các giải pháp số dành cho giáo dục.

### Doanh nghiệp số

Tư vấn và triển khai giải pháp chuyển đổi số, tối ưu vận hành và quản trị doanh nghiệp.

---

Cuối page có CTA:

**Bạn cần tư vấn giải pháp phù hợp?**

Button:

**Liên hệ ngay**

---

# PHASE 03 — SẢN PHẨM

Route:

`/san-pham`

Thiết kế theo ảnh **03. SẢN PHẨM**.

Hero:

Heading:

**Sản phẩm**

Description:

Các sản phẩm công nghệ do TAGTECH nghiên cứu và triển khai nhằm giải quyết các bài toán vận hành thực tế.

---

Filter:

* Tất cả
* Kiosk thông minh
* Phần mềm
* Thiết bị

Product grid responsive.

Các sản phẩm mẫu:

### Kiosk y tế thông minh

Hỗ trợ đăng ký khám, tra cứu thông tin, thanh toán, lấy số và các tiện ích dành cho người bệnh.

### Kiosk hành chính công

Hỗ trợ người dân lấy số, tra cứu thủ tục, khai báo và thực hiện dịch vụ hành chính.

### Phần mềm quản lý bệnh viện

Nền tảng hỗ trợ quản lý và vận hành các nghiệp vụ trong cơ sở y tế.

### Nền tảng thanh toán thông minh

Hỗ trợ thanh toán điện tử, QR Code và kết nối nhiều phương thức thanh toán.

### Phần mềm quản lý giáo dục

Giải pháp quản lý đào tạo, học tập và dữ liệu giáo dục.

### Thiết bị IoT & cảm biến

Hệ thống thiết bị thông minh phục vụ thu thập dữ liệu và giám sát.

---

Mỗi product card gồm:

* Image.
* Category.
* Product name.
* Description ngắn.
* Xem chi tiết.

Hover nhẹ.

Không dùng animation quá nhiều.

---

# PHASE 04 — TIN TỨC

Route:

`/tin-tuc`

Thiết kế theo ảnh **04. TIN TỨC**.

Hero:

Heading:

**Tin tức & Sự kiện**

Description:

Cập nhật những thông tin mới nhất từ TAGTECH và các xu hướng công nghệ nổi bật.

---

Category filter:

* Tất cả
* Tin tức
* Sự kiện
* Công nghệ
* Kiến thức

---

Layout:

Một bài nổi bật lớn bên trái.

Danh sách bài nhỏ bên phải.

Phía dưới là grid:

**Bài viết mới nhất**

Card gồm:

* Thumbnail.
* Category.
* Title.
* Description.
* Date.
* Link.

---

Tin demo có thể dùng:

### Chuyển đổi số y tế: Xu hướng tất yếu trong thời đại công nghệ 4.0

### Kiosk hành chính công – Giải pháp nâng cao chất lượng phục vụ

### Ứng dụng AI trong quản lý bệnh viện thông minh

### Thanh toán không dùng tiền mặt trong y tế

---

Phải chuẩn bị component để dữ liệu sau này có thể lấy từ API/CMS.

Không hardcode layout theo đúng số lượng hiện tại.

---

# PHASE 05 — CHI TIẾT TIN TỨC

Route dạng:

`/tin-tuc/:slug`

Ví dụ:

`/tin-tuc/chuyen-doi-so-y-te`

Thiết kế theo ảnh **05. CHI TIẾT TIN TỨC**.

---

Cấu trúc:

Breadcrumb.

Category.

H1 article title.

Date.

Cover image.

Nội dung article.

H2/H3.

Bullet list.

Image trong bài nếu có.

Sidebar:

**Tin tức liên quan**

3–5 bài.

---

Article width phải dễ đọc.

Không kéo text full 1400px.

Content khoảng 760–850px là hợp lý.

Responsive mobile thì sidebar xuống dưới.

---

# PHASE 06 — DỰ ÁN / CASE STUDY

Route:

`/du-an`

Thiết kế theo ảnh **06. DỰ ÁN / CASE STUDY**.

Hero:

Heading:

**Dự án tiêu biểu**

Description:

Những dự án TAGTECH đã triển khai và mang lại giá trị thực tế cho khách hàng.

---

Filter:

* Tất cả
* Y tế
* Chính quyền
* Giáo dục
* Doanh nghiệp

---

Project grid.

Mỗi project card:

* Image.
* Project name.
* Industry.
* Year.
* Short description.
* Xem chi tiết.

Ví dụ:

### Triển khai hệ thống Kiosk y tế tại Bệnh viện...

Category:
Y tế.

### Hệ thống Kiosk hành chính công

Category:
Chính quyền.

### Hệ thống quản lý bệnh viện

Category:
Y tế.

### Giải pháp số hóa trường học

Category:
Giáo dục.

---

Có thể bổ sung project detail route:

`/du-an/:slug`

nhưng chỉ triển khai nếu architecture hiện tại phù hợp.

---

# PHASE 07 — VỀ TAGTECH

Route:

`/ve-tagtech`

Thiết kế theo ảnh **07. VỀ TAGTECH**.

Hero:

Heading:

**Về TAGTECH**

Subtitle:

**Đổi mới • Chuyên nghiệp • Tin cậy**

Có hình ảnh văn phòng / công ty.

---

## TAGTECH là ai?

Nội dung ngắn gọn, tránh paragraph quá dài.

TAGTECH là doanh nghiệp công nghệ thông tin tại Việt Nam, tập trung nghiên cứu và triển khai các giải pháp chuyển đổi số trong nhiều lĩnh vực, đặc biệt là y tế, chính quyền và giáo dục.

---

## Tầm nhìn

Trở thành doanh nghiệp công nghệ uy tín, cung cấp các sản phẩm và giải pháp có giá trị thực tiễn cao.

---

## Sứ mệnh

Mang công nghệ đến gần hơn với cuộc sống, góp phần nâng cao chất lượng quản lý, vận hành và phục vụ cộng đồng.

---

## Giá trị cốt lõi

### Đổi mới

Không ngừng nghiên cứu và cải tiến công nghệ.

### Chuyên nghiệp

Cam kết chất lượng trong từng sản phẩm và dự án.

### Tin cậy

Xây dựng mối quan hệ dài hạn với khách hàng và đối tác.

---

## Con số ấn tượng

10+

200+

100+

50+

Dùng chung component StatsSection từ homepage.

---

## Đội ngũ lãnh đạo

Card gồm:

* Avatar.
* Họ tên.
* Chức vụ.

Thiết kế sạch, không quá cầu kỳ.

Nếu chưa có ảnh thật:

* sử dụng placeholder.
* không tự tạo ảnh AI của lãnh đạo.

---

# PHASE 08 — LIÊN HỆ

Route:

`/lien-he`

Thiết kế theo ảnh **08. LIÊN HỆ**.

Heading:

**Liên hệ với chúng tôi**

Description:

Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.

---

Layout 2 cột.

## Bên trái

Thông tin:

### Trụ sở chính

Lấy thông tin thực tế từ source hiện tại nếu đã có.

### Hotline

### Email

### Website

### Giờ làm việc

Không tự bịa dữ liệu nếu source hiện tại đã có thông tin thật.

---

## Bên phải

Form:

* Họ và tên *
* Email *
* Số điện thoại *
* Nội dung *

Button:

**Gửi thông tin**

Validate đầy đủ.

Nếu backend/API form đã tồn tại:

* giữ nguyên API.
* chỉ thay giao diện.

Nếu chưa có API:

* không tự tạo backend giả.
* tạo frontend form và TODO rõ ràng.

---

## Map

Hiển thị phía dưới.

Nếu project hiện tại đã có Google Maps embed thì reuse.

Nếu chưa có:

* tạo placeholder map hoặc embed theo cấu hình có sẵn.
* không hardcode API key vào source.

---

# VI. FOOTER

Footer dùng chung 8 page.

Bố cục 4 cột.

## TAGTECH

Mô tả ngắn.

Thông tin liên hệ.

## Giải pháp

* Y tế số
* Chính quyền số
* Giáo dục số
* Doanh nghiệp số

## Sản phẩm

* Kiosk y tế
* Kiosk hành chính công
* Nền tảng phần mềm
* Thiết bị IoT

## Công ty

* Về TAGTECH
* Dự án
* Tin tức
* Liên hệ

Cuối footer:

Copyright.

Social icon nếu có.

---

# VII. RESPONSIVE

Bắt buộc hỗ trợ:

## Desktop

≥ 1200px

Content max-width khoảng:

1200–1320px.

## Tablet

768–1199px.

Grid giảm column phù hợp.

## Mobile

< 768px.

Hero chuyển 1 column.

Cards chuyển 1 column hoặc 2 column tùy kích thước.

Header thành hamburger.

Spacing mobile giảm hợp lý.

Không được xuất hiện horizontal scroll.

---

# VIII. ANIMATION

Animation chỉ sử dụng nhẹ:

* fade-in.
* translateY 10–20px.
* hover card.
* image zoom nhẹ.
* button hover.

Duration khoảng:

200–500ms.

Không dùng:

* particle background.
* neon pulse.
* chữ chạy liên tục.
* 3D xoay.
* parallax nặng.
* animation gây lag.

Respect:

`prefers-reduced-motion`.

---

# IX. PERFORMANCE

Kiểm tra:

* Image optimization.
* Lazy loading.
* Không import thư viện nặng chỉ để làm hiệu ứng nhỏ.
* Tránh duplicate dependencies.
* Tránh request API lặp.
* Tránh component render không cần thiết.
* Không load tất cả ảnh full-size ngay khi mở trang.

Nếu dùng React/Next.js:

* component hóa hợp lý.
* tránh unnecessary state.
* tránh useEffect sai dependency.
* sử dụng memoization khi thực sự cần.

---

# X. SEO

Mỗi page phải có title riêng.

Ví dụ:

Trang chủ:

`TAGTECH | Giải pháp công nghệ & Chuyển đổi số`

Giải pháp:

`Giải pháp công nghệ | TAGTECH`

Sản phẩm:

`Sản phẩm công nghệ | TAGTECH`

Tin tức:

`Tin tức & Sự kiện | TAGTECH`

Dự án:

`Dự án tiêu biểu | TAGTECH`

Về TAGTECH:

`Về TAGTECH`

Liên hệ:

`Liên hệ | TAGTECH`

Nếu framework hỗ trợ metadata:
hãy triển khai metadata phù hợp.

---

# XI. DATA ARCHITECTURE

Không viết lặp dữ liệu trực tiếp trong JSX/HTML.

Tạo data structure phù hợp cho:

* solutions
* products
* projects
* news
* statistics
* navigation
* footer

Ví dụ:

```js
const solutions = [
  {
    id: "...",
    title: "...",
    description: "...",
    image: "...",
    category: "...",
    slug: "..."
  }
]
```

Nếu project đã có API/backend:
ưu tiên dùng dữ liệu từ API.

---

# XII. ASSET

Ưu tiên sử dụng:

1. Logo thật trong project.
2. Ảnh sản phẩm thật.
3. Ảnh kiosk thật.
4. Ảnh dự án thật.
5. Ảnh văn phòng thật.

Nếu thiếu ảnh:

* dùng placeholder sạch.
* tuyệt đối không tự tạo hình AI kỳ lạ làm thay đổi nhận diện doanh nghiệp.

Không tự chỉnh sửa logo TAGTECH.

Logo phải giữ đúng:

* tỷ lệ.
* màu.
* khoảng cách.

---

# XIII. CẤU TRÚC ROUTE MONG MUỐN

```text
/
├── /giai-phap
├── /san-pham
├── /du-an
├── /tin-tuc
│   └── /:slug
├── /ve-tagtech
└── /lien-he
```

Nếu project đang dùng routing khác thì giữ kiến trúc hiện tại nhưng đảm bảo URL tương đương.

---

# XIV. TRÌNH TỰ LÀM VIỆC

Hãy làm đúng workflow:

### Bước 1

Phân tích source code hiện tại.

### Bước 2

Tóm tắt architecture.

### Bước 3

Xác định component nào reuse.

### Bước 4

Thiết lập design system dùng chung.

### Bước 5

PHASE 01 — Homepage.

### Bước 6

Kiểm tra Phase 01.

### Bước 7

PHASE 02 — Giải pháp.

### Bước 8

PHASE 03 — Sản phẩm.

### Bước 9

PHASE 04 — Tin tức.

### Bước 10

PHASE 05 — Chi tiết tin tức.

### Bước 11

PHASE 06 — Dự án.

### Bước 12

PHASE 07 — Về TAGTECH.

### Bước 13

PHASE 08 — Liên hệ.

### Bước 14

Responsive toàn bộ.

### Bước 15

Fix UI inconsistency.

### Bước 16

Performance review.

### Bước 17

Build/test.

---

# XV. QUY TẮC QUAN TRỌNG

Không chỉ dựng một ảnh screenshot giống mockup.

Phải tạo **website thật có thể sử dụng được**.

Các page phải:

* có route.
* navigation được.
* responsive.
* component hóa.
* data-driven.
* maintainable.

Không tạo một component khổng lồ chứa toàn bộ website.

Không nhét mọi CSS vào một file nếu kiến trúc project đang chia module.

Không duplicate Header/Footer ở từng page.

Không hardcode pixel tuyệt đối để ép giống screenshot.

Ảnh tham chiếu chỉ dùng để xác định:

* bố cục.
* hierarchy.
* phong cách.
* spacing.
* vị trí component.

---

# XVI. MỨC ĐỘ GIỐNG MOCKUP

Ưu tiên theo thứ tự:

1. Bố cục.
2. Visual hierarchy.
3. Khoảng trắng.
4. Card style.
5. Typography.
6. Màu sắc.
7. Hình ảnh.
8. Animation.

Không cần pixel-perfect nếu làm ảnh hưởng responsive hoặc maintainability.

Giao diện cuối phải trông như một website doanh nghiệp thật, không phải concept Dribbble.

---

# XVII. KIỂM TRA SAU KHI HOÀN THÀNH

Chạy:

* lint.
* build.
* type check nếu có TypeScript.
* test nếu project có test.

Kiểm tra browser console.

Không được để:

* compile error.
* TypeScript error.
* broken import.
* 404 asset.
* duplicate key.
* hydration error.
* uncaught exception.
* request loop.

---

# XVIII. BÁO CÁO SAU KHI LÀM

Sau mỗi phase hãy báo:

### Files changed

Danh sách file đã sửa.

### Components created

Component mới.

### Components reused

Component tái sử dụng.

### Route completed

Route đã hoàn thiện.

### Responsive

Desktop / Tablet / Mobile.

### Remaining issues

Các vấn đề còn lại nếu có.

Không viết báo cáo dài dòng.

---

# BẮT ĐẦU

Hãy bắt đầu bằng việc:

1. Đọc toàn bộ cấu trúc source code được cung cấp.
2. Xem các ảnh thiết kế tham chiếu.
3. Không sửa code ngay lập tức trước khi hiểu architecture.
4. Xác định framework, router, CSS, components, assets và data source.
5. Sau đó triển khai **PHASE 01 — TRANG CHỦ** trước.
6. Sau khi Phase 01 ổn định mới tiếp tục tuần tự Phase 02 → Phase 08.

Mục tiêu cuối cùng là xây dựng một website TAGTECH **sạch, nhẹ nhàng, hiện đại, chuyên nghiệp, có chất công nghệ nhưng không mang cảm giác AI quá mức**, bám sát bộ mockup được cung cấp và vẫn phù hợp với source code hiện tại.
