// Lovable-hosted media uses root-relative /__l5e/ URLs that only the Lovable host serves.
// Static hosts (GitHub Pages) set VITE_ASSET_ORIGIN to load them from the published Lovable site.
export function assetUrl(url: string): string {
  const origin = import.meta.env["VITE_ASSET_ORIGIN"] as string | undefined;
  return origin && url.startsWith("/") ? `${origin.replace(/\/$/, "")}${url}` : url;
}
