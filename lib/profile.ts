export const PROFILE = {
  name: 'Maya',
  handle: '@maya',
  avatarUrl: '/mayas-logo.jpg',
  bannerUrl: '/download_(29).jpg',
};

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
