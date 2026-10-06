// Line icons for the category cards. Drawn inline (no icon library),
// sharing one wrapper so the stroke settings live in a single place.

function IconBase({ children }) {
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

const categoryIcons = {
  governmental: (
    <IconBase>
      <path d="M6 19h36" />
      <path d="M10 19v19" />
      <path d="M19 19v19" />
      <path d="M29 19v19" />
      <path d="M38 19v19" />
      <path d="M5 38h38" />
      <path d="M24 7l19 12H5L24 7Z" />
    </IconBase>
  ),

  towers: (
    <IconBase>
      <path d="M8 42V17h12v25" />
      <path d="M20 42V7h12v35" />
      <path d="M32 42V22h9v20" />
      <path d="M5 42h38" />
      <path d="M13 22h2M13 28h2" />
      <path d="M25 13h2M25 19h2M25 25h2" />
      <path d="M36 28h2M36 34h2" />
    </IconBase>
  ),

  commercial: (
    <IconBase>
      <path d="M6 21h36" />
      <path d="M10 21v19" />
      <path d="M38 21v19" />
      <path d="M6 40h36" />
      <path d="M14 21V10h20v11" />
      <path d="M18 15h12" />
      <path d="M7 10h34v11H7V10Z" />
    </IconBase>
  ),

  health: (
    <IconBase>
      <path d="M24 40S7 30 7 18c0-6 4-10 9-10 4 0 7 2 8 6 1-4 4-6 8-6 5 0 9 4 9 10 0 12-17 22-17 22Z" />
      <path d="M12 24h7l3-6 4 12 3-6h7" />
    </IconBase>
  ),

  coastal: (
    <IconBase>
      <path d="M6 29c5 0 5 4 11 4s6-4 12-4 6 4 13 4" />
      <path d="M6 37c5 0 5 4 11 4s6-4 12-4 6 4 13 4" />
      <path d="M24 7c-5 5-8 10-8 15 0 5 3 8 8 8s8-3 8-8c0-5-3-10-8-15Z" />
    </IconBase>
  ),

  airports: (
    <IconBase>
      <path d="m6 28 36-10" />
      <path d="m20 25-5-14 4-2 9 11" />
      <path d="m26 23 8 9-3 2-11-7" />
      <path d="M7 38h34" />
    </IconBase>
  ),
};

export default categoryIcons;