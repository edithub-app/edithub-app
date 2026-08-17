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
  { id: 'a1', title: 'Diskette Collage', thumbnail_url: '/library/assets-presets/01-disk.jpg', category: 'graphic', download_count: 5800, created_at: '2026-07-20' },
  { id: 'a2', title: 'Azul Poster', thumbnail_url: '/library/assets-presets/02-blue-poster.jpg', category: 'graphic', download_count: 2900, created_at: '2026-07-19' },
  { id: 'a3', title: 'Gothic Type Pack', thumbnail_url: '/library/assets-presets/03-gothic-font.jpg', category: 'template', download_count: 3400, created_at: '2026-07-18' },
  { id: 'a4', title: 'Warm Film Textures', thumbnail_url: '/library/assets-presets/04-download-58.jpg', category: 'overlay', download_count: 1700, created_at: '2026-07-17' },
  { id: 'a5', title: 'Chrome Star Stickers', thumbnail_url: '/library/assets-presets/05-download-59.jpg', category: 'png', download_count: 2200, created_at: '2026-07-16' },
  { id: 'a6', title: 'Soft Focus Overlay', thumbnail_url: '/library/assets-presets/06-download-60.jpg', category: 'overlay', download_count: 4100, created_at: '2026-07-15' },
  { id: 'a7', title: 'Editorial Shapes', thumbnail_url: '/library/assets-presets/07-download-61.jpg', category: 'graphic', download_count: 1200, created_at: '2026-07-14' },
  { id: 'a8', title: 'Sticker Sheet', thumbnail_url: '/library/assets-presets/08-download-62.jpg', category: 'png', download_count: 3100, created_at: '2026-07-13' },
  { id: 'a9', title: 'Y2K Texture Pack', thumbnail_url: '/library/assets-presets/09-download-63.jpg', category: 'overlay', download_count: 2700, created_at: '2026-07-12' },
  { id: 'a10', title: 'Gracie Abrams Poster', thumbnail_url: '/library/assets-presets/10-gracie-abrams.jpg', category: 'template', download_count: 4900, created_at: '2026-07-11' },
];

export const mockPresets: Preset[] = [
  { id: 'p1', title: 'Hey Boy Type Treatment', thumbnail_url: '/library/assets-presets/11-hey-boy.jpg', category: 'preset', download_count: 3400, created_at: '2026-07-20' },
  { id: 'p2', title: 'Editorial Colouring', thumbnail_url: '/library/assets-presets/12-instagram-2.jpg', category: 'colouring', download_count: 2100, created_at: '2026-07-19' },
  { id: 'p3', title: 'Pink Motion Preset', thumbnail_url: '/library/assets-presets/13-instagram-3.jpg', category: 'transition', download_count: 1700, created_at: '2026-07-18' },
  { id: 'p4', title: 'Social Studio Pack', thumbnail_url: '/library/assets-presets/14-social-studio.jpg', category: 'preset', download_count: 8200, created_at: '2026-07-17' },
  { id: 'p5', title: 'Mantra Colouring', thumbnail_url: '/library/assets-presets/15-jennie-mantra.jpg', category: 'colouring', download_count: 1500, created_at: '2026-07-16' },
  { id: 'p6', title: 'Node Layout Preset', thumbnail_url: '/library/assets-presets/16-node.jpg', category: 'preset', download_count: 2600, created_at: '2026-07-15' },
  { id: 'p7', title: 'Sticker Cutout Preset', thumbnail_url: '/library/assets-presets/17-illit-sticker.jpg', category: 'other', download_count: 3800, created_at: '2026-07-14' },
  { id: 'p8', title: 'Photo Booth Scrapbook', thumbnail_url: '/library/assets-presets/18-photo-booth.jpg', category: 'transition', download_count: 4900, created_at: '2026-07-13' },
  { id: 'p9', title: 'Pink Bubblegum CC', thumbnail_url: '/library/assets-presets/19-pink-bubblegum.jpg', category: 'colouring', download_count: 2900, created_at: '2026-07-12' },
  { id: 'p10', title: 'Pink Sticker Preset', thumbnail_url: '/library/assets-presets/20-pink-sticker.jpg', category: 'shake', download_count: 1900, created_at: '2026-07-11' },
  { id: 'p11', title: 'Noiaverse Texture Preset', thumbnail_url: '/library/assets-presets/21-noiaverse.jpg', category: 'other', download_count: 2400, created_at: '2026-07-10' },
];

export const mockAudios: Audio[] = [
  { id: 'au1', title: 'Love Like This', thumbnail_url: '/audio/love-like-this.jpg', category: 'song', duration: '3:24', download_count: 5400, created_at: '2026-07-20' },
  { id: 'au2', title: 'Azul', thumbnail_url: '/audio/azul.jpg', category: 'song', duration: '2:58', download_count: 3200, created_at: '2026-07-18' },
  { id: 'au3', title: 'Close to Us', thumbnail_url: '/audio/close-to-us.jpg', category: 'song', duration: '2:41', download_count: 6700, created_at: '2026-07-16' },
  { id: 'au4', title: 'Yellow', thumbnail_url: '/audio/yellow.jpg', category: 'song', duration: '3:12', download_count: 4100, created_at: '2026-07-14' },
];

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}
