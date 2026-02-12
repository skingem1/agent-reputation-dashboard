"use client";

interface AreaChartProps {
  data: { date: string; count: number }[];
  title: string;
}

export function AreaChart({ data, title }: AreaChartProps) {
  if (data.length === 0) return null;

  const values = data.map((d) => d.count);
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.1;
  const width = 600;
  const height = 200;
  const padding = 30;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (width - 2 * padding),
    y: padding + ((max - d.count) / (max - min)) * (height - 2 * padding),
  }));

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = [
    `${points[0].x},${height - padding}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${height - padding}`,
  ].join(" ");

  return (
    <div>
      <h3 className="text-sm font-semibold font-display">{title}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full h-auto">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => {
          const y = padding + ratio * (height - 2 * padding);
          return (
            <line
              key={ratio}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray="4,4"
            />
          );
        })}

        <polygon points={areaPoints} fill="url(#areaGradient)" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X-axis labels (first, middle, last) */}
        {[0, Math.floor(data.length / 2), data.length - 1].map((i) => (
          <text
            key={i}
            x={points[i].x}
            y={height - 5}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {data[i].date.slice(5)}
          </text>
        ))}
      </svg>
    </div>
  );
}
