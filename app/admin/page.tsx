"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { 
  FileText, 
  Sparkles, 
  Star, 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Settings, 
  ArrowUpRight,
  ExternalLink
} from "lucide-react"

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts")
      const data = await res.json()
      if (data.posts) {
        setPosts(data.posts)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (folder: string, slug: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return
    try {
      const res = await fetch("/api/admin/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, slug }),
      })
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => !(p.folder === folder && p.slug === slug)))
      }
    } catch (e) {
      alert("Lỗi khi xóa bài viết")
    }
  }

  const countCungChuc = posts.filter((p) => p.folder === "cung-chuc").length
  const countSao = posts.filter((p) => p.folder === "sao").length
  const countThuKho = posts.filter((p) => p.folder === "thu-kho").length

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gradient">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-0.5">
            Quản lý toàn bộ nội dung, bài viết và thiết lập website Tử Vi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/posts/editor"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light transition-all shadow-md shadow-gold/20"
          >
            <Plus size={15} />
            <span>Soạn Bài Mới</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-border text-foreground font-medium text-xs hover:border-gold/50 transition-all"
          >
            <Settings size={15} />
            <span>Cài Đặt</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card glass className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs text-muted font-medium uppercase tracking-wider">Tổng Bài Viết</p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-0.5">{posts.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <FileText size={18} />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-2 truncate">Tất cả bài viết</p>
        </Card>

        <Card glass className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs text-muted font-medium uppercase tracking-wider">12 Cung Chức</p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-0.5">{countCungChuc}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen size={18} />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-2 truncate">cung-chuc</p>
        </Card>

        <Card glass className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs text-muted font-medium uppercase tracking-wider">Các Sao Tử Vi</p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-0.5">{countSao}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
              <Star size={18} />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-2 truncate">sao</p>
        </Card>

        <Card glass className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs text-muted font-medium uppercase tracking-wider">Thư Kho Kiến Thức</p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-0.5">{countThuKho}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Sparkles size={18} />
            </div>
          </div>
          <p className="text-[10px] text-muted mt-2 truncate">thu-kho</p>
        </Card>
      </div>

      {/* Recent Posts Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-foreground">
            Bài Viết Mới Nhất
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs text-gold hover:underline flex items-center gap-1 font-medium"
          >
            <span>Toàn bộ ({posts.length})</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted text-xs glass rounded-2xl">
            Đang tải dữ liệu bài viết...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center glass rounded-2xl border border-dashed border-border space-y-2">
            <p className="text-muted text-xs">Chưa có bài viết nào.</p>
            <Link
              href="/admin/posts/editor"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold text-black font-semibold text-xs"
            >
              <Plus size={13} />
              Soạn bài viết
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile View: Clean Vertical Cards (Không bị tràn/dịch chuyển ngang) */}
            <div className="block md:hidden space-y-3 w-full">
              {posts.slice(0, 6).map((post) => (
                <div
                  key={`${post.folder}-${post.slug}`}
                  className="glass p-4 rounded-xl border border-border/80 space-y-2.5 w-full"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-foreground text-sm leading-snug">
                      {post.meta.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-[10px] font-semibold shrink-0">
                      {post.folder}
                    </span>
                  </div>

                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {post.meta.excerpt || "Không có tóm tắt"}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <span className="text-[11px] text-muted">{post.meta.publishedAt || "Chưa ghi"}</span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/${post.folder}/${post.slug}`}
                        target="_blank"
                        className="px-2 py-1 rounded-md bg-secondary text-muted hover:text-foreground border border-border text-[11px] inline-flex items-center gap-1"
                      >
                        <ExternalLink size={11} />
                        <span>Xem</span>
                      </Link>
                      <Link
                        href={`/admin/posts/editor?folder=${post.folder}&slug=${post.slug}`}
                        className="px-2.5 py-1 rounded-md bg-gold/15 text-gold border border-gold/30 text-[11px] inline-flex items-center gap-1 font-medium"
                      >
                        <Edit3 size={11} />
                        <span>Sửa</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.folder, post.slug, post.meta.title)}
                        className="px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={11} />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Clean Table */}
            <div className="hidden md:block glass rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/70 text-muted uppercase text-[11px] font-semibold border-b border-border">
                  <tr>
                    <th className="py-3.5 px-4">Tiêu Đề</th>
                    <th className="py-3.5 px-4">Chuyên Mục</th>
                    <th className="py-3.5 px-4">Đường Dẫn</th>
                    <th className="py-3.5 px-4">Ngày Đăng</th>
                    <th className="py-3.5 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {posts.slice(0, 8).map((post) => (
                    <tr key={`${post.folder}-${post.slug}`} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-foreground max-w-xs truncate">
                        {post.meta.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-[11px] font-medium">
                          {post.folder}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-muted text-xs font-mono">
                        /{post.folder}/{post.slug}
                      </td>
                      <td className="py-3.5 px-4 text-muted text-xs">
                        {post.meta.publishedAt || "Chưa ghi"}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/admin/posts/editor?folder=${post.folder}&slug=${post.slug}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs hover:border-gold hover:text-gold border border-border transition-colors"
                        >
                          <Edit3 size={13} />
                          <span>Sửa</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.folder, post.slug, post.meta.title)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Xóa</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
