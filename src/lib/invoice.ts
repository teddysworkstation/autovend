import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import JsBarcode from "jsbarcode";
import vmhLogo from "@/assets/vmh-logo.png";
import type { CartItem } from "@/hooks/useCart";

// ─── npm install jsbarcode ───────────────────────────────────────────────────

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

// ─── Constants ───────────────────────────────────────────────────────────────

const BRAND = {
  blue:       [22, 78, 167]   as [number, number, number],
  blueLight:  [219, 234, 254] as [number, number, number],
  orange:     [234, 88,  12]  as [number, number, number],
  orangeLight:[255, 237, 213] as [number, number, number],
  ink:        [15,  23,  42]  as [number, number, number],
  slate:      [71,  85,  105] as [number, number, number],
  muted:      [148, 163, 184] as [number, number, number],
  rule:       [226, 232, 240] as [number, number, number],
  white:      [255, 255, 255] as [number, number, number],
  rowAlt:     [248, 250, 252] as [number, number, number],
  green:      [22,  163,  74] as [number, number, number],
  greenLight: [220, 252, 231] as [number, number, number],
};

const PAYMENT_LABELS: Record<string, string> = {
  bank:  "Bank Transfer (ACH)",
  wire:  "Wire Transfer",
  zelle: "Zelle",
  btc:   "Bitcoin (BTC)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res  = await fetch(vmhLogo);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror  = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/** Renders a CODE128 barcode to a PNG data-URL via an off-screen <canvas>. */
function generateBarcodeDataUrl(value: string): string | null {
  try {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
      format:      "CODE128",
      width:       2,
      height:      48,
      displayValue: false,
      margin:      0,
      background:  "#ffffff",
      lineColor:   "#0f172a",
    });
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

/** Draws a hairline rule. */
function hRule(
  doc: jsPDF,
  x1: number,
  x2: number,
  y: number,
  color: [number, number, number] = BRAND.rule,
  weight = 0.5,
) {
  doc.setDrawColor(...color);
  doc.setLineWidth(weight);
  doc.line(x1, y, x2, y);
}

/** Draws a filled rounded badge. */
function badge(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  bg: [number, number, number],
  fg: [number, number, number],
) {
  const pad  = 6;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  const w = doc.getTextWidth(text) + pad * 2;
  doc.setFillColor(...bg);
  doc.roundedRect(x, y - 9, w, 13, 3, 3, "F");
  doc.setTextColor(...fg);
  doc.text(text, x + pad, y);
}

// ─── Main generator ──────────────────────────────────────────────────────────

export async function generateInvoicePDF(data: InvoiceData): Promise<jsPDF> {
  const doc   = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();   // 612 pt
  const pageH = doc.internal.pageSize.getHeight();  // 792 pt
  const L     = 40;   // left margin
  const R     = 572;  // right margin
  const W     = R - L; // content width

  // ── 1. Header band ──────────────────────────────────────────────────────────
  doc.setFillColor(...BRAND.blue);
  doc.rect(0, 0, pageW, 80, "F");

  // Accent bar
  doc.setFillColor(...BRAND.orange);
  doc.rect(0, 80, pageW, 4, "F");

  // Logo
  const logo = await loadLogoDataUrl();
  if (logo) {
    try { doc.addImage(logo, "PNG", L, 15, 48, 48); } catch { /* skip */ }
  }

  // Company name + tagline
  doc.setTextColor(...BRAND.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Vending Machine Hub", L + 58, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 220, 255);
  doc.text("Premium Vending Machines  ·  Free Nationwide Delivery", L + 58, 50);
  doc.text("vendingmachinehub.com  ·  support@vendingmachinehub.com", L + 58, 62);

  // "INVOICE" label (top-right)
  doc.setTextColor(...BRAND.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("INVOICE", R, 42, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 255);
  doc.text(`Order #: ${data.orderNumber}`, R, 56, { align: "right" });
  doc.text(`Date: ${data.date}`, R, 68, { align: "right" });

  // ── 2. Meta row (barcode + status badge) ────────────────────────────────────
  let y = 104;

  // Barcode (left)
  const barPng = generateBarcodeDataUrl(data.orderNumber);
  if (barPng) {
    try {
      doc.addImage(barPng, "PNG", L, y, 130, 32);
    } catch { /* skip */ }
    doc.setTextColor(...BRAND.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(data.orderNumber, L + 65, y + 38, { align: "center" });
  }

  // Status badge (right-aligned)
  badge(doc, "● PENDING CONFIRMATION", R - 130, y + 16, BRAND.orangeLight, BRAND.orange);

  y += 54;
  hRule(doc, L, R, y);
  y += 14;

  // ── 3. Bill To / Order Info (two columns) ───────────────────────────────────
  const colMid = L + W / 2 + 10;

  // Left column: Bill To
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND.muted);
  doc.setCharSpace(1);
  doc.text("BILL TO", L, y);
  doc.setCharSpace(0);

  y += 11;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...BRAND.ink);
  const c = data.customer;
  doc.text(`${c.firstName} ${c.lastName}`, L, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...BRAND.slate);
  const billLines = [
    c.company         ? c.company                         : null,
    c.businessType    ? `Business Type: ${c.businessType}` : null,
    c.address,
    `${c.city}, ${c.state} ${c.zip}`,
    c.email,
    c.phone,
    c.altPhone        ? `Alt: ${c.altPhone}`               : null,
    c.preferredContact? `Preferred Contact: ${c.preferredContact}` : null,
    c.preferredTime   ? `Best Time: ${c.preferredTime}`    : null,
  ].filter(Boolean) as string[];

  billLines.forEach((line, i) => doc.text(line, L, y + 12 + i * 12));

  // Right column: Order Info
  const infoY = y - 11;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND.muted);
  doc.setCharSpace(1);
  doc.text("ORDER INFO", colMid, infoY);
  doc.setCharSpace(0);

  const paymentLabel = data.paymentMethod ? PAYMENT_LABELS[data.paymentMethod] : "TBD";
  const infoRows: [string, string][] = [
    ["Order Number",     data.orderNumber],
    ["Invoice Date",     data.date],
    ["Payment Plan",     data.plan === "monthly" ? "Monthly Subscription" : "One-Time Payment"],
    ["Payment Method",   paymentLabel],
    ["Delivery",         "Free Nationwide"],
    ["Warranty",         "1-Year Limited Parts"],
  ];

  infoRows.forEach(([label, value], i) => {
    const rowY = infoY + 12 + i * 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND.muted);
    doc.text(`${label}:`, colMid, rowY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND.ink);
    doc.text(value, R, rowY, { align: "right" });
  });

  y += Math.max(billLines.length * 12 + 14, infoRows.length * 14 + 14) + 18;

  hRule(doc, L, R, y);
  y += 18;

  // ── 4. Items table ───────────────────────────────────────────────────────────
  autoTable(doc, {
    startY: y,
    head: [["#", "Item Description", "Qty", "Unit Price", "Total"]],
    body: data.items.map((it, idx) => [
      String(idx + 1),
      it.title,
      String(it.quantity),
      fmt(it.price),
      fmt(it.price * it.quantity),
    ]),
    theme: "plain",
    headStyles: {
      fillColor:   BRAND.blue,
      textColor:   BRAND.white,
      fontStyle:   "bold",
      fontSize:    9.5,
      cellPadding: { top: 8, bottom: 8, left: 8, right: 8 },
    },
    bodyStyles: {
      fontSize:    9.5,
      textColor:   BRAND.ink,
      cellPadding: { top: 7, bottom: 7, left: 8, right: 8 },
    },
    alternateRowStyles: { fillColor: BRAND.rowAlt },
    columnStyles: {
      0: { cellWidth: 24,  halign: "center",  textColor: BRAND.muted },
      1: { cellWidth: "auto" },
      2: { cellWidth: 40,  halign: "center" },
      3: { cellWidth: 90,  halign: "right" },
      4: { cellWidth: 90,  halign: "right",  fontStyle: "bold" },
    },
    margin:      { left: L, right: L },
    tableLineColor: BRAND.rule,
    tableLineWidth: 0.5,
  });

  // ── 5. Totals block ──────────────────────────────────────────────────────────
  let ty = ((doc as any).lastAutoTable.finalY as number) + 20;

  const totW  = 230;
  const totX  = R - totW;
  const valX  = R;

  // Helper: draw one totals row
  function totRow(label: string, value: string, bold = false) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...BRAND.slate);
    doc.text(label, totX, ty);
    doc.setTextColor(bold ? BRAND.ink : BRAND.slate);
    doc.text(value, valX, ty, { align: "right" });
    ty += 16;
  }

  totRow("Subtotal",           fmt(data.subtotal));
  totRow("Shipping & Handling", "FREE");
  totRow("Tax",                "Included / N/A");
  hRule(doc, totX, valX, ty - 4, BRAND.rule, 0.5);
  ty += 4;
  totRow("Order Total",        fmt(data.subtotal), true);

  ty += 4;

  // ── Amount Due highlight box ─────────────────────────────────────────────────
  //
  //  Always shows the ACTUAL PRODUCT TOTAL as "Amount Due".
  //  For monthly plans we additionally show the first monthly instalment below it.
  //
  const dueBoxH = data.plan === "monthly" ? 60 : 50;
  doc.setFillColor(...BRAND.blue);
  doc.roundedRect(totX - 10, ty - 2, totW + 10, dueBoxH, 5, 5, "F");

  doc.setTextColor(...BRAND.white);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("TOTAL AMOUNT DUE", totX, ty + 13);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(fmt(data.subtotal), valX, ty + 13, { align: "right" });

  if (data.plan === "monthly") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(200, 220, 255);
    doc.text("First Monthly Instalment:", totX, ty + 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...BRAND.white);
    doc.text(`${fmt(150)} / month`, valX, ty + 30, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(200, 220, 255);
    doc.text(`Machine value (${fmt(data.subtotal)}) paid via ${fmt(150)}/mo subscription`, totX, ty + 43);
  }

  ty += dueBoxH + 18;

  // ── 6. Payment instructions notice ─────────────────────────────────────────
  const noticeH = 72;
  doc.setFillColor(...BRAND.orangeLight);
  doc.setDrawColor(...BRAND.orange);
  doc.setLineWidth(0.8);
  doc.roundedRect(L, ty, W, noticeH, 5, 5, "FD");

  // Left accent stripe
  doc.setFillColor(...BRAND.orange);
  doc.roundedRect(L, ty, 4, noticeH, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.orange);
  doc.text("Payment Instructions", L + 14, ty + 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND.ink);

  const noticeText = paymentLabel !== "TBD"
    ? [
        `Selected method: ${paymentLabel}. Account / wallet details will be provided securely after`,
        "order confirmation. A VMH specialist will contact you within 1 business hour.",
        "⚠  Do NOT send any payment until you receive written confirmation from VMH.",
      ]
    : [
        "A VMH specialist will contact you within 1 business hour to verify your order and",
        "send secure payment instructions.",
        "⚠  Do NOT send any payment until you receive written confirmation from VMH.",
      ];

  noticeText.forEach((line, i) => doc.text(line, L + 14, ty + 30 + i * 12));

  // Notes section (if any)
  if (c.notes) {
    ty += noticeH + 14;
    doc.setFillColor(...BRAND.blueLight);
    doc.roundedRect(L, ty, W, 40, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.blue);
    doc.text("CUSTOMER NOTES", L + 10, ty + 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND.ink);
    doc.text(c.notes.slice(0, 120), L + 10, ty + 26);
  }

  // ── 7. Footer ────────────────────────────────────────────────────────────────
  const footerY = pageH - 38;

  hRule(doc, L, R, footerY - 8, BRAND.rule, 0.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND.muted);
  doc.text(
    "Vending Machine Hub (VMH)  ·  Free Nationwide Delivery  ·  1-Year Limited Parts Warranty  ·  Lifetime Toll-Free Support",
    pageW / 2,
    footerY,
    { align: "center" },
  );
  doc.text("Thank you for choosing Vending Machine Hub!", pageW / 2, footerY + 12, { align: "center" });

  // Page number
  doc.text("Page 1 of 1", R, footerY, { align: "right" });

  return doc;
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export async function downloadInvoicePDF(data: InvoiceData): Promise<void> {
  const doc = await generateInvoicePDF(data);
  doc.save(`VMH-Invoice-${data.orderNumber}.pdf`);
}

export async function getInvoicePDFBase64(data: InvoiceData): Promise<string> {
  const doc     = await generateInvoicePDF(data);
  const dataUri = doc.output("datauristring");
  return dataUri.split(",")[1];
}
