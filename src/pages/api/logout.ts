export const prerender = false;

import type { APIRoute } from "astro";
import { serialize } from "cookie";

export const GET: APIRoute = async () => {
  const cookie = serialize("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return new Response(null, {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
};
