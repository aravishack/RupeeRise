// SIP and Recurring Investment Calculation Utilities

/**
 * Calculate Future Value of SIP (Systematic Investment Plan)
 * Uses Future Value of Annuity Due formula
 * 
 * NOTE: In India, SIP payments are made at the BEGINNING of each month,
 * so we use Annuity Due formula, not Ordinary Annuity.
 * 
 * @param monthlyContribution Monthly investment amount
 * @param annualRate Expected annual return rate (percentage)
 * @param months Investment duration in months
 * @returns Future value of SIP
 */
export function calculateSIPFutureValue(
  monthlyContribution: number,
  annualRate: number,
  months: number
): number {
  if (monthlyContribution <= 0 || months <= 0) return 0;
  
  const monthlyRate = annualRate / 12 / 100;
  
  // FV = PMT × [((1 + r)^n - 1) / r] × (1 + r)
  // This is the Future Value of Annuity Due formula
  // Payments at beginning of period (standard for SIP)
  const futureValue = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);
  
  return futureValue;
}

/**
 * Calculate total returns from SIP
 * 
 * @param monthlyContribution Monthly investment
 * @param annualRate Annual return rate
 * @param months Duration in months
 * @returns Object with invested amount, returns, and total value
 */
export function calculateSIPReturns(
  monthlyContribution: number,
  annualRate: number,
  months: number
): { invested: number; returns: number; total: number } {
  const totalInvested = monthlyContribution * months;
  const futureValue = calculateSIPFutureValue(monthlyContribution, annualRate, months);
  const returns = futureValue - totalInvested;
  
  return {
    invested: totalInvested,
    returns: returns,
    total: futureValue,
  };
}

/**
 * Calculate combined future value of lump sum + SIP
 * 
 * @param currentValue Current lump sum amount
 * @param monthlyContribution Monthly SIP amount
 * @param annualRate Expected annual return
 * @param years Investment duration in years
 * @param sipYears How many years SIP will continue (can be less than total years)
 * @returns Future value
 */
export function calculateCombinedFutureValue(
  currentValue: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  sipYears?: number
): number {
  // Component 1: Lump sum growth
  const lumpSumFV = currentValue * Math.pow(1 + annualRate / 100, years);
  
  // Component 2: SIP accumulation
  const sipDuration = sipYears !== undefined ? Math.min(sipYears, years) : years;
  const sipMonths = sipDuration * 12;
  const sipFV = calculateSIPFutureValue(monthlyContribution, annualRate, sipMonths);
  
  // If SIP ends before projection period, grow the accumulated SIP amount
  let finalSipFV = sipFV;
  if (sipDuration < years) {
    const remainingYears = years - sipDuration;
    finalSipFV = sipFV * Math.pow(1 + annualRate / 100, remainingYears);
  }
  
  return lumpSumFV + finalSipFV;
}

/**
 * Calculate how much monthly SIP needed to reach a goal
 * 
 * @param currentValue Starting amount
 * @param targetAmount Goal amount
 * @param annualRate Expected return
 * @param years Time horizon
 * @returns Required monthly SIP amount
 */
export function calculateRequiredSIP(
  currentValue: number,
  targetAmount: number,
  annualRate: number,
  years: number
): number {
  // How much will current value grow to?
  const lumpSumFV = currentValue * Math.pow(1 + annualRate / 100, years);
  
  // How much gap needs to be filled by SIP?
  const gap = targetAmount - lumpSumFV;
  
  if (gap <= 0) return 0; // Already have enough
  
  // Solve for PMT: gap = PMT × [((1 + r)^n - 1) / r]
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  const requiredSIP = gap / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
  
  return requiredSIP;
}

/**
 * Format SIP duration as human-readable string
 * @param years Number of years
 * @returns Formatted string like "10 years" or "Ongoing"
 */
export function formatSIPDuration(years?: number): string {
  if (!years || years === 0) return 'Ongoing';
  if (years === 1) return '1 year';
  return `${years} years`;
}
