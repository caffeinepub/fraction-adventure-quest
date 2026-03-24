interface PizzaSVGProps {
  numerator: number;
  denominator: number;
  size?: number;
}

const TOPPING_OFFSETS = [
  { id: "inner", r: 0.55, aOff: -15 },
  { id: "mid", r: 0.72, aOff: 0 },
  { id: "outer", r: 0.65, aOff: 15 },
];

export default function PizzaSVG({
  numerator,
  denominator,
  size = 200,
}: PizzaSVGProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;
  const crustR = r + size * 0.04;

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

  function crustPath(sliceIndex: number) {
    const anglePerSlice = 360 / denominator;
    const startAngle = sliceIndex * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;
    const s1 = polarToCartesian(r, startAngle);
    const e1 = polarToCartesian(r, endAngle);
    const s2 = polarToCartesian(crustR, startAngle);
    const e2 = polarToCartesian(crustR, endAngle);
    const largeArc = anglePerSlice > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${r} ${r} 0 ${largeArc} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${crustR} ${crustR} 0 ${largeArc} 0 ${s2.x} ${s2.y} Z`;
  }

  function toppingDots(sliceIndex: number) {
    const anglePerSlice = 360 / denominator;
    const midAngle = sliceIndex * anglePerSlice + anglePerSlice / 2;
    return TOPPING_OFFSETS.map(({ id, r: off, aOff }) => {
      const a = midAngle + aOff;
      const pos = polarToCartesian(r * off, a);
      return (
        <circle
          key={`topping-${sliceIndex}-${id}`}
          cx={pos.x}
          cy={pos.y}
          r={size * 0.028}
          fill="#c0392b"
          opacity="0.85"
        />
      );
    });
  }

  const sliceIds = Array.from(
    { length: denominator },
    (_, i) => `pizza-slice-${i + 1}`,
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg"
      aria-label={`Pizza showing ${numerator}/${denominator}`}
    >
      <title>{`Pizza showing ${numerator}/${denominator}`}</title>
      {sliceIds.map((sliceKey, i) => (
        <path
          key={`crust-${sliceKey}`}
          d={crustPath(i)}
          fill="#d4a054"
          stroke="#8B5E2D"
          strokeWidth="1.5"
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#e74c3c"
        stroke="#8B2500"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r={r * 0.92} fill="#f9e07b" />
      {sliceIds.map((sliceKey, i) => (
        <path
          key={sliceKey}
          d={slicePath(i)}
          fill={i < numerator ? "#FF9A2F" : "transparent"}
          stroke="#8B5E2D"
          strokeWidth="1.5"
          opacity={i < numerator ? 0.7 : 0}
        />
      ))}
      {sliceIds.map((sliceKey, i) => {
        const anglePerSlice = 360 / denominator;
        const angle = i * anglePerSlice;
        const end = polarToCartesian(r, angle);
        return (
          <line
            key={`line-${sliceKey}`}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="#8B5E2D"
            strokeWidth="2"
          />
        );
      })}
      {sliceIds.filter((_, i) => i < numerator).map((_, i) => toppingDots(i))}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.04}
        fill="#d4a054"
        stroke="#8B5E2D"
        strokeWidth="1.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={crustR}
        fill="none"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
    </svg>
  );
}
