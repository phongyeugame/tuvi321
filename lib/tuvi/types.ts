export type GioiTinh = "nam" | "nu";
export type LoaiLich = "duong" | "am";

export interface TraCuuInput {
  hoTen: string;
  gioiTinh: GioiTinh;
  loaiLich: LoaiLich;
  ngay: number;
  thang: number;
  nam: number;
  gio: string; // Tý, Sửu...
  namXemVanHan?: number;
}

export interface CanChi {
  nam: string;
  thang: string;
  ngay: string;
  gio: string;
}

export interface SaoChiTiet {
  ten: string;
  trangThai?: string; // M, V, Đ, B, H
  nguHanh?: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  loai?: "chinh" | "cat" | "hung" | "luu";
}

export interface Cung {
  ten: string; // Mệnh, Phụ Mẫu, Phúc Đức...
  viTri: string; // Tý, Sửu, Dần...
  canChi?: string; // Can Chi của cung (VD: Giáp Thân, Canh Ngọ)
  canChiShort?: string; // Ví dụ: +G. Ngọ, -Ấ. Mùi
  daiHan?: number; // 3, 13, 23...
  trangSinh?: string; // Trường sinh, Mộc dục, Quan đới...
  tieuHanNam?: string; // Năm Tý, Năm Sửu...
  nguyetHan?: number; // Tháng 1, Tháng 2...
  isThan?: boolean; // Cung Thân cư ở đây
  triet?: boolean; // Sao Triệt
  tuan?: boolean; // Sao Tuần
  chinhTinh: string[];
  chinhTinhChiTiet?: SaoChiTiet[];
  phuTinh: string[];
  catTinh?: string[];
  hungTinh?: string[];
  tuHoa?: string[]; // Phi tinh: Hóa lộc, Hóa quyền, Hóa khoa, Hóa kỵ
  luanGiai?: string;
}

export interface LaSoTuVi {
  input: TraCuuInput;
  lunarDate: { ngay: number; thang: number; nam: number; nhuan: boolean };
  canChi: CanChi;
  cungMenh: string;
  cungThan: string;
  nguHanh: string;
  cuc: string;
  cucSo?: number;
  cung: Cung[];
  luanGiaiTongQuan?: string;
  // Branding Admin
  adminName?: string;
  adminPhone?: string;
  // Thông tin Thiên Bàn
  tuoi?: number;
  amDuongMenh?: string; // Âm Nam, Dương Nam...
  amDuongThuanLy?: string; // Âm Dương thuận lý / nghịch lý
  menhKhacCuc?: string; // Mệnh Kim khắc Cục Mộc, v.v.
  camTinh?: string; // Con Rắn xuất tướng tinh con Thỏ...
  chuMenh?: string; // Vũ Khúc...
  chuThan?: string; // Thiên Cơ...
  conNha?: string; // Con nhà BẠCH ĐẾ...
  doMang?: string; // Ông Quan Đế độ mạng...
  canLuong?: string; // 4 lượng 0 chỉ...
  hanNam?: string; // Bính Ngọ (2026)...
  lapLuc?: string; // 10:32 phút, ngày 26/04/2026
  diemLaSo?: number; // 36%
  diemCung?: { [key: string]: number | string };
}

