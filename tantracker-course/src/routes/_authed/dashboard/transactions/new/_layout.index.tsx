import { createFileRoute } from '@tanstack/react-router'
import { TransactionForm } from '@/src/components/transaction-form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { getCategories } from '@/data/getCategories'

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
  return (
    <Card className="max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardContent>
          <TransactionForm categories={categoriesRes} />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
