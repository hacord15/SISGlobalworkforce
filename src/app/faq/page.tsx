"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, Search, Phone, Mail, MessageSquare, ChevronRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",       label: "All Questions",     icon: "📋", count: 24 },
  { id: "general",   label: "General",            icon: "💡", count: 5  },
  { id: "seekers",   label: "For Job Seekers",    icon: "👤", count: 7  },
  { id: "employers", label: "For Employers",      icon: "🏢", count: 6  },
  { id: "billing",   label: "Billing & Payments", icon: "💳", count: 3  },
  { id: "account",   label: "Account & Security", icon: "🔒", count: 3  },
];

interface FAQ {
  id:       number;
  category: string;
  question: string;
  answer:   string;
}

const FAQS: FAQ[] = [
  // General
  { id: 1,  category: "general",   question: "What is SIS Global Workforce Solutions?",                  answer: "SIS Global Workforce Solutions Private Limited is a venture of SIS India Ltd., designed to deliver structured and scalable workforce outsourcing solutions. We connect skilled, verified talent with trusted employers through a technology-enabled ecosystem — ensuring transparency, efficiency, and reliability." },
  { id: 2,  category: "general",   question: "Which industries does SIS Global serve?",                   answer: "We serve a wide range of industries including Healthcare, Hospitality, Oil & Gas, Logistics & Warehousing, Engineering & MEP, IT & Technology, Facility Management, Retail, BFSI, and more. Our pre-vetted talent pools are organised by sector so we can respond fast with relevant candidates." },
  { id: 3,  category: "general",   question: "In which countries does SIS Global operate?",              answer: "We currently operate in India (pan-India across 22+ states), UAE, Singapore, United Kingdom, Australia, and the USA. We are actively expanding to additional geographies to serve our global clients." },
  { id: 4,  category: "general",   question: "Is SIS Global Workforce Solutions a listed company?",      answer: "SIS Global Workforce Solutions is a subsidiary of SIS India Ltd., which is listed on both the NSE and BSE. The parent group generates over ₹10,000 Crore in annual revenue and employs 2,50,000+ professionals across its verticals." },
  { id: 5,  category: "general",   question: "How is SIS Global different from other staffing firms?",   answer: "Unlike traditional staffing agencies, SIS Global uses a technology-driven platform with AI-powered candidate matching, real-time compliance management, and a pre-verified talent database built over decades. Backed by SIS India Ltd.'s legacy, we offer structured SLAs, dedicated account managers, and end-to-end workforce lifecycle management." },

  // For Job Seekers
  { id: 6,  category: "seekers",   question: "How do I apply for a job on SIS Global?",                 answer: "You can browse all open positions on our Find Jobs page. Click on any listing, review the job description, and click 'Apply Now'. You'll be asked to fill a short application form and upload your resume. Our team will review your application and reach out within 2–3 business days." },
  { id: 7,  category: "seekers",   question: "Is it free to apply for jobs?",                           answer: "Yes, completely free. SIS Global Workforce Solutions never charges candidates any registration, application, or placement fee. If anyone asks you for money on our behalf, please report it to info@sisglobal.com immediately." },
  { id: 8,  category: "seekers",   question: "How long does the recruitment process take?",             answer: "Timelines vary by role. For most positions, shortlisting happens within 48 hours, client interviews are scheduled within 3–5 days, and successful candidates can expect an offer within 7–10 working days. Urgent roles can be processed faster." },
  { id: 9,  category: "seekers",   question: "What documents do I need to apply?",                      answer: "Typically you'll need an updated resume/CV, a valid government-issued photo ID (Aadhaar, Passport, or PAN), educational certificates, and experience letters. Specific roles may require additional documents such as a medical fitness certificate or trade license." },
  { id: 10, category: "seekers",   question: "Can I apply for multiple jobs at once?",                   answer: "Yes, you can apply for as many jobs as you are genuinely interested in and qualified for. We recommend tailoring your application for each role rather than applying to all listings indiscriminately, as this improves your chances of success." },
  { id: 11, category: "seekers",   question: "Will I receive feedback after an interview?",             answer: "We strive to provide timely feedback after every interview stage. Your dedicated recruitment consultant will inform you of the outcome. If you have not heard back within 5 business days of an interview, please reach out to your assigned consultant or email seekers@sisglobal.com." },
  { id: 12, category: "seekers",   question: "Do you offer contract and temporary roles too?",          answer: "Yes. We place candidates in permanent, contract, temporary, and project-based roles. Contract placements come with full payroll management, statutory compliance, and benefit administration handled by SIS Global on your behalf." },

  // For Employers
  { id: 13, category: "employers", question: "How quickly can you deploy workforce?",                   answer: "For most roles, we can shortlist qualified candidates within 48 hours and deploy within 5–7 working days, subject to documentation and onboarding requirements. For bulk or specialised deployments, timelines are discussed and agreed upon at the outset via a Service Level Agreement." },
  { id: 14, category: "employers", question: "How are candidates verified before placement?",            answer: "Every candidate undergoes a multi-stage verification process: identity and address verification, educational and professional qualification checks, employment history and reference checks, criminal background screening (where required), and role-specific skill assessments. Only verified candidates are presented to clients." },
  { id: 15, category: "employers", question: "Do you handle payroll and compliance?",                   answer: "Yes. Our payroll management service covers salary processing, statutory deductions (PF, ESI, TDS), Form 16 issuance, full-and-final settlement, and labour law compliance across all states. We act as the employer of record for contract staff, taking complete liability off your books." },
  { id: 16, category: "employers", question: "What are your service charges?",                          answer: "Our fees depend on the engagement model (permanent placement, contract staffing, or payroll management), the volume of requirements, and the industry sector. We offer transparent, competitive pricing with no hidden charges. Contact our sales team at employers@sisglobal.com for a customised quote." },
  { id: 17, category: "employers", question: "Can you handle large-scale or bulk hiring?",              answer: "Absolutely. We have successfully executed bulk hiring drives for 500+ positions simultaneously across industries such as Logistics, Retail, Healthcare, and Security. Dedicated project teams are assigned for large mandates with weekly reporting and SLA-backed delivery commitments." },
  { id: 18, category: "employers", question: "Do you offer a replacement guarantee?",                   answer: "Yes. For permanent placements, we offer a free replacement guarantee period (typically 60–90 days depending on the seniority of the role). If a placed candidate exits during the guarantee period for performance reasons, we will source and place a suitable replacement at no additional charge." },

  // Billing
  { id: 19, category: "billing",   question: "What payment methods do you accept?",                     answer: "We accept NEFT/RTGS bank transfers, cheques, and major corporate credit/debit cards. For international clients, we support wire transfers in USD, GBP, AED, and SGD. All invoices are issued within 3 working days of milestone completion." },
  { id: 20, category: "billing",   question: "How do I access my invoices and payment history?",        answer: "Registered employer accounts can access all invoices, receipts, and payment history from the Employer Dashboard under the Billing section. If you do not have dashboard access, email finance@sisglobal.com with your company name and registered email." },
  { id: 21, category: "billing",   question: "What is your refund and cancellation policy?",            answer: "Service fees for completed placements are non-refundable. For contracts cancelled before commencement, any pre-paid amounts (less administrative costs) are refunded within 15 working days. Please refer to your Master Service Agreement for full terms." },

  // Account
  { id: 22, category: "account",   question: "How do I create an employer account?",                    answer: "Visit the Employers page and click 'Create Account'. You'll need to provide your company name, CIN/GSTIN, registered address, and primary contact details. Our team verifies all employer accounts within 24 hours before granting full access." },
  { id: 23, category: "account",   question: "How do I reset my password?",                             answer: "Click 'Forgot Password' on the login page and enter your registered email address. You will receive a password reset link valid for 30 minutes. If you do not receive the email, check your spam folder or contact support@sisglobal.com." },
  { id: 24, category: "account",   question: "How is my data protected on SIS Global?",                 answer: "We take data security seriously. All personal and business data is encrypted in transit (TLS 1.3) and at rest (AES-256). We comply with India's Digital Personal Data Protection Act 2023. We never sell or share your data with third parties. Read our full Privacy Policy for details." },
];

