import type { APIRoute } from 'astro';

const URLBOX_API_KEY = process.env.URLBOX_API_KEY || 'demo';
const URLBOX_SECRET = process.env.URLBOX_SECRET || 'demo';

export async function getWebsiteScreenshot(url: string): Promise<string> {
  if (!url) return '/images/tools/default-tool.svg';
  
  try {
    const options = {
      url: encodeURIComponent(url),
      width: 1200,
      height: 630,
      format: 'jpg',
      quality: 80,
      force: true,
      full_page: false,
      wait_for: 1000
    };

    const screenshotUrl = `https://api.urlbox.io/v1/${URLBOX_API_KEY}/png?${new URLSearchParams({
      url: options.url,
      width: options.width.toString(),
      height: options.height.toString(),
      format: options.format,
      quality: options.quality.toString(),
      force: options.force.toString(),
      full_page: options.full_page.toString(),
      wait_for: options.wait_for.toString()
    })}`;

    return screenshotUrl;
  } catch (error) {
    console.error(`Screenshot error for ${url}:`, error);
    return '/images/tools/default-tool.svg';
  }
}