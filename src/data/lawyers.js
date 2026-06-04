const lawyers = [
    {
        id: 1,
        name: "Adv. Meera Kapoor",
        email: "meera.kapoor@lawfirm.in",
        phone: "+91 98765 11111",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
        specialization: "Property Transfer",
        experience: 12,
        barCouncilId: "TS/4521/2014",
        rating: 4.9,
        reviewCount: 128,
        bio: "Specialist in property transfer documentation, sale deeds, and registration processes. Over 12 years of experience handling residential and commercial property transactions across Telangana.",
        languages: ["English", "Hindi", "Telugu"],
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
        },
        reviews: [
            { id: 1, name: "Rajesh Nair", text: "Meera handled our villa purchase seamlessly. All documentation was perfect and the registration went smoothly.", rating: 5, date: "2026-02-15" },
            { id: 2, name: "Sanya Gupta", text: "Very professional and thorough in title verification. Caught a lien that we would have missed otherwise.", rating: 5, date: "2026-01-20" },
            { id: 3, name: "Anil Reddy", text: "Excellent service for our property transfer. Highly recommend for any real estate documentation.", rating: 4, date: "2025-12-10" },
        ]
    },
    {
        id: 2,
        name: "Adv. Rajesh Iyer",
        email: "rajesh.iyer@lawfirm.in",
        phone: "+91 98765 22222",
        image: "https://images.unsplash.com/photo-1560250097027-c774dba516dd?w=600&q=80",
        specialization: "Title Verification",
        experience: 18,
        barCouncilId: "TS/2198/2008",
        rating: 4.8,
        reviewCount: 215,
        bio: "Senior advocate with deep expertise in title search, encumbrance certificates, and property legitimacy verification. Trusted by leading real estate developers in Hyderabad.",
        languages: ["English", "Hindi", "Telugu", "Tamil"],
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Friday"],
            slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"]
        },
        reviews: [
            { id: 1, name: "Vikram Shah", text: "Mr. Iyer's title verification report was incredibly thorough. Found a 30-year-old dispute that was resolved before purchase.", rating: 5, date: "2026-03-01" },
            { id: 2, name: "Priya Menon", text: "Absolute expert in land records. His due diligence saved us from a fraudulent property deal.", rating: 5, date: "2026-02-05" },
            { id: 3, name: "Deepak Kumar", text: "Reliable and experienced. The encumbrance certificate process was handled efficiently.", rating: 4, date: "2025-11-15" },
        ]
    },
    {
        id: 3,
        name: "Adv. Priyanka Deshmukh",
        email: "priyanka.d@lawfirm.in",
        phone: "+91 98765 33333",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&q=80",
        specialization: "RERA Compliance",
        experience: 8,
        barCouncilId: "TS/6712/2018",
        rating: 4.7,
        reviewCount: 95,
        bio: "RERA law specialist helping buyers, sellers, and developers navigate regulatory compliance. Expert in filing RERA complaints and ensuring project registrations are up to code.",
        languages: ["English", "Hindi", "Marathi"],
        availability: {
            days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
            slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
        },
        reviews: [
            { id: 1, name: "Sunita Joshi", text: "Priyanka helped us file a RERA complaint against a delayed project. Got our refund within 3 months.", rating: 5, date: "2026-02-20" },
            { id: 2, name: "Manoj Rao", text: "Very knowledgeable about RERA regulations. Helped verify our builder's compliance before booking.", rating: 5, date: "2026-01-10" },
            { id: 3, name: "Kavitha Reddy", text: "Good guidance on RERA norms. The process was clear and well-explained.", rating: 4, date: "2025-12-28" },
        ]
    },
    {
        id: 4,
        name: "Adv. Karthik Venkatesh",
        email: "karthik.v@lawfirm.in",
        phone: "+91 98765 44444",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
        specialization: "Lease Agreements",
        experience: 10,
        barCouncilId: "TS/3890/2016",
        rating: 4.6,
        reviewCount: 142,
        bio: "Expert in drafting and reviewing lease agreements, rental contracts, and commercial tenancy disputes. Handles both residential and commercial leasing across Hyderabad.",
        languages: ["English", "Telugu", "Kannada"],
        availability: {
            days: ["Monday", "Tuesday", "Thursday", "Friday"],
            slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]
        },
        reviews: [
            { id: 1, name: "Rashi Agarwal", text: "Drafted a comprehensive commercial lease agreement for our office space. Very thorough with penalty clauses.", rating: 5, date: "2026-03-10" },
            { id: 2, name: "Neeraj Patil", text: "Helped resolve a tenant dispute with clear legal communication. Efficient and professional.", rating: 4, date: "2026-01-25" },
            { id: 3, name: "Divya Rani", text: "Good understanding of rental laws. Made the lease renewal process hassle-free.", rating: 5, date: "2025-11-30" },
        ]
    },
    {
        id: 5,
        name: "Adv. Farah Siddiqui",
        email: "farah.s@lawfirm.in",
        phone: "+91 98765 55555",
        image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&q=80",
        specialization: "NRI Property Law",
        experience: 15,
        barCouncilId: "TS/1567/2011",
        rating: 4.9,
        reviewCount: 178,
        bio: "Specialized in NRI property acquisition, Power of Attorney management, and cross-border real estate compliance under FEMA regulations. Trusted by NRIs in 12+ countries.",
        languages: ["English", "Hindi", "Urdu", "Arabic"],
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
            slots: ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM", "05:00 PM", "06:00 PM"]
        },
        reviews: [
            { id: 1, name: "Ahmed Khan (Dubai)", text: "Farah managed my Hyderabad property purchase entirely via video calls and POA. Flawless execution.", rating: 5, date: "2026-03-05" },
            { id: 2, name: "Srinivas Rao (USA)", text: "Best NRI property lawyer. Handled FEMA compliance, registration, and tenant management all in one go.", rating: 5, date: "2026-02-12" },
            { id: 3, name: "Meena Sharma (UK)", text: "Very responsive and knowledgeable. Made buying property from abroad stress-free.", rating: 5, date: "2025-12-20" },
        ]
    },
    {
        id: 6,
        name: "Adv. Suresh Babu",
        email: "suresh.b@lawfirm.in",
        phone: "+91 98765 66666",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e1f1e18cd?w=600&q=80",
        specialization: "Real Estate Disputes",
        experience: 22,
        barCouncilId: "TS/0892/2004",
        rating: 4.8,
        reviewCount: 310,
        bio: "Senior litigator with 22 years of experience in property disputes, boundary conflicts, inheritance cases, and civil court proceedings related to real estate across Telangana and Andhra Pradesh.",
        languages: ["English", "Hindi", "Telugu"],
        availability: {
            days: ["Tuesday", "Wednesday", "Thursday", "Friday"],
            slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
        },
        reviews: [
            { id: 1, name: "Ramesh Prasad", text: "Won a 10-year-old property dispute case with Mr. Babu's expertise. His court presence is formidable.", rating: 5, date: "2026-02-28" },
            { id: 2, name: "Lakshmi Devi", text: "Handled our inheritance property partition case with great sensitivity and legal acumen.", rating: 5, date: "2026-01-15" },
            { id: 3, name: "Gopal Verma", text: "Excellent litigation skills. Resolved a boundary dispute in just 4 months of filing.", rating: 4, date: "2025-11-05" },
        ]
    }
];

export const specializations = [
    "All Specializations",
    "Property Transfer",
    "Title Verification",
    "RERA Compliance",
    "Lease Agreements",
    "NRI Property Law",
    "Real Estate Disputes"
];

export default lawyers;
