import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import vmhLogo from "@/assets/vmh-logo.png";
import type { CartItem } from "@/hooks/useCart";

// Simple barcode generation using Code128 encoding
function generateCode128Barcode(text: string): string[] {
  const code128Chars = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  const code128Table: Record<number, string> = {
    0: "11011001100", 1: "11001101100", 2: "11001100110", 3: "10010011000",
    4: "10010001100", 5: "10001001100", 6: "10011001000", 7: "10011000100",
    8: "10001100100", 9: "11001010000", 10: "11001000100", 11: "11000100100",
    12: "10110011000", 13: "10011011000", 14: "10011001000", 15: "10010110000",
    16: "10010100110", 17: "10010010110", 18: "10010011010", 19: "10011010010",
    20: "10011010100", 21: "10011010010", 22: "10110010100", 23: "10110010010",
    24: "10110001010", 25: "10101011000", 26: "10101001100", 27: "10100101100",
    28: "10100100110", 29: "10010110100", 30: "10010110010", 31: "10010101010",
    32: "11000101010", 33: "11000100110", 34: "11000010110", 35: "10110101000",
    36: "10110100100", 37: "10110010010", 38: "10101101000", 39: "10101100100",
    40: "10101011000", 41: "10100110100", 42: "10010101100", 43: "11010001010",
    44: "11010010100", 45: "11010010010", 46: "11010100100", 47: "11010100010",
    48: "11010010010", 49: "11000101100", 50: "11000100100", 51: "11000010100",
    52: "10110011100", 53: "10110001110", 54: "10110100110", 55: "10110010110",
    56: "10011011100", 57: "10011001110", 58: "10011100110", 59: "10001011100",
    60: "10100111100", 61: "10010111100", 62: "10010011110", 63: "10111001100",
    64: "10100001110", 65: "11010001110", 66: "11000111010", 67: "11000111100",
    68: "10111011100", 69: "10111001110", 70: "10111000110", 71: "10001110110",
    72: "11101110110", 73: "11010001110", 74: "11000111010", 75: "11101101110",
    76: "11101011110", 77: "11101001110", 78: "10010000110", 79: "10001001110",
    80: "10010010110", 81: "10010011010", 82: "10011010010", 83: "10011010100",
    84: "10011010010", 85: "10110010100", 86: "10110010010", 87: "10110001010",
    88: "10101011000", 89: "10101001100", 90: "10100101100", 91: "10100100110",
    92: "10010110100", 93: "10010110010", 94: "10010101010", 95: "11000101010",
    96: "11000100110", 97: "11000010110", 98: "10110101000", 99: "10110100100",
    100: "10110010010", 101: "10101101000", 102: "10101100100", 103: "10101011000",
    104: "10100110100", 105: "10010101100", 106: "11010001010", 107: "11010010100",
    108: "11010010010", 109: "11010100100", 110: "11010100010", 111: "11010010010",
  };
  
  const bars: string[] = [];
  const startCode = "11010010000";
  bars.push(startCode);
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const code = code128Table[charCode] || "11010010000";
    bars.push(code);
  }
  
  const checksum = (text.length + 104) % 103;
  bars.push(code128Table[checksum] || "11010010000");
  bars.push("1100011101011");
  
  return bars;
}

// Function to render barcode on PDF
function renderBarcodeOnPDF(doc: jsPDF, text: string, x: number, y: number, width: number, height: number) {
  const bars = generateCode128Barcode(text);
  const totalBits = bars.reduce((sum, bar) => sum + bar.length, 0);
  const bitWidth = width / totalBits;
  
  doc.setDrawColor(0, 0, 0);
  doc.setFillColor(0, 0, 0);
  
  let currentX = x;
  bars.forEach((bar) => {
    const bits = bar.split("");
    bits.forEach((bit) => {
      if (bit === "1") {
        doc.rect(currentX, y, bitWidth, height, "F");
      }
      currentX += bitWidth;
    });
  });
}

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
  const paymentLabel = data.paymentMethod ? PAYMENT_LABELS[data.paymentMethod] : null;
  const statusLines = [
    `Plan: ${data.plan === "monthly" ? "$150 / month subscription" : "One-Time Payment"}`,
    paymentLabel ? `Payment Method: ${paymentLabel}` : "",
    "Payment instructions will be",
    "shared after confirmation.",
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

  // Order Total row
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...TEXT);
  const orderTotalPrice = data.plan === "monthly" ? 150 : data.subtotal;
  doc.text("Order Total", labelX, finalY + 44);
  doc.text(fmt(orderTotalPrice), valX, finalY + 44, { align: "right" });

  // Amount Due (highlighted)
  const dueY = finalY + 60;
  doc.setFillColor(...BLUE);
  doc.roundedRect(labelX - 8, dueY - 2, (valX - labelX) + 16, 40, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.plan === "monthly" ? "MONTHLY PAYMENT DUE" : "TOTAL AMOUNT DUE", labelX, dueY + 12);
  doc.setFontSize(18);
  doc.text(
    data.plan === "monthly" ? `${fmt(150)} / month` : fmt(data.subtotal),
    valX,
    dueY + 26,
    { align: "right" }
  );
  if (data.plan === "monthly") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`Full machine value: ${fmt(data.subtotal)}`, valX, dueY + 36, { align: "right" });
  }

  // Payment notice
  let py = dueY + 60;
  doc.setFillColor(255, 247, 235);
  doc.setDrawColor(...ORANGE);
  doc.roundedRect(margin, py, pageW - margin * 2, 78, 6, 6, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ORANGE);
  doc.text(
    paymentLabel
      ? `Selected Payment Method: ${paymentLabel}`
      : "Payment Details — Communicated After Confirmation",
    margin + 14,
    py + 18,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  const noticeLines = paymentLabel
    ? [
        `You selected ${paymentLabel} as your preferred payment method.`,
        "Account / wallet details will be shared securely after order confirmation.",
        "A VMH specialist will contact you within 1 business hour to verify your order",
        "and send secure payment instructions. Do NOT send any payment until confirmed.",
      ]
    : [
        "A VMH specialist will contact you within 1 business hour to verify your order",
        "and send secure payment instructions. Do NOT send any payment until confirmed.",
      ];
  noticeLines.forEach((l, i) => doc.text(l, margin + 14, py + 34 + i * 11));

  // Barcode section
  const barcodeY = py + 100;
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Order Reference", margin, barcodeY);
  
  // Render barcode
  renderBarcodeOnPDF(doc, data.orderNumber, margin, barcodeY + 8, 100, 30);
  
  // Barcode text
  doc.setFontSize(8);
  doc.setTextColor(...TEXT);
  doc.text(data.orderNumber, margin, barcodeY + 42);

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
