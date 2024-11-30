export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';
console.log(BASE_URL)

const apiEndpoints = {
  users: `${BASE_URL}/citizen/`,
  posts: `${BASE_URL}/posts`,
  comments: `${BASE_URL}/comments`,
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
};

export default apiEndpoints;
