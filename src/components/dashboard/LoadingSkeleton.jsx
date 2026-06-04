export function Skeleton({ className = '' }) {
    return (
        <div className={`animate-pulse bg-surface-200 dark:bg-surface-800 rounded-xl ${className}`} />
    )
}

export function CardSkeleton() {
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    )
}

export function FeedSkeleton({ count = 3 }) {
    return (
        <div className="space-y-4">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="glass-card p-6 flex gap-4">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="space-y-3 flex-1">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function GridSkeleton({ count = 3 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden">
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="p-4 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex justify-between pt-4">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-6 w-1/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
