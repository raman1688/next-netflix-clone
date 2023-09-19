export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { db as prismadb } from "@/lib/prismadb";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return NextResponse.json(favoritedMovies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
