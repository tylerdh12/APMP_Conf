import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Evaluation } from '@/types';
import { formatDate } from '@/lib/utils';
import { Eye, Pencil } from 'lucide-react';

interface EvaluationsListProps {
	evaluations: Evaluation[];
}

export function EvaluationsList({
	evaluations,
}: EvaluationsListProps) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
				<CardTitle className='text-2xl font-bold'>
					Evaluations
				</CardTitle>
				<Link href='/evaluations/new'>
					<Button>New Evaluation</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Service</TableHead>
							<TableHead>Rubric</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Created</TableHead>
							<TableHead>Updated</TableHead>
							<TableHead className='text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{evaluations.map((evaluation) => (
							<TableRow key={evaluation.id}>
								<TableCell className='font-medium'>
									{evaluation.serviceId}
								</TableCell>
								<TableCell>{evaluation.rubricId}</TableCell>
								<TableCell>
									<Badge
										variant={
											evaluation.status === 'completed'
												? 'default'
												: evaluation.status ===
												  'in_progress'
												? 'secondary'
												: 'outline'
										}
									>
										{evaluation.status}
									</Badge>
								</TableCell>
								<TableCell>
									{formatDate(evaluation.createdAt)}
								</TableCell>
								<TableCell>
									{formatDate(evaluation.updatedAt)}
								</TableCell>
								<TableCell className='text-right'>
									<div className='flex justify-end space-x-2'>
										<Link
											href={`/evaluations/${evaluation.id}`}
										>
											<Button
												variant='ghost'
												size='icon'
											>
												<Eye className='h-4 w-4' />
											</Button>
										</Link>
										<Link
											href={`/evaluations/${evaluation.id}/edit`}
										>
											<Button
												variant='ghost'
												size='icon'
											>
												<Pencil className='h-4 w-4' />
											</Button>
										</Link>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
