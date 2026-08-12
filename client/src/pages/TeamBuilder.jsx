import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Sparkles, Download, Trash2, Plus, ChevronDown, Users, RefreshCw, Printer, Share2, Link2 } from 'lucide-react';
import Logo from '../components/Logo';
import Stepper from '../components/Stepper';
import FrameCard from '../components/FrameCard';
import { Cloud, PalmTree, Wave, House } from '../components/Decor';
import { ROLES, FRAMES, generateId } from '../mock';

const emptyMember = () => ({ id: generateId(), name: '', role: 'Builder', title: '', photo: null, zoom: 1 });

const TeamBuilder = () => {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([emptyMember()]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0].id);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const frame = useMemo(() => FRAMES.find(f => f.id === selectedFrame), [selectedFrame]);

  const updateMember = (idx, patch) => {
    setMembers(prev => prev.map((m, i) => i === idx ? { ...m, ...patch } : m));
  };

  const addMember = () => setMembers(prev => [...prev, emptyMember()]);
  const removeMember = (idx) => setMembers(prev => prev.filter((_, i) => i !== idx));

  const handlePhoto = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateMember(idx, { photo: reader.result });
    reader.readAsDataURL(file);
  };

  const canGenerate = teamName.trim() && members.some(m => m.name.trim());

  const generate = () => {
    setProcessing(true);
    setStep(3);
    setTimeout(() => setProcessing(false), 2200);
  };

  return (
    <div className="min-h-screen bg-hh-green dotted-bg relative overflow-hidden">
      <Cloud className="absolute top-20 left-10 w-20 opacity-60 animate-bob-slow" />
      <Cloud className="absolute top-40 right-1/4 w-24 opacity-50 animate-bob" />
      <PalmTree className="absolute top-16 right-2 w-32 opacity-80" />
      <House className="absolute bottom-32 right-8 w-24 opacity-80" />

      <nav className="relative z-20 flex items-center justify-between px-4 md:px-10 py-6">
        <Logo sub="GOA 2026" mini="BUILD SQUAD" />
        <Link to="/create" className="btn-outline px-4 py-2 rounded-md flex items-center gap-2 text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> BACK TO CHOOSE YOUR BUILD
        </Link>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <Stepper current={step} />

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
            <div className="lg:col-span-2">
              <div className="bg-hh-cream rounded-2xl p-6 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                <div className="chip chip-pink mb-4">HACKERHOUSEGOA · TEAM MODE</div>
                <h2 className="font-display text-4xl md:text-5xl text-hh-green-deep leading-none">BUILD YOUR<br /><span className="zigzag inline-block">SQUAD</span></h2>
                <p className="mt-4 font-mono text-xs text-hh-green-deep/80 leading-relaxed">Create every Builder ID in one go. Name the team, add the crew, and generate the full set together — no repeating yourself.</p>
                <div className="mt-6">
                  <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">TEAM NAME</label>
                  <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. THE PIXEL PIRATES" className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
                  <div className="font-mono text-[9px] text-hh-green-deep/60 mt-1">The name that will sit across every member&apos;s ID.</div>
                </div>
                <div className="mt-5 p-3 bg-hh-green-deep/10 border border-hh-green-deep/30 rounded-md">
                  <div className="font-mono text-[10px] tracking-widest text-hh-green-deep font-bold">{members.length} MEMBER{members.length > 1 ? 'S' : ''} ON THE ROSTER</div>
                </div>
                <button disabled={!canGenerate} onClick={() => setStep(2)} className="btn-yellow w-full mt-5 py-3 rounded-md flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {!teamName.trim() ? 'Add a team name to unlock' : <>Pick the frame <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="chip chip-yellow mb-2">THE CREW</div>
                  <h3 className="font-display text-3xl text-hh-yellow leading-none">ADD YOUR TEAMMATES</h3>
                  <div className="font-mono text-[10px] text-hh-cream/70 tracking-widest mt-1">PHOTOS OPTIONAL, SWAG GUARANTEED</div>
                </div>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {members.map((m, i) => (
                  <MemberRow key={m.id} m={m} index={i} onChange={p => updateMember(i, p)} onRemove={() => removeMember(i)} onPhoto={f => handlePhoto(i, f)} canRemove={members.length > 1} />
                ))}
              </div>
              <button onClick={addMember} className="mt-4 w-full py-3 rounded-md border-2 border-dashed border-hh-yellow text-hh-yellow font-mono text-xs tracking-widest hover:bg-hh-yellow/10 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> ADD TEAMMATE
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-10">
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-widest text-hh-pink">STEP 03 · ONE FRAME, EVERY BUILDER</div>
              <h2 className="font-display text-4xl md:text-6xl stroked-yellow mt-2">CHOOSE YOUR FRAME</h2>
              <p className="text-hh-cream/80 font-mono text-sm mt-3">One frame, one generate — every ID in a single go.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {FRAMES.map(f => (
                <button key={f.id} onClick={() => setSelectedFrame(f.id)} className={`relative bg-hh-green-deep/60 rounded-xl p-3 border-2 transition-all text-left ${selectedFrame === f.id ? 'border-hh-yellow shadow-[4px_4px_0_#ec2f89]' : 'border-hh-cream/20 hover:border-hh-cream/60'}`}>
                  {selectedFrame === f.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-hh-pink border-2 border-hh-green-deep flex items-center justify-center z-10">
                      <svg viewBox="0 0 20 20" className="w-3 h-3"><path d="M4 10 L8 14 L16 6" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  )}
                  <FrameCard frame={f} name={members[0]?.name || 'Squad'} role={members[0]?.role} thumb />
                  <div className="mt-2 font-mono text-[10px] tracking-widest text-hh-yellow font-bold uppercase">{f.name}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => setStep(1)} className="btn-outline px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4" /> BACK TO ROSTER
              </button>
              <button onClick={generate} className="btn-yellow px-6 py-2.5 rounded-md flex items-center gap-2 text-sm">
                Generate team IDs <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-12">
            {processing ? (
              <div className="max-w-md mx-auto py-24 text-center">
                <div className="font-mono text-[10px] tracking-widest text-hh-pink">GENERATING SQUAD · {teamName.toUpperCase()}</div>
                <h2 className="font-display text-4xl md:text-5xl stroked-yellow mt-3">PRESSING {members.length} IDS...</h2>
                <div className="mt-8 h-3 rounded-full bg-hh-green-deep border-2 border-hh-yellow overflow-hidden">
                  <div className="h-full shimmer" style={{ width: '85%' }} />
                </div>
                <div className="mt-6 font-mono text-[10px] text-hh-cream/60 tracking-widest space-y-1">
                  <div>○ ROUNDING UP THE CREW...</div>
                  <div>○ ALIGNING EVERY FRAME...</div>
                  <div>○ LOADING SUNSHINE...</div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-widest text-hh-pink">SQUAD DELIVERED</div>
                  <h2 className="font-display text-4xl md:text-6xl stroked-yellow mt-2">{teamName.toUpperCase() || 'THE SQUAD'}</h2>
                  <p className="font-mono text-xs text-hh-cream/80 mt-3 tracking-widest">{members.length} BUILDER{members.length>1?'S':''} • {frame?.name.toUpperCase()} • GOA-READY</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                  {members.map((m, i) => (
                    <div key={m.id} className="space-y-2">
                      <FrameCard frame={frame} name={m.name || `Member ${String(i+1).padStart(2,'0')}`} role={m.role} title={m.title} photo={m.photo} zoom={m.zoom} builderId={m.id} />
                      <div className="text-center font-mono text-[9px] text-hh-cream/70 tracking-widest">{String(i+1).padStart(2,'0')} • {(m.name || `MEMBER ${i+1}`).toUpperCase()}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-10">
                  <button className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest"><Download className="w-4 h-4" /> DOWNLOAD ALL</button>
                  <button className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest"><Share2 className="w-4 h-4" /> SHARE SET</button>
                  <button className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest"><Printer className="w-4 h-4" /> PRINT SHEET</button>
                  <button className="btn-yellow px-5 py-2.5 rounded-md flex items-center gap-2 text-xs tracking-widest"><Link2 className="w-4 h-4" /> COPY LINK</button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-widest text-hh-cream/70">
                  <button onClick={() => setStep(1)} className="flex items-center gap-1 hover:text-hh-yellow"><RefreshCw className="w-3 h-3" /> EDIT SQUAD</button>
                  <button onClick={() => navigate('/create/individual')} className="flex items-center gap-1 hover:text-hh-yellow"><Users className="w-3 h-3" /> BUILD SOLO INSTEAD</button>
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

const MemberRow = ({ m, index, onChange, onRemove, onPhoto, canRemove }) => {
  const ref = useRef();
  return (
    <div className="bg-hh-cream rounded-xl p-4 border-2 border-hh-yellow shadow-[4px_4px_0_#0a3d24] relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="chip chip-pink text-[9px]">MEMBER {String(index + 1).padStart(2, '0')}</div>
          <div className="font-mono text-[9px] text-hh-green-deep/60 tracking-widest">{m.id}</div>
        </div>
        {canRemove && (
          <button onClick={onRemove} className="text-hh-green-deep/60 hover:text-hh-pink"><Trash2 className="w-4 h-4" /></button>
        )}
      </div>
      <div className="grid grid-cols-[80px,1fr] gap-3">
        <div>
          <input ref={ref} type="file" accept="image/*" hidden onChange={e => onPhoto(e.target.files?.[0])} />
          <button onClick={() => ref.current?.click()} className="w-20 h-20 rounded-md border-2 border-dashed border-hh-green-deep flex items-center justify-center overflow-hidden hover:bg-hh-yellow/20">
            {m.photo ? <img src={m.photo} alt="m" className="w-full h-full object-cover" /> : <Upload className="w-5 h-5 text-hh-green-deep" />}
          </button>
          <div className="flex items-center gap-1 mt-2">
            <button onClick={() => onChange({ zoom: Math.max(1, (m.zoom||1) - 0.1) })} className="w-6 h-6 rounded bg-hh-yellow border border-hh-green-deep text-hh-green-deep text-xs">-</button>
            <div className="font-mono text-[9px] text-hh-green-deep flex-1 text-center">×{(m.zoom||1).toFixed(1)}</div>
            <button onClick={() => onChange({ zoom: Math.min(2, (m.zoom||1) + 0.1) })} className="w-6 h-6 rounded bg-hh-yellow border border-hh-green-deep text-hh-green-deep text-xs">+</button>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep">NAME</label>
            <input value={m.name} onChange={e => onChange({ name: e.target.value })} placeholder="e.g. Riya Sharma" className="w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-1.5 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep">ROLE / STACK</label>
              <div className="relative">
                <select value={m.role} onChange={e => onChange({ role: e.target.value })} className="w-full appearance-none bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-1.5 font-mono text-sm text-hh-green-deep focus:outline-none focus:border-hh-pink">
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-hh-green-deep" />
              </div>
            </div>
            <div>
              <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep">BUILDER TITLE</label>
              <input value={m.title} onChange={e => onChange({ title: e.target.value })} placeholder="optional" className="w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-1.5 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;