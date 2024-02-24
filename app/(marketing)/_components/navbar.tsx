'use client';

import { SignInButton, UserButton, useClerk } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import { Logo } from './logo';

export const Navbar = () => {
  const { user } = useClerk();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && !user && <Navbar.Skeleton />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get JustNote free</Button>
            </SignInButton>
          </>
        )}
        {isLoading && user && <Navbar.SkeletonLogin />}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter JustNote</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

Navbar.Skeleton = function SkeletonNavbar() {
  return (
    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
      <Skeleton className="h-8 w-[58px]" />
      <Skeleton className="h-8 w-[125px]" />
      <div className="flex md:hidden" />
    </div>
  );
};

Navbar.SkeletonLogin = function SkeletonNavbarLogin() {
  return (
    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
      <Skeleton className="h-8 w-[110px]" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex md:hidden" />
    </div>
  );
};
