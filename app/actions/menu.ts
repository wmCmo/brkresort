'use server';

import { notion } from "@/lib/notion";
import { isFullPage } from "@notionhq/client";
import { z } from 'zod';

const MenuSchema = z.object({
    id: z.string(),
    properties: z.object({
        Index: z.object({
            number: z.number().nullable()
        }).transform(v => v.number ?? 0),
        "Dietary Restrictions": z.object({
            multi_select: z.array(
                z.object({
                    name: z.string()
                })
            )
        }).transform(v => v.multi_select.map(i => i.name)),
        Description: z.object({
            rich_text: z.array(
                z.object({
                    plain_text: z.string()
                })
            )
        }).transform(v => v.rich_text.map(r => r.plain_text).join("") || "Untitled Menu"),
        Image: z.object({
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
        Name: z.object({
            title: z.array(
                z.object({
                    plain_text: z.string()
                })
            )
        }).transform(v => v.title.map(t => t.plain_text).join("") || "อาหาร"),
        Category: z.object({
            select: z.object({ name: z.string() }).nullable()
        }).transform(v => v.select?.name),
        Price: z.object({
            number: z.number().nullable()
        }).transform(v => v.number ?? 0)
    })

}).transform(page => {
    const prop = page.properties;
    return {
        id: page.id,
        index: prop.Index,
        dietaryRestrictions: prop["Dietary Restrictions"],
        description: prop.Description,
        image: prop.Image,
        name: prop.Name,
        category: prop.Category,
        price: prop.Price
    };
});

export type MenuType = z.infer<typeof MenuSchema>;

export async function getMenu() {
    const menuDbId = process.env.MENU_DB;
    if (!menuDbId) return { error: "Couldn't locate Menu DB" };
    try {
        const res = await notion.dataSources.query({
            data_source_id: menuDbId,
            filter_properties: ["Index", "Dietary Restrictions", "Description", "Image", "Name", "Category", "Price"]
        });

        const parsed = z.array(MenuSchema).safeParse(res.results.filter(isFullPage));

        if (!parsed.success) {
            console.error("Notion schema mistmatch:", z.treeifyError(parsed.error));
            return { error: "Database structure error (menu)" };
        }
        return { menu: parsed.data };
    } catch (error) {
        return { error };
    }
}
