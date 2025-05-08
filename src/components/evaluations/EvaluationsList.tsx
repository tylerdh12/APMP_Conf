import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Evaluation } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Eye, Pencil } from 'lucide-react';

interface EvaluationsListProps {
	evaluations: Evaluation[];
}

export function EvaluationsList({
	evaluations,
}: EvaluationsListProps) {
	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold'>Evaluations</h2>
				<Link href='/evaluations/new'>
					<Button>New Evaluation</Button>
				</Link>
			</div>

			{evaluations.map((evaluation) => (
				<Card key={evaluation._id}>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<CardTitle>
								{evaluation.service.name}
							</CardTitle>
							<Badge
								variant={
									evaluation.status === 'completed'
										? 'default'
										: evaluation.status === 'in_progress'
										? 'secondary'
										: 'outline'
								}
							>
								{evaluation.status}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<p className='text-sm text-muted-foreground'>
									Rubric
								</p>
								<p>{evaluation.rubric.name}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>
									Overall Score
								</p>
								<p>{evaluation.overallScore}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>
									Created
								</p>
								<p>{formatDate(evaluation.createdAt)}</p>
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>
									Last Updated
								</p>
								<p>{formatDate(evaluation.updatedAt)}</p>
							</div>
						</div>
						<div className='flex justify-end gap-2 mt-4'>
							<Link href={`/evaluations/${evaluation._id}`}>
								<Button
									variant='outline'
									size='sm'
								>
									<Eye className='h-4 w-4 mr-2' />
									View
								</Button>
							</Link>
							<Link
								href={`/evaluations/${evaluation._id}/edit`}
							>
								<Button
									variant='outline'
									size='sm'
								>
									<Pencil className='h-4 w-4 mr-2' />
									Edit
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
