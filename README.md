# PROMPT VIBECODE ĐẦY ĐỦ — WEBSITE TRA CỨU TỬ VI (Full-Stack)

Copy toàn bộ nội dung dưới đây, dán vào công cụ vibecode (Claude Code, Cursor, v0, Bolt...) để dựng project từ đầu đến cuối.

**Phạm vi giai đoạn 1**: không cần đăng ký/đăng nhập, không cần thanh toán/premium, không cần trang admin — nội dung quản lý trực tiếp qua code/data file. Kiến trúc vẫn được thiết kế để dễ mở rộng thêm 3 tính năng này sau này mà không phải viết lại từ đầu.

---

## 🎯 TỔNG QUAN DỰ ÁN

Website **"Tra Cứu Tử Vi"** — công cụ tra cứu tử vi trọn đời (an sao, luận giải) kết hợp blog kiến thức tử vi (cung chức, các sao, xem tuổi). Người dùng nhập ngày/giờ sinh → hệ thống tính toán và trả về lá số tử vi + luận giải, không cần tạo tài khoản.

---

## 🧱 TECH STACK (FULL-STACK MỘT CODEBASE)

- **Framework chính**: **Next.js 14 (App Router) + TypeScript** — dùng luôn cho cả frontend lẫn backend (API Routes / Server Actions), tránh phải quản lý 2 project riêng biệt.
- **Styling**: TailwindCSS + Framer Motion (animation) — theo đúng design system đã chốt ở phần trước (nền đen, gold, bento grid, scroll reveal, glassmorphism, hover lift).
- **Nội dung bài viết (blog)**: dùng **MDX** hoặc file JSON/TS trong thư mục `/content` — không cần CMS, sửa nội dung bằng cách sửa file trực tiếp trong code. Cấu trúc rõ ràng để sau này dễ chuyển sang CMS (Sanity/Strapi) nếu cần.
- **Logic tính toán tử vi** (phần "backend" quan trọng nhất):
  - Viết bằng **TypeScript thuần**, đặt trong `/lib/tuvi/`.
  - Chuyển đổi Dương lịch ↔ Âm lịch: thuật toán Hồ Ngọc Đức (implement thuần JS, không phụ thuộc API ngoài để tránh rate-limit/downtime).
  - An sao tử vi (Tử Vi Đẩu Số): tính Cung Mệnh, 12 cung, an 14 chính tinh + phụ tinh dựa trên năm/tháng/ngày/giờ sinh theo Can Chi.
  - Đây là phần thuật toán phức tạp nhất — nếu bạn/AI chưa có sẵn thuật toán đầy đủ, giai đoạn đầu có thể:
    1. Tính đúng phần Âm–Dương lịch, Can Chi, Cung Mệnh, Ngũ Hành (làm được ngay).
    2. Để phần an sao chi tiết (14 chính tinh) ở dạng mock/placeholder trước, sau đó thay bằng thuật toán thật hoặc tích hợp thư viện mã nguồn mở tiếng Việt về Tử Vi Đẩu Số.
- **Không cần database ở giai đoạn 1** vì không lưu tài khoản/lịch sử. Nếu muốn lưu lại kết quả tra cứu tạm thời để chia sẻ link (ví dụ `/ket-qua/[id]`), có thể dùng:
  - **Cách đơn giản nhất**: encode toàn bộ input vào query string/URL, không cần lưu server-side.
  - **Nếu muốn có link ngắn gọn + lưu**: dùng **SQLite** (qua Prisma) hoặc **Supabase (Postgres free tier)** — chỉ 1 bảng `lookups` (id, input_data, created_at). Nhẹ, không cần auth.
- **Deploy**: Vercel (miễn phí, tối ưu sẵn cho Next.js).
- **SEO**: Next.js Metadata API cho từng route, sitemap.xml tự sinh, Open Graph image động cho từng bài viết.

---

## 🎨 DESIGN SYSTEM (giữ nguyên từ bản trước)

```css
--color-bg-primary: #0A0A0A;
--color-bg-secondary: #141414;
--color-gold-primary: #D4AF37;
--color-gold-light: #F4E4A6;
--color-gold-gradient: linear-gradient(135deg, #D4AF37 0%, #F4E4A6 50%, #D4AF37 100%);
--color-text-primary: #F5F5F0;
--color-text-secondary: #A8A8A0;
--color-border: rgba(212, 175, 55, 0.2);
--color-glass-bg: rgba(10, 10, 10, 0.6);
```
- Bo góc card: 20–24px. Shadow hover: glow vàng nhẹ `0 0 20px rgba(212,175,55,0.25)`.
- Font tiêu đề: serif Á Đông (Noto Serif / Playfair Display). Font nội dung: Be Vietnam Pro / Inter (hỗ trợ dấu tiếng Việt đầy đủ).

---

## 🗺️ SITEMAP — TOÀN BỘ CÁC TRANG CẦN CÓ

