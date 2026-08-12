import React from 'react';

import { Link } from 'react-router-dom';

import { ArrowUpRight } from 'lucide-react';

import Logo from '../components/Logo';

import { PalmTree, House, Scooter, Cloud, Camera, Sun, Bird, Wave, Zigzag, Coconut } from '../components/Decor';

import { EVENT } from '../mock';



const Landing = () => {

  return (

    <div className="min-h-screen bg-hh-green dotted-bg relative overflow-hidden">

      {/* Nav */}

      <nav className="relative z-30 flex items-center justify-between px-4 md:px-10 py-6">

        <Logo />

        <div className="flex items-center gap-3">

          <Link to="/hype" className="btn-yellow px-4 md:px-6 py-2.5 rounded-md flex items-center gap-2 text-sm" style={{ background: '#f5edb7' }}>

            <span>CHECK HYPE</span>

            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />

          </Link>

          <Link to="/create" className="btn-yellow px-4 md:px-6 py-2.5 rounded-md flex items-center gap-2 text-sm">

            <span>CREATE</span>

            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />

          </Link>

        </div>

      </nav>



      {/* Hero */}

      <section className="relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-40">

        {/* Decorations */}

        <Cloud className="absolute top-2 left-1/4 w-24 md:w-28 opacity-90 animate-bob-slow" />

        <Cloud className="absolute top-6 right-1/3 w-20 opacity-70 animate-bob" />

        <Bird className="absolute top-16 left-1/3 w-8" />

        <Bird className="absolute top-24 right-1/4 w-6" />

        <Bird className="absolute top-10 left-1/2 w-6" />

        <PalmTree className="absolute top-16 right-4 w-40 md:w-56 hidden sm:block animate-bob-slow" />

        <PalmTree className="absolute top-8 left-0 w-32 md:w-44 opacity-90 hidden sm:block" flip />

        <Coconut className="absolute top-32 left-1/4 w-4" />



        <div className="relative max-w-6xl mx-auto text-center pt-8">

          <div className="inline-block mb-4 chip chip-cream rotate-[-3deg]">BEACH × BYTES</div>



          <h1 className="font-display leading-[0.9] text-[54px] sm:text-[100px] md:text-[140px] lg:text-[170px] stroked-yellow relative">

            HACKER HOUSE

            <div className="absolute -top-4 right-8 md:right-24 rotate-[8deg] chip chip-cream border-dashed hidden md:inline-flex">

              &gt; frame.goa(2026)

            </div>

          </h1>



          <div className="relative -mt-4 md:-mt-8">

            <span className="inline-block font-display text-hh-pink text-4xl md:text-6xl rotate-[-6deg] absolute left-1/2 -translate-x-[70%] -top-4 md:-top-8" style={{ WebkitTextStroke: '2px #0a3d24' }}>गोवा</span>

            <div className="font-display text-hh-yellow text-[60px] sm:text-[120px] md:text-[180px] lg:text-[220px] leading-none" style={{ WebkitTextStroke: '3px #0a3d24' }}>GOA 2026</div>

            <Zigzag className="w-56 md:w-80 mx-auto mt-2 h-6" />

          </div>



          <div className="mt-8 md:mt-12 font-mono tracking-widest text-hh-cream text-xs md:text-sm">

            {EVENT.location} · {EVENT.dates}

          </div>



          <div className="mt-8 flex justify-center">

            <Link to="/create" className="btn-yellow px-6 py-3 rounded-md text-sm tracking-widest">

              #FRAMEINGOA

            </Link>

          </div>



          <div className="mt-10 flex items-center justify-center gap-6 font-mono text-[10px] tracking-widest text-hh-cream/80">

            <span>SUN • CODE • SURF</span>

          </div>

        </div>



        {/* Bottom decor */}

        <Scooter className="absolute bottom-16 left-4 w-32 md:w-44 animate-bob" />

        <House className="absolute bottom-20 right-6 w-28 md:w-40 animate-bob-slow" />

        <Camera className="absolute bottom-6 right-1/3 w-16 md:w-20 animate-bob" />

        <div className="absolute bottom-24 left-1/3 chip chip-yellow rotate-[6deg] hidden md:inline-flex">SUN • CODE • SURF</div>

      </section>



      {/* Wave bottom */}

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">

        <Wave className="w-full h-16" color="#1a6a3f" />

        <div className="h-8 -mt-2">

          <Wave className="w-full h-full" color="#22894b" />

        </div>

      </div>



      {/* Ticker */}

      <div className="relative z-10 bg-hh-yellow border-y-2 border-hh-green-deep py-3 overflow-hidden">

        <div className="flex animate-ticker whitespace-nowrap gap-8 font-display text-hh-green-deep text-lg">

          {Array.from({ length: 12 }).map((_, i) => (

            <span key={i} className="flex items-center gap-8">

              #FRAMEINGOA ✦ HACKER HOUSE GOA 2026 ✦ BUILD ON THE BEACH ✦ 28–31 OCT ✦

            </span>

          ))}

        </div>

      </div>



      {/* Section 2 - What is this */}

      <section className="relative z-10 py-20 px-4 md:px-10 bg-hh-green-deep">

        <div className="max-w-5xl mx-auto text-center">

          <div className="chip chip-pink mb-6">// ABOUT</div>

          <h2 className="font-display stroked-yellow text-4xl md:text-7xl leading-none mb-6">FOUR DAYS. ONE HOUSE. INFINITE BUILDS.</h2>

          <p className="max-w-2xl mx-auto text-hh-cream/80 font-mono text-sm md:text-base leading-relaxed">

            A four-day build residency on the beach. Ship together, cook together, surf together.

            Bring your idea, or find your squad here. Everyone leaves with a collectible Builder ID.

          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

            {[

              { t: 'BUILD', d: 'Ship in 4 days with mentors, hackers & designers on the beach.' },

              { t: 'CONNECT', d: 'Twenty rooms. One long table. Late-night ramen & morning surf.' },

              { t: 'SHIP', d: 'Demo day at sunset. Your ID lives on. Your team lives on.' },

            ].map((c, i) => (

              <div key={c.t} className="relative bg-hh-cream text-hh-green-deep rounded-xl p-6 border-2 border-hh-green-deep shadow-[6px_6px_0_#ec2f89]">

                <div className="font-display text-3xl mb-2">0{i+1}. {c.t}</div>

                <div className="font-mono text-xs leading-relaxed">{c.d}</div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="relative z-10 py-16 px-4 bg-hh-green text-center">

        <Sun className="w-16 mx-auto mb-4 animate-bob" />

        <h3 className="font-display stroked-yellow text-3xl md:text-5xl mb-6">READY TO GET YOUR ID?</h3>

        <Link to="/create" className="btn-yellow inline-flex items-center gap-2 px-8 py-4 rounded-md text-base tracking-widest">

          CREATE MY BADGE <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />

        </Link>

      </section>



      {/* Footer */}

      <footer className="relative z-10 py-8 px-4 border-t-2 border-hh-green-light text-center font-mono text-[10px] tracking-widest text-hh-cream/60">

        HH GOA 2026 • GOA, INDIA • 28–31 OCT 2026 • #FRAMEINGOA

      </footer>

    </div>

  );

};



export default Landing;