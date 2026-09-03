import { Commodity } from '../types';

export const COMMODITIES: Commodity[] = [
  {
    id: 'wheat',
    name: 'Wheat (Sharbati / Lokwan)',
    hindiName: 'गेहूं (शरबती / लोकवन)',
    category: 'Cereals',
    standardUnit: 'Quintal',
    msp: 2275, // Govt MSP 2024-25 in INR/Quintal
    perishabilityDays: 365,
    ambientWeightLossPerMonthPct: 0.5,
    warehouseCostPerMonth: 12,
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'High-protein grain staple. Durable storage in dry state. High institutional demand from flour mills & biscuits/bakery processors.'
  },
  {
    id: 'onion',
    name: 'Onion (Red / Nasik)',
    hindiName: 'प्याज (लाल / नासिक)',
    category: 'Vegetables',
    standardUnit: 'Quintal',
    msp: 1800, // Benchmark
    perishabilityDays: 45,
    ambientWeightLossPerMonthPct: 4.5,
    warehouseCostPerMonth: 25,
    coldStorageCostPerMonth: 45,
    icon: '🧅',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80',
    description: 'High price volatility. Prone to sprouting and moisture rot if stored in unventilated ambient sheds.'
  },
  {
    id: 'tomato',
    name: 'Tomato (Hybrid / Desi)',
    hindiName: 'टमाटर (हाइब्रिड / देसी)',
    category: 'Vegetables',
    standardUnit: 'Quintal',
    msp: 1400, // Benchmark
    perishabilityDays: 10,
    ambientWeightLossPerMonthPct: 18.0,
    warehouseCostPerMonth: 40,
    coldStorageCostPerMonth: 60,
    icon: '🍅',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Highly perishable fruit-vegetable. Sensitive to monsoon arrivals and transport delays. Rapid sell recommended during peak arrivals.'
  },
  {
    id: 'soybean',
    name: 'Soybean (Yellow)',
    hindiName: 'सोयाबीन (पीला)',
    category: 'Oilseeds',
    standardUnit: 'Quintal',
    msp: 4892, // Govt MSP 2024-25
    perishabilityDays: 300,
    ambientWeightLossPerMonthPct: 0.8,
    warehouseCostPerMonth: 15,
    icon: '🫘',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    description: 'Key oilseed with robust industrial crushing demand. Can be held for price peaks with minimal storage degradation.'
  },
  {
    id: 'paddy_basmati',
    name: 'Basmati Paddy (1121 / Pusa)',
    hindiName: 'बासमती धान (1121 / पूसा)',
    category: 'Cereals',
    standardUnit: 'Quintal',
    msp: 3600, // Benchmark premium
    perishabilityDays: 450,
    ambientWeightLossPerMonthPct: 0.4,
    warehouseCostPerMonth: 14,
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Premium aromatic export paddy. Actually improves with aged warehouse storage. High institutional buyer demand.'
  },
  {
    id: 'cotton',
    name: 'Cotton (Medium / Long Staple)',
    hindiName: 'कपास (मध्यम / लंबा रेशा)',
    category: 'Cash Crops',
    standardUnit: 'Quintal',
    msp: 7121, // Govt MSP 2024-25
    perishabilityDays: 365,
    ambientWeightLossPerMonthPct: 0.3,
    warehouseCostPerMonth: 18,
    icon: '☁️',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80',
    description: 'Textile raw material. Stable in dry ginning yards. Heavy procurement by spinning mills and CCI.'
  },
  {
    id: 'mustard',
    name: 'Mustard / Rapeseed',
    hindiName: 'सरसों / राई',
    category: 'Oilseeds',
    standardUnit: 'Quintal',
    msp: 5650, // Govt MSP 2024-25
    perishabilityDays: 365,
    ambientWeightLossPerMonthPct: 0.6,
    warehouseCostPerMonth: 14,
    icon: '🌻',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'High oil-content seed. Prices surge post-harvest during festive and winter mustard oil demand cycles.'
  },
  {
    id: 'tur_dal',
    name: 'Tur / Arhar Dal (Pigeon Pea)',
    hindiName: 'तुवर / अरहर दाल',
    category: 'Pulses',
    standardUnit: 'Quintal',
    msp: 7550, // Govt MSP 2024-25
    perishabilityDays: 400,
    ambientWeightLossPerMonthPct: 0.5,
    warehouseCostPerMonth: 15,
    icon: '🥣',
    image: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=600&q=80',
    description: 'Critical protein pulse with national buffer stock procurement. Excellent candidate for warehouse receipt collateral.'
  },
  {
    id: 'potato',
    name: 'Potato (Jyoti / Pukhraj)',
    hindiName: 'आलू (ज्योति / पुखराज)',
    category: 'Vegetables',
    standardUnit: 'Quintal',
    msp: 1250, // Benchmark
    perishabilityDays: 60,
    ambientWeightLossPerMonthPct: 3.5,
    warehouseCostPerMonth: 20,
    coldStorageCostPerMonth: 38,
    icon: '🥔',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    description: 'High bulk tuber. Needs cold storage beyond 45 days. Heavy demand from chip manufacturers (PepsiCo, Balaji).'
  },
  {
    id: 'chilli_red',
    name: 'Red Chilli (Guntur Teja / Byadgi)',
    hindiName: 'लाल मिर्च (गुंटूर / ब्याडगी)',
    category: 'Spices',
    standardUnit: 'Quintal',
    msp: 16500, // Benchmark
    perishabilityDays: 240,
    ambientWeightLossPerMonthPct: 1.2,
    warehouseCostPerMonth: 35,
    coldStorageCostPerMonth: 75,
    icon: '🌶️',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    description: 'High-value spice. Color retention requires cold storage. Strong export and masala brand demand.'
  },
  {
    id: 'maize',
    name: 'Maize / Corn (Feed Grade & Food Grade)',
    hindiName: 'मक्का (पोल्ट्री व फूड ग्रेड)',
    category: 'Cereals',
    standardUnit: 'Quintal',
    msp: 2090, // Govt MSP 2024-25
    perishabilityDays: 300,
    ambientWeightLossPerMonthPct: 0.7,
    warehouseCostPerMonth: 12,
    icon: '🌽',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description: 'Major raw material for poultry feed and starch/ethanol manufacturing. Steady year-round industrial off-take.'
  },
  {
    id: 'chana',
    name: 'Chana / Gram (Desi / Kabuli)',
    hindiName: 'चना (देसी / काबुली)',
    category: 'Pulses',
    standardUnit: 'Quintal',
    msp: 5440, // Govt MSP 2024-25
    perishabilityDays: 365,
    ambientWeightLossPerMonthPct: 0.5,
    warehouseCostPerMonth: 14,
    icon: '🍲',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    description: 'High volume pulse. High liquidity in mandis and government NAFED price stabilization tenders.'
  }
];
