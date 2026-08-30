import type { Design, Product, Collection, BlogPost, ProductType, ProductColor } from "./types";

// --- Premium product mockups matching the dark-bg gold-lion photography style ---
// All product images use a consistent dark charcoal background with gold geometric lion
// Hero image uses a man wearing the branded t-shirt

const GOLD = "#c9a96e";
const DARK_BG = "#1e1e1e";
const DARK_BG2 = "#252525";

// Geometric lion head SVG (simplified polygon art matching the user's gold lion)
const lionHead = `
  <g transform="translate(250,240) scale(0.55)">
    <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2"/>
    <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <circle cx="-12" cy="-25" r="3" fill="${GOLD}"/>
    <circle cx="12" cy="-25" r="3" fill="${GOLD}"/>
    <polygon points="-8,-8 0,-5 8,-8 5,-2 -5,-2" fill="none" stroke="${GOLD}" stroke-width="1.2"/>
    <line x1="-35" y1="30" x2="-60" y2="25" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>
    <line x1="35" y1="30" x2="60" y2="25" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>
  </g>`;

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}

// ── Hero: Man wearing branded t-shirt ──
function heroManImage(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <radialGradient id="hg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#111111"/>
        </radialGradient>
        <radialGradient id="hl" cx="40%" cy="30%" r="40%">
          <stop offset="0%" stop-color="#3a3a3a" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#hg)"/>
      <rect width="800" height="1000" fill="url(#hl)"/>
      <!-- Floor shadow -->
      <ellipse cx="400" cy="920" rx="200" ry="30" fill="#000" opacity="0.3"/>
      <!-- Man silhouette body -->
      <g transform="translate(400,0)">
        <!-- Legs -->
        <rect x="-45" y="720" width="35" height="180" rx="8" fill="#1a1a1a"/>
        <rect x="10" y="720" width="35" height="180" rx="8" fill="#1a1a1a"/>
        <!-- Shoes -->
        <rect x="-50" y="880" width="42" height="18" rx="6" fill="#111"/>
        <rect x="8" y="880" width="42" height="18" rx="6" fill="#111"/>
        <!-- Torso / T-shirt -->
        <path d="M-80,340 C-80,340 -100,380 -100,450 L-100,720 L100,720 L100,450 C100,380 80,340 80,340 Z" fill="#1a1a1a"/>
        <!-- Neckline -->
        <path d="M-25,330 C-25,350 25,350 25,330" fill="none" stroke="#222" stroke-width="2"/>
        <!-- Arms -->
        <path d="M-80,340 C-110,360 -125,430 -120,520 L-105,520 C-105,440 -90,380 -75,355" fill="#1a1a1a"/>
        <path d="M80,340 C110,360 120,430 115,520 L100,520 C100,440 90,380 75,355" fill="#1a1a1a"/>
        <!-- Hands -->
        <ellipse cx="-112" cy="525" rx="12" ry="15" fill="#8B7355"/>
        <ellipse cx="107" cy="525" rx="12" ry="15" fill="#8B7355"/>
        <!-- Head -->
        <ellipse cx="0" cy="290" rx="42" ry="50" fill="#8B7355"/>
        <!-- Hair -->
        <path d="M-42,275 C-45,240 -30,225 0,222 C30,225 45,240 42,275 C40,260 25,248 0,246 C-25,248 -40,260 -42,275Z" fill="#1a1210"/>
        <!-- Eyes -->
        <ellipse cx="-14" cy="290" rx="4" ry="3" fill="#1a1210"/>
        <ellipse cx="14" cy="290" rx="4" ry="3" fill="#1a1210"/>
        <!-- Nose -->
        <path d="M-3,298 L0,305 L3,298" fill="none" stroke="#7a6545" stroke-width="1.2"/>
        <!-- Mouth -->
        <path d="M-8,312 Q0,318 8,312" fill="none" stroke="#7a6545" stroke-width="1"/>
        <!-- T-shirt: Gold lion logo on chest -->
        <g transform="translate(0,440) scale(0.32)">
          <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
          <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
          <circle cx="-12" cy="-25" r="3.5" fill="${GOLD}"/>
          <circle cx="12" cy="-25" r="3.5" fill="${GOLD}"/>
        </g>
      </g>
    </svg>`);
}

// ── Product mockup SVGs ──
function tshirtMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="tg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#tg)"/>
      <!-- T-shirt shape (folded, flat-lay style) -->
      <path d="M170,140 L130,170 L90,300 L160,300 L160,500 L440,500 L440,300 L510,300 L470,170 L430,140 L370,160 C340,180 260,180 230,160Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Collar -->
      <path d="M230,160 C250,175 280,180 300,180 C320,180 350,175 370,160" fill="none" stroke="#252525" stroke-width="2"/>
      <!-- Fold lines -->
      <line x1="160" y1="300" x2="440" y2="300" stroke="#222" stroke-width="0.8" opacity="0.5"/>
      <!-- Lion logo on chest -->
      <g transform="translate(300,310) scale(0.3)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <circle cx="-12" cy="-25" r="3.5" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="3.5" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function hoodieMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="hg2" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#hg2)"/>
      <!-- Hoodie body -->
      <path d="M200,120 L140,170 L80,320 L150,320 L150,520 L450,520 L450,320 L520,320 L460,170 L400,120Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Hood -->
      <path d="M200,120 C200,80 230,50 300,45 C370,50 400,80 400,120 L380,130 C370,100 340,80 300,78 C260,80 230,100 220,130Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Drawstrings -->
      <line x1="275" y1="130" x2="268" y2="200" stroke="#252525" stroke-width="1.5"/>
      <line x1="325" y1="130" x2="332" y2="200" stroke="#252525" stroke-width="1.5"/>
      <!-- Kangaroo pocket -->
      <rect x="220" y="350" width="160" height="80" rx="8" fill="#1e1e1e" stroke="#222" stroke-width="0.8"/>
      <!-- Lion logo -->
      <g transform="translate(300,280) scale(0.28)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <circle cx="-12" cy="-25" r="3.5" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="3.5" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function mugMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="mg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#mg)"/>
      <!-- Mug body -->
      <rect x="170" y="180" width="200" height="260" rx="10" fill="#1a1a1a" stroke="#252525" stroke-width="1.5"/>
      <!-- Mug rim -->
      <ellipse cx="270" cy="180" rx="100" ry="18" fill="#1e1e1e" stroke="#252525" stroke-width="1"/>
      <ellipse cx="270" cy="180" rx="85" ry="13" fill="#141414"/>
      <!-- Handle -->
      <path d="M370,240 C420,240 430,330 370,340" fill="none" stroke="#252525" stroke-width="8" stroke-linecap="round"/>
      <!-- Lion logo -->
      <g transform="translate(270,310) scale(0.2)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <circle cx="-12" cy="-25" r="4" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="4" fill="${GOLD}"/>
      </g>
      <!-- Surface reflection -->
      <rect x="170" y="440" width="200" height="4" rx="2" fill="#000" opacity="0.2"/>
    </svg>`);
}

function phoneCaseMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="pg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#pg)"/>
      <!-- Phone case -->
      <rect x="195" y="80" width="210" height="440" rx="28" fill="#1a1a1a" stroke="#252525" stroke-width="2"/>
      <!-- Screen area -->
      <rect x="210" y="100" width="180" height="390" rx="18" fill="#111"/>
      <!-- Camera bump -->
      <rect x="208" y="95" width="80" height="80" rx="16" fill="#1e1e1e" stroke="#252525" stroke-width="1"/>
      <circle cx="238" cy="125" r="12" fill="#111" stroke="#333" stroke-width="1.5"/>
      <circle cx="238" cy="125" r="6" fill="#1a1a1a"/>
      <circle cx="270" cy="125" r="8" fill="#111" stroke="#333" stroke-width="1"/>
      <circle cx="238" cy="155" r="5" fill="#222"/>
      <!-- Lion logo on back -->
      <g transform="translate(300,340) scale(0.22)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <circle cx="-12" cy="-25" r="4" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="4" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function posterMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e8ddd0"/><stop offset="100%" stop-color="#d4c8b8"/>
        </linearGradient>
      </defs>
      <!-- Wall -->
      <rect width="600" height="600" fill="url(#wg)"/>
      <!-- Shadow on wall -->
      <rect x="148" y="62" width="306" height="428" rx="2" fill="#000" opacity="0.08"/>
      <!-- Frame -->
      <rect x="140" y="55" width="310" height="435" rx="3" fill="#b8a88a" stroke="#a09070" stroke-width="1"/>
      <!-- Mat -->
      <rect x="155" y="70" width="280" height="405" fill="#f5f0ea"/>
      <!-- Poster print area -->
      <rect x="170" y="85" width="250" height="375" fill="#0a0a0a"/>
      <!-- Lion logo on poster -->
      <g transform="translate(295,270) scale(0.38)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
        <circle cx="-12" cy="-25" r="3.5" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="3.5" fill="${GOLD}"/>
      </g>
      <!-- Hanging wire -->
      <path d="M250,55 Q295,35 340,55" fill="none" stroke="#999" stroke-width="1"/>
      <!-- Table/shelf below -->
      <rect x="80" y="510" width="440" height="8" rx="2" fill="#b8a88a"/>
      <!-- Plant on shelf -->
      <rect x="130" y="490" width="25" height="20" rx="3" fill="#c4b8a0"/>
      <circle cx="142" cy="480" r="18" fill="#6b8a5e" opacity="0.7"/>
    </svg>`);
}

function toteMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#f0ebe4"/>
      <!-- Tote bag -->
      <path d="M180,200 L180,480 L420,480 L420,200Z" fill="#e8dcc8" stroke="#d4c8b0" stroke-width="1.5"/>
      <!-- Handles -->
      <path d="M240,200 C240,140 260,120 300,115 C340,120 360,140 360,200" fill="none" stroke="#d4c8b0" stroke-width="4" stroke-linecap="round"/>
      <!-- Stitching -->
      <line x1="180" y1="220" x2="420" y2="220" stroke="#d4c8b0" stroke-width="0.8" stroke-dasharray="4 3"/>
      <!-- Lion logo (black version for light background) -->
      <g transform="translate(300,350) scale(0.3)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="#222" stroke-width="2.5"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="#222" stroke-width="2"/>
      </g>
    </svg>`);
}

function capMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#cg)"/>
      <!-- Cap crown -->
      <path d="M180,330 C180,240 220,190 300,180 C380,190 420,240 420,330Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Cap brim -->
      <path d="M170,330 C160,335 150,350 170,365 L430,365 C450,350 440,335 430,330Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Brim stitching -->
      <path d="M185,348 Q300,370 415,348" fill="none" stroke="#252525" stroke-width="0.8"/>
      <!-- Top button -->
      <circle cx="300" cy="180" r="4" fill="#222"/>
      <!-- Panels -->
      <line x1="300" y1="180" x2="300" y2="330" stroke="#222" stroke-width="0.5" opacity="0.3"/>
      <!-- Lion logo (small, embroidered style) -->
      <g transform="translate(300,280) scale(0.14)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="4"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="75,10 85,30 70,50 55,35" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="70,50 55,65 35,70 25,55" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <circle cx="-12" cy="-25" r="5" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="5" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function cushionMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="cug" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#cug)"/>
      <!-- Cushion shape -->
      <rect x="140" y="160" width="320" height="300" rx="20" fill="#1a1a1a" stroke="#222" stroke-width="1.5"/>
      <!-- Fabric texture lines -->
      <path d="M145,175 Q300,165 455,175" fill="none" stroke="#222" stroke-width="0.8"/>
      <path d="M145,445 Q300,455 455,445" fill="none" stroke="#222" stroke-width="0.8"/>
      <!-- Corner tufting -->
      <circle cx="165" cy="185" r="3" fill="#222"/>
      <circle cx="435" cy="185" r="3" fill="#222"/>
      <circle cx="165" cy="415" r="3" fill="#222"/>
      <circle cx="435" cy="415" r="3" fill="#222"/>
      <!-- Lion logo -->
      <g transform="translate(300,310) scale(0.28)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55 -35,40 -55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="70,50 55,65 35,70 25,55 35,40 55,35" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="-15,-30 -40,-35 -30,-20 -15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <polygon points="15,-30 40,-35 30,-20 15,-10 0,-20" fill="none" stroke="${GOLD}" stroke-width="2"/>
        <circle cx="-12" cy="-25" r="3.5" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="3.5" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function sweatshirtMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <linearGradient id="swg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e8ddd0"/><stop offset="100%" stop-color="#d8ccb8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#swg)"/>
      <!-- Sweatshirt body -->
      <path d="M200,130 L140,180 L90,320 L160,320 L160,500 L440,500 L440,320 L510,320 L460,180 L400,130Z" fill="#d4c4a8" stroke="#c4b498" stroke-width="1"/>
      <!-- Crew neck -->
      <path d="M230,130 C250,145 280,150 300,150 C320,150 350,145 370,130" fill="none" stroke="#c4b498" stroke-width="2"/>
      <!-- Ribbed collar -->
      <path d="M225,133 C250,150 280,155 300,155 C320,155 350,150 375,133" fill="#d4c4a8" stroke="#c4b498" stroke-width="1"/>
      <!-- Small gold arc design (like the sunset sweatshirt) -->
      <path d="M260,310 Q300,280 340,310" fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="255" y1="315" x2="345" y2="315" stroke="${GOLD}" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="300" cy="325" r="3" fill="${GOLD}"/>
      <!-- Ribbed cuffs/hem -->
      <line x1="160" y1="490" x2="440" y2="490" stroke="#c4b498" stroke-width="1.5"/>
    </svg>`);
}

function notebookMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#ng)"/>
      <!-- Notebook body -->
      <rect x="170" y="100" width="250" height="380" rx="4" fill="#1a1a1a" stroke="#252525" stroke-width="1.5"/>
      <!-- Spine -->
      <line x1="190" y1="100" x2="190" y2="480" stroke="#252525" stroke-width="1.5"/>
      <!-- Pages edge -->
      <rect x="185" y="105" width="3" height="370" fill="#e8e0d4" opacity="0.3"/>
      <!-- Lion logo -->
      <g transform="translate(310,280) scale(0.2)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="75,10 85,30 70,50 55,35 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="70,50 55,65 35,70 25,55" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <circle cx="-12" cy="-25" r="4" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="4" fill="${GOLD}"/>
      </g>
      <!-- Ribbon bookmark -->
      <line x1="350" y1="100" x2="350" y2="130" stroke="${GOLD}" stroke-width="2"/>
    </svg>`);
}

function stickerMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#f5f5f0"/>
      <!-- Sticker circle -->
      <circle cx="300" cy="300" r="180" fill="#fff" stroke="#ddd" stroke-width="1"/>
      <!-- Die-cut border -->
      <circle cx="300" cy="300" r="170" fill="none" stroke="#eee" stroke-width="0.5" stroke-dasharray="4 3"/>
      <!-- Lion logo -->
      <g transform="translate(300,290) scale(0.32)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="#222" stroke-width="2"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10 -45,-15" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10 45,-15" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="75,10 85,30 70,50 55,35" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="-70,50 -55,65 -35,70 -25,55" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="70,50 55,65 35,70 25,55" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="-35,40 -15,50 0,55 15,50 35,40 25,30 15,35 0,38 -15,35 -25,30" fill="none" stroke="#222" stroke-width="1.5"/>
        <polygon points="0,-80 0,-45 -15,-30 0,-20 15,-30 0,-45" fill="none" stroke="#222" stroke-width="1.5"/>
        <circle cx="-12" cy="-25" r="3" fill="#222"/>
        <circle cx="12" cy="-25" r="3" fill="#222"/>
      </g>
    </svg>`);
}

function kidsTshirtMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="kg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#111"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#kg)"/>
      <!-- Kids t-shirt (smaller proportions) -->
      <path d="M210,160 L170,190 L140,300 L195,300 L195,470 L405,470 L405,300 L460,300 L430,190 L390,160 L350,175 C330,188 270,188 250,175Z" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
      <!-- Collar -->
      <path d="M250,175 C265,185 285,188 300,188 C315,188 335,185 350,175" fill="none" stroke="#252525" stroke-width="1.5"/>
      <!-- Lion logo (smaller) -->
      <g transform="translate(300,310) scale(0.22)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="${GOLD}" stroke-width="3"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="-75,10 -85,30 -70,50 -55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <polygon points="75,10 85,30 70,50 55,35" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
        <circle cx="-12" cy="-25" r="4" fill="${GOLD}"/>
        <circle cx="12" cy="-25" r="4" fill="${GOLD}"/>
      </g>
    </svg>`);
}

function onesieMockup(): string {
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#f0ebe4"/>
      <!-- Onesie shape -->
      <path d="M240,120 L220,145 L190,280 L210,280 L200,440 L400,440 L390,280 L410,280 L380,145 L360,120Z" fill="#e8e0d4" stroke="#d4c8b0" stroke-width="1.5"/>
      <!-- Neckline -->
      <path d="M255,120 C270,135 290,140 300,140 C310,140 330,135 345,120" fill="none" stroke="#d4c8b0" stroke-width="1.5"/>
      <!-- Snap buttons -->
      <circle cx="275" cy="420" r="4" fill="#d4c8b0"/>
      <circle cx="300" cy="420" r="4" fill="#d4c8b0"/>
      <circle cx="325" cy="420" r="4" fill="#d4c8b0"/>
      <!-- Lion logo -->
      <g transform="translate(300,290) scale(0.18)">
        <polygon points="0,-80 -15,-65 -30,-55 -40,-35 -45,-15 -40,5 -35,20 -25,30 -15,35 0,38 15,35 25,30 35,20 40,5 45,-15 40,-35 30,-55 15,-65" fill="none" stroke="#999" stroke-width="3"/>
        <polygon points="-30,-55 -50,-45 -65,-25 -55,-10" fill="none" stroke="#999" stroke-width="2.5"/>
        <polygon points="30,-55 50,-45 65,-25 55,-10" fill="none" stroke="#999" stroke-width="2.5"/>
        <polygon points="-65,-25 -80,-10 -75,10 -55,-10" fill="none" stroke="#999" stroke-width="2.5"/>
        <polygon points="65,-25 80,-10 75,10 55,-10" fill="none" stroke="#999" stroke-width="2.5"/>
        <circle cx="-12" cy="-25" r="4" fill="#999"/>
        <circle cx="12" cy="-25" r="4" fill="#999"/>
      </g>
    </svg>`);
}

// ── Product mockup dispatcher ──
function productSvgDataUri(type: string, _designName: string): string {
  const mockups: Record<string, () => string> = {
    "t-shirt": tshirtMockup,
    "hoodie": hoodieMockup,
    "sweatshirt": sweatshirtMockup,
    "tote-bag": toteMockup,
    "mug": mugMockup,
    "phone-case": phoneCaseMockup,
    "cap": capMockup,
    "poster": posterMockup,
    "sticker": stickerMockup,
    "notebook": notebookMockup,
    "cushion": cushionMockup,
    "kids-t-shirt": kidsTshirtMockup,
    "baby-onesie": onesieMockup,
  };
  return (mockups[type] || tshirtMockup)();
}

// ── Design images ──
const designImages: Record<string, string> = {
  "midnight-lion": "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=800&fit=crop&crop=center",
  "neon-tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=800&fit=crop&crop=center",
  "desert-rose": "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=800&fit=crop&crop=center",
  "concrete-jungle": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop&crop=center",
  "ocean-drift": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=800&fit=crop&crop=center",
  "wild-geometry": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=800&fit=crop&crop=center",
  "solar-flare": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&crop=center",
  "shadow-botanical": "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=800&fit=crop&crop=center",
  "nordic-lines": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&crop=center",
  "after-dark": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop&crop=center",
  "modern-heritage": "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=800&fit=crop&crop=center",
  "sunday-studio": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop&crop=center",
};

const collectionImages: Record<string, string> = {
  "essentials": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=600&fit=crop&crop=center",
  "new-drops": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
  "minimal": "https://images.unsplash.com/photo-1493655185874-a03e77f7bf73?w=1200&h=600&fit=crop&crop=center",
  "street-culture": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=600&fit=crop&crop=center",
  "design-stories": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop&crop=center",
  "best-sellers": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
};

const blogImages: Record<string, string> = {
  "design-identity": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=600&fit=crop&crop=center",
  "design-process": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop&crop=center",
  "minimal-wardrobe": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
  "hoodie-styling": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
  "t-shirt-fit": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop&crop=center",
  "print-quality": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop&crop=center",
  "t-shirt-vs-sweatshirt": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=600&fit=crop&crop=center",
  "apparel-care": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop&crop=center",
  "gift-ideas": "https://images.unsplash.com/photo-1549465220-1a8b9238f4d1?w=1200&h=600&fit=crop&crop=center",
  "minimal-fashion": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop&crop=center",
  "organic-cotton": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=600&fit=crop&crop=center",
  "minimalist-gift": "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&h=600&fit=crop&crop=center",
};

// ── Exported placeholder functions ──
export function designPlaceholder(name: string, _hue: number = 0): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return designImages[slug] || `https://picsum.photos/seed/${slug}/800/800`;
}

