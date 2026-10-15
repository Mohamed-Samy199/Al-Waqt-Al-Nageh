export default function CategoryIconBase({ children }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      className="h-full w-full"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
