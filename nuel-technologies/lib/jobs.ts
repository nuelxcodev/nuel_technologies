/**
 * JOB POSTINGS
 * Add a job to this list to publish it. Set `open: false` (or delete it) to take it down.
 * If no job is open, the Careers section automatically switches to an "open application" card.
 * getOpenJobs() is async on purpose: swap the body for a CMS / database / API call later without touching the UI.
 */
export type Job = {
  id: string;
  title: string;
  department: "Engineering" | "Design" | "Media" | "Marketing" | "Operations";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  level: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  posted: string; // ISO date
  open: boolean;
};

export const jobs: Job[] = [
  {
    id: "frontend-developer", title: "Frontend Developer", department: "Engineering", type: "Full-time", location: "Remote or on-site", level: "Mid level", posted: "2026-11-01", open: true,
    summary: "Build fast, accessible interfaces for client products and help shape our internal design system.",
    responsibilities: ["Build responsive interfaces with React and Next.js", "Turn design files into polished, accessible components", "Review code and improve performance across projects"],
    requirements: ["2+ years building production web interfaces", "Strong HTML, CSS, JavaScript and TypeScript", "A portfolio or GitHub we can look at"],
  },
  {
    id: "backend-developer", title: "Backend Developer", department: "Engineering", type: "Full-time", location: "Remote or on-site", level: "Mid level", posted: "2026-11-01", open: true,
    summary: "Design secure APIs and services that power client platforms, from payments to streaming.",
    responsibilities: ["Design and build REST or GraphQL APIs", "Model data and write reliable database queries", "Own deployment, monitoring and security basics"],
    requirements: ["Experience with Node.js or Python", "Solid SQL and API design knowledge", "Care for testing, security and clean architecture"],
  },
  {
    id: "mobile-developer", title: "Mobile App Developer", department: "Engineering", type: "Contract", location: "Remote", level: "Mid level", posted: "2026-11-05", open: true,
    summary: "Ship Android and iOS apps for our clients, from first screen to store release.",
    responsibilities: ["Build cross-platform apps with Flutter or React Native", "Integrate APIs, push notifications and payments", "Prepare and publish releases to the app stores"],
    requirements: ["Shipped at least one mobile app", "Comfortable with state management and REST APIs", "Attention to smooth, native-feeling interaction"],
  },
  {
    id: "ui-ux-designer", title: "UI/UX Designer", department: "Design", type: "Full-time", location: "Remote or on-site", level: "Mid level", posted: "2026-11-03", open: true,
    summary: "Turn ideas into clear flows and beautiful screens that people enjoy using.",
    responsibilities: ["Run discovery and map user journeys", "Design wireframes, prototypes and high-fidelity UI", "Work with developers to ship what you design"],
    requirements: ["Strong Figma skills and a portfolio", "Understanding of usability and accessibility", "Clear communication with clients and teammates"],
  },
  {
    id: "videographer-editor", title: "Videographer and Editor", department: "Media", type: "Full-time", location: "On-site", level: "Mid level", posted: "2026-11-06", open: true,
    summary: "Capture and edit video for client brands, events and our own channels.",
    responsibilities: ["Shoot commercials, events and product videos", "Edit, colour grade and add motion graphics", "Support multi-camera live streaming setups"],
    requirements: ["Portfolio of shot and edited work", "Experience with Premiere Pro or DaVinci Resolve", "Own camera kit is a plus"],
  },
  {
    id: "social-media-manager", title: "Social Media Manager", department: "Marketing", type: "Full-time", location: "Remote or on-site", level: "Mid level", posted: "2026-11-08", open: true,
    summary: "Plan and run social accounts for our clients and grow their audiences.",
    responsibilities: ["Build content calendars and write captions", "Manage communities and respond to messages", "Report on growth and recommend improvements"],
    requirements: ["Proven experience managing brand accounts", "Strong writing and a good eye for visuals", "Comfortable with analytics and scheduling tools"],
  },
];

export async function getOpenJobs(): Promise<Job[]> {
  return jobs.filter((j) => j.open);
}