export function productPlaceholder(type: string, designName: string): string {
  return productSvgDataUri(type, designName);
}

export function collectionPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return collectionImages[slug] || `https://picsum.photos/seed/col-${slug}/1200/600`;
}

export function blogPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return blogImages[slug] || `https://picsum.photos/seed/blog-${slug}/1200/600`;
}

// Hero image export (man in branded t-shirt)
export const heroLifestyleImage = heroManImage();

// --- Color palettes ---
const tshirtColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
  { name: "Charcoal", hex: "#333333", available: true },
  { name: "Sand", hex: "#c2b280", available: true },
  { name: "Olive", hex: "#556b2f", available: true },
];

const hoodieColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Charcoal", hex: "#333333", available: true },
  { name: "Navy", hex: "#1a1a3e", available: true },
];

const mugColors: ProductColor[] = [
  { name: "White", hex: "#f5f5f0", available: true },
  { name: "Black", hex: "#111111", available: true },
];

const toteColors: ProductColor[] = [
  { name: "Natural", hex: "#e8dcc8", available: true },
  { name: "Black", hex: "#111111", available: true },
];

const phoneCaseColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Clear", hex: "#e0e0e0", available: true },
];

const posterColors: ProductColor[] = [
  { name: "Standard", hex: "#111111", available: true },
];

const capColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Navy", hex: "#1a1a3e", available: true },
  { name: "Khaki", hex: "#bfb48f", available: true },
];

const sweatshirtColors: ProductColor[] = [
  { name: "Sand", hex: "#d4c4a8", available: true },
  { name: "Bone", hex: "#e8e0d4", available: true },
  { name: "Light Grey", hex: "#c8c8c8", available: true },
];

const kidsColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
];

const babyColors: ProductColor[] = [
  { name: "Natural", hex: "#e8e0d4", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
];

function productColors(type: ProductType): ProductColor[] {
  switch (type) {
    case "t-shirt":
      return tshirtColors;
    case "hoodie":
      return hoodieColors;
    case "sweatshirt":
      return sweatshirtColors;
    case "tote-bag":
      return toteColors;
    case "mug":
      return mugColors;
    case "phone-case":
      return phoneCaseColors;
    case "cap":
      return capColors;
    case "poster":
      return posterColors;
    case "kids-t-shirt":
      return kidsColors;
    case "baby-onesie":
      return babyColors;
    default:
      return tshirtColors;
  }
}

function productSizes(type: ProductType): string[] | undefined {
  switch (type) {
    case "t-shirt":
    case "hoodie":
    case "sweatshirt":
    case "kids-t-shirt":
      return ["XS", "S", "M", "L", "XL", "XXL"];
    case "baby-onesie":
      return ["0-3M", "3-6M", "6-12M", "12-18M"];
    case "mug":
    case "tote-bag":
    case "sticker":
      return undefined;
    case "phone-case":
      return ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "Samsung S24", "Samsung S23"];
    case "cap":
      return ["One Size"];
    default:
      return undefined;
  }
}

