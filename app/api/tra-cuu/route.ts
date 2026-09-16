import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TraCuuInput, LaSoTuVi, Cung } from "@/lib/tuvi/types";
import { convertSolarToLunar, convertLunarToSolar } from "@/lib/tuvi/lunar-convert";
import { getCanChiNam, getCanChiThang, getCanChiNgay, getCanChiGio, CHI, CAN } from "@/lib/tuvi/can-chi";
import { getViTriCungMenh, getViTriCungThan, getNguHanhNapAm, getCuc } from "@/lib/tuvi/cung-menh";
import { anChinhTinhChiTiet, anPhuTinhDayDu } from "@/lib/tuvi/an-sao";

const CHU_MENH_MAP: Record<number, string> = {
  0: "Tham Lang", 1: "Cự Môn", 2: "Lộc Tồn", 3: "Văn Khúc",
  4: "Liêm Trinh", 5: "Vũ Khúc", 6: "Phá Quân", 7: "Vũ Khúc",
  8: "Liêm Trinh", 9: "Văn Khúc", 10: "Lộc Tồn", 11: "Cự Môn"
};

const CHU_THAN_MAP: Record<number, string> = {
  0: "Linh Tinh", 1: "Thiên Tướng", 2: "Thiên Lương", 3: "Thiên Đồng",
  4: "Văn Xương", 5: "Thiên Cơ", 6: "Linh Tinh", 7: "Thiên Tướng",
  8: "Thiên Lương", 9: "Thiên Đồng", 10: "Văn Xương", 11: "Thiên Cơ"
};

const CAM_TINH_MAP: Record<number, string> = {
  0: "Con Chuột tướng tinh con Trâu",
  1: "Con Trâu tướng tinh con Rái cá",
  2: "Con Hổ tướng tinh con Ngựa",
  3: "Con Mèo (Mão) tướng tinh con Nhím",
  4: "Con Rồng tướng tinh con Gà",
  5: "Con Rắn tướng tinh con Thỏ",
  6: "Con Ngựa tướng tinh con Hươu",
  7: "Con Dê tướng tinh con Chim Cắt",
  8: "Con Khỉ tướng tinh con Vượn",
  9: "Con Gà tướng tinh con Chó hoang",
  10: "Con Chó tướng tinh con Cáo",
  11: "Con Lợn tướng tinh con Thủy Quái"
};

const VONG_TRANG_SINH = [
  "Trường sinh", "Mộc dục", "Quan đới", "Lâm quan", "Đế vượng", "Suy",
  "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"
];

