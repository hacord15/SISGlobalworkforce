// "use client";

// import { useEffect, useRef, useState } from "react";
// import { recruitmentSteps } from "@/data";

// export default function RecruitmentSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
//   const [lineHeight, setLineHeight] = useState(0);

//   useEffect(() => {
//     const stepEls = sectionRef.current?.querySelectorAll(".timeline-step");
//     if (!stepEls) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const idx = parseInt((entry.target as HTMLElement).dataset.step || "0");
//             setTimeout(() => {
//               setVisibleSteps((prev) => new Set(Array.from(prev).concat(idx)));
//               // Grow line proportionally
//               setLineHeight(((idx + 1) / recruitmentSteps.length) * 100);
//             }, idx * 180);
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     stepEls.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-20 grey-gradient-section" ref={sectionRef}>
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">How We Work</p>
//           <h2
//             className="text-4xl font-bold text-brand-grey-900"
//             style={{ fontFamily: "var(--font-display)" }}
//           >
//             OUR RECRUITMENT PROCESS
//           </h2>
//           <div className="section-divider mt-4" />
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Vertical line */}
//           <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-brand-grey-200 h-full hidden md:block" />
//           {/* Animated fill line */}
//           <div
//             className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 timeline-line hidden md:block transition-all duration-700 ease-out"
//             style={{ height: `${lineHeight}%` }}
//           />

//           <div className="space-y-10 md:space-y-0">
//             {recruitmentSteps.map((step, i) => {
//               const isLeft = i % 2 === 0;
//               const isVisible = visibleSteps.has(i);

//               return (
//                 <div
//                   key={step.id}
//                   data-step={i}
//                   className="timeline-step relative md:flex items-center"
//                   style={{ minHeight: "120px" }}
//                 >
//                   {/* Left card */}
//                   <div className={`md:w-5/12 ${isLeft ? "md:text-right" : "md:invisible"}`}>
//                     {isLeft && (
//                       <div
//                         className={`timeline-card bg-white rounded-xl p-6 shadow-sm border border-brand-grey-200 hover:border-brand-red/30 transition-colors ${
//                           isVisible ? "visible" : ""
//                         }`}
//                         style={{ animationDelay: `${i * 0.18}s` }}
//                       >
//                         <div className={`flex items-center gap-3 mb-3 ${isLeft ? "justify-end" : ""}`}>
//                           <h3
//                             className="text-lg font-bold text-brand-grey-900"
//                             style={{ fontFamily: "var(--font-display)" }}
//                           >
//                             {step.title}
//                           </h3>
//                           <span className="text-2xl">{step.icon}</span>
//                         </div>
//                         <p className="text-brand-grey-500 text-sm leading-relaxed">
//                           {step.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Center dot */}
//                   <div className="md:w-2/12 flex justify-center my-4 md:my-0 relative z-10">
//                     <div
//                       className={`timeline-dot w-12 h-12 rounded-full bg-white border-4 border-brand-grey-200 flex items-center justify-center text-brand-grey-900 font-bold text-sm shadow-md transition-all duration-300 ${
//                         isVisible
//                           ? "visible border-brand-red bg-brand-red text-white scale-110"
//                           : ""
//                       }`}
//                       style={{ fontFamily: "var(--font-display)" }}
//                     >
//                       {step.id}
//                     </div>
//                   </div>

//                   {/* Right card */}
//                   <div className={`md:w-5/12 ${!isLeft ? "" : "md:invisible"}`}>
//                     {!isLeft && (
//                       <div
//                         className={`timeline-card-right bg-white rounded-xl p-6 shadow-sm border border-brand-grey-200 hover:border-brand-red/30 transition-colors ${
//                           isVisible ? "visible" : ""
//                         }`}
//                         style={{ animationDelay: `${i * 0.18}s` }}
//                       >
//                         <div className="flex items-center gap-3 mb-3">
//                           <span className="text-2xl">{step.icon}</span>
//                           <h3
//                             className="text-lg font-bold text-brand-grey-900"
//                             style={{ fontFamily: "var(--font-display)" }}
//                           >
//                             {step.title}
//                           </h3>
//                         </div>
//                         <p className="text-brand-grey-500 text-sm leading-relaxed">
//                           {step.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





