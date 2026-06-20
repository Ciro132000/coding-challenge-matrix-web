import { useMatrixSend } from './hooks/useMatrixSend';
import { MatrixForm } from './components/MatrixForm';
import { MatrixTable } from './components/MatrixTable';
import { StatisticsCard } from './components/StatisticsCard';
import { LogoutButton } from '../../shared/LogoutButton';

export function MatrixPage() {
  const { mutate, data, isPending, error, reset } = useMatrixSend();

  // Envía la matriz validada al backend y solicita estadísticas en la respuesta.
  const handleSubmit = (matrix: number[][], withStatistics: boolean) => {
    mutate({ matrix, withStatistics });
  };

  return (
    <div className="matrix-page">
      <div className='flex justify-between mb-4'style={{ width: "100%" }}>
        <h1>QR Matrix Processor</h1>
        <LogoutButton/>
      </div>

      <MatrixForm
        // value={matrixText}
        // onChange={setMatrixText}
        onSubmit={handleSubmit}
        onClear={reset}
        // loading={isPending}
        isLoading={isPending}
      />

      {error && (
        <p className="error-text">
          Error: {error.message}
        </p>
      )}

      {data && (
        <div >
          <h2 className='text-center'>Resultados</h2>

          {/* MATRICES */}
          <MatrixTable
            title="Matriz Rotada"
            matrix={data.rotatedMatrix}
          />

          <MatrixTable
            title="Q Matriz"
            matrix={data.q}
          />

          <MatrixTable
            title="R Matriz"
            matrix={data.r}
          />

          <h3 className='text-center'>Estadísticas</h3>

          <div className="statistics-grid">
            <StatisticsCard
              title="Matriz Rotada"
              stats={data.statistics.rotatedMatrix}
            />

            <StatisticsCard
              title="Q Matriz"
              stats={data.statistics.q}
            />

            <StatisticsCard
              title="R Matriz"
              stats={data.statistics.r}
            />
          </div>
        </div>
      )}
    </div>
  );
}
