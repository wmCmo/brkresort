export default function Header({ title }: { title: string; }) {
    return (
        <div className="sticky top-0 z-20 bg-background py-4 flex items-center justify-between">
            <div className="relative">
                <div className="flex items-center gap-2">
                    <img src="/ui/logo.svg" alt="logo for brk resort" className="h-6 w-6" />
                    <h1 className="font-bold text-3xl">{title}</h1>
                </div>
                <img src="/svg/leaves.svg" alt="Minimal leaves svg illustration" className="absolute -top-2 -right-5" />
            </div>
            <div>
            </div>
        </div>
    );
}
