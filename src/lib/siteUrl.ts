export function getSiteUrl() {
  const siteUrl = process.env.SITE_URL?.trim();

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error("SITE_URL is not set");
}
