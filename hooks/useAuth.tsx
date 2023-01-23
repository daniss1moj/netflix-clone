import { useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { auth } from '../firebase';

interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
}

const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
});

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// Logged in...
					setUser(user);
					setLoading(false);
				} else {
					// Not logged in...
					setUser(null);
					setLoading(true);
					router.push('/login');
				}

				setInitialLoading(false);
			}),
		[auth],
	);

	const signUp = async (email: string, password: string) => {
		setLoading(true);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			router.push('/');
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else {
				setError('Something went wrong');
			}
			setTimeout(() => {
				setError(null);
			}, 5000);
		} finally {
			setLoading(false);
		}
	};

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			router.push('/');
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else {
				setError('Something went wrong');
			}
			setTimeout(() => {
				setError(null);
			}, 5000);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await signOut(auth);
			setUser(null);
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else {
				setError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	};

	const memoedValue = useMemo(
		() => ({
			user,
			signUp,
			signIn,
			error,
			loading,
			logout,
		}),
		[user, loading, error],
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
