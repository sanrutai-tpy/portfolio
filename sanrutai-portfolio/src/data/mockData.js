// ─────────────────────────────────────────────────────────────
// mockData.js — Portfolio-safe fictional data for demo purposes
// ─────────────────────────────────────────────────────────────

export const contractors = [
  { id: 1, name: "Somchai Trading Co., Ltd.",  contact: "somchai@stc.co.th",  phone: "02-111-2222" },
  { id: 2, name: "Priya Logistics Group",      contact: "priya@plg.co.th",    phone: "02-333-4444" },
  { id: 3, name: "NorthStar Engineering",      contact: "info@northstar.co.th",phone: "02-555-6666" },
  { id: 4, name: "Pacific Facilities Corp.",   contact: "ops@pacific.co.th",  phone: "02-777-8888" },
  { id: 5, name: "Green Valley Services",      contact: "hello@gvs.co.th",    phone: "02-999-0000" },
];

export const serviceTypes = [
  "Transport Service",
  "Facility Maintenance",
  "Security Service",
  "Cleaning Service",
  "IT Support",
  "Catering Service",
  "Engineering Service",
];

export const pricingMethods = ["Fixed Rate", "Per Hour", "Per Unit", "Monthly Retainer"];

export const services = [
  { id: 1,  name: "Daily Shuttle Transport",      contractor: "Somchai Trading Co., Ltd.",  category: "Transport Service",     startDate: "2025-01-14", endDate: "2025-06-30", price: 45000,  status: "Active",   pricingMethod: "Monthly Retainer" },
  { id: 2,  name: "HVAC System Maintenance",      contractor: "NorthStar Engineering",      category: "Facility Maintenance",  startDate: "2025-02-01", endDate: "2025-07-31", price: 28000,  status: "Active",   pricingMethod: "Fixed Rate" },
  { id: 3,  name: "24/7 Security Patrol",         contractor: "Pacific Facilities Corp.",   category: "Security Service",      startDate: "2025-01-01", endDate: "2025-12-31", price: 62000,  status: "Active",   pricingMethod: "Monthly Retainer" },
  { id: 4,  name: "Office Deep Cleaning",         contractor: "Green Valley Services",      category: "Cleaning Service",      startDate: "2025-03-01", endDate: "2025-05-31", price: 8500,   status: "Expired",  pricingMethod: "Per Unit" },
  { id: 5,  name: "Helpdesk IT Support",          contractor: "NorthStar Engineering",      category: "IT Support",            startDate: "2025-01-15", endDate: "2025-12-15", price: 35000,  status: "Active",   pricingMethod: "Monthly Retainer" },
  { id: 6,  name: "Executive Catering",           contractor: "Green Valley Services",      category: "Catering Service",      startDate: "2025-02-15", endDate: "2025-04-15", price: 12000,  status: "Expired",  pricingMethod: "Per Unit" },
  { id: 7,  name: "Cargo Freight Logistics",      contractor: "Priya Logistics Group",      category: "Transport Service",     startDate: "2025-04-01", endDate: "2025-09-30", price: 53000,  status: "Active",   pricingMethod: "Per Hour" },
  { id: 8,  name: "Electrical Inspection",        contractor: "NorthStar Engineering",      category: "Engineering Service",   startDate: "2025-05-01", endDate: "2025-05-31", price: 9200,   status: "Pending",  pricingMethod: "Fixed Rate" },
  { id: 9,  name: "Lobby & Common Area Clean",    contractor: "Green Valley Services",      category: "Cleaning Service",      startDate: "2025-03-15", endDate: "2025-09-15", price: 14500,  status: "Active",   pricingMethod: "Monthly Retainer" },
  { id: 10, name: "Server Room Cooling Service",  contractor: "Pacific Facilities Corp.",   category: "Facility Maintenance",  startDate: "2025-01-20", endDate: "2025-07-20", price: 22000,  status: "Active",   pricingMethod: "Fixed Rate" },
  { id: 11, name: "Staff Bus Route B",            contractor: "Somchai Trading Co., Ltd.",  category: "Transport Service",     startDate: "2025-02-01", endDate: "2025-08-01", price: 38000,  status: "Active",   pricingMethod: "Monthly Retainer" },
  { id: 12, name: "CCTV & Access Control",        contractor: "Pacific Facilities Corp.",   category: "Security Service",      startDate: "2025-03-01", endDate: "2025-08-31", price: 18000,  status: "Pending",  pricingMethod: "Fixed Rate" },
  { id: 13, name: "Network Infrastructure",       contractor: "NorthStar Engineering",      category: "IT Support",            startDate: "2024-12-01", endDate: "2025-03-01", price: 41000,  status: "Expired",  pricingMethod: "Fixed Rate" },
  { id: 14, name: "Warehouse Shuttle Run",        contractor: "Priya Logistics Group",      category: "Transport Service",     startDate: "2025-05-01", endDate: "2025-10-31", price: 27000,  status: "Active",   pricingMethod: "Per Hour" },
  { id: 15, name: "Cafeteria Daily Meal",         contractor: "Green Valley Services",      category: "Catering Service",      startDate: "2025-01-01", endDate: "2025-12-31", price: 95000,  status: "Active",   pricingMethod: "Monthly Retainer" },
];

// Monthly activity chart data
export const monthlyActivity = [
  { month: "Jan", services: 8,  revenue: 210000 },
  { month: "Feb", services: 11, revenue: 275000 },
  { month: "Mar", services: 9,  revenue: 248000 },
  { month: "Apr", services: 14, revenue: 320000 },
  { month: "May", services: 12, revenue: 295000 },
  { month: "Jun", services: 7,  revenue: 190000 },
];

// Contract status breakdown
export const contractStatus = [
  { label: "Active",  value: 10, color: "#22c55e" },
  { label: "Expired", value: 3,  color: "#f97316" },
  { label: "Pending", value: 2,  color: "#3b82f6" },
];
