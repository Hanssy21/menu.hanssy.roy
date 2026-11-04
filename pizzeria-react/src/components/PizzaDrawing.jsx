
export default function PizzaDrawing({ color }) {
  return (
    <svg viewBox="0 0 200 200" className="pizza-drawing">
      <circle cx="100" cy="100" r="94" fill="#C78A38" />
      <circle cx="100" cy="100" r="84" fill="#F3C85B" />
      <circle cx="100" cy="100" r="73" fill="#F8E6B0" />

      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x = 100 + Math.cos(angle) * 48;
        const y = 100 + Math.sin(angle) * 48;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="10"
            fill={color}
          />
        );
      })}

      <circle cx="100" cy="100" r="12" fill="#DFAE43" />
    </svg>
  );
}
