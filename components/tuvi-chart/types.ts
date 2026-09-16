export type StarCategory =
  | "main"
  | "auspicious"
  | "inauspicious"
  | "supporting"
  | "transformation"
  | "neutral"
  | "annual";

export type NguHanh = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface StarItem {
  name: string;
  brightness?: string; // M, V, Đ, B, H
  category?: StarCategory;
  nguHanh?: NguHanh;
  colorType?: string; // Custom override if needed
}

export interface PalaceData {
  id: string; // Tý, Sửu...
  name: string; // MỆNH, PHỤ MẪU...
  branch: string; // Tý, Sửu, Dần...
  heavenlyStem?: string; // Giáp, Ất...
  stemBranchTag?: string; // -Q. Tỵ, +G. Ngọ...
  earthlyBranch: string;
  majorStars: StarItem[];
  auspiciousStars: StarItem[];
  inauspiciousStars: StarItem[];
  otherStars: StarItem[];
  transformations: {
    loc?: string;
    quyen?: string;
    khoa?: string;
    ky?: string;
    isTuLoc?: boolean;
    isTuQuyen?: boolean;
    isTuKhoa?: boolean;
    isTuKy?: boolean;
  };
  ageRange?: number; // Đại vận: 3, 13, 23...
  lifeStage?: string; // Tràng sinh: Trường sinh, Đế vượng, Mộ...
  annualStemBranch?: string; // Năm Tý, Năm Mão...
  monthNumber?: number; // Tháng 1, 2...
  isMenh?: boolean;
  isThan?: boolean;
  triet?: boolean;
  tuan?: boolean;
  // Vị trí trên lưới 4x4 (0-indexed: col 0..3, row 0..3)
  gridCol: number;
  gridRow: number;
  pastelBgColor?: string;
}

export interface UserChartInfo {
  name: string;
  gender: string; // Nam / Nữ
  solarDate: string; // 20/03/2001
  lunarDate: string; // 26/02/2001
  birthHour: string; // giờ Giáp Thìn (07:30)
  stemsBranches: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  cuc: string; // Mộc tam cục...
  menh: string; // Bạch Lạp Kim...
  amDuong: string; // Âm Nam (Âm Dương thuận lý)...
  menhKhacCuc?: string;
  camTinh?: string;
  chuMenh?: string;
  chuThan?: string;
  conNha?: string;
  doMang?: string;
  canLuong?: string;
  hanNam?: string;
  lapLuc?: string;
  diemLaSo?: number;
  matrixScores?: { [key: string]: number | string };
}

export interface ChartLineItem {
  id: string;
  source: string;
  target: string;
  from?: string;
  to?: string;
  name: string;
  type: "tam-hop" | "xung-chieu" | "than-cu" | "radial" | "cuc";
  nguHanh: NguHanh;
  element?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth?: number;
  dashArray?: string;
  opacity?: number;
}

export interface TuViChartData {
  user: UserChartInfo;
  palaces: PalaceData[];
  lines?: ChartLineItem[];
  metadata?: {
    title?: string;
    subtitle?: string;
    generatedAt?: string;
    appBrand?: string;
    adminName?: string;
    adminPhone?: string;
  };
}

import { NGU_HANH_COLORS } from "./constants";

// Bảng màu chuẩn mực centralized cho các loại sao theo đúng nguyên tắc phong thủy & cổ điển
export const STAR_COLORS = {
  // Chính tinh phân theo Ngũ Hành hoặc Đỏ truyền thống
  major: {
    red: NGU_HANH_COLORS.hoa, // Hỏa
    blue: NGU_HANH_COLORS.thuy, // Thủy
    green: NGU_HANH_COLORS.moc, // Mộc
    gold: NGU_HANH_COLORS.tho, // Thổ
    slate: NGU_HANH_COLORS.kim, // Kim
    default: NGU_HANH_COLORS.hoa,
  },
  auspicious: NGU_HANH_COLORS.moc, // Cát tinh: Mộc / Xanh lá
  inauspicious: NGU_HANH_COLORS.hoa, // Sát/Hung tinh: Hỏa / Đỏ
  supporting: NGU_HANH_COLORS.kim, // Sao phụ: Kim / Xám kim loại
  transformation: NGU_HANH_COLORS.thuy, // Tứ hóa: Thủy / Xanh lam
  annual: NGU_HANH_COLORS.hoa, // Sao lưu: Đỏ
  neutral: NGU_HANH_COLORS.kim, // Sao khác: Xám kim loại
} as const;
