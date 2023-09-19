"use client";

import Navbar from "@/components/navbar";
import BillBoard from "@/components/bill-board";
import MovieList from "@/components/movie-list";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/info-modal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Home() {
  const { data: movies } = useMovieList();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40 relative lg:bottom-40 xl:bottom-60">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
