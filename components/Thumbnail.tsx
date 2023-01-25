import { Movie } from '../types';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/moduleAtom';
import { DocumentData } from 'firebase/firestore';
interface Props {
	movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movieModal, setMovieModal] = useRecoilState(movieState);
	const handleClick = () => {
		setShowModal(true);
		setMovieModal(movie);
	};
	return (
		<div
			className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
			onClick={handleClick}>
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
				className="rounded-sm object-cover md:rounded"
				fill
				alt="thumbnail"
			/>
		</div>
	);
};

export default Thumbnail;
