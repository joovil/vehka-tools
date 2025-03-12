"use client";

const MeetingInvite = () => {
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(formData);

    const formValues = Object.fromEntries(formData);
    console.log(formValues);
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

        <div className="grid grid-cols-2 gap-md">
          {/* Fin */}
          <MeetingForm
            place="Paikka"
            agenda="Esityslista"
            info="Lisätietoja"
          />

          {/* Eng */}
          <MeetingForm
            place="Place"
            agenda="Agenda"
            info="Further information"
          />
        </div>
        <button className="btn-primary mt-2">Finish</button>
      </form>
      <div></div>
    </main>
  );
};
export default MeetingInvite;

const MeetingForm = ({
  place,
  agenda,
  info,
}: {
  place: string;
  agenda: string;
  info: string;
}) => {
  return (
    <div className="meeting-form-wrapper bg-red-300">
      <div>
        <label>{place}</label>
        <input
          name="place"
          type="text"
        />
      </div>

      <div>
        <label>{agenda}</label>
        <input
          name="esityslista"
          type="text"
        />
      </div>

      <div>
        <label>{info}</label>
        <textarea name="lisatietoa" />
      </div>
    </div>
  );
};
