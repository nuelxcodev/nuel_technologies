export type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  level: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  posted: string; // ISO date, "" if unknown
};

export type Member = { id: string; name: string; role: string; bio: string; photo: string };

export type Review = { quote: string; name: string; role: string; company: string; rating: number };

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  client: string;
  industry: string;
  year: string;
  duration: string;
  link: string;
  image: string;
  art: number | null;
  review: Review | null;
};
