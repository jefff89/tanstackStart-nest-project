import { createFileRoute } from '@tanstack/react-router'
import { TransactionForm } from '@/src/components/transaction-form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

export const Route = createFileRoute(
  '/_authed/dashboard/transactions/new/_layout/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
