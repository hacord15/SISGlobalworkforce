"use client";

import { useEffect, useRef, useState } from "react";
import { recruitmentSteps } from "@/data";

export default function RecruitmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const stepEls = sectionRef.current?.querySelectorAll(".timeline-step");
    if (!stepEls) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.step || "0");
            setTimeout(() => {
              setVisibleSteps((prev) => new Set(Array.from(prev).concat(idx)));
              // Grow line proportionally
              setLineHeight(((idx + 1) / recruitmentSteps.length) * 100);
            }, idx * 180);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    stepEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 grey-gradient-section" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-2">How We Work</p>
          <h2
            className="text-4xl font-bold text-brand-grey-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OUR RECRUITMENT PROCESS
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-brand-grey-200 h-full hidden md:block" />
          {/* Animated fill line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 timeline-line hidden md:block transition-all duration-700 ease-out"
            style={{ height: `${lineHeight}%` }}
          />

          <div className="space-y-10 md:space-y-0">
            {recruitmentSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const isVisible = visibleSteps.has(i);

              return (
                <div
                  key={step.id}
                  data-step={i}
                  className="timeline-step relative md:flex items-center"
                  style={{ minHeight: "120px" }}
                >
                  {/* Left card */}
                  <div className={`md:w-5/12 ${isLeft ? "md:text-right" : "md:invisible"}`}>
                    {isLeft && (
                      <div
                        className={`timeline-card bg-white rounded-xl p-6 shadow-sm border border-brand-grey-200 hover:border-brand-red/30 transition-colors ${
                          isVisible ? "visible" : ""
                        }`}
                        style={{ animationDelay: `${i * 0.18}s` }}
                      >
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "justify-end" : ""}`}>
                          <h3
                            className="text-lg font-bold text-brand-grey-900"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {step.title}
                          </h3>
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <p className="text-brand-grey-500 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="md:w-2/12 flex justify-center my-4 md:my-0 relative z-10">
                    <div
                      className={`timeline-dot w-12 h-12 rounded-full bg-white border-4 border-brand-grey-200 flex items-center justify-center text-brand-grey-900 font-bold text-sm shadow-md transition-all duration-300 ${
                        isVisible
                          ? "visible border-brand-red bg-brand-red text-white scale-110"
                          : ""
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Right card */}
                  <div className={`md:w-5/12 ${!isLeft ? "" : "md:invisible"}`}>
                    {!isLeft && (
                      <div
                        className={`timeline-card-right bg-white rounded-xl p-6 shadow-sm border border-brand-grey-200 hover:border-brand-red/30 transition-colors ${
                          isVisible ? "visible" : ""
                        }`}
                        style={{ animationDelay: `${i * 0.18}s` }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{step.icon}</span>
                          <h3
                            className="text-lg font-bold text-brand-grey-900"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-brand-grey-500 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


