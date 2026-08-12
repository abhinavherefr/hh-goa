import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Sparkles, Download, Share2, Printer, Link2, RefreshCw, Users, Minus, Plus, ChevronDown, Move } from 'lucide-react';
import { toPng } from 'html-to-image';
import Logo from '../components/Logo';
import Stepper from '../components/Stepper';
import FrameCard from '../components/FrameCard';
import { Cloud, PalmTree, Wave, House } from '../components/Decor';
import { ROLES, FRAMES, FRAME_CATEGORIES, generateId } from '../mock';

const SoloBuilder = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [role, setRole] = useState('Builder');
    const [team, setTeam] = useState('');
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const [selectedFrame, setSelectedFrame] = useState(FRAMES[0].id);
    const [zoom, setZoom] = useState(1.0);
    const [pan, setPan] = useState({ x: 0, y: 0 }); // Drag X/Y offset
    const [category, setCategory] = useState('All');
    const [builderId] = useState(generateId());
    const [processing, setProcessing] = useState(false);
    
    // Cloudinary & Share states
    const [shareUrl, setShareUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const cardRef = useRef(null);

    const frame = useMemo(() => FRAMES.find(f => f.id === selectedFrame), [selectedFrame]);

    const handlePhoto = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto(reader.result);
            setZoom(1.0);
            setPan({ x: 0, y: 0 }); // Reset drag alignment on new photo
        };
        reader.readAsDataURL(file);
    };

    const handleResetPosition = () => {
        setZoom(1.0);
        setPan({ x: 0, y: 0 });
    };

    const filtered = FRAMES.filter(f => category === 'All' || f.category === category.toLowerCase());

    const goGenerate = () => {
        setProcessing(true);
        setStep(3);
        setTimeout(() => setProcessing(false), 2200);
    };

    // --- SNAPSHOT & SHARE FUNCTIONS ---
    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${builderId}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Oops, something went wrong!', err);
        }
    };

    const handleShareToX = async () => {
        if (!cardRef.current) return;
        
        if (shareUrl) {
            openTwitter(shareUrl);
            return;
        }

        try {
            setIsUploading(true);
            const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
            
            const formData = new FormData();
            formData.append('file', dataUrl);
            formData.append('upload_preset', 'hhg_server'); 

            const res = await fetch('https://api.cloudinary.com/v1_1/le7lnbsq/image/upload', { 
                method: 'POST',
                body: formData
            });
            
            const data = await res.json();
            
            if (!data.secure_url) {
                alert(`Upload Failed: ${data.error?.message || 'Check your Cloud Name and Preset'}`);
                setIsUploading(false);
                return;
            }

            setShareUrl(data.secure_url);
            openTwitter(data.secure_url);

        } catch (err) {
            console.error('Failed to upload image', err);
            alert('Network error while uploading.');
        } finally {
            setIsUploading(false);
        }
    };

    const openTwitter = (imageUrl) => {
        const text = encodeURIComponent("Check out my Hacker House Goa 2026 Builder ID! 🌴💻 #FRAMEINGOA");
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${imageUrl}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-hh-green dotted-bg relative overflow-hidden">
            <Cloud className="absolute top-20 left-10 w-20 opacity-60 animate-bob-slow" />
            <Cloud className="absolute top-40 right-1/4 w-24 opacity-50 animate-bob" />
            <PalmTree className="absolute top-20 right-2 w-32 opacity-80" />
            <House className="absolute bottom-40 right-8 w-24 opacity-80" />

            <nav className="relative z-20 flex items-center justify-between px-4 md:px-10 py-6">
                <Logo sub="GOA 2026" mini="BUILD SOLO" />
                <Link to="/create" className="btn-outline px-4 py-2 rounded-md flex items-center gap-2 text-xs tracking-widest">
                    <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> BACK TO CHOOSE YOUR BUILD
                </Link>
            </nav>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
                <Stepper current={step} />

                {/* STEP 1: DETAILS */}
                {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                        <div className="relative bg-hh-cream rounded-2xl p-6 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                            <div className="chip chip-pink mb-4">HACKERHOUSEGOA · SOLO</div>
                            <h2 className="font-display text-4xl md:text-5xl text-hh-green-deep leading-none">BUILD YOUR<br /><span className="text-hh-green-deep zigzag">BUILDER ID</span></h2>
                            <p className="mt-4 font-mono text-xs text-hh-green-deep/80 leading-relaxed">Your details, your frame, your collectible badge. No sign-up needed — everything renders right here.</p>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">FULL NAME</label>
                                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">ROLE</label>
                                        <div className="relative">
                                            <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full appearance-none bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep focus:outline-none focus:border-hh-pink">
                                                {ROLES.map(r => <option key={r}>{r}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-hh-green-deep" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">TEAM OR SQUAD</label>
                                        <input value={team} onChange={e => setTeam(e.target.value)} placeholder="Optional" className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
                                    </div>
                                </div>
                                <div>
                                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">BUILDER TITLE (OPTIONAL)</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Pixel Pilot" className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
                                </div>

                                <div>
                                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">PHOTO</label>
                                    <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
                                    <button onClick={() => fileRef.current?.click()} className="mt-1 w-full border-2 border-dashed border-hh-green-deep rounded-md p-4 flex flex-col items-center justify-center gap-2 hover:bg-hh-yellow/30 transition-colors">
                                        {photo ? (
                                            <>
                                                <img src={photo} alt="u" className="w-20 h-20 object-cover rounded-md border-2 border-hh-green-deep" />
                                                <span className="font-mono text-[10px] tracking-widest text-hh-green-deep">✦ REPLACE PHOTO</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-6 h-6 text-hh-green-deep" />
                                                <span className="font-mono text-[11px] text-hh-green-deep">Drop a photo here, or click to browse</span>
                                                <span className="font-mono text-[9px] text-hh-green-deep/60">A clear head-and-shoulders shot works best.</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <button disabled={!name.trim()} onClick={() => setStep(2)} className="btn-yellow w-full py-3 rounded-md flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    {!name.trim() ? 'Add your name to continue' : <>Choose my frame <Sparkles className="w-4 h-4" /></>}
                                </button>
                                <div className="text-center font-mono text-[9px] text-hh-green-deep/60">Full name is required — role & photo optional</div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div>
                            <div className="font-mono text-[10px] tracking-widest text-hh-cream mb-2">WHAT YOU GET</div>
                            <div className="bg-hh-green-deep border-2 border-hh-yellow rounded-2xl p-6 relative">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-hh-yellow rounded-sm border border-hh-green-deep flex items-center justify-center font-display text-[10px] text-hh-green-deep">HH</div>
                                    <div>
                                        <div className="font-mono text-[10px] font-bold text-hh-yellow tracking-widest">HACKER HOUSE GOA 2026</div>
                                        <div className="font-mono text-[9px] text-hh-cream/60">COLLECTIBLE BUILDER BADGE</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-hh-yellow rounded w-[70%]" />
                                        <div className="h-3 bg-hh-cream/30 rounded w-[50%]" />
                                    </div>
                                    <div className="w-24 h-24 bg-hh-green-light border-2 border-hh-yellow rounded-md flex items-center justify-center">
                                        <div className="font-mono text-[9px] text-hh-cream/70 text-center">YOUR<br />PHOTO</div>
                                    </div>
                                </div>
                                <div className="h-2 bg-hh-pink rounded mt-4" />
                                <div className="flex justify-between font-mono text-[8px] text-hh-cream/60 mt-2">
                                    <span>#FRAMEINGOA · 28-31 OCT 2026</span>
                                    <span>HH GOA 2026</span>
                                </div>
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-hh-cream/80 font-mono">
                                <li className="flex gap-2"><span className="text-hh-pink">●</span> Seven collectible frame styles, real canvas previews</li>
                                <li className="flex gap-2"><span className="text-hh-pink">●</span> Smart photo crop — zoom & drag to align your face</li>
                                <li className="flex gap-2"><span className="text-hh-pink">●</span> Your role badge + optional builder title</li>
                                <li className="flex gap-2"><span className="text-hh-pink">●</span> Download PNG, print, or share straight to X</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* STEP 2: FRAME */}
                {step === 2 && (
                    <div className="mt-10">
                        <div className="text-center">
                            <div className="font-mono text-[10px] tracking-widest text-hh-pink">STEP 03 · ONE FRAME FITS ALL</div>
                            <h2 className="font-display text-4xl md:text-6xl stroked-yellow mt-2">CHOOSE YOUR FRAME</h2>
                            <p className="text-hh-cream/80 font-mono text-sm mt-3 max-w-lg mx-auto">Every frame is a real collectible badge. Pick one, fit your photo, and watch it come alive.</p>
                        </div>

                        <div className="flex justify-center gap-2 mt-6 flex-wrap">
                            {FRAME_CATEGORIES.map(c => (
                                <button key={c} onClick={() => setCategory(c)} className={`chip transition-all ${category === c ? 'chip-yellow' : 'text-hh-cream/70 border-hh-cream/40 hover:text-hh-cream'}`}>{c}</button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {filtered.map(f => (
                                    <button key={f.id} onClick={() => setSelectedFrame(f.id)} className={`relative bg-hh-green-deep/60 rounded-xl p-3 border-2 transition-all text-left ${selectedFrame === f.id ? 'border-hh-yellow shadow-[4px_4px_0_#ec2f89] scale-[1.02]' : 'border-hh-cream/20 hover:border-hh-cream/60'}`}>
                                        {selectedFrame === f.id && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-hh-pink border-2 border-hh-green-deep flex items-center justify-center z-10">
                                                <svg viewBox="0 0 20 20" className="w-3 h-3"><path d="M4 10 L8 14 L16 6" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                        )}
                                        <FrameCard frame={f} name={name || 'Naveen Kumar'} role={role} thumb />
                                        <div className="mt-3">
                                            <div className="font-mono text-[10px] tracking-widest text-hh-yellow font-bold uppercase">{f.name}</div>
                                            <div className="font-mono text-[9px] text-hh-cream/60 mt-1 leading-tight">{f.tagline}</div>
                                            {selectedFrame === f.id && <div className="mt-2 chip chip-pink text-[8px]">SELECTED</div>}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Live Preview */}
                            <div className="sticky top-6 h-fit">
                                <div className="bg-hh-cream rounded-2xl p-4 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-mono text-[10px] tracking-widest text-hh-green-deep font-bold">LIVE PREVIEW</div>
                                        <div className="chip chip-yellow text-[8px]">{frame?.name}</div>
                                    </div>
                                    <div className="bg-hh-green-deep rounded-xl p-3">
                                        <FrameCard 
                                            frame={frame} 
                                            name={name || 'Naveen Kumar'} 
                                            role={role} 
                                            title={title} 
                                            team={team} 
                                            photo={photo} 
                                            zoom={zoom} 
                                            pan={pan}
                                            onPanChange={setPan}
                                            builderId={builderId} 
                                        />
                                    </div>
                                    <div className="mt-4 border-2 border-hh-green-deep rounded-md p-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">PHOTO FIT</span>
                                            <span className="chip chip-pink text-[8px]">×{zoom.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => setZoom(Math.max(1, zoom - 0.1))} className="w-8 h-8 rounded-md bg-hh-yellow border-2 border-hh-green-deep flex items-center justify-center"><Minus className="w-4 h-4 text-hh-green-deep" strokeWidth={3} /></button>
                                            <input type="range" min="1" max="2.5" step="0.05" value={zoom} onChange={e => setZoom(Number(e.target.value))} className="flex-1 accent-hh-pink cursor-pointer" />
                                            <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="w-8 h-8 rounded-md bg-hh-yellow border-2 border-hh-green-deep flex items-center justify-center"><Plus className="w-4 h-4 text-hh-green-deep" strokeWidth={3} /></button>
                                        </div>

                                        <p className="font-mono text-[9px] text-hh-green-deep/80 mt-2 text-center flex items-center justify-center gap-1">
                                            <Move className="w-3 h-3 text-hh-pink" /> Click & drag photo above to align
                                        </p>

                                        <div className="flex gap-2 mt-3">
                                            <button onClick={handleResetPosition} className="flex-1 border-2 border-hh-green-deep rounded-md py-1.5 text-hh-green-deep font-mono text-[9px] font-bold tracking-widest hover:bg-hh-yellow/30">
                                                RESET ALIGNMENT
                                            </button>
                                            <button onClick={() => fileRef.current?.click()} className="flex-1 border-2 border-dashed border-hh-green-deep rounded-md py-1.5 flex items-center justify-center gap-1 text-hh-green-deep font-mono text-[9px] font-bold tracking-widest hover:bg-hh-yellow/30">
                                                <RefreshCw className="w-3 h-3" /> CHANGE PHOTO
                                            </button>
                                        </div>
                                        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
                                    </div>

                                    <div className="mt-3 border-2 border-hh-green-deep rounded-md p-3">
                                        <div className="font-mono text-[9px] text-hh-pink tracking-widest font-bold">LIVE MODE</div>
                                        <div className="font-display text-hh-green-deep text-lg leading-none mt-1">{(name || 'Naveen Kumar').toUpperCase()}</div>
                                        <div className="font-mono text-[9px] text-hh-green-deep/70 mt-1">{role.toUpperCase()} · SOLO BUILDER · {builderId}</div>
                                    </div>

                                    <button onClick={goGenerate} className="btn-yellow w-full mt-4 py-3 rounded-md flex items-center justify-center gap-2 text-sm">
                                        Generate my Builder ID <Sparkles className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setStep(1)} className="w-full mt-2 py-2 font-mono text-[10px] tracking-widest text-hh-green-deep/70 hover:text-hh-green-deep flex items-center justify-center gap-1">
                                        <ArrowLeft className="w-3 h-3" /> BACK TO DETAILS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: GENERATE */}
                {step === 3 && (
                    <div className="mt-12 text-center">
                        {processing ? (
                            <div className="max-w-md mx-auto py-24">
                                <div className="font-mono text-[10px] tracking-widest text-hh-pink">GENERATING · {builderId}</div>
                                <h2 className="font-display text-4xl md:text-5xl stroked-yellow mt-3">PRESSING YOUR ID<br />TO GOA...</h2>
                                <div className="mt-8 h-3 rounded-full bg-hh-green-deep border-2 border-hh-yellow overflow-hidden">
                                    <div className="h-full shimmer" style={{ width: '80%' }} />
                                </div>
                                <div className="mt-6 font-mono text-[10px] text-hh-cream/60 tracking-widest space-y-1">
                                    <div>○ WARMING THE PRESS...</div>
                                    <div>○ ALIGNING PIXELS TO YOUR FRAME...</div>
                                    <div>○ ADDING SUN AND SALT...</div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="font-mono text-[10px] tracking-widest text-hh-pink">GENERATED · {builderId}</div>
                                <h2 className="font-display text-4xl md:text-6xl stroked-yellow mt-2">YOUR ID IS <br className="md:hidden" />READY</h2>
                                <p className="font-mono text-xs text-hh-cream/80 mt-3 tracking-widest">{frame?.name.toUpperCase()} • GOA-READY. WEAR IT. PRINT IT. POST IT.</p>

                                <div className="max-w-md mx-auto mt-8">
                                    <div ref={cardRef} className="bg-hh-green p-4 rounded-xl">
                                        <FrameCard 
                                            frame={frame} 
                                            name={name || 'Naveen Kumar'} 
                                            role={role} 
                                            title={title} 
                                            team={team} 
                                            photo={photo} 
                                            zoom={zoom} 
                                            pan={pan}
                                            builderId={builderId} 
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-8">
                                    <button onClick={handleDownload} className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest">
                                        <Download className="w-4 h-4" /> DOWNLOAD PNG
                                    </button>
                                    
                                    <button onClick={handleShareToX} disabled={isUploading} className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest disabled:opacity-50">
                                        <Share2 className="w-4 h-4" /> {isUploading ? 'UPLOADING...' : 'SHARE TO X'}
                                    </button>

                                    <button onClick={() => window.print()} className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest">
                                        <Printer className="w-4 h-4" /> PRINT CARD
                                    </button>
                                    
                                    <button onClick={() => { navigator.clipboard.writeText(shareUrl || 'Generate share link first via X button'); alert('Link Copied!'); }} className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest">
                                        <Link2 className="w-4 h-4" /> COPY SHARE LINK
                                    </button>
                                </div>

                                <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-widest text-hh-cream/70">
                                    <button onClick={() => { setStep(1); }} className="flex items-center gap-1 hover:text-hh-yellow"><RefreshCw className="w-3 h-3" /> CREATE ANOTHER ID</button>
                                    <button onClick={() => navigate('/create/team')} className="flex items-center gap-1 hover:text-hh-yellow"><Users className="w-3 h-3" /> BUILD A SQUAD INSTEAD</button>
                                    <Link to="/create" className="flex items-center gap-1 hover:text-hh-yellow"><ArrowRight className="w-3 h-3" /> CHOOSE ANOTHER PATH</Link>
                                </div>

                                <div className="mt-10 font-mono text-[9px] tracking-widest text-hh-cream/50">
                                    #FRAMEINGOA • HH GOA 2026 • GOA, INDIA • 28-31 OCT 2026
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <Wave className="w-full h-16" color="#1a6a3f" />
            </div>
        </div>
    );
};

export default SoloBuilder;