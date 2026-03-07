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
    <div ref={containerRef} className="relative flex h-screen overflow-hidden">
      <div
        className="overflow-y-auto border-r p-10"
        style={{ width: `${sidebarWidth}%`, scrollbarGutter: "stable" }}
      >
        <MenuItems />
        {sidebar}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="z-10 w-1 cursor-col-resize bg-gray-300 transition-colors hover:bg-blue-400 active:bg-blue-500"
      />
      <div
        className="flex items-center justify-center bg-gray-100 p-10"
        style={{ width: `${100 - sidebarWidth}%` }}
      >
        <div className="aspect-[1/1.4142] h-full max-h-full overflow-y-auto bg-white shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
