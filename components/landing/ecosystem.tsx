'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: 'Unified Platforms', value: '4' },
    { label: 'AI Operations', value: '1M+' },
    { label: 'User Success', value: '99%' },
    { label: 'Total Growth', value: 'Unlimited' },
];

export function Ecosystem() {
    return (
        <section id="ecosystem" className="py-24 relative">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                            One Infrastructure. <br />
                            <span className="text-gradient">Total Dominance.</span>
                        </h2>
                        <p className="text-white/50 text-xl leading-relaxed mb-12">
                            Netiva unifies disjointed markets into a single, high-fidelity
                            ecosystem. Our infrastructure handles the complexity, so you
                            can focus on pure, unadulterated growth.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                                    <div className="text-white/30 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="glass-card rounded-[60px] p-2 aspect-square max-w-lg mx-auto relative group">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-[60px] blur-[80px] group-hover:bg-blue-500/30 transition-colors" />
                            <div className="relative w-full h-full rounded-[58px] overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center p-12">
                                <div className="w-full aspect-video bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/5 flex items-center justify-center">
                                    <span className="text-white/20 font-display font-bold italic">Netiva Core Interface</span>
                                </div>
                            </div>
                        </div>

                        {/* Floaties */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-32 h-32 glass-card rounded-3xl border border-white/10 flex items-center justify-center"
                        >
                            <div className="w-12 h-1 bg-white/20 rounded-full" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 w-24 h-24 glass-card rounded-3xl border border-white/10 flex items-center justify-center"
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-white/10" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
