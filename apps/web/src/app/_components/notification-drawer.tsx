"use client";

import {
  Package,
  Zap,
  Heart,
  Sparkles,
  CheckCircle,
  BellOff,
} from "lucide-react";
import { Sheet } from "@harty/ui";
import { useNotificationStore } from "@/stores/notification-store";

const ICON_MAP = {
  order: Package,
  offer: Zap,
  wishlist: Heart,
  promo: Sparkles,
} as const;

const COLOR_MAP = {
  order: "text-success bg-success/10",
  offer: "text-volt bg-volt/10",
  wishlist: "text-pink-500 bg-pink-500/10",
  promo: "text-yellow bg-yellow/10",
} as const;

type NotificationDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationDrawer({
  open,
  onOpenChange,
}: NotificationDrawerProps) {
  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);

  return (
    <Sheet.Root open={open} onOpenChange={onOpenChange}>
      <Sheet.Content side="right" className="max-w-sm">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hairline px-6 pt-6 pb-4">
            <Sheet.Title>Notifications</Sheet.Title>
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs font-medium text-volt transition-colors hover:text-volt/80"
            >
              Mark all as read
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-faint">
                <BellOff className="size-10" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-hairline">
                {notifications.map((notification) => {
                  const Icon = ICON_MAP[notification.type] ?? CheckCircle;
                  const colorClass = COLOR_MAP[notification.type] ?? "text-ink-muted bg-paper-sunk";

                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      className={`flex w-full items-start gap-3 px-6 py-4 text-left transition-colors hover:bg-paper-sunk ${
                        !notification.read ? "bg-paper-sunk/50" : ""
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm ${
                              !notification.read
                                ? "font-semibold text-ink"
                                : "font-medium text-ink"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="size-2 shrink-0 rounded-full bg-volt" />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-muted line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-[11px] text-ink-faint">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  );
}
