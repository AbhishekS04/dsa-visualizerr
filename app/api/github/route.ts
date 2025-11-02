import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Using your actual repository
  const owner = 'AbhishekS04';
  const repo = 'dsa-visualizerr';
  
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'User-Agent': 'CodeDSA-App',
          // If you have a GitHub token, you can add it here to increase rate limits
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    const stars = data.stargazers_count || 0;
    
    return new Response(
      JSON.stringify({ stars }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600', // Cache for 1 hour
        },
      }
    );
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return new Response(
      JSON.stringify({ stars: 0, error: 'Failed to fetch stars' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}