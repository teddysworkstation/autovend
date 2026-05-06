import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import vmhLogo from "@/assets/vmh-logo.png";
import type { CartItem } from "@/hooks/useCart";

export interface InvoiceCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone?: string;
  company?: string;
  businessType?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredContact?: string;
  preferredTime?: string;
  notes?: string;
}

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customer: InvoiceCustomer;
  items: CartItem[];
  subtotal: number;
  plan: "onetime" | "monthly";
  paymentMethod?: "bank" | "wire" | "zelle" | "btc";
}

const PAYMENT_LABELS: Record<string, string> = {
  bank: "Bank Transfer (ACH)",
  wire: "Wire Transfer",
  zelle: "Zelle",
  btc: "Bitcoin (BTC)",
};

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch(vmhLogo);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export async function generateInvoicePDF(data: InvoiceData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;

  // Brand colors (VMH blue/orange)
  const BLUE: [number, number, number] = [38, 110, 217];
  const ORANGE: [number, number, number] = [240, 145, 38];
  const TEXT: [number, number, number] = [30, 41, 59];
  const MUTED: [number, number, number] = [100, 116, 139];

  // Header
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, pageW, 90, "F");

  const logo = await loadLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, "PNG", margin, 22, 50, 50);
    } catch {}
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Vending Machine Hub", margin + 60, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Premium Vending Machines for Sale", margin + 60, 58);
  doc.text("https://www.vendingmachinehub.com  •  support@vendingmachinehub.com", margin + 60, 72);

  // Invoice title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", pageW - margin, 42, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Order #: ${data.orderNumber}`, pageW - margin, 60, { align: "right" });
  doc.text(`Date: ${data.date}`, pageW - margin, 74, { align: "right" });

  let y = 130;

  // Bill To
  doc.setTextColor(...MUTED);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", margin, y);
  doc.text("ORDER STATUS", pageW / 2 + 10, y);
  y += 14;
  doc.setTextColor(...TEXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const c = data.customer;
  const billTo = [
    `${c.firstName} ${c.lastName}`,
    c.company || "",
    c.address,
    `${c.city}, ${c.state} ${c.zip}`,
    c.email,
    c.phone,
    c.altPhone ? `Alt: ${c.altPhone}` : "",
    c.businessType ? `Business: ${c.businessType}` : "",
  ].filter(Boolean);
  billTo.forEach((line, i) => doc.text(line, margin, y + i * 13));

  // Status
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ORANGE);
  doc.text("PENDING CONFIRMATION", pageW / 2 + 10, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...TEXT);
  doc.setFontSize(9);
  const statusLines = [
    `Plan: ${data.plan === "monthly" ? "$150 / month subscription" : "One-Time Payment"}`,
    "Payment instructions will be",
    "communicated by email/phone",
    "within 1 business hour.",
    c.preferredContact ? `Contact via: ${c.preferredContact}` : "",
    c.preferredTime ? `Best time: ${c.preferredTime}` : "",
  ].filter(Boolean);
  statusLines.forEach((line, i) => doc.text(line, pageW / 2 + 10, y + 14 + i * 12));

  y = y + Math.max(billTo.length, statusLines.length + 1) * 13 + 20;

  // Items table
  autoTable(doc, {
    startY: y,
    head: [["Item", "Qty", "Unit Price", "Total"]],
    body: data.items.map((it) => [it.title, String(it.quantity), fmt(it.price), fmt(it.price * it.quantity)]),
    theme: "grid",
    headStyles: { fillColor: BLUE, textColor: 255, fontStyle: "bold", fontSize: 10 },
    bodyStyles: { fontSize: 10, textColor: TEXT },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 50, halign: "center" },
      2: { cellWidth: 90, halign: "right" },
      3: { cellWidth: 90, halign: "right" },
    },
    margin: { left: margin, right: margin },
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 14;
  const totalsX = pageW - margin - 200;
  const labelX = totalsX;
  const valX = pageW - margin;

  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Subtotal", labelX, finalY);
  doc.setTextColor(...TEXT);
  doc.text(fmt(data.subtotal), valX, finalY, { align: "right" });

  doc.setTextColor(...MUTED);
  doc.text("Shipping", labelX, finalY + 16);
  doc.setTextColor(...TEXT);
  doc.text("FREE", valX, finalY + 16, { align: "right" });

  doc.setDrawColor(...BLUE);
  doc.setLineWidth(1);
  doc.line(labelX, finalY + 26, valX, finalY + 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...BLUE);
  doc.text(data.plan === "monthly" ? "Plan Total" : "Order Total", labelX, finalY + 44);
  doc.text(
    data.plan === "monthly" ? `${fmt(150)} / mo` : fmt(data.subtotal),
    valX,
    finalY + 44,
    { align: "right" }
  );

  // Payment notice
  let py = finalY + 70;
  doc.setFillColor(255, 247, 235);
  doc.setDrawColor(...ORANGE);
  doc.roundedRect(margin, py, pageW - margin * 2, 78, 6, 6, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ORANGE);
  doc.text("Payment Details — Communicated After Confirmation", margin + 14, py + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  const noticeLines = [
    "Accepted payment methods: Bank Transfer  •  Wire Transfer  •  Zelle  •  Bitcoin (BTC)",
    "A VMH specialist will contact you within 1 business hour to verify your order and securely",
    "share account, wallet, or routing details for your selected payment method.",
    "Do NOT send any payment until you have received written confirmation from VMH.",
  ];
  noticeLines.forEach((l, i) => doc.text(l, margin + 14, py + 34 + i * 11));

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Vending Machine Hub (VMH)  •  Free Nationwide Delivery  •  1-Year Limited Parts Warranty  •  Lifetime Toll-Free Support",
    pageW / 2,
    doc.internal.pageSize.getHeight() - 24,
    { align: "center" }
  );
  doc.text("Thank you for your order!", pageW / 2, doc.internal.pageSize.getHeight() - 12, { align: "center" });

  return doc;
}

export async function downloadInvoicePDF(data: InvoiceData) {
  const doc = await generateInvoicePDF(data);
  doc.save(`VMH-Invoice-${data.orderNumber}.pdf`);
}

export async function getInvoicePDFBase64(data: InvoiceData): Promise<string> {
  const doc = await generateInvoicePDF(data);
  // datauristring => "data:application/pdf;filename=...;base64,XXXX"
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1];
}
