import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactOptions } from "@/components/sections/contact-options";
import { ContactTrust } from "@/components/sections/contact-trust";
import { ContactTestimonials } from "@/components/sections/contact-testimonials";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24">
        <ContactHero />
        <div className="container mx-auto px-4 -mt-24 relative z-20 pb-24">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-8">
              <ContactOptions />
              <ContactTrust />
            </div>
          </div>
        </div>
        <ContactTestimonials />
      </div>
      <Footer />
    </main>
  );
}
