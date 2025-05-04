import type { APIRoute } from "astro";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const AUTH_KEY = import.meta.env.AUTH_KEY;

export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, AUTH_KEY) as { userId: string };

    return new Response(JSON.stringify({
      authenticated: true,
      userId: decoded.userId,
    }));
  } catch {
    return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
  }
};
