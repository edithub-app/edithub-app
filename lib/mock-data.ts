export type Scenepack = {
  id: string;
  title: string;
  subject: string;
  source_title: string;
  thumbnail_url: string;
  download_count: number;
  clip_count: number;
  quality: 'normal' | 'high_quality' | 'twixtor' | 'topaz';
  created_at: string;
};

export type Asset = {
  id: string;
  title: string;
  thumbnail_url: string;
  category: 'overlay' | 'png' | 'graphic' | 'template' | 'other';
  download_count: number;
  created_at: string;
};

export type Preset = {
  id: string;
  title: string;
  thumbnail_url: string;
  category: 'colouring' | 'shake' | 'transition' | 'preset' | 'other';
  download_count: number;
  created_at: string;
};

export type Audio = {
  id: string;
  title: string;
  thumbnail_url: string;
  category: 'song' | 'sfx' | 'loop' | 'beat' | 'other';
  duration: string;
  download_count: number;
  created_at: string;
};

export const mockScenepacks: Scenepack[] = [
  { id: 'sp1', title: 'Demitra Kalogeras', subject: 'Demitra', source_title: 'Demitra Kalogeras', thumbnail_url: 'https://i3.ytimg.com/vi/i5r7lTnCOAc/hqdefault.jpg', download_count: 12400, clip_count: 340, quality: 'high_quality', created_at: '2026-07-18' },
  { id: 'sp2', title: 'Will Stranger Things', subject: 'Will Byers', source_title: 'Stranger Things', thumbnail_url: 'https://i3.ytimg.com/vi/XeIKo-KzpJw/hqdefault.jpg', download_count: 8900, clip_count: 520, quality: 'twixtor', created_at: '2026-07-15' },
  { id: 'sp3', title: 'Max Sturniolo SCP', subject: 'Max Sturniolo', source_title: 'YouTubers', thumbnail_url: 'https://i3.ytimg.com/vi/qHhY4xB8UgE/hqdefault.jpg', download_count: 6700, clip_count: 410, quality: 'normal', created_at: '2026-07-12' },
  { id: 'sp4', title: '4K Scenepack Mix', subject: 'Multi', source_title: '4K Scenepack', thumbnail_url: 'https://i3.ytimg.com/vi/aM4DAd4bjzA/hqdefault.jpg', download_count: 15200, clip_count: 280, quality: 'topaz', created_at: '2026-07-20' },
  { id: 'sp5', title: 'Jude Bellingham SCP', subject: 'Jude Bellingham', source_title: 'Jude Bellingham SCP', thumbnail_url: 'https://i3.ytimg.com/vi/7sj7sCNRaQQ/hqdefault.jpg', download_count: 4300, clip_count: 190, quality: 'normal', created_at: '2026-07-10' },
];

