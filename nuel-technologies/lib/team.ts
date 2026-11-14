/** SAMPLE TEAM: replace names, roles and bios. Add `photo: "/team/name.jpg"` (file in /public/team) to show a real photo. */
export type Member = { name: string; role: string; bio: string; photo?: string };

export const team: Member[] = [
  { name: "Emmanuel Adeyemi", role: "Founder and CEO", bio: "Sets the vision, leads client strategy and makes sure every project delivers real business value." },
  { name: "Tomi Balogun", role: "Head of Engineering", bio: "Designs the architecture behind our platforms and keeps code quality, security and delivery on track." },
  { name: "Ada Nwosu", role: "Lead Product Designer", bio: "Turns complex requirements into simple, beautiful interfaces that people enjoy using." },
  { name: "Seyi Ogunleye", role: "Creative Director, Video", bio: "Leads shoots, edits and live productions, from brand films to multi-camera events." },
  { name: "Zainab Bello", role: "Social Media Lead", bio: "Builds content strategies and communities that turn followers into customers." },
  { name: "Kelechi Obi", role: "Streaming Engineer", bio: "Runs the live and on-demand streaming stack so every broadcast stays smooth and reliable." },
];
