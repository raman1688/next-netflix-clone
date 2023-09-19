import { getServerSession } from "next-auth/next";
import { FC } from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserCard from "./components/user-card";

interface ProfilesProps {}

const Profiles: FC<ProfilesProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <UserCard />
        </div>
      </div>
    </div>
  );
};

export default Profiles;
