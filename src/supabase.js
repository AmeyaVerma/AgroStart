// Supabase configuration — REPLACE with your project values
// Get these from: https://supabase.com → Your Project → Settings → API
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rhxsdejxsauultbaprpx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeHNkZWp4c2F1dWx0YmFwcnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MTY0NjEsImV4cCI6MjA5ODk5MjQ2MX0.fefqwaBt_UF6uiOuI6d1SFGnqLKl7mPdr0T6g82HyJo'; // public anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
