'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Service,
	Rubric,
	Evaluation,
	Score,
	Criteria,
} from '@/lib/types';
import { useState } from 'react';
import { z } from 'zod';

const evaluationSchema = z.object({
	service: z.object({
		_id: z.string(),
		name: z.string(),
	}),
	rubric: z.object({
		_id: z.string(),
		name: z.string(),
	}),
	evaluator: z.string(),
	scores: z.array(
		z.object({
			criteriaId: z.string(),
			score: z.number().min(0).max(5),
			comments: z.string().optional(),
			evidence: z.string().optional(),
		})
	),
	strengths: z.array(z.string()),
	weaknesses: z.array(z.string()),
	recommendations: z.array(z.string()),
	status: z.enum(['draft', 'in_progress', 'completed']),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

interface EvaluationFormProps {
	services: Service[];
	rubrics: Rubric[];
	initialData?: Evaluation;
	onSubmit: (data: EvaluationFormData) => Promise<void>;
}

export function EvaluationForm({
	services,
	rubrics,
	initialData,
	onSubmit,
}: EvaluationFormProps) {
	const [selectedService, setSelectedService] = useState<
		Service | undefined
	>(initialData?.service || undefined);

	const [selectedRubric, setSelectedRubric] = useState<
		Rubric | undefined
	>(initialData?.rubric || undefined);

	const [scores, setScores] = useState<Score[]>(
		initialData?.scores || []
	);

	const [status, setStatus] = useState<
		'draft' | 'in_progress' | 'completed'
	>(initialData?.status || 'draft');

	const [strengths, setStrengths] = useState<string[]>(
		initialData?.strengths || []
	);

	const [weaknesses, setWeaknesses] = useState<string[]>(
		initialData?.weaknesses || []
	);

	const [recommendations, setRecommendations] = useState<
		string[]
	>(initialData?.recommendations || []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedService || !selectedRubric) {
			console.error('Service and Rubric are required');
			return;
		}

		const data: EvaluationFormData = {
			service: {
				_id: selectedService._id,
				name: selectedService.name,
			},
			rubric: {
				_id: selectedRubric._id,
				name: selectedRubric.name,
			},
			evaluator: 'current-user', // TODO: Get from auth context
			scores,
			strengths,
			weaknesses,
			recommendations,
			status,
		};

		try {
			const validatedData = evaluationSchema.parse(data);
			await onSubmit(validatedData);
		} catch (error) {
			console.error('Validation error:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardContent className='space-y-4 p-4'>
					<div className='space-y-2'>
						<Label htmlFor='service'>Service</Label>
						<Select
							name='service'
							value={selectedService?._id}
							onValueChange={(value) => {
								const service = services.find(
									(s) => s._id === value
								);
								setSelectedService(service);
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a service' />
							</SelectTrigger>
							<SelectContent>
								{services.map((service) => (
									<SelectItem
										key={service._id}
										value={service._id}
									>
										{service.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='rubric'>Rubric</Label>
						<Select
							name='rubric'
							value={selectedRubric?._id}
							onValueChange={(value) => {
								const rubric = rubrics.find(
									(r) => r._id === value
								);
								setSelectedRubric(rubric);
								if (rubric) {
									setScores(
										rubric.criteria.map((c) => ({
											criteriaId: c._id,
											score: 0,
											comments: '',
											evidence: '',
										}))
									);
								}
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select a rubric' />
							</SelectTrigger>
							<SelectContent>
								{rubrics.map((rubric) => (
									<SelectItem
										key={rubric._id}
										value={rubric._id}
									>
										{rubric.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{selectedRubric && (
						<div className='space-y-4'>
							{selectedRubric.criteria.map(
								(criterion, index) => (
									<div
										key={criterion._id}
										className='space-y-2'
									>
										<Label>{criterion.name}</Label>
										<div className='flex gap-4'>
											<Input
												type='number'
												min='0'
												max='5'
												value={
													scores.find(
														(s) =>
															s.criteriaId === criterion._id
													)?.score || ''
												}
												onChange={(e) => {
													const newScores = [...scores];
													const scoreIndex =
														newScores.findIndex(
															(s) =>
																s.criteriaId ===
																criterion._id
														);
													if (scoreIndex >= 0) {
														newScores[scoreIndex] = {
															...newScores[scoreIndex],
															score: parseInt(
																e.target.value
															),
														};
													} else {
														newScores.push({
															criteriaId: criterion._id,
															score: parseInt(
																e.target.value
															),
															comments: '',
															evidence: '',
														});
													}
													setScores(newScores);
												}}
												className='w-20'
											/>
											<Textarea
												value={
													scores.find(
														(s) =>
															s.criteriaId === criterion._id
													)?.comments || ''
												}
												onChange={(e) => {
													const newScores = [...scores];
													const scoreIndex =
														newScores.findIndex(
															(s) =>
																s.criteriaId ===
																criterion._id
														);
													if (scoreIndex >= 0) {
														newScores[scoreIndex] = {
															...newScores[scoreIndex],
															comments: e.target.value,
														};
													} else {
														newScores.push({
															criteriaId: criterion._id,
															score: 0,
															comments: e.target.value,
															evidence: '',
														});
													}
													setScores(newScores);
												}}
												placeholder='Comments'
												className='flex-1'
											/>
										</div>
									</div>
								)
							)}
						</div>
					)}

					<div className='space-y-2'>
						<Label>Strengths</Label>
						<Textarea
							value={strengths.join('\n')}
							onChange={(e) =>
								setStrengths(
									e.target.value.split('\n').filter(Boolean)
								)
							}
							placeholder='Enter strengths (one per line)'
						/>
					</div>

					<div className='space-y-2'>
						<Label>Weaknesses</Label>
						<Textarea
							value={weaknesses.join('\n')}
							onChange={(e) =>
								setWeaknesses(
									e.target.value.split('\n').filter(Boolean)
								)
							}
							placeholder='Enter weaknesses (one per line)'
						/>
					</div>

					<div className='space-y-2'>
						<Label>Recommendations</Label>
						<Textarea
							value={recommendations.join('\n')}
							onChange={(e) =>
								setRecommendations(
									e.target.value.split('\n').filter(Boolean)
								)
							}
							placeholder='Enter recommendations (one per line)'
						/>
					</div>

					<div className='space-y-2'>
						<Label>Status</Label>
						<Select
							value={status}
							onValueChange={(value: typeof status) =>
								setStatus(value)
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='draft'>Draft</SelectItem>
								<SelectItem value='in_progress'>
									In Progress
								</SelectItem>
								<SelectItem value='completed'>
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button type='submit'>
						{initialData ? 'Update' : 'Create'} Evaluation
					</Button>
				</CardContent>
			</Card>
		</form>
	);
}
