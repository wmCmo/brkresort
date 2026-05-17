function DefaultMenu() {
    return (
        <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-border animate-pulse rounded-lg" />
            <div className="space-y-2">
                <div className="w-20 h-4 animate-pulse bg-second rounded-full" />
                <div className="w-12 h-4 animate-pulse bg-second rounded-full" />
            </div>
        </div>
    );
}

export default function MenuSkeleton() {
    return (
        <div className="space-y-4">
            {
                Array.from({ length: 5 }).map((_, index) => <DefaultMenu key={index} />)
            }
        </div>
    );
}
