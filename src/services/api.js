const API_BASE_URL = 'http://localhost:5001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

// Authentication
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email, password, userType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userType })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Startups
export const fetchStartups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching startups:', error);
    throw error;
  }
};

export const fetchStartup = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching startup:', error);
    throw error;
  }
};

export const createStartup = async (startupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/startups`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(startupData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating startup:', error);
    throw error;
  }
};

// Investors
export const fetchInvestors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/investors`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching investors:', error);
    throw error;
  }
};

export const fetchInvestor = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/investors/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching investor:', error);
    throw error;
  }
};

export const createInvestor = async (investorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/investors`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(investorData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating investor:', error);
    throw error;
  }
};

// Matches
export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const createMatch = async (matchData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(matchData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}; 