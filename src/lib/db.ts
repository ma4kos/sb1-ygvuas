import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Tool {
  id?: number;
  name: string;
  description: string;
  category: string;
  pricing: string;
  website_url: string;
  rating: number;
  image?: string;
  created_at?: string;
}

export async function getAllTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

export async function insertTool(tool: Tool): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .insert([{
        name: tool.name,
        description: tool.description,
        category: tool.category,
        pricing: tool.pricing,
        website_url: tool.website_url,
        rating: tool.rating,
        image: tool.image || '/images/tools/default-tool.svg'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting tool:', error);
    return null;
  }
}