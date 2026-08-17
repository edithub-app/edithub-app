'use client';

import AppShell from '@/components/site/app-shell';
import { Bell, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

const notifications = [
  {
    id: 'notification-1',
    icon: MessageCircle,
    title: 'Jules answered a request',
    description: 'Dreamy vocal loop for edits has a new response.',
    date: 'Today',
    unread: true,
  },
  {
    id: 'notification-2',
    icon: CheckCircle2,
    title: 'Your request was approved',
    description: 'Blue hour overlay set was added to the library.',
    date: '2 days ago',
    unread: false,
  },
  {
    id: 'notification-3',
    icon: Sparkles,
    title: 'Your profile boost is ready',
    description: 'Boost your profile again when your two-week cooldown ends.',
    date: 'Last week',
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <AppShell>
      <main className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-secondary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-[26px] font-semibold tracking-tight">Notifications</h1>
              <p className="mt-1 text-[14px] text-muted-foreground">Stay up to date with your EditHub activity.</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card/50">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div key={notification.id} className="flex items-start gap-4 border-b border-border/60 p-5 last:border-b-0">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[14px] font-medium">{notification.title}</p>
                      <span className="text-[12px] text-muted-foreground">{notification.date}</span>
                    </div>
                    <p className="mt-1 text-[13px] leading-5 text-muted-foreground">{notification.description}</p>
                  </div>
                  {notification.unread && <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent" />}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
