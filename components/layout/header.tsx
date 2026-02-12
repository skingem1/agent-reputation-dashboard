"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogIn, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { SignInDialog } from "@/components/auth/sign-in-dialog";
import { UserMenu } from "@/components/auth/user-menu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/agents", label: "Explore Agents" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/methodology", label: "Methodology" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 glow-cyan">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-display">
              Agent<span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Rep</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan-400"
                      : "text-muted-foreground hover:text-cyan-300"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="mt-0.5 block h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <UserMenu user={user} onSignOut={signOut} />
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden gap-1.5 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-300 sm:inline-flex"
                    onClick={() => setShowSignIn(true)}
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Login
                  </Button>
                )}
              </>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-background/95 backdrop-blur-xl border-l border-cyan-500/10">
                <nav className="mt-8 flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "text-muted-foreground hover:text-cyan-300"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {!loading && !user && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 gap-1.5 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => {
                        setOpen(false);
                        setShowSignIn(true);
                      }}
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      Login
                    </Button>
                  )}
                  {!loading && user && (
                    <>
                      <Link
                        href="/agents/register"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/10"
                      >
                        Register Agent
                      </Link>
                      <button
                        onClick={() => {
                          setOpen(false);
                          signOut();
                        }}
                        className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />
    </>
  );
}
