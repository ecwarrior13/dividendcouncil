import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-muted/30 p-4">
        <Link href="/dashboard" className="block mb-6">
          <h1 className="text-lg font-semibold tracking-tight">aisemble</h1>
          <p className="text-xs text-muted-foreground">Content Engine</p>
        </Link>
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Pipeline
          </Link>
          <Link
            href="/dashboard/council"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Council
          </Link>
          <Link
            href="/dashboard/analyses"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Analyses
          </Link>
          <Link
            href="/dashboard/workflows"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Workflows
          </Link>
          <Link
            href="/dashboard/proposals"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Proposals
          </Link>
          <Link
            href="/dashboard/agents"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Agents
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
