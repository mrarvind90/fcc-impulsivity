import '@styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import React from 'react';

import SessionProvider from '@components/client/SessionProvider';
import Footer from '@components/server/Footer';
import Navbar from '@components/server/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Impulsivity',
	description: "Don't think, Buy!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<Navbar />
					<main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