| Route | Mô tả |
|---|---|
| `/` | Trang chủ: Hero form tra cứu nhanh + Bento grid công cụ + giới thiệu + cung chức + sao + testimonial |
| `/tra-cuu` | Form tra cứu chi tiết đầy đủ (giống ảnh mẫu bạn gửi: họ tên, SĐT tuỳ chọn, ngày/giờ sinh, giới tính, xem vận hạn theo năm) |
| `/ket-qua` | Trang kết quả lá số tử vi — hiển thị biểu đồ 12 cung dạng bánh xe (SVG) + luận giải từng cung |
| `/xem-tuoi/vo-chong` | Công cụ xem tuổi vợ chồng (nhập 2 ngày sinh) |
| `/xem-tuoi/ket-hon` | Công cụ xem tuổi kết hôn (chọn năm cưới phù hợp) |
| `/xem-tuoi/sinh-con` | Công cụ xem tuổi sinh con hợp tuổi bố mẹ |
| `/xem-tuoi/lam-nha` | Công cụ xem tuổi làm nhà, xây nhà |
| `/cung-chuc` | Danh sách bài viết về 12 cung chức (Cung Mệnh, Cung Phụ Mẫu...) |
| `/cung-chuc/[slug]` | Chi tiết từng bài |
| `/sao` | Danh sách bài viết về các sao trong tử vi |
| `/sao/[slug]` | Chi tiết từng sao |
| `/thu-kho` | Kho kiến thức tổng hợp (Kinh dịch, phong thuỷ...) |
| `/thu-kho/[slug]` | Chi tiết bài viết |
| `/gioi-thieu` | Giới thiệu về website |
| `/lien-he` | Form liên hệ (gửi qua email, dùng Resend hoặc Nodemailer) |
| `/chinh-sach/*` | Các trang chính sách (bản quyền, bảo mật, cookies) — nội dung tĩnh |

> Kiến trúc route đã để sẵn chỗ cho `/dang-nhap`, `/tai-khoan`, `/premium`, `/admin` — chỉ cần thêm khi cần mở rộng, không ảnh hưởng cấu trúc hiện tại.

---

## 🧩 CẤU TRÚC THƯ MỤC

```
/app
  /(marketing)
    page.tsx                  → Trang chủ
    gioi-thieu/page.tsx
    lien-he/page.tsx
  /tra-cuu/page.tsx
  /ket-qua/page.tsx
  /xem-tuoi/
    vo-chong/page.tsx
    ket-hon/page.tsx
    sinh-con/page.tsx
    lam-nha/page.tsx
  /cung-chuc/
    page.tsx
    [slug]/page.tsx
  /sao/
    page.tsx
    [slug]/page.tsx
  /thu-kho/
    page.tsx
    [slug]/page.tsx
  /chinh-sach/[slug]/page.tsx
  /api/
    tra-cuu/route.ts           → API tính lá số tử vi (POST: input ngày sinh → trả về JSON lá số)
    lien-he/route.ts           → API gửi email liên hệ
  layout.tsx
  sitemap.ts
  robots.ts

/components
  layout/
    Navbar.tsx
    Footer.tsx
    BackToTop.tsx
  ui/
    ScrollReveal.tsx           → wrapper Framer Motion tái sử dụng
    Card.tsx
    Button.tsx
  home/
    Hero.tsx
    ToolsBentoGrid.tsx
    AboutSection.tsx
    TestimonialCarousel.tsx
  blog/
    ArticleCard.tsx
    ArticleGrid.tsx
    TableOfContents.tsx
  tra-cuu/
    LookupForm.tsx
    LaSoWheel.tsx              → biểu đồ 12 cung dạng SVG
    CungDetail.tsx

/lib
  tuvi/
    lunar-convert.ts           → chuyển đổi âm-dương lịch
    can-chi.ts                 → tính Can Chi năm/tháng/ngày/giờ
    cung-menh.ts               → tính Cung Mệnh, Ngũ Hành Nạp Âm
    an-sao.ts                  → an 14 chính tinh + phụ tinh (thuật toán chính)
    types.ts                   → type định nghĩa LaSoTuVi, Cung, Sao...
  xem-tuoi/
    vo-chong.ts
    ket-hon.ts
  utils.ts

/content
  cung-chuc/*.mdx
  sao/*.mdx
  thu-kho/*.mdx
  testimonials.ts

/public
  images/
```

---

## 🔧 API DESIGN (Server-side, trong Next.js API Routes)

### `POST /api/tra-cuu`
**Input:**
```json
{
  "hoTen": "Nguyễn Văn A",
  "gioiTinh": "nam",
  "loaiLich": "duong",
  "ngay": 19,
  "thang": 1,
  "nam": 1997,
  "gio": "Suu",
  "namXemVanHan": 2026
}
```
**Xử lý (trong `/lib/tuvi/`):**
1. Nếu `loaiLich === "duong"` → convert sang âm lịch trước.
2. Tính Can Chi năm/tháng/ngày/giờ sinh.
3. Xác định Cung Mệnh, Cung Thân, Ngũ Hành Nạp Âm.
4. An 12 cung + các sao vào từng cung theo quy tắc Tử Vi Đẩu Số.
5. Trả về JSON lá số đầy đủ + luận giải sơ bộ theo vận hạn năm được chọn.

