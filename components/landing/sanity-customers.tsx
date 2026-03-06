'use client';

import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'There are so many exciting combinations that Netiva can create. Now that we have a structure, it\'s infinitely scalable.',
    author: 'Bettina Donmez',
    role: 'E-Commerce Platform Development',
    company: 'PUMA',
  },
  {
    quote: 'We use Netiva to power a lot of content across our platform. It works well from an engineering perspective.',
    author: 'Paco Coursey',
    role: 'Webmaster',
    company: 'Linear',
  },
  {
    quote: 'Because our platform was supporting the lowest common denominator, if we wanted to create a web version we\'d have to create an entirely new version.',
    author: 'Emily Diamond',
    role: 'SVP, Head of Product',
    company: 'Morning Brew',
  },
];

const logos = ['PUMA', 'Linear', 'Morning Brew', 'Tecovas'];

export function SanityCustomers() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customers</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by the most innovative teams
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Innovative brands build fast, scalable solutions with Netiva's Unified AI Ecosystem
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="space-y-4">
                <Quote className="h-6 w-6 text-primary" />
                <p className="text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role} @ {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {logos.map((logo) => (
              <div
                key={logo}
                className="h-16 flex items-center justify-center text-2xl font-bold text-muted-foreground"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
