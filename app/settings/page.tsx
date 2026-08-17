'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Sun, Moon, Mail, Lock, ArrowRight, Shield, Upload, Palette, Plus, Trash2, Instagram, Music2, Twitch, Pin, Link2 } from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  PROFILE,
  getProfileLinkKind,
  PROFILE_USERNAME_UPDATED_KEY,
  getProfileSettings,
  saveProfileSettings,
} from '@/lib/profile';
import type { ProfileLink } from '@/lib/profile';

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
      <h2 className="text-[16px] font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function getLinkIcon(link: ProfileLink) {
  switch (getProfileLinkKind(link)) {
    case 'tiktok':
      return Music2;
    case 'instagram':
      return Instagram;
    case 'behance':
      return Palette;
    case 'pinterest':
      return Pin;
    case 'twitch':
      return Twitch;
    default:
      return Link2;
  }
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [profileName, setProfileName] = useState(PROFILE.name);
  const [profileUsername, setProfileUsername] = useState(PROFILE.handle.replace(/^@/, ''));
  const [profileLinks, setProfileLinks] = useState<ProfileLink[]>(PROFILE.socials);
  const [profileAvatar, setProfileAvatar] = useState(PROFILE.avatarUrl);
  const [profileBanner, setProfileBanner] = useState(PROFILE.bannerUrl);
  const [profileBackground, setProfileBackground] = useState(PROFILE.backgroundColor);
  const [usernameUpdatedAt, setUsernameUpdatedAt] = useState<number | null>(null);
  const [email, setEmail] = useState('maya@edithub.app');
  const [newPassword, setNewPassword] = useState('');
  const [notifPrefs, setNotifPrefs] = useState({
    category: true,
    favourite: true,
    downloads: false,
  });

  useEffect(() => {
    const saved = getProfileSettings();
    setProfileName(saved.name);
    setProfileUsername(saved.handle.replace(/^@/, ''));
    setProfileLinks(saved.socials);
    setProfileAvatar(saved.avatarUrl);
    setProfileBanner(saved.bannerUrl);
    setProfileBackground(saved.backgroundColor);

    const lastUpdated = window.localStorage.getItem(PROFILE_USERNAME_UPDATED_KEY);
    if (lastUpdated) setUsernameUpdatedAt(Number(lastUpdated));
  }, []);

  const readImage = (file: File, setter: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result));
    reader.readAsDataURL(file);
  };

  const addProfileLink = () => {
    setProfileLinks((links) => [...links, { id: `link-${Date.now()}`, title: '', url: '' }]);
  };

  const updateProfileLink = (id: string, field: 'title' | 'url', value: string) => {
    setProfileLinks((links) => links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
  };

  const removeProfileLink = (id: string) => {
    setProfileLinks((links) => links.filter((link) => link.id !== id));
  };

  const usernameDaysRemaining = usernameUpdatedAt
    ? Math.max(1, Math.ceil((7 * 24 * 60 * 60 * 1000 - (Date.now() - usernameUpdatedAt)) / (24 * 60 * 60 * 1000)))
    : 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUsername = profileUsername.trim().replace(/^@+/, '');
    if (!normalizedUsername || !profileName.trim()) return;

    const current = getProfileSettings();
    const usernameChanged = normalizedUsername !== current.handle.replace(/^@/, '');
    const lastUpdated = Number(window.localStorage.getItem(PROFILE_USERNAME_UPDATED_KEY) ?? 0);
    const usernameLocked = usernameChanged && lastUpdated > 0 && Date.now() - lastUpdated < 7 * 24 * 60 * 60 * 1000;

    if (usernameLocked) {
      toast.error('Username can only be changed once a week', {
        description: `Try again in ${Math.max(1, Math.ceil((7 * 24 * 60 * 60 * 1000 - (Date.now() - lastUpdated)) / (24 * 60 * 60 * 1000)))} days.`,
      });
      return;
    }

    const nextProfile = {
      ...current,
      name: profileName.trim(),
      handle: `@${normalizedUsername}`,
      avatarUrl: profileAvatar,
      bannerUrl: profileBanner,
      backgroundColor: profileBackground,
      socials: profileLinks
        .map((link) => ({ ...link, title: link.title.trim(), url: link.url.trim() }))
        .filter((link) => link.title || link.url),
    };

    saveProfileSettings(nextProfile);
    if (usernameChanged) {
      const now = Date.now();
      window.localStorage.setItem(PROFILE_USERNAME_UPDATED_KEY, String(now));
      setUsernameUpdatedAt(now);
    }
    toast.success('Profile updated');
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account details updated');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setNewPassword('');
    toast.success('Password updated');
  };

  return (
    <AppShell>
      <div className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[26px] font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Manage your account and appearance.
          </p>

          <div className="mt-8 space-y-5">
            {/* Appearance */}
            <SectionCard
              title="Appearance"
              description="Choose how EditHub looks to you."
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">Dark mode</p>
                    <p className="text-[12px] text-muted-foreground">
                      Toggle between dark and light themes.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
            </SectionCard>

            {/* Edit account */}
            <SectionCard
              title="Edit account"
              description="Update your public profile, links, and profile artwork."
            >
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Name</Label>
                    <Input
                      id="profile-name"
                      value={profileName}
                      onChange={(event) => setProfileName(event.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-username">Username</Label>
                    <Input
                      id="profile-username"
                      value={profileUsername}
                      onChange={(event) => setProfileUsername(event.target.value)}
                      placeholder="maya"
                      required
                    />
                    <p className="text-[11px] text-muted-foreground">
                      {usernameDaysRemaining > 0
                        ? `Username changes unlock in ${usernameDaysRemaining} days.`
                        : 'You can change your username once every 7 days.'}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="profile-background">Profile card colour</Label>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      id="profile-background"
                      type="color"
                      value={profileBackground}
                      onChange={(event) => setProfileBackground(event.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-lg border border-border/60 bg-transparent p-1"
                    />
                    <Input
                      value={profileBackground}
                      onChange={(event) => setProfileBackground(event.target.value)}
                      className="max-w-36 font-mono text-[13px]"
                      aria-label="Profile card hex colour"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-secondary">
                      <img src={profileAvatar} alt="Profile preview" className="h-full w-full object-cover" />
                    </div>
                    <Label htmlFor="profile-avatar-file" className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-[13px] font-medium hover:bg-secondary">
                      <Upload className="h-3.5 w-3.5" />
                      Upload profile picture
                    </Label>
                    <input
                      id="profile-avatar-file"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) readImage(file, setProfileAvatar);
                      }}
                    />
                  </div>
                  <div>
                    <div className="aspect-[16/7] overflow-hidden rounded-2xl border border-border/60 bg-secondary">
                      <img src={profileBanner} alt="Banner preview" className="h-full w-full object-cover" />
                    </div>
                    <Label htmlFor="profile-banner-file" className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-[13px] font-medium hover:bg-secondary">
                      <Upload className="h-3.5 w-3.5" />
                      Upload banner
                    </Label>
                    <input
                      id="profile-banner-file"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) readImage(file, setProfileBanner);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-medium">Social links</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Add as many links as you like. Supported platforms get an automatic icon.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addProfileLink}
                      className="inline-flex flex-none items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-[12px] font-medium transition-colors hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {profileLinks.map((link) => {
                      const LinkIcon = getLinkIcon(link);
                      return (
                        <div key={link.id} className="flex items-center gap-2">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                            <LinkIcon className="h-4 w-4" />
                          </div>
                          <Input
                            value={link.title}
                            onChange={(event) => updateProfileLink(link.id, 'title', event.target.value)}
                            placeholder="Title"
                            aria-label="Link title"
                          />
                          <Input
                            value={link.url}
                            onChange={(event) => updateProfileLink(link.id, 'url', event.target.value)}
                            placeholder="https://…"
                            aria-label="Link URL"
                          />
                          <button
                            type="button"
                            onClick={() => removeProfileLink(link.id)}
                            aria-label={`Remove ${link.title || 'social'} link`}
                            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[14px] font-medium text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.97]"
                >
                  Save profile
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </SectionCard>

            {/* Account */}
            <SectionCard
              title="Account"
              description="Update your email and password."
            >
              <form onSubmit={handleSaveAccount} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all duration-200 active:scale-[0.97]"
                >
                  Save changes
                </button>
              </form>

              <form onSubmit={handleSavePassword} className="mt-6 pt-6 border-t border-border/60 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter a new password"
                      className="pl-9"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!newPassword}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium bg-secondary text-foreground border border-border rounded-xl hover:bg-secondary/80 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update password
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </SectionCard>

            {/* Notifications */}
            <SectionCard
              title="Notifications"
              description="Choose what you want to be notified about."
            >
              <div className="space-y-4">
                {([
                  ['category', 'Category updates', 'New assets in categories you follow'],
                  ['favourite', 'Favourite creators', 'New uploads from creators you love'],
                  ['downloads', 'Downloads', 'When your items get downloaded'],
                ] as const).map(([key, title, desc]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium">{title}</p>
                      <p className="text-[12px] text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={notifPrefs[key]}
                      onCheckedChange={(checked) =>
                        setNotifPrefs((p) => ({ ...p, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* About */}
            <SectionCard
              title="About"
              description="EditHub is a marketplace for creative editors."
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-muted-foreground flex-none mt-0.5" />
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  All scenepacks, and audios on EditHub are free
                  to download. they are provided under fair use for creative
                  editing purposes. Only approved sellers are allowed to sell and upload to maintain quality.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
