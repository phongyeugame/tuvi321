export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function getCanChiNam(namAmLich: number): string {
  const canIndex = (namAmLich + 6) % 10;
  const chiIndex = (namAmLich + 8) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

// Hàm giả định tính can chi các thành phần khác cho Phase 2
export function getCanChiThang(thangAmLich: number, namAmLich: number): string {
  return "Mậu Dần"; // Mock
}

export function getCanChiNgay(ngay: number, thang: number, nam: number): string {
  return "Canh Thìn"; // Mock
}

export function getCanChiGio(gioIndex: number, canNgay: string): string {
  return `Nhâm ${CHI[gioIndex % 12]}`; // Mock
}
