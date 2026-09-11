/**
 * Thuật toán chuyển đổi Dương lịch sang Âm lịch.
 * Ghi chú: Giai đoạn 2 sử dụng Mock data để hoàn thiện UI.
 * Thuật toán chuẩn Hồ Ngọc Đức sẽ được tích hợp ở Phase 3.
 */

export function convertSolarToLunar(dd: number, mm: number, yy: number) {
  // MOCK DATA cho Phase 2
  // Giả sử ngày âm luôn trễ hơn ngày dương khoảng 1 tháng
  let lunarMonth = mm - 1;
  let lunarYear = yy;
  if (lunarMonth <= 0) {
    lunarMonth += 12;
    lunarYear -= 1;
  }
  
  return {
    ngay: dd,
    thang: lunarMonth,
    nam: lunarYear,
    nhuan: false
  };
}