function productDetails(type: ProductType): string[] {
  const common = ["Premium quality", "Designed in Europe", "Printed to order"];
  switch (type) {
    case "t-shirt":
      return [...common, "100% organic cotton", "180 GSM fabric", "Pre-shrunk", "Side-seamed construction"];
    case "hoodie":
      return [...common, "80% cotton, 20% polyester", "320 GSM fleece", "Kangaroo pocket", "Ribbed cuffs and hem"];
    case "sweatshirt":
      return [...common, "80% cotton, 20% polyester", "300 GSM fleece", "Crew neck", "Ribbed collar"];
    case "tote-bag":
      return [...common, "100% organic cotton canvas", "12oz weight", "Reinforced handles", "Interior pocket"];
    case "mug":
      return [...common, "Ceramic", "11oz capacity", "Dishwasher safe", "Microwave safe"];
    case "phone-case":
      return [...common, "Polycarbonate shell", "Slim profile", "Wireless charging compatible", "Raised edges for screen protection"];
    case "cap":
      return [...common, "Structured front panel", "Adjustable snapback", "Curved brim", "Embroidered design"];
    case "poster":
      return [...common, "Premium matte paper", "200gsm weight", "Vibrant archival inks", "Ships in protective tube"];
    case "sticker":
      return [...common, "Waterproof vinyl", "UV resistant", "Die-cut to shape", "3-4 inch diameter"];
    case "notebook":
      return [...common, "Hardcover", "192 lined pages", "80gsm paper", "Ribbon bookmark", "Lay-flat binding"];
    case "cushion":
      return [...common, "Polyester cover", "Polyester fill", "45×45cm", "Hidden zipper", "Removable cover"];
    case "kids-t-shirt":
      return [...common, "100% organic cotton", "150 GSM", "Tag-free neck label", "Pre-shrunk"];
    case "baby-onesie":
      return [...common, "100% organic cotton", "Envelope neckline", "Three-snap closure", "Tag-free"];
    default:
      return common;
  }
}

function typeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    "t-shirt": "T-Shirt", "hoodie": "Hoodie", "sweatshirt": "Sweatshirt",
    "tote-bag": "Tote Bag", "mug": "Mug", "phone-case": "Phone Case",
    "cap": "Cap", "poster": "Poster", "sticker": "Sticker",
    "notebook": "Notebook", "cushion": "Cushion",
    "kids-t-shirt": "Kids T-Shirt", "baby-onesie": "Baby Onesie",
  };
  return labels[type];
}

function typePrice(type: ProductType): number {
  const prices: Record<ProductType, number> = {
    "t-shirt": 29.99, "hoodie": 49.99, "sweatshirt": 44.99, "tote-bag": 24.99,
    "mug": 16.99, "phone-case": 19.99, "cap": 22.99, "poster": 24.99,
    "sticker": 8.99, "notebook": 14.99, "cushion": 29.99,
    "kids-t-shirt": 24.99, "baby-onesie": 22.99,
  };
  return prices[type];
}

function generateProducts(): Product[] {
  const prods: Product[] = [];
  for (const design of designs) {
    for (const type of design.products) {
      const hasSale = design.id === "d3" && type === "t-shirt";
      prods.push({
        id: `${design.id}-${type}`, designId: design.id, type,
        title: `${design.name} ${typeLabel(type)}`, designName: design.name,
        slug: `${design.slug}-${type}`,
        price: hasSale ? 24.99 : typePrice(type),
        compareAtPrice: hasSale ? 34.99 : undefined, currency: "EUR",
        images: [productPlaceholder(type, design.name), productPlaceholder(type, design.name), productPlaceholder(type, design.name)],
        hoverImage: productPlaceholder(type, design.name),
        colors: productColors(type), sizes: productSizes(type),
        badge: design.isNew && type === "t-shirt" ? "new" : undefined,
        description: `${design.description} Available as a premium ${typeLabel(type).toLowerCase()} featuring our signature ${design.name} design.`,
        details: productDetails(type),
        mockupImage: productPlaceholder(type, design.name),
      });
    }
  }
  return prods;
}

