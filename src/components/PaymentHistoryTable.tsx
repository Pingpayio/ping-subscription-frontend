
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentHistory } from "@/types/subscription";
import { format, parseISO } from "date-fns";

interface PaymentHistoryTableProps {
  payments: PaymentHistory[];
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  const getStatusBadge = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "successful":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Successful</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pending</Badge>;
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-[4px] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No payment history available
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id} className="animate-fadeIn">
                <TableCell>
                  {format(parseISO(payment.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell>{payment.planName}</TableCell>
                <TableCell className="text-right font-medium">
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
