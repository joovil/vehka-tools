"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItems from "../MenuItems";

type MobileTab = "form" | "preview";

export default function SplitLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const t = useTranslations();
  const [sidebarWidth, setSidebarWidth] = useState(40);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>("form");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 rounded-none px-4 py-3 text-sm font-bold shadow-none transition-colors ${
              activeTab === "form"
                ? "border-teal-dark text-teal-darker border-b-2 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("splitView.form")}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 rounded-none px-4 py-3 text-sm font-bold shadow-none transition-colors ${
              activeTab === "preview"
                ? "border-teal-dark text-teal-darker border-b-2 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("splitView.preview")}
          </button>
        </div>

        {/* Content */}
        {activeTab === "form" ? (
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
            <MenuItems />
            <div className="mt-2">{sidebar}</div>
          </div>
        ) : (
          <div className="flex flex-1 items-start justify-center overflow-y-auto bg-gray-200/60 p-4">
            <div className="w-full max-w-lg rounded bg-white shadow-xl ring-1 ring-gray-200">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }

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
