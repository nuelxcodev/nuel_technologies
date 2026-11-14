import ProjectGrid from "./ProjectGrid";
import SectionHead from "./SectionHead";
import { usingSamples } from "@/lib/db";
import { getProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await getProjects();
  if (projects.length === 0) return null;
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead icon="layers" tag="Projects" title="Products we design, build and ship." text="A selection of the solutions our team has delivered across software, mobile and media, with feedback from the clients we built them for." />
        <ProjectGrid projects={projects} />
        {usingSamples && <p className="mt-6 text-center text-sm text-mute">Showing sample projects. Set API_URL to show the projects from your admin dashboard.</p>}
      </div>
    </section>
  );
}
