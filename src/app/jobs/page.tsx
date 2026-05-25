// // pages/find-jobs/index.js — Find Jobs (SSR)
// import Head from 'next/head'
// import Link from 'next/link'
// import Layout from '../../components/Layout'
// import JobCard from '../../components/JobCard'
// import { JOBS, CATEGORIES } from '../../lib/data'
// import dynamic from 'next/dynamic'

// // CSR filter panel
// const JobFilters = dynamic(() => import('../../components/csr/JobFilters'), { ssr: false })

// export default function FindJobsPage({ jobs, total, categories, query, location, category }) {
//   return (
//     <>
//       <Head>
//         <title>Find Jobs – SIS Global Workforce Solutions</title>
//       </Head>
//       <Layout>
//         {/* Page Header */}
//         <div style={{ background: 'linear-gradient(135deg, #EBF4FF 0%, #F0F7FF 100%)', padding: '48px 0' }}>
//           <div className="container">
//             <div className="breadcrumb" style={{ marginBottom: 16 }}>
//               <Link href="/">Home</Link>
//               <span className="breadcrumb-sep">›</span>
//               <span>Find Jobs</span>
//             </div>
//             <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 8 }}>
//               {query ? `Results for "${query}"` : 'Browse All Jobs'}
//             </h1>
//             <p style={{ fontSize: 16, color: 'var(--gray-600)' }}>
//               Showing <strong>{total}</strong> jobs {location ? `in ${location}` : 'across all locations'}
//             </p>
//           </div>
//         </div>

//         {/* Category Tabs */}
//         <div style={{ borderBottom: '1px solid var(--gray-200)', background: 'white' }}>
//           <div className="container" style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '0 24px' }}>
//             <Link href="/find-jobs" style={{
//               display: 'inline-flex', padding: '14px 18px', whiteSpace: 'nowrap',
//               fontSize: 14, fontWeight: 600, borderBottom: !category ? '2px solid var(--primary)' : '2px solid transparent',
//               color: !category ? 'var(--primary)' : 'var(--gray-600)',
//             }}>All Jobs</Link>
//             {categories.map((cat) => (
//               <Link key={cat.name} href={`/find-jobs?category=${encodeURIComponent(cat.name)}`} style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 6,
//                 padding: '14px 18px', whiteSpace: 'nowrap',
//                 fontSize: 14, fontWeight: 600,
//                 borderBottom: category === cat.name ? '2px solid var(--primary)' : '2px solid transparent',
//                 color: category === cat.name ? 'var(--primary)' : 'var(--gray-600)',
//               }}>
//                 {cat.icon} {cat.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="section">
//           <div className="container">
//             <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
//               {/* Sidebar — CSR Filters */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//                 <JobFilters />
//               </div>

//               {/* Job listings */}
//               <div>
//                 {/* Toolbar */}
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
//                   <p style={{ fontSize: 15, color: 'var(--gray-600)' }}>
//                     <strong style={{ color: 'var(--dark)' }}>{total}</strong> Jobs Found
//                   </p>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                     <select className="form-input" style={{ width: 'auto', padding: '8px 14px', fontSize: 14 }}>
//                       <option>Newest First</option>
//                       <option>Salary: High to Low</option>
//                       <option>Salary: Low to High</option>
//                       <option>Most Relevant</option>
//                     </select>
//                     {/* View toggle icons */}
//                     <div style={{ display: 'flex', gap: 4, border: '1px solid var(--gray-300)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
//                       {['grid', 'list'].map((v) => (
//                         <button key={v} style={{
//                           padding: '8px 12px', border: 'none', background: 'white',
//                           cursor: 'pointer', color: 'var(--gray-600)',
//                         }} title={`${v} view`}>
//                           {v === 'grid' ? '⊞' : '≡'}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Jobs grid */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//                   {jobs.map((job) => (
//                     <JobCard key={job.id} job={job} view="list" />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 <div className="pagination">
//                   {[1, 2, 3, '...', 8].map((p, i) => (
//                     <button key={i} className={`page-btn ${p === 1 ? 'active' : ''}`}>{p}</button>
//                   ))}
//                   <button className="page-btn" style={{ width: 'auto', padding: '0 16px' }}>Next →</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   )
// }

// // CALLING FROM LOCAL DB
// //
// // export async function getServerSideProps({ query }) {
// //   const { q, location, category } = query
// //   let jobs = [...JOBS]

// //   if (q) jobs = jobs.filter(j => j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase()))
// //   if (location) jobs = jobs.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
// //   if (category) jobs = jobs.filter(j => j.category === category)

// //   return {
// //     props: {
// //       jobs,
// //       total: jobs.length,
// //       categories: CATEGORIES,
// //       query: q || null,
// //       location: location || null,
// //       category: category || null,
// //     },
// //   }
// // }


// // export async function getServerSideProps({ query }) {
// //   const { q, location, category, salary, experience} = query

// //   let jobs = []

// //   try {
// //     const res = await fetch(
// //       "https://uatsisglobalapi.neuralinfo.co.in/public/jobs/preview?status=Open"
// //     )
// //     const data = await res.json()

// //     // Map API → your existing JOBS structure
// //     jobs = data.map((j) => ({
// //       id: j.job_id,
// //       title: j.job_title,
// //       company: j.category_name || "Company",
// //       logo: j.job_title?.charAt(0) || "J",
// //       logoColor: "#2563EB",
// //       location: j.country_name,
// //       type: "Full Time",
// //       // salary: `${j.salary_min} - ${j.salary_max}`,
// //       salaryMin: Number(j.salary_min),
// //       salaryMax: Number(j.salary_max),
// //       salary: `${j.salary_min} - ${j.salary_max}`,
// //       tags: [],
// //       posted: new Date(j.created_at).toLocaleDateString(),
// //       urgent: false,
// //       category: j.category_name,
// //       experience: Number(j.min_experience),
// //       featured: false,
// //     }))

