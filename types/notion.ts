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