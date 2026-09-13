import type { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "inverters",
    name: "Inverters",
    tagline: "Pure sine wave hybrid inverters",
    icon: "inverter",
  },
  {
    id: "batteries",
    name: "Lithium Batteries",
    tagline: "Long-life LiFePO4 storage",
    icon: "battery",
  },
  {
    id: "all-in-one",
    name: "All-in-One",
    tagline: "Portable power stations",
    icon: "allinone",
  },
  {
    id: "c-and-i",
    name: "Commercial & Industrial",
    tagline: "C&I scale solar systems",
    icon: "cni",
  },
  {
    id: "panels",
    name: "Solar Panels",
    tagline: "High-efficiency PV modules",
    icon: "panel",
  },
];

export const PRODUCTS: Product[] = [
  // INVERTERS
  {
    id: "inv-1.5kw-12v",
    name: "ITEL 1.5KW / 12V Hybrid Inverter",
    category: "inverters",
    price: 239800,
    unit: "unit",
    description:
      "Compact 1.5kW pure sine wave hybrid inverter for small homes and offices.",
    features: ["1.5kW rated output", "12V battery system", "Pure sine wave"],
    image: "/images/products/inv-1.5kw-12v.webp",
  },
  {
    id: "inv-3kw-24v",
    name: "ITEL 3KW / 24V Hybrid Inverter",
    category: "inverters",
    price: 328900,
    unit: "unit",
    description:
      "Reliable 3kW pure sine wave hybrid inverter for medium homes.",
    features: ["3kW rated output", "24V battery system", "Pure sine wave"],
    image: "/images/products/inv-3kw-24v.webp",
  },
  {
    id: "inv-4kw-24v",
    name: "ITEL 4KW / 24V Hybrid Inverter (WiFi Dongle)",
    category: "inverters",
    price: 416900,
    unit: "unit",
    description:
      "4kW hybrid inverter with WiFi dongle for remote monitoring.",
    features: ["4kW rated output", "24V battery system", "WiFi dongle included"],
    image: "/images/products/inv-4kw-24v.webp",
    tag: "WiFi",
  },
  {
    id: "inv-6kw-48v",
    name: "ITEL 6KW / 48V Hybrid Inverter (WiFi Dongle)",
    category: "inverters",
    price: 561000,
    unit: "unit",
    description:
      "6kW hybrid inverter with WiFi dongle, ideal for larger homes.",
    features: ["6kW rated output", "48V battery system", "WiFi dongle included"],
    image: "/images/products/inv-6kw-48v.webp",
    tag: "WiFi",
  },
  {
    id: "inv-8kw-48v-single",
    name: "ITEL 8KW / 48V Inverter (Single Phase, WiFi)",
    category: "inverters",
    price: 784300,
    unit: "unit",
    description:
      "8kW single phase hybrid inverter with WiFi dongle.",
    features: ["8kW rated output", "48V battery system", "Single phase", "WiFi dongle included"],
    image: "/images/products/inv-8kw-48v-single.webp",
    tag: "WiFi",
  },
  {
    id: "inv-12kw-48v-single",
    name: "ITEL 12KW / 48V Inverter (Single Phase, WiFi)",
    category: "inverters",
    price: 1089000,
    unit: "unit",
    description:
      "12kW single phase hybrid inverter with WiFi dongle.",
    features: ["12kW rated output", "48V battery system", "Single phase", "WiFi dongle included"],
    image: "/images/products/inv-12kw-48v-single.webp",
    tag: "WiFi",
  },
  {
    id: "inv-6.6kw-48v",
    name: "ITEL 6.6KW / 48V Hybrid Inverter (WiFi Dongle)",
    category: "inverters",
    price: 742500,
    unit: "unit",
    description:
      "6.6kW hybrid inverter with WiFi dongle.",
    features: ["6.6kW rated output", "48V battery system", "WiFi dongle included"],
    image: "/images/products/inv-6.6kw-48v.webp",
    tag: "WiFi",
  },
  {
    id: "inv-8kw-48v-3phase",
    name: "ITEL 8KW / 48V Inverter (3 Phase, WiFi)",
    category: "inverters",
    price: 2442000,
    unit: "unit",
    description:
      "8kW three phase hybrid inverter with WiFi dongle.",
    features: ["8kW rated output", "48V battery system", "Three phase", "WiFi dongle included"],
    image: "/images/products/inv-8kw-48v-3phase.webp",
    tag: "WiFi",
  },
  {
    id: "inv-12kw-48v-3phase",
    name: "ITEL 12KW / 48V Inverter (3 Phase, WiFi)",
    category: "inverters",
    price: 2574000,
    unit: "unit",
    description:
      "12kW three phase hybrid inverter with WiFi dongle.",
    features: ["12kW rated output", "48V battery system", "Three phase", "WiFi dongle included"],
    image: "/images/products/inv-12kw-48v-3phase.webp",
    tag: "WiFi",
  },

  // LITHIUM BATTERIES
  {
    id: "bat-1.28kwh-12v",
    name: "ITEL 1.28KWH / 12V Lithium Battery",
    category: "batteries",
    price: 231000,
    unit: "unit",
    description: "Compact 1.28kWh LiFePO4 battery for 12V systems.",
    features: ["1.28kWh capacity", "12V", "LiFePO4 chemistry"],
    image: "/images/products/bat-1.28kwh-12v.webp",
  },
  {
    id: "bat-2.5kwh-24v",
    name: "ITEL 2.5KWH / 24V Lithium Battery",
    category: "batteries",
    price: 601700,
    unit: "unit",
    description: "2.5kWh LiFePO4 battery for 24V systems.",
    features: ["2.5kWh capacity", "24V", "LiFePO4 chemistry"],
    image: "/images/products/bat-2.5kwh-24v.webp",
  },
  {
    id: "bat-5kwh-24v",
    name: "ITEL 5KWH / 24V Lithium Battery",
    category: "batteries",
    price: 1037300,
    unit: "unit",
    description: "5kWh LiFePO4 battery for 24V systems.",
    features: ["5kWh capacity", "24V", "LiFePO4 chemistry"],
    image: "/images/products/bat-5kwh-24v.webp",
  },
  {
    id: "bat-5kwh-48v-wall",
    name: "ITEL 5KWH / 48V Wall Mount Lithium Battery",
    category: "batteries",
    price: 1001000,
    unit: "unit",
    description: "5kWh wall mount LiFePO4 battery for 48V systems.",
    features: ["5kWh capacity", "48V", "Wall mount design", "LiFePO4 chemistry"],
    image: "/images/products/bat-5kwh-48v-wall.webp",
    tag: "Wall Mount",
  },
  {
    id: "bat-5.12kwh-48v-stack",
    name: "ITEL 5.12KWH / 48V Stackable Lithium Battery",
    category: "batteries",
    price: 995500,
    unit: "unit",
    description: "5.12kWh stackable LiFePO4 battery for 48V systems.",
    features: ["5.12kWh capacity", "48V", "Stackable design", "LiFePO4 chemistry"],
    image: "/images/products/bat-5.12kwh-48v-stack.webp",
    tag: "Stackable",
  },
  {
    id: "bat-10.2kwh-48v",
    name: "ITEL 10.2KWH / 48V Lithium Battery",
    category: "batteries",
    price: 1903000,
    unit: "unit",
    description: "10.2kWh LiFePO4 battery for 48V systems.",
    features: ["10.2kWh capacity", "48V", "LiFePO4 chemistry"],
    image: "/images/products/bat-10.2kwh-48v.webp",
  },
  {
    id: "bat-16kwh-48v",
    name: "ITEL 16KWH / 48V Lithium Battery (H)",
    category: "batteries",
    price: 2224000,
    unit: "unit",
    description: "High-capacity 16kWh LiFePO4 battery for 48V systems.",
    features: ["16kWh capacity", "48V", "LiFePO4 chemistry"],
    image: "/images/products/bat-16kwh-48v.webp",
  },
  {
    id: "bat-32kwh-48v",
    name: "ITEL 32KWH / 48V Lithium Battery",
    category: "batteries",
    price: 4653000,
    unit: "unit",
    description: "32kWh LiFePO4 battery bank for 48V systems.",
    features: ["32kWh capacity", "48V", "LiFePO4 chemistry"],
    image: "/images/products/bat-32kwh-48v.webp",
  },

  // ALL-IN-ONE
  {
    id: "aio-130w-320wh",
    name: "ITEL 130W / 320WH Portable Power Station (100000mAh)",
    category: "all-in-one",
    price: 83160,
    unit: "unit",
    description:
      "Portable all-in-one solar power station with 320Wh / 100000mAh capacity.",
    features: ["130W output", "320Wh / 100000mAh", "Portable"],
    image: "/images/products/aio-130w-320wh.webp",
  },
  {
    id: "aio-200w-100000mah",
    name: "ITEL 200W / 100000mAh Power Station (AC Output)",
    category: "all-in-one",
    price: 145000,
    unit: "unit",
    description:
      "Portable power station with AC output and 100000mAh capacity.",
    features: ["200W output", "100000mAh", "AC output"],
    image: "/images/products/aio-200w-100000mah.jpg",
  },
  {
    id: "aio-500w-1kwh",
    name: "ITEL 500W / 1KWH Portable Power Station",
    category: "all-in-one",
    price: 313500,
    unit: "unit",
    description: "500W portable power station with 1kWh storage.",
    features: ["500W output", "1kWh capacity", "Portable"],
    image: "/images/products/aio-500w-1kwh.webp",
  },

  // C&I
  {
    id: "cni-50kw-48v-3phase",
    name: "ITEL 50KW / 48V C&I Inverter (3 Phase)",
    category: "c-and-i",
    price: 7996000,
    unit: "system",
    description:
      "Commercial & industrial 50kW three phase inverter. Sold together with 6–12 units of the C&I 16kWh/48V stackable battery.",
    features: [
      "50kW output",
      "48V system",
      "Three phase",
      "Pairs with 6–12x 16kWh C&I batteries",
    ],
    image: "/images/products/cni-50kw-48v-3phase.webp",
    tag: "C&I",
  },
  {
    id: "cni-16kwh-48v-stack",
    name: "ITEL 16KWH / 48V C&I Stackable Battery",
    category: "c-and-i",
    price: 2616000,
    unit: "unit",
    description:
      "C&I 16kWh/48V stackable battery. Connect 6–12 units in series or parallel with the C&I 50kW/48V inverter.",
    features: [
      "16kWh capacity",
      "48V",
      "Stackable / series-parallel",
      "Pairs with C&I 50kW inverter",
    ],
    image: "/images/products/cni-16kwh-48v-stack.webp",
    tag: "C&I",
  },

  // PANELS
  {
    id: "panel-410w",
    name: "410W Solar Panel",
    category: "panels",
    price: 108570,
    unit: "unit",
    description: "High-efficiency 410W monocrystalline solar panel.",
    features: ["410W rated power", "Monocrystalline", "Durable frame"],
    image: "/images/products/panel-410w.webp",
  },
  {
    id: "panel-590w",
    name: "590W Solar Panel",
    category: "panels",
    price: 143550,
    unit: "unit",
    description: "High-efficiency 590W monocrystalline solar panel.",
    features: ["590W rated power", "Monocrystalline", "Durable frame"],
    image: "/images/products/panel-590w.webp",
  },
  {
    id: "panel-620w",
    name: "620W Solar Panel",
    category: "panels",
    price: 154000,
    unit: "unit",
    description: "High-efficiency 620W monocrystalline solar panel.",
    features: ["620W rated power", "Monocrystalline", "Durable frame"],
    image: "/images/products/panel-620w.jpg",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}
