//@ts-nocheck

"use client";
import { useFetchCalls } from "@/hooks/useFetchCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import Meeting from "./Meeting";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

const Call = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useFetchCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };
  const getCallsErrorMessage = () => {
    switch (type) {
      case "upcoming":
        return "No Upcoming Calls";
      case "ended":
        return "No Ended Calls";
      case "recordings":
        return "No Recordings";
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const calls = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = calls
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ type: "error", message: "Try again later" });
      }
    };
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const callsMessage = getCallsErrorMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          return (
            <Meeting
              key={(meeting as Call).id}
              icon={
                type === "ended"
                  ? "icons/previous.svg"
                  : type === "upcoming"
                  ? "icons/upcoming.svg"
                  : "icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description?.substring(
                  0,
                  26
                ) ||
                meeting.filename?.substring(0, 20) ||
                "No description"
              }
              date={
                meeting.state?.startsAt.toLocaleString() ||
                meeting.start_time.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              handleClick={
                type === "recordings"
                  ? () => router.push(`${meeting.url}`)
                  : () => {
                      console.log(`/meeting/${meeting.id}`);
                      router.push(`/meeting/${meeting.id}`);
                    }
              }
              link={
                type === "recordings"
                  ? meeting.url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-white">{callsMessage}</h1>
      )}
    </div>
  );
};

export default Call;
