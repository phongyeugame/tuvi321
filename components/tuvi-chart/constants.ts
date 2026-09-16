
// Kích thước SVG cố định chuẩn tỷ lệ 776:1280 của ảnh mẫu (1.5x: 1164 × 1920)
export const SVG_WIDTH = 1164;
export const SVG_HEIGHT = 1920;

// Lề ngoài bàn cờ: 0 (các ô cung chạm viền ngoài như ảnh in ấn truyền thống)
export const BOARD_PADDING = 0;

// Kích thước mỗi ô Cung (4 cột × 4 hàng)
export const PALACE_WIDTH = 291; // 1164 / 4
export const PALACE_HEIGHT = 480; // 1920 / 4

// Kích thước & Tọa độ khối Thiên Bàn Trung Tâm (chiếm 2x2 ô ở giữa: Hàng 1-2, Cột 1-2)
export const CENTER_WIDTH = 582; // 291 * 2
export const CENTER_HEIGHT = 960; // 480 * 2
export const CENTER_X = 291;
export const CENTER_Y = 480;

// =========================================================================
// 1. HỆ THỐNG MÀU NGŨ HÀNH TẬP TRUNG (CENTRALIZED NGŨ HÀNH COLOR CONFIG)
// =========================================================================
// Màu tương phản cao trên nền giấy kem / trắng ngà cổ điển (#FAF6EE / #FFFDF9)
// - KIM: Xám bạc kim loại đậm (7.2:1 contrast ratio, TUYỆT ĐỐI KHÔNG DÙNG TRẮNG TINH)
// - MỘC: Xanh lá đậm (Emerald / Forest green)
// - THỦY: Xanh dương / Lam đậm rõ nét
// - HỎA: Đỏ son rõ ràng
// - THỔ: Nâu vàng đất / Hổ phách đậm
export const NGU_HANH_COLORS = {
  kim: "#475569", // Xám bạc đậm / Slate kim loại
  moc: "#15803D", // Xanh lá đậm
  thuy: "#0369A1", // Xanh dương / Lam đậm rõ nét
  hoa: "#DC2626", // Đỏ son rực rỡ, đậm nét
  tho: "#B45309", // Nâu vàng đất / Hổ phách đậm
} as const;

import type { NguHanh } from "./types";

// Helper lấy màu chuẩn Ngũ Hành cho bất kỳ thành phần nào
export function getNguHanhColor(element?: string | null): string {
  if (!element) return "#334155";
  const normalized = element.trim().toLowerCase();
  if (normalized.includes("kim")) return NGU_HANH_COLORS.kim;
  if (normalized.includes("mộc") || normalized.includes("moc")) return NGU_HANH_COLORS.moc;
  if (normalized.includes("thủy") || normalized.includes("thuy")) return NGU_HANH_COLORS.thuy;
  if (normalized.includes("hỏa") || normalized.includes("hoa")) return NGU_HANH_COLORS.hoa;
  if (normalized.includes("thổ") || normalized.includes("tho")) return NGU_HANH_COLORS.tho;
  return "#334155";
}

