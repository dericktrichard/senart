export type Job = {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  postedAt: string;
};

export const JOB_CATEGORIES = [
  "Writing & editing",
  "Graphic design",
  "Data entry & spreadsheets",
  "Research",
  "Virtual assistance",
  "Presentations",
  "Transcription",
  "Website & software",
  "Social media",
  "Document & admin",
] as const;

export const jobs: Job[] = [
  {
    id: "clean-excel-spreadsheet",
    title: "Clean up an Excel spreadsheet",
    category: "Data entry & spreadsheets",
    description:
      "I have a spreadsheet containing several months of sales data. The data needs to be cleaned, consistently formatted, and organised into a usable structure.",
    budget: 5000,
    deadline: "2026-10-02",
    postedAt: "2026-09-24",
  },
  {
    id: "research-kenyan-businesses",
    title: "Research Kenyan businesses",
    category: "Research",
    description:
      "Research a list of small and medium businesses in Kenya and compile their publicly available contact and business information into a spreadsheet.",
    budget: 7500,
    deadline: "2026-10-05",
    postedAt: "2026-09-24",
  },
  {
    id: "format-business-document",
    title: "Format a business document",
    category: "Document & admin",
    description:
      "Format an existing business document into a clean, professional PDF-ready document. The content is already written.",
    budget: 2500,
    deadline: "2026-09-29",
    postedAt: "2026-09-23",
  },
  {
    id: "social-media-content",
    title: "Create social media content",
    category: "Social media",
    description:
      "Create a week's worth of simple social media posts for a small local business. Captions and basic visual concepts are required.",
    budget: 6000,
    deadline: "2026-10-03",
    postedAt: "2026-09-22",
  },
  {
    id: "transcribe-interview",
    title: "Transcribe a recorded interview",
    category: "Transcription",
    description:
      "Transcribe approximately one hour of clear English audio and deliver the final transcript as a properly formatted document.",
    budget: 3000,
    deadline: "2026-09-30",
    postedAt: "2026-09-22",
  },
  {
    id: "landing-page-fixes",
    title: "Make a few fixes to a website",
    category: "Website & software",
    description:
      "A small existing website needs several responsive layout fixes and minor content changes. Source code will be provided.",
    budget: 10000,
    deadline: "2026-10-07",
    postedAt: "2026-09-21",
  },
];

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}