"use client";

import { SavedDocument } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import ContactFormContent from "./MainContent/ContactFormMainContent";
import ContactFormSidebar from "./Sidebar/ContactFormSidebar";

export interface ContactFormProps {
  data: ContactFormData;
  setData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export interface Participant {
  name: string;
  address: string;
  email: string;
  phone: string;
  task: string;
}

// Follows HOAS's bilingual resident meeting participant and contact form.
export interface ContactFormData {
  property?: string;
  meetingDate?: Date;
  location?: string;
  chairman?: string;
  participants: Participant[];
  saved?: SavedDocument;
}

const ContactFormPage = () => (
  <SplitPage<ContactFormData>
    MainContent={ContactFormContent}
    Sidebar={ContactFormSidebar}
    storageKey="resident-meeting-contact"
    initialData={{ participants: [] }}
  />
);

export default ContactFormPage;
