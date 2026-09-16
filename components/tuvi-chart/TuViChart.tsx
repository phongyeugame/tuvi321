"use client";

import React from "react";
import { TuViChartData } from "./types";
import {
  SVG_WIDTH,
  SVG_HEIGHT,
  BOARD_PADDING,
  PALACE_WIDTH,
  PALACE_HEIGHT,
  CENTER_X,
  CENTER_Y,
  CENTER_WIDTH,
  CENTER_HEIGHT,
  CHART_THEME,
} from "./constants";
import { Palace } from "./Palace";
import { ChartCenter } from "./ChartCenter";
import { ChartDecoration } from "./ChartDecoration";

export interface TuViChartProps {
  chart: TuViChartData;
  selectedPalaceId?: string;
  onSelectPalace?: (id: string) => void;
  className?: string;
  svgRef?: React.Ref<SVGSVGElement>;
}

export function TuViChart({
  chart,
  selectedPalaceId,
  onSelectPalace,
  className = "",
  svgRef,
}: TuViChartProps) {
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width="100%"
      height="100%"
      className={`tuvi-chart-svg block select-none ${className}`}
      style={{
        backgroundColor: CHART_THEME.background,
        maxWidth: "100%",
        height: "auto",
        aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
      }}
    >
      <defs>
        {/* Bộ lọc bóng đổ nhẹ cho thẻ chữ nổi bật */}
        <filter id="shadowLight" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* 1. Nền Toàn Bộ Bàn Cờ (Màu giấy kem cổ điển) */}
      <rect
        x="0"
        y="0"
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        fill={CHART_THEME.background}
      />

      {/* 2. Khung Viền Ngoài Nâu Đỏ Truyền Thống */}
      <rect
        x="0.5"
        y="0.5"
        width={SVG_WIDTH - 1}
        height={SVG_HEIGHT - 1}
        fill="none"
        stroke={CHART_THEME.boardBorder}
        strokeWidth="1.5"
      />

      {/* 3. LỚP BACKGROUND: Render nền của 12 Ô Cung + Ô Trung Tâm */}
      <g id="chart-backgrounds-layer">
        {chart.palaces.map((palace) => {
          const palaceX = BOARD_PADDING + palace.gridCol * PALACE_WIDTH;
          const palaceY = BOARD_PADDING + palace.gridRow * PALACE_HEIGHT;

          return (
            <Palace
              key={`bg-${palace.id}`}
              palace={palace}
              x={palaceX}
              y={palaceY}
              width={PALACE_WIDTH}
              height={PALACE_HEIGHT}
              bgOnly
            />
          );
        })}
        <ChartCenter
          user={chart.user}
          metadata={chart.metadata}
          chart={chart}
          x={CENTER_X}
          y={CENTER_Y}
          width={CENTER_WIDTH}
          height={CENTER_HEIGHT}
          bgOnly
        />
      </g>

      {/* 4. LỚP BẢN ĐỒ ĐƯỜNG NỐI NGŨ HÀNH (NGU HANH MAP LINES) */}
      {/* Nằm TRÊN tất cả nền (không bị che khuất) nhưng DƯỚI text và sao (không che chữ) */}
      <ChartDecoration chart={chart} />

      {/* 5. LỚP NỘI DUNG 12 Ô CUNG XUNG QUANH: Viền, Con giáp chìm, Tiêu đề, Các Sao, Tứ Hóa */}
      <g id="palaces-layer">
        {chart.palaces.map((palace) => {
          const palaceX = BOARD_PADDING + palace.gridCol * PALACE_WIDTH;
          const palaceY = BOARD_PADDING + palace.gridRow * PALACE_HEIGHT;

          return (
            <Palace
              key={palace.id}
              palace={palace}
              x={palaceX}
              y={palaceY}
              width={PALACE_WIDTH}
              height={PALACE_HEIGHT}
              isSelected={selectedPalaceId === palace.id}
              onSelect={() => onSelectPalace?.(palace.id)}
              contentOnly
            />
          );
        })}
      </g>

      {/* 6. LỚP NỘI DUNG THIÊN BÀN TRUNG TÂM: Viền, Tia Bát Quái Ngũ Hành, Mandala, Bảng 16 dòng, Ma trận 4x4 */}
      <ChartCenter
        user={chart.user}
        metadata={chart.metadata}
        chart={chart}
        x={CENTER_X}
        y={CENTER_Y}
        width={CENTER_WIDTH}
        height={CENTER_HEIGHT}
        contentOnly
      />
    </svg>
  );
}
