import type { APIRoute } from 'astro';
import { getWebsiteScreenshot } from '../../utils/screenshot';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url).searchParams.get('url');
  
  if (!url) {
    return new Response(null, {
      status: 400,
      statusText: 'URL parameter is required'
    });
  }

  try {
    const screenshotUrl = await getWebsiteScreenshot(url);
    
    // Redirect to the screenshot URL
    return new Response(null, {
      status: 302,
      headers: {
        'Location': screenshotUrl,
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Screenshot generation failed:', error);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/images/tools/default-tool.svg'
      }
    });
  }
}