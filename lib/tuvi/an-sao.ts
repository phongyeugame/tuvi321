import { CHI, CAN } from "./can-chi";
import { SaoChiTiet } from "./types";

// 14 Chính Tinh
export const CHINH_TINH = [
  "Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh",
  "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Thất Sát", "Phá Quân"
];

// Ngũ hành và độ đắc hãm 14 chính tinh theo 12 cung (0: Tý, 1: Sửu, 2: Dần, ..., 11: Hợi)
// M: Miếu, V: Vượng, Đ: Đắc, B: Bình, H: Hãm
export const CHINH_TINH_INFO: Record<string, { nguHanh: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"; dacHam: string[] }> = {
  "Tử Vi": {
    nguHanh: "Thổ",
    dacHam: ["B", "Đ", "M", "B", "V", "V", "M", "Đ", "M", "B", "V", "B"]
  },
  "Thiên Cơ": {
    nguHanh: "Mộc",
    dacHam: ["Đ", "H", "V", "M", "M", "B", "Đ", "H", "V", "M", "M", "B"]
  },
  "Thái Dương": {
    nguHanh: "Hỏa",
    dacHam: ["H", "Đ", "V", "V", "V", "M", "M", "Đ", "B", "H", "H", "H"]
  },
  "Vũ Khúc": {
    nguHanh: "Kim",
    dacHam: ["V", "M", "V", "Đ", "M", "B", "V", "M", "V", "Đ", "M", "B"]
  },
  "Thiên Đồng": {
    nguHanh: "Thủy",
    dacHam: ["V", "H", "M", "Đ", "H", "B", "H", "H", "M", "H", "H", "Đ"]
  },
  "Liêm Trinh": {
    nguHanh: "Hỏa",
    dacHam: ["V", "Đ", "V", "B", "M", "H", "V", "Đ", "V", "B", "M", "H"]
  },
  "Thiên Phủ": {
    nguHanh: "Thổ",
    dacHam: ["M", "M", "M", "B", "M", "Đ", "M", "M", "M", "B", "M", "Đ"]
  },
  "Thái Âm": {
    nguHanh: "Thủy",
    dacHam: ["M", "Đ", "H", "H", "H", "H", "H", "Đ", "B", "M", "M", "M"]
  },
  "Tham Lang": {
    nguHanh: "Thủy",
    dacHam: ["Đ", "M", "B", "H", "M", "H", "Đ", "M", "B", "H", "M", "H"]
  },
  "Cự Môn": {
    nguHanh: "Thủy",
    dacHam: ["V", "H", "V", "M", "H", "H", "V", "H", "V", "M", "H", "Đ"]
  },
  "Thiên Tướng": {
    nguHanh: "Thủy",
    dacHam: ["V", "Đ", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"]
  },
  "Thiên Lương": {
    nguHanh: "Mộc",
    dacHam: ["M", "V", "M", "M", "V", "H", "M", "V", "H", "H", "M", "H"]
  },
  "Thất Sát": {
    nguHanh: "Kim",
    dacHam: ["M", "Đ", "M", "H", "Đ", "B", "M", "Đ", "M", "H", "Đ", "B"]
  },
  "Phá Quân": {
    nguHanh: "Thủy",
    dacHam: ["M", "V", "H", "H", "V", "Đ", "M", "V", "H", "H", "V", "Đ"]
  }
};

// Hàm tìm vị trí Tử Vi (0-11 tương ứng Tý-Hợi)
export function getViTriTuVi(cucSo: number, ngaySinh: number): number {
  let x = ngaySinh;
  let y = 0;
  while (x % cucSo !== 0) {
    x++;
    y++;
  }
  let z = x / cucSo;
  
  // Vị trí bắt đầu tính là Dần (index 2)
  let viTri = (2 + z - 1) % 12;
  
  if (y > 0) {
    if (y % 2 === 1) { // Số lẻ lùi
      viTri = (viTri - y) % 12;
    } else { // Số chẵn tiến
      viTri = (viTri + y) % 12;
    }
  }
  if (viTri < 0) viTri += 12;
  return viTri;
}

// Hàm an 14 chính tinh trả về mảng 12 cung với chi tiết
export function anChinhTinhChiTiet(cucSo: number, ngaySinh: number): { [chiIndex: number]: SaoChiTiet[] } {
  const result: { [chiIndex: number]: SaoChiTiet[] } = {};
  for (let i = 0; i < 12; i++) result[i] = [];

  const tuviPos = getViTriTuVi(cucSo, ngaySinh);

  // Vòng Tử Vi (đi ngược)
  const vongTuVi = [
    { ten: "Tử Vi", offset: 0 },
    { ten: "Thiên Cơ", offset: -1 },
    { ten: "Thái Dương", offset: -3 },
    { ten: "Vũ Khúc", offset: -4 },
    { ten: "Thiên Đồng", offset: -5 },
    { ten: "Liêm Trinh", offset: -8 },
  ];

  for (let sao of vongTuVi) {
    let pos = (tuviPos + sao.offset) % 12;
    if (pos < 0) pos += 12;
    const info = CHINH_TINH_INFO[sao.ten];
    result[pos].push({
      ten: sao.ten,
      trangThai: info ? info.dacHam[pos] : "Đ",
      nguHanh: info ? info.nguHanh : "Kim",
      loai: "chinh"
    });
  }

  // Vị trí Thiên Phủ đối xứng Tử Vi qua trục Dần - Thân
  let phuPos = (14 - tuviPos) % 12;
  if (phuPos < 0) phuPos += 12;

  // Vòng Thiên Phủ (đi thuận)
  const vongThienPhu = [
    { ten: "Thiên Phủ", offset: 0 },
    { ten: "Thái Âm", offset: 1 },
    { ten: "Tham Lang", offset: 2 },
    { ten: "Cự Môn", offset: 3 },
    { ten: "Thiên Tướng", offset: 4 },
    { ten: "Thiên Lương", offset: 5 },
    { ten: "Thất Sát", offset: 6 },
    { ten: "Phá Quân", offset: 10 },
  ];

  for (let sao of vongThienPhu) {
    let pos = (phuPos + sao.offset) % 12;
    cacPosNormalize: if (pos < 0) pos += 12;
    const info = CHINH_TINH_INFO[sao.ten];
    result[pos].push({
      ten: sao.ten,
      trangThai: info ? info.dacHam[pos] : "Đ",
      nguHanh: info ? info.nguHanh : "Thổ",
      loai: "chinh"
    });
  }

  return result;
}

export function anChinhTinh(cucSo: number, ngaySinh: number): string[][] {
  const details = anChinhTinhChiTiet(cucSo, ngaySinh);
  return Array.from({ length: 12 }, (_, i) => details[i].map(s => s.ten));
}

// An toàn bộ phụ tinh (Cát tinh & Sát/Hung tinh)
export function anPhuTinhDayDu(
  thangSinh: number,
  gioSinhIndex: number,
  canNamIndex: number,
  chiNamIndex: number
): { catTinh: string[][]; hungTinh: string[][]; tuanPos: number[]; trietPos: number[] } {
  const cat: string[][] = Array.from({ length: 12 }, () => []);
  const hung: string[][] = Array.from({ length: 12 }, () => []);

  // 1. Tả Phù & Hữu Bật (theo tháng)
  let taPhu = (4 + thangSinh - 1) % 12;
  cat[taPhu].push("Tả Phù");
  let huuBat = (10 - thangSinh + 1) % 12;
  if (huuBat < 0) huuBat += 12;
  cat[huuBat].push("Hữu Bật");

  // 2. Văn Xương & Văn Khúc (theo giờ)
  let vanXuong = (10 - gioSinhIndex) % 12;
  if (vanXuong < 0) vanXuong += 12;
  cat[vanXuong].push("Văn Xương");
  let vanKhuc = (4 + gioSinhIndex) % 12;
  cat[vanKhuc].push("Văn Khúc");

  // 3. Lộc Tồn, Kình Dương, Đà La (theo Can Năm)
  // Can: 0:Giáp, 1:Ất, 2:Bính, 3:Đinh, 4:Mậu, 5:Kỷ, 6:Canh, 7:Tân, 8:Nhâm, 9:Quý
  // Vị trí Lộc Tồn:
  const locTonMap = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0]; // Giáp->Dần(2), Ất->Mão(3), Bính/Mậu->Tỵ(5)...
  const locTonPos = locTonMap[canNamIndex % 10];
  cat[locTonPos].push("Lộc Tồn");
  // Kình Dương tiến 1 cung so với Lộc Tồn, Đà La lùi 1 cung
  const kinhDuongPos = (locTonPos + 1) % 12;
  const daLaPos = (locTonPos - 1 + 12) % 12;
  hung[kinhDuongPos].push("Kình Dương");
  hung[daLaPos].push("Đà La");

  // 4. Thiên Khôi, Thiên Việt (theo Can Năm)
  // Giáp Mậu Canh: Sửu Mùi. Ất Kỷ: Tý Thân. Bính Đinh: Hợi Dậu. Tân: Ngọ Dần. Nhâm Quý: Mão Tỵ
  const khoiVietMap: [number, number][] = [
    [1, 7],   // Giáp: Sửu, Mùi
    [0, 8],   // Ất: Tý, Thân
    [11, 9],  // Bính: Hợi, Dậu
    [11, 9],  // Đinh: Hợi, Dậu
    [1, 7],   // Mậu: Sửu, Mùi
    [0, 8],   // Kỷ: Tý, Thân
    [1, 7],   // Canh: Sửu, Mùi
    [6, 2],   // Tân: Ngọ, Dần
    [3, 5],   // Nhâm: Mão, Tỵ
    [3, 5],   // Quý: Mão, Tỵ
  ];
  const [khoiPos, vietPos] = khoiVietMap[canNamIndex % 10];
  cat[khoiPos].push("Thiên Khôi");
  cat[vietPos].push("Thiên Việt");

  // 5. Địa Không & Địa Kiếp (theo giờ sinh)
  // Khởi Hợi (11): Không đi nghịch, Kiếp đi thuận
  const diaKhongPos = (11 - gioSinhIndex + 12) % 12;
  const diaKiepPos = (11 + gioSinhIndex) % 12;
  hung[diaKhongPos].push("Địa Không");
  hung[diaKiepPos].push("Địa Kiếp");

  // 6. Hỏa Tinh & Linh Tinh (theo Chi Năm & Giờ Sinh)
  // Chi Dần Ngọ Tuất khởi Sửu (1), Thân Tý Thìn khởi Dần (2), Tỵ Dậu Sửu khởi Mão (3), Hợi Mão Mùi khởi Dậu (9)
  let hoaBase = 1;
  if ([2, 6, 10].includes(chiNamIndex)) hoaBase = 1;
  else if ([8, 0, 4].includes(chiNamIndex)) hoaBase = 2;
  else if ([5, 9, 1].includes(chiNamIndex)) hoaBase = 3;
  else hoaBase = 9;
  const hoaTinhPos = (hoaBase + gioSinhIndex) % 12;
  const linhTinhPos = (11 - gioSinhIndex + 12) % 12;
  hung[hoaTinhPos].push("Hỏa Tinh");
  hung[linhTinhPos].push("Linh Tinh");

  // 7. Thiên Mã (theo Chi Năm)
  // Dần Ngọ Tuất -> Thân (8); Thân Tý Thìn -> Dần (2); Tỵ Dậu Sửu -> Hợi (11); Hợi Mão Mùi -> Tỵ (5)
  const thienMaMap: Record<number, number> = {
    2: 8, 6: 8, 10: 8,
    8: 2, 0: 2, 4: 2,
    5: 11, 9: 11, 1: 11,
    11: 5, 3: 5, 7: 5,
  };
  const thienMaPos = thienMaMap[chiNamIndex] ?? 2;
  cat[thienMaPos].push("Thiên Mã");

  // 8. Đào Hoa, Hồng Loan, Hỷ Thần (theo Chi Năm)
  // Đào Hoa: Thân Tý Thìn tại Dậu(9), Dần Ngọ Tuất tại Mão(3), Tỵ Dậu Sửu tại Ngọ(6), Hợi Mão Mùi tại Tý(0)
  const daoHoaMap: Record<number, number> = {
    8: 9, 0: 9, 4: 9,
    2: 3, 6: 3, 10: 3,
    5: 6, 9: 6, 1: 6,
    11: 0, 3: 0, 7: 0,
  };
  const daoHoaPos = daoHoaMap[chiNamIndex] ?? 0;
  cat[daoHoaPos].push("Đào Hoa");

  // Hồng Loan: Bắt đầu Mão (3) lùi theo Chi Năm
  const hongLoanPos = (3 - chiNamIndex + 12) % 12;
  cat[hongLoanPos].push("Hồng Loan");
  // Thiên Hỷ đối xứng Hồng Loan
  const thienHyPos = (hongLoanPos + 6) % 12;
  cat[thienHyPos].push("Thiên Hỷ");

  // 9. Vòng Thái Tuế (theo Chi Năm)
  const thaiTuePos = chiNamIndex % 12;
  hung[thaiTuePos].push("Thái Tuế");
  const tangMonPos = (thaiTuePos + 2) % 12;
  hung[tangMonPos].push("Tang Môn");
  const bachHoPos = (thaiTuePos + 8) % 12;
  hung[bachHoPos].push("Bạch Hổ");
  const quanPhuPos = (thaiTuePos + 4) % 12;
  hung[quanPhuPos].push("Quan Phù");
  const tuePhaPos = (thaiTuePos + 6) % 12;
  hung[tuePhaPos].push("Tuế Phá");
  const thienKhocPos = (6 - chiNamIndex + 12) % 12;
  hung[thienKhocPos].push("Thiên Khốc");
  const thienHuPos = (6 + chiNamIndex) % 12;
  hung[thienHuPos].push("Thiên Hư");

  // Một số cát tinh khác: Long Trì, Phượng Các, Giải Thần, Ân Quang, Thiên Quý
  const longTriPos = (4 + chiNamIndex) % 12;
  cat[longTriPos].push("Long Trì");
  const phuongCacPos = (10 - chiNamIndex + 12) % 12;
  cat[phuongCacPos].push("Phượng Các");
  cat[longTriPos].push("Giải Thần");

  const anQuangPos = (vanXuong + ngaySinhMod(gioSinhIndex) - 2 + 12) % 12;
  cat[anQuangPos].push("Ân Quang");
  const thienQuyPos = (vanKhuc - ngaySinhMod(gioSinhIndex) + 2 + 12) % 12;
  cat[thienQuyPos].push("Thiên Quý");

  // 10. Tuần & Triệt
  // Triệt theo Can Năm
  // Giáp Kỷ: Thân(8)-Dậu(9); Ất Canh: Ngọ(6)-Mùi(7); Bính Tân: Thìn(4)-Tỵ(5); Đinh Nhâm: Dần(2)-Mão(3); Mậu Quý: Tý(0)-Sửu(1)
  const trietPairs: [number, number][] = [
    [8, 9],  // Giáp
    [6, 7],  // Ất
    [4, 5],  // Bính
    [2, 3],  // Đinh
    [0, 1],  // Mậu
    [8, 9],  // Kỷ
    [6, 7],  // Canh
    [4, 5],  // Tân
    [2, 3],  // Nhâm
    [0, 1],  // Quý
  ];
  const trietPos = trietPairs[canNamIndex % 10];

  // Tuần theo Con Giáp (Chi - Can)
  let giapOffset = (chiNamIndex - canNamIndex + 12) % 12;
  // Hai cung đứng trước giápOffset
  let tuan1 = (giapOffset + 10) % 12;
  let tuan2 = (giapOffset + 11) % 12;
  const tuanPos = [tuan1, tuan2];

  return { catTinh: cat, hungTinh: hung, tuanPos, trietPos };
}

function ngaySinhMod(n: number) {
  return (n % 12) + 1;
}

export function anPhuTinhBase(thangSinh: number, gioSinhIndex: number): string[][] {
  const { catTinh } = anPhuTinhDayDu(thangSinh, gioSinhIndex, 0, 0);
  return catTinh;
}

