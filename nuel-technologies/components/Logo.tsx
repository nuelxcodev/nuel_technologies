export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#c6ff3d" />
      <path
        d="M14 35V13l20 22V13"
        stroke="#0a0f00"
        strokeWidth={4.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={90}
        strokeDashoffset={90}
        className="animate-draw"
      />
    </svg>
  );
}
