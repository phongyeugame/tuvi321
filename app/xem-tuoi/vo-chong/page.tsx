"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getCanChiNam } from "@/lib/tuvi/can-chi"

export default function XemTuoiVoChongPage() {
  const [formData, setFormData] = useState({ namChong: 1990, namVo: 1992 })
  const [result, setResult] = useState<{ canChong: string, canVo: string, hopNhau: boolean } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const canChong = getCanChiNam(formData.namChong)
    const canVo = getCanChiNam(formData.namVo)
    
    // Logic siêu cơ bản (chỉ để demo)
    const hopNhau = Math.abs(formData.namChong - formData.namVo) % 3 !== 0 

    setResult({ canChong, canVo, hopNhau })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-4">Xem Tuổi Vợ Chồng</h1>
          <p className="text-muted">Tính toán mức độ hoà hợp, sinh khắc giữa tuổi vợ và tuổi chồng.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Card glass className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">Nhập Năm Sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-foreground">Năm sinh chồng (Âm lịch)</label>
                <input 
                  type="number" 
                  value={formData.namChong}
                  onChange={(e) => setFormData(p => ({...p, namChong: parseInt(e.target.value)}))}
                  className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:border-gold outline-none"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-foreground">Năm sinh vợ (Âm lịch)</label>
                <input 
                  type="number" 
                  value={formData.namVo}
                  onChange={(e) => setFormData(p => ({...p, namVo: parseInt(e.target.value)}))}
                  className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:border-gold outline-none"
                />
              </div>
              <Button type="submit" className="w-full md:w-auto px-8 cursor-pointer">Xem</Button>
            </form>
          </CardContent>
        </Card>
      </ScrollReveal>

      {result && (
        <ScrollReveal delay={0.2}>
          <Card glass className="border-gold/30">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Kết Quả Luận Giải</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted mb-1">Tuổi Chồng</p>
                  <p className="text-xl font-serif text-gold font-bold">{result.canChong}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted mb-1">Tuổi Vợ</p>
                  <p className="text-xl font-serif text-gold font-bold">{result.canVo}</p>
                </div>
              </div>
              
              <div className="text-center pt-6 border-t border-border mt-4">
                <h3 className="text-lg font-semibold mb-2">Đánh giá chung:</h3>
                {result.hopNhau ? (
                  <p className="text-green-400">Hai tuổi khá hoà hợp, gia đạo êm ấm, làm ăn thuận lợi.</p>
                ) : (
                  <p className="text-red-400">Hai tuổi có sự xung khắc nhẹ, cần nhường nhịn nhau nhiều hơn trong cuộc sống.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      )}
    </div>
  )
}
