export default function StatCounter({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-white">{value}</div>
      <div className="text-neutral-200 mt-2 text-sm md:text-base">{label}</div>
    </div>
  );
}
