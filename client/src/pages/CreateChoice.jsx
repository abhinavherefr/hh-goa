import React from 'react';

import { Link } from 'react-router-dom';

import { ArrowLeft, ArrowRight, User, Users } from 'lucide-react';

import Logo from '../components/Logo';

import { PalmTree, Cloud, Wave, House, Coconut } from '../components/Decor';



const CreateChoice = () => {

    return (

        <div className="min-h-screen bg-hh-green dotted-bg relative overflow-hidden">

            {/* Nav */}

            <nav className="relative z-20 flex items-center justify-between px-4 md:px-10 py-6">

                <Logo sub="GOA 2026" mini="BUILD YOUR ID" />

                <Link to="/" className="btn-outline px-4 py-2 rounded-md flex items-center gap-2 text-xs tracking-widest">

                    <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> BACK TO THE POSTER

                </Link>

            </nav>



            {/* Decorations */}

            <Cloud className="absolute top-32 left-10 w-20 opacity-70 animate-bob-slow" />

            <Cloud className="absolute top-20 right-1/4 w-24 opacity-60 animate-bob" />

            <PalmTree className="absolute top-24 right-2 w-32 opacity-80" />

            <House className="absolute top-1/2 right-8 w-28 opacity-80" />

            <Coconut className="absolute top-1/3 left-6 w-5" />



            <section className="relative z-10 pt-4 pb-24 px-4 max-w-6xl mx-auto">

                <div className="text-center mb-10">

                    <div className="chip chip-pink inline-block mb-4">BUILD YOUR ID</div>

                    <h1 className="font-display text-4xl md:text-7xl leading-tight stroked-yellow">

                        WHAT ARE YOU <span className="zigzag inline-block">BUILDING?</span>

                    </h1>

                    <p className="mt-4 text-hh-cream/90 font-mono text-sm md:text-base">Build your collectible Hacker House Goa identity.</p>

                    <p className="mt-1 text-hh-cream/60 font-mono text-xs">Solo or squad — choose a frame, fit your photo, and press it to Goa.</p>

                </div>



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                    {/* SOLO */}

                    <Link to="/create/individual" className="group relative bg-hh-cream rounded-2xl p-6 border-2 border-hh-yellow shadow-[8px_8px_0_#0a3d24] hover:translate-y-[-2px] transition-transform tape">

                        <div className="chip chip-pink mb-4">For solo builders</div>

                        <div className="relative w-full aspect-[4/3] rounded-xl bg-hh-green-deep border-2 border-hh-yellow p-4 overflow-hidden">

                            <div className="absolute top-2 left-2 chip chip-yellow text-[8px]">YOUR FACE HERE</div>

                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-hh-yellow" />

                            <div className="absolute inset-0 flex items-end justify-center">

                                <svg viewBox="0 0 120 120" className="w-32 h-32">

                                    <circle cx="60" cy="48" r="24" fill="#f5edb7" stroke="#0a3d24" strokeWidth="3" />

                                    <ellipse cx="52" cy="46" rx="6" ry="3" fill="#0a3d24" />

                                    <ellipse cx="68" cy="46" rx="6" ry="3" fill="#0a3d24" />

                                    <path d="M20 120 Q60 80 100 120 Z" fill="#f5edb7" stroke="#0a3d24" strokeWidth="3" />

                                </svg>

                            </div>

                            <svg viewBox="0 0 300 20" className="absolute bottom-3 left-4 right-4" preserveAspectRatio="none">

                                <path d="M0 10 Q40 0 80 10 T160 10 T240 10 T300 10" stroke="#f9df32" strokeWidth="2" fill="none" />

                                <path d="M0 15 Q40 5 80 15 T160 15 T240 15 T300 15" stroke="#f9df32" strokeWidth="2" fill="none" />

                            </svg>

                        </div>

                        <h3 className="font-display text-3xl md:text-4xl text-hh-green-deep mt-6">BUILD SOLO</h3>

                        <div className="font-mono text-xs font-bold text-hh-pink tracking-widest mb-3">ONE BUILDER. ONE IDENTITY.</div>

                        <p className="font-mono text-xs text-hh-green-deep/80 leading-relaxed mb-4">

                            Create your personal Hacker House Goa Builder ID — pick a frame, fit your photo, generate a collectible badge.

                        </p>

                        <div className="flex gap-2 mb-6">

                            <span className="chip chip-yellow text-[9px]">✦ 1 PHOTO</span>

                            <span className="chip chip-yellow text-[9px]">✦ 1 BUILDER ID</span>

                        </div>

                        <div className="btn-yellow inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm">

                            <User className="w-4 h-4" strokeWidth={2.5} />

                            Build my ID

                            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

                        </div>

                    </Link>



                    {/* SQUAD */}

                    <Link to="/create/team" className="group relative bg-hh-green-deep rounded-2xl p-6 border-2 border-hh-yellow shadow-[8px_8px_0_#ec2f89] hover:translate-y-[-2px] transition-transform tape">

                        <div className="flex items-center justify-between mb-4">

                            <div className="chip chip-pink">Team mode</div>

                            <div className="chip chip-yellow text-[9px]">GENERATE ALL IDS AT ONCE</div>

                        </div>

                        <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center bg-hh-green-deep">

                            <div className="relative">

                                {[0, 1, 2, 3].map(i => (

                                    <div key={i} className="absolute w-28 h-20 bg-hh-cream rounded-md border-2 border-hh-yellow" style={{ left: i * 14 - 20, top: i * -6 + 20, transform: `rotate(${-6 + i * 4}deg)`, boxShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>

                                        <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-sm bg-hh-yellow flex items-center justify-center font-display text-[6px] text-hh-green-deep">HH</div>

                                        <div className="absolute right-1.5 top-1.5 bottom-1.5 w-10 rounded-sm bg-hh-green-light" />

                                        <div className="absolute left-1.5 bottom-1.5 right-14 h-1.5 rounded-sm bg-hh-pink" />

                                        <div className="absolute left-1.5 bottom-4 right-14 h-1 rounded-sm bg-hh-green-light" />

                                    </div>

                                ))}

                            </div>

                            <div className="absolute top-2 right-2 chip chip-yellow text-[9px]">FULL SET</div>

                        </div>

                        <h3 className="font-display text-3xl md:text-4xl text-hh-yellow mt-6">BUILD YOUR SQUAD</h3>

                        <div className="font-mono text-xs font-bold text-hh-pink tracking-widest mb-3">ONE TEAM. EVERY BUILDER.</div>

                        <p className="font-mono text-xs text-hh-cream/80 leading-relaxed mb-4">

                            Create IDs for your entire team in one go. Add everyone, choose one frame, generate the full set together — no repeating yourself.

                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">

                            <span className="chip border-hh-cream text-hh-cream text-[9px]">✦ TEAM NAME</span>

                            <span className="chip border-hh-cream text-hh-cream text-[9px]">✦ MULTIPLE MEMBERS</span>

                            <span className="chip border-hh-cream text-hh-cream text-[9px]">✦ A FULL SET OF IDS</span>

                        </div>

                        <div className="btn-yellow inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm">

                            <Users className="w-4 h-4" strokeWidth={2.5} />

                            Build my squad

                            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

                        </div>

                    </Link>

                </div>



                <div className="text-center mt-14">

                    <div className="font-mono text-[10px] tracking-widest text-hh-cream/60">SOLO OR SQUAD. YOUR GOA ID STARTS HERE.</div>

                    <div className="font-display text-hh-pink text-2xl md:text-3xl mt-2">#FRAMEINGOA</div>

                </div>

            </section>



            <div className="absolute bottom-0 left-0 right-0">

                <Wave className="w-full h-16" color="#1a6a3f" />

            </div>

        </div>

    );

};



export default CreateChoice;