//version 2



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { recruitmentSteps } from "@/data";

// export default function RecruitmentSection() {
//   const sectionRef    = useRef<HTMLDivElement>(null);
//   const stickyRef     = useRef<HTMLDivElement>(null);
//   const [activeStep, setActiveStep] = useState(0);
//   const [progress, setProgress]     = useState(0);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const onScroll = () => {
//       const rect   = section.getBoundingClientRect();
//       const total  = section.offsetHeight - window.innerHeight;
//       const scrolled = Math.max(0, -rect.top);
//       const pct    = Math.min(1, scrolled / total);

//       setProgress(pct * 100);

//       const stepIdx = Math.min(
//         recruitmentSteps.length - 1,
//         Math.floor(pct * recruitmentSteps.length)
//       );
//       setActiveStep(stepIdx);
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const step = recruitmentSteps[activeStep];

//   return (
//     /* The outer section is tall — 100vh per step so there's room to scroll */
//     <section
//       ref={sectionRef}
//       className="relative"
//       style={{ height: `${recruitmentSteps.length * 100}vh` }}
//     >
//       {/* ── Sticky viewport ── */}
//       <div
//         ref={stickyRef}
//         className="sticky top-0 h-screen overflow-hidden grey-gradient-section flex flex-col"
//       >
//         {/* ── Header ── */}
//         <div className="text-center pt-12 pb-6 px-4 flex-shrink-0">
//           <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase mb-2">
//             How We Work
//           </p>
//           <h2
//             className="text-4xl md:text-5xl font-bold text-brand-grey-900"
//             style={{ fontFamily: "var(--font-display)" }}
//           >
//             OUR RECRUITMENT PROCESS
//           </h2>
//           <div className="section-divider mt-4" />
//         </div>

//         {/* ── Scroll progress bar ── */}
//         <div className="w-full h-0.5 bg-brand-grey-200 flex-shrink-0">
//           <div
//             className="h-full transition-all duration-150 ease-out"
//             style={{
//               width: `${progress}%`,
//               background: "linear-gradient(90deg, #C8102E, #E8193E)",
//             }}
//           />
//         </div>

//         {/* ── Main content grid ── */}
//         <div className="flex-1 flex items-center max-w-6xl mx-auto w-full px-4 gap-10 md:gap-16">

//           {/* ── LEFT — step list / stepper ── */}
//           <div className="hidden md:flex flex-col gap-0 w-64 flex-shrink-0">
//             {recruitmentSteps.map((s, i) => {
//               const done    = i < activeStep;
//               const current = i === activeStep;
//               return (
//                 <div key={s.id} className="flex items-stretch gap-3">
//                   {/* Connector column */}
//                   <div className="flex flex-col items-center w-8 flex-shrink-0">
//                     {/* Dot */}
//                     <div
//                       className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs transition-all duration-400"
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         background: current
//                           ? "#C8102E"
//                           : done
//                           ? "#C8102E"
//                           : "#E5E5E5",
//                         color: current || done ? "white" : "#A3A3A3",
//                         transform: current ? "scale(1.25)" : "scale(1)",
//                         boxShadow: current
//                           ? "0 0 0 4px rgba(200,16,46,0.18)"
//                           : "none",
//                         transition: "all 0.35s ease",
//                       }}
//                     >
//                       {done ? (
//                         <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
//                           <polyline points="20 6 9 17 4 12" />
//                         </svg>
//                       ) : (
//                         s.id
//                       )}
//                     </div>