**Output:**
```json
{
  "canChi": { "nam": "Đinh Sửu", "thang": "...", "ngay": "...", "gio": "..." },
  "cungMenh": "...",
  "nguHanh": "Giản Hạ Thuỷ",
  "cung": [
    { "ten": "Mệnh", "sao": ["Tử Vi", "Thiên Phủ"], "luanGiai": "..." },
    ...
  ]
}
```

### `POST /api/lien-he`
Nhận form liên hệ, gửi email qua **Resend** (dễ tích hợp với Next.js, có free tier) hoặc Nodemailer + SMTP.

---

## 📄 CẤU TRÚC 1 BÀI VIẾT MDX (VÍ DỤ `/content/cung-chuc/cung-menh.mdx`)

```mdx
---
title: "Cung Mệnh Là Gì? Luận Giải Ý Nghĩa Các Sao Toạ Trong Cung Mệnh"
slug: "cung-menh"
category: "Cung chức"
image: "/images/cung-chuc/cung-menh.jpg"
publishedAt: "2026-05-23"
excerpt: "Cung Mệnh là cung quan trọng nhất trong 12 cung tử vi..."
---

Nội dung bài viết viết bằng Markdown/MDX ở đây...
```
→ Next.js dùng `next-mdx-remote` hoặc `@next/mdx` để render, tự động generate route `/cung-chuc/cung-menh`.

---

## 📐 BỐ CỤC UI (giữ nguyên từ bản trước, áp dụng cho toàn site)

- Single-column flow, mobile-first, scroll reveal (Framer Motion `whileInView` + stagger), hover lift micro-interactions, navbar glassmorphism khi cuộn.
- **Trang `/ket-qua`** cần thêm:
  - Biểu đồ 12 cung dạng bánh xe tròn (SVG tự vẽ, chia 12 ô như hình bát quái), mỗi ô click vào thì mở rộng hiển thị luận giải chi tiết (accordion + animation height).
  - Nút "Tải lá số PDF" (dùng `react-pdf` hoặc `jsPDF` để export) và "Chia sẻ link" (copy URL có query params).

---

## ✅ THỨ TỰ TRIỂN KHAI ĐỀ XUẤT (để vibecode từng bước, tránh làm 1 lần quá nhiều)

1. **Bước 1**: Dựng layout tổng (Navbar + Footer + design tokens Tailwind) + trang chủ với Hero + 1 Bento grid, chưa cần animation.
2. **Bước 2**: Thêm Framer Motion scroll reveal + micro-interactions cho các section trang chủ.
3. **Bước 3**: Viết logic `/lib/tuvi/lunar-convert.ts` + `can-chi.ts` + `cung-menh.ts` (phần tính toán nền tảng, không quá phức tạp).
4. **Bước 4**: Dựng trang `/tra-cuu` (form) + API `/api/tra-cuu` trả JSON (dùng mock data an sao trước nếu chưa xong thuật toán đầy đủ).
5. **Bước 5**: Dựng trang `/ket-qua` hiển thị lá số (biểu đồ SVG 12 cung).
6. **Bước 6**: Viết thuật toán an sao đầy đủ (`an-sao.ts`) để thay mock data.
7. **Bước 7**: Dựng hệ thống blog MDX (`/cung-chuc`, `/sao`, `/thu-kho`) + trang danh sách + chi tiết.
8. **Bước 8**: Dựng 4 công cụ `/xem-tuoi/*`.
9. **Bước 9**: SEO (metadata, sitemap, robots.txt, Open Graph) + trang liên hệ + chính sách.
10. **Bước 10**: Test responsive toàn site trên mobile thật, tối ưu performance (Lighthouse), deploy Vercel.

---

## 🚀 GHI CHÚ MỞ RỘNG SAU NÀY (không làm ở giai đoạn 1, nhưng kiến trúc đã chừa sẵn chỗ)

- **Tài khoản người dùng**: thêm sau bằng NextAuth.js (hỗ trợ Google login), thêm bảng `users` + `lookup_history` vào database.
- **Thanh toán/Premium**: tích hợp cổng thanh toán Việt Nam (VNPay/Momo) hoặc Stripe, thêm route `/premium`, khoá một phần luận giải chi tiết sau `paywall`.
- **Admin/CMS**: chuyển nội dung MDX sang Sanity.io hoặc tự viết trang admin đơn giản với NextAuth bảo vệ route `/admin`.

---

**Bắt đầu vibecode theo đúng thứ tự 10 bước ở trên, mỗi bước là một prompt riêng để dễ kiểm soát chất lượng code.**