export const designs: Design[] = [
  { id: "d1", name: "Midnight Lion", slug: "midnight-lion", description: "A majestic lion rendered in midnight tones.", heroImage: designPlaceholder("Midnight Lion"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","cap","poster","sticker","notebook","cushion","kids-t-shirt","baby-onesie"], tags: ["animals","bold","dark"], collectionId: "c1", isNew: true, createdAt: "2026-08-01" },
  { id: "d2", name: "Neon Tokyo", slug: "neon-tokyo", description: "Electric cityscape vibes.", heroImage: designPlaceholder("Neon Tokyo"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","poster","sticker","notebook"], tags: ["urban","neon","japanese"], collectionId: "c2", createdAt: "2026-07-15" },
  { id: "d3", name: "Desert Rose", slug: "desert-rose", description: "Delicate desert botanicals.", heroImage: designPlaceholder("Desert Rose"), products: ["t-shirt","hoodie","tote-bag","mug","poster","sticker","notebook","cushion"], tags: ["botanical","earthy","minimal"], collectionId: "c1", createdAt: "2026-07-20" },
  { id: "d4", name: "Concrete Jungle", slug: "concrete-jungle", description: "Raw urban architecture meets nature.", heroImage: designPlaceholder("Concrete Jungle"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","cap","poster","sticker","notebook"], tags: ["urban","architecture","nature"], collectionId: "c2", isNew: true, createdAt: "2026-08-10" },
  { id: "d5", name: "Ocean Drift", slug: "ocean-drift", description: "Fluid abstract waves.", heroImage: designPlaceholder("Ocean Drift"), products: ["t-shirt","hoodie","tote-bag","mug","phone-case","poster","sticker","notebook","cushion"], tags: ["abstract","ocean","calm"], collectionId: "c1", createdAt: "2026-06-01" },
  { id: "d6", name: "Wild Geometry", slug: "wild-geometry", description: "Sacred geometry reimagined.", heroImage: designPlaceholder("Wild Geometry"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","poster","sticker","notebook","phone-case"], tags: ["geometric","sacred","abstract"], collectionId: "c2", createdAt: "2026-06-20" },
  { id: "d7", name: "Solar Flare", slug: "solar-flare", description: "Cosmic energy.", heroImage: designPlaceholder("Solar Flare"), products: ["t-shirt","hoodie","tote-bag","poster","sticker","notebook"], tags: ["space","cosmic","bold"], collectionId: "c3", isNew: true, createdAt: "2026-08-15" },
  { id: "d8", name: "Shadow Botanical", slug: "shadow-botanical", description: "Dark florals.", heroImage: designPlaceholder("Shadow Botanical"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","poster","sticker","notebook","cushion","kids-t-shirt"], tags: ["botanical","dark","moody"], collectionId: "c3", createdAt: "2026-05-10" },
  { id: "d9", name: "Nordic Lines", slug: "nordic-lines", description: "Scandinavian minimalism.", heroImage: designPlaceholder("Nordic Lines"), products: ["t-shirt","hoodie","tote-bag","mug","poster","notebook"], tags: ["minimal","geometric","nature"], collectionId: "c1", createdAt: "2026-04-15" },
  { id: "d10", name: "After Dark", slug: "after-dark", description: "Nightlife captured in ink.", heroImage: designPlaceholder("After Dark"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","cap","poster","sticker"], tags: ["urban","bold","dark"], collectionId: "c2", isNew: true, createdAt: "2026-08-20" },
  { id: "d11", name: "Modern Heritage", slug: "modern-heritage", description: "Classic motifs reimagined.", heroImage: designPlaceholder("Modern Heritage"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","cap","poster","notebook"], tags: ["typography","bold","minimal"], collectionId: "c1", createdAt: "2026-03-10" },
  { id: "d12", name: "Sunday Studio", slug: "sunday-studio", description: "Slow living aesthetics.", heroImage: designPlaceholder("Sunday Studio"), products: ["t-shirt","hoodie","tote-bag","mug","notebook","cushion"], tags: ["minimal","earthy","nature"], collectionId: "c1", createdAt: "2026-02-20" },
];

export const products = generateProducts();

export const collections: Collection[] = [
  { id: "c1", name: "Essentials", slug: "essentials", description: "Core designs for everyday expression.", image: collectionPlaceholder("Essentials"), designIds: ["d1","d3","d5","d9","d11","d12"], productCount: 72 },
  { id: "c2", name: "New Drops", slug: "new-drops", description: "Fresh releases.", image: collectionPlaceholder("New Drops"), designIds: ["d1","d4","d7","d10"], productCount: 42 },
  { id: "c3", name: "Minimal", slug: "minimal", description: "Less is more.", image: collectionPlaceholder("Minimal"), designIds: ["d7","d8","d9","d12"], productCount: 30 },
  { id: "c4", name: "Design Stories", slug: "design-stories", description: "Behind every design is a story.", image: collectionPlaceholder("Design Stories"), designIds: ["d1","d5","d6"], productCount: 24 },
  { id: "c5", name: "Best Sellers", slug: "best-sellers", description: "Our most popular designs.", image: collectionPlaceholder("Best Sellers"), designIds: ["d1","d2","d5","d6"], productCount: 40 },
  { id: "c6", name: "Street Culture", slug: "street-culture", description: "Urban energy and bold graphics.", image: collectionPlaceholder("Street Culture"), designIds: ["d2","d4","d6","d10"], productCount: 36 },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "The Art of Wearing What You Believe", slug: "art-of-wearing-what-you-believe", excerpt: "How visual design becomes part of personal identity.", content: "", image: blogPlaceholder("Design Identity"), author: "FAYANITY Studio", date: "2026-08-20", readTime: "6 min read", category: "Design", tags: ["design","identity","fashion"] },
  { id: "b2", title: "Behind the Design: Midnight Lion", slug: "behind-design-midnight-lion", excerpt: "The creative process behind our signature design.", content: "", image: blogPlaceholder("Design Process"), author: "FAYANITY Studio", date: "2026-08-12", readTime: "4 min read", category: "Design", tags: ["design","process","midnight-lion"] },
  { id: "b3", title: "How to Build a Minimal Everyday Wardrobe", slug: "build-minimal-everyday-wardrobe", excerpt: "A curated approach to a better wardrobe.", content: "", image: blogPlaceholder("Minimal Wardrobe"), author: "FAYANITY Team", date: "2026-08-05", readTime: "7 min read", category: "Style", tags: ["style","minimal","wardrobe"] },
  { id: "b4", title: "5 Ways to Style an Oversized Hoodie", slug: "style-oversized-hoodie", excerpt: "From street-style to smart-casual.", content: "", image: blogPlaceholder("Hoodie Styling"), author: "FAYANITY Team", date: "2026-07-28", readTime: "5 min read", category: "Style", tags: ["style","hoodie","guide"] },
  { id: "b5", title: "How to Choose the Right T-Shirt Fit", slug: "choose-right-tshirt-fit", excerpt: "Understanding slim, regular, and oversized fits.", content: "", image: blogPlaceholder("T-Shirt Fit"), author: "FAYANITY Team", date: "2026-07-20", readTime: "4 min read", category: "Product Guide", tags: ["t-shirt","fit","guide"] },
  { id: "b6", title: "The Story Behind Our Print Quality", slug: "story-behind-print-quality", excerpt: "From archival inks to precision printing.", content: "", image: blogPlaceholder("Print Quality"), author: "FAYANITY Studio", date: "2026-07-15", readTime: "5 min read", category: "Brand", tags: ["quality","printing"] },
  { id: "b7", title: "T-Shirt vs Sweatshirt", slug: "tshirt-vs-sweatshirt", excerpt: "A practical guide to two wardrobe staples.", content: "", image: blogPlaceholder("T-Shirt vs Sweatshirt"), author: "FAYANITY Team", date: "2026-07-08", readTime: "4 min read", category: "Product Guide", tags: ["t-shirt","sweatshirt"] },
  { id: "b8", title: "How to Care for Your Printed Apparel", slug: "care-for-printed-apparel", excerpt: "Keep your prints looking fresh.", content: "", image: blogPlaceholder("Apparel Care"), author: "FAYANITY Team", date: "2026-07-01", readTime: "3 min read", category: "Care Guide", tags: ["care","washing"] },
  { id: "b9", title: "The Best Gift Ideas for Design Lovers", slug: "gift-ideas-design-lovers", excerpt: "Thoughtful gifts for creative people.", content: "", image: blogPlaceholder("Gift Ideas"), author: "FAYANITY Team", date: "2026-06-25", readTime: "5 min read", category: "Gift Guide", tags: ["gifts","design"] },
  { id: "b10", title: "Minimal Design in Modern Fashion", slug: "minimal-design-modern-fashion", excerpt: "Why minimal design dominates.", content: "", image: blogPlaceholder("Minimal Fashion"), author: "FAYANITY Studio", date: "2026-06-18", readTime: "6 min read", category: "Design", tags: ["minimal","design"] },
  { id: "b11", title: "Understanding Organic Cotton", slug: "understanding-organic-cotton", excerpt: "What makes organic cotton different.", content: "", image: blogPlaceholder("Organic Cotton"), author: "FAYANITY Team", date: "2026-06-10", readTime: "5 min read", category: "Brand", tags: ["sustainability","cotton"] },
  { id: "b12", title: "Gift Guide: For the Minimalist", slug: "gift-guide-minimalist", excerpt: "Clean gifts for simplicity lovers.", content: "", image: blogPlaceholder("Minimalist Gift"), author: "FAYANITY Team", date: "2026-06-03", readTime: "4 min read", category: "Gift Guide", tags: ["gifts","minimal"] },
];

export function getProductsByDesign(designId: string): Product[] {
  return products.filter((p) => p.designId === designId);
}
export function getProductByDesignAndType(designId: string, type: ProductType): Product | undefined {
  return products.find((p) => p.designId === designId && p.type === type);
}
export function getDesignBySlug(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
export function getDesignsByCollection(collectionId: string): Design[] {
  return designs.filter((d) => d.collectionId === collectionId);
}
export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("en-EU", { style: "currency", currency, minimumFractionDigits: 2 }).format(price);
}
export function productTypeLabel(type: ProductType): string {
  return typeLabel(type);
}
export function getFeaturedDesigns(): Design[] {
  return designs.filter((d) => d.isNew || d.id === "d1" || d.id === "d2" || d.id === "d5");
}
export function getBestsellerDesigns(): Design[] {
  return [designs[0], designs[1], designs[4], designs[5]];
}