//                     {/* Connector line */}
//                     {i < recruitmentSteps.length - 1 && (
//                       <div className="w-0.5 flex-1 my-1 rounded-full overflow-hidden" style={{ background: "#E5E5E5", minHeight: 28 }}>
//                         <div
//                           className="w-full transition-all duration-500 ease-out rounded-full"
//                           style={{
//                             height: done ? "100%" : current ? "50%" : "0%",
//                             background: "linear-gradient(180deg, #C8102E, #E8193E)",
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Label */}
//                   <div className="pb-6 pt-1 flex-1">
//                     <p
//                       className="text-sm font-bold leading-tight transition-colors duration-300"
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         color: current ? "#C8102E" : done ? "#404040" : "#A3A3A3",
//                         letterSpacing: "0.03em",
//                       }}
//                     >
//                       {s.title}
//                     </p>
//                     {current && (
//                       <p className="text-xs text-brand-grey-400 mt-1 leading-relaxed line-clamp-2">
//                         {s.description}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── RIGHT — active step card ── */}
//           <div className="flex-1 flex flex-col justify-center">
//             <div
//               key={activeStep}
//               className="bg-white rounded-2xl shadow-lg border border-brand-grey-200 overflow-hidden"
//               style={{
//                 animation: "stepCardIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards",
//                 borderTop: "4px solid #C8102E",
//               }}
//             >
//               {/* Card header */}
//               <div className="px-8 pt-8 pb-6 border-b border-brand-grey-100">
//                 <div className="flex items-center gap-4 mb-4">
//                   {/* Step number badge */}
//                   <div
//                     className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       background: "linear-gradient(135deg, #C8102E 0%, #A00D25 100%)",
//                       boxShadow: "0 8px 20px rgba(200,16,46,0.30)",
//                     }}
//                   >
//                     {step.id}
//                   </div>
//                   <div>
//                     <p className="text-xs text-brand-red font-bold tracking-widest uppercase mb-1">
//                       Step {step.id} of {recruitmentSteps.length}
//                     </p>
//                     <h3
//                       className="text-2xl font-bold text-brand-grey-900"
//                       style={{ fontFamily: "var(--font-display)" }}
//                     >
//                       {step.title}
//                     </h3>
//                   </div>
//                   <span className="text-5xl ml-auto">{step.icon}</span>
//                 </div>

//                 <p className="text-brand-grey-500 text-base leading-relaxed">
//                   {step.description}
//                 </p>
//               </div>

//               {/* Card footer — step dots */}
//               <div className="px-8 py-5 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   {recruitmentSteps.map((_, i) => (
//                     <div
//                       key={i}
//                       className="rounded-full transition-all duration-350"
//                       style={{
//                         width:  i === activeStep ? 24 : 8,
//                         height: 8,
//                         background: i <= activeStep ? "#C8102E" : "#E5E5E5",
//                         transition: "all 0.35s ease",
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-brand-grey-400 font-medium">
//                   {Math.round(progress)}% Complete
//                 </p>
//               </div>
//             </div>

//             {/* Scroll hint — only on first step */}
//             {activeStep === 0 && (
//               <div className="flex items-center gap-2 mt-5 text-brand-grey-400 text-xs animate-bounce justify-center md:justify-start">
//                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path d="M12 5v14M5 12l7 7 7-7" />
//                 </svg>
//                 Scroll to walk through the process
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Mobile step pills (bottom strip) ── */}
//         <div className="md:hidden flex overflow-x-auto gap-3 px-4 pb-5 flex-shrink-0">
//           {recruitmentSteps.map((s, i) => (
//             <div
//               key={s.id}
//               className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
//               style={{
//                 background: i === activeStep ? "#C8102E" : i < activeStep ? "#F5F5F5" : "#F5F5F5",
//                 color:      i === activeStep ? "white"   : i < activeStep ? "#C8102E" : "#A3A3A3",
//                 border:     i < activeStep ? "1px solid #C8102E" : "1px solid #E5E5E5",
//               }}
//             >
//               <span>{s.icon}</span>
//               {s.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Inline keyframe */}
//       <style>{`
//         @keyframes stepCardIn {
//           from { opacity: 0; transform: translateY(28px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)    scale(1);    }
//         }
//       `}</style>
//     </section>
//   );
// }



