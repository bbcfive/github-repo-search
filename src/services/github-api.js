import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';

export async function searchRepositories({ language, dateRange, minStars }) {
  const { start, end } = dateRange;
  const query = `language:${language} stars:>=${minStars}${start && end ? ` created:${start}..${end}` : ''}`;
  
  try {
    const response = await axios.get(GITHUB_API_URL, {
      params: { q: query, sort: 'stars', order: 'desc' },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
}