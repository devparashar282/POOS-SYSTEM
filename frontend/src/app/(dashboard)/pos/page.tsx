"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, Trash2, User, Phone, QrCode, Banknote, FileText, Printer, CheckCircle2, ShoppingCart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { usePOSStore, type OrderDetails } from "@/store/posStore";
import { useAppStore } from "@/store/appStore";
import { mockProducts, mockCategories } from "@/lib/data";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type JsPDFWithAutoTable = jsPDF & {
  lastAutoTable?: {
    finalY?: number;
  };
};

export default function POSPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"SELECT" | "QR" | "CASH" | "SUCCESS">("SELECT");

  const {
    cart,
    orderDetails,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateOrderDetails,
    clearCart,
    subtotal,
    discount,
    grandTotal,
    setDiscount,
  } = usePOSStore();

  const orderTypes: OrderDetails["orderType"][] = ["Dine In", "Take Away", "Delivery"];

  const addCompletedOrder = useAppStore((state) => state.addCompletedOrder);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const generateInvoice = (type: "print" | "download") => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("THE OWL CAFE", pageWidth / 2, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Virat Khand, Gomti Nagar, Lucknow", pageWidth / 2, 28, { align: "center" });
    doc.text("Phone: +91 9987043742 | GSTIN: 09AAACB1234C1Z5", pageWidth / 2, 34, { align: "center" });

    doc.line(14, 40, pageWidth - 14, 40);

    doc.setFontSize(10);
    doc.text(`Invoice No: INV-${Math.floor(Math.random() * 100000)}`, 14, 50);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 56);
    doc.text(`Customer: ${orderDetails.customerName || "Walk-in"}`, 14, 62);
    if (orderDetails.phoneNumber) {
      doc.text(`Phone: ${orderDetails.phoneNumber}`, 14, 68);
    }
    if (orderDetails.emailId) {
      doc.text(`Email: ${orderDetails.emailId}`, 14, orderDetails.phoneNumber ? 74 : 68);
    }
    doc.text(`Order Type: ${orderDetails.orderType}`, pageWidth - 14, 50, { align: "right" });
    doc.text(`Payment: ${orderDetails.paymentMethod || "N/A"}`, pageWidth - 14, 56, { align: "right" });

    let startY = 75;
    if (orderDetails.phoneNumber && orderDetails.emailId) startY = 85;
    else if (orderDetails.phoneNumber || orderDetails.emailId) startY = 80;

    const tableData = cart.map((item) => [
      item.name,
      item.quantity.toString(),
      `₹${item.price.toFixed(2)}`,
      `₹${(item.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY,
      head: [["Item", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [92, 58, 33] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    const finalY = ((doc as JsPDFWithAutoTable).lastAutoTable?.finalY ?? startY) + 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, pageWidth - 14, finalY, { align: "right" });
    if (discount > 0) {
      doc.text(`Discount: ₹${discount.toFixed(2)}`, pageWidth - 14, finalY + 7, { align: "right" });
    }
    doc.setFontSize(14);
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, pageWidth - 14, finalY + (discount > 0 ? 17 : 10), { align: "right" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank You! Visit Again.", pageWidth / 2, finalY + 40, { align: "center" });

    if (type === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    } else {
      doc.save(`Invoice_${Date.now()}.pdf`);
    }
  };

  const completePayment = (method: "Cash" | "QR Code") => {
    updateOrderDetails({ paymentMethod: method });

    const newOrderId = addCompletedOrder(cart, orderDetails.customerName, orderDetails.phoneNumber, orderDetails.emailId, method, grandTotal);

    setCompletedOrderId(newOrderId);
    setPaymentStep("SUCCESS");
  };

  const sendEmailReceipt = async () => {
    if (!orderDetails.emailId) {
      alert("Please enter an Email ID first.");
      return;
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: orderDetails.emailId,
          customerName: orderDetails.customerName,
          items: cart,
          total: grandTotal.toFixed(2),
          orderId: completedOrderId || "NEW",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Receipt sent successfully to " + orderDetails.emailId);
      } else {
        alert("Failed to send email: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Error sending email receipt.");
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted-foreground)]" />
            <Input
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[var(--color-background)]"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {mockCategories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "secondary"}
                className="rounded-full shrink-0"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl overflow-hidden cursor-pointer hover:border-[var(--color-primary)] transition-colors shadow-sm flex flex-col"
              >
                <div className="relative h-32 w-full bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-[var(--color-primary)] font-bold mt-auto">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col min-h-0 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] shadow-sm shrink-0">
        <div className="p-4 border-b border-[var(--color-border)] space-y-4 bg-[var(--color-secondary)]/30">
          <h2 className="font-bold text-lg">Order Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                placeholder="Customer Name"
                value={orderDetails.customerName}
                onChange={(e) => updateOrderDetails({ customerName: e.target.value })}
                className="pl-9 h-9 text-sm bg-[var(--color-background)]"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                placeholder="Phone No."
                value={orderDetails.phoneNumber}
                onChange={(e) => updateOrderDetails({ phoneNumber: e.target.value })}
                className="pl-9 h-9 text-sm bg-[var(--color-background)]"
              />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-muted-foreground)]" />
            <Input
              type="email"
              placeholder="Email ID (Optional)"
              value={orderDetails.emailId}
              onChange={(e) => updateOrderDetails({ emailId: e.target.value })}
              className="pl-9 h-9 text-sm bg-[var(--color-background)]"
            />
          </div>
          <div className="flex space-x-2 bg-[var(--color-background)] p-1 rounded-lg border border-[var(--color-border)]">
            {orderTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateOrderDetails({ orderType: type })}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  orderDetails.orderType === type ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-[var(--color-muted-foreground)] space-y-4">
                <ShoppingCart className="h-16 w-16 opacity-20" />
                <p>Cart is empty</p>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-[var(--color-muted-foreground)]">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-[var(--color-border)] rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-bold text-sm w-12 text-right">₹{item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-[var(--color-destructive)] p-1 hover:bg-red-50 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-background)] space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-muted-foreground)]">Subtotal</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-muted-foreground)]">Discount</span>
            <Input
              type="number"
              className="w-20 h-7 text-right text-xs bg-[var(--color-secondary)]/50"
              value={discount || ""}
              onChange={(e) => setDiscount(Number(e.target.value) || 0)}
              placeholder="₹0"
            />
          </div>
          <div className="pt-3 border-t border-dashed border-[var(--color-border)] flex justify-between items-end">
            <span className="font-bold text-lg">Grand Total</span>
            <span className="font-bold text-2xl text-[var(--color-primary)]">₹{grandTotal.toFixed(2)}</span>
          </div>
          <Button
            className="w-full h-12 text-lg mt-2"
            disabled={cart.length === 0}
            onClick={() => {
              setPaymentStep("SELECT");
              setIsPaymentModalOpen(true);
            }}
          >
            Process Payment
          </Button>
        </div>
      </div>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {paymentStep === "SELECT" && (
            <>
              <DialogHeader>
                <DialogTitle>Customer Details & Payment</DialogTitle>
                <DialogDescription>
                  Amount to pay: <span className="font-bold text-[var(--color-foreground)]">₹{grandTotal.toFixed(2)}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    placeholder="Enter name"
                    value={orderDetails.customerName}
                    onChange={(e) => updateOrderDetails({ customerName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Mobile No.</Label>
                    <Input
                      placeholder="Enter mobile"
                      value={orderDetails.phoneNumber}
                      onChange={(e) => updateOrderDetails({ phoneNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Email ID</Label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={orderDetails.emailId}
                      onChange={(e) => updateOrderDetails({ emailId: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2">
                <Button
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center space-y-3 border-2 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)]/30"
                  onClick={() => setPaymentStep("CASH")}
                >
                  <Banknote className="h-10 w-10 text-green-600" />
                  <span className="font-semibold text-lg">Cash</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center space-y-3 border-2 hover:border-[var(--color-primary)] hover:bg-[var(--color-secondary)]/30"
                  onClick={() => setPaymentStep("QR")}
                >
                  <QrCode className="h-10 w-10 text-blue-600" />
                  <span className="font-semibold text-lg">QR Code / UPI</span>
                </Button>
              </div>
            </>
          )}

          {paymentStep === "QR" && (
            <>
              <DialogHeader>
                <DialogTitle>Scan to Pay</DialogTitle>
                <DialogDescription>Ask customer to scan using any UPI App</DialogDescription>
              </DialogHeader>
              <div className="py-6 flex flex-col items-center space-y-6">
                <div className="bg-white p-4 rounded-xl border-4 border-[var(--color-primary)]/20 inline-block shadow-md">
                  <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=theowlcafe@upi&pn=TheOwlCafe&am=100.00&cu=INR" alt="QR Code" width={200} height={200} className="w-48 h-48" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl text-[var(--color-primary)]">₹{grandTotal.toFixed(2)}</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">Waiting for payment...</p>
                </div>
                <Button className="w-full" onClick={() => completePayment("QR Code")}>
                  Simulate Payment Success
                </Button>
              </div>
            </>
          )}

          {paymentStep === "CASH" && (
            <>
              <DialogHeader>
                <DialogTitle>Cash Payment</DialogTitle>
                <DialogDescription>Enter amount received from customer</DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center bg-[var(--color-secondary)]/50 p-4 rounded-lg">
                  <span className="font-medium">Total Due:</span>
                  <span className="font-bold text-xl">₹{grandTotal.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Label>Cash Received</Label>
                  <Input type="number" defaultValue={grandTotal} className="text-lg h-12" />
                </div>
                <Button className="w-full h-12" onClick={() => completePayment("Cash")}>
                  Mark as Paid
                </Button>
              </div>
            </>
          )}

          {paymentStep === "SUCCESS" && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="hidden">Success</DialogTitle>
              </DialogHeader>
              <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="h-24 w-24 text-green-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                  <p className="text-[var(--color-muted-foreground)]">Transaction ID: {completedOrderId}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <Button variant="outline" className="w-full" onClick={() => generateInvoice("download")}>
                    <FileText className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                  <Button className="w-full" onClick={() => generateInvoice("print")}>
                    <Printer className="mr-2 h-4 w-4" /> Print Invoice
                  </Button>
                </div>
                <Button variant="secondary" className="w-full mt-2" onClick={sendEmailReceipt}>
                  <Mail className="mr-2 h-4 w-4" /> Email Receipt
                </Button>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-[var(--color-muted-foreground)]"
                  onClick={() => {
                    clearCart();
                    setIsPaymentModalOpen(false);
                  }}
                >
                  Start New Order
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