// ── Accordion item ────────────────────────────────────────────────────────
function AccordionItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        borderColor:  isOpen ? "rgba(200,16,46,0.3)" : "#E5E5E5",
        background:   isOpen ? "white" : "white",
        boxShadow:    isOpen ? "0 4px 20px rgba(200,16,46,0.08)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-6 py-5 text-left group"
      >
        {/* Number badge */}
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-colors"
          style={{
            background: isOpen ? "#C8102E" : "#F5F5F5",
            color:      isOpen ? "white"   : "#A3A3A3",
            fontFamily: "var(--font-display)",
          }}
        >
          {String(faq.id).padStart(2, "0")}
        </span>

        <span
          className="flex-1 font-semibold text-sm leading-relaxed transition-colors"
          style={{ color: isOpen ? "#C8102E" : "#171717" }}
        >
          {faq.question}
        </span>

        <ChevronDown
          size={18}
          className="flex-shrink-0 mt-0.5 transition-transform duration-300 text-brand-grey-400"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Answer panel */}
      <div
        style={{
          maxHeight:  isOpen ? 400 : 0,
          overflow:   "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-6 pb-6 ml-11">
          <div className="w-8 h-px bg-brand-red/30 mb-4" />
          <p className="text-sm text-brand-grey-500 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId,         setOpenId]         = useState<number | null>(1);
  const [query,          setQuery]          = useState("");

  const filtered = useMemo(() => {
    let list = FAQS;
    if (activeCategory !== "all") list = list.filter((f) => f.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query]);

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#171717 0%,#262626 100%)" }}>
          {/* Decorative rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
            <div className="absolute top-10 -right-10 w-72 h-72 rounded-full border border-white/5" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full border border-brand-red/10" />
            <div
              className="absolute right-0 top-0 w-1/2 h-full"
              style={{ background: "radial-gradient(ellipse 60% 80% at 90% 40%, rgba(200,16,46,0.14) 0%, transparent 70%)" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} />
              <span className="text-white/70">FAQ</span>
            </div>

            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(200,16,46,0.2)", color: "#FF6B7A", border: "1px solid rgba(200,16,46,0.28)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                Help Center
              </span>

              <h1
                className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently Asked <span className="text-brand-red">Questions</span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Everything you need to know about SIS Global Workforce Solutions. Can&apos;t find your answer? Contact our team directly.
              </p>

              {/* Search bar */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setActiveCategory("all"); }}
                    placeholder="Search questions…"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  />
                </div>
                <button
                  onClick={() => setQuery("")}
                  className="btn-primary !py-3.5 !px-6 text-sm"
                >
                  {query ? "Clear" : "Search"}
                </button>
              </div>

              {/* Quick stat pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { label: "24 Questions", color: "rgba(255,255,255,0.08)" },
                  { label: "6 Categories", color: "rgba(255,255,255,0.08)" },
                  { label: "Avg. response: 4 hrs", color: "rgba(200,16,46,0.25)" },
                ].map((p) => (
                  <span
                    key={p.label}
                    className="text-xs text-white/60 px-3 py-1.5 rounded-full font-medium"
                    style={{ background: p.color, border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ MAIN CONTENT ══════════ */}
        <section className="py-16" style={{ background: "linear-gradient(160deg,#FAFAFA 0%,#F3F3F3 100%)" }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">

              {/* ── Sidebar ── */}
              <aside className="lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-brand-grey-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-4 border-b border-brand-grey-100" style={{ background: "#FFF5F6" }}>
                    <p className="text-xs font-bold text-brand-red tracking-widest uppercase">Categories</p>
                  </div>

                  <div className="p-2">
                    {CATEGORIES.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setActiveCategory(cat.id); setQuery(""); setOpenId(null); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left"
                          style={{
                            background:   isActive ? "rgba(200,16,46,0.07)" : "transparent",
                            color:        isActive ? "#C8102E" : "#525252",
                          }}
                        >
                          <span className="text-base leading-none">{cat.icon}</span>
                          <span className="flex-1">{cat.label}</span>
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: isActive ? "rgba(200,16,46,0.12)" : "#F0F0F0",
                              color:      isActive ? "#C8102E" : "#A3A3A3",
                            }}
                          >
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick contact card */}
                <div
                  className="mt-5 rounded-2xl p-5 text-white"
                  style={{ background: "linear-gradient(135deg,#C8102E 0%,#900B20 100%)" }}
                >
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>Still have questions?</p>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">Our team replies within 4 working hours.</p>
                  <Link
                    href="/"
                    className="block w-full py-2.5 rounded-lg bg-white text-center text-sm font-bold text-brand-red hover:bg-brand-grey-50 transition-colors"
                  >
                    Contact Support →
                  </Link>
                </div>
              </aside>

              {/* ── FAQ list ── */}
              <div>
                {/* Result header */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-brand-grey-500">
                    Showing <strong className="text-brand-grey-900">{filtered.length}</strong> question{filtered.length !== 1 ? "s" : ""}
                    {activeCategory !== "all" && (
                      <> in <strong className="text-brand-red">{CATEGORIES.find((c) => c.id === activeCategory)?.label}</strong></>
                    )}
                    {query && <> matching &ldquo;<strong className="text-brand-red">{query}</strong>&rdquo;</>}
                  </p>
                  {(query || activeCategory !== "all") && (
                    <button
                      onClick={() => { setQuery(""); setActiveCategory("all"); }}
                      className="text-xs text-brand-red hover:underline font-semibold"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {/* Accordion */}
                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className="font-bold text-brand-grey-700 text-lg mb-2">No results found</p>
                    <p className="text-sm text-brand-grey-400">Try a different search term or browse all categories.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filtered.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openId === faq.id}
                        onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Still have questions CTA */}
                <div
                  className="mt-10 rounded-2xl p-8 text-center border border-brand-grey-200"
                  style={{ background: "white" }}
                >
                  <div className="text-4xl mb-4">💬</div>
                  <h3
                    className="text-xl font-bold text-brand-grey-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Still have questions?
                  </h3>
                  <p className="text-sm text-brand-grey-500 mb-6 max-w-sm mx-auto leading-relaxed">
                    Can&apos;t find what you&apos;re looking for? Our support team is available Monday to Saturday, 9AM–7PM IST.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/" className="btn-primary text-sm">
                      <MessageSquare size={14} /> Contact Support
                    </Link>
                    <a
                      href="tel:01244171888"
                      className="flex items-center gap-2 px-5 py-2.5 border border-brand-grey-300 text-brand-grey-700 text-sm font-semibold rounded hover:border-brand-red hover:text-brand-red transition-colors"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                    >
                      <Phone size={14} /> 0124-4171 888
                    </a>
                    <a
                      href="mailto:info@sisglobal.com"
                      className="flex items-center gap-2 px-5 py-2.5 border border-brand-grey-300 text-brand-grey-700 text-sm font-semibold rounded hover:border-brand-red hover:text-brand-red transition-colors"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
                    >
                      <Mail size={14} /> Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}