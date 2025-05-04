import type { APIRoute } from "astro";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const AUTH_KEY = import.meta.env.AUTH_KEY;

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Las credenciales son obligatorias" }), { status: 400 });
  }

  const emailUser = "";
  const passwordUser = "";
  const userId = "";


  if(email === emailUser && password === passwordUser) {
    const token = jwt.sign({ userId }, AUTH_KEY, { expiresIn: "30d" });

    const cookie = serialize("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return new Response(JSON.stringify({ message: "Credenciales válidas" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  return new Response(JSON.stringify({ message: "Credenciales inválidas" }), { status: 400 });
};
