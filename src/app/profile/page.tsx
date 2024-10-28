import React from "react";
import { auth } from "@/auth";
import authWrapper from "@/lib/authWrapper";

const ProfilePage = async () => {
  const session = await auth();
  console.log(session?.user);
  return (
    <div>
      <h1 className="text-xl m-10 p-5">User name: {session?.user?.name}</h1>
      <h1 className="text-xl m-10 p-5">User email: {session?.user?.email}</h1>
    </div>
  );
};

export default authWrapper(ProfilePage);