// version 3    



// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { recruitmentSteps } from "@/data";

// export default function RecruitmentSection() {
//   const sectionRef  = useRef<HTMLDivElement>(null);
//   const [activeStep, setActiveStep] = useState(0);
//   const [progress,   setProgress]   = useState(0);
//   // sub-progress within current step (0-1) — drives the card reveal
//   const [stepPct,    setStepPct]    = useState(0);
//   const rafRef = useRef<number>(0);

//   const onScroll = useCallback(() => {
//     cancelAnimationFrame(rafRef.current);
//     rafRef.current = requestAnimationFrame(() => {
//       const section = sectionRef.current;
//       if (!section) return;

//       const rect   = section.getBoundingClientRect();
//       const total  = section.offsetHeight - window.innerHeight;
//       const scrolled = Math.max(0, -rect.top);
//       const pct    = Math.min(1, scrolled / total);

//       const rawStep  = pct * recruitmentSteps.length;
//       const stepIdx  = Math.min(recruitmentSteps.length - 1, Math.floor(rawStep));
//       const subPct   = rawStep - Math.floor(rawStep); // 0→1 within current step

//       setProgress(pct * 100);
//       setActiveStep(stepIdx);
//       setStepPct(subPct);
//     });
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       cancelAnimationFrame(rafRef.current);
//     };
//   }, [onScroll]);

//   const step     = recruitmentSteps[activeStep];
//   const nextStep = recruitmentSteps[activeStep + 1];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative"
//       style={{ height: `${recruitmentSteps.length * 100}vh` }}
//     >
//       {/* ── Sticky viewport ── */}
//       <div className="sticky top-0 h-screen overflow-hidden grey-gradient-section flex flex-col">

//         {/* Top progress bar */}
//         <div className="w-full h-1 bg-brand-grey-200 flex-shrink-0">
//           <div
//             className="h-full rounded-full"
//             style={{
//               width: `${progress}%`,
//               background: "linear-gradient(90deg,#C8102E,#E8193E)",
//               transition: "width 0.08s linear",
//             }}
//           />
//         </div>

//         {/* Header */}
//         <div className="text-center pt-10 pb-5 px-4 flex-shrink-0">
//           <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase mb-1">
//             How We Work
//           </p>
//           <h2
//             className="text-4xl md:text-5xl font-bold text-brand-grey-900"
//             style={{ fontFamily: "var(--font-display)" }}
//           >
//             OUR RECRUITMENT PROCESS
//           </h2>
//           <div className="section-divider mt-3" />
//         </div>

//         {/* Main grid */}
//         <div className="flex-1 flex items-center max-w-6xl mx-auto w-full px-4 gap-10 md:gap-16 pb-4">

//           {/* ── LEFT stepper ── */}
//           <div className="hidden md:flex flex-col w-56 flex-shrink-0 gap-0">
//             {recruitmentSteps.map((s, i) => {
//               const done    = i < activeStep;
//               const current = i === activeStep;
//               // partial fill of connector below active step
//               const connectorFill = done ? 1 : current ? stepPct : 0;

//               return (
//                 <div key={s.id} className="flex items-stretch gap-3">
//                   <div className="flex flex-col items-center w-8 flex-shrink-0">
//                     {/* Dot */}
//                     <div
//                       style={{
//                         width:  current ? 34 : 28,
//                         height: current ? 34 : 28,
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontFamily: "var(--font-display)",
//                         fontWeight: 700,
//                         fontSize: current ? 13 : 11,
//                         flexShrink: 0,
//                         background: current || done ? "#C8102E" : "#E5E5E5",
//                         color: current || done ? "white" : "#A3A3A3",
//                         boxShadow: current ? "0 0 0 5px rgba(200,16,46,0.15)" : "none",
//                         transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
//                       }}
//                     >
//                       {done ? (
//                         <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
//                           <polyline points="20 6 9 17 4 12" />
//                         </svg>
//                       ) : s.id}
//                     </div>

