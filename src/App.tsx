import { useEffect, useState } from 'react'
import './App.css'
import { AuthProvider } from './core/auth/AuthProvider'
import { QueryProvider } from './providers/QueryProvider'

import { AppRouter } from './router/AppRouter'

function App() {
  const isProduction = import.meta.env.VITE_ENV === "production";
  const nodeApi = import.meta.env.VITE_NODE_API__URL ?? "";
  const goApi = import.meta.env.VITE_GO_API_URL ?? "";
  const shouldFetchServices = isProduction && nodeApi !== "" && goApi !== "";

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    shouldFetchServices ? 'loading' : 'success'
  );

  // En producción se validan los servicios externos antes de renderizar la app.
  useEffect(() => {
    if(shouldFetchServices) {
      const runService = async () =>{
        try {
          const results = await Promise.allSettled([
            fetch(nodeApi),
            fetch(goApi)
          ]);

          const hasError = results.some(result => 
            result.status === 'rejected' || 
            (result.status === 'fulfilled' && !result.value.ok)
          );

          if (hasError) {
            setStatus('error');
          } else {
            setStatus('success');
          }
        } catch {
          setStatus('error');
        }
      }

      runService();
    }
  }, [shouldFetchServices, nodeApi, goApi])

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Cargando servicios...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: 'red' }}>
        Servicios no disponibles
      </div>
    );
  }

  return (
    <AuthProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </AuthProvider>
  )
}

export default App
