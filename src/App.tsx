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

  // Funcion para levantar servicios en producción
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
            console.log("Servicio no disponible");
          } else {
            setStatus('success');
            console.log("Servicios ok");
          }
        } catch (error) {
          setStatus('error');
          console.log("Servicio no disponible", error);
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
