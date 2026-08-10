'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import AppShell from '@/components/site/app-shell';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

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

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [username, setUsername] = useState('maya');
  const [email, setEmail] = useState('maya@edithub.app');
  const [newPassword, setNewPassword] = useState('');
  const [notifPrefs, setNotifPrefs] = useState({
    category: true,
    favourite: true,
    downloads: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated');
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

            {/* Account */}
            <SectionCard
              title="Account"
              description="Update your username, email, and password."
            >
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
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
              description="EditHub is a free resource hub for creative editors."
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-muted-foreground flex-none mt-0.5" />
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  All assets, scenepacks, presets, and audios on EditHub are free
                  to download. Scenepacks are provided under fair use for creative
                  editing purposes.
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
