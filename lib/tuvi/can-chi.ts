export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// 1. Tính Can Chi Năm (theo Âm Lịch)
// Năm 4 SCN là Giáp Tý
export function getCanChiNam(namAmLich: number): string {
  const canIndex = (namAmLich + 6) % 10;
  const chiIndex = (namAmLich + 8) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

// 2. Tính Can Chi Tháng (theo Ngũ Dần Quyết)
// Tháng Giêng (tháng 1 âm) luôn mang chi Dần.
// Can tháng 1 được xác định từ Can năm:
// - Năm Giáp, Kỷ (canIndex 0, 5): Tháng 1 khởi Bính Dần (canIndex 2)
// - Năm Ất, Canh (canIndex 1, 6): Tháng 1 khởi Mậu Dần (canIndex 4)
// - Năm Bính, Tân (canIndex 2, 7): Tháng 1 khởi Canh Dần (canIndex 6)
// - Năm Đinh, Nhâm (canIndex 3, 8): Tháng 1 khởi Nhâm Dần (canIndex 8)
// - Năm Mậu, Quý (canIndex 4, 9): Tháng 1 khởi Giáp Dần (canIndex 0)
export function getCanChiThang(thangAmLich: number, namAmLich: number): string {
  const canNamIndex = (namAmLich + 6) % 10;
  const baseCanThang1 = ((canNamIndex % 5) * 2 + 2) % 10;
  
  // Can tháng = (Can tháng 1 + số tháng - 1) % 10
  const canThangIndex = (baseCanThang1 + (thangAmLich - 1)) % 10;
  // Chi tháng: Tháng 1 là Dần (index 2), Tháng 2 là Mão (3)...
  const chiThangIndex = (2 + (thangAmLich - 1)) % 12;

  return `${CAN[canThangIndex]} ${CHI[chiThangIndex]}`;
}

// 3. Tính Can Chi Ngày chính xác theo thuật toán Thiên Văn Julian Day Number (JDN)
function getJulianDayNumber(day: number, month: number, year: number): number {
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export function getCanChiNgay(ngayDuong: number, thangDuong: number, namDuong: number): string {
  const jdn = getJulianDayNumber(ngayDuong, thangDuong, namDuong);
  // Can Ngày: (JDN + 9) % 10
  const canNgayIndex = (jdn + 9) % 10;
  // Chi Ngày: (JDN + 1) % 12
  const chiNgayIndex = (jdn + 1) % 12;

  return `${CAN[canNgayIndex]} ${CHI[chiNgayIndex]}`;
}

// 4. Tính Can Chi Giờ (theo Ngũ Tý Quyết dựa trên Can Ngày)
// Chi giờ đã có (Tý = 0, Sửu = 1... Hợi = 11)
// Can giờ Tý:
// - Ngày Giáp, Kỷ: Giờ Tý khởi Giáp Tý (0)
// - Ngày Ất, Canh: Giờ Tý khởi Bính Tý (2)
// - Ngày Bính, Tân: Giờ Tý khởi Mậu Tý (4)
// - Ngày Đinh, Nhâm: Giờ Tý khởi Canh Tý (6)
// - Ngày Mậu, Quý: Giờ Tý khởi Nhâm Tý (8)
export function getCanChiGio(gioIndex: number, canChiNgay: string): string {
  const canNgay = canChiNgay.split(" ")[0];
  const canNgayIndex = CAN.indexOf(canNgay) !== -1 ? CAN.indexOf(canNgay) : 0;
  const baseCanGioTy = ((canNgayIndex % 5) * 2) % 10;
  
  const canGioIndex = (baseCanGioTy + gioIndex) % 10;
  const chiGio = CHI[gioIndex % 12];

  return `${CAN[canGioIndex]} ${chiGio}`;
}
