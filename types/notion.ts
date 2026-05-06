import { z } from 'zod';

export const MenuCategorySchema = z.enum([
    "must-try",
    "vegetarian",
    "beverages",
    "snack",
    "appetizer",
    "bbq",
    "main-dish",
    "western",
    "a-la-carte"
]);

export type MenuCategoryType = z.infer<typeof MenuCategorySchema>;

export interface RichTextType {
    plain_text: string;
}

export interface RelationType {
    id: string;
}

export interface ImageType {
    file: {
        url: string;
    };
}

export interface MenuType {
    id: string;
    properties: {
        Index: {
            id: string;
            number: number;
        };
        "Dietary Restrictions": {
            multi_select: string[];
        };
        Description: {
            rich_text: RichTextType[];
        };
        "Order History": {
            relation: RelationType[];
        };
        Image: {
            files: ImageType[];
        };
        Name: {
            title: RichTextType[];
        };
        Category: {
            select: {
                name: MenuCategoryType;
            };
        };
        Price: {
            number: number;
        };
    };
}