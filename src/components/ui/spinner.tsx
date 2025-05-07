import { cn } from '@/lib/utils';

interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg';
}

export function Spinner({
	className,
	size = 'md',
	...props
}: SpinnerProps) {
	return (
		<div
			className={cn(
				'animate-spin rounded-full border-2 border-current border-t-transparent text-muted-foreground',
				{
					'h-4 w-4': size === 'sm',
					'h-6 w-6': size === 'md',
					'h-8 w-8': size === 'lg',
				},
				className
			)}
			{...props}
		>
			<span className='sr-only'>Loading...</span>
		</div>
	);
}
