import type { MatrixStatistics } from "../../../services/matrix/types";

type Props = {
  title: string;
  stats?: MatrixStatistics;
};

export function StatisticsCard({ title, stats }: Props) {
  if (!stats) return null;

  return (
    <div className="statistics-card">
      <h4>{title}</h4>

      <ul className="statistics-list">
        <li><span>Valor máximo:</span> <span>{stats.max}</span></li>
        <li><span>Valor mínimo:</span> <span>{stats.min}</span></li>
        <li><span>Promedio:</span> <span>{stats.average}</span></li>
        <li><span>Suma total:</span> <span>{stats.sum}</span></li>
        <li>
          <span>Matriz diagonal:</span>
          <span>{stats.isDiagonal ? 'Yes' : 'No'}</span>
        </li>
      </ul>
    </div>
  );
}