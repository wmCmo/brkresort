'use client';

import { getBlogContent, getBlogs } from "@/app/actions/blogs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Markdown from "react-markdown";

const customRenderers: Record<string, any> = {
    h1: ({ children }: { children: ReactNode; }) => <h1 className="text-3xl my-4">{children}</h1>,
    h2: ({ children }: { children: ReactNode; }) => <h2 className="text-xl my-2">{children}</h2>,
    h3: ({ children }: { children: ReactNode; }) => <h3 className="text-lg my-1">{children}</h3>,
    li: ({ children }: { children: ReactNode; }) => <li className="list-inside list-disc">{children}</li>,
    p: ({ children }: { children: ReactNode; }) => <p className="my-2 whitespace-pre-line">{children}</p>
};

export default function BlogPage() {
    const params = useParams<{ id: string; }>();
    const [imageLoaded, setImageLoaded] = useState(false);

    const { data } = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs
    });

    const { data: blogContent } = useQuery({
        queryKey: ["blog", params.id],
        queryFn: () => getBlogContent(params.id)
    });

    const blog = data?.blogs?.filter(b => b.id === params.id).at(0);

    useEffect(() => {
        setImageLoaded(false);
    }, [blog?.thumbnail]);

    if (!blog) {
        return (
            <div>
                <h1>We don't have the article you are looking for👀</h1>
            </div>
        );
    }
    return (
        <div className="text-accent pt-20 px-4 flex flex-col max-w-sm sm:max-w-lg md:max-w-xl">
            <h1 className="text-4xl text-center">{blog.title}</h1>
            <div className="relative w-full aspect-5/2 flex h-fit justify-center my-8 overflow-hidden rounded-lg bg-neutral-200/70">
                {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200" />}
                <Image src={blog.thumbnail} alt={blog.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={`rounded-lg object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} loading="eager" onLoad={() => setImageLoaded(true)} />
            </div>
            <p>{blog.desc}</p>
            <Markdown components={customRenderers}>{blogContent}</Markdown>
        </div>
    );
}
