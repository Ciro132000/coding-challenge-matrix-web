# Matrix Web

Aplicación web construida con React, TypeScript y Vite para autenticar usuarios y procesar matrices mediante un backend HTTP. La interfaz permite ingresar una matriz, enviarla al servicio de procesamiento QR y visualizar la matriz rotada, las matrices Q/R y sus estadísticas.

## Requisitos

- [Node.js](https://nodejs.org/en/) 22.x o superior
- [npm](https://www.npmjs.com/)
- Docker, solo si se desea ejecutar la aplicación contenerizada
- Backend disponible según la variable `VITE_API_URL`

## Variables de entorno

Crear el archivo local a partir de la plantilla:

```bash
cp .env.example .env.development
```

Completar los valores requeridos:

```env
VITE_API_URL=http://localhost:8081/api
VITE_ENV=development
```

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `VITE_API_URL` | URL base del backend consumido por Axios. | `http://localhost:8081/api` |
| `VITE_ENV` | Ambiente de ejecución. Si el valor es `production`, la app valida servicios externos antes de renderizar. | `development` |

Para producción local con Docker, revisar también `.env.production`. Actualmente usa `VITE_API_URL=/api`, y Nginx redirige `/api` hacia `http://go-api:8080`.

## Instalación y ejecución local

Instalar dependencias:

```bash
npm install
```

Levantar el proyecto en modo desarrollo:

```bash
npm run dev
```

Vite mostrará la URL local en consola, normalmente `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev
```

Levanta la aplicación en modo desarrollo.

```bash
npm run lint
```

Valida el código con ESLint.

```bash
npm run build
```

Genera el build de producción.

```bash
npm run preview
```

Previsualiza localmente el build generado.

## Docker

Construir la imagen:

```bash
docker build -t matrix-web .
```

Ejecutar el contenedor:

```bash
docker run --name matrix-web -p 8080:8080 matrix-web
```

Abrir la aplicación:

```text
http://localhost:8080
```

El contenedor usa Nginx para servir los archivos estáticos generados por Vite. La ruta `/api` se proxifica al servicio `go-api:8080`, por lo que en un entorno con varios contenedores se debe asegurar que exista un servicio con ese nombre en la misma red Docker.

## Arquitectura y patrón usado

El proyecto sigue una organización por features, separando responsabilidades:

- `features`: contiene UI y lógica cercana a cada pantalla.
- `services`: centraliza el acceso HTTP mediante clases `Datasource`.
- `core`: agrupa configuración compartida como Axios, autenticación, socket y almacenamiento del token.
- `router`: encapsula navegación y protección de rutas.
- `providers`: registra dependencias globales de React.
- `shared`: contiene componentes reutilizables.

Esta separación mantiene los componentes desacoplados del transporte HTTP y facilita probar o reemplazar servicios sin reescribir la interfaz.

## Estructura del proyecto

```text
src/
  core/        Configuración transversal: auth, API, storage y socket
  features/    Pantallas y componentes agrupados por caso de uso
  providers/   Providers globales, como TanStack Query
  router/      Rutas públicas, privadas y redirecciones
  services/    Datasources y contratos tipados para consumir el backend
  shared/      Componentes reutilizables
```

## Tecnologías principales

- React 19 + TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Socket.IO Client
- Docker + Nginx

## Endpoints esperados

La app espera que el backend exponga, bajo `VITE_API_URL`, al menos:

- `POST /auth/login`: autentica y retorna un token JWT.
- `POST /qr`: procesa la matriz y retorna matrices resultantes con estadísticas.

## Convenciones de código

- Variables y funciones: `camelCase`, por ejemplo `isAuthenticated`, `handleSubmit`, `generateMatrix`.
- Componentes React: `PascalCase`, por ejemplo `MatrixForm`, `LoginPage`, `ProtectedRoute`.
- Clases: `PascalCase`, por ejemplo `AuthDatasource`, `MatrixDatasource`.
- Tipos e interfaces TypeScript: `PascalCase`, por ejemplo `QRRequest`, `QRResponse`, `MatrixStatistics`.
- Variables de entorno: `UPPER_SNAKE_CASE` con prefijo `VITE_`, requerido por Vite para exponerlas al cliente.
- Archivos de componentes: `PascalCase.tsx`.
- Archivos utilitarios o de infraestructura: nombres descriptivos en minúsculas o kebab-case, por ejemplo `token-storage.ts`.
- Comentarios: se usan de forma puntual para explicar intención o decisiones relevantes, no para repetir lo que el código ya expresa.

## Documentación del código

Se documentaron especialmente:

- Validación previa de servicios en producción.
- Manejo centralizado del token JWT.
- Interceptores de Axios para autorización y expiración de sesión.
- Flujo de autenticación.
- Validación y armado del payload de matrices.
- Datasources que traducen acciones de la UI al contrato HTTP del backend.

## Notas

- Antes de ejecutar la app, confirmar que el backend esté levantado y que `VITE_API_URL` apunte al puerto correcto.
- Si se usa Docker, confirmar que la red permita resolver el host `go-api` o modificar `nginx.conf` según el nombre real del servicio backend.
- Ejecutar `npm run lint` y `npm run build` antes de entregar para validar calidad y compilación.
