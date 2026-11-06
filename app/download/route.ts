import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../_lib/site";

/**
 * Single link for the "Scan to Download" QR code: sends phones to their own store,
 * everyone else to the download section of the home page.
 */
export function GET(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";

  let target: string;
  if (/android/i.test(ua)) {
    target = GOOGLE_PLAY_URL;
  } else if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && /mobile/i.test(ua))) {
    target = APP_STORE_URL;
  } else {
    target = new URL("/#download", request.url).toString();
  }

  return new Response(null, {
    status: 302,
    headers: { Location: target, "Cache-Control": "no-store", Vary: "User-Agent" },
  });
}
