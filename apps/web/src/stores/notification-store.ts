"use client";

import { create } from "zustand";

type Notification = {
  id: string;
  type: "order" | "offer" | "wishlist" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type NotificationStore = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Shipped!",
    message:
      "Your order #HRT-28451 has been shipped and will arrive by Sep 12.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "offer",
    title: "Flash Sale Alert!",
    message: "Flat 50% off on Gucci collection. Ends in 3 hours!",
    time: "4 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "wishlist",
    title: "Price Drop Alert",
    message: "An item in your wishlist just got 30% cheaper!",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "promo",
    title: "New Arrivals from Versace",
    message: "Check out the latest Versace collection, just landed!",
    time: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "Order Delivered",
    message: "Your order #HRT-27893 has been delivered successfully.",
    time: "3 days ago",
    read: true,
  },
];

function computeUnread(notifications: Notification[]) {
  return notifications.filter((n) => !n.read).length;
}

export const useNotificationStore = create<NotificationStore>()((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: computeUnread(INITIAL_NOTIFICATIONS),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return { notifications, unreadCount: computeUnread(notifications) };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
