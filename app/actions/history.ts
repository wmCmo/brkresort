'use server';

import { notion } from "@/lib/notion";
import { isFullPage } from "@notionhq/client";
import { z } from 'zod';

const HistorySchema = z.object({
    id: z.string(),
    properties: z.object({
        Name: z.object({
            title: z.array(
                z.object({
                    plain_text: z.string()
                })
            )
        }).transform(v => v.title.map(t => t.plain_text).join("") || "Untitled History"),
        "Serve Time": z.object({
            date: z.object({ start: z.string().nullable() }).nullable()
        }).transform(v => v.date?.start),
        "Created time": z.object({
            created_time: z.string()
        }).transform(v => v.created_time),
        Total: z.object({
            number: z.number().nullable()
        }).transform(v => v.number),
        Signature: z.object({
            rich_text: z.array(z.object({
                plain_text: z.string()
            }))
        }).transform(v => v.rich_text.map(t => t.plain_text).join("")),
        Cart: z.object({
            rich_text: z.array(z.object({
                plain_text: z.string()
            }))
        }).transform(v => v.rich_text.map(t => t.plain_text).join(""))
    })
}).refine(page => !!page.properties["Serve Time"] && !!page.properties.Total && page.properties.Name.length > 0 && page.properties.Signature.length > 0 && page.properties.Cart.length > 0, {
    error: "Some rows are missing."
}).transform(v => {
    const prop = v.properties;

    return {
        id: v.id,
        name: prop.Name,
        serveTime: prop["Serve Time"]!,
        createdTime: prop["Created time"],
        total: prop.Total!,
        signature: prop.Signature,
        cart: prop.Cart,
    };
});

export type HistoryType = z.infer<typeof HistorySchema>;

export async function getHistory(sig: string) {
    const dbId = process.env.HISTORY_DB;
    if (!dbId) return { error: "Could not retrieve history DB." };

    try {
        const res = await notion.dataSources.query({
            data_source_id: dbId,
            filter: {
                property: "Signature",
                rich_text: {
                    equals: sig
                }
            },
            sorts: [{
                property: "Created time",
                direction: "descending"
            }]
        });

        const parsed = z.array(HistorySchema).safeParse(res.results.filter(isFullPage));

        if (!parsed.success) {
            console.error("Notion schema mismatch", z.treeifyError(parsed.error).errors);
            return { error: "Database structure error (history)" + z.treeifyError(parsed.error).errors.join("-") };
        }
        return { data: parsed.data };
    } catch (error) {
        return { error };
    }
}
