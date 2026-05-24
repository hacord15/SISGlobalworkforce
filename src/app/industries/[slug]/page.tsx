import { notFound } from "next/navigation";
import { industries } from "@/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface IndustryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const industry = industries.find((i) => i.id === params.slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.title} Staffing | SIS Global Workforce Solutions`,
    description: industry.description,
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = industries.find((i) => i.id === params.slug);
  if (!industry) notFound();

  // Related industries (exclude current)
  const related = industries.filter((i) => i.id !== industry.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-72 flex items-end pb-12 overflow-hidden">
          <img
            src={industry.image}
            alt={industry.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
              <span>/</span>
              <span className="text-white">{industry.title}</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {industry.icon} {industry.title}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2
                className="text-2xl font-bold text-brand-grey-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {industry.title} Workforce Solutions
              </h2>
              <div className="section-divider section-divider-left mb-6" />
              <p className="text-brand-grey-600 leading-relaxed mb-6">{industry.description}</p>
              <p className="text-brand-grey-600 leading-relaxed mb-8">
                SIS Global provides end-to-end staffing and workforce management solutions tailored specifically for the {industry.title.toLowerCase()} sector. Our pre-vetted talent pool, compliance-first approach, and dedicated account management ensure your workforce needs are met efficiently and reliably.
              </p>

              <h3
                className="text-xl font-bold text-brand-grey-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What We Offer
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Permanent Placement",
                  "Contract Staffing",
                  "Temporary Workforce",
                  "Payroll Management",
                  "Background Verification",
                  "Compliance Management",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
                    <span className="text-sm text-brand-grey-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary">
                Get Industry Staffing <ArrowRight size={16} />
              </Link>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-brand-grey-50 rounded-xl p-6 border border-brand-grey-200 mb-6">
                <h4
                  className="font-bold text-brand-grey-900 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quick Enquiry
                </h4>
                <form className="space-y-3">
                  {["Your Name", "Email", "Phone"].map((f) => (
                    <input
                      key={f}
                      type="text"
                      placeholder={f}
                      className="w-full px-3 py-2.5 border border-brand-grey-200 text-sm focus:outline-none focus:border-brand-red"
                    />
                  ))}
                  <button type="submit" className="btn-primary w-full justify-center">
                    Submit
                  </button>
                </form>
              </div>

              <div className="bg-brand-red rounded-xl p-6 text-white">
                <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Need Urgent Staffing?
                </h4>
                <p className="text-white/80 text-sm mb-4">Call us directly for immediate workforce deployment.</p>
                <a href="tel:01244171888" className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  0124-4171 888
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Industries */}
        <section className="py-12 grey-gradient-section">
          <div className="max-w-7xl mx-auto px-4">
            <h3
              className="text-2xl font-bold text-brand-grey-900 mb-8 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Other Industries We Serve
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={rel.href}
                  className="industry-card bg-white rounded-lg overflow-hidden shadow-sm group block"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="industry-overlay absolute inset-0" />
                  </div>
                  <div className="p-4">
                    <h4
                      className="font-bold text-brand-grey-900 text-sm mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {rel.icon} {rel.title}
                    </h4>
                    <div className="flex items-center gap-1 text-brand-red text-xs font-semibold">
                      Learn More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
