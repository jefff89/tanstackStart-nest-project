import { createServerFn } from '@tanstack/react-start'

export const getSingedInUserId = createServerFn({
  method: 'GET',
}).handler(async () => {
  const user = await fetch('http://localhost:3001/auth/2').then((res) =>
    res.json(),
  )
  return user?.id
})
