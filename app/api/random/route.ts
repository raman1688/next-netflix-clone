export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { db as prismadb } from "@/lib/prismadb";

export async function GET() {
  try {
    await serverAuth();
    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
