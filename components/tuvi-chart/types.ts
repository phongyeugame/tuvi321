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

export interface TuViChartData {
  user: UserChartInfo;
  palaces: PalaceData[];
  metadata?: {
    title?: string;
    subtitle?: string;
    generatedAt?: string;
    appBrand?: string;
    adminName?: string;
    adminPhone?: string;
  };
}

// Bảng màu chuẩn mực centralized cho các loại sao theo đúng nguyên tắc phong thủy & cổ điển
export const STAR_COLORS = {
  // Chính tinh phân theo Ngũ Hành hoặc Đỏ truyền thống
  major: {
    red: "#c92a2a", // Hỏa
    blue: "#1864ab", // Thủy
    green: "#2b8a3e", // Mộc
    gold: "#d97706", // Thổ
    slate: "#343a40", // Kim
    default: "#c92a2a",
  },
  auspicious: "#15803d", // Cát tinh: Xanh lá cây
  inauspicious: "#b91c1c", // Sát/Hung tinh: Đỏ đậm
  supporting: "#1e293b", // Sao phụ thông thường: Đen/xám đen
  transformation: "#0284c7", // Tứ hóa: Xanh ngọc/lam
  annual: "#991b1b", // Sao lưu: Đỏ sẫm
  neutral: "#475569", // Sao khác: Xám
} as const;
