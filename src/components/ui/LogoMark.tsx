interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  const id = `lbg-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="La Brasa Grill logo"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7B40"/>
          <stop offset="100%" stopColor="#D94000"/>
        </linearGradient>
        <linearGradient id={`${id}-fo`} x1="80" y1="22" x2="80" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE066"/>
          <stop offset="45%" stopColor="#FFB800"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
        <linearGradient id={`${id}-fi`} x1="80" y1="50" x2="80" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Background */}
      <rect width="160" height="160" rx="36" fill={`url(#${id}-bg)`}/>
      <rect x="1" y="1" width="158" height="158" rx="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>

      {/* Outer flame */}
      <path
        d="M80 138 C55 126 42 104 46 82 C49 66 58 56 63 48 C61 57 66 62 70 59 C72 57 71 45 76 36 C77 32 80 29 80 29 C83 33 85 38 84 44 C87 38 92 40 93 48 C97 42 99 47 99 54 C102 48 104 52 104 58 C106 66 104 78 100 88 C96 100 106 96 108 84 C112 96 110 110 102 120 C98 126 90 134 80 138Z"
        fill={`url(#${id}-fo)`}
        filter={`url(#${id}-glow)`}
      />

      {/* Inner glow */}
      <path
        d="M80 130 C63 120 57 103 60 88 C62 77 68 71 70 76 C70 70 74 67 77 70 C75 78 79 83 83 79 C87 75 88 82 88 90 C88 106 85 120 80 130Z"
        fill={`url(#${id}-fi)`}
        opacity="0.7"
      />

      {/* Spark */}
      <circle cx="80" cy="26" r="3" fill="#FFE066" opacity="0.8"/>
    </svg>
  );
}
