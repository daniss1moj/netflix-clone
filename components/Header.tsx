import { HiOutlineSearch } from 'react-icons/hi';
import { BsFillBellFill } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import BasicMenu from './BasicMenu';

const Header = () => {
	const [isScrolled, setIsScorlled] = useState(false);
	const { user } = useAuth();
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScorlled(true);
			} else {
				setIsScorlled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return (
		<header className={`${isScrolled && 'bg-[#141414]'}`}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<img
					src="https://rb.gy/ulxxee"
					width={100}
					height={100}
					className="cursor-pointer object-contain hover:scale-125"
				/>
				<BasicMenu />
				<ul className="hidden space-x-4 md:flex">
					<li className="headerLink">Home</li>
					<li className="headerLink">TV Shows</li>
					<li className="headerLink">Movies</li>
					<li className="headerLink">New and Popular</li>
					<li className="headerLink">My list</li>
				</ul>
			</div>
			<div className="text-white flex items-center gap-4 text-sm font-light">
				<HiOutlineSearch className="hidden sm:inline h-6 w-6" />
				<p className="hidden lg:inline">Kids</p>
				<BsFillBellFill className="h-6 w-6" />
				<Link href="/account">
					<RxAvatar className="h-6 w-6 cursor-pointer rounded" />
				</Link>
			</div>
		</header>
	);
};

export default Header;
