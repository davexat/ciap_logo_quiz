import { Language } from '../types/quiz';

export const LANGUAGES: Language[] = [
  {
    id: 'python',
    name: 'Python',
    displayName: 'Python',
    category: 'General / Data Science / Backend',
    brandColor: '#3776AB',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#387EB8"/>
          <stop offset="100%" stop-color="#366994"/>
        </linearGradient>
        <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE873"/>
          <stop offset="100%" stop-color="#FFD43B"/>
        </linearGradient>
      </defs>
      <path fill="url(#py-blue)" d="M63.2 8C37.8 8 39.4 19 39.4 19l.03 11.4h24.2v3.4H28.4S12 31.9 12 57.3c0 25.4 14.3 24.5 14.3 24.5h8.5v-12s-.5-14.3 14-14.3h24.1s13.4.2 13.4-13.1V21.1S88.3 8 63.2 8zM50.6 18.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
      <path fill="url(#py-yellow)" d="M64.8 120c25.4 0 23.8-11 23.8-11l-.03-11.4H64.4v-3.4h35.2s16.4 1.9 16.4-23.5c0-25.4-14.3-24.5-14.3-24.5h-8.5v12s.5 14.3-14 14.3H55.1s-13.4-.2-13.4 13.1v21.8s-2 13.1 23.1 13.1zm12.6-10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    </svg>`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    displayName: 'JavaScript',
    category: 'Web / Full-Stack',
    brandColor: '#F7DF1E',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="16" fill="#F7DF1E"/>
      <path fill="#000000" d="M34.7 104.5c4.7 2.7 10.4 4.5 16.5 4.5 15.3 0 23.6-7.8 23.6-22.9V45.2h-15.6v40.7c0 8.3-4.1 11.9-10.7 11.9-3.8 0-7.3-1.4-9.3-2.9l-4.5 9.6zm47 4.2c6.2 3.6 14.6 5.8 22.8 5.8 16.5 0 26.5-8.3 26.5-22.6 0-12.8-7.9-18.7-19.3-23.9l-4.1-1.8c-7.7-3.4-11.8-6.4-11.8-11.8 0-4.9 4-8.8 10.5-8.8 5.7 0 10.4 2 13.7 4.5l4.3-9.9c-4.4-3.1-11.1-4.8-17.9-4.8-16 0-25.4 9-25.4 21.6 0 11.9 7.6 18.2 18.2 23l4.2 1.9c8.5 3.9 12.9 7.2 12.9 13.1 0 5.6-4.9 9.8-12.7 9.8-7.3 0-13.6-3.1-18.1-6.6l-3.6 9.7z"/>
    </svg>`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    displayName: 'TypeScript',
    category: 'Typed JavaScript / Web',
    brandColor: '#3178C6',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="16" fill="#3178C6"/>
      <path fill="#FFFFFF" d="M60.5 50.8H21.2v14.1h12.5v43.5h14.3V64.9H60.5V50.8zm23.6 37.8c3.9 2.5 8.9 4.3 14 4.3 6.3 0 9.8-2.7 9.8-6.9 0-4.3-3.6-6.6-11.3-9.9-11.4-4.8-17.1-10.9-17.1-19.5 0-10.7 8.9-18.4 22.6-18.4 6.8 0 13 1.9 17.5 4.8l-3.8 11.3c-3.6-2.1-7.9-3.7-13-3.7-5.5 0-8.5 2.6-8.5 6.1 0 4 3.7 6 11.7 9.4 12 5.1 16.7 11.4 16.7 20.3 0 11.3-8.8 19.3-24.6 19.3-7.7 0-15-2.2-19.8-5.3l3.6-11.5z"/>
    </svg>`
  },
  {
    id: 'java',
    name: 'Java',
    displayName: 'Java',
    category: 'Enterprise / JVM / Android',
    brandColor: '#E76F00',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#5382A1" d="M49.2 87.2s-7.8 4.5 5.5 6.1c16.2 1.9 24.5 1.7 42.6-2.3 0 0-6.1 3.8-17.4 6.7-22.3 5.7-44.5 1.5-30.7-10.5z"/>
      <path fill="#5382A1" d="M42.8 72.4s-8.9 6.3 4.2 7.7c16 1.7 29.8 1.9 52.8-3.1 0 0-7.3 4.3-17.4 6.8-25.1 6.2-51.5 2.5-39.6-11.4z"/>
      <path fill="#E76F00" d="M72.2 40.5c5.3 6.2-4 11.8-4 11.8s13.4-7 7.2-15.8c-6-8.6-11.4-12.8 15.3-28.5-24.1 6.8-24.6 25.5-18.5 32.5z"/>
      <path fill="#5382A1" d="M96.7 101.4c-18.4 8.7-53.5 9.3-68.5 2.4-5.5-2.5 7.4-4.8 12.3-5.2 4.9-.4 7.6-.2 7.6-.2s-19.1-8.3-4.1-11.9c12.2-2.9 22.8-2.6 37.3 2.1 4.5 1.4 15.4 12.8 15.4 12.8z"/>
      <path fill="#E76F00" d="M84.5 63.8s15.6-8.2 8.4-18.8c-6.8-10-12.2-11.9-5-19.2-17.4 3.7-26.6 15.5-16.8 24.1 11.7 10.3 13.4 13.9 13.4 13.9z"/>
      <path fill="#5382A1" d="M78.6 112.9c-28.2 2-63-3.9-63-18.8 0-9.8 14.8-14.7 14.8-14.7s-3.7 3.5 1.7 6.4c15.2 8.2 64.9 5.8 77.2-5.4 0 0-3.3 10.4-30.7 32.5z"/>
    </svg>`
  },
  {
    id: 'cpp',
    name: 'C++',
    displayName: 'C++',
    category: 'Systems / Game Dev / High-Performance',
    brandColor: '#00599C',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#00599C" points="64 8 114 36.8 114 91.2 64 120 14 91.2 14 36.8"/>
      <polygon fill="#004482" points="64 20 102 42.5 102 85.5 64 108 26 85.5 26 42.5"/>
      <path fill="#FFFFFF" d="M60 48c-10 0-16.5 6.5-16.5 16s6.5 16 16.5 16c6 0 10.5-2.5 13.5-6.5l8.5 6c-5 6.5-12.5 11-22 11-16.5 0-28-11.5-28-26.5s11.5-26.5 28-26.5c9.5 0 17 4.5 22 11l-8.5 6c-3-4-7.5-6.5-13.5-6.5z"/>
      <path fill="#00599C" stroke="#FFFFFF" stroke-width="3" d="M84 57h6v5h-6v6h-5v-6h-6v-5h6v-6h5zm20 0h6v5h-6v6h-5v-6h-6v-5h6v-6h5z"/>
    </svg>`
  },
  {
    id: 'c',
    name: 'C',
    displayName: 'C',
    category: 'Systems / Low-Level',
    brandColor: '#A8B9CC',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#A8B9CC" points="64 8 114 36.8 114 91.2 64 120 14 91.2 14 36.8"/>
      <polygon fill="#283593" points="64 19 104 42.5 104 85.5 64 109 24 85.5 24 42.5"/>
      <path fill="#FFFFFF" d="M64 42c-12.5 0-21 8.8-21 22s8.5 22 21 22c8.5 0 14.8-4 18.5-9.5l9 6.5C87 91.5 76.5 98 64 98 44.5 98 30 83 30 64s14.5-34 34-34c12.5 0 23 6.5 28.5 15l-9 6.5C80 46 73 42 64 42z"/>
    </svg>`
  },
  {
    id: 'csharp',
    name: 'C#',
    displayName: 'C#',
    category: 'Enterprise / Unity / .NET',
    brandColor: '#9B4F96',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#9B4F96" points="64 8 114 36.8 114 91.2 64 120 14 91.2 14 36.8"/>
      <polygon fill="#68217A" points="64 20 102 42.5 102 85.5 64 108 26 85.5 26 42.5"/>
      <path fill="#FFFFFF" d="M58 48c-10 0-16.5 6.5-16.5 16s6.5 16 16.5 16c6 0 10.5-2.5 13.5-6.5l8.5 6c-5 6.5-12.5 11-22 11-16.5 0-28-11.5-28-26.5s11.5-26.5 28-26.5c9.5 0 17 4.5 22 11l-8.5 6c-3-4-7.5-6.5-13.5-6.5z"/>
      <path fill="#9B4F96" stroke="#FFFFFF" stroke-width="2.5" d="M85 52l-2 24m10-24l-2 24M79 59h18m-19 10h18"/>
    </svg>`
  },
  {
    id: 'php',
    name: 'PHP',
    displayName: 'PHP',
    category: 'Web Backend / Server-Side',
    brandColor: '#777BB4',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="64" cy="64" rx="60" ry="36" fill="#777BB4"/>
      <ellipse cx="64" cy="64" rx="55" ry="32" fill="#4F5B93"/>
      <text x="64" y="74" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" text-anchor="middle" font-style="italic" letter-spacing="2">php</text>
    </svg>`
  },
  {
    id: 'ruby',
    name: 'Ruby',
    displayName: 'Ruby',
    category: 'Web / Rails / Scripting',
    brandColor: '#CC342D',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#CC342D" d="M26 40l38-28 38 28-14 68H40L26 40z"/>
      <path fill="#DE453D" d="M64 12l38 28-20 8-18-36z"/>
      <path fill="#E65851" d="M64 12L46 48l18-36zm0 0L46 48l36 0L64 12z"/>
      <path fill="#991B15" d="M40 108l48 0 14-68-20 8-42 60z"/>
      <path fill="#B8241D" d="M40 108L26 40l20 8 14 52-20 8z"/>
      <path fill="#FF7B73" d="M46 48h36l-18 42-18-42z"/>
      <path fill="#FFFFFF" opacity="0.35" d="M48 50l16-32 10 32H48z"/>
    </svg>`
  },
  {
    id: 'go',
    name: 'Go',
    displayName: 'Go (Golang)',
    category: 'Cloud / Concurrent / Microservices',
    brandColor: '#00ADD8',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="20" fill="#00ADD8"/>
      <path fill="#FFFFFF" d="M20 70c0-16 11-28 27-28 10 0 18 5 22 13l-11 6c-2-4-6-7-11-7-8 0-14 6-14 16s6 16 14 16c4 0 8-2 10-5v-6H46v-11h25v23c-6 7-14 11-24 11-16 0-27-12-27-29zm56 0c0-16 12-28 26-28s26 12 26 28-12 28-26 28-26-12-26-28zm39 0c0-10-6-16-13-16s-13 6-13 16 6 16 13 16 13-6 13-16z"/>
    </svg>`
  },
  {
    id: 'rust',
    name: 'Rust',
    displayName: 'Rust',
    category: 'Systems / Memory-Safe / High-Performance',
    brandColor: '#DE472B',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <g fill="#241C1A">
        <circle cx="64" cy="64" r="54" fill="none" stroke="#241C1A" stroke-width="12"/>
        <!-- Cog teeth -->
        <rect x="60" y="4" width="8" height="14" rx="2"/>
        <rect x="60" y="110" width="8" height="14" rx="2"/>
        <rect x="4" y="60" width="14" height="8" rx="2"/>
        <rect x="110" y="60" width="14" height="8" rx="2"/>
        <rect x="22" y="22" width="10" height="10" rx="2" transform="rotate(45 27 27)"/>
        <rect x="96" y="96" width="10" height="10" rx="2" transform="rotate(45 101 101)"/>
        <rect x="96" y="22" width="10" height="10" rx="2" transform="rotate(45 101 27)"/>
        <rect x="22" y="96" width="10" height="10" rx="2" transform="rotate(45 27 101)"/>
        <!-- R letter inside -->
        <path d="M44 38h24c11 0 18 6 18 15 0 7-4 12-11 14l13 23H73l-10-20h-7v20H44V38zm12 21h11c4.5 0 7.5-2.5 7.5-6s-3-6-7.5-6H56v12z"/>
      </g>
    </svg>`
  },
  {
    id: 'swift',
    name: 'Swift',
    displayName: 'Swift',
    category: 'iOS / macOS / Apple Ecosystem',
    brandColor: '#F05138',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="28" fill="#F05138"/>
      <path fill="#FFFFFF" d="M102 26c-3 8-10 18-20 27 9-7 18-12 25-15-7 10-18 21-31 30 11-4 22-6 31-6-15 13-33 24-52 30-19 6-36 4-43 1 12 1 29-3 44-12-16 1-32-6-41-17 11 2 24 1 35-4-19-6-30-22-31-37 10 7 23 9 32 8-16-12-19-29-10-41 7 11 18 20 31 27-2-6-2-12 0-17 7 11 17 20 29 27-1-6 0-11 1-16 6 8 13 14 20 18-1-5 0-9 1-13 3 5 6 9 9 13z"/>
    </svg>`
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    displayName: 'Kotlin',
    category: 'Android / Multiplatform / JVM',
    brandColor: '#7F52FF',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kt-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3A7AFF"/>
          <stop offset="50%" stop-color="#C757BC"/>
          <stop offset="100%" stop-color="#FF8A00"/>
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="16" fill="url(#kt-grad)"/>
      <polygon fill="#1E1E2E" points="16,112 64,64 16,16"/>
      <polygon fill="#1E1E2E" points="112,112 64,64 112,64"/>
    </svg>`
  },
  {
    id: 'dart',
    name: 'Dart',
    displayName: 'Dart',
    category: 'Flutter / Cross-Platform Mobile',
    brandColor: '#0175C2',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#01579B" d="M28 20l36-8 44 44-24 52-56-20z"/>
      <path fill="#0175C2" d="M64 12l44 44-16 16-44-44z"/>
      <path fill="#29B6F6" d="M28 20l36-8 44 44-52 52L28 80z"/>
      <path fill="#00B0FF" d="M56 108l52-52 8 8-44 44z"/>
      <path fill="#40C4FF" d="M28 80l28 28-28 8z"/>
    </svg>`
  },
  {
    id: 'lua',
    name: 'Lua',
    displayName: 'Lua',
    category: 'Embedded / Game Scripting',
    brandColor: '#000080',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="50" fill="#000080"/>
      <circle cx="86" cy="42" r="14" fill="#FFFFFF"/>
      <circle cx="94" cy="34" r="14" fill="#000080"/>
      <circle cx="106" cy="22" r="8" fill="#000080"/>
      <circle cx="106" cy="22" r="6" fill="#FFFFFF"/>
      <text x="50" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="28" fill="#FFFFFF">Lua</text>
    </svg>`
  },
  {
    id: 'r',
    name: 'R',
    displayName: 'R',
    category: 'Statistics / Data Science',
    brandColor: '#276DC3',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="64" cy="64" rx="56" ry="40" fill="#C8D6E5" stroke="#8A9BA8" stroke-width="4"/>
      <path fill="#276DC3" d="M50 36h26c14 0 22 7 22 17 0 8-5 14-13 16l17 24H86L72 70H64v23H50V36zm14 22h10c5 0 8-2 8-6s-3-6-8-6H64v12z"/>
    </svg>`
  },
  {
    id: 'scala',
    name: 'Scala',
    displayName: 'Scala',
    category: 'Functional / JVM / Big Data',
    brandColor: '#DC322F',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#DE3423" d="M28 32c24-8 48-8 72 0v16c-24-8-48-8-72 0V32z"/>
      <path fill="#DC322F" d="M28 58c24-8 48-8 72 0v16c-24-8-48-8-72 0V58z"/>
      <path fill="#C72522" d="M28 84c24-8 48-8 72 0v16c-24-8-48-8-72 0V84z"/>
    </svg>`
  },
  {
    id: 'perl',
    name: 'Perl',
    displayName: 'Perl',
    category: 'Scripting / Regex / Text Processing',
    brandColor: '#39457E',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="20" fill="#39457E"/>
      <!-- Camel silhouette -->
      <path fill="#39B54A" d="M34 88v-20l12-14v-10c0-6 4-10 10-10s8 4 8 10v4c6-4 14-4 20 2 4 4 6 10 6 16l8 8v14h-10v-8l-8-8H62l-8 8v16H34z"/>
      <circle cx="62" cy="38" r="3" fill="#FFFFFF"/>
      <text x="64" y="112" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">PERL</text>
    </svg>`
  },
  {
    id: 'haskell',
    name: 'Haskell',
    displayName: 'Haskell',
    category: 'Pure Functional / Static Typing',
    brandColor: '#5D4F85',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#453A62" points="16,20 38,64 16,108 32,108 48,76 48,76 64,108 80,108 50,48 40,28 32,20"/>
      <polygon fill="#5E5086" points="44,20 66,64 88,20 104,20 74,80 88,108 72,108 61,86 50,64"/>
      <polygon fill="#8F4E8B" points="84,54 94,74 116,74 106,54"/>
      <polygon fill="#8F4E8B" points="98,82 108,102 120,102 110,82"/>
    </svg>`
  },
  {
    id: 'objectivec',
    name: 'Objective-C',
    displayName: 'Objective-C',
    category: 'Legacy iOS / macOS / NeXT',
    brandColor: '#0B5A9D',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="20" fill="#0B5A9D"/>
      <text x="64" y="66" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" text-anchor="middle">[ObjC]</text>
      <text x="64" y="92" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="14" fill="#A0C4E8" text-anchor="middle">OBJECTIVE-C</text>
    </svg>`
  },
  {
    id: 'elixir',
    name: 'Elixir',
    displayName: 'Elixir',
    category: 'Functional / BEAM / Phoenix',
    brandColor: '#4E2A8E',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4E2A8E" d="M64 14c-1 0-32 42-32 68 0 18 14 32 32 32s32-14 32-32c0-26-31-68-32-68z"/>
      <path fill="#7D49C9" d="M64 24c-.5 0-24 35-24 58 0 13 11 24 24 24s24-11 24-24c0-23-23.5-58-24-58z"/>
      <circle cx="56" cy="56" r="6" fill="#FFFFFF" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'clojure',
    name: 'Clojure',
    displayName: 'Clojure',
    category: 'Lisp / JVM / Functional',
    brandColor: '#5881D8',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="52" fill="#5881D8"/>
      <circle cx="64" cy="64" r="38" fill="#96CA4F"/>
      <path fill="#FFFFFF" d="M64 26c21 0 38 17 38 38s-17 38-38 38c-8 0-16-3-22-7 14-4 24-17 24-31s-10-27-24-31c6-4 14-7 22-7z"/>
      <circle cx="50" cy="64" r="8" fill="#5881D8"/>
    </svg>`
  },
  {
    id: 'julia',
    name: 'Julia',
    displayName: 'Julia',
    category: 'Scientific Computing / Numerical',
    brandColor: '#9558B2',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="38" r="22" fill="#CB3C33"/>
      <circle cx="42" cy="82" r="22" fill="#4063D8"/>
      <circle cx="86" cy="82" r="22" fill="#389826"/>
    </svg>`
  },
  {
    id: 'zig',
    name: 'Zig',
    displayName: 'Zig',
    category: 'Systems / Fast / C Alternative',
    brandColor: '#F7A41D',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="20" fill="#1E1E24"/>
      <path fill="#F7A41D" d="M22 36h52l-6 16H22V36zm26 24h32l-22 28h-8l20-24H44l4-4zm18 32h40l6-16H72l-6 16z"/>
      <text x="64" y="114" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#F7A41D" text-anchor="middle" letter-spacing="3">ZIG</text>
    </svg>`
  }
];

// Helper function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates exactly 16 non-repeating questions from the pool of 24 languages.
 * For each question, provides the correct language logo and 3 unique distractor logos,
 * shuffled randomly so the correct answer isn't in a fixed position.
 */
export function generateQuizDeck(): {
  id: string;
  roundNumber: number;
  targetLanguage: Language;
  options: Language[];
}[] {
  // Shuffle all languages and take exactly 16
  const shuffledLanguages = shuffle(LANGUAGES);
  const selectedTargets = shuffledLanguages.slice(0, 16);

  return selectedTargets.map((target, index) => {
    // Other languages that are not this target
    const distractorsPool = LANGUAGES.filter(l => l.id !== target.id);
    const shuffledDistractors = shuffle(distractorsPool);
    const chosenDistractors = shuffledDistractors.slice(0, 3);

    // Combine correct target + 3 distractors, and shuffle their order
    const options = shuffle([target, ...chosenDistractors]);

    return {
      id: `q_${index + 1}_${target.id}`,
      roundNumber: index + 1,
      targetLanguage: target,
      options
    };
  });
}
