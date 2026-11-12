import { describe, expect, it } from 'vitest';
import { errorCosts, roi } from '../src/utils/calculations';
describe('first-year ROI and simple payback', () => {
  it.each([[68250, 36.5], [105000, 110], [147000, 194]])('reproduces the documented scenario %i', (gains, rate) => { expect(roi(50000, gains).rate).toBeCloseTo(rate); });
  it('subtracts recurring costs and the initial investment once', () => { expect(roi(50000, 105000, 15000)).toEqual({ net: 40000, rate: 80, paybackMonths: 50000 / 90000 * 12 }); });
  it('shows negative ROI and no payback when annual net inflow is nonpositive', () => { const result = roi(50000, 5000, 10000); expect(result).toMatchObject({ net: -55000, paybackMonths: null }); expect(result.rate).toBeCloseTo(-110); });
  it('allows no gains without dividing by zero', () => { expect(roi(50000, 0)).toEqual({ net: -50000, rate: -100, paybackMonths: null }); });
  it.each([[0, 1, 0], [-5, 1, 0], [10, -1, 0], [10, 1, -1], [NaN, 1, 0], [10, Infinity, 0]])('rejects invalid assumptions %j', (a, b, c) => { expect(() => roi(a, b, c)).toThrow(RangeError); });
});
describe('documented DataCo errors with hypothetical costs', () => {
  it('prices both types of errors using the published counts', () => { expect(errorCosts(10, 50)).toEqual({ baseline: 119970, forest: 82490 }); });
  it('makes the baseline cheaper if false alerts are expensive', () => { const costs = errorCosts(100, 1); expect(costs.baseline).toBeLessThan(costs.forest); });
  it('keeps zero-cost scenarios finite and equal', () => { expect(errorCosts(0, 0)).toEqual({ baseline: 0, forest: 0 }); });
  it.each([[-1, 1], [1, -1], [Infinity, 1]])('rejects invalid unit costs %j', (a, b) => { expect(() => errorCosts(a, b)).toThrow(RangeError); });
});
