export type QuoteRef = {
  brandId: string;
  vehicleId: string;
  year: number;
  areaCode: string;
};

export function encodeQuote(ref: QuoteRef): string {
  const raw = `${ref.brandId}|${ref.vehicleId}|${ref.year}|${ref.areaCode}`;
  return Buffer.from(raw, 'utf8').toString('base64url');
}

export function decodeQuote(token: string): QuoteRef | null {
  try {
    const [brandId, vehicleId, year, areaCode] = Buffer.from(token, 'base64url')
      .toString('utf8')
      .split('|');
    const parsedYear = Number(year);
    if (!brandId || !vehicleId || !areaCode || !Number.isInteger(parsedYear)) return null;
    return { brandId, vehicleId, year: parsedYear, areaCode };
  } catch {
    return null;
  }
}
