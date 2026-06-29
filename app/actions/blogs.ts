'use server';

import { notion } from "@/lib/notion";
import { isFullPage } from "@notionhq/client";
import z from 'zod';

const BlogSchema = z.object({
    id: z.string(),
    properties: z.object({
        Title: z.object({
            title: z.array(z.object({
                plain_text: z.string().nullable()
            }))
        }).transform(v => v.title.map(t => t.plain_text).join("") || "New Blog"),
        Description: z.object({
            rich_text: z.array(z.object({
                plain_text: z.string().nullable()
            }))
        }).transform(v => v.rich_text.map(t => t.plain_text).join("")),
        Thumbnail: z.object({
            files: z.array(
                z.union([
                    z.object({ type: z.literal("external"), external: z.object({ url: z.string() }) }),
                    z.object({ type: z.literal("file"), file: z.object({ url: z.string() }) })
                ])
            )
        }).transform(v => {
            const first = v.files.at(0);
            if (!first) return "";
            return first.type === "external" ? first.external.url : first.file.url;
        }),
    }),
}).transform(page => {
    const prop = page.properties;
    return {
        id: page.id,
        title: prop.Title,
        desc: prop.Description,
        thumbnail: prop.Thumbnail,
    };
});

export type BlogType = z.infer<typeof BlogSchema>;

export async function getBlogs() {
    try {
        const res = await notion.dataSources.query({
            data_source_id: "380b2a8f-171b-8010-bab7-000b6293cc6f",
            page_size: 4,
            sorts: [{
                timestamp: "last_edited_time",
                direction: "descending"
            }],
            filter_properties: ["Title", "Description", "Thumbnail"]
        });
        const fullPage = res.results.filter(isFullPage);
        const parsed = z.array(BlogSchema).safeParse(fullPage);
        if (!parsed.success) {
            console.error("Notion data mismatch", z.treeifyError(parsed.error));
            return { error: "Notion data mismatch (blogs)" };
        }
        return { blogs: parsed.data };
    } catch (error) {
        return { error };
    }
}

export async function getBlogContent(blogId: string) {
    const res = await notion.pages.retrieveMarkdown({
        page_id: blogId
    });

    return res.markdown.replaceAll("<empty-block/>", "\n").replaceAll("\n", "\n");
}