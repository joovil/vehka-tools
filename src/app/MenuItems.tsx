"use client";

import {
  BookOpen,
  Calculator,
  ClipboardList,
  ExternalLink,
  FileText,
  Folder,
  Key,
  Languages,
  Mail,
  Package,
  Tag,
  User,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./components/AuthProvider";
import useConfirmModal from "./components/useConfirmModal";

const MenuItems = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { isLoggedIn, committeeName, loading, logout } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { ConfirmModal, confirmModalControls } = useConfirmModal(
    t("confirmModal.loginPromptGeneric"),
  );

  // The locale is read from this cookie on the server (src/i18n/request.ts),
  // so refreshing re-renders the page with the other language's messages.
  const switchLanguage = () => {
    const next = locale === "fi" ? "en" : "fi";
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <div className="mb-4">
      {ConfirmModal}

      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <button
          onClick={switchLanguage}
          aria-label={t("languageSwitch.ariaLabel")}
          className="flex shrink-0 items-center gap-1 text-sm"
        >
          <Languages className="size-4 shrink-0" />
          {t("languageSwitch.label")}
        </button>
        {/* Auth control. Hidden while the session is still being checked so an
            already logged-in user never sees a flash of "Log in". */}
        {!loading && (
          <div className="flex min-w-0 items-center gap-2">
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
                className="shrink-0 text-sm"
              >
                {t("auth.logIn")}
              </button>
            )}
          </div>
        )}
      </div>
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
        className="[&_a]:text-teal-darker mt-1 flex flex-col gap-3 overflow-hidden rounded-md bg-white/60 px-4 transition-all duration-300 ease-in-out [&_a]:flex [&_a]:items-center [&_a]:gap-2 [&_a]:underline-offset-2 [&_a:hover]:underline [&_div]:flex [&_div]:flex-col [&_div]:gap-0.5 [&_h2]:mt-2 [&_h2]:mb-0.5 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-gray-500 [&_h2]:uppercase"
        style={{
          maxHeight: isOpen ? "800px" : "0",
          paddingTop: isOpen ? "12px" : "0",
          paddingBottom: isOpen ? "12px" : "0",
        }}
      >
        <div>
          <h2>{t("nav.meetingsAndEvents")}</h2>
          <Link href={"/minutes"}>
            <FileText className="size-4 shrink-0" />
            {t("nav.minutes")}
          </Link>
          <Link href={"/meeting-invite"}>
            <Mail className="size-4 shrink-0" />
            {t("nav.meetingInvite")}
          </Link>
        </div>

        <div>
          <h2>{t("nav.spacesAndItems")}</h2>
          <Link href={"/inventory"}>
            <Package className="size-4 shrink-0" />
            {t("nav.inventory")}
          </Link>
        </div>

        <div>
          <h2>{t("nav.budgetAndAccounting")}</h2>
          <Link href="/accounting">
            <Calculator className="size-4 shrink-0" />
            {t("nav.accountingForm")}
          </Link>
        </div>

        <div>
          <h2>{t("nav.earlyYearMaterials")}</h2>
          <Link href="/resident-meeting-minutes">
            <ClipboardList className="size-4 shrink-0" />
            {t("nav.residentMeetingMinutes")}
          </Link>
          <Link href="/resident-meeting-contact">
            <User className="size-4 shrink-0" />
            {t("nav.residentMeetingContactForm")}
          </Link>
        </div>

        <div>
          <h2>{t("nav.documents")}</h2>
          <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimintaopas.pdf">
            <BookOpen className="size-4 shrink-0" />
            {t("nav.committeeGuide")}
            <ExternalLink className="size-3 shrink-0 opacity-60" />
          </a>
          <Link href="/event-participants">
            <Users className="size-4 shrink-0" />
            {t("nav.eventParticipantList")}
          </Link>
          <Link href="/key-form">
            <Key className="size-4 shrink-0" />
            {t("nav.keyForm")}
          </Link>
          <Link href="/compensation-prices">
            <Tag className="size-4 shrink-0" />
            {t("nav.compensationPriceList")}
          </Link>
          {isLoggedIn && (
            <Link href="/documents">
              <Folder className="size-4 shrink-0" />
              {t("nav.committeeDocuments")}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MenuItems;
