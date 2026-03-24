interface CakeSVGProps {
  numerator: number;
  denominator: number;
  size?: number;
}

export default function CakeSVG({
  numerator,
  denominator,
  size = 200,
}: CakeSVGProps) {
  const width = size;
  const height = size * 0.7;
  const topY = size * 0.12;
  const bottomY = topY + height * 0.75;
  const sliceW = width / denominator;

  // Use value-based keys instead of index
  const sliceIds = Array.from(
    { length: denominator },
    (_, i) => `cake-slice-pos-${i + 1}`,
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg"
      aria-label={`Cake showing ${numerator}/${denominator}`}
    >
      <title>{`Cake showing ${numerator}/${denominator}`}</title>
      {/* Plate */}
      <ellipse
        cx={size / 2}
        cy={bottomY + size * 0.08}
        rx={size * 0.48}
        ry={size * 0.07}
        fill="#f0e6d3"
        stroke="#c8a97a"
        strokeWidth="2"
      />

      {/* Cake body slices */}
      {sliceIds.map((sliceKey, i) => {
        const x = i * sliceW + size * 0.02;
        const w = sliceW - 2;
        const isShaded = i < numerator;
        return (
          <g key={sliceKey}>
            <rect
              x={x}
              y={topY + height * 0.25}
              width={w}
              height={height * 0.5}
              fill={isShaded ? "#e8975c" : "#f5d5b5"}
              stroke="#5D3A1A"
              strokeWidth="1.5"
            />
            <rect
              x={x}
              y={topY}
              width={w}
              height={height * 0.26}
              fill={isShaded ? "#FF9A2F" : "#fce4c0"}
              stroke="#5D3A1A"
              strokeWidth="1.5"
            />
            <rect
              x={x}
              y={topY + height * 0.23}
              width={w}
              height={height * 0.06}
              fill={isShaded ? "#7B3F00" : "#d4a97a"}
            />
            {isShaded && (
              <>
                <circle
                  cx={x + w * 0.3}
                  cy={topY + height * 0.12}
                  r={size * 0.018}
                  fill="#e74c3c"
                />
                <circle
                  cx={x + w * 0.6}
                  cy={topY + height * 0.08}
                  r={size * 0.015}
                  fill="#3498db"
                />
                <circle
                  cx={x + w * 0.5}
                  cy={topY + height * 0.18}
                  r={size * 0.015}
                  fill="#2ecc71"
                />
                {i === 0 && (
                  <>
                    <rect
                      x={x + w * 0.45}
                      y={topY - height * 0.2}
                      width={size * 0.04}
                      height={height * 0.22}
                      fill="#FFCC4D"
                      stroke="#E8890A"
                      strokeWidth="1"
                    />
                    <ellipse
                      cx={x + w * 0.47 + size * 0.02}
                      cy={topY - height * 0.22}
                      rx={size * 0.02}
                      ry={size * 0.03}
                      fill="#FF6B35"
                    />
                  </>
                )}
              </>
            )}
          </g>
        );
      })}

      {/* Outline */}
      <rect
        x={size * 0.02}
        y={topY}
        width={size * 0.96}
        height={height * 0.75}
        fill="none"
        stroke="#5D3A1A"
        strokeWidth="2.5"
        rx="4"
      />
    </svg>
  );
}
