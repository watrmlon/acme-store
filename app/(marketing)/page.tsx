import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="px-5 py-2 border-2 rounded-lg border-border bg-muted">
        <div className="flex items-center gap-x-4">
          <h1 className="text-lg font-medium">Welcome to PeakBuy</h1>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant='default' size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
