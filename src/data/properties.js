const properties = [
    {
        id: 1,
        title: "Skyline Penthouse – Hitech City",
        price: 42500000,
        type: "Flat",
        beds: 4,
        baths: 4,
        sqft: 3200,
        city: "Hyderabad",
        area: "Hitech City",
        address: "Survey No. 42, Hitech City Rd, Madhapur, Hyderabad 500081",
        description: "An ultra-luxurious penthouse atop one of Hitech City's most prestigious towers. Floor-to-ceiling windows frame stunning views of the Hyderabad skyline and Durgam Cheruvu lake. Italian marble flooring, a private elevator lobby, modular kitchen with Bosch appliances, and a wraparound terrace define this architectural masterpiece.",
        amenities: ["Rooftop Terrace", "Private Elevator", "Smart Home Automation", "Clubhouse", "Swimming Pool", "Gym", "Wine Cellar", "Home Theater"],
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        coordinates: [17.4435, 78.3772],
        yearBuilt: 2023,
        status: "For Sale",
        featured: true,
        agent: {
            name: "Priya Reddy",
            phone: "+91 98765 43210",
            email: "priya@urbanestates.in",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
            rating: 4.9,
            deals: 234
        }
    },
    {
        id: 2,
        title: "Lakeside Villa – Gachibowli",
        price: 85000000,
        type: "Villa",
        beds: 5,
        baths: 5,
        sqft: 5500,
        city: "Hyderabad",
        area: "Gachibowli",
        address: "Plot 18, Nallagandla, Gachibowli, Hyderabad 500032",
        description: "A breathtaking villa in Gachibowli's most exclusive gated enclave overlooking Osmansagar. Spread across 5,500 sq ft with a private garden, infinity pool, and resort-style landscaping. Features include a grand double-height living room, Italian modular kitchen, home office, and dedicated staff quarters.",
        amenities: ["Infinity Pool", "Lake View", "Landscaped Garden", "Home Office", "3-Car Parking", "Smart Home", "Outdoor BBQ", "Guest Suite"],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800"
        ],
        coordinates: [17.4400, 78.3489],
        yearBuilt: 2024,
        status: "For Sale",
        featured: true,
        agent: {
            name: "Rahul Sharma",
            phone: "+91 91234 56789",
            email: "rahul@urbanestates.in",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            rating: 4.8,
            deals: 189
        }
    },
    {
        id: 3,
        title: "Premium 3BHK – Kondapur",
        price: 15500000,
        type: "Flat",
        beds: 3,
        baths: 3,
        sqft: 1850,
        city: "Hyderabad",
        area: "Kondapur",
        address: "Flat 402, Prestige Heights, Kondapur, Hyderabad 500084",
        description: "A superbly designed 3BHK apartment in a premium gated community at Kondapur. Features include expansive balconies with city views, vitrified tile flooring, modular kitchen with chimney, and dedicated covered parking. The complex offers a clubhouse, rooftop jogging track, and landscaped central courtyard.",
        amenities: ["Clubhouse", "Jogging Track", "CCTV Security", "Power Backup", "Children's Play Area", "Rainwater Harvesting", "Covered Parking"],
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        coordinates: [17.4601, 78.3527],
        yearBuilt: 2022,
        status: "For Sale",
        featured: true,
        agent: {
            name: "Sneha Rao",
            phone: "+91 87654 32109",
            email: "sneha@urbanestates.in",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
            rating: 4.7,
            deals: 156
        }
    },
    {
        id: 4,
        title: "Royal Gated Community Villa – Madhapur",
        price: 125000000,
        type: "Villa",
        beds: 6,
        baths: 6,
        sqft: 7200,
        city: "Hyderabad",
        area: "Madhapur",
        address: "Villa 7, Cyber Valley Enclave, Madhapur, Hyderabad 500081",
        description: "A palatial villa in Madhapur's most exclusive gated community, minutes from the IT corridor. Spread over 7,200 sq ft with a private swimming pool, lush gardens, and a rooftop lounge. Features include Italian marble floors, a grand staircase, home theater, wine cellar, and fully automated smart home systems.",
        amenities: ["Private Pool", "Home Theater", "Wine Cellar", "Staff Quarters", "4-Car Garage", "Rooftop Lounge", "Security Cabin", "Landscaped Gardens"],
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
            "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        coordinates: [17.4486, 78.3908],
        yearBuilt: 2023,
        status: "For Sale",
        featured: true,
        agent: {
            name: "Vikram Krishnan",
            phone: "+91 99887 76655",
            email: "vikram@urbanestates.in",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            rating: 4.9,
            deals: 312
        }
    },
    {
        id: 5,
        title: "Modern Independent House – Kukatpally",
        price: 22000000,
        type: "Independent House",
        beds: 4,
        baths: 3,
        sqft: 2800,
        city: "Hyderabad",
        area: "Kukatpally",
        address: "H.No 8-2-120, KPHB Colony, Kukatpally, Hyderabad 500072",
        description: "A beautifully designed G+1 independent house in the heart of KPHB Colony, Kukatpally. Features a spacious living area, modular kitchen, car porch for two vehicles, and a private terrace garden. Close to metro station, schools, and hospitals. Vastu-compliant layout with excellent cross-ventilation.",
        amenities: ["Terrace Garden", "Car Porch", "Vastu Compliant", "Metro Proximity", "Bore Well", "Solar Panels", "Modular Kitchen"],
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
        ],
        coordinates: [17.4947, 78.3996],
        yearBuilt: 2021,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Anitha Devi",
            phone: "+91 90123 45678",
            email: "anitha@urbanestates.in",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
            rating: 4.6,
            deals: 98
        }
    },
    {
        id: 6,
        title: "Luxury 4BHK – Banjara Hills",
        price: 38000000,
        type: "Flat",
        beds: 4,
        baths: 4,
        sqft: 3500,
        city: "Hyderabad",
        area: "Banjara Hills",
        address: "Flat 1201, Phoenix Towers, Road No. 12, Banjara Hills, Hyderabad 500034",
        description: "An opulent 4BHK apartment in Banjara Hills' most iconic residential tower. Panoramic city views from every room, imported wooden flooring, Häfele-fitted modular kitchen, and a private study. The tower offers a sky lounge, temperature-controlled pool, and 24/7 concierge service.",
        amenities: ["Sky Lounge", "Temperature-Controlled Pool", "Concierge", "Valet Parking", "Business Center", "Spa", "Jogging Track"],
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        coordinates: [17.4156, 78.4482],
        yearBuilt: 2024,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Priya Reddy",
            phone: "+91 98765 43210",
            email: "priya@urbanestates.in",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
            rating: 4.9,
            deals: 234
        }
    },
    {
        id: 7,
        title: "Gated Community 3BHK – Manikonda",
        price: 12500000,
        type: "Gated Community",
        beds: 3,
        baths: 2,
        sqft: 1650,
        city: "Hyderabad",
        area: "Manikonda",
        address: "Block C, My Home Jewel, Manikonda, Hyderabad 500089",
        description: "A well-appointed 3BHK in one of Manikonda's most sought-after gated communities. Enjoy resort-style amenities including a massive clubhouse, Olympic-size pool, indoor badminton courts, and landscaped walking trails. The apartment features east-facing balconies, a utility room, and covered parking.",
        amenities: ["Olympic Pool", "Indoor Badminton", "Clubhouse", "Walking Trails", "24/7 Security", "Power Backup", "Utility Room", "Covered Parking"],
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
        ],
        coordinates: [17.4050, 78.3900],
        yearBuilt: 2021,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Rahul Sharma",
            phone: "+91 91234 56789",
            email: "rahul@urbanestates.in",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            rating: 4.8,
            deals: 189
        }
    },
    {
        id: 8,
        title: "Duplex Villa – Kokapet",
        price: 65000000,
        type: "Villa",
        beds: 5,
        baths: 5,
        sqft: 4200,
        city: "Hyderabad",
        area: "Kokapet",
        address: "Plot 55, Financial District Road, Kokapet, Hyderabad 500075",
        description: "A stunning duplex villa overlooking the Financial District. Contemporary architecture with floor-to-ceiling glass walls, double-height living room, private courtyard pool, and breathtaking sunset views. Features include a rooftop deck, home automation, imported kitchen fittings, and dedicated EV charging.",
        amenities: ["Courtyard Pool", "Rooftop Deck", "EV Charging", "Home Automation", "Imported Kitchen", "Sunset View", "Staff Quarters", "2-Car Garage"],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        coordinates: [17.3950, 78.3400],
        yearBuilt: 2024,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Vikram Krishnan",
            phone: "+91 99887 76655",
            email: "vikram@urbanestates.in",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            rating: 4.9,
            deals: 312
        }
    },
    {
        id: 9,
        title: "Heritage Independent House – Secunderabad",
        price: 35000000,
        type: "Independent House",
        beds: 5,
        baths: 4,
        sqft: 3800,
        city: "Secunderabad",
        area: "East Marredpally",
        address: "H.No 1-8-55, East Marredpally, Secunderabad, Hyderabad 500026",
        description: "A lovingly restored heritage bungalow in the tree-lined lanes of East Marredpally. Original teak wood doors and windows have been preserved alongside modern renovation. Features include a sprawling front lawn, rear garden, updated plumbing & electrical, and a detached guest cottage. Walking distance to Secunderabad Club.",
        amenities: ["Heritage Architecture", "Front Lawn", "Guest Cottage", "Teak Woodwork", "Rear Garden", "Updated Utilities", "Vastu Compliant", "Prime Location"],
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        coordinates: [17.4399, 78.5010],
        yearBuilt: 1965,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Sneha Rao",
            phone: "+91 87654 32109",
            email: "sneha@urbanestates.in",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
            rating: 4.7,
            deals: 156
        }
    },
    {
        id: 10,
        title: "Smart 2BHK – Miyapur",
        price: 7500000,
        type: "Flat",
        beds: 2,
        baths: 2,
        sqft: 1200,
        city: "Hyderabad",
        area: "Miyapur",
        address: "Flat 304, Vertex Homes, Miyapur, Hyderabad 500049",
        description: "A smart, affordable 2BHK in a rapidly developing locality with excellent metro connectivity. Features include a semi-furnished interior, modular kitchen, spacious balcony, and two covered parking spots. The gated complex offers a mini clubhouse, children's play area, and 24/7 CCTV surveillance.",
        amenities: ["Metro Proximity", "Semi-Furnished", "Covered Parking", "Children's Play Area", "CCTV Security", "Power Backup", "Rainwater Harvesting"],
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
            "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
        ],
        coordinates: [17.4965, 78.3541],
        yearBuilt: 2022,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Anitha Devi",
            phone: "+91 90123 45678",
            email: "anitha@urbanestates.in",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
            rating: 4.6,
            deals: 98
        }
    },
    {
        id: 11,
        title: "Farmhouse Estate – Shamshabad",
        price: 95000000,
        type: "Villa",
        beds: 6,
        baths: 6,
        sqft: 8500,
        city: "Hyderabad",
        area: "Shamshabad",
        address: "Survey No 88, Shamshabad, RR District, Hyderabad 501218",
        description: "A sprawling farmhouse estate on 2 acres near Rajiv Gandhi International Airport. Features an orchard, organic kitchen garden, private lake access, equestrian paddock, and a resort-style infinity pool. The main house boasts a colonial-inspired design with verandahs, a billiards room, and a fully equipped commercial kitchen.",
        amenities: ["2 Acres", "Infinity Pool", "Orchard", "Lake Access", "Equestrian Paddock", "Billiards Room", "Guest House", "Solar Powered"],
        images: [
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"
        ],
        coordinates: [17.2403, 78.4294],
        yearBuilt: 2022,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Vikram Krishnan",
            phone: "+91 99887 76655",
            email: "vikram@urbanestates.in",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            rating: 4.9,
            deals: 312
        }
    },
    {
        id: 12,
        title: "Studio Apartment – Hitec City",
        price: 4500000,
        type: "Flat",
        beds: 1,
        baths: 1,
        sqft: 650,
        city: "Hyderabad",
        area: "Hitech City",
        address: "Unit 1506, Cyber Towers Residency, Hitech City, Hyderabad 500081",
        description: "A compact yet stylish studio apartment ideal for IT professionals. Located steps from major tech parks, this fully furnished unit features a murphy bed, kitchenette, work desk, and a balcony with city views. Building amenities include a co-working lounge, gym, and rooftop café.",
        amenities: ["Fully Furnished", "Co-Working Lounge", "Rooftop Café", "Gym", "24/7 Security", "High-Speed Internet", "Laundry Service", "EV Charging"],
        images: [
            "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
        ],
        coordinates: [17.4474, 78.3762],
        yearBuilt: 2023,
        status: "For Sale",
        featured: false,
        agent: {
            name: "Priya Reddy",
            phone: "+91 98765 43210",
            email: "priya@urbanestates.in",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
            rating: 4.9,
            deals: 234
        }
    }
];

