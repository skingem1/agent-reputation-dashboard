"use client";

interface BarChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-muted-foreground truncate">
              {item.label}
            </span>
            <div className="flex-1">
              <div className="h-5 w-full rounded-full bg-muted">
                <div
                  className="h-5 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{
                    width: `${Math.max((item.value / maxValue) * 100, 8)}%`,
                    backgroundColor: item.color,
                  }}
                >
                  <span className="text-[10px] font-medium text-white">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
