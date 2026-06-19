import './App.css'
import { AuthProvider } from './core/auth/AuthProvider'
import { QueryProvider } from './providers/QueryProvider'

import { AppRouter } from './router/AppRouter'

function App() {

  return (
    <AuthProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </AuthProvider>
  )
}

export default App
