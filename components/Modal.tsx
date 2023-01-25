import MUIModal from '@mui/material/Modal';
import { useRecoilValue, useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/moduleAtom';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Element, Genre, Movie } from '../types';
import ReactPlayer from 'react-player/lazy';
import { FaPlay, FaVolumeOff, FaVolumeUp, FaThumbsUp, FaCheck } from 'react-icons/fa';
import { PlusIcon } from '@heroicons/react/24/outline';
import { FiThumbsUp } from 'react-icons/fi';
import { getIdTokenResult } from 'firebase/auth';
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { toast, Toaster } from 'react-hot-toast';

const Modal = () => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState('');
	const [genres, setGenres] = useState<Genre[] | null>(null);
	const [muted, setMuted] = useState(true);
	const [stopPlaying, setStopPlaying] = useState(true);
	const [like, setLike] = useState(false);
	const [plus, setPlus] = useState(false);
	const [likedMovies, setLikedMovies] = useState<DocumentData[] | Movie[]>([]);
	const { user } = useAuth();

	const toastStyle = {
		background: 'white',
		color: 'black',
		fontWeight: 'bold',
		fontSize: '16px',
		padding: '15px',
		borderRadius: '99999px',
		maxWidth: '1000px',
	};

	const handleClose = () => {
		setShowModal(false);
	};

	// Find all the movies in the user's list
	useEffect(() => {
		if (user) {
			return onSnapshot(collection(db, 'customers', user.uid, 'myList'), (snapshot) =>
				setLikedMovies(snapshot.docs),
			);
		}
	}, [db, movie?.id]);

	// Check if the movie is already in the user's list
	useEffect(
		() => setPlus(likedMovies.findIndex((result) => result.data().id === movie?.id) !== -1),
		[likedMovies],
	);

	const handleList = async () => {
		if (plus) {
			await deleteDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!));
			toast(`${movie?.title || movie?.original_name} has been removed from My List!`, {
				duration: 8000,
				style: toastStyle,
			});
		} else {
			await setDoc(doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!), {
				...movie,
			});

			toast(`${movie?.title || movie?.original_name} has been added to My List.`, {
				duration: 8000,
				style: toastStyle,
			});
		}
		setPlus(!plus);
	};

	useEffect(() => {
		if (!movie) return;
		async function fetchMovie() {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${
						movie?.id
					}?api_key=${
						process.env.NEXT_PUBLIC_API_KEY
					}&language=en-US&append_to_response=videos`,
				);
				const data = await response.json();
				if (data?.videos) {
					const index = data.videos.results.findIndex(
						(item: Element) => item.type === 'Trailer',
					);

					setTrailer(data?.videos.results[index]?.key);
					if (data?.genres) {
						setGenres(data.genres);
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
		fetchMovie();
	}, [movie]);

	return (
		<MUIModal
			open={showModal}
			onClose={handleClose}
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
			<>
				<Toaster position="bottom-center" />
				<button
					onClick={handleClose}
					className="modalButton absolute top-5 right-5 !z-[120] h-9 w-9 bg-[#181818] border-none  hover:bg-[#181818]">
					<AiOutlineClose className="h-6 w-6 " />
				</button>
				<div className="relative pt-[56.25%] ">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width="100%"
						height="100%"
						playing={!stopPlaying}
						muted={muted}
						className="absolute top-0 left-0 z-20"
					/>

					<div
						className={`absolute bottom-0 z-[100] w-full h-full flex items-center justify-between px-10 ${
							stopPlaying && 'bg-[black]/50'
						} `}
						onClick={() => setStopPlaying(!stopPlaying)}>
						{stopPlaying && (
							<div className="m-auto">
								<button className="flex items-center justify-center rounded-full p-2  bg-white">
									<FaPlay className="w-7 h-7 text-black" />
								</button>
							</div>
						)}
					</div>

					<div className="absolute bottom-10  w-full flex items-center justify-between px-10 z-[120]">
						<div className="flex gap-x-2">
							<button className="modalButton" onClick={handleList}>
								{plus ? (
									<FaCheck className="w-7 h-7" />
								) : (
									<PlusIcon className="w-7 h-7" />
								)}
							</button>
							<button className="modalButton" onClick={() => setLike(!like)}>
								{like ? (
									<FaThumbsUp className="w-7 h-7" />
								) : (
									<FiThumbsUp className="w-7 h-7" />
								)}
							</button>
							<button className="modalButton" onClick={() => setMuted(!muted)}>
								{!muted ? (
									<FaVolumeOff className="w-7 h-7" />
								) : (
									<FaVolumeUp className="w-7 h-7" />
								)}
							</button>
						</div>
					</div>
				</div>
				<div className="flex gap-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="flex flex-col gap-y-6 text-lg">
						<div className="flex items-center space-x-2 text-sm">
							<p className="font-semibold text-green-400">
								{movie!.vote_average * 10} Match
							</p>
							<p className="font-light">
								{movie?.release_date || movie?.first_air_date}
							</p>
							<div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
								HD
							</div>
						</div>
						<div className="flex flex-col  gap-y-8 font-light md:flex-row md:justify-between">
							<p className="w-5/6 md:w-[60%]">{movie?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-[gray]">Genres: </span>
									{genres
										?.map((genre) => {
											return genre.name;
										})
										.join(', ')}
								</div>
								<div>
									<span className="text-[gray]">Original language: </span>
									{movie?.original_language}
								</div>
								<div>
									<span className="text-[gray]">Total votes: </span>
									{movie?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MUIModal>
	);
};

export default Modal;
