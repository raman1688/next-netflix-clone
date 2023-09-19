import { NextResponse } from "next/server";
import { without } from "lodash";

import { db as prismadb } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentUser } = await serverAuth();
    const { movieId } = body;

    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { currentUser } = await serverAuth();
    const { movieId } = body;

    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
