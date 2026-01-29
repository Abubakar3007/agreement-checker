/*
  # Create Documents and Analysis Tables

  ## Overview
  This migration sets up the core database schema for the Agreement Checker AI application.
  It creates tables to store user documents and their AI analysis results.

  ## New Tables
  
  ### 1. `documents`
  Stores information about uploaded documents
  - `id` (uuid, primary key) - Unique identifier for each document
  - `user_id` (uuid, foreign key) - References auth.users, links document to user
  - `file_name` (text) - Original name of the uploaded file
  - `file_type` (text) - Type of file (PDF, JPG, PNG)
  - `file_size` (integer) - Size of file in bytes
  - `status` (text) - Processing status (pending, analyzing, analyzed, failed)
  - `uploaded_at` (timestamptz) - When the document was uploaded
  - `analyzed_at` (timestamptz, nullable) - When analysis was completed
  
  ### 2. `analysis_results`
  Stores AI analysis results for each document
  - `id` (uuid, primary key) - Unique identifier for analysis
  - `document_id` (uuid, foreign key) - References documents table
  - `verdict` (text) - Overall safety verdict (Safe, Medium Risk, Unsafe)
  - `score` (integer) - Risk score from 0-100
  - `summary` (jsonb) - Array of summary points
  - `recommendation` (text) - Actionable recommendation for user
  - `created_at` (timestamptz) - When analysis was created

  ## Security
  - Enable RLS on both tables
  - Users can only view/manage their own documents
  - Users can only view analysis results for their own documents
  - Authenticated users can insert their own documents
  - Authenticated users can update their own documents

  ## Important Notes
  1. Documents are linked to authenticated users via user_id
  2. Status field tracks document processing lifecycle
  3. Summary is stored as JSONB for flexible array storage
  4. RLS policies ensure complete data isolation between users
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  uploaded_at timestamptz DEFAULT now() NOT NULL,
  analyzed_at timestamptz
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL UNIQUE,
  verdict text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  summary jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommendation text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_analysis_results_document_id ON analysis_results(document_id);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for documents table

-- Users can view their own documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own documents
CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own documents
CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for analysis_results table

-- Users can view analysis results for their own documents
CREATE POLICY "Users can view own analysis results"
  ON analysis_results FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = analysis_results.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Users can insert analysis results for their own documents
CREATE POLICY "Users can insert own analysis results"
  ON analysis_results FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = analysis_results.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Users can update analysis results for their own documents
CREATE POLICY "Users can update own analysis results"
  ON analysis_results FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = analysis_results.document_id
      AND documents.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = analysis_results.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Users can delete analysis results for their own documents
CREATE POLICY "Users can delete own analysis results"
  ON analysis_results FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = analysis_results.document_id
      AND documents.user_id = auth.uid()
    )
  );