export const site = {
  name: "Nuel Technologies",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nueltechnologies.com",
  email: "consult@nueltechnologies.com",
  whatsapp: "2348055667296", // international format, no +
  phones: [
    { label: "08055667296", tel: "+2348055667296" },
    { label: "09039124772", tel: "+2349039124772" },
    { label: "08127575050", tel: "+2348127575050" },
  ],
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#jobs", label: "Careers" },
  { href: "#faq", label: "FAQ" },
];

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
