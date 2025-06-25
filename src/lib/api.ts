import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('github_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('github_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  // Repository analysis
  analyzeRepository: (repoData: any) => api.post('/analyze', repoData),
  getAnalysisStatus: (sessionId: string) => api.get(`/analysis/${sessionId}`),
  
  // Candidates
  getCandidates: (params?: any) => api.get('/candidates', { params }),
  getCandidate: (id: string) => api.get(`/candidates/${id}`),
  searchCandidates: (filters: any) => api.post('/candidates/search', filters),
  
  // Repositories
  getRepositories: (params?: any) => api.get('/repositories', { params }),
  getRepository: (id: string) => api.get(`/repositories/${id}`),
  
  // Analysis sessions
  getAnalysisSessions: () => api.get('/analysis-sessions'),
  getAnalysisSession: (id: string) => api.get(`/analysis-sessions/${id}`),
  
  // Statistics
  getDashboardStats: () => api.get('/stats/dashboard'),
  getAnalytics: (params?: any) => api.get('/stats/analytics', { params }),
  
  // Feedback
  submitFeedback: (feedback: any) => api.post('/feedback', feedback),
  getFeedback: () => api.get('/feedback'),
}

export default api 