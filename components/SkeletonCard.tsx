import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  height: string;
  width: string;
}
export function SkeletonCard({ height, width }: SkeletonCardProps) {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className={`h-[${height}] w-[${width}] rounded-xl`} />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}
