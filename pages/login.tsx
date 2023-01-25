import { sign } from 'crypto';
import { signInAnonymously } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import useAuth from '../hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}

const Login = () => {
	const [login, setLogin] = useState(true);
	const { signIn, signUp } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};
	const testUserLogin = async () => {
		await signIn(
			`${process.env.NEXT_PUBLIC_TEST_USER_EMAIL}`,
			`${process.env.NEXT_PUBLIC_TEST_USER_PASSWORD}`,
		);
	};

	return (
		<div
			className="relative flex h-screen w-screen flex-col bg-black md:items-center
    md:justify-center md:bg-transparent">
			<Head>
				<title>Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Image
				src="https://rb.gy/p2hphi"
				fill
				className="-z-10 !hidden opacity-60 sm:!inline"
				objectFit="cover"
				alt="background"
			/>
			<img
				src="https://rb.gy/ulxxee"
				alt="logo"
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6 "
				width={150}
				height={150}
			/>
			<form
				className="relative mt-24 flex flex-col gap-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-xl w-[100%] md:px-14"
				onSubmit={handleSubmit(onSubmit)}>
				<h1 className="text-4xl font-semibold">{login ? 'Sign In' : 'Sign Up'}</h1>
				<div className="flex flex-col gap-y-4">
					<label>
						<input
							type="email"
							placeholder="Email"
							className="input"
							{...register('email', {
								required: true,
							})}
						/>
						{errors.email && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Please enter a valid email
							</p>
						)}
					</label>
					<label>
						<input
							type="password"
							placeholder="Password"
							className="input"
							{...register('password', {
								required: true,
							})}
						/>
						{errors.password && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Please enter a valid password
							</p>
						)}
					</label>
				</div>
				<button type="submit" className="w-full rounded bg-[#e50914] py-3 font-semibold">
					{login ? 'Sign In' : 'Sign Up'}
				</button>
				<button
					type="submit"
					className="w-full rounded bg-[#e50914] py-3 font-semibold"
					onClick={testUserLogin}>
					Test User
				</button>
				<div className="flex items-center space-x-4">
					<p className="inline-block text-[gray]">
						{login ? 'New on Netflix?' : 'Already registred?'}
					</p>
					{!login ? (
						<button
							className="text-white hover:underline"
							onClick={() => setLogin(true)}
							type="button">
							Sign in now
						</button>
					) : (
						<button
							className="text-white hover:underline"
							onClick={() => setLogin(false)}
							type="button">
							Sign up now
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Login;
