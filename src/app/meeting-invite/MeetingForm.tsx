const MeetingForm = ({
  lang,
  place,
  agenda,
  info,
}: {
  lang: string;
  place: string;
  agenda: string;
  info: string;
}) => {
  return (
    <div className="meeting-form-wrapper bg-red-300">
      <div>
        <label>{place}</label>
        <input
          name={"place" + lang}
          type="text"
        />
      </div>

      <div>
        <label>{agenda}</label>
        <input
          name={"agenda" + lang}
          type="text"
        />
      </div>

      <div>
        <label>{info}</label>
        <textarea name={"info" + lang} />
      </div>
    </div>
  );
};

export default MeetingForm;
