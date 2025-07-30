import MenuItems from "../MenuItems";

export default function SplitLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div
        className="flex-2/5 overflow-y-auto border-1 p-10"
        style={{ scrollbarGutter: "stable" }}
      >
        <MenuItems />
        {sidebar}
      </div>
      <div className="flex-4/5 overflow-y-scroll p-10">
        <div className="aspect-[1/1.4] max-w-[1000px] bg-white shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
