
import React from 'react';

const SvgIcon = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <svg viewBox="0 0 45 45" className="w-full h-full">
    <g
      fill={color === 'w' ? '#f0d9b5' : '#312e2b'}
      stroke={color === 'w' ? '#312e2b' : '#f0d9b5'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  </svg>
);

export const Pawn = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path
      d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 l 0,2 13,0 0,-2 c 0,-2.41 -1.33,-4.5 -3.28,-5.62 C 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z m 0,15 9,0 c 0,2.5 0,4 0,4 l -18,0 c 0,0 0,-1.5 0,-4 l 9,0 z m -1.5,4.5 3,0 0,3 -3,0 z"
      style={{ opacity: 1, fillRule: 'nonzero', strokeLinecap: 'butt' }}
    />
  </SvgIcon>
);

export const Knight = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path
      d="m 22,10 c 1.24,0 2.41,0.15 3.5,0.41 C 24.1,12.23 23,13.84 23,15.5 23,17.43 24.34,19 26,19.5 26.35,19.67 26.7,19.82 27,20 c -1,1 -2,2.5 -2,4.5 C 25,27 27.5,29 30,29 32.5,29 35,27 35,24.5 35,22.5 34,21 33,20 33.3,19.82 33.65,19.67 34,19.5 35.66,19 37,17.43 37,15.5 37,13.84 35.9,12.23 34.5,10.41 35.59,10.15 36.76,10 38,10 38,8.66 38,7.5 38,6 36.33,6 35,6 33.5,6 33.5,6 33.5,6 33.5,6 33,6 32.5,6 32,6.33 31.5,7 31,7.67 30.5,8 30,8 29.5,8 29,7.67 28.5,7 28,6.33 27.5,6 27,6 26.5,6 26.5,6 26.5,6 26.5,6 25,6 23.67,6 22,6 22,7.5 22,8.66 22,10 z"
      style={{ strokeLinecap: 'butt' }}
    />
    <path
      d="m 9,36 c 0,0 2.5,0 4,0 1.5,0 4,-2.5 4,-4 0,-1.5 -2.5,-4 -4,-4 -1.5,0 -4,2.5 -4,4 0,1.5 2.5,4 4,4 z"
      style={{ strokeLinecap: 'butt', strokeDasharray: 'none' }}
    />
    <path d="m 15,32 0,2" style={{ fill: 'none', strokeLinejoin: 'miter' }} />
    <path d="m 17,32 8.5,0 1.5,2.5 -10,0" style={{ strokeLinecap: 'butt' }} />
    <path d="m 17.5,30 5,-15 5,15" style={{ fill: 'none' }} />
  </SvgIcon>
);

export const Bishop = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path d="m 9,36 27,0 0,2 -27,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 14,36 17,0 0,-2 -17,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="M 22.5,15 C 25.5,15 27,18 27,20 L 27,25 C 27,25 24,26 22.5,26 C 21,26 18,25 18,25 L 18,20 C 18,18 19.5,15 22.5,15 z" />
    <path d="M 22.5,15 C 25.5,15 27,18 27,20 L 27,25 C 27,25 24,26 22.5,26 C 21,26 18,25 18,25 L 18,20 C 18,18 19.5,15 22.5,15 z" />
    <path d="m 22.5,26 0,10" style={{ fill: 'none', strokeLinejoin: 'miter' }} />
    <path d="m 18,25 9,0" style={{ fill: 'none' }} />
    <path d="m 12,38 21,0" style={{ fill: 'none', strokeLinecap: 'butt' }} />
    <circle cx="22.5" cy="10.5" r="3.5" />
  </SvgIcon>
);

export const Rook = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path d="m 9,36 27,0 0,2 -27,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 12,32 21,0 0,4 -21,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 12,14 21,0 0,18 -21,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 14,14 17,0 0,18 -17,0 z" style={{ strokeLinecap: 'butt', fill: color === 'w' ? '#312e2b' : '#f0d9b5' }} />
    <path d="m 11,14 23,0 0,-4 -23,0 z" style={{ strokeLinecap: 'butt' }} />
    <path
      d="M 12,10 V 7 H 17 V 10 M 17,7 H 28 V 10 M 28,7 H 33 V 10 M 33,7 V 10"
      style={{ fill: 'none', strokeLinecap: 'butt' }}
    />
  </SvgIcon>
);

export const Queen = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path d="m 9,36 27,0 0,2 -27,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 12,32 21,0 0,4 -21,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="M 12,21 C 12,24 15,25 15,28 l 15,0 c 0,-3 3,-4 3,-7 L 12,21 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 11,14 23,0" style={{ fill: 'none' }} />
    <path d="m 12,18 21,0" style={{ fill: 'none' }} />
    <path
      d="m 12,12 21,9 -21,0 0,6"
      style={{ fill: color === 'w' ? '#312e2b' : '#f0d9b5', strokeLinecap: 'butt' }}
    />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="14" cy="9" r="2.5" />
    <circle cx="22.5" cy="8" r="2.5" />
    <circle cx="31" cy="9" r="2.5" />
    <circle cx="39" cy="12" r="2.5" />
  </SvgIcon>
);

export const King = ({ color }: { color: string }) => (
  <SvgIcon color={color}>
    <path d="m 9,36 27,0 0,2 -27,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 12,32 21,0 0,4 -21,0 z" style={{ strokeLinecap: 'butt' }} />
    <path d="m 12,12 21,0 0,20 -21,0 z" style={{ strokeLinecap: 'butt' }} />
    <path
      d="m 12,12 -3,14 9.5,0 0,-14 -3,0 -1.25,4 -1.25,-4 z"
      style={{ fill: color === 'w' ? '#312e2b' : '#f0d9b5', strokeLinecap: 'butt' }}
    />
    <path
      d="m 22.5,12 0,14 9.5,0 -3,-14 -3,0 -1.25,4 -1.25,-4 z"
      style={{ fill: color === 'w' ? '#312e2b' : '#f0d9b5', strokeLinecap: 'butt' }}
    />
    <path d="m 12,12 21,0" style={{ fill: 'none' }} />
    <path d="M 22.5,7 L 22.5,12" style={{ fill: 'none', strokeLinecap: 'butt' }} />
    <path d="M 20,9.5 L 25,9.5" style={{ fill: 'none', strokeLinecap: 'butt' }} />
  </SvgIcon>
);
