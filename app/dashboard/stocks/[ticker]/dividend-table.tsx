import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function DividendTable({ dividends }: { dividends: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Dividend History
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({dividends.length} most recent)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dividends.length === 0 ? (
          <p className="text-sm text-muted-foreground">No dividend records.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ex-Dividend Date</TableHead>
                <TableHead className="text-right">Dividend</TableHead>
                <TableHead className="text-right">Adj Dividend</TableHead>
                <TableHead>Record Date</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Declaration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dividends.map((d) => (
                <TableRow key={`${d.symbol}-${d.date}`}>
                  <TableCell className="font-medium">{d.date ?? '—'}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {d.dividend !== null && d.dividend !== undefined
                      ? `$${Number(d.dividend).toFixed(4)}`
                      : '—'}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {d.adj_dividend !== null && d.adj_dividend !== undefined
                      ? `$${Number(d.adj_dividend).toFixed(4)}`
                      : '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.record_date ?? '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.payment_date ?? '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.declaration_date ?? '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
