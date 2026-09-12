import fs from "fs"
import path from "path"
import matter from "gray-matter"
import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma"

const contentDir = path.join(process.cwd(), "content")

async function migrateData() {
  console.log("🚀 Bắt đầu quá trình di chuyển dữ liệu từ Flat-File sang PostgreSQL...")

  try {
    // 1. Migrate Admin Account
    const authFilePath = path.join(contentDir, "admin-auth.json")
    if (fs.existsSync(authFilePath)) {
      const authRaw = fs.readFileSync(authFilePath, "utf-8")
      const { username, password } = JSON.parse(authRaw)

      // Băm mật khẩu bằng bcryptjs để không lưu plaintext
      const hashedPassword = bcrypt.hashSync(password || "admin123@", 10)

      const admin = await prisma.admin.upsert({
        where: { username: username || "admin123" },
        update: { password: hashedPassword },
        create: {
          username: username || "admin123",
          password: hashedPassword,
        },
      })
      console.log(`✅ Đã di chuyển tài khoản Admin: "${admin.username}" (mật khẩu đã được mã hóa bcrypt)`)
    } else {
      // Tạo admin mặc định nếu chưa có file
      const defaultPassword = bcrypt.hashSync("admin123@", 10)
      await prisma.admin.upsert({
        where: { username: "admin123" },
        update: {},
        create: {
          username: "admin123",
          password: defaultPassword,
        },
      })
      console.log("✅ Đã khởi tạo tài khoản Admin mặc định: admin123")
    }

    // 2. Migrate Site Config
    const configPath = path.join(contentDir, "site-config.json")
    if (fs.existsSync(configPath)) {
      const configRaw = fs.readFileSync(configPath, "utf-8")
      const config = JSON.parse(configRaw)

      await prisma.siteConfig.upsert({
        where: { id: "default" },
        update: {
          siteName: config.siteName || "Tra Cứu Tử Vi",
          siteSlogan: config.siteSlogan || "Giải Mã Lá Số Tử Vi Của Riêng Bạn",
          siteDescription: config.siteDescription || "",
          adminName: config.adminName || "Nguyễn Quốc Trưởng",
          adminPhone: config.adminPhone || "0865341434",
          hotline: config.hotline || "0865.341.434",
          zalo: config.zalo || "0865341434",
          email: config.email || "contact@tuvi.vn",
          announcement: config.announcement || "",
          showAnnouncement: config.showAnnouncement ?? true,
          footerNote: config.footerNote || "",
        },
        create: {
          id: "default",
          siteName: config.siteName || "Tra Cứu Tử Vi",
          siteSlogan: config.siteSlogan || "Giải Mã Lá Số Tử Vi Của Riêng Bạn",
          siteDescription: config.siteDescription || "",
          adminName: config.adminName || "Nguyễn Quốc Trưởng",
          adminPhone: config.adminPhone || "0865341434",
          hotline: config.hotline || "0865.341.434",
          zalo: config.zalo || "0865341434",
          email: config.email || "contact@tuvi.vn",
          announcement: config.announcement || "",
          showAnnouncement: config.showAnnouncement ?? true,
          footerNote: config.footerNote || "",
        },
      })
      console.log("✅ Đã di chuyển Cấu hình Website (SiteConfig) thành công")
    }

    // 3. Migrate All Posts across folders
    const categories = ["sao", "cung-chuc", "thu-kho"]
    let postCount = 0

    for (const folder of categories) {
      const folderPath = path.join(contentDir, folder)
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".mdx"))
        for (const file of files) {
          const slug = file.replace(/\.mdx$/, "")
          const filePath = path.join(folderPath, file)
          const fileRaw = fs.readFileSync(filePath, "utf-8")
          const { data, content } = matter(fileRaw)

          const publishedDate = data.publishedAt ? new Date(data.publishedAt) : new Date()

          await prisma.post.upsert({
            where: {
              folder_slug: {
                folder,
                slug,
              },
            },
            update: {
              title: data.title || slug,
              excerpt: data.excerpt || "",
              content: content || "",
              category: data.category || null,
              image: data.image || null,
              publishedAt: isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
            },
            create: {
              folder,
              slug,
              title: data.title || slug,
              excerpt: data.excerpt || "",
              content: content || "",
              category: data.category || null,
              image: data.image || null,
              publishedAt: isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
            },
          })
          postCount++
          console.log(`   📄 [${folder}] ${slug} -> Đã lưu vào database`)
        }
      }
    }

    console.log(`🎉 HOÀN TẤT DI CHUYỂN DỮ LIỆU: Đã lưu ${postCount} bài viết vào PostgreSQL!`)
  } catch (error) {
    console.error("❌ Lỗi trong quá trình di chuyển dữ liệu:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrateData()
