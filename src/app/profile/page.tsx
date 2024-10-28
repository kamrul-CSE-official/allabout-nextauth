import { auth } from "@/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) return <p>Access Denied</p>;
  return (
    <div className="container mx-auto">
      <p className="text-xl">Welcome, {session.user?.name}!</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default ProfilePage;
