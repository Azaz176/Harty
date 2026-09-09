"use client";

import { useState, useCallback } from "react";
import { Navbar } from "./navbar";
import { CommandPalette } from "./command-palette";
import { AuthModal } from "./auth-modal";
import { NotificationDrawer } from "./notification-drawer";
import { Chatbot } from "./chatbot";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);

  return (
    <>
      <Navbar
        onSearchOpen={handleSearchOpen}
        onAuthOpen={() => setAuthOpen(true)}
        onNotificationsOpen={() => setNotificationsOpen(true)}
      />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <NotificationDrawer open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <main className="pt-[112px]">{children}</main>
      <Chatbot />
    </>
  );
}
