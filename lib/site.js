export const SITE_TITLE = "Enise Perera";
export const SITE_DESCRIPTION =
  "Enise Perera's personal scrapbook featuring hockey matches, swimming galas, original music compositions, and creative projects.";
export const SITE_URL = "https://eniseperera.com";

export const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ||
  "https://eniseperera-media.s3.eu-west-2.amazonaws.com";

export const NAV_ITEMS = [
  { href: "/projects", label: "Projects" },
  { href: "/swimming", label: "Swimming" },
  { href: "/music", label: "Music" },
  { href: "/hockey", label: "Hockey" },
];
