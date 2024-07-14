import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CardType {
  handleClick: (
    type:
      | "isScheduleMeeting"
      | "isJoiningMeeting"
      | "isInstantMeeting"
      | undefined
  ) => void;
  link: {
    title: string;
    description: string;
    icon: string;
    color: string;
    type?:
      | "isScheduleMeeting"
      | "isJoiningMeeting"
      | "isInstantMeeting"
      | undefined;
    isRecording?: boolean | undefined;
  };
}

const Card = ({ link, handleClick }: CardType) => {
  const router = useRouter();

  const navigate = () => {
    router.push("/recordings");
  };
  return (
    <div
      onClick={
        link.isRecording ? () => navigate() : () => handleClick(link.type)
      }
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        {
          "bg-orange-1": link.color === "bg-orange-1",
          "bg-blue-1": link.color === "bg-blue-1",
          "bg-purple-1": link.color === "bg-purple-1",
          "bg-yellow-1": link.color === "bg-yellow-1",
        }
      )}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={link.icon} width={27} height={27} alt={link.title} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{link.title}</h1>
        <p className="text-lg font-normal">{link.description}</p>
      </div>
    </div>
  );
};

export default Card;
