"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="mb-10">
      <ul className="flex items-center justify-center gap-5 p-3 bg-orange-300">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/">SignUp</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        {session?.user?.email && (
          <li>
            <Button onClick={() => signOut()} variant="destructive">
              Logout
            </Button>
          </li>
        )}
        <li>{session?.user?.name}</li>
      </ul>
    </div>
  );
};

export default Navbar;
