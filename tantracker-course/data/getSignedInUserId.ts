import { createServerFn } from '@tanstack/react-start'

export const getSignedInUserId = createServerFn({
  method: 'GET',
}).handler(async () => {
  const user = await fetch('http://localhost:3001/auth/2').then((res) =>
    res.json(),
  )
  return { userId: user?.id }
})
