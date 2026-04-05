import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { faqData } from "@/pages/FAQ";

export default function HomeFAQ() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">Questions?</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.slice(0, 6).map((faq, i) => (
              <AccordionItem key={i} value={`home-faq-${i}`} className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
