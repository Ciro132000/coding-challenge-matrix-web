import { useMatrixSend } from './hooks/useMatrixSend';
import { MatrixForm } from './components/MatrixForm';
import { MatrixTable } from './components/MatrixTable';
import { StatisticsCard } from './components/StatisticsCard';

export function MatrixPage() {
  const { mutate, data, isPending, error } = useMatrixSend();

  const handleSubmit = (matrix: number[][]) => {
    mutate({ matrix });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>QR Matrix Processor</h1>

      <MatrixForm
        // value={matrixText}
        // onChange={setMatrixText}
        onSubmit={handleSubmit}
        // loading={isPending}
        isLoading={isPending}
      />

      {error && (
        <p style={{ color: 'red' }}>
          Error: {error.message}
        </p>
      )}

      {data && (
        <div style={{ marginTop: 30 }}>
          <h2>Resultados</h2>

          {/* MATRICES */}
          <MatrixTable
            title="Rotated Matrix"
            matrix={data.rotatedMatrix}
          />

          <MatrixTable
            title="Q Matrix"
            matrix={data.q}
          />

          <MatrixTable
            title="R Matrix"
            matrix={data.r}
          />

          {/* STATISTICS */}
          <h3>Statistics</h3>

          <div
            style={{
              display: 'grid',
              gap: 12,
              maxWidth: 600,
            }}
          >
            <StatisticsCard
              title="Rotated Matrix"
              stats={data.statistics.rotatedMatrix}
            />

            <StatisticsCard
              title="Q Matrix"
              stats={data.statistics.q}
            />

            <StatisticsCard
              title="R Matrix"
              stats={data.statistics.r}
            />
          </div>
        </div>
      )}
    </div>
  );
}