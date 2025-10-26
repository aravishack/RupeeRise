// Financial Projection Calculations

/**
 * Calculate future value with monthly SIP (Systematic Investment Plan)
 * @param principal - Initial amount invested
 * @param monthly - Monthly contribution
 * @param rate - Annual growth rate (as percentage, e.g., 12 for 12%)
 * @param years - Number of years
 * @returns Future value
 */
export function calculateFutureValue(
  principal: number,
  monthly: number,
  rate: number,
  years: number
): number {
  const months = years * 12;
  const monthlyRate = rate / 12 / 100;

  if (monthlyRate === 0) {
    // If no growth rate, just sum principal and contributions
    return principal + monthly * months;
  }

  // Future value of principal (compound interest)
  const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);

  // Future value of monthly SIP (annuity)
  const fvMonthly =
    monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return fvPrincipal + fvMonthly;
}

/**
 * Calculate net worth from assets and liabilities
 */
export function calculateNetWorth(
  totalAssets: number,
  totalLiabilities: number
): number {
  return totalAssets - totalLiabilities;
}

/**
 * Calculate debt ratio (liabilities / assets)
 */
export function calculateDebtRatio(
  totalAssets: number,
  totalLiabilities: number
): number {
  if (totalAssets === 0) return 0;
  return (totalLiabilities / totalAssets) * 100;
}
