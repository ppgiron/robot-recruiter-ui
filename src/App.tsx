import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Candidates } from './pages/Candidates'
import { CandidateDetail } from './pages/CandidateDetail'
import { RepositoryAnalysis } from './pages/RepositoryAnalysis'
import { Settings } from './pages/Settings'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/:id" element={<CandidateDetail />} />
        <Route path="/analysis" element={<RepositoryAnalysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App 