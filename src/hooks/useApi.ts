import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { endpoints } from '../lib/api'

// Query keys
export const queryKeys = {
  candidates: ['candidates'] as const,
  candidate: (id: string) => ['candidates', id] as const,
  repositories: ['repositories'] as const,
  repository: (id: string) => ['repositories', id] as const,
  analysisSessions: ['analysis-sessions'] as const,
  analysisSession: (id: string) => ['analysis-sessions', id] as const,
  dashboardStats: ['stats', 'dashboard'] as const,
  analytics: (params?: any) => ['stats', 'analytics', params] as const,
  feedback: ['feedback'] as const,
}

// Candidates
export const useCandidates = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.candidates,
    queryFn: () => endpoints.getCandidates(params).then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: queryKeys.candidate(id),
    queryFn: () => endpoints.getCandidate(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useSearchCandidates = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (filters: any) => endpoints.searchCandidates(filters).then(res => res.data),
    onSuccess: (data) => {
      // Update candidates cache with search results
      queryClient.setQueryData(queryKeys.candidates, data)
    },
  })
}

// Repositories
export const useRepositories = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.repositories,
    queryFn: () => endpoints.getRepositories(params).then(res => res.data),
    staleTime: 5 * 60 * 1000,
  })
}

export const useRepository = (id: string) => {
  return useQuery({
    queryKey: queryKeys.repository(id),
    queryFn: () => endpoints.getRepository(id).then(res => res.data),
    enabled: !!id,
  })
}

// Analysis
export const useAnalysisSessions = () => {
  return useQuery({
    queryKey: queryKeys.analysisSessions,
    queryFn: () => endpoints.getAnalysisSessions().then(res => res.data),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useAnalysisSession = (id: string) => {
  return useQuery({
    queryKey: queryKeys.analysisSession(id),
    queryFn: () => endpoints.getAnalysisSession(id).then(res => res.data),
    enabled: !!id,
    refetchInterval: (data) => {
      // Poll every 5 seconds if analysis is still running
      return data?.status === 'running' ? 5000 : false
    },
  })
}

export const useAnalyzeRepository = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (repoData: any) => endpoints.analyzeRepository(repoData).then(res => res.data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.analysisSessions })
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories })
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates })
    },
  })
}

// Statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: () => endpoints.getDashboardStats().then(res => res.data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useAnalytics = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.analytics(params),
    queryFn: () => endpoints.getAnalytics(params).then(res => res.data),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Feedback
export const useFeedback = () => {
  return useQuery({
    queryKey: queryKeys.feedback,
    queryFn: () => endpoints.getFeedback().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  })
}

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (feedback: any) => endpoints.submitFeedback(feedback).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback })
    },
  })
} 