export function roi(investment: number, gains: number, annualCosts = 0) {
  if (![investment, gains, annualCosts].every(Number.isFinite) || investment <= 0 || gains < 0 || annualCosts < 0) throw new RangeError('Invalid financial assumptions');
  const annualNet = gains - annualCosts;
  return { net: annualNet - investment, rate: ((annualNet - investment) / investment) * 100, paybackMonths: annualNet > 0 ? (investment / annualNet) * 12 : null };
}
export const errors = { baseline: { fp: 787, fn: 2242 }, forest: { fp: 2184, fn: 1213 } };
export function errorCosts(fpCost: number, fnCost: number) {
  if (![fpCost, fnCost].every(Number.isFinite) || fpCost < 0 || fnCost < 0) throw new RangeError('Invalid costs');
  return { baseline: errors.baseline.fp * fpCost + errors.baseline.fn * fnCost, forest: errors.forest.fp * fpCost + errors.forest.fn * fnCost };
}