// =========================================================================
// 2. TỪ ĐIỂN NGŨ HÀNH TOÀN DIỆN CHO CÁC SAO (STAR -> NGŨ HÀNH)
// =========================================================================
export const STAR_NGU_HANH_MAP: Record<string, NguHanh> = {
  // 14 Chính Tinh
  "Tử Vi": "Thổ",
  "Thiên Phủ": "Thổ",
  "Thiên Cơ": "Mộc",
  "Thiên Lương": "Mộc",
  "Thái Dương": "Hỏa",
  "Liêm Trinh": "Hỏa",
  "Vũ Khúc": "Kim",
  "Thất Sát": "Kim",
  "Thiên Đồng": "Thủy",
  "Thái Âm": "Thủy",
  "Tham Lang": "Thủy",
  "Cự Môn": "Thủy",
  "Thiên Tướng": "Thủy",
  "Phá Quân": "Thủy",

  // Tứ Hóa
  "Hóa Lộc": "Mộc",
  "Hóa Quyền": "Hỏa",
  "Hóa Khoa": "Thủy",
  "Hóa Kỵ": "Thủy",

  // Lục Cát Tinh & Phụ Tinh Cát
  "Văn Xương": "Kim",
  "Thai Phụ": "Kim",
  "Phong Cáo": "Kim",
  "Hoa Cái": "Kim",

  "Văn Khúc": "Thủy",
  "Bác Sĩ": "Thủy",
  "Long Trì": "Thủy",
  "Hồng Loan": "Thủy",
  "Thiên Hỷ": "Thủy",
  "Thiên Y": "Thủy",
  "Tam Thai": "Thủy",
  "Bát Tọa": "Thủy",

  "Thiên Khôi": "Hỏa",
  "Thiên Việt": "Hỏa",
  "Thiên Mã": "Hỏa",
  "Lực Sĩ": "Hỏa",
  "Hỷ Thần": "Hỏa",
  "Thiên Đức": "Hỏa",
  "Nguyệt Đức": "Hỏa",
  "Thiên Quan": "Hỏa",

  "Tả Phù": "Thổ",
  "Hữu Bật": "Thổ",
  "Lộc Tồn": "Thổ",
  "Thiên Quý": "Thổ",
  "Phượng Các": "Thổ",
  "Thiên Phúc": "Thổ",
  "Thiên Trù": "Thổ",
  "Quốc Ấn": "Thổ",
  "Phúc Đức": "Thổ",
  "Thiên Thọ": "Thổ",
  "Thiên Tài": "Thổ",

  "Đào Hoa": "Mộc",
  "Ân Quang": "Mộc",
  "Thiên Giải": "Mộc",
  "Địa Giải": "Mộc",
  "Giải Thần": "Mộc",
  "Đường Phù": "Mộc",
  "Tướng Quân": "Mộc",

  // Sát Tinh / Hung Tinh / Bại Tinh
  "Kình Dương": "Kim",
  "Đà La": "Kim",
  "Bạch Hổ": "Kim",
  "Thiên Khốc": "Kim",
  "Quả Tú": "Kim",
  "Thiên La": "Kim",
  "Triệt": "Kim",

  "Hỏa Tinh": "Hỏa",
  "Linh Tinh": "Hỏa",
  "Địa Không": "Hỏa",
  "Địa Kiếp": "Hỏa",
  "Thiên Không": "Hỏa",
  "Thái Tuế": "Hỏa",
  "Tuế Phá": "Hỏa",
  "Điếu Khách": "Hỏa",
  "Đại Hao": "Hỏa",
  "Tiểu Hao": "Hỏa",
  "Phi Liêm": "Hỏa",
  "Phục Binh": "Hỏa",
  "Quan Phủ": "Hỏa",
  "Kiếp Sát": "Hỏa",
  "Phá Toái": "Hỏa",
  "Thiên Hình": "Hỏa",
  "Cô Thần": "Hỏa",
  "Đầu Quân": "Hỏa",
  "Tuần": "Hỏa",

  "Thiên Hư": "Thủy",
  "Thiên Riêu": "Thủy",
  "Lưu Hà": "Thủy",
  "Thiếu Âm": "Thủy",
  "Long Đức": "Thủy",
  "Thiên Sứ": "Thủy",

  "Địa Võng": "Thổ",
  "Thiên Thương": "Thổ",
  "Bệnh Phù": "Thổ",

  "Tang Môn": "Mộc",
  "Thiếu Dương": "Hỏa",
  "Tử Phù": "Kim",
  "Trực Phù": "Hỏa",
  "Tấu Thư": "Kim",
};

