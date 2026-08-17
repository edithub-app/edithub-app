export type ProfileSettings = {
  name: string;
  handle: string;
  avatarUrl: string;
  bannerUrl: string;
  backgroundColor: string;
  socials: ProfileLink[];
};

export type ProfileLink = {
  id: string;
  title: string;
  url: string;
};

export const PROFILE_STORAGE_KEY = 'edithub_profile_settings';
export const PROFILE_USERNAME_UPDATED_KEY = 'edithub_profile_username_updated_at';
export const PROFILE_BOOSTED_AT_KEY = 'edithub_profile_boosted_at';

export const PROFILE: ProfileSettings = {
  name: 'Maya',
  handle: '@maya',
  avatarUrl: '/mayas-logo.jpg',
  bannerUrl: '/download_(29).jpg',
  backgroundColor: '#1d1717',
  socials: [
    { id: 'website', title: 'Website', url: 'https://mayaedits.com' },
    { id: 'twitter', title: '@mayaedits', url: 'https://x.com/mayaedits' },
    { id: 'youtube', title: 'Maya Edits', url: 'https://youtube.com' },
    { id: 'instagram', title: '@maya.edits', url: 'https://instagram.com/maya.edits' },
  ],
};

export function getProfileLinkKind(link: ProfileLink) {
  const value = `${link.title} ${link.url}`.toLowerCase();
  if (value.includes('tiktok')) return 'tiktok';
  if (value.includes('instagram') || value.includes('insta')) return 'instagram';
  if (value.includes('behance')) return 'behance';
  if (value.includes('pinterest') || value.includes('pintterest')) return 'pinterest';
  if (value.includes('twitch')) return 'twitch';
  return 'link';
}

function normalizeProfileLinks(value: unknown): ProfileLink[] {
  if (Array.isArray(value)) {
    return value
      .filter((link): link is ProfileLink => {
        if (!link || typeof link !== 'object') return false;
        const candidate = link as Partial<ProfileLink>;
        return typeof candidate.title === 'string' && typeof candidate.url === 'string';
      })
      .map((link, index) => ({
        id: link.id || `link-${index}`,
        title: link.title,
        url: link.url,
      }));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, url]) =>
      typeof url === 'string' && url.trim()
        ? [{ id: key, title: key === 'website' ? 'Website' : key, url }]
        : []
    );
  }

  return PROFILE.socials;
}

export function getProfileSettings(): ProfileSettings {
  if (typeof window === 'undefined') return PROFILE;

  try {
    const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!stored) return PROFILE;
    const parsed = JSON.parse(stored) as Partial<ProfileSettings>;
    return {
      ...PROFILE,
      ...parsed,
      socials: normalizeProfileLinks(parsed.socials),
    };
  } catch {
    return PROFILE;
  }
}

export function saveProfileSettings(settings: ProfileSettings) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(settings));
  }
}

export type CreatorProfile = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
};

export const CREATOR_PROFILES: CreatorProfile[] = [
  {
    id: 'maya',
    name: 'Maya',
    handle: '@maya',
    avatarUrl: '/mayas-logo.jpg',
    bio: 'Editor, creator, and collector of pretty things.',
    followers: 12400,
    following: 186,
  },
  {
    id: 'nora-vale',
    name: 'Nora Vale',
    handle: '@noravale',
    avatarUrl: '/library/assets-presets/07-download-61.jpg',
    bio: 'Soft colour, sharp cuts, and dreamy visual stories.',
    followers: 8200,
    following: 94,
  },
  {
    id: 'jules-kim',
    name: 'Jules Kim',
    handle: '@juleskim',
    avatarUrl: '/library/assets-presets/12-instagram-2.jpg',
    bio: 'Motion designer making tiny moments feel cinematic.',
    followers: 6100,
    following: 123,
  },
  {
    id: 'ellie-moon',
    name: 'Ellie Moon',
    handle: '@elliemoon',
    avatarUrl: '/library/assets-presets/16-node.jpg',
    bio: 'Presets, overlays, and little bits of magic.',
    followers: 4900,
    following: 71,
  },
  {
    id: 'sam-rivera',
    name: 'Sam Rivera',
    handle: '@samrivera',
    avatarUrl: '/library/assets-presets/19-pink-bubblegum.jpg',
    bio: 'Building a visual library for the next great edit.',
    followers: 3700,
    following: 88,
  },
  {
    id: 'kai-wells',
    name: 'Kai Wells',
    handle: '@kaiwells',
    avatarUrl: '/library/assets-presets/21-noiaverse.jpg',
    bio: 'Film-inspired assets for editors who love texture.',
    followers: 2800,
    following: 63,
  },
];

export const PROFILE_FOLLOWERS: CreatorProfile[] = [
  CREATOR_PROFILES[1],
  CREATOR_PROFILES[2],
  CREATOR_PROFILES[3],
  CREATOR_PROFILES[4],
];

export const PROFILE_FOLLOWING: CreatorProfile[] = [
  CREATOR_PROFILES[2],
  CREATOR_PROFILES[4],
  CREATOR_PROFILES[5],
];

export const PROFILE_REVIEWS = [
  {
    id: 'review-1',
    name: 'Nora Vale',
    handle: '@noravale',
    avatarUrl: '/library/assets-presets/07-download-61.jpg',
    rating: 5,
    date: '2 weeks ago',
    text: 'Maya’s packs always make my edits feel finished. Everything is beautifully organised and easy to use.',
  },
  {
    id: 'review-2',
    name: 'Jules Kim',
    handle: '@juleskim',
    avatarUrl: '/library/assets-presets/12-instagram-2.jpg',
    rating: 5,
    date: '1 month ago',
    text: 'The colour presets are gorgeous. They have become my go-to starting point for short-form edits.',
  },
  {
    id: 'review-3',
    name: 'Ellie Moon',
    handle: '@elliemoon',
    avatarUrl: '/library/assets-presets/16-node.jpg',
    rating: 4,
    date: '2 months ago',
    text: 'Such a thoughtful creator with a really consistent eye. I always find something useful here.',
  },
];

export const PROFILE_REQUESTS = [
  {
    id: 'request-1',
    title: 'Wednesday season 2 scenepack',
    type: 'Scenepack',
    requester: 'Nora Vale',
    handle: '@noravale',
    date: 'Today',
    status: 'Open',
  },
  {
    id: 'request-2',
    title: 'Dreamy vocal loop for edits',
    type: 'Audio',
    requester: 'Jules Kim',
    handle: '@juleskim',
    date: 'Yesterday',
    status: 'Open',
  },
  {
    id: 'request-3',
    title: 'Soft grain preset for night footage',
    type: 'Preset',
    requester: 'Ellie Moon',
    handle: '@elliemoon',
    date: '3 days ago',
    status: 'Open',
  },
];

export const PROFILE_MY_REQUESTS = [
  {
    id: 'my-request-1',
    title: 'A soft blue hour overlay set',
    type: 'Asset',
    requester: 'Maya',
    handle: '@maya',
    date: 'Answered 2 days ago',
    status: 'Answered',
  },
  {
    id: 'my-request-2',
    title: 'The Bear season 3 scenepack',
    type: 'Scenepack',
    requester: 'Maya',
    handle: '@maya',
    date: 'Last week',
    status: 'Open',
  },
];

export const PROFILE_ANSWERS = [
  {
    id: 'answer-1',
    title: 'A soft blue hour overlay set',
    type: 'Asset',
    answeredBy: 'Sam Rivera',
    handle: '@samrivera',
    date: 'Answered 2 days ago',
    response: 'Added to the library',
  },
];
