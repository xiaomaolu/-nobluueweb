interface CatmarkMarkProps {
  className?: string;
}

export function CatmarkMark({ className }: CatmarkMarkProps) {
  return (
    <svg className={className} viewBox="0 0 135 135" fill="none" aria-hidden="true">
      <path d="M93.6585 111V53.5785L57.1415 47.7569L56.0831 25L47.6154 46.1692L49.2031 25L41 46.1692V100.945L93.6585 111Z" />
      <circle cx="55.8184" cy="69.72" r="6.61538" />
      <circle cx="75.9292" cy="71.8369" r="6.61538" />
    </svg>
  );
}
