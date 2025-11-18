export interface BusinessPartnerInterview {
  id: string;
  partnerName: string;
  role: string;
  keyObjectives: string;
  painPoints: string;
  successFactors: string;
}

export interface Capability {
  id: string;
  name: string;
  currentMaturity: number; // 1-5
  targetMaturity: number; // 1-5
  importance: 'Low' | 'Medium' | 'High';
}

export interface Initiative {
  id: string;
  name: string;
  description: string;
  strategicValue: number; // 1-10
  costEffort: number; // 1-10
  status: 'Proposed' | 'Approved' | 'In Progress';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

export interface Metric {
  id: string;
  goalId: string; // Links to a business objective/goal
  name: string;
  target: string;
  baseline: string;
}

export interface StrategicPlan {
  companyName: string;
  interviews: BusinessPartnerInterview[];
  capabilities: Capability[];
  initiatives: Initiative[];
  metrics: Metric[];
  risks: string[];
}

export const DEFAULT_CAPABILITIES: Capability[] = [
  { id: '1', name: 'Strategic Planning', currentMaturity: 2, targetMaturity: 4, importance: 'High' },
  { id: '2', name: 'Data & Analytics', currentMaturity: 3, targetMaturity: 5, importance: 'High' },
  { id: '3', name: 'Infrastructure & Ops', currentMaturity: 4, targetMaturity: 4, importance: 'Medium' },
  { id: '4', name: 'Cybersecurity', currentMaturity: 3, targetMaturity: 5, importance: 'High' },
  { id: '5', name: 'Talent Management', currentMaturity: 2, targetMaturity: 3, importance: 'Medium' },
];
