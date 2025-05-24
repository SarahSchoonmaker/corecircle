// components/Navbar.tsx
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/">
        <span className="text-xl font-bold">CoreCircle</span>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
