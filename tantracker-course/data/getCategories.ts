import { createServerFn } from '@tanstack/react-start'

const BACKEND_URL = process.env.NEST_BACKEND_URL ?? 'http://localhost:3001'

export const getCategories = createServerFn({
  method: 'GET',
}).handler(async () => {
  const res = await fetch(`${BACKEND_URL}/categories`)

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`)
  }

  const data = await res.json()
  return data
})
