// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md dark:bg-zinc-900 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        CoreCircle
      </Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
            <Link href="/register" className="text-blue-600">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
