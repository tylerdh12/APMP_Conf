import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { Toaster } from 'sonner';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Service Grading System',
	description:
		'A system for evaluating and grading services',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className='container mx-auto py-6'>
						{children}
					</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
