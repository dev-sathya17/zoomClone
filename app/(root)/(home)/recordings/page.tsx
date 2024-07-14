import Call from "@/components/Call";
import React from "react";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <Call type="recordings" />
    </section>
  );
};

export default Recordings;
