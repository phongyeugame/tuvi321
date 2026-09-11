"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit3, Trash2, ExternalLink } from "lucide-react"

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string>("all")

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

  const filteredPosts = posts.filter((post) => {
    const matchesFolder = selectedFolder === "all" || post.folder === selectedFolder
    const matchesSearch =
      post.meta.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.meta.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gradient">
            Quản Lý Toàn Bộ Bài Viết
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-0.5">
            Chỉnh sửa, thêm mới hoặc xóa bài viết trong các chuyên mục.
          </p>
        </div>

        <Link
          href="/admin/posts/editor"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light transition-all shadow-md shadow-gold/20 shrink-0"
        >
          <Plus size={15} />
          <span>Thêm Bài Viết Mới</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 glass p-3.5 sm:p-4 rounded-2xl border border-border w-full">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề, slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {[
            { id: "all", label: "Tất Cả" },
            { id: "cung-chuc", label: "12 Cung Chức" },
            { id: "sao", label: "Các Sao" },
            { id: "thu-kho", label: "Thư Kho" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFolder(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedFolder === cat.id
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "bg-secondary/70 text-muted hover:text-foreground border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-8 text-center text-muted text-xs glass rounded-2xl">
          Đang tải danh sách bài viết...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-8 text-center glass rounded-2xl border border-dashed border-border space-y-2">
          <p className="text-muted text-xs">Không tìm thấy bài viết nào phù hợp.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card List: 100% full width, zero horizontal shift */}
          <div className="block md:hidden space-y-3 w-full">
            {filteredPosts.map((post) => (
              <div
                key={`${post.folder}-${post.slug}`}
                className="glass p-4 rounded-xl border border-border/80 space-y-2.5 w-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {post.meta.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-[10px] font-semibold shrink-0">
                    {post.folder}
                  </span>
                </div>

                <div className="text-[11px] text-muted font-mono truncate">
                  /{post.folder}/{post.slug}
                </div>

                <p className="text-xs text-muted/90 line-clamp-2 leading-relaxed">
                  {post.meta.excerpt || "Không có mô tả tóm tắt"}
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

          {/* Desktop Table View */}
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
                {filteredPosts.map((post) => (
                  <tr key={`${post.folder}-${post.slug}`} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-foreground max-w-sm">
                      <div className="truncate font-semibold">{post.meta.title}</div>
                      <div className="text-xs text-muted truncate mt-0.5">{post.meta.excerpt}</div>
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
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/${post.folder}/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-muted text-xs hover:text-foreground border border-border transition-colors"
                        title="Xem trực tiếp trên web"
                      >
                        <ExternalLink size={13} />
                        <span>Xem</span>
                      </Link>

                      <Link
                        href={`/admin/posts/editor?folder=${post.folder}&slug=${post.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold/15 text-gold text-xs hover:bg-gold hover:text-black border border-gold/30 transition-colors"
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
  )
}
