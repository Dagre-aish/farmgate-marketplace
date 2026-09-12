import { MandiPriceRecord } from '../types';

const DEFAULT_API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

export const fetchLiveMandiPrices = async (): Promise<MandiPriceRecord[]> => {
  const apiKey = (import.meta.env.VITE_DATA_GOV_API_KEY as string) || DEFAULT_API_KEY;
  const directUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${apiKey}&format=json&limit=100`;

  let responseData: any = null;

  // 1. Try Direct Fetch
  try {
    const res = await fetch(directUrl);
    if (res.ok) {
      responseData = await res.json();
    }
  } catch (err) {
    console.warn('Direct data.gov.in API fetch failed (likely CORS), attempting proxy...', err);
  }

  // 2. Fallback to AllOrigins CORS Proxy if direct fetch failed
  if (!responseData || !responseData.records) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`;
      const res = await fetch(proxyUrl);
      if (res.ok) {
        responseData = await res.json();
      }
    } catch (err) {
      console.warn('CORS Proxy fetch failed as well:', err);
    }
  }

  if (!responseData || !Array.isArray(responseData.records) || responseData.records.length === 0) {
    console.warn('No mandi records returned from API.');
    return [];
  }

  return responseData.records.map((record: any, index: number) => {
    const distanceKm = Math.floor(Math.random() * 190) + 10;
    const cName = (record.commodity || '').toLowerCase();
    
    let commodityId = 'other';
    if (cName.includes('wheat')) commodityId = 'wheat';
    else if (cName.includes('soyabean') || cName.includes('soybean')) commodityId = 'soyabean';
    else if (cName.includes('chana') || cName.includes('gram')) commodityId = 'chana';
    else if (cName.includes('mustard')) commodityId = 'mustard';
    else if (cName.includes('cotton')) commodityId = 'cotton';
    else if (cName.includes('paddy') || cName.includes('rice')) commodityId = 'rice';
    else if (cName.includes('maize') || cName.includes('corn')) commodityId = 'maize';
    else if (cName.includes('onion')) commodityId = 'onion';
    else if (cName.includes('potato')) commodityId = 'potato';

    const modal = Number(record.modal_price) || Number(record.max_price) || 2500;
    const min = Number(record.min_price) || Math.round(modal * 0.95);
    const max = Number(record.max_price) || Math.round(modal * 1.05);

    return {
      id: `gov_mandi_${index}_${Date.now()}`,
      commodityId,
      commodityName: record.commodity || 'Agri Commodity',
      mandiName: record.market || 'Regional APMC Mandi',
      district: record.district || 'District Market',
      state: record.state || 'India',
      distanceKm,
      modalPrice: modal,
      minPrice: min,
      maxPrice: max,
      dailyChangePct: parseFloat(((Math.random() * 5) - 2.5).toFixed(1)),
      isLive: true,
      lastUpdated: record.arrival_date || 'Today'
    };
  });
};
