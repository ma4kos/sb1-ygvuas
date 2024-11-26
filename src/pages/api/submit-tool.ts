import type { APIRoute } from 'astro';
import { insertTool } from '../../lib/db';
import { getWebsiteScreenshot } from '../../utils/screenshot';

export const post: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract and validate form data
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const pricing = formData.get('pricing') as string;
    const websiteUrl = formData.get('websiteUrl') as string;

    if (!name || !description || !category || !pricing || !websiteUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All fields are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get image path (either from file upload or screenshot)
    let imagePath = await getWebsiteScreenshot(websiteUrl);

    // Insert tool into database
    const tool = await insertTool({
      name,
      description,
      category,
      pricing,
      website_url: websiteUrl,
      rating: 0,
      image: imagePath
    });

    if (!tool) {
      throw new Error('Failed to insert tool into database');
    }

    return new Response(
      JSON.stringify({
        success: true,
        tool,
        message: 'Tool submitted successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error submitting tool:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to submit tool. Please try again.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};