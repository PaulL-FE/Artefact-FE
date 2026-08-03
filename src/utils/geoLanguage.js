const GEO_ENDPOINT = 'https://get.geojs.io/v1/ip/country.json';
const ROMANIA_COUNTRY_CODE = 'RO';
const REQUEST_TIMEOUT_MS = 3000;

// Detects the visitor's country from their IP and maps it to a supported
// language. Returns null (instead of throwing) on any failure — network
// error, timeout, or a blocked request — so callers can fall back silently.
export const detectLanguageByCountry = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GEO_ENDPOINT, { signal: controller.signal });
    if (!response.ok) return null;

    const data = await response.json();
    return data?.country === ROMANIA_COUNTRY_CODE ? 'ro' : 'en';
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};