export const mockAssets: Asset[] = [
  { id: 'a1', title: 'Overbills Massive Pack', thumbnail_url: 'https://images.payhip.com/o_1j4bsfm5a1h5539v1hjrc1r1n4j11.gif', category: 'overlay', download_count: 5800, created_at: '2026-07-20' },
  { id: 'a2', title: 'Glow Dark Overlay', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1i3sqbbmjr2ohco19rhqip12nbr.jpg', category: 'overlay', download_count: 2900, created_at: '2026-07-10' },
  { id: 'a3', title: 'Light Leaks Pack', thumbnail_url: 'https://images.unsplash.com/photo-1551653475-3268d1c3e479?w=400&h=500&fit=crop', category: 'overlay', download_count: 3400, created_at: '2026-07-14' },
  { id: 'a4', title: 'Film Grain PNGs', thumbnail_url: 'https://images.unsplash.com/photo-1485875437342-9b39570e6c00?w=400&h=500&fit=crop', category: 'png', download_count: 1700, created_at: '2026-07-12' },
  { id: 'a5', title: 'Dust Particles PNG', thumbnail_url: 'https://images.unsplash.com/photo-1530214443579-7d42f3e4c4f8?w=400&h=500&fit=crop', category: 'png', download_count: 2200, created_at: '2026-07-08' },
  { id: 'a6', title: 'Smoke Overlay Pack', thumbnail_url: 'https://images.unsplash.com/photo-1488861859915-4b5a4d2a7c8e?w=400&h=500&fit=crop', category: 'overlay', download_count: 4100, created_at: '2026-07-06' },
  { id: 'a7', title: 'Text Bubble PNGs', thumbnail_url: 'https://images.unsplash.com/photo-1513258497385-4a6a3e6f9a06?w=400&h=500&fit=crop', category: 'png', download_count: 1200, created_at: '2026-07-04' },
  { id: 'a8', title: 'Glitch Graphic Pack', thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', category: 'graphic', download_count: 3100, created_at: '2026-07-02' },
];

export const mockPresets: Preset[] = [
  { id: 'p1', title: 'Billie CC', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1ihvtnca61qigp1b12kf1ce71d3sr.png', category: 'colouring', download_count: 3400, created_at: '2026-07-18' },
  { id: 'p2', title: 'CC Pack Vol. 2', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1i57bq02f1cdegqj1sbpjj7nv3r.jpg', category: 'colouring', download_count: 2100, created_at: '2026-07-15' },
  { id: 'p3', title: 'Shake Pack Pro', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1ij3klq4vp0h1a9g1r3s12r616f525.png', category: 'shake', download_count: 1700, created_at: '2026-07-12' },
  { id: 'p4', title: 'Free CC Pack', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1jt4iuj7418ei6metfp1v351q1l15.png', category: 'colouring', download_count: 8200, created_at: '2026-07-08' },
  { id: 'p5', title: 'Rose CC', thumbnail_url: 'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1i2skt0jml4e9qt12eq11jg9q0r.jpg', category: 'colouring', download_count: 1500, created_at: '2026-07-14' },
  { id: 'p6', title: 'Smooth Shake Preset', thumbnail_url: 'https://images.unsplash.com/photo-1492691527719-9d1e27e24141?w=400&h=500&fit=crop', category: 'shake', download_count: 2600, created_at: '2026-07-09' },
  { id: 'p7', title: 'Transition Pack Vol.1', thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d7d4?w=400&h=500&fit=crop', category: 'transition', download_count: 3800, created_at: '2026-07-11' },
  { id: 'p8', title: 'Cinematic Colouring', thumbnail_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop', category: 'colouring', download_count: 4900, created_at: '2026-07-05' },
];

export const mockAudios: Audio[] = [
  { id: 'au1', title: 'Midnight Drive', thumbnail_url: 'https://images.unsplash.com/photo-1470225620780-9bf2e77e26c3?w=400&h=500&fit=crop', category: 'song', duration: '3:24', download_count: 5400, created_at: '2026-07-18' },
  { id: 'au2', title: 'Ambient Loop Pack', thumbnail_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=500&fit=crop', category: 'loop', duration: '0:45', download_count: 3200, created_at: '2026-07-15' },
  { id: 'au3', title: 'Trap SFX Pack', thumbnail_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop', category: 'sfx', duration: '1:10', download_count: 6700, created_at: '2026-07-12' },
  { id: 'au4', title: 'Lo-Fi Beat', thumbnail_url: 'https://images.unsplash.com/photo-1454942901704-3c44c3b95a39?w=400&h=500&fit=crop', category: 'beat', duration: '2:58', download_count: 4100, created_at: '2026-07-10' },
  { id: 'au5', title: 'Cinematic Riser', thumbnail_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=500&fit=crop', category: 'sfx', duration: '0:12', download_count: 8900, created_at: '2026-07-08' },
  { id: 'au6', title: 'Phonk Beat', thumbnail_url: 'https://images.unsplash.com/photo-1470225620780-9bf2e77e26c3?w=400&h=500&fit=crop', category: 'beat', duration: '2:34', download_count: 7200, created_at: '2026-07-06' },
  { id: 'au7', title: 'Whoosh SFX Bundle', thumbnail_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=500&fit=crop', category: 'sfx', duration: '0:08', download_count: 9100, created_at: '2026-07-04' },
  { id: 'au8', title: 'Night Vibe Loop', thumbnail_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=500&fit=crop', category: 'loop', duration: '1:00', download_count: 2800, created_at: '2026-07-02' },
];

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}
