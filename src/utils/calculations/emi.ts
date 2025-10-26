// EMI and Loan Calculation Utilities

/**
 * Calculate remaining months to pay off a loan
 * @param principal Outstanding loan amount
 * @param annualRate Annual interest rate (percentage)
 * @param monthlyEMI Monthly payment amount
 * @returns Number of months to payoff
 */
export function calculateRemainingMonths(
  principal: number,
  annualRate: number,
  monthlyEMI: number
): number {
  if (principal <= 0) return 0;
  if (monthlyEMI <= 0) return Infinity;
  
  // Convert annual rate to monthly rate
  const monthlyRate = annualRate / 12 / 100;
  
  // Handle edge case: EMI too low to cover interest
  const monthlyInterest = principal * monthlyRate;
  if (monthlyEMI <= monthlyInterest) {
    return Infinity; // Loan will never be paid off!
  }
  
  // Calculate number of months using loan amortization formula
  const numerator = Math.log(monthlyEMI / (monthlyEMI - principal * monthlyRate));
  const denominator = Math.log(1 + monthlyRate);
  
  return numerator / denominator;
}

/**
 * Calculate monthly EMI for a loan
 * @param principal Loan amount
 * @param annualRate Annual interest rate (percentage)
 * @param months Loan tenure in months
 * @returns Monthly EMI amount
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  
  const monthlyRate = annualRate / 12 / 100;
  
  // EMI formula: [P × r × (1 + r)^n] / [(1 + r)^n - 1]
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  
  return emi;
}

/**
 * Calculate the date when loan will be paid off
 * @param months Number of months remaining
 * @returns Payoff date
 */
export function calculatePayoffDate(months: number): Date {
  const today = new Date();
  const payoffDate = new Date(today);
  payoffDate.setMonth(payoffDate.getMonth() + Math.ceil(months));
  return payoffDate;
}

/**
 * Calculate total interest paid over loan tenure
 * @param principal Loan amount
 * @param monthlyEMI Monthly payment
 * @param months Number of months
 * @returns Total interest paid
 */
export function calculateTotalInterest(
  principal: number,
  monthlyEMI: number,
  months: number
): number {
  const totalPaid = monthlyEMI * months;
  return totalPaid - principal;
}

/**
 * Format payoff timeline as human-readable string
 * @param months Number of months
 * @returns Formatted string like "~2 years 3 months"
 */
export function formatPayoffTimeline(months: number): string {
  if (!isFinite(months) || months <= 0) return 'Unable to calculate';
  
  // Round to nearest month for cleaner display
  const totalMonths = Math.ceil(months);
  let years = Math.floor(totalMonths / 12);
  let remainingMonths = totalMonths % 12;
  
  // Normalize: if remainingMonths is 12, convert to years
  if (remainingMonths === 12) {
    years += 1;
    remainingMonths = 0;
  }
  
  // Build the string
  let result = '~'; // Approximately symbol
  
  if (years === 0) {
    result += `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    result += `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    result += `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  
  return result;
}

/**
 * Format date in Indian format
 * @param date Date to format
 * @returns Formatted string like "January 2044"
 */
export function formatPayoffDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { 
    month: 'long', 
    year: 'numeric' 
  });
}
