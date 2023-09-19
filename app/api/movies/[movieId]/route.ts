import { NextResponse } from "next/server";
import { db as prismadb } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    await serverAuth();
    const { movieId } = params;
    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!movieId) {
      throw new Error("Missing Id");
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
