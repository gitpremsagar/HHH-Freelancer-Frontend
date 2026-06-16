/**
 * Client-side YouTube parsing (keep in sync with backend/src/utils/youtubeVideoIntroduction.ts).
 */

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
}

function isAllowedYouTubeHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "youtube.com" ||
    h === "www.youtube.com" ||
    h === "m.youtube.com" ||
    h === "music.youtube.com" ||
    h === "youtu.be" ||
    h === "www.youtube-nocookie.com" ||
    h === "youtube-nocookie.com"
  );
}

export function parseYoutubeVideoIdFromInput(raw: string): string | null {
  if (!raw || typeof raw !== "string") return null;
  let input = raw.trim();
  if (!input) return null;

  const iframeMatch = input.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (iframeMatch?.[1]) {
    input = iframeMatch[1].trim();
  }

  let href = input;
  if (!/^https?:\/\//i.test(href)) {
    href = `https://${href}`;
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  if (!isAllowedYouTubeHost(url.hostname)) return null;

  const host = url.hostname.toLowerCase();

  if (host === "youtu.be") {
    const seg = url.pathname.split("/").filter(Boolean)[0];
    return seg && isValidVideoId(seg) ? seg : null;
  }

  const path = url.pathname;

  const embed = path.match(/^\/embed\/([^/?]+)/);
  if (embed?.[1] && isValidVideoId(embed[1])) return embed[1];

  const shorts = path.match(/^\/shorts\/([^/?]+)/);
  if (shorts?.[1] && isValidVideoId(shorts[1])) return shorts[1];

  const live = path.match(/^\/live\/([^/?]+)/);
  if (live?.[1] && isValidVideoId(live[1])) return live[1];

  if (path === "/watch" || path.startsWith("/watch")) {
    const v = url.searchParams.get("v");
    if (v && isValidVideoId(v)) return v;
  }

  return null;
}

export function canonicalYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

const STORED_EMBED_RE = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/;

export function getYoutubeEmbedSrc(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const t = url.trim();
  return STORED_EMBED_RE.test(t) ? t : null;
}

export function normalizeVideoIntroductionForPayload(raw: string): string | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  const id = parseYoutubeVideoIdFromInput(t);
  return id ? canonicalYoutubeEmbedUrl(id) : undefined;
}

export const YOUTUBE_EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
