import type { MatrixStatistics } from "../../../services/matrix/types";

type Props = {
  title: string;
  stats?: MatrixStatistics;
};

export function StatisticsCard({ title, stats }: Props) {
  if (!stats) return null;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <h4>{title}</h4>

      <ul style={{ margin: 0, paddingLeft: 16 }}>
        <li>Max: {stats.max}</li>
        <li>Min: {stats.min}</li>
        <li>Average: {stats.average}</li>
        <li>Sum: {stats.sum}</li>
        <li>
          Diagonal:{' '}
          {stats.isDiagonal ? 'Yes' : 'No'}
        </li>
      </ul>
    </div>
  );
}