export type DocumentStatus = 'pending' | 'analyzing' | 'analyzed' | 'failed';

export type Verdict = 'Safe' | 'Medium Risk' | 'Unsafe';

export interface Document {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  status: DocumentStatus;
  uploaded_at: string;
  analyzed_at?: string;
}

export interface AnalysisResult {
  id: string;
  document_id: string;
  verdict: Verdict;
  score: number;
  summary: string[];
  recommendation: string;
  created_at: string;
}

export interface AnalysisResponse {
  verdict: Verdict;
  score: number;
  summary: string[];
  recommendation: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'trial';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type BillingCycle = 'monthly' | 'annual';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

export interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  documents_limit: number | null;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  billing_cycle: BillingCycle;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id?: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  payment_method?: string;
  payment_status: PaymentStatus;
  transaction_id?: string;
  failure_reason?: string;
  created_at: string;
  completed_at?: string;
}
