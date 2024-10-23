import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  length?: number;
  styleBloc1: string;
  styleBloc2: string;
}
export function SkeletonCard({
  styleBloc1,
  length = 1,
  styleBloc2,
}: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className='mx-auto m animate-pulse px-4 2xl:px-0'>
          <Skeleton className={`${styleBloc1} rounded-xl`} />
          <div className='space-y-2'>
            <Skeleton className={`${styleBloc2}`} />
            <Skeleton className={`${styleBloc2}`} />
          </div>
        </div>
      ))}
    </>
  );
}
