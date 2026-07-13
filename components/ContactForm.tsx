'use client';

import { sendContact } from "@/app/actions/contact";
import { ChangeEvent, useState } from "react";


const DEFAULT_CONTACT = {
    name: "",
    email: "",
    message: "",
};

export default function ContactForm() {
    const [formData, setFormData] = useState(DEFAULT_CONTACT);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => {
            const name = e.target.name;
            const value = e.target.value;

            return {
                ...prev,
                [name]: value
            };
        });
    }

    function confirmSend() {
        if (formData.name.length < 1 || formData.message.length < 1) {
            return;
        }
        sendContact(formData);
        setFormData(DEFAULT_CONTACT);
    }

    return (
        <form action={e => confirmSend()} className="min-w-sm">
            <div className="flex flex-col mt-4">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} className="bg-foreground rounded-sm mt-1 p-2 outline-none" />
            </div>
            <div className="flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="bg-foreground rounded-sm mt-1 p-2 outline-none" />
            </div>
            <div className="flex flex-col mt-2">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" onChange={handleChange} value={formData.message} className="bg-foreground rounded-sm mt-1 p-2 focus:outline-none"></textarea>
            </div>
            <button type="submit" className="py-2 px-4 rounded-lg text-xl bg-foreground font-bold hover:translate-y-0.5 active:translate-y-1 animate-out mt-8">Send</button>
        </form>
    );
}
