import { CheckIcon } from '@heroicons/react/24/outline';

import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { loadCheckout } from '../lib/stripe';
import Loader from './Loader';
import Table from './Table';

interface Props {
	products: Product[];
}

const Plans = ({ products }: Props) => {
	const { logout, user } = useAuth();
	const [selectedPlan, setSelectedPlan] = useState<Product>(products[2]);
	const [isBillingLoading, setIsBillingLoading] = useState(false);

	const subscribeToPlan = () => {
		if (!user) return;
		loadCheckout(selectedPlan?.prices[0].id);
		setIsBillingLoading(true);
	};

	return (
		<div>
			<Head>
				<title>Plans</title>
			</Head>

			<header className="border-b border-white/10 bg-[#141414]">
				<Link href="/">
					<img
						src="https://rb.gy/ulxxee"
						alt="Netflix"
						width={150}
						height={90}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<button className="text-lg font-medium hover:underline" onClick={logout}>
					Sign Out
				</button>
			</header>

			<main className="pt-28 px-5 pb-12 transition-all md:px-10 max-w-5xl mx-auto ">
				<h1 className="mb-3 text-3xl font-medium">Choose the plan that`s right for you</h1>
				<ul>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="w-7 h-7 text-[#e50914]" />
						Watch all you want. Ad-free.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="w-7 h-7 text-[#e50914]" />
						Recommendations just for you.
					</li>
					<li className="flex items-center gap-x-2 text-lg">
						<CheckIcon className="w-7 h-7 text-[#e50914]" />
						Change or cancel your plan anytime.
					</li>
				</ul>
				<div className="mt-4 flex flex-col gap-y-4">
					<div className="flex w-full items-center  self-end  md:w-3/5">
						{products.map((product) => {
							return (
								<div
									key={product.id}
									className={`planBox ${
										selectedPlan?.id === product.id
											? 'opacity-100'
											: 'opacity-60'
									}`}
									onClick={() => setSelectedPlan(product)}>
									{product.name}
								</div>
							);
						})}
					</div>

					<Table products={products} selectedPlan={selectedPlan} />
					<button
						disabled={!selectedPlan || isBillingLoading}
						className={`mx-auto w-11/13 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
							isBillingLoading && 'opacity-60'
						}`}
						onClick={subscribeToPlan}>
						{isBillingLoading ? <Loader color="dark:fill-gray-300" /> : 'Subscribe'}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Plans;
