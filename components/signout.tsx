"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function signout() {
  return (
    <button className="h-10 w-full bg-white" onClick={() => signOut()}>
      Logout!
    </button>
  );
}
