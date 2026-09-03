"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./components/AuthProvider";
import useConfirmModal from "./components/useConfirmModal";

const MenuItems = () => {
  const t = useTranslations();
  const { isLoggedIn, committeeName, loading, logout } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { ConfirmModal, confirmModalControls } = useConfirmModal(
    t("confirmModal.loginPromptGeneric"),
  );

  return (
    <div className="mb-4">
      {ConfirmModal}

      {/* Auth control. Hidden while the session is still being checked so an
          already logged-in user never sees a flash of "Log in". */}
      {!loading && (
        <div className="mb-2 flex items-center justify-between gap-2 text-sm">
          {isLoggedIn ? (
            <>
              <span className="truncate">
                {t("auth.loggedInAs", { name: committeeName ?? "" })}
              </span>
              <button
                onClick={logout}
                className="shrink-0 text-sm"
              >
                {t("auth.logOut")}
              </button>
            </>
          ) : (
            <button
              onClick={() => confirmModalControls.showModal()}
              className="ml-auto shrink-0 text-sm"
            >
              {t("auth.logIn")}
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => setIsOpen((b) => !b)}
        className="bg-teal-dark/10 text-teal-darker hover:bg-teal-dark/20 flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-bold shadow-sm transition-all"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        {isOpen ? t("closeMenu") : t("openMenu")}
      </button>

      <nav
        className="[&_a]:text-teal-darker mt-1 flex flex-col gap-3 overflow-hidden rounded-md bg-white/60 px-4 transition-all duration-300 ease-in-out [&_a]:underline-offset-2 [&_a:hover]:underline [&_div]:flex [&_div]:flex-col [&_div]:gap-0.5 [&_h2]:mt-2 [&_h2]:mb-0.5 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-gray-500 [&_h2]:uppercase"
        style={{
          maxHeight: isOpen ? "800px" : "0",
          paddingTop: isOpen ? "12px" : "0",
          paddingBottom: isOpen ? "12px" : "0",
        }}
      >
        <div>
          <h2>{t("nav.meetingsAndEvents")}</h2>
          <Link href={"/minutes"}>{t("nav.minutes")}</Link>
          <Link href={"/meeting-invite"}>{t("nav.meetingInvite")}</Link>
        </div>

        <div>
          <h2>{t("nav.spacesAndItems")}</h2>
          <Link href={"/inventory"}>{t("nav.inventory")}</Link>
        </div>

        <div>
          <h2>{t("nav.budgetAndAccounting")}</h2>
          <Link href="/accounting">{t("nav.accountingForm")}</Link>
        </div>

        <div>
          <h2>{t("nav.earlyYearMaterials")}</h2>
          <Link href="/resident-meeting-minutes">
            {t("nav.residentMeetingMinutes")}
          </Link>
          <Link href="/resident-meeting-contact">
            {t("nav.residentMeetingContactForm")}
          </Link>
        </div>

        <div>
          <h2>{t("nav.documents")}</h2>
          <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimintaopas.pdf">
            {t("nav.committeeGuide")}
          </a>
          <Link href="/event-participants">
            {t("nav.eventParticipantList")}
          </Link>
          <Link href="/key-form">{t("nav.keyForm")}</Link>
          <Link href="/compensation-prices">
            {t("nav.compensationPriceList")}
          </Link>
          {isLoggedIn && (
            <Link href="/documents">{t("nav.committeeDocuments")}</Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MenuItems;
