import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import PremiumLayout from './components/PremiumLayout'
import Home from './pages/Home'
import Builder from './pages/Builder'
import Preview from './pages/Preview'
import ProofPage from './pages/ProofPage'
import RBStep from './pages/RBStep'
import RBProof from './pages/RBProof'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/proof" element={<ProofPage />} />
      </Route>
      <Route path="/rb" element={<PremiumLayout />}>
        <Route index element={<Navigate to="/rb/01-problem" replace />} />
        <Route path="01-problem" element={<RBStep />} />
        <Route path="02-market" element={<RBStep />} />
        <Route path="03-architecture" element={<RBStep />} />
        <Route path="04-hld" element={<RBStep />} />
        <Route path="05-lld" element={<RBStep />} />
        <Route path="06-build" element={<RBStep />} />
        <Route path="07-test" element={<RBStep />} />
        <Route path="08-ship" element={<RBStep />} />
        <Route path="proof" element={<RBProof />} />
        <Route path="09-proof" element={<Navigate to="/rb/proof" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
