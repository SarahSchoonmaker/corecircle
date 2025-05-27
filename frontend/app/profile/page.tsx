// app/profile/page.tsx
"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Profile</h2>
      <p>{user?.name}</p>
    </div>
  );
}
