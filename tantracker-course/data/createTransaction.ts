import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { addDays } from 'date-fns'
import { authMiddleware } from '@/authMiddleware'

export const transactionFormSchema = z.object({
  categoryId: z.string(),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value)
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(new Date(), 1)
  }),
  amount: z.string(),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters'),
})

export const createTransaction = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .inputValidator((data: z.infer<typeof transactionFormSchema>) => {
    return transactionFormSchema.parse(data)
  })
  .handler(async ({ data, context }) => {
    const userId = context?.userId
    const BACKEND_URL = process.env.NEST_BACKEND_URL ?? 'http://localhost:3001'

    await fetch(`${BACKEND_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        categoryId: data.categoryId,
        transactionDate: data.transactionDate,
        amount: data.amount.toString(),
        description: data.description,
      }),
    })
  })
