import React from "react";
import { auth } from "@/auth";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="text-xl m-10 p-5">User name: {session?.user?.name}</h1>
    </div>
  );
};

export default ProfilePage;
