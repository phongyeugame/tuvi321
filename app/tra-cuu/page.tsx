"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getChiFromHour, formatTime2Digits } from "@/components/tuvi-chart/constants"

export default function TraCuuPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hoTen: "",
    gioiTinh: "nam",
    loaiLich: "duong",
    ngay: 1,
    thang: 1,
    nam: 1990,
    namXemVanHan: new Date().getFullYear(),
  })

  // Quản lý riêng 2 trường GIỜ (00-23) và PHÚT (00-59)
  const [birthHour, setBirthHour] = useState<string>("07")
  const [birthMinute, setBirthMinute] = useState<string>("30")
  const [timeError, setTimeError] = useState<string>("")

  // Tự động suy ra Địa Chi giờ tương ứng
  const currentChi = useMemo(() => {
    const h = parseInt(birthHour, 10)
    const m = parseInt(birthMinute, 10)
    if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
      return ""
    }
    return getChiFromHour(h)
  }, [birthHour, birthMinute])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Xử lý nhập Giờ (00 - 23)
  const handleHourChange = (val: string) => {
    // Chỉ cho phép nhập số
    if (val !== "" && !/^\d+$/.test(val)) return

    setBirthHour(val)
    if (val === "") {
      setTimeError("Vui lòng nhập giờ sinh (00 - 23)")
      return
    }
    const num = parseInt(val, 10)
    if (num < 0 || num > 23) {
      setTimeError("Giờ sinh không hợp lệ! Giờ phải từ 00 đến 23.")
    } else {
      const minNum = parseInt(birthMinute, 10)
      if (!isNaN(minNum) && minNum >= 0 && minNum <= 59) {
        setTimeError("")
      }
    }
  }

  const handleHourBlur = () => {
    if (birthHour === "") {
      setBirthHour("00")
      return
    }
    const num = parseInt(birthHour, 10)
    if (num >= 0 && num <= 23) {
      setBirthHour(String(num).padStart(2, "0"))
    }
  }

  // Xử lý nhập Phút (00 - 59)
  const handleMinuteChange = (val: string) => {
    // Chỉ cho phép nhập số
    if (val !== "" && !/^\d+$/.test(val)) return

    setBirthMinute(val)
    if (val === "") {
      setTimeError("Vui lòng nhập phút sinh (00 - 59)")
      return
    }
    const num = parseInt(val, 10)
    if (num < 0 || num > 59) {
      setTimeError("Phút sinh không hợp lệ! Phút phải từ 00 đến 59.")
    } else {
      const hourNum = parseInt(birthHour, 10)
      if (!isNaN(hourNum) && hourNum >= 0 && hourNum <= 23) {
        setTimeError("")
      }
    }
  }

  const handleMinuteBlur = () => {
    if (birthMinute === "") {
      setBirthMinute("00")
      return
    }
    const num = parseInt(birthMinute, 10)
    if (num >= 0 && num <= 59) {
      setBirthMinute(String(num).padStart(2, "0"))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate giờ & phút sinh
    const h = parseInt(birthHour, 10)
    const m = parseInt(birthMinute, 10)

    if (isNaN(h) || h < 0 || h > 23) {
      setTimeError("Giờ sinh không hợp lệ! Giờ phải từ 00 đến 23.")
      return
    }
    if (isNaN(m) || m < 0 || m > 59) {
      setTimeError("Phút sinh không hợp lệ! Phút phải từ 00 đến 59.")
      return
    }

    setTimeError("")

    // Chuyển đổi định dạng: birthHour=7, birthMinute=30 -> "07:30"
    const birthTime = formatTime2Digits(h, m)
    const chi = getChiFromHour(h)

    // Convert to query string
    const query = new URLSearchParams({
      hoTen: formData.hoTen,
      gioiTinh: formData.gioiTinh,
      loaiLich: formData.loaiLich,
      ngay: formData.ngay.toString(),
      thang: formData.thang.toString(),
      nam: formData.nam.toString(),
      gio: chi,
      birthTime,
      birthHour: String(h),
      birthMinute: String(m),
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

              {/* Tách trường nhập GIỜ và PHÚT riêng biệt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Giờ & Phút sinh</span>
                    {currentChi && !timeError && (
                      <span className="text-xs text-gold font-mono font-semibold">
                        Giờ {currentChi} ({formatTime2Digits(birthHour, birthMinute)})
                      </span>
                    )}
                  </label>

                  <div className="flex items-center gap-2">
                    {/* Input Giờ */}
                    <div className="flex-1">
                      <input 
                        id="birthHour"
                        type="number"
                        min={0}
                        max={23}
                        value={birthHour}
                        onChange={(e) => handleHourChange(e.target.value)}
                        onBlur={handleHourBlur}
                        required
                        className={`w-full bg-secondary/50 border rounded-md px-3 py-2 text-center text-foreground font-mono font-bold text-base focus:outline-none transition-colors ${
                          timeError.includes("Giờ") ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                        }`}
                        placeholder="07"
                      />
                      <span className="text-[10px] text-muted block text-center mt-1">Giờ (00 - 23)</span>
                    </div>

                    <span className="text-lg font-bold text-gold pb-4">:</span>

                    {/* Input Phút */}
                    <div className="flex-1">
                      <input 
                        id="birthMinute"
                        type="number"
                        min={0}
                        max={59}
                        value={birthMinute}
                        onChange={(e) => handleMinuteChange(e.target.value)}
                        onBlur={handleMinuteBlur}
                        required
                        className={`w-full bg-secondary/50 border rounded-md px-3 py-2 text-center text-foreground font-mono font-bold text-base focus:outline-none transition-colors ${
                          timeError.includes("Phút") ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                        }`}
                        placeholder="30"
                      />
                      <span className="text-[10px] text-muted block text-center mt-1">Phút (00 - 59)</span>
                    </div>
                  </div>

                  {timeError && (
                    <p className="text-xs text-red-500 font-semibold mt-1">{timeError}</p>
                  )}
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
                  <span className="text-[10px] text-muted block mt-1">Mặc định: Năm hiện tại</span>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full cursor-pointer">
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
