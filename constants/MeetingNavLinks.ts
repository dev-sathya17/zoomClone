export interface MeetingNavLink {
  title: string;
  description: string;
  icon: string;
  color: string;
  type?:
    | "isScheduleMeeting"
    | "isJoiningMeeting"
    | "isInstantMeeting"
    | undefined;
  isRecording?: boolean;
}

export const meetingNavLinks: MeetingNavLink[] = [
  {
    title: "New Meeting",
    description: "Start an instant meeting.",
    icon: "/icons/add-meeting.svg",
    color: "bg-orange-1",
    type: "isInstantMeeting",
  },
  {
    title: "Join Meeting",
    description: "via an invitation link",
    icon: "/icons/join-meeting.svg",
    color: "bg-blue-1",
    type: "isJoiningMeeting",
  },
  {
    title: "Schedule Meeting",
    description: "Plan your meeting.",
    icon: "/icons/schedule.svg",
    color: "bg-purple-1",
    type: "isScheduleMeeting",
  },
  {
    title: "View Recordings",
    description: "Check out your recordings.",
    icon: "/icons/recordings.svg",
    color: "bg-yellow-1",
    isRecording: true,
  },
];
