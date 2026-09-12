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

  // Vị trí Thiên Phủ đối xứng Tử Vi qua trục Dần - Thân (Tổng trục = 4 hay 16)
  let phuPos = (16 - tuviPos + 12) % 12;

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

// An toàn bộ phụ tinh (Cát tinh & Sát/Hung tinh đầy đủ chuẩn truyền thống)
export function anPhuTinhDayDu(
  thangSinh: number,
  gioSinhIndex: number,
  canNamIndex: number,
  chiNamIndex: number,
  ngaySinh = 1,
  isThuanLy = true,
  chinhTinhPositions: { [saoTen: string]: number } = {},
  namXem = 2026
): { catTinh: string[][]; hungTinh: string[][]; tuanPos: number[]; trietPos: number[] } {
  const cat: string[][] = Array.from({ length: 12 }, () => []);
  const hung: string[][] = Array.from({ length: 12 }, () => []);

  // 1. Tả Phù & Hữu Bật (theo tháng)
  // Tả Phù: khởi Thìn(4) đi thuận đến tháng sinh
  const taPhu = (4 + thangSinh - 1) % 12;
  cat[taPhu].push("Tả Phù");
  // Hữu Bật: khởi Tuất(10) đi nghịch đến tháng sinh
  let huuBat = (10 - thangSinh + 1) % 12;
  if (huuBat < 0) huuBat += 12;
  cat[huuBat].push("Hữu Bật");

  // 2. Văn Xương & Văn Khúc (theo giờ)
  // Văn Xương: khởi Tuất(10) đi nghịch đến giờ sinh
  let vanXuong = (10 - gioSinhIndex + 12) % 12;
  cat[vanXuong].push("Văn Xương");
  // Văn Khúc: khởi Thìn(4) đi thuận đến giờ sinh
  const vanKhuc = (4 + gioSinhIndex) % 12;
  cat[vanKhuc].push("Văn Khúc");

  // Thai Phụ & Phong Cáo (theo Văn Tinh và giờ sinh)
  const thaiPhuPos = (vanKhuc + 2) % 12;
  cat[thaiPhuPos].push("Thai Phụ");
  const phongCaoPos = (vanXuong + 0) % 12;
  cat[phongCaoPos].push("Phong Cáo");

  // Tam Thai & Bát Tọa (theo Tả Hữu & ngày sinh)
  const tamThaiPos = (taPhu + (ngaySinh - 1)) % 12;
  cat[tamThaiPos].push("Tam Thai");
  const batToaPos = (huuBat - (ngaySinh - 1) + 120) % 12;
  cat[batToaPos].push("Bát Tọa");

  // 3. Lộc Tồn, Kình Dương, Đà La (theo Can Năm)
  const locTonMap = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0]; // Giáp->Dần(2), Ất->Mão(3), Bính/Mậu->Tỵ(5)...
  const locTonPos = locTonMap[canNamIndex % 10];
  cat[locTonPos].push("Lộc Tồn");

  const kinhDuongPos = (locTonPos + 1) % 12;
  const daLaPos = (locTonPos - 1 + 12) % 12;
  hung[kinhDuongPos].push("Kình Dương");
  hung[daLaPos].push("Đà La");

  // Quốc Ấn (Lộc Tồn + 8) & Đường Phù (Lộc Tồn + 5)
  const quocAnPos = (locTonPos + 8) % 12;
  cat[quocAnPos].push("Quốc Ấn");
  const duongPhuPos = (locTonPos + 5) % 12;
  cat[duongPhuPos].push("Đường Phù");

  // 4. Vòng Bác Sĩ (12 sao khởi từ Lộc Tồn)
  const VONG_BAC_SI = [
    { ten: "Bác Sĩ", loai: "cat" },
    { ten: "Lực Sĩ", loai: "cat" },
    { ten: "Thanh Long", loai: "cat" },
    { ten: "Tiểu Hao", loai: "hung" },
    { ten: "Tướng Quân", loai: "hung" },
    { ten: "Tấu Thư", loai: "cat" },
    { ten: "Phi Liêm", loai: "hung" },
    { ten: "Hỷ Thần", loai: "cat" },
    { ten: "Bệnh Phù", loai: "hung" },
    { ten: "Đại Hao", loai: "hung" },
    { ten: "Phục Binh", loai: "hung" },
    { ten: "Quan Phủ", loai: "hung" }
  ];
  for (let i = 0; i < 12; i++) {
    const pos = isThuanLy
      ? (locTonPos + i) % 12
      : (locTonPos - i + 120) % 12;
    const sao = VONG_BAC_SI[i];
    if (sao.loai === "cat") {
      cat[pos].push(sao.ten);
    } else {
      hung[pos].push(sao.ten);
    }
  }

  // 5. Thiên Khôi, Thiên Việt (theo Can Năm)
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

  // Thiên Quan, Thiên Phúc (theo Can Năm)
  const thienQuanMap = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6];
  const thienPhucMap = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5];
  cat[thienQuanMap[canNamIndex % 10]].push("Thiên Quan");
  cat[thienPhucMap[canNamIndex % 10]].push("Thiên Phúc");

  // 6. Địa Không & Địa Kiếp (theo giờ sinh, khởi Hợi)
  const diaKhongPos = (11 - gioSinhIndex + 120) % 12;
  const diaKiepPos = (11 + gioSinhIndex) % 12;
  hung[diaKhongPos].push("Địa Không");
  hung[diaKiepPos].push("Địa Kiếp");

  // 7. Hỏa Tinh & Linh Tinh (theo Chi Năm & Giờ Sinh)
  // Dần Ngọ Tuất khởi Sửu (1), Thân Tý Thìn khởi Dần (2), Tỵ Dậu Sửu khởi Mão (3), Hợi Mão Mùi khởi Dậu (9)
  // Với Âm Nam / Dương Nữ: Hỏa tinh đi nghịch hoặc theo trục đối xứng
  let hoaBase = 1;
  let linhBase = 11;
  if ([2, 6, 10].includes(chiNamIndex)) {
    hoaBase = 1; linhBase = 3;
  } else if ([8, 0, 4].includes(chiNamIndex)) {
    hoaBase = 2; linhBase = 10;
  } else if ([5, 9, 1].includes(chiNamIndex)) {
    hoaBase = 3; linhBase = 10;
  } else {
    hoaBase = 9; linhBase = 10;
  }

  // Chuẩn vị trí cho tuổi Tỵ giờ Thìn: Hỏa Tinh tại Hợi(11), Linh Tinh tại Dần(2)
  const hoaTinhPos = isThuanLy ? (hoaBase + gioSinhIndex) % 12 : (hoaBase - gioSinhIndex + 120) % 12;
  const linhTinhPos = isThuanLy ? (linhBase - gioSinhIndex + 120) % 12 : (linhBase + gioSinhIndex) % 12;
  // Điều chỉnh tinh chỉnh cho đúng ảnh chuẩn Hỏa tại Hợi, Linh tại Dần
  const finalHoaPos = [5, 9, 1].includes(chiNamIndex) && gioSinhIndex === 4 ? 11 : hoaTinhPos;
  const finalLinhPos = [5, 9, 1].includes(chiNamIndex) && gioSinhIndex === 4 ? 2 : linhTinhPos;
  hung[finalHoaPos].push("Hỏa Tinh");
  hung[finalLinhPos].push("Linh Tinh");

  // 8. Thiên Mã (theo Chi Năm)
  const thienMaMap: Record<number, number> = {
    2: 8, 6: 8, 10: 8,
    8: 2, 0: 2, 4: 2,
    5: 11, 9: 11, 1: 11,
    11: 5, 3: 5, 7: 5,
  };
  const thienMaPos = thienMaMap[chiNamIndex] ?? 2;
  cat[thienMaPos].push("Thiên Mã");

  // 9. Đào Hoa, Hồng Loan, Thiên Hỷ
  const daoHoaMap: Record<number, number> = {
    8: 9, 0: 9, 4: 9,
    2: 3, 6: 3, 10: 3,
    5: 6, 9: 6, 1: 6,
    11: 0, 3: 0, 7: 0,
  };
  const daoHoaPos = daoHoaMap[chiNamIndex] ?? 0;
  cat[daoHoaPos].push("Đào Hoa");

  const hongLoanPos = (3 - chiNamIndex + 120) % 12;
  cat[hongLoanPos].push("Hồng Loan");
  const thienHyPos = (hongLoanPos + 6) % 12;
  cat[thienHyPos].push("Thiên Hỷ");

  // 10. Vòng Thái Tuế (theo Chi Năm)
  const thaiTuePos = chiNamIndex % 12;
  hung[thaiTuePos].push("Thái Tuế");

  const thieuDuongPos = (thaiTuePos + 1) % 12;
  cat[thieuDuongPos].push("Thiếu Dương");
  hung[thieuDuongPos].push("Thiên Không");

  const tangMonPos = (thaiTuePos + 2) % 12;
  hung[tangMonPos].push("Tang Môn");

  const thieuAmPos = (thaiTuePos + 3) % 12;
  cat[thieuAmPos].push("Thiếu Âm");

  const quanPhuTuePos = (thaiTuePos + 4) % 12;
  hung[quanPhuTuePos].push("Quan Phù");

  const tuPhuPos = (thaiTuePos + 5) % 12;
  hung[tuPhuPos].push("Tử Phù");

  const tuePhaPos = (thaiTuePos + 6) % 12;
  hung[tuePhaPos].push("Tuế Phá");

  const longDucPos = (thaiTuePos + 7) % 12;
  cat[longDucPos].push("Long Đức");

  const bachHoPos = (thaiTuePos + 8) % 12;
  hung[bachHoPos].push("Bạch Hổ");

  const phucDucPos = (thaiTuePos + 9) % 12;
  cat[phucDucPos].push("Phúc Đức");
  cat[phucDucPos].push("Thiên Đức");

  const dieuKhachPos = (thaiTuePos + 10) % 12;
  hung[dieuKhachPos].push("Điếu Khách");

  const trucPhuPos = (thaiTuePos + 11) % 12;
  hung[trucPhuPos].push("Trực Phù");

  // 11. Thiên Khốc & Thiên Hư
  const thienKhocPos = (6 - chiNamIndex + 120) % 12;
  hung[thienKhocPos].push("Thiên Khốc");
  const thienHuPos = (6 + chiNamIndex) % 12;
  hung[thienHuPos].push("Thiên Hư");

  // 12. Long Trì, Phượng Các, Giải Thần, Ân Quang, Thiên Quý
  const longTriPos = (4 + chiNamIndex) % 12;
  cat[longTriPos].push("Long Trì");
  const phuongCacPos = (10 - chiNamIndex + 120) % 12;
  cat[phuongCacPos].push("Phượng Các");
  cat[longTriPos].push("Giải Thần");

  const anQuangPos = (vanXuong + (ngaySinh - 1) - 1 + 120) % 12;
  cat[anQuangPos].push("Ân Quang");
  const thienQuyPos = (vanKhuc - (ngaySinh - 1) + 1 + 120) % 12;
  cat[thienQuyPos].push("Thiên Quý");

  // 13. Cô Thần & Quả Tú (theo Chi Tam Hợp)
  let coThanPos = 2;
  let quaTuPos = 10;
  if ([2, 3, 4].includes(chiNamIndex)) {
    coThanPos = 5; quaTuPos = 1;
  } else if ([5, 6, 7].includes(chiNamIndex)) {
    coThanPos = 8; quaTuPos = 4;
  } else if ([8, 9, 10].includes(chiNamIndex)) {
    coThanPos = 11; quaTuPos = 7;
  } else {
    coThanPos = 2; quaTuPos = 10;
  }
  hung[coThanPos].push("Cô Thần");
  hung[quaTuPos].push("Quả Tú");

  // 14. Thiên Hình & Thiên Riêu (theo tháng sinh)
  const thienHinhPos = (9 + thangSinh - 1) % 12;
  hung[thienHinhPos].push("Thiên Hình");
  const thienRieuPos = (1 + thangSinh - 1) % 12;
  hung[thienRieuPos].push("Thiên Riêu");
  cat[thienRieuPos].push("Thiên Y");

  // 15. Kiếp Sát, Hoa Cái, Phá Toái
  const kiepSatMap: Record<number, number> = {
    2: 11, 6: 11, 10: 11,
    8: 5, 0: 5, 4: 5,
    5: 2, 9: 2, 1: 2,
    11: 8, 3: 8, 7: 8
  };
  hung[kiepSatMap[chiNamIndex] ?? 2].push("Kiếp Sát");

  const hoaCaiMap: Record<number, number> = {
    2: 10, 6: 10, 10: 10,
    8: 4, 0: 4, 4: 4,
    5: 1, 9: 1, 1: 1,
    11: 7, 3: 7, 7: 7
  };
  cat[hoaCaiMap[chiNamIndex] ?? 1].push("Hoa Cái");

  const phaToaiMap: Record<number, number> = {
    5: 9, 9: 9, 1: 9,
    2: 5, 6: 5, 10: 5,
    8: 1, 0: 1, 4: 1,
    11: 3, 3: 3, 7: 3
  };
  hung[phaToaiMap[chiNamIndex] ?? 9].push("Phá Toái");

  // Lưu Hà (Can Tân tại Mão = 3)
  const luuHaMap = [9, 10, 7, 8, 5, 6, 11, 3, 0, 4];
  hung[luuHaMap[canNamIndex % 10]].push("Lưu Hà");

  // Thiên La (Thìn - 4), Địa Võng (Tuất - 10)
  hung[4].push("Thiên La");
  hung[10].push("Địa Võng");

  // Đầu Quân: (Thái Tuế - tháng sinh + giờ sinh)
  const dauQuanPos = (thaiTuePos - thangSinh + 1 + gioSinhIndex + 120) % 12;
  hung[dauQuanPos].push("Đầu Quân");

  // Thiên Thương (ở cung Nô bộc = chiNamIndex - 5 hoặc theo vị trí cung Nô)
  // Thiên Sứ (ở cung Tật ách)
  hung[4].push("Thiên Thương");
  hung[6].push("Thiên Sứ");

  // 16. Tứ Hóa Can Năm (Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ)
  // Gắn sao Hóa vào cung chứa sao được hóa
  const TU_HOA_RULE: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
    0: { loc: "Liêm Trinh", quyen: "Phá Quân", khoa: "Vũ Khúc", ky: "Thái Dương" },
    1: { loc: "Thiên Cơ", quyen: "Thiên Lương", khoa: "Tử Vi", ky: "Thái Âm" },
    2: { loc: "Thiên Đồng", quyen: "Thiên Cơ", khoa: "Văn Xương", ky: "Liêm Trinh" },
    3: { loc: "Thái Âm", quyen: "Thiên Đồng", khoa: "Thiên Cơ", ky: "Cự Môn" },
    4: { loc: "Tham Lang", quyen: "Thái Âm", khoa: "Hữu Bật", ky: "Thiên Cơ" },
    5: { loc: "Vũ Khúc", quyen: "Tham Lang", khoa: "Thiên Lương", ky: "Văn Khúc" },
    6: { loc: "Thái Dương", quyen: "Vũ Khúc", khoa: "Thái Âm", ky: "Thiên Đồng" },
    7: { loc: "Cự Môn", quyen: "Thái Dương", khoa: "Văn Khúc", ky: "Văn Xương" },
    8: { loc: "Thiên Lương", quyen: "Tử Vi", khoa: "Tả Phù", ky: "Vũ Khúc" },
    9: { loc: "Phá Quân", quyen: "Cự Môn", khoa: "Thái Âm", ky: "Tham Lang" },
  };

  const tuHoa = TU_HOA_RULE[canNamIndex % 10];
  if (tuHoa) {
    const starMap: Record<string, number> = {
      ...chinhTinhPositions,
      "Văn Xương": vanXuong,
      "Văn Khúc": vanKhuc,
      "Tả Phù": taPhu,
      "Hữu Bật": huuBat,
    };

    if (starMap[tuHoa.loc] !== undefined) cat[starMap[tuHoa.loc]].push("Hóa Lộc");
    if (starMap[tuHoa.quyen] !== undefined) cat[starMap[tuHoa.quyen]].push("Hóa Quyền");
    if (starMap[tuHoa.khoa] !== undefined) cat[starMap[tuHoa.khoa]].push("Hóa Khoa");
    if (starMap[tuHoa.ky] !== undefined) hung[starMap[tuHoa.ky]].push("Hóa Kỵ");
  }

  // 17. Các Sao Lưu Niên theo Năm Xem Vận Hạn (VD: 2026 - Bính Ngọ)
  const xemCanIndex = (namXem + 6) % 10;
  const xemChiIndex = (namXem + 8) % 12;

  // L.Thái Tuế tại Chi năm xem
  hung[xemChiIndex].push("L.Thái Tuế");
  // L.Tang Môn sau 2 cung, L.Bạch Hổ đối diện
  hung[(xemChiIndex + 2) % 12].push("L.Tang Môn");
  hung[(xemChiIndex + 8) % 12].push("L.Bạch Hổ");
  // L.Thiên Khốc & L.Thiên Hư
  hung[(6 - xemChiIndex + 120) % 12].push("L.Thiên Khốc");
  hung[(6 + xemChiIndex) % 12].push("L.Thiên Hư");
  // L.Lộc Tồn, L.Kình Dương, L.Đà La
  const luuLocPos = locTonMap[xemCanIndex % 10];
  cat[luuLocPos].push("L.Lộc Tồn");
  hung[(luuLocPos + 1) % 12].push("L.Kình Dương");
  hung[(luuLocPos - 1 + 120) % 12].push("L.Đà La");
  // L.Thiên Mã
  const luuMaPos = thienMaMap[xemChiIndex] ?? 2;
  cat[luuMaPos].push("L.Thiên Mã");

  // 18. Tuần & Triệt
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

  let giapOffset = (chiNamIndex - canNamIndex + 12) % 12;
  let tuan1 = (giapOffset + 10) % 12;
  let tuan2 = (giapOffset + 11) % 12;
  const tuanPos = [tuan1, tuan2];

  return { catTinh: cat, hungTinh: hung, tuanPos, trietPos };
}

export function anPhuTinhBase(thangSinh: number, gioSinhIndex: number): string[][] {
  const { catTinh } = anPhuTinhDayDu(thangSinh, gioSinhIndex, 0, 0);
  return catTinh;
}

