import Image from 'next/image';
import { Movie } from '../types';
import { useEffect, useState } from 'react';
import { baseUrl } from '../constants/movie';
import { FaPlay } from 'react-icons/fa';
import { HiInformationCircle } from 'react-icons/hi';
import { modalState, movieState } from '../atoms/moduleAtom';
import { useRecoilState } from 'recoil';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	useEffect(() => {
		setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
	}, [netflixOriginals]);

	return (
		<div className="flex flex-col gap-2 py-10 lg:h-[65vh] lg:justify-end">
			<div className="absolute top-0 -z-[10] left-0 h-[95vh] w-screen">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					fill
					alt="poster"
					objectFit="cover"
				/>
			</div>
			<h1 className="text-2xl lg:text-7xl md:text-4xl">
				{movie?.title || movie?.name || movie?.origin_name}
			</h1>
			<p className="max-w-xs text-xs md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">
				{movie?.overview}
			</p>

			<div className="flex gap-3">
				<button className="bannerButton bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button
					className="bannerButton bg-[gray]/70"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}>
					More info
					<HiInformationCircle className="w-5 h-5 md:w-8 md:h-8" />
				</button>
			</div>
		</div>
	);
};

export default Banner;
