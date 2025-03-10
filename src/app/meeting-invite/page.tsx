"use client";

const MeetingInvite = () => {
  const formDataEng = new FormData();
  const formDataFin = new FormData();

  return (
    <main>
      <h1>Kokouskutsu</h1>
      {/* Finnish */}
      <div className="grid grid-cols-2 gap-6">
        <MeetingForm
          formData={formDataEng}
          time="Aika"
          place="Paikka"
          agenda="Esityslista"
          info="Lisätietoja"
        />

        <MeetingForm
          formData={formDataFin}
          time="Time"
          place="Place"
          agenda="Agenda"
          info="Further information"
        />
      </div>
      <button className="btn-primary">Finish</button>

      {/* English */}
      <div></div>
    </main>
  );
};
export default MeetingInvite;

const MeetingForm = ({
  formData,
  time,
  place,
  agenda,
  info,
}: {
  formData: FormData;
  time: string;
  place: string;
  agenda: string;
  info: string;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      time: { value: Date };
      place: { value: string };
      agenda: { value: string[] };
      info: { value: string };
    };

    formData.set("time", target.time.value.toString());
    formData.set("place", target.place.value);
    formData.set("agenda", target.agenda.value.join(","));
    formData.set("info", target.info.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col [&>input]:bg-red-300 [&>label]:text-lg"
    >
      <label>{time}</label>
      <input
        name="time"
        type="datetime-local"
      />
      <label>{place}</label>
      <input
        name="place"
        type="text"
      />
      <label>{agenda}</label>
      <input type="text" />
      <label>{info}</label>
      <textarea />
      <button>test</button>
    </form>
  );
};
