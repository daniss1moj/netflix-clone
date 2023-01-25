import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DocumentData } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { Movie } from '../types';
import Thumbnail from './Thumbnail';
interface Props {
	title: string;
	movies: Movie[] | DocumentData[];
}

type Direction = 'left' | 'right';

const Row = ({ title, movies }: Props) => {
	const rowRef = useRef<HTMLDivElement | null>(null);
	const [isMoved, setIsMoved] = useState(false);

	const handleClick = (direction: Direction) => {
		setIsMoved(true);
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;
			const scrollTo =
				direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

			rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
		}
	};

	return (
		<div className="h-35 md:h-45 gap-y-0.5">
			<h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] tranistion duration-200 hover:text-white md:text-2xl  ">
				{title}
			</h2>
			<div className="group relative md:-ml-2">
				<ChevronLeftIcon
					className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
						!isMoved && 'hidden'
					}`}
					onClick={() => handleClick('left')}
				/>
				<div
					ref={rowRef}
					className="flex items-center   gap-x-0.5 overflow-x-scroll md:gap-2.5 md:p-2 !scrollbar !scrollbar-track-transparent !scrollbar-thumb-red-500 !scrollbar-thin">
					{movies.map((movie) => {
						return <Thumbnail key={movie.id} movie={movie} />;
					})}
				</div>
				<ChevronRightIcon
					className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
	);
};

export default Row;
