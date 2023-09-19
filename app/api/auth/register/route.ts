import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db as prismadb } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already taken", { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Something went wrong: ${error}`, { status: 400 });
  }
}
