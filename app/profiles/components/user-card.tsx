"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

interface UserCardProps {}

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

const UserCard: FC<UserCardProps> = ({}) => {
  const [imgSrc, setImgSrc] = useState("");
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    setImgSrc(images[Math.floor(Math.random() * 4)]);
  }, []);

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div onClick={() => selectProfile()}>
      <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          {imgSrc && (
            <img
              draggable={false}
              className="w-max h-max object-contain"
              src={imgSrc}
              alt=""
            />
          )}
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
          {currentUser?.name}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
