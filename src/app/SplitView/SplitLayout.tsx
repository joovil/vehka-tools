import MenuItems from "../MenuItems";

export default function SplitLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="lex-2/5 overflow-y-auto border-1 p-10"
        style={{ scrollbarGutter: "stable" }}
      >
        <MenuItems />
        {sidebar}
      </div>
      <div className="flex flex-4/5 justify-center overflow-scroll px-20 py-10">
        <div className="aspect-[1/1.4] bg-white shadow-lg">{children}</div>
      </div>
    </div>
  );
}

// aspect-[1/1.4]
