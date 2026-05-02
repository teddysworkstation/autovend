import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewsletterForm from "@/components/NewsletterForm";

export const faqData = [
  { q: "What are my payment options?", a: "You can pay the full machine price upfront, or choose our flexible $150/month payment plan with no deposit required. Both options include free nationwide shipping and full warranty coverage." },
  { q: "Do I need experience to start a vending business?", a: "Absolutely not! Most of our customers are first-time entrepreneurs. We provide complete setup guidance, location tips, and lifetime technical support." },
  { q: "How much can I realistically earn per month?", a: "Earnings vary by location and machine type. On average, a single snack/combo machine earns $400–$1,200/month. Premium locations like gyms and offices tend to perform better." },
  { q: "Do the machines accept credit cards and mobile payments?", a: "Yes! Most of our machines come cashless-payment ready or can be upgraded with a card reader that accepts credit/debit cards, Apple Pay, and Google Pay." },
  { q: "How long does delivery take?", a: "Standard delivery takes 5–10 business days anywhere in the continental US. White-glove delivery with setup assistance is available for an additional fee." },
  { q: "What warranty do the machines come with?", a: "All new machines include a 1-year limited parts warranty and lifetime toll-free technical support." },
  { q: "Can I get a refund if I change my mind?", a: "Yes — orders may be cancelled free of charge before shipping. After delivery, returns are accepted within 30 days in original condition." },
  { q: "Do you help with finding locations?", a: "While we don't place machines for you, we provide a comprehensive location guide, negotiation templates, and tips on the best locations for each machine type." },
  { q: "What payment methods do you accept?", a: "Payment details will be communicated after order confirmation. Once you place your order, a VMH specialist will contact you within 1 business hour to verify your details and securely share payment instructions for your selected plan (one-time payment or $150/month)." },
  { q: "Are the machines new or refurbished?", a: "We offer both. New machines come with full manufacturer warranty. Certified pre-owned machines are thoroughly inspected and come with a 90-day warranty." },
  { q: "Do I need to get permits or licenses?", a: "Requirements vary by state and city. Most locations only require a basic business license. We provide a state-by-state guide to help you navigate this." },
  { q: "Can I operate multiple machines?", a: "Absolutely! Many of our most successful customers operate 3–10+ machines. Volume discounts are available for multi-machine purchases." },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pb-20 pt-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-sm font-medium text-primary mb-2 block">Support</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Everything you need to know about starting your vending machine business.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30">
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-20">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
