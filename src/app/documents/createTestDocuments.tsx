"use client";

// Dev-only helper: builds one PDF of every saved document type from sample
// data and stores it for the logged-in committee, so the documents page has
// something to show. Uses the same build functions and PDF components as the
// real forms, so the output matches what users would save.

import { savePdf } from "@/app/api/services/savePdf";
import { buildAccountingDocument } from "@/app/accounting/buildDocument";
import { buildCompensationDocument } from "@/app/compensation-prices/buildDocument";
import SimplePdf from "@/app/components/document/SimplePdf";
import { DocumentDefinition } from "@/app/components/document/types";
import { buildEventParticipantsDocument } from "@/app/event-participants/buildDocument";
import { buildKeyFormDocument } from "@/app/key-form/buildDocument";
import { buildInviteDocument } from "@/app/meeting-invite/buildDocument";
import MeetingInvitePdf from "@/app/meeting-invite/MainContent/invitePdf/MeetingInvitePdf";
import { buildMinutesDocument } from "@/app/minutes/buildDocument";
import MinutesPdf from "@/app/minutes/MinutesPdf";
import { buildContactFormDocument } from "@/app/resident-meeting-contact/buildDocument";
import { buildResidentMeetingDocument } from "@/app/resident-meeting-minutes/buildDocument";
import { DocumentType } from "@/types";
import { pdf } from "@react-pdf/renderer";
import { ReactElement } from "react";

type Translate = (key: string) => string;

const daysFromNow = (days: number, hour = 18) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
};

const location = { fin: "Kerhohuone, A-rappu", eng: "Club room, staircase A" };

