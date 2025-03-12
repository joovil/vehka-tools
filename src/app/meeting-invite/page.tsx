"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const MeetingInvite = () => {
  const [agenda, setAgenda] = useState<string[]>([
    "Hello world",
    "Foo Bar",
    "Bada Bing",
    "Zoom zoom",
  ]);
  const [agendaItem, setAgendaItem] = useState<string>("");
  const [dragged, setDragged] = useState<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handler);

    return () => document.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (dragged !== null) {
      const els = Array.from(document.getElementsByClassName("drop-zone"));

      const positions = els.map((e) => e.getBoundingClientRect().top);
      const absDiffs = positions.map((v) => Math.abs(v - mouse[1]));

      let res = absDiffs.indexOf(Math.min(...absDiffs));

      if (res > dragged) res += 1;

      setDropZone(res);
    }
  }, [dragged, mouse]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null);

        setAgenda((items) => reorderList([...items], dragged, dropZone));
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  });

  const reorderList = <T,>(l: T[], start: number, end: number) => {
    if (start < end) return _reorderListForward([...l], start, end);
    else if (start > end) return _reorderListBackward([...l], start, end);

    return l; // if start == end
  };

  const _reorderListForward = <T,>(l: T[], start: number, end: number) => {
    const temp = l[start];

    for (let i = start; i < end; i++) {
      l[i] = l[i + 1];
    }
    l[end - 1] = temp;

    return l;
  };

  const _reorderListBackward = <T,>(l: T[], start: number, end: number) => {
    for (let i = start; i > end; i--) {
      // backward for-loop for backward movement
      l[i] = l[i - 1];
    }

    return l;
  };

  const ref = useRef(null);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDownloadImage = async () => {
    const elem = ref.current;
    if (!elem) return;
  };

  const addAgendaItem = () => {
    if (agenda.includes(agendaItem)) {
      return;
    }

    setAgenda((a) => [...a, agendaItem]);
  };

  const removeItem = (item: string) => {
    setAgenda((a) => a.filter((i) => i !== item));
  };

  return (
    <main>
      <h1>Kokouskutsu</h1>
      <form onSubmit={handleForm}>
        <label className="block">Aika</label>
        <input
          name="time"
          type="datetime-local"
          className="pb-2"
        />

        <div className="flex flex-col">
          <label>Esityslista</label>
          <input
            onChange={(e) => setAgendaItem(e.currentTarget.value)}
            value={agendaItem}
            type="text"
            className="bg-amber-200"
          />
          <button onClick={addAgendaItem}>Lisää</button>

          <>
            {/* FLOATING ITEM */}
            {dragged !== null && (
              <div
                className="absolute"
                style={{ left: `${mouse[0]}px`, top: `${mouse[1]}px` }}
              >
                {agenda[dragged]}
              </div>
            )}
            {/* MAIN LIST */}
            <div className="list">
              <div
                className={`list-item drop-zone ${
                  dragged === null || dropZone !== 0 ? "hidden" : ""
                }`}
              />
              {agenda.map((item, index) => (
                <Fragment key={item}>
                  {dragged !== index && (
                    <>
                      <div
                        className="list-item"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setDragged(index);
                        }}
                      >
                        {item}
                      </div>
                      <div
                        className={`list-item drop-zone ${
                          dragged === null || dropZone !== index + 1
                            ? "hidden"
                            : ""
                        }`}
                      />
                    </>
                  )}
                </Fragment>
              ))}
            </div>
          </>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-md"
        >
          {/* Fin */}
          {/* <MeetingForm
            lang="Fin"
            place="Paikka"
            agenda="Esityslista"
            info="Lisätietoja"
          /> */}

          {/* Eng */}
          {/* <MeetingForm
            lang="Eng"
            place="Place"
            agenda="Agenda"
            info="Further information"
          /> */}
        </div>
        <button className="btn-primary mt-2">Finish</button>
      </form>

      {/* Previev */}
      <h2>Esikatselu</h2>
      <button onClick={handleDownloadImage}>Test pdf</button>

      {/* PDF */}
      {/* <Invite
        ref={ref}
        formData={formData}
      /> */}
    </main>
  );
};
export default MeetingInvite;
