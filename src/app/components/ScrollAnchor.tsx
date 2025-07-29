"use client";

const ScrollAnchor = ({ id, offset }: { id: string; offset?: string }) => {
  return (
    <div className="relative">
      <div
        className="absolute"
        style={{ top: offset }}
        id={id}
      ></div>
    </div>
  );
};

export default ScrollAnchor;