//                     {/* Connector */}
//                     {i < recruitmentSteps.length - 1 && (
//                       <div
//                         className="w-0.5 my-1 rounded-full overflow-hidden"
//                         style={{ background: "#E0E0E0", minHeight: 32, flex: 1 }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             height: `${connectorFill * 100}%`,
//                             background: "linear-gradient(180deg,#C8102E,#E8193E)",
//                             transition: "height 0.1s linear",
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Label */}
//                   <div className="pt-1 pb-6 flex-1 min-w-0">
//                     <p
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: current ? 14 : 13,
//                         fontWeight: 700,
//                         letterSpacing: "0.03em",
//                         color: current ? "#C8102E" : done ? "#525252" : "#A3A3A3",
//                         transition: "color 0.3s ease, font-size 0.3s ease",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {s.title}
//                     </p>
//                     {/* Slide-down description for active */}
//                     <div
//                       style={{
//                         maxHeight: current ? 48 : 0,
//                         opacity: current ? 1 : 0,
//                         overflow: "hidden",
//                         transition: "max-height 0.4s ease, opacity 0.35s ease",
//                         marginTop: current ? 4 : 0,
//                       }}
//                     >
//                       <p className="text-xs text-brand-grey-400 leading-relaxed line-clamp-2">
//                         {s.description}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── RIGHT card stack ── */}
//           <div className="flex-1 relative" style={{ perspective: "900px" }}>

//             {/* Outgoing card (fades/slides up as stepPct → 1) */}
//             {nextStep && stepPct > 0.55 && (
//               <div
//                 className="absolute inset-0 bg-white rounded-2xl shadow-md border border-brand-grey-200 overflow-hidden pointer-events-none"
//                 style={{
//                   borderTop: "4px solid #C8102E",
//                   opacity: Math.max(0, 1 - (stepPct - 0.55) * 4),
//                   transform: `translateY(${-(stepPct - 0.55) * 80}px) scale(${1 - (stepPct - 0.55) * 0.06})`,
//                   transition: "none",
//                 }}
//               >
//                 <CardContent step={step} activeStep={activeStep} total={recruitmentSteps.length} progress={progress} />
//               </div>
//             )}

//             {/* Incoming card (rises up from below as stepPct → 1) */}
//             {nextStep && stepPct > 0.55 && (
//               <div
//                 className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-brand-grey-200 overflow-hidden pointer-events-none"
//                 style={{
//                   borderTop: "4px solid #C8102E",
//                   opacity: Math.min(1, (stepPct - 0.55) * 4),
//                   transform: `translateY(${(1 - (stepPct - 0.55) * 4) * 50}px)`,
//                   transition: "none",
//                 }}
//               >
//                 <CardContent step={nextStep} activeStep={activeStep + 1} total={recruitmentSteps.length} progress={progress} />
//               </div>
//             )}

//             {/* Static card — visible when not transitioning */}
//             <div
//               className="bg-white rounded-2xl shadow-lg border border-brand-grey-200 overflow-hidden"
//               style={{
//                 borderTop: "4px solid #C8102E",
//                 opacity: stepPct > 0.55 ? 0 : 1,
//                 transition: "opacity 0.05s",
//               }}
//             >
//               <CardContent step={step} activeStep={activeStep} total={recruitmentSteps.length} progress={progress} />
//             </div>
//           </div>
//         </div>

