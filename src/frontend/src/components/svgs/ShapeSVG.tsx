interface ShapeSVGProps {
  numerator: number;
  denominator: number;
  shapeType: "circle" | "rectangle";
  size?: number;
}

export default function ShapeSVG({
  numerator,
  denominator,
  shapeType,
  size = 200,
}: ShapeSVGProps) {
  if (shapeType === "circle") {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.42;

    function polarToCartesian(radius: number, angleDeg: number) {
      const rad = ((angleDeg - 90) * Math.PI) / 180;
      return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }

    function slicePath(sliceIndex: number) {
      const anglePerSlice = 360 / denominator;
      const startAngle = sliceIndex * anglePerSlice;
      const endAngle = startAngle + anglePerSlice;
      const start = polarToCartesian(r, startAngle);
      const end = polarToCartesian(r, endAngle);
      const largeArc = anglePerSlice > 180 ? 1 : 0;
      return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    }

    const slices = Array.from({ length: denominator }, (_, i) => i);

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
        aria-label={`Circle showing ${numerator}/${denominator}`}
      >
        <title>{`Circle showing ${numerator}/${denominator}`}</title>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="#e8f4fd"
          stroke="#1B2352"
          strokeWidth="2.5"
        />
        {slices.map((i) => (
          <path
            key={`slice-${i}`}
            d={slicePath(i)}
            fill={i < numerator ? "#2E7BFF" : "transparent"}
            stroke="#1B2352"
            strokeWidth="2"
            opacity={i < numerator ? 0.75 : 1}
          />
        ))}
        {slices.map((i) => {
          const anglePerSlice = 360 / denominator;
          const angle = i * anglePerSlice;
          const end = polarToCartesian(r, angle);
          return (
            <line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="#1B2352"
              strokeWidth="2"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={size * 0.035} fill="#1B2352" />
      </svg>
    );
  }

  // Rectangle
  const padX = size * 0.06;
  const padY = size * 0.25;
  const totalW = size - padX * 2;
  const totalH = size * 0.5;
  const sliceW = totalW / denominator;
  const rectSlices = Array.from({ length: denominator }, (_, i) => i);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg"
      aria-label={`Rectangle showing ${numerator}/${denominator}`}
    >
      <title>{`Rectangle showing ${numerator}/${denominator}`}</title>
      <rect
        x={padX}
        y={padY}
        width={totalW}
        height={totalH}
        fill="#e8f8f0"
        stroke="#1B2352"
        strokeWidth="2.5"
        rx="6"
      />
      {rectSlices.map((i) => (
        <rect
          key={`rect-${i}`}
          x={padX + i * sliceW}
          y={padY}
          width={sliceW}
          height={totalH}
          fill={i < numerator ? "#2ECC71" : "transparent"}
          stroke="#1B2352"
          strokeWidth="1.5"
          opacity={i < numerator ? 0.7 : 1}
        />
      ))}
      <rect
        x={padX}
        y={padY}
        width={totalW}
        height={totalH}
        fill="none"
        stroke="#1B2352"
        strokeWidth="2.5"
        rx="6"
      />
    </svg>
  );
}
