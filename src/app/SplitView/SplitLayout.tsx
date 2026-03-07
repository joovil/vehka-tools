"use client";

import { useCallback, useRef, useState } from "react";
import MenuItems from "../MenuItems";

export default function SplitLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const [sidebarWidth, setSidebarWidth] = useState(40); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setSidebarWidth(Math.min(Math.max(newWidth, 20), 80));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen overflow-hidden"
    >
      <div
        className="overflow-y-auto bg-gray-50 px-6 py-6"
        style={{ width: `${sidebarWidth}%`, scrollbarGutter: "stable" }}
      >
        <MenuItems />
        <div className="mt-2">{sidebar}</div>
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="group z-10 flex w-2 cursor-col-resize items-center justify-center bg-gray-200 transition-colors hover:bg-blue-300 active:bg-blue-400"
      >
        <div className="flex flex-col gap-1">
          <span className="h-1 w-1 rounded-full bg-gray-400 transition-colors group-hover:bg-blue-500" />
          <span className="h-1 w-1 rounded-full bg-gray-400 transition-colors group-hover:bg-blue-500" />
          <span className="h-1 w-1 rounded-full bg-gray-400 transition-colors group-hover:bg-blue-500" />
          <span className="h-1 w-1 rounded-full bg-gray-400 transition-colors group-hover:bg-blue-500" />
          <span className="h-1 w-1 rounded-full bg-gray-400 transition-colors group-hover:bg-blue-500" />
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-gray-200/60 p-8"
        style={{ width: `${100 - sidebarWidth}%` }}
      >
        <div className="aspect-[1/1.4142] h-full max-h-full overflow-y-auto rounded bg-white shadow-xl ring-1 ring-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}
