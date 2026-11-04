const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. FRONT CARD SVG (1024 x 1440)
const frontSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1440" viewBox="0 0 1024 1440">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1022" />
      <stop offset="50%" stop-color="#070a16" />
      <stop offset="100%" stop-color="#03050c" />
    </linearGradient>

    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>

    <linearGradient id="goldChip" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="35%" stop-color="#eab308" />
      <stop offset="70%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#a16207" />
    </linearGradient>

    <linearGradient id="holoSticker" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.9" />
      <stop offset="70%" stop-color="#2563eb" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.9" />
    </linearGradient>

    <linearGradient id="photoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>

    <pattern id="cardGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.08" />
      <circle cx="20" cy="20" r="1" fill="#60a5fa" opacity="0.15" />
    </pattern>

    <pattern id="diagonalStripe" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="20" stroke="#ffffff" stroke-width="1.5" opacity="0.04" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1440" rx="36" fill="url(#cardBg)" />
  <rect width="1024" height="1440" rx="36" fill="url(#cardGrid)" />
  <rect width="1024" height="1440" rx="36" fill="url(#diagonalStripe)" />

  <!-- Outer Card Border -->
  <rect x="24" y="24" width="976" height="1392" rx="28" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.35" />
  <rect x="36" y="36" width="952" height="1368" rx="22" fill="none" stroke="#1e293b" stroke-width="1.5" />

  <!-- Clip Hole Reinforcement Guide -->
  <rect x="380" y="44" width="264" height="60" rx="24" fill="#030712" stroke="#475569" stroke-width="2" opacity="0.8" />
  <text x="512" y="80" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" fill="#64748b" font-weight="700" letter-spacing="4">SLOT REINFORCED // DEV-CLIP</text>

  <!-- Card Top Banner -->
  <g transform="translate(64, 140)">
    <rect x="0" y="0" width="896" height="84" rx="16" fill="#0d152a" stroke="#2563eb" stroke-width="1.5" opacity="0.9" />
    
    <!-- Left: Brand / Title -->
    <text x="28" y="38" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="800" fill="#f8fafc" letter-spacing="2">ALVARO • LABS</text>
    <text x="28" y="62" font-family="'JetBrains Mono', monospace" font-size="14" fill="#38bdf8" font-weight="600" letter-spacing="1">DEV IDENTIFICATION PASS 2026</text>

    <!-- Right: Verified status pill -->
    <rect x="704" y="22" width="164" height="40" rx="20" fill="#052e16" stroke="#22c55e" stroke-width="1.5" />
    <circle cx="724" cy="42" r="6" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <text x="740" y="48" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#4ade80" letter-spacing="1.5">VERIFIED</text>
  </g>

  <!-- Smart Chip & Hologram Section -->
  <g transform="translate(64, 252)">
    <!-- EMV Smart Chip -->
    <rect x="0" y="0" width="130" height="96" rx="14" fill="url(#goldChip)" stroke="#ca8a04" stroke-width="2" />
    <rect x="42" y="0" width="46" height="96" fill="none" stroke="#713f12" stroke-width="2" />
    <line x1="0" y1="48" x2="130" y2="48" stroke="#713f12" stroke-width="2" />
    <rect x="22" y="24" width="86" height="48" rx="6" fill="none" stroke="#713f12" stroke-width="2" />

    <!-- Security Hologram Tag -->
    <rect x="156" y="8" width="180" height="80" rx="12" fill="url(#holoSticker)" opacity="0.85" />
    <rect x="156" y="8" width="180" height="80" rx="12" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4" />
    <text x="246" y="44" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="3">SECURE</text>
    <text x="246" y="66" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffffff" opacity="0.9" letter-spacing="2">AUTHENTIC</text>

    <!-- Serial Number on the Right -->
    <text x="896" y="42" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#94a3b8">PASS ID: <tspan fill="#38bdf8">ARP-2026-994</tspan></text>
    <text x="896" y="70" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="500" fill="#64748b">CLEARANCE: LEVEL-4 FULLSTACK</text>
  </g>

  <!-- Profile Avatar Section -->
  <g transform="translate(64, 384)">
    <!-- Avatar Box Outer Container -->
    <rect x="0" y="0" width="340" height="420" rx="24" fill="#0d1424" stroke="url(#photoBorder)" stroke-width="3" />
    
    <!-- Stylish Geometric Developer Avatar Illustration -->
    <!-- Gradient background inside photo -->
    <defs>
      <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fcd34d" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
    </defs>
    
    <clipPath id="avatarClip">
      <rect x="4" y="4" width="332" height="412" rx="20" />
    </clipPath>

    <g clip-path="url(#avatarClip)">
      <rect x="4" y="4" width="332" height="412" fill="url(#avatarBg)" />
      
      <!-- Ambient Backlight -->
      <circle cx="170" cy="190" r="140" fill="#38bdf8" opacity="0.2" />

      <!-- Developer Silhouette / Avatar Vector -->
      <!-- Shoulders / Tech Hoodie -->
      <path d="M 40 420 Q 90 280 170 280 Q 250 280 300 420 Z" fill="url(#hoodieGrad)" />
      <path d="M 125 285 L 170 360 L 215 285 Z" fill="#0f172a" opacity="0.6" />
      <line x1="170" y1="360" x2="170" y2="420" stroke="#38bdf8" stroke-width="3" opacity="0.7" />

      <!-- Neck -->
      <rect x="146" y="240" width="48" height="55" rx="10" fill="#e2b17a" />
      
      <!-- Head / Face -->
      <ellipse cx="170" cy="200" rx="66" ry="78" fill="#f8c999" />
      
      <!-- Modern Haircut -->
      <path d="M 96 190 C 96 110 244 110 244 190 C 244 140 220 120 170 120 C 120 120 100 145 96 190 Z" fill="#18181b" />
      <path d="M 104 180 Q 170 140 236 170 Q 220 125 170 128 Q 120 130 104 180 Z" fill="#27272a" />

      <!-- Stylish Glasses -->
      <rect x="120" y="180" width="42" height="26" rx="8" fill="none" stroke="#38bdf8" stroke-width="4" />
      <rect x="178" y="180" width="42" height="26" rx="8" fill="none" stroke="#38bdf8" stroke-width="4" />
      <line x1="162" y1="192" x2="178" y2="192" stroke="#38bdf8" stroke-width="4" />
      <!-- Glasses shine reflection -->
      <line x1="126" y1="184" x2="140" y2="198" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
      <line x1="184" y1="184" x2="198" y2="198" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />

      <!-- Smile -->
      <path d="M 152 236 Q 170 250 188 236" fill="none" stroke="#9a3412" stroke-width="3" stroke-linecap="round" />

      <!-- Overlay HUD / Camera Bracket on Photo -->
      <path d="M 20 40 L 40 40 M 20 40 L 20 60" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" />
      <path d="M 320 40 L 300 40 M 320 40 L 320 60" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" />
      <path d="M 20 380 L 40 380 M 20 380 L 20 360" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" />
      <path d="M 320 380 L 300 380 M 320 380 L 320 360" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" />

      <text x="24" y="398" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#38bdf8" opacity="0.8">REC ● 60FPS</text>
    </g>

    <!-- Info Column Beside Photo -->
    <g transform="translate(376, 10)">
      <!-- Callout "ALVARO" -->
      <text x="0" y="60" font-family="'Space Grotesk', sans-serif" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="4">ALVARO</text>
      <text x="0" y="98" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#93c5fd" letter-spacing="1">RAKA PRATAMA</text>
      
      <!-- Role Badge -->
      <g transform="translate(0, 124)">
        <rect x="0" y="0" width="370" height="48" rx="12" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5" />
        <text x="185" y="32" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="800" fill="#60a5fa" letter-spacing="2">FULL STACK DEVELOPER</text>
      </g>

      <!-- Specifications Grid -->
      <g transform="translate(0, 204)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">ROLE DOMAIN</text>
        <text x="0" y="24" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="600" fill="#e2e8f0">Web Apps &amp; 3D Creative Tech</text>

        <text x="0" y="68" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">EXPERIENCE / CODE</text>
        <text x="0" y="92" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="600" fill="#e2e8f0">Senior Level • Modern Architecture</text>

        <text x="0" y="136" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">SECURITY BADGE</text>
        <text x="0" y="160" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#38bdf8">0x8B...D419 (VERIFIED)</text>
      </g>
    </g>
  </g>

  <!-- Divider Line -->
  <line x1="64" y1="840" x2="960" y2="840" stroke="#1e293b" stroke-width="2" />
  <line x1="64" y1="840" x2="360" y2="840" stroke="#38bdf8" stroke-width="2" />

  <!-- Tech Stack Badges Section -->
  <g transform="translate(64, 870)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#94a3b8" letter-spacing="2">ACTIVE CORE TECH STACK</text>
    
    <!-- Pills row 1 -->
    <g transform="translate(0, 20)">
      <rect x="0" y="0" width="134" height="42" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2" />
      <text x="67" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#38bdf8">⚛ REACT</text>

      <rect x="150" y="0" width="144" height="42" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />
      <text x="222" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#ffffff">▲ NEXT.JS</text>

      <rect x="310" y="0" width="170" height="42" rx="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.2" />
      <text x="395" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#60a5fa">📘 TYPESCRIPT</text>

      <rect x="496" y="0" width="170" height="42" rx="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.2" />
      <text x="581" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#22d3ee">🌊 TAILWIND</text>

      <rect x="682" y="0" width="144" height="42" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="1.2" />
      <text x="754" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#4ade80">🟢 NODE.JS</text>
    </g>

    <!-- Pills row 2 -->
    <g transform="translate(0, 76)">
      <rect x="0" y="0" width="154" height="42" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="1.2" />
      <text x="77" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#c084fc">🎲 THREE.JS</text>

      <rect x="170" y="0" width="168" height="42" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="1.2" />
      <text x="254" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#38bdf8">🐘 POSTGRESQL</text>

      <rect x="354" y="0" width="164" height="42" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="1.2" />
      <text x="436" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#fb7185">⚡ FAST API</text>

      <rect x="534" y="0" width="144" height="42" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2" />
      <text x="606" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#fbbf24">🐳 DOCKER</text>

      <rect x="694" y="0" width="154" height="42" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="1.2" />
      <text x="771" y="27" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="#818cf8">☁️ CLOUD</text>
    </g>
  </g>

  <!-- Bottom Scan Barcode & QR Code Section -->
  <g transform="translate(64, 1040)">
    <rect x="0" y="0" width="896" height="300" rx="20" fill="#080d1c" stroke="#1e293b" stroke-width="2" />

    <!-- Simulated QR Code -->
    <g transform="translate(36, 40)">
      <rect x="0" y="0" width="220" height="220" rx="12" fill="#ffffff" />
      <!-- QR corner locators -->
      <rect x="14" y="14" width="60" height="60" fill="#000000" />
      <rect x="24" y="24" width="40" height="40" fill="#ffffff" />
      <rect x="32" y="32" width="24" height="24" fill="#000000" />

      <rect x="146" y="14" width="60" height="60" fill="#000000" />
      <rect x="156" y="24" width="40" height="40" fill="#ffffff" />
      <rect x="164" y="32" width="24" height="24" fill="#000000" />

      <rect x="14" y="146" width="60" height="60" fill="#000000" />
      <rect x="24" y="156" width="40" height="40" fill="#ffffff" />
      <rect x="32" y="164" width="24" height="24" fill="#000000" />

      <!-- QR center pattern blocks -->
      <rect x="90" y="20" width="36" height="18" fill="#000000" />
      <rect x="84" y="48" width="18" height="36" fill="#000000" />
      <rect x="112" y="60" width="24" height="24" fill="#000000" />
      <rect x="84" y="94" width="52" height="18" fill="#000000" />
      <rect x="146" y="94" width="24" height="40" fill="#000000" />
      <rect x="180" y="110" width="24" height="24" fill="#000000" />
      <rect x="20" y="94" width="48" height="18" fill="#000000" />
      <rect x="90" y="130" width="36" height="36" fill="#000000" />
      <rect x="140" y="150" width="40" height="20" fill="#000000" />
      <rect x="100" y="180" width="30" height="26" fill="#000000" />
      <rect x="140" y="180" width="60" height="26" fill="#000000" />
    </g>

    <!-- Barcode and Signature beside QR -->
    <g transform="translate(290, 44)">
      <!-- Authentic Barcode Lines -->
      <g fill="#f8fafc">
        <rect x="0" y="0" width="4" height="100" />
        <rect x="8" y="0" width="8" height="100" />
        <rect x="22" y="0" width="4" height="100" />
        <rect x="32" y="0" width="12" height="100" />
        <rect x="52" y="0" width="6" height="100" />
        <rect x="64" y="0" width="4" height="100" />
        <rect x="74" y="0" width="10" height="100" />
        <rect x="90" y="0" width="4" height="100" />
        <rect x="102" y="0" width="8" height="100" />
        <rect x="116" y="0" width="12" height="100" />
        <rect x="134" y="0" width="4" height="100" />
        <rect x="144" y="0" width="8" height="100" />
        <rect x="160" y="0" width="6" height="100" />
        <rect x="174" y="0" width="10" height="100" />
        <rect x="190" y="0" width="4" height="100" />
        <rect x="202" y="0" width="12" height="100" />
        <rect x="222" y="0" width="6" height="100" />
        <rect x="234" y="0" width="4" height="100" />
        <rect x="246" y="0" width="8" height="100" />
        <rect x="260" y="0" width="14" height="100" />
        <rect x="282" y="0" width="4" height="100" />
        <rect x="294" y="0" width="10" height="100" />
        <rect x="312" y="0" width="6" height="100" />
        <rect x="326" y="0" width="4" height="100" />
        <rect x="338" y="0" width="12" height="100" />
        <rect x="358" y="0" width="4" height="100" />
        <rect x="370" y="0" width="8" height="100" />
        <rect x="386" y="0" width="10" height="100" />
        <rect x="404" y="0" width="6" height="100" />
        <rect x="418" y="0" width="4" height="100" />
        <rect x="428" y="0" width="12" height="100" />
        <rect x="448" y="0" width="8" height="100" />
        <rect x="464" y="0" width="4" height="100" />
        <rect x="476" y="0" width="10" height="100" />
        <rect x="494" y="0" width="6" height="100" />
        <rect x="508" y="0" width="4" height="100" />
        <rect x="520" y="0" width="12" height="100" />
        <rect x="540" y="0" width="8" height="100" />
        <rect x="556" y="0" width="4" height="100" />
      </g>
      
      <!-- Barcode numbers -->
      <text x="280" y="128" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" fill="#94a3b8" letter-spacing="8">8 902819 048201 2026</text>

      <!-- Signature line -->
      <g transform="translate(0, 160)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#64748b" letter-spacing="1.5">HOLDER SIGNATURE</text>
        <path d="M 0 35 C 30 15, 60 50, 90 20 C 120 -5, 140 40, 180 25 C 220 10, 260 30, 310 20" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
        <text x="360" y="32" font-family="'Space Grotesk', sans-serif" font-size="16" font-style="italic" fill="#93c5fd">Alvaro R.P.</text>
        <line x1="0" y1="46" x2="550" y2="46" stroke="#334155" stroke-width="1.2" />
      </g>
    </g>
  </g>

  <!-- Bottom micro-footer -->
  <text x="512" y="1390" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#475569" letter-spacing="3">DEV ID PASS • AUTONOMOUS WEB SYSTEMS • WORLDWIDE VALID</text>
</svg>
`;

// 2. BACK CARD SVG (1024 x 1440)
const backSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1440" viewBox="0 0 1024 1440">
  <defs>
    <linearGradient id="backBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1c" />
      <stop offset="50%" stop-color="#060913" />
      <stop offset="100%" stop-color="#020409" />
    </linearGradient>

    <linearGradient id="magStripe" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="50%" stop-color="#27272a" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>

    <pattern id="backGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e293b" stroke-width="0.8" opacity="0.3" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1440" rx="36" fill="url(#backBg)" />
  <rect width="1024" height="1440" rx="36" fill="url(#backGrid)" />

  <!-- Outer Card Border -->
  <rect x="24" y="24" width="976" height="1392" rx="28" fill="none" stroke="#334155" stroke-width="2" opacity="0.4" />

  <!-- Magnetic Stripe -->
  <rect x="0" y="130" width="1024" height="150" fill="url(#magStripe)" />
  <line x1="0" y1="130" x2="1024" y2="130" stroke="#000000" stroke-width="2" />
  <line x1="0" y1="280" x2="1024" y2="280" stroke="#000000" stroke-width="2" />
  <text x="512" y="210" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="15" fill="#52525b" letter-spacing="6">MAGNETIC STRIPE // ALVARO.DEV SECURE DATA TRACK</text>

  <!-- Technical Spec & Terms Body -->
  <g transform="translate(72, 330)">
    <!-- Header -->
    <text x="0" y="0" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="800" fill="#f8fafc" letter-spacing="1">FULL STACK DEVELOPER CREDENTIALS</text>
    <text x="0" y="30" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#38bdf8" letter-spacing="2">ISSUED TO: ALVARO RAKA PRATAMA</text>
    
    <line x1="0" y1="52" x2="880" y2="52" stroke="#1e293b" stroke-width="1.5" />

    <!-- Spec box -->
    <g transform="translate(0, 80)">
      <rect x="0" y="0" width="880" height="380" rx="16" fill="#0d1424" stroke="#1e293b" stroke-width="1.5" />
      
      <!-- Section 1 -->
      <g transform="translate(32, 40)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#60a5fa" letter-spacing="1">01. FRONTEND ENGINEERING</text>
        <text x="0" y="28" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#cbd5e1" font-weight="400">Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Three.js WebGL</text>
        <text x="0" y="52" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#64748b">Responsive Web Apps, Component Architecture, Micro-Interactions &amp; 3D Visuals</text>
      </g>

      <!-- Section 2 -->
      <g transform="translate(32, 140)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#38bdf8" letter-spacing="1">02. BACKEND &amp; CLOUD INFRASTRUCTURE</text>
        <text x="0" y="28" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#cbd5e1" font-weight="400">Node.js, Express, PostgreSQL, RESTful APIs, GraphQL, Docker, Vercel</text>
        <text x="0" y="52" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#64748b">Secure Authentication, Database Optimization, CI/CD Pipeline Automation</text>
      </g>

      <!-- Section 3 -->
      <g transform="translate(32, 240)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#4ade80" letter-spacing="1">03. STANDARDS &amp; PHILOSOPHY</text>
        <text x="0" y="28" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#cbd5e1" font-weight="400">Clean Code, Performance Optimization, Accessibility &amp; Pixel-Perfect Execution</text>
        <text x="0" y="52" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#64748b">Bridging engineering rigor with sophisticated minimalist visual aesthetics</text>
      </g>
    </g>

    <!-- Terms and Conditions -->
    <g transform="translate(0, 500)">
      <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#94a3b8" letter-spacing="1">NOTICE &amp; DISCLAIMER</text>
      <text x="0" y="26" font-family="'Space Grotesk', sans-serif" font-size="14" fill="#64748b" width="880">
        This identity pass certifies that the holder is authorized to engineer, deploy, and maintain mission-critical full stack digital products. If discovered, please return to repository maintainer or contact online.
      </text>
    </g>

    <!-- Digital Fingerprint Hash -->
    <g transform="translate(0, 600)">
      <rect x="0" y="0" width="880" height="84" rx="12" fill="#080c18" stroke="#1e293b" stroke-width="1.2" />
      <text x="24" y="32" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">SHA-256 SYSTEM INTEGRITY DIGEST</text>
      <text x="24" y="58" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#38bdf8" letter-spacing="1.5">7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</text>
    </g>

    <!-- Contact Details & Social Handles -->
    <g transform="translate(0, 720)">
      <rect x="0" y="0" width="880" height="200" rx="16" fill="#0b1022" stroke="#2563eb" stroke-width="1.2" opacity="0.9" />
      
      <g transform="translate(36, 40)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">GITHUB</text>
        <text x="0" y="24" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#ffffff">github.com/alvaroraka</text>

        <text x="0" y="68" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">PORTFOLIO</text>
        <text x="0" y="92" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#38bdf8">alvaro.dev • alfari.my.id</text>
      </g>

      <g transform="translate(480, 40)">
        <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">LINKEDIN</text>
        <text x="0" y="24" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#ffffff">linkedin.com/in/alvaroraka</text>

        <text x="0" y="68" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">DIRECT CONTACT</text>
        <text x="0" y="92" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#38bdf8">alvaro.pratama@developer.me</text>
      </g>
    </g>

    <!-- Security hologram rosette -->
    <g transform="translate(440, 990)">
      <circle cx="0" cy="0" r="44" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
      <circle cx="0" cy="0" r="36" fill="none" stroke="#2563eb" stroke-width="1" stroke-dasharray="4,4" />
      <polygon points="0,-26 8,-8 26,-8 12,4 18,22 0,10 -18,22 -12,4 -26,-8 -8,-8" fill="#38bdf8" />
    </g>

    <text x="440" y="1060" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#64748b" letter-spacing="3">OFFICIAL DIGITAL SECURITY SEAL</text>
  </g>
</svg>
`;

// 3. STRAP SVG (512 x 128)
const strapSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="128" viewBox="0 0 512 128">
  <defs>
    <linearGradient id="strapBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c1122" />
      <stop offset="50%" stop-color="#060914" />
      <stop offset="100%" stop-color="#03050a" />
    </linearGradient>
  </defs>

  <rect width="512" height="128" fill="url(#strapBg)" />

  <!-- Top and Bottom accent borders -->
  <line x1="0" y1="8" x2="512" y2="8" stroke="#38bdf8" stroke-width="4" opacity="0.8" />
  <line x1="0" y1="18" x2="512" y2="18" stroke="#2563eb" stroke-width="2" opacity="0.5" />
  
  <line x1="0" y1="120" x2="512" y2="120" stroke="#38bdf8" stroke-width="4" opacity="0.8" />
  <line x1="0" y1="110" x2="512" y2="110" stroke="#2563eb" stroke-width="2" opacity="0.5" />

  <!-- Repeating Brand text -->
  <text x="256" y="74" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="4">
    ★ ALVARO <tspan fill="#38bdf8">•</tspan> FULL STACK DEV <tspan fill="#38bdf8">★</tspan>
  </text>
</svg>
`;

async function main() {
  console.log('Rendering ID Card Front (PNG)...');
  await sharp(Buffer.from(frontSvg))
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'card-front.png'));

  console.log('Rendering ID Card Back (PNG)...');
  await sharp(Buffer.from(backSvg))
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'card-back.png'));

  // NOTE: Never overwrite band.png/band.svg as user has their own custom strap asset!

  // Also save the SVGs for front and back cards
  fs.writeFileSync(path.join(publicDir, 'card-front.svg'), frontSvg);
  fs.writeFileSync(path.join(publicDir, 'card-back.svg'), backSvg);

  console.log('ID card front & back assets generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

