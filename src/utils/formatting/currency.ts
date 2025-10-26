// Currency Formatting Utilities for Indian Rupee

/**
 * Formats a number as Indian currency with proper formatting
 * @example formatIndianCurrency(123456.78) // "₹1,23,456.78"
 */
export function formatIndianCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats large numbers in Lakhs/Crores
 * @example formatCompact(10000000) // "₹1Cr"
 */
export function formatCompact(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) {
    // 1 Crore = 10,000,000
    return `${sign}₹${(absValue / 10000000).toFixed(2)}Cr`;
  }
  if (absValue >= 100000) {
    // 1 Lakh = 100,000
    return `${sign}₹${(absValue / 100000).toFixed(2)}L`;
  }
  if (absValue >= 1000) {
    // 1 Thousand = 1,000
    return `${sign}₹${(absValue / 1000).toFixed(2)}K`;
  }
  return formatIndianCurrency(value);
}

/**
 * Formats percentage with sign
 * @example formatPercentage(12.5) // "+12.5%"
 */
export function formatPercentage(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatAmountInWords(amount: number): string {
  if (amount === 0) return '₹ Zero Only';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.floor(amount));
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const convertTwoDigits = (num: number): string => {
    if (num === 0) return '';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
  };
  
  const convertThreeDigits = (num: number): string => {
    if (num === 0) return '';
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    let result = '';
    
    if (hundred > 0) {
      result = ones[hundred] + ' Hundred';
    }
    
    if (remainder > 0) {
      result += (result ? ' ' : '') + convertTwoDigits(remainder);
    }
    
    return result;
  };
  
  const crores = Math.floor(absAmount / 10000000);
  const lakhs = Math.floor((absAmount % 10000000) / 100000);
  const thousands = Math.floor((absAmount % 100000) / 1000);
  const hundreds = absAmount % 1000;
  
  let words = '';
  
  if (crores > 0) {
    words += convertThreeDigits(crores) + ' Crore ';
  }
  
  if (lakhs > 0) {
    words += convertTwoDigits(lakhs) + ' Lakh ';
  }
  
  if (thousands > 0) {
    words += convertTwoDigits(thousands) + ' Thousand ';
  }
  
  if (hundreds > 0) {
    words += convertThreeDigits(hundreds);
  }
  
  words = words.trim();
  
  return (isNegative ? 'Minus ' : '') + '₹ ' + words + ' Only';
}
