import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { db as prismadb } from "@/lib/prismadb";

export async function GET() {
  try {
    await serverAuth();
    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
