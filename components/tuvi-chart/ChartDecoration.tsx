"use client";

import React from "react";
import { TuViChartData } from "./types";
import { getNguHanhColor } from "./constants";
import { computeChartLines } from "./lines";

interface ChartDecorationProps {
  chart?: TuViChartData;
}

export function ChartDecoration({ chart }: ChartDecorationProps) {
  if (!chart) return null;

  const lines = chart.lines || computeChartLines(chart);
  if (!lines || lines.length === 0) return null;

  // Thu thập danh sách các điểm neo duy nhất trên mép biên Thiên Bàn
  const anchorPoints = React.useMemo(() => {
    const map = new Map<string, { x: number; y: number; color: string }>();
    lines.forEach((l) => {
      const color = getNguHanhColor(l.nguHanh || l.element);
      const k1 = `${Math.round(l.x1)},${Math.round(l.y1)}`;
      if (!map.has(k1)) map.set(k1, { x: l.x1, y: l.y1, color });
      const k2 = `${Math.round(l.x2)},${Math.round(l.y2)}`;
      if (!map.has(k2)) map.set(k2, { x: l.x2, y: l.y2, color });
    });
    return Array.from(map.values());
  }, [lines]);

  return (
    <g id="chart-connection-lines-layer" className="pointer-events-none">
      <defs>
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* 1. Render các đường nối Tam Hợp, Xung Chiếu, Thân Cư qua Thiên Bàn */}
      {lines.map((line) => {
        const strokeColor = getNguHanhColor(line.nguHanh || line.element);

        return (
          <g key={line.id} className="connection-line-group">
            {/* Đường nền mờ dịu mắt, hòa nhã */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={strokeColor}
              strokeWidth={(line.strokeWidth || 1.8) + 1.6}
              opacity={0.10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Đường chính nét đứt theo Ngũ Hành với sắc độ dịu nhẹ, thanh thoát */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={strokeColor}
              strokeWidth={line.strokeWidth || 1.8}
              strokeDasharray={line.dashArray || "8 5"}
              opacity={line.opacity || 0.55}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* 2. Render các điểm neo viền tinh tế (tọa lạc trên mép biên khung Thiên Bàn, không chọc vào trong lá số) */}
      {anchorPoints.map((pt, idx) => (
        <g key={`anchor-${pt.x}-${pt.y}-${idx}`} className="anchor-node">
          {/* Vòng đệm ngọc trắng viền màu Ngũ Hành */}
          <circle
            cx={pt.x}
            cy={pt.y}
            r={3.2}
            fill="#FFFDF9"
            stroke={pt.color}
            strokeWidth={1.4}
            opacity={0.85}
          />
          {/* Tâm điểm ngọc Ngũ Hành sắc nét */}
          <circle
            cx={pt.x}
            cy={pt.y}
            r={1.4}
            fill={pt.color}
            opacity={0.85}
          />
        </g>
      ))}
    </g>
  );
}
