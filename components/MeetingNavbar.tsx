"use client";
import React, { useState } from "react";
import Card from "./Card";
import { meetingNavLinks } from "@/constants/MeetingNavLinks";
import Modal from "./Modal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const MeetingNavbar = () => {
  const [meetingType, setMeetingType] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const handleClick = (
    type:
      | "isScheduleMeeting"
      | "isJoiningMeeting"
      | "isInstantMeeting"
      | undefined
  ) => {
    setMeetingType(type);
  };

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create Calls");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingNavLinks.map((link, index) => (
        <Card key={index} handleClick={handleClick} link={link} />
      ))}
      <Modal
        isOpen={meetingType === "isInstantMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Start an Instant Meeting."
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingNavbar;
