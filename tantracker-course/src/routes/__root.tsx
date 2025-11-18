import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { ChartColumnBigIcon } from 'lucide-react'
import appCss from '../styles.css?url'
import { getSingedInUserId } from '@/data/getSignedInUserId'

export const Route = createRootRoute({
  notFoundComponent() {
    return (
      <div className="text-3xl text-center py-10">Oops! Page not found</div>
    )
  },
  beforeLoad: async () => {
    const userId = await getSingedInUserId()
    return {
      userId,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="bg-gray-800 p-4 h-20 text-white flex items-center justify-between">
          <Link to="/" className="flex gap-1 items-center font-bold text-2xl">
            <ChartColumnBigIcon className="text-lime-500" /> TanTracker
          </Link>
        </nav>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
