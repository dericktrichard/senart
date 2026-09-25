export type Job = {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deadline: string;
  postedAt: string;
  image: string;
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
      "Clean, organise and consistently format several months of sales data.",
    budget: 5000,
    deadline: "2026-09-29",
    postedAt: "2026-09-24",
    image: "/jobs/vaseorder.jpg",
  },
  {
    id: "research-kenyan-businesses",
    title: "Research Kenyan businesses",
    category: "Research",
    description:
      "Research small and medium businesses and compile their public information into a spreadsheet.",
    budget: 7500,
    deadline: "2026-10-05",
    postedAt: "2026-09-24",
    image: "/jobs/nature.jpg",
  },
  {
    id: "format-business-document",
    title: "Format a business document",
    category: "Document & admin",
    description:
      "Turn an existing business document into a clean, professional PDF-ready document.",
    budget: 2500,
    deadline: "2026-09-29",
    postedAt: "2026-09-23",
    image: "/jobs/traditionalclothes.jpg",
  },
  {
    id: "social-media-content",
    title: "Create social media content",
    category: "Social media",
    description:
      "Create a week's worth of simple social media posts for a small local business.",
    budget: 6000,
    deadline: "2026-10-03",
    postedAt: "2026-09-22",
    image: "/jobs/blackgirlart.jpg",
  },
  {
    id: "transcribe-interview",
    title: "Transcribe a recorded interview",
    category: "Transcription",
    description:
      "Transcribe approximately one hour of clear English audio into a formatted document.",
    budget: 3000,
    deadline: "2026-09-30",
    postedAt: "2026-09-22",
    image: "/jobs/waterfallart.jpg",
  },
  {
    id: "landing-page-fixes",
    title: "Make a few fixes to a website",
    category: "Website & software",
    description:
      "Fix several responsive layout issues and make minor content changes to an existing website.",
    budget: 10000,
    deadline: "2026-10-07",
    postedAt: "2026-09-21",
    image: "/jobs/carart.jpg",
  },
  {
    id: "clothing-product-photography",
    title: "Photograph clothing products",
    category: "Graphic design",
    description:
      "Create a clean set of product images for a small clothing catalogue.",
    budget: 4500,
    deadline: "2026-10-01",
    postedAt: "2026-09-20",
    image: "/jobs/pregnantclothes.jpg",
  },
  {
    id: "travel-image-research",
    title: "Collect travel reference images",
    category: "Research",
    description:
      "Find and organise suitable reference imagery for a travel content project.",
    budget: 3500,
    deadline: "2026-10-04",
    postedAt: "2026-09-19",
    image: "/jobs/trainart.jpg",
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

export function daysUntil(date: string): number {
  const today = new Date("2026-09-25T00:00:00");
  const target = new Date(`${date}T00:00:00`);

  return Math.ceil(
    (target.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  );
}