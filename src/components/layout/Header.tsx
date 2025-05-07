import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	FileText,
	ListChecks,
	Settings,
} from 'lucide-react';

const components: {
	title: string;
	href: string;
	description: string;
	icon: React.ReactNode;
}[] = [
	{
		title: 'Services',
		href: '/services',
		description:
			'Manage and evaluate AI and proposal-related services.',
		icon: <Settings className='h-4 w-4' />,
	},
	{
		title: 'Rubrics',
		href: '/rubrics',
		description: 'Create and manage evaluation rubrics.',
		icon: <ListChecks className='h-4 w-4' />,
	},
	{
		title: 'Evaluations',
		href: '/evaluations',
		description: 'View and manage service evaluations.',
		icon: <FileText className='h-4 w-4' />,
	},
];

export function Header() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 items-center'>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link
								href='/'
								legacyBehavior
								passHref
							>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Service Grading
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								Features
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
									{components.map((component) => (
										<li key={component.title}>
											<NavigationMenuLink asChild>
												<Link
													href={component.href}
													className={cn(
														'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
													)}
												>
													<div className='flex items-center space-x-2'>
														{component.icon}
														<span className='text-sm font-medium leading-none'>
															{component.title}
														</span>
													</div>
													<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
														{component.description}
													</p>
												</Link>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className='flex flex-1 items-center justify-end space-x-2'>
					<nav className='flex items-center space-x-2'>
						<Link href='/services'>
							<Button
								variant='ghost'
								size='sm'
							>
								<Settings className='mr-2 h-4 w-4' />
								Services
							</Button>
						</Link>
						<Link href='/rubrics'>
							<Button
								variant='ghost'
								size='sm'
							>
								<ListChecks className='mr-2 h-4 w-4' />
								Rubrics
							</Button>
						</Link>
						<Link href='/evaluations'>
							<Button
								variant='ghost'
								size='sm'
							>
								<FileText className='mr-2 h-4 w-4' />
								Evaluations
							</Button>
						</Link>
					</nav>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