const testDocuments = (
  t: Translate,
): Array<{
  documentType: DocumentType;
  filenameKey: string;
  // Same loose element type as downloadPdf: react-pdf wants DocumentProps,
  // but the wrapper components take their own props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: ReactElement<any>;
}> => {
  const simple = (document: DocumentDefinition) => (
    <SimplePdf document={document} />
  );

  return [
    {
      documentType: "minutes",
      filenameKey: "minutes.pdfFilename",
      element: (
        <MinutesPdf
          document={buildMinutesDocument(
            {
              minutesNumber: 3,
              location,
              timeOfMeeting: daysFromNow(-7),
              startTime: daysFromNow(-7, 18),
              endTime: daysFromNow(-7, 19),
              attendants: [
                "Matti Meikäläinen",
                "Maija Virtanen",
                "Liisa Koski",
              ],
              meetingItems: [
                { fin: "Kevätsiivous", eng: "Spring cleaning" },
                { fin: "Saunavuorojen jako", eng: "Sauna shift allocation" },
              ],
              otherItems: [{ fin: "Uusi grilli", eng: "New grill" }],
              signatures: {
                chairman: "Matti Meikäläinen",
                secretary: "Maija Virtanen",
                examiner1: "Liisa Koski",
                examiner2: "Pekka Laine",
              },
              examiners: { examiner1: "Liisa Koski", examiner2: "Pekka Laine" },
              newMembers: ["Pekka Laine"],
              nextMeeting: daysFromNow(21),
              language: "bilingual",
            },
            t,
          )}
        />
      ),
    },
    {
      documentType: "meeting-invite",
      filenameKey: "meetingInvite.pdfFilename",
      element: (
        <MeetingInvitePdf
          document={buildInviteDocument(
            {
              date: daysFromNow(14),
              location,
              agendaItems: [
                { fin: "Kokouksen avaus", eng: "Opening of the meeting" },
                { fin: "Talousarvio", eng: "Budget" },
                { fin: "Muut asiat", eng: "Other matters" },
              ],
              moreInfo: {
                fin: "Kahvitarjoilu kokouksen jälkeen.",
                eng: "Coffee served after the meeting.",
              },
              language: "bilingual",
            },
            t,
          )}
        />
      ),
    },
    {
      documentType: "accounting",
      filenameKey: "accounting.pdfFilename",
      element: simple(
        buildAccountingDocument(
          {
            name: "Maija Virtanen",
            address: "Testikatu 1 A 2, 00100 Helsinki",
            iban: "FI21 1234 5600 0007 85",
            bic: "NDEAFIHH",
            committeeRole: "Rahastonhoitaja",
            minutesNumber: "3",
            expenses: [
              {
                category: "701",
                description: "Kahvitarjoilu",
                amount: "24.90",
              },
              {
                category: "704",
                description: "Siivoustarvikkeet",
                amount: "15.50",
              },
            ],
            date: new Date().toLocaleDateString("fi-FI"),
            signatures: {
              recipient: "Maija Virtanen",
              committeeMember: "Matti Meikäläinen",
            },
          },
          t,
        ),
      ),
    },
    {
      documentType: "key-form",
      filenameKey: "keyForm.pdfFilename",
      element: simple(
        buildKeyFormDocument(
          {
            committeeName: "Test committee",
            keyLoans: [
              {
                borrower: "Liisa Koski",
                apartment: "A 12",
                keyType: "Kerhohuone",
                dateBorrowed: "1.9.2026",
                dateReturned: "3.9.2026",
              },
              {
                borrower: "Pekka Laine",
                apartment: "B 4",
                keyType: "Sauna",
                dateBorrowed: "15.9.2026",
                dateReturned: "",
              },
            ],
          },
          t,
        ),
      ),
    },
    {
      documentType: "compensation-prices",
      filenameKey: "compensationPrices.pdfFilename",
      element: simple(
        buildCompensationDocument(
          {
            committeeName: "Test committee",
            items: [
              { item: "Grilli", price: "50 €", condition: "Hyvä" },
              {
                item: "Pöytätennismaila",
                price: "15 €",
                condition: "Käytetty",
              },
            ],
          },
          t,
        ),
      ),
    },
    {
      documentType: "event-participants",
      filenameKey: "eventParticipants.pdfFilename",
      element: simple(
        buildEventParticipantsDocument(
          {
            eventName: { fin: "Pihatalkoot", eng: "Yard cleanup day" },
            date: daysFromNow(-3, 12),
            location: { fin: "Sisäpiha", eng: "Courtyard" },
            participants: [
              { name: "Matti Meikäläinen", apartment: "A 1" },
              { name: "Liisa Koski", apartment: "A 12" },
              { name: "Pekka Laine", apartment: "B 4" },
            ],
            language: "bilingual",
          },
          t,
        ),
      ),
    },
    {
      documentType: "resident-meeting-minutes",
      filenameKey: "residentMeeting.pdfFilename",
      element: simple(
        buildResidentMeetingDocument(
          {
            meetingNumber: 1,
            date: daysFromNow(-30),
            location,
            attendantCount: 12,
            agendaItems: [
              {
                fin: "Asukastoimikunnan valinta",
                eng: "Electing the committee",
              },
              { fin: "Toimintasuunnitelma", eng: "Action plan" },
            ],
            decisions: [
              {
                fin: "Toimikuntaan valittiin viisi jäsentä.",
                eng: "Five members were elected to the committee.",
              },
            ],
            nextMeeting: daysFromNow(335),
            signatures: {
              chairman: "Matti Meikäläinen",
              secretary: "Maija Virtanen",
            },
            language: "bilingual",
          },
          t,
        ),
      ),
    },
    {
      documentType: "resident-meeting-contact",
      filenameKey: "contactForm.pdfFilename",
      element: simple(
        buildContactFormDocument(
          {
            meetingDate: daysFromNow(-30),
            location: "Kerhohuone, A-rappu",
            participants: [
              {
                name: "Liisa Koski",
                apartment: "A 12",
                phone: "040 123 4567",
                email: "liisa.koski@example.com",
              },
              {
                name: "Pekka Laine",
                apartment: "B 4",
                phone: "050 765 4321",
                email: "pekka.laine@example.com",
              },
            ],
          },
          t,
        ),
      ),
    },
  ];
};

/** Renders and saves one test document of each type. Returns how many were saved. */
export const createTestDocuments = async (t: Translate) => {
  const date = new Date().toLocaleDateString("fi-FI");
  let saved = 0;

  for (const { documentType, filenameKey, element } of testDocuments(t)) {
    const blob = await pdf(element).toBlob();
    await savePdf(`TEST-${t(filenameKey)}-${date}`, blob, documentType);
    saved++;
  }

  return saved;
};
