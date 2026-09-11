"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { CHI } from "@/lib/tuvi/can-chi"

export default function TraCuuPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hoTen: "",
    gioiTinh: "nam",
    loaiLich: "duong",
    ngay: 1,
    thang: 1,
    nam: 1990,
    gio: "Tý",
    namXemVanHan: new Date().getFullYear(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Convert to query string
    const query = new URLSearchParams({
      hoTen: formData.hoTen,
      gioiTinh: formData.gioiTinh,
      loaiLich: formData.loaiLich,
      ngay: formData.ngay.toString(),
      thang: formData.thang.toString(),
      nam: formData.nam.toString(),
      gio: formData.gio,
      namXemVanHan: formData.namXemVanHan.toString(),
    }).toString()
    
    router.push(`/ket-qua?${query}`)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-4">Lập Lá Số Tử Vi</h1>
          <p className="text-muted">Nhập thông tin chính xác để có lá số và lời giải chi tiết nhất.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-xl">Thông Tin Bản Mệnh</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Họ và tên</label>
                <input 
                  type="text" 
                  name="hoTen"
                  required
                  value={formData.hoTen}
                  onChange={handleChange}
                  className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Giới tính</label>
                  <select 
                    name="gioiTinh"
                    value={formData.gioiTinh}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="nam">Nam</option>
                    <option value="nu">Nữ</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Loại lịch</label>
                  <select 
                    name="loaiLich"
                    value={formData.loaiLich}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="duong">Dương Lịch</option>
                    <option value="am">Âm Lịch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Ngày</label>
                  <input 
                    type="number" 
                    name="ngay"
                    min={1} max={31} required
                    value={formData.ngay}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tháng</label>
                  <input 
                    type="number" 
                    name="thang"
                    min={1} max={12} required
                    value={formData.thang}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Năm</label>
                  <input 
                    type="number" 
                    name="nam"
                    min={1900} max={2100} required
                    value={formData.nam}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Giờ sinh</label>
                  <select 
                    name="gio"
                    value={formData.gio}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  >
                    {CHI.map(chi => (
                      <option key={chi} value={chi}>Giờ {chi}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Năm xem hạn</label>
                  <input 
                    type="number" 
                    name="namXemVanHan"
                    required
                    value={formData.namXemVanHan}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full">
                  An Sao & Luận Giải
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  )
}
