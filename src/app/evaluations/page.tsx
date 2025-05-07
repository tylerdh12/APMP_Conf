import { EvaluationsList } from '@/components/evaluations/EvaluationsList';
import { apiClient } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

async function EvaluationsContent() {
	const evaluations = await apiClient.getEvaluations();

	if (!evaluations || evaluations.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>No Evaluations Found</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col items-center justify-center space-y-4 py-8'>
					<p className='text-muted-foreground text-center'>
						There are no evaluations available. Create a new
						evaluation to get started.
					</p>
					<Link href='/evaluations/new'>
						<Button>
							<Plus className='mr-2 h-4 w-4' />
							Create Evaluation
						</Button>
					</Link>
				</CardContent>
			</Card>
		);
	}

	return <EvaluationsList evaluations={evaluations} />;
}

export default function EvaluationsPage() {
	return (
		<div className='container py-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold tracking-tight'>
					Evaluations
				</h1>
			</div>
			<Suspense
				fallback={
					<div className='flex items-center justify-center p-8'>
						<Spinner size='lg' />
					</div>
				}
			>
				<EvaluationsContent />
			</Suspense>
		</div>
	);
}