// //   } catch (err) {
// //     console.error("API Error:", err)
// //   }


// //   const parseExperienceRange = (range) => {
// //     if (range.includes('VP')) {
// //       return { min: 10, max: 15 }
// //     }
  
// //     const match = range.match(/\((\d+)-(\d+)/)
  
// //     if (!match) return null
  
// //     return {
// //       min: Number(match[1]),
// //       max: Number(match[2]),
// //     }
// //   }

 

// //   if (salary) {



// //     if (experience) {
// //       const selectedExp = experience.split(',')
    
// //       jobs = jobs.filter(job => {
// //         return selectedExp.some(range => {
// //           const parsed = parseExperienceRange(range)
// //           if (!parsed) return false
    
// //           const { min, max } = parsed
    
// //           return job.experience >= min && job.experience <= max
// //         })
// //       })
// //     }


// //     const selectedRanges = salary.split(',')
  
// //     jobs = jobs.filter(job => {
// //       return selectedRanges.some(range => {
// //         const { min, max } = parseSalaryRange(range)
  
// //         return (
// //           job.salaryMin <= max &&
// //           job.salaryMax >= min
// //         )
// //       })
// //     })
// //   }

// //   // ✅ KEEP YOUR ORIGINAL FILTER LOGIC (unchanged)
// //   if (q) jobs = jobs.filter(j => j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase()))
// //   if (location) jobs = jobs.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
// //   // 🔥 FIXED CATEGORY FILTER
// //   const selectedCategories = category
// //     ? category.split(',')
// //     : []

// //   if (selectedCategories.length) {
// //     jobs = jobs.filter(j =>
// //       selectedCategories
// //         .map(c => c.toLowerCase())
// //         .includes(j.category?.toLowerCase())
// //     )
// //   }

// //   return {
// //     props: {
// //       jobs,
// //       total: jobs.length,
// //       categories: [], // keep if you want static categories
// //       query: q || null,
// //       location: location || null,
// //       category: category || null,
// //     },
// //   }
// // }

// export async function getServerSideProps({ query }) {
//   const { q, location, category, salary, experience } = query

//   let jobs = []

//   try {
//     const res = await fetch(
//       "https://uatsisglobalapi.neuralinfo.co.in/public/jobs/preview?status=Open"
//     )
//     const data = await res.json()
//     console.log("API sample:", data[0])


//     jobs = data.map((j) => ({
//       id: j.job_id,
//       title: j.job_title,
//       company: j.category_name || "Company",
//       logo: j.job_title?.charAt(0) || "J",
//       logoColor: "#2563EB",
//       location: j.country_name,
//       type: "Full Time",

//       // ✅ salary numbers
//       salaryMin: Number(j.salary_min),
//       salaryMax: Number(j.salary_max),
//       salary: `${j.salary_min} - ${j.salary_max}`,

//       tags: [],
//       posted: new Date(j.created_at).toLocaleDateString(),
//       urgent: false,
//       category: j.category_name,

//       // ✅ experience number
//       experience: j.min_experience ? Number(j.min_experience) : 0,

//       featured: false,
//     }))

//   } catch (err) {
//     console.error("API Error:", err)
//   }

//   // ✅ Salary parser
//   const parseSalaryRange = (range) => {
//     if (range === '$180k+') {
//       return { min: 180000, max: Infinity }
//     }

//     const [min, max] = range.replace(/\$/g, '').split('–')

//     return {
//       min: parseInt(min) * 1000,
//       max: parseInt(max) * 1000,
//     }
//   }

//   // ✅ Experience parser
//   const parseExperienceRange = (range) => {
//     if (range.includes('VP')) {
//       return { min: 10, max: 15 }
//     }

//     const match = range.match(/\((\d+)-(\d+)/)

//     if (!match) return null

//     return {
//       min: Number(match[1]),
//       max: Number(match[2]),
//     }
//   }

//   // 🔍 FILTERS START

//   // 🔹 Search
//   if (q) {
//     jobs = jobs.filter(j =>
//       j.title.toLowerCase().includes(q.toLowerCase()) ||
//       j.company.toLowerCase().includes(q.toLowerCase())
//     )
//   }

//   // 🔹 Location
//   if (location) {
//     jobs = jobs.filter(j =>
//       j.location.toLowerCase().includes(location.toLowerCase())
//     )
//   }

//   // 🔹 Category
//   const selectedCategories = category ? category.split(',') : []

//   if (selectedCategories.length) {
//     jobs = jobs.filter(j =>
//       selectedCategories
//         .map(c => c.toLowerCase())
//         .includes(j.category?.toLowerCase())
//     )
//   }

//   // 🔹 Salary filter
//   if (salary) {
//     const selectedRanges = salary.split(',')

//     jobs = jobs.filter(job =>
//       selectedRanges.some(range => {
//         const { min, max } = parseSalaryRange(range)

//         return (
//           job.salaryMin <= max &&
//           job.salaryMax >= min
//         )
//       })
//     )
//   }

//   if (experience) {
//     const selectedExp = experience.split(',')
  
//     jobs = jobs.filter(job =>
//       selectedExp.some(range => {
//         const parsed = parseExperienceRange(range)
//         if (!parsed) return false
  
//         const { min, max } = parsed
//         // Pass the job if it meets the criteria, OR if the API didn't provide min_experience data (which defaults to 0)
//         return (job.experience >= min && job.experience <= max) || job.experience === 0
//       })
//     )
//   }

//   return {
    
//     props: {
//       jobs,
//       total: jobs.length,
//       categories: [],
//       query: q || null,
//       location: location || null,
//       category: category || null,
//     },
//   }
// }