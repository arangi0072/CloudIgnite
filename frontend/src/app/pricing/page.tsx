'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const pricingTiers = {
  monthly: [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'For indie developers & personal projects.',
      features: [
        '1 Million API Requests',
        '10 GB Storage',
        'Community Support',
        'Usage-based scaling',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      price: '$99',
      period: '/month',
      description: 'For startups and growing businesses.',
      features: [
        '10 Million API Requests',
        '100 GB Storage',
        'Email & Chat Support',
        'Transparent pricing',
        'No hidden fees',
      ],
      cta: 'Choose Growth',
      highlighted: true,
    },
    {
      name: 'Scale',
      price: 'Custom',
      period: '',
      description: 'For high-traffic applications.',
      features: [
        'Unlimited API Requests',
        'Custom Storage Quotas',
        'Dedicated Support & SLAs',
        'Advanced Security',
        'Volume discounts',
      ],
      cta: 'Contact Sales',
    },
  ],
  yearly: [
    {
      name: 'Starter',
      price: '$290',
      period: '/year',
      description: 'For indie developers & personal projects.',
      features: [
        '1 Million API Requests',
        '10 GB Storage',
        'Community Support',
        'Usage-based scaling',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      price: '$990',
      period: '/year',
      description: 'For startups and growing businesses.',
      features: [
        '10 Million API Requests',
        '100 GB Storage',
        'Email & Chat Support',
        'Transparent pricing',
        'No hidden fees',
      ],
      cta: 'Choose Growth',
      highlighted: true,
    },
    {
      name: 'Scale',
      price: 'Custom',
      period: '',
      description: 'For high-traffic applications.',
      features: [
        'Unlimited API Requests',
        'Custom Storage Quotas',
        'Dedicated Support & SLAs',
        'Advanced Security',
        'Volume discounts',
      ],
      cta: 'Contact Sales',
    },
  ],
};

const faqs = [
    {
        question: 'Do you charge per request?',
        answer: "No, we believe in predictable pricing. Our plans come with generous request allowances. If you exceed them, we offer usage-based scaling options that are transparent and affordable, so you never get a surprise bill."
    },
    {
        question: 'Is there a free tier?',
        answer: "We do not currently offer a free tier. However, our 'Starter' plan is priced to be accessible for indie developers and personal projects. We believe this model allows us to provide a high-quality, sustainable service for all our users."
    },
    {
        question: 'Can I scale anytime?',
        answer: 'Absolutely. You can upgrade or downgrade your plan at any time from your account dashboard. Changes are pro-rated, so you only pay for what you use. Our infrastructure is built to scale with you, not against you.'
    }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl">
              Simple Pricing That Scales With You.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Transparent, predictable pricing. No hidden fees, no surprises.
            </p>

            <div className="mt-10 flex justify-center">
              <Tabs
                defaultValue="monthly"
                onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingTiers[billingCycle].map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    'flex flex-col border-border/50 bg-secondary/30 transition-all duration-300',
                    tier.highlighted && 'border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]'
                  )}
                >
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl font-bold text-foreground">
                      {tier.name}
                    </CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-6">
                    <div className="flex items-baseline gap-2">
                        <span className="font-headline text-5xl font-bold tracking-tight text-foreground">
                            {tier.price}
                        </span>
                        {tier.period && (
                            <span className="text-muted-foreground">{tier.period}</span>
                        )}
                    </div>
                    <ul className="space-y-4 text-left">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={cn(
                        'w-full',
                        tier.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground'
                      )}
                      size="lg"
                    >
                      {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 border-t border-border">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-center font-headline text-4xl font-bold tracking-tighter">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="mt-12 w-full">
                {faqs.map((faq) => (
                    <AccordionItem value={faq.question} key={faq.question}>
                        <AccordionTrigger className="text-lg text-left hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
