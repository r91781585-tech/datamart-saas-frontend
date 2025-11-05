// Mock datasets with sample data
const datasets = [
    {
        id: 1,
        name: "Startup Funding Dataset",
        description: "Comprehensive data on startup funding rounds across India",
        category: "Business",
        totalRows: 5000,
        pricePerRow: 0.05,
        columns: ["Company Name", "Industry", "Funding Amount", "Investors", "Year", "City", "Stage"],
        filters: {
            industry: ["Technology", "E-commerce", "FinTech", "HealthTech", "EdTech", "FoodTech"],
            year: ["2020", "2021", "2022", "2023", "2024"],
            city: ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"],
            stage: ["Seed", "Series A", "Series B", "Series C", "Series D"],
            minFunding: 0,
            maxFunding: 100000000
        },
        data: generateStartupData()
    },
    {
        id: 2,
        name: "Real Estate Listings",
        description: "Property listings with prices, locations, and amenities",
        category: "Real Estate",
        totalRows: 8000,
        pricePerRow: 0.05,
        columns: ["Property ID", "Type", "Price", "Location", "Bedrooms", "Area (sqft)", "Year Built"],
        filters: {
            type: ["Apartment", "Villa", "House", "Plot", "Commercial"],
            location: ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"],
            bedrooms: ["1", "2", "3", "4", "5+"],
            minPrice: 0,
            maxPrice: 50000000,
            minArea: 0,
            maxArea: 10000
        },
        data: generateRealEstateData()
    }
];

// Generate mock startup data
function generateStartupData() {
    const companies = ["TechStart", "InnovateCo", "FutureApp", "SmartSolutions", "DataDrive", "CloudNine", "AIVentures", "BlockChain Inc", "FinanceHub", "HealthPlus"];
    const industries = ["Technology", "E-commerce", "FinTech", "HealthTech", "EdTech", "FoodTech"];
    const cities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"];
    const stages = ["Seed", "Series A", "Series B", "Series C", "Series D"];
    const investors = ["Sequoia Capital", "Accel Partners", "Tiger Global", "SoftBank", "Matrix Partners"];
    
    const data = [];
    for (let i = 0; i < 500; i++) {
        data.push({
            "Company Name": companies[Math.floor(Math.random() * companies.length)] + " " + (i + 1),
            "Industry": industries[Math.floor(Math.random() * industries.length)],
            "Funding Amount": Math.floor(Math.random() * 50000000) + 500000,
            "Investors": investors[Math.floor(Math.random() * investors.length)],
            "Year": (2020 + Math.floor(Math.random() * 5)).toString(),
            "City": cities[Math.floor(Math.random() * cities.length)],
            "Stage": stages[Math.floor(Math.random() * stages.length)]
        });
    }
    return data;
}

// Generate mock real estate data
function generateRealEstateData() {
    const types = ["Apartment", "Villa", "House", "Plot", "Commercial"];
    const locations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"];
    
    const data = [];
    for (let i = 0; i < 500; i++) {
        const bedrooms = Math.floor(Math.random() * 5) + 1;
        data.push({
            "Property ID": "PROP" + (10000 + i),
            "Type": types[Math.floor(Math.random() * types.length)],
            "Price": Math.floor(Math.random() * 40000000) + 2000000,
            "Location": locations[Math.floor(Math.random() * locations.length)],
            "Bedrooms": bedrooms > 5 ? "5+" : bedrooms.toString(),
            "Area (sqft)": Math.floor(Math.random() * 5000) + 500,
            "Year Built": (2000 + Math.floor(Math.random() * 24)).toString()
        });
    }
    return data;
}