'use client';

import { motion } from 'framer-motion';
import { GraduationCap, FileText, MessageSquare, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const products = [
    {
        name: 'EdTech SMS',
        description: 'Comprehensive school management system with parent-teacher portal and automated grading.',
        icon: GraduationCap,
        href: '/dashboard/edtech',
        color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
        name: 'ResumeRocket AI',
        description: 'AI-powered resume builder and ATS optimizer to land your dream job in record time.',
        icon: FileText,
        href: '/dashboard/resume',
        color: 'from-purple-500/20 to-pink-500/20',
    },
    {
        name: 'BidAI Pro',
        description: 'Specialized AI for freelance proposals that wins high-ticket clients on autopilot.',
        icon: MessageSquare,
        href: '/dashboard/bidai',
        color: 'from-orange-500/20 to-red-500/20',
    },
    {
        name: 'Affiliates Omega',
        description: 'Next-gen affiliate and lead generation tracking software for maximum conversion.',
        icon: Users,
        href: '/dashboard/affiliates',
        color: 'from-green-500/20 to-emerald-500/20',
    },
];

export function ProductCards() {
    return (
        <section id="products" className="py-24 relative overflow-hidden">
            <div className="container px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">The Netiva Ecosystem</h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg">
                        A unified suite of high-performance tools designed to dominate
                        education, careers, and freelance growth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={product.href} className="group block h-full">
                                <div className="glass-card p-8 h-full rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:premium-glow relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <product.icon className="w-6 h-6 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            {product.name}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </h3>

                                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                                            {product.description}
                                        </p>

                                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                                            Explore Product
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
