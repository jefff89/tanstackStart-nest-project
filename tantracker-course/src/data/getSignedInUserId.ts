import { createServerFn } from '@tanstack/react-start'

export const getSingedInUserId = createServerFn({
  method: 'GET',
}).handler(async () => {
  const user = await fetch('https://api.github.com/users/marcos-costa') // Fetch the signed in GitHub User ID from Github API
    .then((res) => res.json())
  return user?.userId
})
