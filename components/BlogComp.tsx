'use client';

import { getBlogs } from "@/app/actions/blogs";
import { CaretRightIcon } from "@phosphor-icons/react";
import { ImageIcon } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function BlogSkeleton() {
    return <div className="w-80 rounded-lg border border-border bg-foreground overflow-clip">
        <div className="bg-background flex justify-center py-8">
            <ImageIcon weight="fill" className="text-border animate-pulse" size={80} />
        </div>
        <div className="p-4 space-y-4">
            <div className="h-4 w-1/2 rounded-full bg-border animate-pulse" />
            <div className="h-4 w-full rounded-full bg-border animate-pulse" />
        </div>
    </div>;
}

export default function BlogComp() {
    const { data, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs
    });

    return (
        <div className="m-4 flex flex-col items-center sm:grid grid-cols-2 md:grid-3 place-self-center gap-4">
            {
                isLoading || data?.error
                    ? Array.from({ length: 4 }).map((_, i) => <BlogSkeleton key={i} />)
                    : data?.blogs && data.blogs.length > 0
                    && data.blogs.map(blog => (
                        <Link key={blog.id} className="h-full hover:-translate-y-0.5 animate-out" href={`/blogs/${blog.id}`}>
                            <div className="flex flex-col h-full w-80 rounded-lg border border-border bg-foreground overflow-clip">
                                <div className="overflow-clip w-full h-40">
                                    <Image src={blog.thumbnail} alt={blog.title} height={160} width={320} loading="eager" />
                                </div>
                                <div className="p-4 text-accent">
                                    <h3 className="text-lg">{blog.title}</h3>
                                    <p className="text-muted">{blog.desc}</p>
                                </div>
                                <div className="m-4 flex items-center mt-auto ml-auto text-muted hover:text-accent animate-out">Read more <CaretRightIcon /></div>
                            </div>
                        </Link>
                    ))
            }
        </div>
    );
}
