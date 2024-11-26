import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    // Create the tools table using Supabase SQL editor
    // This is typically done through the Supabase dashboard
    // Here we'll just verify the connection
    const { data, error } = await supabase
      .from('tools')
      .select('count(*)')
      .single();

    if (error) throw error;
    
    console.log('Database connection verified successfully');
    console.log('Total tools:', data.count);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();