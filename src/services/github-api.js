import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';
const PER_PAGE = 100;

export async function fetchMostStarredRepos({ language, dateRange, minStars, page = 1 }) {
  const languages = language.split(',').filter(lang => lang.trim() !== '');
  
  if (languages.length === 0) {
    throw new Error('At least one language must be specified');
  }

  const { startDate, endDate } = getValidDateRange(dateRange);
  
  if (languages.length === 1) {
    // Single language query
    return fetchTopReposForLanguage(languages[0], startDate, endDate, PER_PAGE, page, minStars);
  } else {
    // Multi-language query
    const promises = languages.map(lang => 
      fetchTopReposForLanguage(lang, startDate, endDate, 10, 1, minStars)
    );
    return Promise.all(promises);
  }
}

function getValidDateRange(dateRange) {
  const now = new Date();
  let startDate = dateRange.start ? new Date(dateRange.start) : new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  let endDate = dateRange.end ? new Date(dateRange.end) : now;

  if (endDate > now) {
    endDate = now;
  }

  if (startDate > endDate) {
    startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
}

async function fetchTopReposForLanguage(language, startDate, endDate, perPage, page, minStars) {
  const query = `language:${language} created:${startDate}..${endDate} stars:>=${minStars}`;
  const sort = 'stars';
  const order = 'desc';

  try {
    const response = await axios.get(GITHUB_API_URL, {
      params: {
        q: query,
        sort,
        order,
        per_page: perPage,
        page
      }
    });

    return {
      language,
      repos: response.data.items,
      totalCount: response.data.total_count
    };
  } catch (error) {
    console.error(`Error fetching repos for ${language}:`, error);
    return { language, repos: [], totalCount: 0 };
  }
}