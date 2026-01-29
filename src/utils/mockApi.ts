import type { AnalysisResponse, Verdict } from '../types';

const mockAnalysisData: Record<string, AnalysisResponse> = {
  loan: {
    verdict: 'Medium Risk',
    score: 62,
    summary: [
      'Interest rate is variable and can increase',
      'High penalty charges on late payments (5% per month)',
      'Bank can change terms without prior notice',
      'Processing fee is non-refundable',
      'Loan tenure can be modified by lender',
      'Collateral required for amounts above ₹5 lakhs',
      'Prepayment charges apply (2% of outstanding amount)',
      'Auto-debit mandate is compulsory',
    ],
    recommendation: 'Clarify the variable interest rate terms and prepayment charges before signing. Consider negotiating the penalty clause.',
  },
  rental: {
    verdict: 'Safe',
    score: 85,
    summary: [
      'Rent amount is clearly specified (₹15,000 per month)',
      'Security deposit is refundable (₹30,000)',
      'Lock-in period is reasonable (11 months)',
      'Maintenance charges are included in rent',
      'Notice period is standard (1 month)',
      'Property condition is documented',
      'Landlord contact details provided',
      'Termination clause is fair to both parties',
    ],
    recommendation: 'This rental agreement appears fair and balanced. Ensure you complete the property inspection before moving in.',
  },
  job: {
    verdict: 'Unsafe',
    score: 35,
    summary: [
      'Notice period is excessive (6 months)',
      'No fixed working hours mentioned',
      'Bond amount required (₹2 lakhs for training)',
      'Salary breakup not clearly defined',
      'No work-from-home policy specified',
      'Probation period can be extended indefinitely',
      'Leaves encashment terms unclear',
      'Non-compete clause covers entire India for 2 years',
    ],
    recommendation: 'Several concerning clauses found. Strongly recommend legal review before signing, especially the bond and non-compete terms.',
  },
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeDocument = async (fileName: string): Promise<AnalysisResponse> => {
  await delay(3000);

  const lowerName = fileName.toLowerCase();

  if (lowerName.includes('loan') || lowerName.includes('credit')) {
    return mockAnalysisData.loan;
  } else if (lowerName.includes('rent') || lowerName.includes('lease')) {
    return mockAnalysisData.rental;
  } else if (lowerName.includes('job') || lowerName.includes('offer') || lowerName.includes('employment')) {
    return mockAnalysisData.job;
  }

  const randomType = Math.random();
  if (randomType < 0.33) {
    return mockAnalysisData.loan;
  } else if (randomType < 0.66) {
    return mockAnalysisData.rental;
  } else {
    return mockAnalysisData.job;
  }
};

export const getVerdictColor = (verdict: Verdict): string => {
  switch (verdict) {
    case 'Safe':
      return 'text-green-700';
    case 'Medium Risk':
      return 'text-yellow-700';
    case 'Unsafe':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
};

export const getVerdictBgColor = (verdict: Verdict): string => {
  switch (verdict) {
    case 'Safe':
      return 'bg-green-100';
    case 'Medium Risk':
      return 'bg-yellow-100';
    case 'Unsafe':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};

export const getVerdictBorderColor = (verdict: Verdict): string => {
  switch (verdict) {
    case 'Safe':
      return 'border-green-300';
    case 'Medium Risk':
      return 'border-yellow-300';
    case 'Unsafe':
      return 'border-red-300';
    default:
      return 'border-gray-300';
  }
};
