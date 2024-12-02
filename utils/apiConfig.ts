export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';
console.log(BASE_URL)

const apiEndpoints = {
  users: `${BASE_URL}/citizen/`,
  posts: `${BASE_URL}/citizen/distribution`,
  comments: `${BASE_URL}/citizen/aging`,
  login: `${BASE_URL}/citizen/education-level-percentages`,
  register: `${BASE_URL}/auth/register`,
};

export default apiEndpoints;
