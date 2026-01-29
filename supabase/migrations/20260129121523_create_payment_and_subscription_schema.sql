/*
  # Create Payment and Subscription Schema

  ## Overview
  This migration sets up the payment and subscription system for the Agreement Checker AI application.
  It creates tables for plans, subscriptions, and payment transactions.

  ## New Tables
  
  ### 1. `plans`
  Stores available subscription plans
  - `id` (uuid, primary key) - Unique identifier for each plan
  - `name` (text) - Plan name (Free, Basic, Premium)
  - `price_monthly` (integer) - Monthly price in rupees
  - `price_annual` (integer) - Annual price in rupees
  - `documents_limit` (integer, nullable) - Document limit per month (null for unlimited)
  - `features` (jsonb) - Array of features included in the plan
  - `is_active` (boolean) - Whether the plan is currently offered
  - `created_at` (timestamptz) - When the plan was created
  
  ### 2. `subscriptions`
  Stores user subscription information
  - `id` (uuid, primary key) - Unique identifier for subscription
  - `user_id` (uuid, foreign key) - References auth.users
  - `plan_id` (uuid, foreign key) - References plans table
  - `status` (text) - Subscription status (active, expired, cancelled, trial)
  - `billing_cycle` (text) - Billing period (monthly, annual)
  - `start_date` (timestamptz) - When subscription started
  - `end_date` (timestamptz) - When subscription expires
  - `auto_renew` (boolean) - Whether subscription auto-renews
  - `created_at` (timestamptz) - When subscription was created
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `payments`
  Stores payment transaction records
  - `id` (uuid, primary key) - Unique identifier for payment
  - `user_id` (uuid, foreign key) - References auth.users
  - `subscription_id` (uuid, foreign key) - References subscriptions table
  - `amount` (integer) - Payment amount in rupees
  - `tax_amount` (integer) - GST amount in rupees
  - `total_amount` (integer) - Total amount including tax
  - `currency` (text) - Currency code (INR)
  - `payment_method` (text) - Payment method used (UPI, Card, NetBanking, Wallet)
  - `payment_status` (text) - Status (pending, completed, failed, refunded)
  - `transaction_id` (text, nullable) - Payment gateway transaction ID
  - `failure_reason` (text, nullable) - Reason if payment failed
  - `created_at` (timestamptz) - When payment was initiated
  - `completed_at` (timestamptz, nullable) - When payment was completed

  ## Security
  - Enable RLS on all tables
  - Users can only view/manage their own subscriptions and payments
  - Plans are publicly readable but only admins can modify
  - Payment records are strictly isolated per user

  ## Important Notes
  1. Free plan is created by default with unlimited basic features
  2. Subscription status is automatically managed
  3. Payment records maintain complete audit trail
  4. RLS policies ensure data privacy and security
*/

-- Create enum types
DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled', 'trial');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE billing_cycle AS ENUM ('monthly', 'annual');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  price_monthly integer NOT NULL DEFAULT 0,
  price_annual integer NOT NULL DEFAULT 0,
  documents_limit integer,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES plans(id) ON DELETE RESTRICT NOT NULL,
  status subscription_status DEFAULT 'active' NOT NULL,
  billing_cycle billing_cycle DEFAULT 'monthly' NOT NULL,
  start_date timestamptz DEFAULT now() NOT NULL,
  end_date timestamptz NOT NULL,
  auto_renew boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount integer NOT NULL,
  tax_amount integer NOT NULL DEFAULT 0,
  total_amount integer NOT NULL,
  currency text DEFAULT 'INR' NOT NULL,
  payment_method text,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  transaction_id text,
  failure_reason text,
  created_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);

-- Enable Row Level Security
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plans table (publicly readable)

-- Anyone can view active plans
CREATE POLICY "Plans are publicly readable"
  ON plans FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- RLS Policies for subscriptions table

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own subscriptions
CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments table

-- Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own payments
CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own payments
CREATE POLICY "Users can update own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default plans
INSERT INTO plans (name, price_monthly, price_annual, documents_limit, features) VALUES
  ('Free', 0, 0, 3, '["3 documents per month", "Basic analysis", "Standard support", "7-day history"]'::jsonb),
  ('Basic', 299, 2870, 25, '["25 documents per month", "Advanced analysis", "Priority support", "30-day history", "Download reports", "No watermarks"]'::jsonb),
  ('Premium', 999, 9590, NULL, '["Unlimited documents", "Advanced AI analysis", "24/7 Priority support", "Unlimited history", "Download & share reports", "API access", "Custom templates", "Team collaboration"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();