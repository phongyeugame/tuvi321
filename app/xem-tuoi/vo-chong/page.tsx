"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  xemTuoiVoChong,
  KetQuaHopTuoi,
  getCungPhiBatTrach,
  extractNguHanh,
} from "@/lib/tuvi/hop-tuoi";
import { getCanChiNam } from "@/lib/tuvi/can-chi";
import { getNguHanhNapAm } from "@/lib/tuvi/cung-menh";
import {
  Heart,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Compass,
  Home,
  Baby,
  PhoneCall,
  MessageCircle,
  Award,
  ChevronDown,
  Info,
  Calendar,
  Flame,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

export default function XemTuoiVoChongPage() {
  const [namChong, setNamChong] = useState<number>(1990);
  const [namVo, setNamVo] = useState<number>(1992);
  const [activePreset, setActivePreset] = useState<string>("1990-1992");

  // Năm hiện tại để tính tuổi mụ
  const currentYear = 2026;

  // Tính toán real-time
  const ketQua: KetQuaHopTuoi = useMemo(() => {
    return xemTuoiVoChong(namChong, namVo);
  }, [namChong, namVo]);

  // Preview nhanh Can Chi và Mệnh khi gõ
  const previewChong = useMemo(() => {
    const canChi = getCanChiNam(namChong);
    const napAm = getNguHanhNapAm(canChi);
    const cungPhi = getCungPhiBatTrach(namChong, "Nam");
    return { canChi, napAm, cung: cungPhi.cung, hanh: cungPhi.hanh, tuoiMu: currentYear - namChong + 1 };
  }, [namChong, currentYear]);

  const previewVo = useMemo(() => {
    const canChi = getCanChiNam(namVo);
    const napAm = getNguHanhNapAm(canChi);
    const cungPhi = getCungPhiBatTrach(namVo, "Nu");
    return { canChi, napAm, cung: cungPhi.cung, hanh: cungPhi.hanh, tuoiMu: currentYear - namVo + 1 };
  }, [namVo, currentYear]);

  const presets = [
    { label: "1990 - 1992 (Canh Ngọ & Nhâm Thân)", chong: 1990, vo: 1992, id: "1990-1992" },
    { label: "1989 - 1995 (Kỷ Tỵ & Ất Hợi)", chong: 1989, vo: 1995, id: "1989-1995" },
    { label: "1994 - 1996 (Giáp Tuất & Bính Tý)", chong: 1994, vo: 1996, id: "1994-1996" },
    { label: "1998 - 2000 (Mậu Dần & Canh Thìn)", chong: 1998, vo: 2000, id: "1998-2000" },
    { label: "1986 - 1989 (Bính Dần & Kỷ Tỵ)", chong: 1986, vo: 1989, id: "1986-1989" },
  ];

  const handleApplyPreset = (chong: number, vo: number, id: string) => {
    setNamChong(chong);
    setNamVo(vo);
    setActivePreset(id);
  };

  const getBadgeColor = (danhGia: string) => {
    switch (danhGia) {
      case "Đại Cát":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Cát":
      case "Cát Khởi Sắc":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Bình Hòa":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Hung":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "Đại Hung":
      case "Cần Hóa Giải":
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/40";
    }
  };

  const getNguHanhColor = (hanh: string) => {
    switch (hanh) {
      case "Kim":
        return "text-slate-200 bg-slate-800/60 border-slate-600";
      case "Mộc":
        return "text-emerald-300 bg-emerald-950/60 border-emerald-700";
      case "Thủy":
        return "text-sky-300 bg-sky-950/60 border-sky-700";
      case "Hỏa":
        return "text-rose-300 bg-rose-950/60 border-rose-700";
      case "Thổ":
        return "text-amber-300 bg-amber-950/60 border-amber-700";
      default:
        return "text-gold";
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            BÁT TỰ & BÁT TRẠCH HÔN NHÂN CHI THUẬT
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold tracking-tight">
            Xem Tuổi Vợ Chồng
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Phân tích tường tận mức độ hòa hợp hôn nhân dựa trên 5 trụ Bát Tự cổ truyền:
            <span className="text-foreground font-medium"> Mệnh Nạp Âm</span>,
            <span className="text-foreground font-medium"> Thiên Can</span>,
            <span className="text-foreground font-medium"> Địa Chi</span>,
            <span className="text-foreground font-medium"> Cung Phi Du Thần</span> và
            <span className="text-foreground font-medium"> Cung Niên Mệnh</span> kèm trọn bộ bí pháp hóa giải.
          </p>
        </div>
      </ScrollReveal>

      {/* Input Selection Card */}
      <ScrollReveal delay={0.1}>
        <Card glass className="mb-8 border-gold/30 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gold/15 via-gold/5 to-gold/15 border-b border-gold/20 px-6 py-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-gold font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Nhập thông tin ngày sinh (Âm lịch)
            </span>
            <span className="text-xs text-muted">Hỗ trợ các năm từ 1940 - 2035</span>
          </div>

          <CardContent className="p-6 md:p-8 space-y-6">
            {/* 2 Cột Chồng & Vợ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột Chồng */}
              <div className="p-5 rounded-xl border border-border/80 bg-background/50 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <label className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    Chồng (Dương Nam)
                  </label>
                  <span className="text-xs text-muted">Tuổi mụ: {previewChong.tuoiMu} tuổi</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1940}
                      max={2035}
                      value={namChong}
                      onChange={(e) => {
                        setNamChong(parseInt(e.target.value) || 1990);
                        setActivePreset("");
                      }}
                      className="w-full text-xl font-bold bg-secondary/80 border border-border focus:border-gold rounded-lg px-4 py-2.5 text-foreground outline-none transition"
                      placeholder="1990"
                    />
                  </div>
                </div>

                {/* Info preview */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/50">
                  <div>
                    <span className="text-muted block">Can Chi:</span>
                    <span className="font-semibold text-gold text-sm">{previewChong.canChi}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Mệnh Nạp Âm:</span>
                    <span className="font-medium text-foreground">{previewChong.napAm}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Cung Phi:</span>
                    <span className="font-medium text-foreground">Cung {previewChong.cung} ({previewChong.hanh})</span>
                  </div>
                  <div>
                    <span className="text-muted block">Trạch Mệnh:</span>
                    <span className="font-medium text-foreground">{ketQua.chong.nhomBatTrach}</span>
                  </div>
                </div>
              </div>

              {/* Cột Vợ */}
              <div className="p-5 rounded-xl border border-border/80 bg-background/50 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <label className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    Vợ (Âm Nữ)
                  </label>
                  <span className="text-xs text-muted">Tuổi mụ: {previewVo.tuoiMu} tuổi</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1940}
                      max={2035}
                      value={namVo}
                      onChange={(e) => {
                        setNamVo(parseInt(e.target.value) || 1992);
                        setActivePreset("");
                      }}
                      className="w-full text-xl font-bold bg-secondary/80 border border-border focus:border-gold rounded-lg px-4 py-2.5 text-foreground outline-none transition"
                      placeholder="1992"
                    />
                  </div>
                </div>

                {/* Info preview */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/50">
                  <div>
                    <span className="text-muted block">Can Chi:</span>
                    <span className="font-semibold text-gold text-sm">{previewVo.canChi}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Mệnh Nạp Âm:</span>
                    <span className="font-medium text-foreground">{previewVo.napAm}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Cung Phi:</span>
                    <span className="font-medium text-foreground">Cung {previewVo.cung} ({previewVo.hanh})</span>
                  </div>
                  <div>
                    <span className="text-muted block">Trạch Mệnh:</span>
                    <span className="font-medium text-foreground">{ketQua.vo.nhomBatTrach}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gợi ý tuổi xem nhanh (Preset buttons) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-muted block">Gợi ý cặp tuổi thường xem:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset.chong, preset.vo, preset.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer ${
                      activePreset === preset.id
                        ? "bg-gold text-secondary font-semibold border-gold shadow"
                        : "bg-secondary/60 text-muted hover:text-foreground border-border hover:border-gold/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* OVERALL SCORE HERO SECTION */}
      <ScrollReveal delay={0.2}>
        <div className="mb-10 p-6 md:p-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-secondary/90 via-secondary/60 to-background shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular / Large Score Badge */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-36 h-36 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-gold/60 bg-background/80 shadow-inner p-4">
                <span className="text-4xl md:text-5xl font-serif font-black text-gold tracking-tight">
                  {ketQua.tongDiem}
                </span>
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                  Thang 10 điểm
                </span>
                <div className="absolute -bottom-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border uppercase shadow-md ${getBadgeColor(
                      ketQua.xepHang
                    )}`}
                  >
                    {ketQua.xepHang}
                  </span>
                </div>
              </div>
            </div>

            {/* Synthesis Verdict */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Kết Luận Tổng Thể:
                </span>
                <span className="text-sm font-semibold text-gold">
                  Chồng {ketQua.chong.canChi} ({ketQua.chong.namSinh}) & Vợ {ketQua.vo.canChi} ({ketQua.vo.namSinh})
                </span>
              </div>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                {ketQua.loiTongKet}
              </p>
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary border border-border">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Du Thần:{" "}
                  <strong className={ketQua.duThan.loai === "Cát" ? "text-emerald-400" : "text-rose-400"}>
                    {ketQua.duThan.ten} ({ketQua.duThan.loai === "Cát" ? "Cát Lành" : "Hung Hại"})
                  </strong>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary border border-border">
                  <Award className="w-3.5 h-3.5 text-gold" />
                  Mệnh: <strong>{ketQua.chong.nguHanhNapAm} vs {ketQua.vo.nguHanhNapAm}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2-COLUMN BÁT TỰ COMPARISON TABLE */}
      <ScrollReveal delay={0.25}>
        <Card glass className="mb-10 border-border/80 overflow-hidden shadow-lg">
          <CardHeader className="bg-secondary/40 border-b border-border/60 py-4 px-6">
            <CardTitle className="text-lg md:text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Bảng Đối Chiếu Bát Tự Hai Vợ Chồng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-muted text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 md:px-6 font-semibold">Yếu tố Bát Tự</th>
                    <th className="py-3 px-4 md:px-6 font-semibold text-blue-400">
                      Chồng ({ketQua.chong.namSinh})
                    </th>
                    <th className="py-3 px-4 md:px-6 font-semibold text-rose-400">
                      Vợ ({ketQua.vo.namSinh})
                    </th>
                    <th className="py-3 px-4 md:px-6 font-semibold text-gold">Nhận xét sơ bộ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Năm sinh & Can Chi</td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">
                      {ketQua.chong.namSinh} ({ketQua.chong.canChi})
                    </td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">
                      {ketQua.vo.namSinh} ({ketQua.vo.canChi})
                    </td>
                    <td className="py-3.5 px-4 md:px-6 text-foreground/80 font-medium">
                      Chênh lệch {Math.abs(ketQua.chong.namSinh - ketQua.vo.namSinh)} tuổi
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Mệnh Nạp Âm</td>
                    <td className="py-3.5 px-4 md:px-6 font-medium">
                      <span className={`inline-block px-2.5 py-0.5 rounded border text-xs ${getNguHanhColor(ketQua.chong.nguHanhNapAm)}`}>
                        {ketQua.chong.napAm}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 md:px-6 font-medium">
                      <span className={`inline-block px-2.5 py-0.5 rounded border text-xs ${getNguHanhColor(ketQua.vo.nguHanhNapAm)}`}>
                        {ketQua.vo.napAm}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 md:px-6 text-xs text-foreground/80">
                      {ketQua.nguHanhTru.tieuDeNhanh}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Thiên Can</td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">Can {ketQua.chong.can}</td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">Can {ketQua.vo.can}</td>
                    <td className="py-3.5 px-4 md:px-6 text-xs text-foreground/80">
                      {ketQua.thienCanTru.tieuDeNhanh}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Địa Chi</td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">Chi {ketQua.chong.chi}</td>
                    <td className="py-3.5 px-4 md:px-6 font-semibold text-foreground">Chi {ketQua.vo.chi}</td>
                    <td className="py-3.5 px-4 md:px-6 text-xs text-foreground/80">
                      {ketQua.diaChiTru.tieuDeNhanh}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Cung Phi Bát Trạch</td>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-foreground">
                      Cung {ketQua.chong.cungPhi} ({ketQua.chong.nhomBatTrach})
                    </td>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-foreground">
                      Cung {ketQua.vo.cungPhi} ({ketQua.vo.nhomBatTrach})
                    </td>
                    <td className="py-3.5 px-4 md:px-6">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getBadgeColor(ketQua.duThan.loai === "Cát" ? "Đại Cát" : "Hung")}`}>
                        {ketQua.duThan.ten} ({ketQua.duThan.loai === "Cát" ? "Cát" : "Hung"})
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-muted">Cung Niên Mệnh</td>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-foreground">
                      Hành {ketQua.chong.hanhCungPhi}
                    </td>
                    <td className="py-3.5 px-4 md:px-6 font-medium text-foreground">
                      Hành {ketQua.vo.hanhCungPhi}
                    </td>
                    <td className="py-3.5 px-4 md:px-6 text-xs text-foreground/80">
                      {ketQua.cungNienMenhTru.tieuDeNhanh}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* 5 DETAILED PILLARS OF ANALYSIS */}
      <div className="space-y-6 mb-12">
        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gold flex items-center gap-2">
              <Flame className="w-5 h-5 text-gold" />
              Luận Giải Chi Tiết 5 Trụ Hôn Nhân
            </h2>
            <span className="text-xs text-muted">Tối đa 2.0 điểm mỗi trụ</span>
          </div>
        </ScrollReveal>

        {/* Trụ 1: Ngũ Hành Bản Mệnh */}
        <ScrollReveal delay={0.32}>
          <Card glass className="border-border/80 hover:border-gold/40 transition">
            <CardHeader className="py-4 px-6 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif font-bold text-gold text-sm">
                  1
                </span>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {ketQua.nguHanhTru.ten}
                  </CardTitle>
                  <p className="text-xs text-muted">Mệnh Nạp Âm của 60 Hoa Giáp</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getBadgeColor(ketQua.nguHanhTru.danhGia)}`}>
                  {ketQua.nguHanhTru.danhGia} ({ketQua.nguHanhTru.diem} / {ketQua.nguHanhTru.diemToiDa} điểm)
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/50 text-xs md:text-sm text-muted space-y-1">
                {ketQua.nguHanhTru.chiTiet.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base leading-relaxed text-foreground/90 bg-secondary/20 p-4 rounded-xl border-l-4 border-gold">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Luận giải chuyên sâu:
                </h4>
                <p>{ketQua.nguHanhTru.phanTichChuyenSau}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Trụ 2: Thiên Can */}
        <ScrollReveal delay={0.34}>
          <Card glass className="border-border/80 hover:border-gold/40 transition">
            <CardHeader className="py-4 px-6 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif font-bold text-gold text-sm">
                  2
                </span>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {ketQua.thienCanTru.ten}
                  </CardTitle>
                  <p className="text-xs text-muted">Thiên Duyên Trời Ban & Tính Cách</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getBadgeColor(ketQua.thienCanTru.danhGia)}`}>
                  {ketQua.thienCanTru.danhGia} ({ketQua.thienCanTru.diem} / {ketQua.thienCanTru.diemToiDa} điểm)
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/50 text-xs md:text-sm text-muted space-y-1">
                {ketQua.thienCanTru.chiTiet.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base leading-relaxed text-foreground/90 bg-secondary/20 p-4 rounded-xl border-l-4 border-gold">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Luận giải chuyên sâu:
                </h4>
                <p>{ketQua.thienCanTru.phanTichChuyenSau}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Trụ 3: Địa Chi */}
        <ScrollReveal delay={0.36}>
          <Card glass className="border-border/80 hover:border-gold/40 transition">
            <CardHeader className="py-4 px-6 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif font-bold text-gold text-sm">
                  3
                </span>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {ketQua.diaChiTru.ten}
                  </CardTitle>
                  <p className="text-xs text-muted">Gốc Rễ Gia Đạo, Họ Hàng & Tài Chính</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getBadgeColor(ketQua.diaChiTru.danhGia)}`}>
                  {ketQua.diaChiTru.danhGia} ({ketQua.diaChiTru.diem} / {ketQua.diaChiTru.diemToiDa} điểm)
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/50 text-xs md:text-sm text-muted space-y-1">
                {ketQua.diaChiTru.chiTiet.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base leading-relaxed text-foreground/90 bg-secondary/20 p-4 rounded-xl border-l-4 border-gold">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Luận giải chuyên sâu:
                </h4>
                <p>{ketQua.diaChiTru.phanTichChuyenSau}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Trụ 4: Cung Phi Bát Tự (Du Thần) */}
        <ScrollReveal delay={0.38}>
          <Card glass className="border-border/80 hover:border-gold/40 transition">
            <CardHeader className="py-4 px-6 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif font-bold text-gold text-sm">
                  4
                </span>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {ketQua.cungPhiTru.ten}
                  </CardTitle>
                  <p className="text-xs text-muted">Bát Trạch Cổ Truyền & Trường Khí Ngôi Nhà</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getBadgeColor(ketQua.cungPhiTru.danhGia)}`}>
                  {ketQua.cungPhiTru.danhGia} ({ketQua.cungPhiTru.diem} / {ketQua.cungPhiTru.diemToiDa} điểm)
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/50 text-xs md:text-sm text-muted space-y-1">
                {ketQua.cungPhiTru.chiTiet.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base leading-relaxed text-foreground/90 bg-secondary/20 p-4 rounded-xl border-l-4 border-gold">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Luận giải chuyên sâu:
                </h4>
                <p>{ketQua.cungPhiTru.phanTichChuyenSau}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Trụ 5: Cung Niên Mệnh */}
        <ScrollReveal delay={0.4}>
          <Card glass className="border-border/80 hover:border-gold/40 transition">
            <CardHeader className="py-4 px-6 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center font-serif font-bold text-gold text-sm">
                  5
                </span>
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {ketQua.cungNienMenhTru.ten}
                  </CardTitle>
                  <p className="text-xs text-muted">Ngũ Hành của Cung Phi Tương Sinh/Khắc</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getBadgeColor(ketQua.cungNienMenhTru.danhGia)}`}>
                  {ketQua.cungNienMenhTru.danhGia} ({ketQua.cungNienMenhTru.diem} / {ketQua.cungNienMenhTru.diemToiDa} điểm)
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/50 text-xs md:text-sm text-muted space-y-1">
                {ketQua.cungNienMenhTru.chiTiet.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base leading-relaxed text-foreground/90 bg-secondary/20 p-4 rounded-xl border-l-4 border-gold">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Luận giải chuyên sâu:
                </h4>
                <p>{ketQua.cungNienMenhTru.phanTichChuyenSau}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* REMEDIES SECTION (BÍ PHÁP HÓA GIẢI XUNG KHẮC) */}
      <ScrollReveal delay={0.45}>
        <div className="mb-12 p-6 md:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-secondary/70 to-background shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
            <Compass className="w-7 h-7 text-gold flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gold">
                Bí Quyết Hóa Giải Xung Khắc & Gia Tăng Vượng Khí
              </h3>
              <p className="text-xs md:text-sm text-muted">
                Phương pháp cổ truyền chuẩn xác khi cặp đôi có điểm tương khắc hoặc muốn bồi đắp thêm phúc lộc
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phương pháp 1: Sinh con hợp mệnh */}
            <div className="p-5 rounded-xl bg-background/60 border border-border/80 space-y-3">
              <div className="flex items-center gap-2 text-gold font-semibold text-base">
                <Baby className="w-5 h-5 text-gold" />
                1. Chọn Năm Sinh Con Hóa Giải
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-foreground/90">
                {ketQua.hoaGiai.phuongPhapSinhCon}
              </p>
            </div>

            {/* Phương pháp 2: Phong thủy nhà ở Bát Trạch */}
            <div className="p-5 rounded-xl bg-background/60 border border-border/80 space-y-3">
              <div className="flex items-center gap-2 text-gold font-semibold text-base">
                <Home className="w-5 h-5 text-gold" />
                2. Bố Trí Phong Thủy Bát Trạch
              </div>
              <ul className="text-xs md:text-sm space-y-2 text-foreground/90">
                <li>
                  <strong className="text-gold">Cửa chính:</strong> {ketQua.hoaGiai.phuongPhapHuongNha.huongCuaChinh}
                </li>
                <li>
                  <strong className="text-gold">Hướng bếp:</strong> {ketQua.hoaGiai.phuongPhapHuongNha.huongBep}
                </li>
                <li>
                  <strong className="text-gold">Phòng ngủ & giường:</strong> {ketQua.hoaGiai.phuongPhapHuongNha.huongPhongNgu}
                </li>
                <li>
                  <strong className="text-gold">Ban thờ gia tiên:</strong> {ketQua.hoaGiai.phuongPhapHuongNha.huongBanTho}
                </li>
              </ul>
            </div>
          </div>

          {/* Phương pháp 3: Đạo nghĩa vợ chồng & Tu dưỡng */}
          <div className="p-5 rounded-xl bg-background/60 border border-border/80 space-y-2">
            <div className="flex items-center gap-2 text-gold font-semibold text-base">
              <Heart className="w-5 h-5 text-rose-400" />
              3. Đạo Nghĩa Vợ Chồng & Nhân Định Thắng Thiên
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/90 italic">
              &ldquo;{ketQua.hoaGiai.daoVoChong}&rdquo;
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* DEDICATED EXPERT CONSULTATION CARD: THẦY NGUYỄN QUỐC TRƯỞNG */}
      <ScrollReveal delay={0.5}>
        <div className="p-6 md:p-8 rounded-2xl border-2 border-gold/60 bg-gradient-to-br from-gold/15 via-secondary to-background shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase">
                Tư Vấn Phong Thủy & Bát Tự Trực Tiếp
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold">
                Thầy Nguyễn Quốc Trưởng
              </h3>
              <p className="text-sm text-foreground/80 max-w-xl leading-relaxed">
                Chuyên gia Luận Giải Lá Số Tử Vi, Bát Tự Hôn Nhân, Hóa Giải Xung Khắc Vợ Chồng,
                Chọn Ngày Cưới Hỏi & Phong Thủy Bát Trạch Đặt Bếp - Hướng Nhà.
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-gold">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Hotline / Zalo: 0865.341.434
                </span>
                <span className="text-xs text-muted">(Phục vụ tận tâm 24/7)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <a
                href="tel:0865341434"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold/90 text-secondary font-bold text-sm shadow-lg transition duration-200"
              >
                <PhoneCall className="w-4 h-4" />
                Gọi Ngay: 0865.341.434
              </a>
              <a
                href="https://zalo.me/0865341434"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Zalo Với Thầy
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
