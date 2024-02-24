'use client';

import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SignInButton } from '@clerk/clerk-react';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Doucuments, & Plans. All in One Place. Welcome to
        <span className="underline">JustNote</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        JustNote is the connected workspace where <br />
        better, faster, and more organized work happens.
      </h3>
      {isLoading && <Heading.Skeleton />}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter JustNote
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get JustNote free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

Heading.Skeleton = function SkeletonHeading() {
  return (
    <div className="flex items-center justify-center">
      <Skeleton className="h-9 w-[160px]" />
    </div>
  );
};
