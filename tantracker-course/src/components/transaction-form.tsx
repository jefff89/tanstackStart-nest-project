import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

export const transactionFormSchema = z.object({
  transactionType: z.enum(['income', 'expense']),
  //   categoryId: z.coerce.number().positive('Please select a category'),
  categoryId: z.string(),
  transactionDate: z
    .date()
    .max(addDays(new Date(), 1), 'Transaction date cannot be in the future'),
  //   amount: z.coerce.number().positive('Amount must be greater than 0'),
  amount: z.string(),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters'),
})

type TransactionFormValues = z.infer<typeof transactionFormSchema>

export function TransactionForm({
  categories,
  onSubmit,
}: {
  categories: Array<{ id: number; name: string; type: 'expense' | 'income' }>
  onSubmit: (data: z.infer<typeof transactionFormSchema>) => Promise<void>
}) {
  const form = useForm<TransactionFormValues>({
    defaultValues: {
      transactionType: 'income',
      amount: '',
      categoryId: '',
      description: '',
      transactionDate: new Date(),
    },
    resolver: zodResolver(transactionFormSchema),
  })

  // Recompute when the transaction type changes. Using `watch` ensures the
  // component re-renders when the form value updates (getValues() does not).
  const transactionType = form.watch('transactionType')
  const filteredCategories = categories.filter(
    (category) => category.type === transactionType,
  )
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          className="grid gird-cols-2 gap-y-2 gap-x-2"
          disabled={form.formState.isSubmitting}
        >
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {format(field.value, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={{ after: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step={0.01} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </fieldset>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="mt-5 flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" variant="outline">
            {form.formState.isSubmitting ? 'Submitting ...' : 'Submit'}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
