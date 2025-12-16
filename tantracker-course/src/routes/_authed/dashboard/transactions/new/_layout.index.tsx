import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import type { z } from 'zod'
import type { transactionFormSchema } from '@/src/components/transaction-form'
import { TransactionForm } from '@/src/components/transaction-form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { getCategories } from '@/data/getCategories'
import { createTransaction } from '@/data/createTransaction'

export const Route = createFileRoute(
  '/_authed/dashboard/transactions/new/_layout/',
)({
  component: RouteComponent,
  loader: async () => {
    const categoriesRes = await getCategories()
    return { categoriesRes }
  },
})

function RouteComponent() {
  const { categoriesRes } = Route.useLoaderData()

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    console.log('submitting')
    await createTransaction({
      data: {
        categoryId: data.categoryId,
        transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
        amount: data.amount,
        description: data.description,
      },
    })
    console.log('Transaction created')
  }
  return (
    <Card className="max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardContent>
          <TransactionForm categories={categoriesRes} onSubmit={handleSubmit} />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
