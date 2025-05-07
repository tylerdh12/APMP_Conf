import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Settings,
	ListChecks,
	FileText,
} from 'lucide-react';

const features = [
	{
		title: 'Services',
		description:
			'Manage and evaluate AI and proposal-related services with customizable criteria.',
		icon: <Settings className='h-6 w-6' />,
		href: '/services',
	},
	{
		title: 'Rubrics',
		description:
			'Create and manage evaluation rubrics with weighted criteria and scoring guidelines.',
		icon: <ListChecks className='h-6 w-6' />,
		href: '/rubrics',
	},
	{
		title: 'Evaluations',
		description:
			'Conduct thorough evaluations of services using standardized rubrics and scoring.',
		icon: <FileText className='h-6 w-6' />,
		href: '/evaluations',
	},
];

export default function HomePage() {
	return (
		<div className='container py-12'>
			<div className='flex flex-col items-center text-center space-y-4 mb-12'>
				<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
					Service Grading System
				</h1>
				<p className='max-w-[700px] text-muted-foreground md:text-xl'>
					Evaluate AI and proposal-related services using
					customizable rubrics and standardized scoring.
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{features.map((feature) => (
					<Card
						key={feature.title}
						className='flex flex-col'
					>
						<CardHeader>
							<div className='mb-4 rounded-lg bg-primary/10 p-2 w-fit'>
								{feature.icon}
							</div>
							<CardTitle>{feature.title}</CardTitle>
							<CardDescription>
								{feature.description}
							</CardDescription>
						</CardHeader>
						<CardFooter className='mt-auto'>
							<Link
								href={feature.href}
								className='w-full'
							>
								<Button className='w-full'>
									View {feature.title}
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>

			<div className='mt-12 text-center'>
				<h2 className='text-2xl font-bold mb-4'>
					Ready to get started?
				</h2>
				<p className='text-muted-foreground mb-6'>
					Create your first evaluation or explore our
					features.
				</p>
				<div className='flex justify-center gap-4'>
					<Link href='/evaluations/new'>
						<Button size='lg'>Create Evaluation</Button>
					</Link>
					<Link href='/services'>
						<Button
							variant='outline'
							size='lg'
						>
							View Services
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
