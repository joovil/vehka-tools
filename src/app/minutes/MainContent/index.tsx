"use client";

import { MinutesProps } from "../page";

export interface Examiners {
  examiner1: string;
  examiner2: string;
}

export interface Signatures extends Examiners {
  chairman: string;
  secretary: string;
}

export interface Location {
  address: string;
  precise: string;
}

export interface NewMember {
  name: string;
  role: string;
}

const MinutesContent = ({ data, setData }: MinutesProps) => {
  return (
    <div>
      <button onClick={() => setData({ ...data, test: "asd" })}>test</button>
      <>MainContent</>
    </div>
  );
  // const [disabled, setDisabled] = useState<boolean>(false);
  // const [minuteNumber, setMinuteNumber] = useState<number>(0);
  // const [attendants, setAttendants] = useState<string[]>([]);
  // const [items, setItems] = useState<string[]>([]);
  // const [other, setOther] = useState<string[]>([]);
  // const [location, setLocation] = useState<Location>({
  //   address: "",
  //   precise: "",
  // });
  // const [startTime, setStartTime] = useState<DateTime>({
  //   date: "",
  //   time: "",
  // });
  // const [examiners, setExaminers] = useState<Examiners>({
  //   examiner1: "",
  //   examiner2: "",
  // });
  // const [newMembers, setNewMembers] = useState<NewMember[]>([]);
  // const [nextMeeting, setNextMeeting] = useState<DateTime>({
  //   date: "",
  //   time: "",
  // });
  // const [meetingEnd, setMeetingEnd] = useState<DateTime>({
  //   date: "",
  //   time: "",
  // });
  // const [signatures, setSignatures] = useState<Signatures>({
  //   chairman: "",
  //   secretary: "",
  //   examiner1: "",
  //   examiner2: "",
  // });

  // const handleDate = (
  //   setter: React.Dispatch<React.SetStateAction<DateTime>>,
  // ) => {
  //   const date = new Date();
  //   const startDate = `${date.getDate()}.${
  //     date.getMonth() + 1
  //   }.${date.getFullYear()}`;

  //   const minutes = date.getMinutes();
  //   const startTime = `${date.getHours()}.${
  //     (minutes < 10 ? "0" : "") + minutes
  //   }`;

  //   setter({ date: startDate, time: startTime });
  // };

  // const handlePdfDownload = () => {
  //   DownloadPdf(
  //     `Kokouspöytäkirja-${startTime.date}`,
  //     <MinutePdf
  //       minuteNumber={minuteNumber}
  //       location={location}
  //       attendants={attendants}
  //       items={items}
  //       other={other}
  //       startTime={startTime}
  //       examiners={examiners}
  //       newMembers={newMembers}
  //       meetingEnd={meetingEnd}
  //       nextMeeting={nextMeeting}
  //       signatures={signatures}
  //     />,
  //   );
  // };

  // const endMeeting = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   handlePdfDownload();
  //   setDisabled(true);
  // };

  // return (
  //   <section>
  //     <h1 className="mb-2">Kokouspöytäkirja</h1>
  //     <form
  //       className="minute-form"
  //       onSubmit={(e) => endMeeting(e)}
  //     >
  //       <div className="minute-part">
  //         <h2>Kokouksen sijainti</h2>

  //         <div className="gap-sm flex flex-col">
  //           <label>Kiinteistön osoite</label>
  //           <input
  //             placeholder="Kiinteistön osoite"
  //             type="text"
  //             onChange={(e) =>
  //               setLocation({ ...location, address: e.currentTarget.value })
  //             }
  //             value={location.address}
  //             required
  //           />
  //         </div>

  //         <div className="gap-sm flex flex-col">
  //           <label>Tarkka sijainti</label>
  //           <input
  //             placeholder="Tarkka sijainti"
  //             type="text"
  //             onChange={(e) =>
  //               setLocation({ ...location, precise: e.currentTarget.value })
  //             }
  //             value={location.precise}
  //             required
  //           />
  //         </div>
  //       </div>

  //       <div className="minute-part">
  //         <h2>Läsnäolijat</h2>
  //         <DynamicInputList
  //           label="Läsnäolija"
  //           buttonLabel="Lisää läsnäolija"
  //           placeholder="Läsnäolija"
  //           items={attendants}
  //           setItems={setAttendants}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <h2>Kokouksen avaus</h2>
  //         <button
  //           onClick={() => handleDate(setStartTime)}
  //           disabled={!!startTime.date}
  //           className="mt-1"
  //         >
  //           Avaa kokous
  //         </button>
  //         {startTime.date && (
  //           <>
  //             <h3>Kokous avattu</h3>
  //             <div>{startTime.date}</div>
  //             <div>Kello: {startTime.time}</div>
  //           </>
  //         )}
  //       </div>

  //       <div className="minute-part">
  //         <label>Pöytäkirjan numero</label>
  //         <input
  //           placeholder="Pöytäkirjan numero"
  //           type="number"
  //           min="0"
  //           step="1"
  //           onChange={(e) =>
  //             setMinuteNumber(parseInt(e.currentTarget.value, 10))
  //           }
  //           required
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <h2>Pöytäkirjan tarkastajat</h2>
  //         <MeetingExaminers
  //           examiners={examiners}
  //           setExaminers={setExaminers}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <h2>Hankinnat</h2>
  //         <DynamicInputList
  //           label="Hankinta"
  //           buttonLabel="Lisää hankinta"
  //           placeholder="Hankinta"
  //           items={items}
  //           setItems={setItems}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <h2>Muut asiat</h2>
  //         <DynamicInputList
  //           label="Muu päätettävä asia"
  //           buttonLabel="Lisää muu asia"
  //           placeholder="Muu asia"
  //           items={other}
  //           setItems={setOther}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <h2>Uudet jäsenet</h2>
  //         <AddNewMember
  //           setNewMembers={setNewMembers}
  //           newMembers={newMembers}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <label>Seuraavan kokouksen ajankohta</label>
  //         <div className="relative">
  //           <div className="relative">
  //             <DatePicker setNextMeeting={setNextMeeting} />
  //           </div>
  //           <input
  //             // Hide empty input field under DatePicker to show required warning
  //             className="absolute top-0 left-0 -z-10"
  //             value={nextMeeting.date}
  //             required
  //             tabIndex={-1}
  //             onChange={() => ""}
  //           />
  //         </div>
  //       </div>

  //       <div className="minute-part [&>div]:gap-sm [&>div]:flex [&>div]:flex-col">
  //         <h2>Allekirjoitukset</h2>
  //         <MeetingSignatures
  //           signatures={signatures}
  //           setSignatures={setSignatures}
  //         />
  //       </div>

  //       <div className="minute-part">
  //         <label>Kokouksen päättäminen</label>
  //         <button
  //           type="submit"
  //           onClick={() => {
  //             handleDate(setMeetingEnd);
  //           }}
  //           disabled={disabled}
  //         >
  //           Päätä kokous
  //         </button>
  //       </div>
  //     </form>

  //     <div className="gap-md mt-4 mb-2 flex items-end">
  //       <h2>Esikatselu</h2>

  //       <button
  //         onClick={handlePdfDownload}
  //         disabled={!disabled}
  //       >
  //         Lataa pöytäkirja
  //       </button>
  //     </div>

  //     <Preview
  //       minuteNumber={minuteNumber}
  //       location={location}
  //       attendants={attendants}
  //       items={items}
  //       other={other}
  //       startTime={startTime}
  //       examiners={examiners}
  //       newMembers={newMembers}
  //       meetingEnd={meetingEnd}
  //       nextMeeting={nextMeeting}
  //       signatures={signatures}
  //     />

  //     {false && (
  //       <PdfPreview>
  //         <MinutePdf
  //           minuteNumber={minuteNumber}
  //           location={location}
  //           attendants={attendants}
  //           items={items}
  //           other={other}
  //           startTime={startTime}
  //           examiners={examiners}
  //           newMembers={newMembers}
  //           meetingEnd={meetingEnd}
  //           nextMeeting={nextMeeting}
  //           signatures={signatures}
  //         />
  //       </PdfPreview>
  //     )}
  //   </section>
  // );
};

export default MinutesContent;