export const testimonials = [
    {
        id: 1,
        name: "Rajesh & Kavitha Nair",
        role: "Homebuyers",
        text: "UrbanEstates made our dream of owning a villa in Gachibowli a reality. Their team's knowledge of the Hyderabad market is truly unmatched!",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
        rating: 5
    },
    {
        id: 2,
        name: "Srinivas Reddy",
        role: "Property Investor",
        text: "As an NRI investor, I've relied on UrbanEstates for three properties in Telangana. Their transparency and data-driven approach gives me confidence from abroad.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
        rating: 5
    },
    {
        id: 3,
        name: "Divya Chandra",
        role: "First-time Buyer",
        text: "Being a first-time buyer, I was worried about RERA compliance and documentation. My agent at UrbanEstates handled everything flawlessly. My Kondapur flat is perfect!",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        rating: 5
    },
    {
        id: 4,
        name: "Arjun & Meera Prasad",
        role: "Sellers",
        text: "UrbanEstates sold our independent house in Secunderabad within 15 days — above our asking price! Their marketing and staging transformed our listing.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
        rating: 5
    }
];

export const stats = [
    { label: "Properties Sold", value: 3200, suffix: "+" },
    { label: "Happy Families", value: 2400, suffix: "+" },
    { label: "Localities Covered", value: 45, suffix: "" },
    { label: "Expert Agents", value: 85, suffix: "+" }
];

export const cities = ["All Cities", "Hyderabad", "Secunderabad"];

export const areas = [
    "All Areas", "Hitech City", "Gachibowli", "Kondapur", "Madhapur",
    "Kukatpally", "Banjara Hills", "Manikonda", "Kokapet", "Miyapur",
    "Shamshabad", "East Marredpally"
];

export const propertyTypes = ["All Types", "Flat", "Villa", "Independent House", "Gated Community"];

export default properties;
