"use client";

import { RefObject } from "react";

const Invite = ({ ref }: { ref: RefObject<null> }) => {
  return (
    <div
      ref={ref}
      className="border-2"
    >
      <h1>Kutsu</h1>

      <div>
        <h2>Paikka</h2>
      </div>

      <div></div>
    </div>
  );
};

export default Invite;
