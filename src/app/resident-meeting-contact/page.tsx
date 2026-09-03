"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import ContactFormContent from "./MainContent/ContactFormMainContent";
import ContactFormSidebar from "./Sidebar/ContactFormSidebar";

export interface ContactFormProps {
  data: ContactFormData;
  setData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export interface ContactFormData {
  meetingDate?: Date;
  location?: string;
  participants: Array<{
    name: string;
    apartment: string;
    phone: string;
    email: string;
  }>;
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
