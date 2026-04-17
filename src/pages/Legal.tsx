import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const legalPages: Record<string, { title: string; content: string }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    content: `Last updated: April 5, 2026

AutoVend Solutions ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.

**Information We Collect**
We collect information you provide directly: name, email, phone number, shipping address, and payment information. We also collect usage data including IP address, browser type, and pages visited.

**How We Use Your Information**
- Process orders and payments
- Send order confirmations and shipping updates
- Respond to inquiries and provide customer support
- Send marketing communications (with your consent)
- Improve our website and services

**Data Sharing**
We do not sell your personal data. We share data only with payment processors (Stripe), shipping carriers, and email service providers necessary to fulfill orders.

**Cookies**
We use essential cookies for site functionality and analytics cookies to understand how visitors use our site.

**Your Rights**
You may request access to, correction of, or deletion of your personal data by contacting support@autovendsolutions.com.

**Data Security**
We use industry-standard encryption and security measures to protect your data.

**Contact**
For privacy-related questions: support@autovendsolutions.com`,
  },
  "terms-of-service": {
    title: "Terms of Service",
    content: `Last updated: April 5, 2026

These Terms of Service govern your use of autovendsolutions.com and any purchases made through our platform.

**Acceptance of Terms**
By using our website or making a purchase, you agree to these terms in full.

**Products & Pricing**
All prices are listed in USD. We reserve the right to change prices at any time. Prices are locked at the time of order confirmation.

**Deposit & Payment**
- A $500 deposit secures your machine
- Deposits are refundable before balance payment
- Balance is due after video proof is provided
- Full payment orders are processed immediately

**Shipping & Delivery**
Standard shipping is 5-10 business days to continental US. Alaska and Hawaii may require additional time and fees.

**Warranties**
New machines include a 1-year limited parts warranty. Used/refurbished machines include a 90-day warranty. Warranty does not cover misuse, modifications, or normal wear.

**Returns**
Returns accepted within 30 days of delivery in original condition. Customer is responsible for return shipping costs. Deposits are refundable before full payment.

**Limitation of Liability**
Income estimates are for informational purposes only. Actual earnings depend on location, product selection, and management. We do not guarantee specific income amounts.

**Governing Law**
These terms are governed by the laws of the State of Florida.

**Contact**
Questions about these terms: support@autovendsolutions.com`,
  },
  "refund-policy": {
    title: "Refund Policy",
    content: `Last updated: April 5, 2026

**Deposit Refunds**
Your $500 deposit is fully refundable at any time before the balance payment is made. Refunds are processed within 5-7 business days.

**Full Payment Refunds**
If you paid the full price, you may request a refund within 30 days of delivery, provided the machine is in its original condition and packaging.

**How to Request a Refund**
Contact support@autovendsolutions.com with your order number. Our team will process your request within 48 hours.

**Non-Refundable Items**
- Custom-configured machines
- Machines that have been installed or used
- Shipping and handling fees

**Damaged/Defective Machines**
If your machine arrives damaged or defective, contact us immediately. We will arrange a replacement or full refund at no additional cost.

**Cancellation**
Orders may be cancelled free of charge before shipping. Once shipped, the standard return policy applies.`,
  },
  "shipping-policy": {
    title: "Shipping Policy",
    content: `Last updated: April 5, 2026

**Standard Shipping**
- Continental US: 5–10 business days
- Included with all orders
- Full tracking provided

**White-Glove Delivery**
Available for an additional fee. Includes:
- Scheduled delivery window
- Indoor placement at your location
- Unpacking and basic setup
- Removal of packaging materials

**Shipping Zones & Estimated Times**
- East Coast: 3–5 business days
- Midwest: 5–7 business days
- West Coast: 7–10 business days
- Alaska/Hawaii: 10–15 business days (additional fees apply)

**Tracking**
You'll receive a tracking number via email once your machine ships. Track your delivery at any time through your account dashboard.

**Delivery Requirements**
- Someone must be present to receive the delivery
- Ensure adequate access (doors, elevators) for large machines
- Machines are delivered to ground level unless white-glove service is selected

**Damaged During Shipping**
Inspect your machine upon delivery. Report any damage within 48 hours for a full replacement.`,
  },
  "warranty": {
    title: "Warranty Information",
    content: `Last updated: April 5, 2026

**New Machine Warranty**
All new vending machines come with a 1-year limited parts warranty covering:
- Compressor and refrigeration system
- Payment system components
- Electronic control boards
- Vending mechanisms and motors
- LED lighting systems

**Used/Refurbished Machine Warranty**
Certified pre-owned machines include a 90-day limited warranty covering major components.

**What Is NOT Covered**
- Cosmetic damage or normal wear
- Damage from misuse, modifications, or vandalism
- Power surge damage
- Consumable items (light bulbs, door seals)

**Lifetime Technical Support**
All customers receive free, unlimited toll-free technical support for the life of the machine. Our support team can help troubleshoot issues remotely.

**How to File a Claim**
1. Contact support@autovendsolutions.com
2. Provide your order number and description of the issue
3. Our team will diagnose and ship replacement parts within 48 hours

**Extended Warranty**
Optional 2-year extended warranty available for purchase at checkout.`,
  },
};

export default function Legal() {
  const { page } = useParams();
  const content = legalPages[page || ""];

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Page Not Found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Back Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">{content.title}</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-8">{content.title}</h1>
            <div className="prose prose-sm max-w-none">
              {content.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h2 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{paragraph.replace(/\*\*/g, "")}</h2>;
                }
                if (paragraph.startsWith("**")) {
                  const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1];
                  const rest = paragraph.replace(/\*\*.*?\*\*/, "").trim();
                  return (
                    <div key={i} className="mt-6">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
                      {rest.includes("- ") ? (
                        <ul className="space-y-1">
                          {rest.split("\n").filter(l => l.startsWith("- ")).map((line, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span> {line.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">{rest}</p>
                      )}
                    </div>
                  );
                }
                if (paragraph.includes("- ")) {
                  return (
                    <ul key={i} className="space-y-1 mt-2">
                      {paragraph.split("\n").filter(l => l.startsWith("- ")).map((line, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {line.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  return (
                    <ol key={i} className="space-y-1 mt-2">
                      {paragraph.split("\n").map((line, j) => (
                        <li key={j} className="text-sm text-muted-foreground">{line}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="text-sm text-muted-foreground leading-relaxed mt-3">{paragraph}</p>;
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
