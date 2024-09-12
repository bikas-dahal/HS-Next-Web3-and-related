'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });
// UpdateInvoice is redundant, so we use CreateInvoice

export async function createInvoice(formData: FormData) {
    try {
        const { customerId, amount, status } = CreateInvoice.parse({
            customerId: formData.get('customerId'),
            amount: Number(formData.get('amount')),
            status: formData.get('status')
        });

        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];

        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;

        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    } catch (error) {
        console.error('Error creating invoice:', error);
        // Handle error, possibly redirect to an error page or show a notification
    }
}

export async function updateInvoice(id: string, formData: FormData) {
    try {
        const { customerId, amount, status } = CreateInvoice.parse({
            customerId: formData.get('customerId'),
            amount: Number(formData.get('amount')),
            status: formData.get('status'),
        });

        const amountInCents = amount * 100;

        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;

        revalidatePath('/dashboard/invoices');
        redirect('/dashboard/invoices');
    } catch (error) {
        console.error('Error updating invoice:', error);
        // Handle error
    }
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        console.error('Error deleting invoice:', error);
        // Handle error
    }
}
