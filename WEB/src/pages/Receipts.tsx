import { useState } from "react";
import { Eye, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Receipt {
  id: string;
  clientName: string;
  vehiclePlate: string;
  date: string;
  services: string[];
  amount: number;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: string;
}

const mockReceipts: Receipt[] = [
  {
    id: "RCP-001",
    clientName: "John Smith",
    vehiclePlate: "ABC-123",
    date: "2024-01-15",
    services: ["Basic Wash", "Interior Cleaning"],
    amount: 45.00,
    status: "paid",
    paymentMethod: "Credit Card"
  },
  {
    id: "RCP-002",
    clientName: "Sarah Johnson",
    vehiclePlate: "XYZ-789",
    date: "2024-01-14",
    services: ["Premium Wash", "Wax"],
    amount: 75.00,
    status: "paid",
    paymentMethod: "Cash"
  },
  {
    id: "RCP-003",
    clientName: "Mike Wilson",
    vehiclePlate: "DEF-456",
    date: "2024-01-13",
    services: ["Basic Wash"],
    amount: 25.00,
    status: "pending",
  },
  {
    id: "RCP-004",
    clientName: "Emma Davis",
    vehiclePlate: "GHI-321",
    date: "2024-01-10",
    services: ["Deluxe Package", "Interior Detail"],
    amount: 120.00,
    status: "overdue",
  },
  {
    id: "RCP-005",
    clientName: "David Brown",
    vehiclePlate: "JKL-654",
    date: "2024-01-12",
    services: ["Premium Wash", "Tire Shine"],
    amount: 65.00,
    status: "paid",
    paymentMethod: "Debit Card"
  }
];

const getStatusBadgeVariant = (status: Receipt['status']) => {
  switch (status) {
    case 'paid':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'overdue':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function Receipts() {
  const [receipts] = useState<Receipt[]>(mockReceipts);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReceipts = receipts.filter(receipt => {
    const matchesStatus = statusFilter === "all" || receipt.status === statusFilter;
    const matchesSearch = receipt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const paidAmount = filteredReceipts
    .filter(receipt => receipt.status === 'paid')
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receipts</h1>
          <p className="text-muted-foreground">Manage and track payment receipts</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {filteredReceipts.length} receipts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${paidAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredReceipts.filter(r => r.status === 'paid').length} paid receipts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ${(totalAmount - paidAmount).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredReceipts.filter(r => r.status !== 'paid').length} pending receipts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by client name, receipt ID, or plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.id}</TableCell>
                  <TableCell>{receipt.clientName}</TableCell>
                  <TableCell className="font-mono text-sm">{receipt.vehiclePlate}</TableCell>
                  <TableCell>{new Date(receipt.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {receipt.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${receipt.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(receipt.status)}>
                      {receipt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {receipt.paymentMethod || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredReceipts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No receipts found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}