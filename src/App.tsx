import { useEffect } from 'react'
import './App.css'
import { AuthProvider } from './core/auth/AuthProvider'
import { QueryProvider } from './providers/QueryProvider'

import { AppRouter } from './router/AppRouter'

function App() {

  useEffect(() => {
    if(import.meta.env.VITE_ENV == "production") {
      const nodeApi = import.meta.env.VITE_NODE_API__URL ?? "";
      const goApi = import.meta.env.VITE_GO_API_URL ?? "";

      if(nodeApi != "" && goApi != "") {
        const runService = async () =>{
          Promise.allSettled([
            fetch(nodeApi),
            fetch(goApi)
          ]).then(() => {
            console.log("Servicios ok")
          }).catch(() => {
            console.log("Servicio no disponible")
          })
        }

        runService();
      }
    }
  }, [])

  return (
    <AuthProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </AuthProvider>
  )
}

export default App
