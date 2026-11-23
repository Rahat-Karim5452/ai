"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CalendarCheck,
  CirclePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const userLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-studio", label: "Add New Studio", icon: CirclePlus },
  { href: "/my-listings", label: "My Studio Listings", icon: Building2 },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Left: logo */}
        <Logo />

        {/* Center: primary links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-brand",
                  isActive(link.href)
                    ? "border-b-2 border-brand pb-0.5 font-medium text-brand"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: theme + account */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <span className="size-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                openOnHover
                aria-label="Open account menu"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar>
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                {userLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    <link.icon />
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleSignout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="ghost"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Login
              </Button>
              <Button render={<Link href="/register" />} nativeButton={false}>
                Register
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border px-6 py-4 lg:hidden">
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm",
                    isActive(link.href)
                      ? "bg-muted font-medium text-brand"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {!isPending && !user && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
              <Button
                variant="outline"
                render={<Link href="/login" />}
                nativeButton={false}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Button>
              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