//         {/* Mobile pill strip */}
//         <div className="md:hidden flex overflow-x-auto gap-2 px-4 pb-5 flex-shrink-0 scrollbar-hide">
//           {recruitmentSteps.map((s, i) => (
//             <div
//               key={s.id}
//               className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
//               style={{
//                 background: i === activeStep ? "#C8102E" : i < activeStep ? "white" : "#F0F0F0",
//                 color:      i === activeStep ? "white"   : i < activeStep ? "#C8102E" : "#A3A3A3",
//                 border:     i < activeStep ? "1.5px solid #C8102E" : "1.5px solid transparent",
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <span>{s.icon}</span>
//               {s.title}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// function CardContent({
//   step,
//   activeStep,
//   total,
//   progress,
// }: {
//   step: (typeof recruitmentSteps)[0];
//   activeStep: number;
//   total: number;
//   progress: number;
// }) {
//   return (
//     <>
//       {/* Card header */}
//       <div className="px-8 pt-8 pb-6 border-b border-brand-grey-100">
//         <div className="flex items-start gap-5 mb-5">
//           <div
//             className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
//             style={{
//               fontFamily: "var(--font-display)",
//               background: "linear-gradient(135deg,#C8102E 0%,#A00D25 100%)",
//               boxShadow: "0 10px 24px rgba(200,16,46,0.28)",
//             }}
//           >
//             {step.id}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs text-brand-red font-bold tracking-widest uppercase mb-1">
//               Step {step.id} of {total}
//             </p>
//             <h3
//               className="text-2xl font-bold text-brand-grey-900 leading-tight"
//               style={{ fontFamily: "var(--font-display)" }}
//             >
//               {step.title}
//             </h3>
//           </div>
//           <span className="text-5xl flex-shrink-0 leading-none">{step.icon}</span>
//         </div>

//         <p className="text-brand-grey-500 text-base leading-relaxed">
//           {step.description}
//         </p>
//       </div>

//       {/* Card footer */}
//       <div className="px-8 py-5 flex items-center justify-between">
//         {/* Step dots */}
//         <div className="flex items-center gap-2">
//           {Array.from({ length: total }).map((_, i) => (
//             <div
//               key={i}
//               className="rounded-full"
//               style={{
//                 width:      i === activeStep ? 22 : 7,
//                 height:     7,
//                 background: i <= activeStep ? "#C8102E" : "#E0E0E0",
//                 transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
//               }}
//             />
//           ))}
//         </div>
//         <p className="text-xs text-brand-grey-400 font-medium tabular-nums">
//           {Math.round(progress)}% Complete
//         </p>
//       </div>
//     </>
//   );
// }


// version 4 



"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";
import { recruitmentSteps } from "@/data";


/* ─── spring config ───────────────────────────────────────────────────────── */
const SPRING = { stiffness: 120, damping: 20, mass: 0.8 };
const SOFT   = { stiffness: 60,  damping: 18, mass: 1   };

