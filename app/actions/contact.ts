'use server';

import { notion } from "@/lib/notion";
import { ContactDta } from "@/types/Contact";

export async function sendContact(formData: ContactDta) {
    await notion.pages.create({
        parent: {
            data_source_id: "39cb2a8f-171b-806f-84a6-000bdf29c112"
        },
        properties: {
            Name: {
                title: [{
                    text: {
                        content: formData.name
                    }
                }]
            },
            Email: {
                email: formData.email || ""
            },
            Message: {
                rich_text: [{
                    text: {
                        content: formData.message
                    }
                }]
            }
        }
    });
}