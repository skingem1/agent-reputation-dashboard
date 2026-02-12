"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, Zap, LogIn } from "lucide-react";
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
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">
              Agent<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Rep</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Auth: Register button or User menu */}
            {!loading && (
              <>
                {user ? (
                  <UserMenu user={user} onSignOut={signOut} />
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden gap-1.5 sm:inline-flex"
                    onClick={() => setShowSignIn(true)}
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Login
                  </Button>
                )}
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="mt-8 flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                        pathname === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile: Login / Sign out */}
                  {!loading && !user && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 gap-1.5"
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
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
                      >
                        Register Agent
                      </Link>
                      <button
                        onClick={() => {
                          setOpen(false);
                          signOut();
                        }}
                        className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-accent"
                      >
                        Sign Out
                      </button>
                    </>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="justify-start gap-2"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Sign-in dialog */}
      <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />
    </>
  );
}
