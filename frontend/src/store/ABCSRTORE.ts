import { create } from "zustand"
import type { DocTemplate, GeneratedDocument, DocumentStatus } from "@Types/types"

const initialTemplates: DocTemplate[] = [
  {
    id: "t1",
    name: "Freelance Invoice",
    category: "Invoice",
    description: "Standard invoice template for freelance clients",
    uses: 24,
    updatedAt: "2026-08-02",
    content: "INVOICE\n\nFrom: {{your_name}}\nDate: {{invoice_date}}\n\nBill To:\n{{client_name}}\n\nAmount Due: ${{amount_due}}\n\nPayment is due within 14 days.",
    fields: [
      { key: "your_name", label: "Your name", type: "text" },
      { key: "invoice_date", label: "Invoice date", type: "date" },
      { key: "client_name", label: "Client name", type: "text" },
      { key: "amount_due", label: "Amount due", type: "text" },
    ],
  },
  {
    id: "t2",
    name: "Welcome Email",
    category: "Letter",
    description: "Onboarding email for new customers",
    uses: 11,
    updatedAt: "2026-07-28",
    content: "Hi {{recipient_name}},\n\nWelcome aboard! Your account starts on {{start_date}}.",
    fields: [
      { key: "recipient_name", label: "Recipient name", type: "text" },
      { key: "start_date", label: "Start date", type: "date" },
    ],
  },
  {
    id: "t3",
    name: "Meeting Notes",
    category: "Report",
    description: "Structured meeting notes template",
    uses: 8,
    updatedAt: "2026-08-09",
    content: "Meeting Notes\n\nDate: {{meeting_date}}\nAttendees: {{attendees}}\n\nSummary:\n{{summary}}",
    fields: [
      { key: "meeting_date", label: "Meeting date", type: "date" },
      { key: "attendees", label: "Attendees", type: "text" },
      { key: "summary", label: "Summary", type: "text" },
    ],
  },
]