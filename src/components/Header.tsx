'use client';

import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

export function Header() {
	return (
		<header className='border-b'>
			<div className='container flex h-16 items-center justify-between'>
				<nav className='flex items-center space-x-6'>
					<Link
						href='/'
						className='font-bold'
					>
						Service Grading
					</Link>
					<Link
						href='/services'
						className='text-muted-foreground hover:text-foreground'
					>
						Services
					</Link>
					<Link
						href='/rubrics'
						className='text-muted-foreground hover:text-foreground'
					>
						Rubrics
					</Link>
					<Link
						href='/evaluations'
						className='text-muted-foreground hover:text-foreground'
					>
						Evaluations
					</Link>
				</nav>
				<ModeToggle />
			</div>
		</header>
	);
}