export async function POST(request: Request) {
  try {
    const input: TraCuuInput = await request.json();

    // Đọc thông tin Admin từ SiteConfig database nếu có
    let adminName = "Nguyễn Quốc Trưởng";
    let adminPhone = "0865341434";
    try {
      const siteConfig = await prisma.siteConfig.findUnique({
        where: { id: "default" },
      });
      if (siteConfig?.adminName) adminName = siteConfig.adminName;
      if (siteConfig?.adminPhone) adminPhone = siteConfig.adminPhone;
    } catch (e) {
      // Dùng fallback
    }

    // 1. Chuyển đổi Dương <-> Âm lịch hai chiều chuẩn xác
    let lunarDate = { ngay: input.ngay, thang: input.thang, nam: input.nam, nhuan: false };
    let solarDate = { ngay: input.ngay, thang: input.thang, nam: input.nam };

    if (input.loaiLich === "duong") {
      lunarDate = convertSolarToLunar(input.ngay, input.thang, input.nam);
    } else {
      solarDate = convertLunarToSolar(input.ngay, input.thang, input.nam, false);
    }

    const currentYear = new Date().getFullYear();
    const xemNam = input.namXemVanHan || currentYear;
    const canChiNamXem = getCanChiNam(xemNam);

    // 2. Tính Can Chi Năm, Tháng, Ngày, Giờ
    let gioName = input.gio;
    if (!gioName || CHI.indexOf(gioName) === -1) {
      if (input.birthHour !== undefined) {
        const validH = Math.max(0, Math.min(23, Number(input.birthHour) || 0));
        gioName = CHI[Math.floor(((validH + 1) % 24) / 2)];
      } else if (input.birthTime && input.birthTime.includes(":")) {
        const h = parseInt(input.birthTime.split(":")[0], 10);
        if (!isNaN(h)) {
          const validH = Math.max(0, Math.min(23, h));
          gioName = CHI[Math.floor(((validH + 1) % 24) / 2)];
        }
      }
    }
    const gioIndex = CHI.indexOf(gioName) !== -1 ? CHI.indexOf(gioName) : 0;
    if (!input.birthTime && input.birthHour !== undefined) {
      input.birthTime = `${String(input.birthHour).padStart(2, "0")}:${String(input.birthMinute || 0).padStart(2, "0")}`;
    }
    input.gio = gioName || CHI[gioIndex];

    const canChiNam = getCanChiNam(lunarDate.nam);
    const canChiThang = getCanChiThang(lunarDate.thang, lunarDate.nam);
    // Tính Can Chi Ngày theo ngày Dương Lịch tương ứng (Julian Day Number)
    const canChiNgay = getCanChiNgay(solarDate.ngay, solarDate.thang, solarDate.nam);
    const canChiGio = getCanChiGio(gioIndex, canChiNgay);

    const canNamIndex = (lunarDate.nam + 6) % 10;
    const chiNamIndex = (lunarDate.nam + 8) % 12;

    // Âm Nam / Dương Nam / Âm Nữ / Dương Nữ
    const isCanDuong = canNamIndex % 2 === 0;
    const isNam = input.gioiTinh === "nam";
    const amDuongMenh = `${isCanDuong ? "Dương" : "Âm"} ${isNam ? "Nam" : "Nữ"}`;
    const isThuanLy = (isCanDuong && isNam) || (!isCanDuong && !isNam);
    const amDuongThuanLy = isThuanLy ? "Âm Dương thuận lý" : "Âm Dương nghịch lý";

    // 3. Cung Mệnh, Thân, Ngũ Hành, Cục
    const viTriMenh = getViTriCungMenh(lunarDate.thang, gioIndex);
    const viTriThan = getViTriCungThan(lunarDate.thang, gioIndex);
    const menhIndex = CHI.indexOf(viTriMenh);
    const thanIndex = CHI.indexOf(viTriThan);
    const nguHanh = getNguHanhNapAm(canChiNam);
    const cuc = getCuc(viTriMenh, canChiNam);

    // 4. An 14 Chính Tinh
    const cacCungChinhTinhChiTiet = anChinhTinhChiTiet(cuc.so, lunarDate.ngay);

    // Lập bản đồ vị trí 14 chính tinh
    const chinhTinhPositions: { [saoTen: string]: number } = {};
    for (let pos = 0; pos < 12; pos++) {
      const list = cacCungChinhTinhChiTiet[pos] || [];
      for (const s of list) {
        chinhTinhPositions[s.ten] = pos;
      }
    }

    // An toàn bộ Phụ Tinh (Bác Sĩ, Thái Tuế, Sát Tinh, Cát Tinh, Tứ Hóa, Sao Lưu)
    const { catTinh, hungTinh, tuanPos, trietPos } = anPhuTinhDayDu(
      lunarDate.thang,
      gioIndex,
      canNamIndex,
      chiNamIndex,
      lunarDate.ngay,
      isThuanLy,
      chinhTinhPositions,
      xemNam
    );

    // 5. Tính Can Chi cho 12 Cung (Ngũ Hổ Độn - Khởi Dần)
    // Giáp/Kỷ: Bính Dần (2), Ất/Canh: Mậu Dần (4), Bính/Tân: Canh Dần (6), Đinh/Nhâm: Nhâm Dần (8), Mậu/Quý: Giáp Dần (0)
    const baseCanDan = ((canNamIndex % 5) * 2 + 2) % 10;
    const canChiCungMap: Record<number, { full: string; short: string; canIdx: number }> = {};

    const canShortLetters: Record<string, string> = {
      "Giáp": "G", "Ất": "Ấ", "Bính": "B", "Đinh": "Đ", "Mậu": "M",
      "Kỷ": "K", "Canh": "C", "Tân": "T", "Nhâm": "N", "Quý": "Q"
    };

    for (let pos = 0; pos < 12; pos++) {
      const stepsFromDan = (pos - 2 + 12) % 12;
      const canIdx = (baseCanDan + stepsFromDan) % 10;
      const canName = CAN[canIdx];
      const sign = canIdx % 2 === 0 ? "+" : "-";
      const shortLetter = canShortLetters[canName] || canName[0];
      canChiCungMap[pos] = {
        full: `${canName} ${CHI[pos]}`,
        short: `${sign}${shortLetter}. ${CHI[pos]}`,
        canIdx
      };
    }

    // 6. Tính Đại Hạn (10 năm/cung)
    const daiHanMap: Record<number, number> = {};
    for (let step = 0; step < 12; step++) {
      const targetPos = isThuanLy
        ? (menhIndex + step) % 12
        : (menhIndex - step + 12) % 12;
      daiHanMap[targetPos] = cuc.so + step * 10;
    }

    // 7. Tính Vòng Tràng Sinh
    // Khởi: Thủy nhị cục (2), Thổ ngũ cục (5) -> Thân (8); Mộc tam cục (3) -> Hợi (11); Kim tứ cục (4) -> Tỵ (5); Hỏa lục cục (6) -> Dần (2)
    let trangSinhStart = 8;
    if (cuc.so === 3) trangSinhStart = 11;
    else if (cuc.so === 4) trangSinhStart = 5;
    else if (cuc.so === 6) trangSinhStart = 2;

    const trangSinhMap: Record<number, string> = {};
    for (let step = 0; step < 12; step++) {
      const targetPos = isThuanLy
        ? (trangSinhStart + step) % 12
        : (trangSinhStart - step + 12) % 12;
      trangSinhMap[targetPos] = VONG_TRANG_SINH[step];
    }

    // 8. Bố trí 12 Cung (Mệnh luôn ở menhIndex, đếm nghịch theo truyền thống)
    const tenCungThuTu = [
      "Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", "Quan Lộc", "Nô Bộc",
      "Thiên Di", "Tật Ách", "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"
    ];

    // Tạo map từ chiIndex sang tên Cung chức năng
    const chiToCungName: Record<number, string> = {};
    for (let i = 0; i < 12; i++) {
      const chiIdx = (menhIndex + i) % 12;
      chiToCungName[chiIdx] = tenCungThuTu[i];
    }

    // Bảng quy tắc Tứ Hóa theo Can
    const TU_HOA_TABLE: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
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

    // Tìm cung của Văn Xương & Văn Khúc
    const vanXuongChi = (10 - gioIndex + 12) % 12;
    const vanKhucChi = (4 + gioIndex) % 12;
    const taPhuChi = (4 + lunarDate.thang - 1) % 12;
    const huuBatChi = (10 - lunarDate.thang + 1 + 12) % 12;

    const allStarPositions: Record<string, number> = {
      ...chinhTinhPositions,
      "Văn Xương": vanXuongChi,
      "Văn Khúc": vanKhucChi,
      "Tả Phù": taPhuChi,
      "Hữu Bật": huuBatChi,
    };

    const cungList: Cung[] = [];
    for (let i = 0; i < 12; i++) {
      let chiIndex = (menhIndex + i) % 12;
      const chiName = CHI[chiIndex];
      const ctList = cacCungChinhTinhChiTiet[chiIndex] || [];
      const catList = catTinh[chiIndex] || [];
      const hungList = hungTinh[chiIndex] || [];
      const isTriet = trietPos.includes(chiIndex);
      const isTuan = tuanPos.includes(chiIndex);
      const isCungThan = chiIndex === thanIndex;

      // Phi tinh Tứ Hóa của cung này theo Can của cung
      const cungCanIdx = canChiCungMap[chiIndex]?.canIdx ?? 0;
      const thRules = TU_HOA_TABLE[cungCanIdx];

      const getTargetName = (starName: string) => {
        const p = allStarPositions[starName];
        if (p === undefined) return "Mệnh";
        return p === chiIndex ? "Tự" : chiToCungName[p] || "Mệnh";
      };

      const locTarget = getTargetName(thRules.loc);
      const quyenTarget = getTargetName(thRules.quyen);
      const khoaTarget = getTargetName(thRules.khoa);
      const kyTarget = getTargetName(thRules.ky);

      const tuHoaCung = [
        locTarget === "Tự" ? "Tự Hóa lộc" : `Hóa lộc 🐅 ${locTarget}`,
        quyenTarget === "Tự" ? "Tự Hóa quyền" : `Hóa quyền 🐅 ${quyenTarget}`,
        khoaTarget === "Tự" ? "Tự Hóa khoa" : `Hóa khoa 🐅 ${khoaTarget}`,
        kyTarget === "Tự" ? "Tự Hóa kỵ" : `Hóa kỵ 🐅 ${kyTarget}`,
      ];

      // Chi năm niên hạn trên bàn cờ chuẩn (Khởi Tý tại Dần đếm thuận)
      const tieuHanChi = CHI[(chiIndex - 2 + 12) % 12];

      cungList.push({
        ten: tenCungThuTu[i],
        viTri: chiName,
        canChi: canChiCungMap[chiIndex]?.full,
        canChiShort: canChiCungMap[chiIndex]?.short,
        daiHan: daiHanMap[chiIndex],
        trangSinh: trangSinhMap[chiIndex] || "Trường sinh",
        tieuHanNam: `Năm ${tieuHanChi}`,
        nguyetHan: i + 1,
        isThan: isCungThan,
        triet: isTriet,
        tuan: isTuan,
        chinhTinh: ctList.map((s) => s.ten),
        chinhTinhChiTiet: ctList,
        phuTinh: [...catList, ...hungList],
        catTinh: catList,
        hungTinh: hungList,
        tuHoa: tuHoaCung,
        luanGiai: `Cung ${tenCungThuTu[i]} tại ${chiName}. ${
          ctList.length
            ? "Chính tinh: " + ctList.map((s) => `${s.ten} (${s.trangThai})`).join(", ")
            : "Cung Vô Chính Diệu, mượn ánh sáng cung xung chiếu."
        }. Hội tụ các cát tinh (${catList.slice(0, 3).join(", ") || "Hài hòa"}) và hung sát tinh (${hungList.slice(0, 3).join(", ") || "Yên ổn"}).`
      });
    }

    // 9. Tính tuổi mụ & thông tin Thiên Bàn
    const tuoiMu = xemNam - lunarDate.nam + 1;

    // Mối quan hệ Mệnh & Cục
    let menhKhacCuc = "Mệnh và Cục tương sinh hòa hợp";
    const hanhMenh = nguHanh.split(" ").pop() || "Kim";
    const hanhCuc = cuc.ten.split(" ")[0];
    if (hanhMenh === "Kim" && hanhCuc === "Mộc") menhKhacCuc = "Mệnh Kim khắc Cục Mộc (-2.0)";
    else if (hanhMenh === "Mộc" && hanhCuc === "Thổ") menhKhacCuc = "Mệnh Mộc khắc Cục Thổ (-2.0)";
    else if (hanhMenh === "Thủy" && hanhCuc === "Hỏa") menhKhacCuc = "Mệnh Thủy khắc Cục Hỏa (-2.0)";
    else if (hanhMenh === "Hỏa" && hanhCuc === "Kim") menhKhacCuc = "Mệnh Hỏa khắc Cục Kim (-2.0)";
    else if (hanhMenh === "Thổ" && hanhCuc === "Thủy") menhKhacCuc = "Mệnh Thổ khắc Cục Thủy (-2.0)";
    else menhKhacCuc = `Mệnh ${hanhMenh} tương sinh ${cuc.ten} (+1.8)`;

    // Điểm số lá số
    const diemLaSo = Math.min(96, Math.max(38, Math.floor(55 + (lunarDate.ngay % 35))));

    const now = new Date();
    const lapLuc = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} phút, ngày ${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    const laSo: LaSoTuVi = {
      input,
      lunarDate,
      solarDate: { ngay: solarDate.ngay, thang: solarDate.thang, nam: solarDate.nam },
      canChi: {
        nam: canChiNam,
        thang: canChiThang,
        ngay: canChiNgay,
        gio: canChiGio
      },
      cungMenh: viTriMenh,
      cungThan: viTriThan,
      nguHanh,
      cuc: cuc.ten,
      cucSo: cuc.so,
      cung: cungList,
      luanGiaiTongQuan: `Bản mệnh ${nguHanh}, ${cuc.ten}. Mệnh cư ${viTriMenh}, Thân cư ${viTriThan}. ${amDuongThuanLy}. Năm xem hạn ${xemNam} (${canChiNamXem}) hứa hẹn nhiều cơ hội phát triển.`,
      // Admin Branding chính thức
      adminName,
      adminPhone,
      // Thiên Bàn
      tuoi: tuoiMu,
      amDuongMenh,
      amDuongThuanLy,
      menhKhacCuc,
      camTinh: "Con rắn, xuất tướng tinh con thỏ",
      chuMenh: CHU_MENH_MAP[chiNamIndex] || "Vũ Khúc",
      chuThan: CHU_THAN_MAP[chiNamIndex] || "Thiên Cơ",
      conNha: "Con nhà BẠCH ĐẾ (trường thành)",
      doMang: "Ông Quan Đế độ mạng",
      canLuong: "4 lượng 0 chỉ",
      hanNam: `${canChiNamXem} (${xemNam})`,
      lapLuc,
      diemLaSo: 36,
      diemCung: {
        "Mệnh": 1.7, "Phụ mẫu": 6.7, "Phúc đức": 3.6, "Điền trạch": 0,
        "Quan lộc": -8, "Nô bộc": -10, "Thiên di": -7, "Tật ách": 10,
        "Tài bạch": 3.3, "Tử tức": 12.4, "Phu thê": 14.4, "Huynh đệ": -1
      }
    };

    return NextResponse.json(laSo);
  } catch (error) {
    console.error("Lỗi tạo lá số:", error);
    return NextResponse.json({ error: "Lỗi xử lý lá số tử vi" }, { status: 500 });
  }
}

