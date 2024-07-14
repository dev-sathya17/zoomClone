import React, { ReactNode } from "react";
import StreamClientProvider from "../../providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boom",
  description: "Video Calling App like Zoom",
  icons: {
    icon: "/icon/logo.svg",
  },
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
