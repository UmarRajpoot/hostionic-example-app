import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export default axios.create({
  baseURL: BASE_URL,
});

// Payment
export const PayUrl = `${BASE_URL}/pay`;
