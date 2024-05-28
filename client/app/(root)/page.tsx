"use client";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";


export default function Home() {
  const {user,isSignedIn,isLoaded} = useUser();

  useEffect(()=>{
    console.log(user);
  },[isLoaded,isSignedIn]);
  return (
    <main>
      <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </main>
  );
}
