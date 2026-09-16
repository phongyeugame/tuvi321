import { LaSoTuVi, Cung, SaoChiTiet } from "@/lib/tuvi/types";
import { TuViChartData, PalaceData, StarItem } from "./types";
import { TRADITIONAL_PALACE_LAYOUT, getStarNguHanh, formatTime2Digits } from "./constants";
import { computeChartLines } from "./lines";

// Chuyển đổi sao chi tiết từ backend sang StarItem của SVG chart
function mapSaoToStarItem(sao: SaoChiTiet, defaultCat: "main" | "auspicious" | "inauspicious"): StarItem {
  return {
    name: sao.ten,
    brightness: sao.trangThai,
    nguHanh: sao.nguHanh || getStarNguHanh(sao.ten),
    category: sao.loai === "chinh" ? "main" : sao.loai === "cat" ? "auspicious" : sao.loai === "hung" ? "inauspicious" : defaultCat,
  };
}

// Chuyển đổi tên sao chuỗi đơn thuần sang StarItem kèm Ngũ Hành
function mapStringToStarItem(tenSao: string, category: "auspicious" | "inauspicious" | "main"): StarItem {
  return {
    name: tenSao,
    category,
    nguHanh: getStarNguHanh(tenSao),
  };
}

// Hàm Adapter: Chuyển đổi đối tượng LaSoTuVi hiện tại sang TuViChartData
export function adaptLaSoTuViToChartData(data: LaSoTuVi): TuViChartData {
  const cungByChi: Record<string, Cung> = {};
  data.cung.forEach((c) => {
    cungByChi[c.viTri] = c;
  });

  const palaces: PalaceData[] = Object.entries(TRADITIONAL_PALACE_LAYOUT).map(([chi, layout]) => {
    const c = cungByChi[chi];

    const majorStars: StarItem[] = (c?.chinhTinhChiTiet || []).map((s) => ({
      name: s.ten,
      brightness: s.trangThai || "Đ",
      nguHanh: s.nguHanh || getStarNguHanh(s.ten) || "Thổ",
      category: "main",
    }));

    // Cát tinh
    const auspiciousStars: StarItem[] = (c?.catTinh || []).map((ten) =>
      mapStringToStarItem(ten, "auspicious")
    );

    // Sát/Hung tinh
    const inauspiciousStars: StarItem[] = (c?.hungTinh || []).map((ten) =>
      mapStringToStarItem(ten, "inauspicious")
    );

    // Tứ hóa
    const tuHoaArray = c?.tuHoa || [];
    const parseTarget = (str?: string) => {
      if (!str) return "";
      if (str.startsWith("Tự Hóa") || str.startsWith("Tự ")) return "Tự";
      const parts = str.split("🐅 ");
      return parts.length > 1 ? parts[1].trim() : str;
    };
    const locStr = tuHoaArray[0] || "";
    const quyenStr = tuHoaArray[1] || "";
    const khoaStr = tuHoaArray[2] || "";
    const kyStr = tuHoaArray[3] || "";

    const transformations = {
      loc: parseTarget(locStr),
      isTuLoc: locStr.includes("Tự Hóa") || locStr.includes("Tự "),
      quyen: parseTarget(quyenStr),
      isTuQuyen: quyenStr.includes("Tự Hóa") || quyenStr.includes("Tự "),
      khoa: parseTarget(khoaStr),
      isTuKhoa: khoaStr.includes("Tự Hóa") || khoaStr.includes("Tự "),
      ky: parseTarget(kyStr),
      isTuKy: kyStr.includes("Tự Hóa") || kyStr.includes("Tự "),
    };

    return {
      id: chi,
      name: (c?.ten || "MỆNH").toUpperCase(),
      branch: chi,
      stemBranchTag: c?.canChiShort || `${c?.canChi || chi}`,
      earthlyBranch: chi,
      majorStars,
      auspiciousStars,
      inauspiciousStars,
      otherStars: [],
      transformations,
      ageRange: c?.daiHan ?? 24,
      lifeStage: c?.trangSinh || "Trường sinh",
      annualStemBranch: c?.tieuHanNam || `Năm ${chi}`,
      monthNumber: c?.nguyetHan || layout.col + layout.row + 1,
      isMenh: (c?.ten || "").toLowerCase().includes("mệnh"),
      isThan: c?.isThan,
      triet: c?.triet,
      tuan: c?.tuan,
      gridCol: layout.col,
      gridRow: layout.row,
      pastelBgColor: layout.pastelBg,
    };
  });

  const chartData: TuViChartData = {
    user: {
      name: data.input.hoTen || "Đương Số",
      gender: data.input.gioiTinh === "nam" ? "Nam" : "Nữ",
      solarDate: data.solarDate
        ? `${String(data.solarDate.ngay).padStart(2, "0")}/${String(data.solarDate.thang).padStart(2, "0")}/${data.solarDate.nam}`
        : `${data.input.ngay}/${data.input.thang}/${data.input.nam}`,
      lunarDate: `${String(data.lunarDate.ngay).padStart(2, "0")}/${String(data.lunarDate.thang).padStart(2, "0")}/${data.lunarDate.nam}`,
      birthHour: `giờ ${data.canChi.gio} (${data.input.birthTime || (data.input.birthHour !== undefined ? formatTime2Digits(data.input.birthHour, data.input.birthMinute || 0) : "07:30")})`,
      stemsBranches: {
        year: data.canChi.nam,
        month: data.canChi.thang,
        day: data.canChi.ngay,
        hour: data.canChi.gio,
      },
      cuc: data.cuc || "Mộc tam cục",
      menh: data.nguHanh || "Bạch Lạp Kim (vàng chân đèn)",
      amDuong: data.amDuongMenh ? `${data.amDuongMenh} (${data.amDuongThuanLy || "Âm Dương thuận lý"})` : "Âm Nam (Âm Dương thuận lý)",
      menhKhacCuc: data.menhKhacCuc,
      camTinh: data.camTinh || "Con rắn, xuất tướng tinh con thỏ",
      chuMenh: data.chuMenh || "Vũ Khúc",
      chuThan: data.chuThan || "Thiên Cơ",
      conNha: data.conNha || "Con nhà BẠCH ĐẾ (trường thành)",
      doMang: data.doMang || "Ông Quan Đế độ mạng",
      canLuong: data.canLuong || "4 lượng 0 chỉ",
      hanNam: data.hanNam || "Bính Ngọ (2026)",
      lapLuc: `${data.lapLuc || "10:32 phút, ngày 26/04/2026"} tại TUVICAIVANMENH.COM`,
      diemLaSo: data.diemLaSo ?? 36,
      matrixScores: (data.diemCung as Record<string, number | string>) || {
        "Mệnh": 1.7,
        "Phụ mẫu": 6.7,
        "Phúc đức": 3.6,
        "Điền trạch": 0,
        "Quan lộc": -8,
        "Nô bộc": -10,
        "Thiên di": -7,
        "Tật ách": 10,
        "Tài bạch": 3.3,
        "Tử tức": 12.4,
        "Thu thê": 14.4,
        "Huynh đệ": -1,
        "Mệnh Khắc Cục": -2,
        "Âm Dương thuận lý": 1.5,
      },
    },
    palaces,
    metadata: {
      title: "LÁ SỐ TỬ VI",
      subtitle: `${(data.adminName || "Nguyễn Quốc Trưởng").toUpperCase()} - ${(data.adminPhone || "0865341434").replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}`,
      adminName: data.adminName || "Nguyễn Quốc Trưởng",
      adminPhone: data.adminPhone || "0865341434",
      generatedAt: new Date().toISOString(),
    },
  };

  chartData.lines = computeChartLines(chartData);
  return chartData;
}


