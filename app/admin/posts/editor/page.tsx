"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Edit3, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

function PostEditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editFolder = searchParams.get("folder")
  const editSlug = searchParams.get("slug")

  const isEditing = Boolean(editFolder && editSlug)

  const [folder, setFolder] = useState(editFolder || "cung-chuc")
  const [slug, setSlug] = useState(editSlug || "")
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split("T")[0])
  const [content, setContent] = useState("")

  const [isPreview, setIsPreview] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Auto-slugify title if new post
  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!isEditing && !slug) {
      const generatedSlug = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
      setSlug(generatedSlug)
    }
  }

  useEffect(() => {
    if (isEditing) {
      const fetchSinglePost = async () => {
        try {
          const res = await fetch(`/api/admin/posts?folder=${editFolder}&slug=${editSlug}`)
          const data = await res.json()
          if (data.meta) {
            setTitle(data.meta.title || "")
            setExcerpt(data.meta.excerpt || "")
            setPublishedAt(data.meta.publishedAt || new Date().toISOString().split("T")[0])
            setContent(data.content || "")
          }
        } catch (e) {
          setStatusMessage({ type: "error", text: "Lỗi tải thông tin bài viết" })
        } finally {
          setLoading(false)
        }
      }
      fetchSinglePost()
    }
  }, [isEditing, editFolder, editSlug])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)
    setSaving(true)

    try {
      const payload = {
        folder,
        slug,
        title,
        excerpt,
        publishedAt,
        content,
      }

      const res = await fetch("/api/admin/posts", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: isEditing ? "Đã cập nhật bài viết thành công!" : "Đã tạo bài viết mới thành công!" })
        if (!isEditing) {
          setTimeout(() => {
            router.push(`/admin/posts/editor?folder=${folder}&slug=${slug}`)
          }, 800)
        }
      } else {
        setStatusMessage({ type: "error", text: data.error || "Lỗi khi lưu bài viết" })
      }
    } catch (e) {
      setStatusMessage({ type: "error", text: "Lỗi kết nối máy chủ" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted text-sm">
        Đang tải dữ liệu bài viết...
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-secondary border border-border text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-gradient">
              {isEditing ? `Chỉnh Sửa: ${title || editSlug}` : "Soạn Bài Viết Mới"}
            </h1>
            <p className="text-muted text-xs mt-0.5">
              {isEditing ? `Đường dẫn: /${editFolder}/${editSlug}` : "Tạo bài viết mới trong kho kiến thức"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary border border-border text-xs font-medium text-foreground hover:border-gold/40 transition-colors"
          >
            {isPreview ? <Edit3 size={15} /> : <Eye size={15} />}
            <span>{isPreview ? "Quay lại soạn thảo" : "Xem trước"}</span>
          </button>

          <Button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light transition-all shadow-lg shadow-gold/20 cursor-pointer disabled:opacity-50"
          >
            <Save size={15} />
            <span>{saving ? "Đang lưu..." : isEditing ? "Cập Nhật Bài Viết" : "Xuất Bản Bài Viết"}</span>
          </Button>
        </div>
      </div>

      {/* Notification banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
            statusMessage.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Editor Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Meta Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 glass p-5 rounded-2xl border border-border">
          <div>
            <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
              Chuyên Mục
            </label>
            <select
              value={folder}
              disabled={isEditing}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-gold disabled:opacity-60"
            >
              <option value="cung-chuc">12 Cung Chức (cung-chuc)</option>
              <option value="sao">Các Sao Tử Vi (sao)</option>
              <option value="thu-kho">Thư Kho Kiến Thức (thu-kho)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
              Đường Dẫn Slug (Tên file)
            </label>
            <input
              type="text"
              required
              disabled={isEditing}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="sao-tu-vi"
              className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-gold font-mono disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
              Ngày Xuất Bản
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
              Tiêu Đề Bài Viết
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ví dụ: Ý Nghĩa Sao Tử Vi Tọa Thủ Cung Mệnh..."
              className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2 text-sm font-semibold text-foreground focus:outline-none focus:border-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
              Tóm Tắt Ngắn (Meta Description)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Đoạn tóm tắt nội dung bài viết hiển thị trên danh sách và kết quả tìm kiếm Google..."
              className="w-full bg-background/60 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>
        </div>

        {/* Content Markdown Editor / Preview */}
        <div className="glass p-5 rounded-2xl border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <label className="text-xs font-semibold uppercase text-muted tracking-wider">
              Nội Dung Bài Viết (Định Dạng Markdown)
            </label>
            <span className="text-xs text-gold">Hỗ trợ # H1, ## H2, **in đậm**, - gạch đầu dòng</span>
          </div>

          {isPreview ? (
            <div className="min-h-[400px] p-6 rounded-xl bg-black/40 border border-border/60 prose prose-invert max-w-none">
              <h1 className="text-3xl font-serif font-bold text-gold mb-4">{title || "Chưa có tiêu đề"}</h1>
              <p className="text-muted text-sm italic mb-6">{excerpt}</p>
              <div className="whitespace-pre-wrap leading-relaxed text-sm text-foreground/90 font-sans">
                {content || "Chưa có nội dung..."}
              </div>
            </div>
          ) : (
            <textarea
              rows={18}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết bằng định dạng Markdown tại đây...&#10;&#10;# Tiêu Đề Chính&#10;&#10;Nội dung phân tích chi tiết...&#10;&#10;## Đặc tính sao&#10;- Ngũ hành: Thổ&#10;- Vị trí: Đắc địa"
              className="w-full bg-background/50 border border-border rounded-xl p-4 text-sm font-mono text-foreground focus:outline-none focus:border-gold leading-relaxed"
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default function AdminPostEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Đang tải trình soạn thảo...</div>}>
      <PostEditorContent />
    </Suspense>
  )
}
