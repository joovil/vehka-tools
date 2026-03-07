import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Home = async () => {
  const t = await getTranslations();

  return (
    <main className="home-page">
      <div>
        <h2>{t("nav.meetingsAndEvents")}</h2>
        <Link href={"/meeting-invite"}>{t("nav.meetingInvite")}</Link>
        <Link href={"/minutes"}>{t("nav.minutes")}</Link>
      </div>

      <div>
        <h2>{t("nav.spacesAndItems")}</h2>
        <Link href={"/inventory"}>{t("nav.inventory")}</Link>
      </div>

      <div>
        <h2>{t("nav.budgetAndAccounting")}</h2>
        <Link href={"/accounting"}>{t("nav.accountingForm")}</Link>
      </div>

      <div>
        <h2>{t("nav.earlyYearMaterials")}</h2>
        <a href="https://hoas.fi/app/uploads/2024/01/ASUKASKOKOUSPOYTAKIRJA.pdf">
          {t("nav.residentMeetingMinutes")}
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Asukaskokouksen-osallistuja-ja-yhteystietolomake-FI-EN.pdf">
          {t("nav.residentMeetingContactForm")}
        </a>
      </div>

      <div>
        <h2>{t("nav.documents")}</h2>
        <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimintaopas.pdf">
          {t("nav.committeeGuide")}
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Tapahtumien-osallistujalista-FI-EN.pdf">
          {t("nav.eventParticipantList")}
        </a>
        <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimikuntien-avainlainalomake-2.pdf">
          {t("nav.keyForm")}
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Asukastoimikunnan-korvausvastuuhinnasto-FI-EN.pdf">
          {t("nav.compensationPriceList")}
        </a>
      </div>
    </main>
  );
};

export default Home;