// Helper tra cứu hành của sao theo tên (hỗ trợ cả sao lưu tiền tố L.)
export function getStarNguHanh(starName: string): NguHanh | undefined {
  if (!starName) return undefined;
  const cleanName = starName.replace(/^L\.\s*/i, "").trim();
  if (STAR_NGU_HANH_MAP[cleanName]) return STAR_NGU_HANH_MAP[cleanName];

  for (const [key, val] of Object.entries(STAR_NGU_HANH_MAP)) {
    if (cleanName.toLowerCase() === key.toLowerCase()) return val;
  }
  for (const [key, val] of Object.entries(STAR_NGU_HANH_MAP)) {
    if (cleanName.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return undefined;
}

// Helper quy đổi giờ sinh (00-23) sang 12 Địa Chi giờ
export function getChiFromHour(hour: number): string {
  const validHour = Math.max(0, Math.min(23, hour));
  const chiIndex = Math.floor(((validHour + 1) % 24) / 2);
  const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  return CHI_NAMES[chiIndex];
}

// Helper pad 2 chữ số: 7, 30 -> "07:30"; 0, 5 -> "00:05"
export function formatTime2Digits(hour: number | string, minute: number | string): string {
  const h = String(Math.max(0, Math.min(23, Number(hour) || 0))).padStart(2, "0");
  const m = String(Math.max(0, Math.min(59, Number(minute) || 0))).padStart(2, "0");
  return `${h}:${m}`;
}

// Bảng màu giao diện chuẩn truyền thống Tử Vi
export const CHART_THEME = {
  background: "#FAF6EE", // Nền giấy ngà / kem cổ điển ấm
  boardBorder: "#8B3A3A", // Viền khung nâu đỏ đậm
  palaceBorder: "#8B3A3A", // Đường viền nét đứt phân chia cung
  cellHeaderBg: "#FFFFFF", // Nền hộp tên cung trắng mờ
  centerBg: "#FFFDF9", // Nền Thiên Bàn trung tâm
  tagText: "#FFFFFF",
  textColorDark: "#1E1E1E",
  textColorMuted: "#555555",
  accentRed: NGU_HANH_COLORS.hoa,
  accentBlue: NGU_HANH_COLORS.thuy,
  accentGreen: NGU_HANH_COLORS.moc,
  accentGold: NGU_HANH_COLORS.tho,
};

// Vị trí chuẩn của 12 Địa Chi theo bàn cờ Tử Vi Bắc Phái (Chiều kim đồng hồ)
// - Tỵ, Ngọ: HỎA (Hồng ấm cổ điển / Tag đỏ)
// - Mùi, Tuất, Sửu, Thìn: THỔ (Vàng kem đất ấm / Tag nâu vàng đất)
// - Thân, Dậu: KIM (Xám bạc kim loại nhạt / Tag xám kim loại đậm)
// - Hợi, Tý: THỦY (Xanh lam ngọc nhạt / Tag xanh dương)
// - Dần, Mão: MỘC (Xanh ngọc bích nhạt / Tag xanh lá đậm)
export const TRADITIONAL_PALACE_LAYOUT: Record<
  string,
  { col: number; row: number; pastelBg: string; tagBg: string; zodiacAnimal: string; nguHanh: NguHanh }
> = {
  // Hàng 1 (Trên cùng)
  "Tỵ": { col: 0, row: 0, pastelBg: "#FDF1F3", tagBg: NGU_HANH_COLORS.hoa, zodiacAnimal: "Rắn", nguHanh: "Hỏa" },
  "Ngọ": { col: 1, row: 0, pastelBg: "#FDF1F3", tagBg: NGU_HANH_COLORS.hoa, zodiacAnimal: "Ngựa", nguHanh: "Hỏa" },
  "Mùi": { col: 2, row: 0, pastelBg: "#FEF7E6", tagBg: NGU_HANH_COLORS.tho, zodiacAnimal: "Dê", nguHanh: "Thổ" },
  "Thân": { col: 3, row: 0, pastelBg: "#F1F5F9", tagBg: NGU_HANH_COLORS.kim, zodiacAnimal: "Khỉ", nguHanh: "Kim" },

  // Cột phải (Hàng 2 & 3)
  "Dậu": { col: 3, row: 1, pastelBg: "#F1F5F9", tagBg: NGU_HANH_COLORS.kim, zodiacAnimal: "Gà", nguHanh: "Kim" },
  "Tuất": { col: 3, row: 2, pastelBg: "#FEF7E6", tagBg: NGU_HANH_COLORS.tho, zodiacAnimal: "Chó", nguHanh: "Thổ" },

  // Hàng 4 (Dưới cùng)
  "Hợi": { col: 3, row: 3, pastelBg: "#EFF8FF", tagBg: NGU_HANH_COLORS.thuy, zodiacAnimal: "Lợn", nguHanh: "Thủy" },
  "Tý": { col: 2, row: 3, pastelBg: "#EFF8FF", tagBg: NGU_HANH_COLORS.thuy, zodiacAnimal: "Chuột", nguHanh: "Thủy" },
  "Sửu": { col: 1, row: 3, pastelBg: "#FEF7E6", tagBg: NGU_HANH_COLORS.tho, zodiacAnimal: "Trâu", nguHanh: "Thổ" },
  "Dần": { col: 0, row: 3, pastelBg: "#F0FDF4", tagBg: NGU_HANH_COLORS.moc, zodiacAnimal: "Hổ", nguHanh: "Mộc" },

  // Cột trái (Hàng 2 & 3)
  "Mão": { col: 0, row: 2, pastelBg: "#F0FDF4", tagBg: NGU_HANH_COLORS.moc, zodiacAnimal: "Mèo", nguHanh: "Mộc" },
  "Thìn": { col: 0, row: 1, pastelBg: "#FEF7E6", tagBg: NGU_HANH_COLORS.tho, zodiacAnimal: "Rồng", nguHanh: "Thổ" },
};
