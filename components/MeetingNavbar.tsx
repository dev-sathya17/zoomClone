"use client";
import React, { useState } from "react";
import Card from "./Card";
import { meetingNavLinks } from "@/constants/MeetingNavLinks";

const MeetingNavbar = () => {
  const [meetingType, setMeetingType] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const handleClick = (
    type:
      | "isScheduleMeeting"
      | "isJoiningMeeting"
      | "isInstantMeeting"
      | undefined
  ) => {
    setMeetingType(type);
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingNavLinks.map((link, index) => (
        <Card key={index} handleClick={handleClick} link={link} />
      ))}
    </section>
  );
};

export default MeetingNavbar;
