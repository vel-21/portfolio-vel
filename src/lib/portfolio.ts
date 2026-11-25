import { assetUrl } from "@/lib/asset-url";
import analyzerFlow from "@/assets/analyzer_flow.png.asset.json";
import analyzerResult from "@/assets/analyzer_result.png.asset.json";
import invoiceFlow from "@/assets/invoice_flow.png.asset.json";
import invoiceResult from "@/assets/invoice_result.png.asset.json";
import speedToLeadFlow from "@/assets/speed_to_lead_flow.png.asset.json";
import speedToLeadResult from "@/assets/speed_to_lead_result.png.asset.json";
import triageFlow from "@/assets/triage_flow.png.asset.json";
import triageResult from "@/assets/triage_result.png.asset.json";

export const deliveryPolicy = { fixWindowDays: 14 } as const;

export type ProjectMedia = {
  flow: string;
  result: string;
};

export type Project = {
  id: string;
  title: string;
  result: string;
  tags: string[];
  nodes: [string, string, string, string];
  summary: string;
  problem: string;
  built: string;
  steps: string[];
  media: ProjectMedia;
  loom?: string;
};

export const projects: Project[] = [
  {
    id: "speed-to-lead",
    title: "Speed-to-lead system",
    result: "Lead scored, logged and answered in about 15 seconds.",
    tags: ["n8n", "Gemini", "Groq", "Google Sheets", "Gmail"],
    nodes: ["New lead", "AI scoring", "Google Sheets", "Gmail"],
    summary: "Lead received → qualified → follow-up sent",
    problem: "New inquiries can sit unanswered while a business owner handles admin. Manually qualifying leads and updating a spreadsheet slows the first response.",
    built: "A demo n8n workflow that connects AI lead qualification, lead logging and a personalized email response in one flow.",
    steps: ["Receive the lead details through the workflow trigger.", "Use Gemini and Groq to evaluate the inquiry and prepare a response.", "Record the lead and qualification details in Google Sheets.", "Send the follow-up through Gmail."],
    media: { flow: assetUrl(speedToLeadFlow.url), result: assetUrl(speedToLeadResult.url) },
  },
  {
    id: "invoice-to-sheets",
    title: "Invoice to Sheets",
    result: "2 invoices extracted and checked in about 12 seconds; errors flagged.",
    tags: ["n8n", "Gemini PDF reading", "Google Sheets"],
    nodes: ["Invoice PDF", "AI extraction", "Validation", "Google Sheets"],
    summary: "Documents read → fields checked → rows added",
    problem: "Copying invoice details into a spreadsheet is repetitive, and missing or inconsistent fields are easy to overlook.",
    built: "A demo document-processing workflow that reads invoice PDFs, extracts structured fields and checks them before adding rows to Google Sheets.",
    steps: ["Receive the invoice PDFs in n8n.", "Read the documents with Gemini and extract the invoice fields.", "Validate the extracted data and flag errors for review.", "Write the checked records and review flags to Google Sheets."],
    media: { flow: assetUrl(invoiceFlow.url), result: assetUrl(invoiceResult.url) },
  },
  {
    id: "job-triage",
    title: "AI job-lead triage pipeline",
    result: "Scores every opportunity on 6 factors and alerts only on strong matches.",
    tags: ["n8n", "Gemini", "Groq", "Sheets"],
    nodes: ["Job lead", "AI scoring", "Match filter", "Alert"],
    summary: "6-factor scoring → strong matches only",
    problem: "Reviewing every job opportunity takes time, especially when many are not a good fit.",
    built: "A demo AI triage pipeline that evaluates opportunities on six factors, logs the assessment and filters alerts to strong matches.",
    steps: ["Bring opportunity details into the n8n workflow.", "Evaluate each opportunity against six factors using Gemini and Groq.", "Log the opportunity and its assessment in Sheets.", "Send an alert only when the opportunity is a strong match."],
    media: { flow: assetUrl(triageFlow.url), result: assetUrl(triageResult.url) },
  },
  {
    id: "proposal-drafter",
    title: "Job analyzer and proposal drafter",
    result: "Paste a job, get an analysis and tailored draft in about a minute.",
    tags: ["n8n Forms", "Gemini", "Groq"],
    nodes: ["Job form", "AI analysis", "Draft proposal", "Review"],
    summary: "Job description → analysis → tailored draft",
    problem: "Understanding a job brief and starting a relevant proposal from a blank page can take longer than it should.",
    built: "A demo form-based workflow that turns a pasted job description into a structured analysis and a tailored proposal draft for human review.",
    steps: ["Paste the job description into an n8n Form.", "Analyze the job requirements with Gemini and Groq.", "Generate a proposal draft tailored to the brief.", "Review and refine the draft before sending it."],
    media: { flow: assetUrl(analyzerFlow.url), result: assetUrl(analyzerResult.url) },
  },
];
