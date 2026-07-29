import Dashboard from './pages/Dashboard'
import ErrorBoundary from './components/common/ErrorBoundary'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/errors/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
        
          {/* Show Error 404 if page doesnt'exists */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