export default function RecruitmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);

  const [activeStep, setActiveStep] = useState(0);
  const [prevStep,   setPrevStep]   = useState(0);
  const [direction,  setDirection]  = useState(1); // 1=down -1=up

  /* raw motion values — updated every rAF tick */
  const rawProgress = useMotionValue(0);   // 0-100 global
  const rawStepPct  = useMotionValue(0);   // 0-1 within current step

  /* spring-smoothed versions */
  const springProgress = useSpring(rawProgress, SOFT);
  const barWidth       = useTransform(springProgress, [0, 100], ["0%", "100%"]);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const total   = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct     = Math.min(1, scrolled / total);
      const raw     = pct * recruitmentSteps.length;
      const idx     = Math.min(recruitmentSteps.length - 1, Math.floor(raw));
      const sub     = raw - Math.floor(raw);

      rawProgress.set(pct * 100);
      rawStepPct.set(sub);

      setActiveStep(prev => {
        if (idx !== prev) {
          setDirection(idx > prev ? 1 : -1);
          setPrevStep(prev);
        }
        return idx;
      });
    });
  }, [rawProgress, rawStepPct]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const step = recruitmentSteps[activeStep];

  /* connector fills per step */
  const connectorFills = recruitmentSteps.map((_, i) => {
    if (i < activeStep) return 1;
    if (i === activeStep) return rawStepPct.get();
    return 0;
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${recruitmentSteps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ background: "linear-gradient(160deg,#fafafa 0%,#f2f2f2 100%)" }}>

        {/* ── Top progress bar ── */}
        <div className="w-full h-1 flex-shrink-0" style={{ background: "#E5E5E5" }}>
          <motion.div
            className="h-full origin-left"
            style={{
              width: barWidth,
              background: "linear-gradient(90deg,#C8102E 0%,#E8193E 60%,#ff4d6d 100%)",
              boxShadow: "0 0 12px rgba(200,16,46,0.5)",
            }}
          />
        </div>

        {/* ── Header ── */}
        <motion.div
          className="text-center pt-10 pb-4 px-4 flex-shrink-0"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-1">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-grey-900" style={{ fontFamily: "var(--font-display)" }}>
            OUR RECRUITMENT PROCESS
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* ── Main grid ── */}
        <div className="flex-1 flex items-center max-w-6xl mx-auto w-full px-4 gap-10 md:gap-16 pb-4 ">

          {/* ── LEFT stepper ── */}
          <div className="hidden md:flex flex-col w-60 text-lg flex-shrink-0">
            {recruitmentSteps.map((s, i) => {
              const done    = i < activeStep;
              const current = i === activeStep;
              const fill    = i < activeStep ? 1 : i === activeStep ? connectorFills[i] : 0;

              return (
                <div key={s.id} className="flex items-stretch gap-3">
                  {/* dot + connector */}
                  <div className="flex flex-col items-center w-9  flex-shrink-0">
                    <motion.div
                      animate={{
                        scale:           current ? 1.22 : 1,
                        backgroundColor: current || done ? "#C8102E" : "#E0E0E0",
                        boxShadow:       current
                          ? "0 0 0 6px rgba(200,16,46,0.15), 0 4px 14px rgba(200,16,46,0.35)"
                          : "0 0 0 0px rgba(200,16,46,0)",
                      }}
                      transition={SPRING}
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{ fontFamily: "var(--font-display)", color: current || done ? "white" : "#A3A3A3" }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {done ? (
                          <motion.span key="check" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ duration: 0.25 }}>
                            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.8" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                          </motion.span>
                        ) : (
                          <motion.span key="num" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                            {s.id}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {i < recruitmentSteps.length - 1 && (
                      <div className="w-0.5 rounded-full overflow-hidden my-1" style={{ background: "#E0E0E0", flex: 1, minHeight: 28 }}>
                        <ConnectorFill fill={fill} />
                      </div>
                    )}
                  </div>

                  {/* label */}
                  <div className="pt-1.5 pb-5 flex-1 min-w-0">
                    <motion.p
                      animate={{ color: current ? "#C8102E" : done ? "#525252" : "#B0B0B0", fontSize: current ? "14px" : "13px" }}
                      transition={{ duration: 0.3 }}
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.03em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {s.title}
                    </motion.p>
                    <motion.div
                      animate={{ height: current ? "auto" : 0, opacity: current ? 1 : 0, marginTop: current ? 4 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-xs text-brand-grey-400 leading-relaxed line-clamp-2">{s.description}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT card ── */}
          <div className="flex-1 relative">
            {/* Background stacked ghost cards */}
            {[2, 1].map((offset) => (
              <div
                key={offset}
                className="absolute left-0 right-0 bg-white rounded-2xl border border-brand-grey-200"
                style={{
                  top:    offset * 7,
                  bottom: -(offset * 7),
                  opacity: 0.45 - offset * 0.12,
                  transform: `scale(${1 - offset * 0.025})`,
                  borderTop: "4px solid rgba(200,16,46,0.2)",
                  zIndex: 10 - offset,
                }}
              />
            ))}

            {/* Active card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                initial={{ opacity: 0, y: direction * 60, scale: 0.96, rotateX: direction * 4 }}
                animate={{ opacity: 1, y: 0,              scale: 1,    rotateX: 0            }}
                exit={{    opacity: 0, y: direction * -60, scale: 0.96, rotateX: direction * -4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
                style={{
                  borderTop: "4px solid #C8102E",
                  zIndex: 20,
                  transformPerspective: 800,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(200,16,46,0.08)",
                }}
              >
                {/* Red glow top-left */}
                <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%)", transform: "translate(-30%,-30%)" }} />

                {/* Card header */}
                <div className="px-8 pt-8 pb-6 border-b border-brand-grey-100 relative">
                  <div className="flex items-start gap-5 mb-5">
                    {/* Step badge */}
                    <motion.div
                      initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1,   rotate: 0,   opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                      style={{ fontFamily: "var(--font-display)", background: "linear-gradient(135deg,#C8102E 0%,#900B20 100%)", boxShadow: "0 10px 28px rgba(200,16,46,0.35)" }}
                    >
                      {step.id}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <motion.p
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-xs text-brand-red font-bold tracking-widest uppercase mb-1"
                      >
                        Step {step.id} of {recruitmentSteps.length}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl md:text-3xl font-bold text-brand-grey-900 leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.title}
                      </motion.h3>
                    </div>

                    <motion.span
                      initial={{ scale: 0, rotate: 20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0,  opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                      className="text-5xl flex-shrink-0 leading-none select-none"
                    >
                      {step.icon}
                    </motion.span>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    className="text-brand-grey-500  leading-relaxed mx-20 text-lg"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Card footer */}
                <div className="px-8 py-5 flex items-center justify-between">
                  {/* Pill dots */}
                  <div className="flex items-center gap-2">
                    {recruitmentSteps.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ width: i === activeStep ? 24 : 7, background: i <= activeStep ? "#C8102E" : "#E0E0E0" }}
                        transition={SPRING}
                        className="h-2 rounded-full"
                      />
                    ))}
                  </div>
                  {/* % counter */}
                  <motion.p
                    key={activeStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-brand-grey-400 font-medium tabular-nums"
                  >
                    <ProgressCounter progress={rawProgress} total={recruitmentSteps.length} />
                  </motion.p>
                </div>

                {/* Bottom red strip with subtle fill */}
                <div className="h-1 w-full" style={{ background: "#F5F5F5" }}>
                  <motion.div
                    className="h-full"
                    animate={{ width: `${((activeStep + 1) / recruitmentSteps.length) * 100}%` }}
                    transition={SOFT}
                    style={{ background: "linear-gradient(90deg,#C8102E,#E8193E)", transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scroll hint */}
            <AnimatePresence>
              {activeStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex items-center justify-center gap-2 mt-5 text-brand-grey-400 text-xs"
                >
                  <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  </motion.div>
                  Scroll to walk through the process
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile pills ── */}
        <div className="md:hidden flex overflow-x-auto gap-2 px-4 pb-5 flex-shrink-0">
          {recruitmentSteps.map((s, i) => (
            <motion.div
              key={s.id}
              animate={{
                background: i === activeStep ? "#C8102E" : i < activeStep ? "white" : "#F0F0F0",
                color:      i === activeStep ? "white"   : i < activeStep ? "#C8102E" : "#A3A3A3",
              }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ border: i < activeStep ? "1.5px solid #C8102E" : "1.5px solid transparent" }}
            >
              <span>{s.icon}</span>{s.title}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated connector fill via rAF-synced spring ── */
function ConnectorFill({ fill }: { fill: number }) {
  const mv     = useMotionValue(fill);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const height = useTransform(spring, [0, 1], ["0%", "100%"]);

  useEffect(() => { mv.set(fill); }, [fill, mv]);

  return <motion.div className="w-full rounded-full" style={{ height, background: "linear-gradient(180deg,#C8102E,#E8193E)" }} />;
}

/* ── Live % counter that reads directly from motion value ── */
function ProgressCounter({ progress, total }: { progress: ReturnType<typeof useMotionValue<number>>; total: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const unsub = progress.on("change", v => setDisplay(Math.round(v)));
    return unsub;
  }, [progress]);
  const step = Math.min(total, Math.ceil((display / 100) * total));
  return <>{display}% — Step {step}/{total}</>;
}