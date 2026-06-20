type Props = {
  title: string;
  matrix: number[][];
};

// Componente reutilizable para generar las matrices recibidas en el calculo.

export function MatrixTable({ title, matrix }: Props) {
  const cols = matrix[0]?.length || 0;

  return (
    <div className="matrix-table-wrapper">
      <h3>{title}</h3>

      <div 
        className="matrix-table"
        style={{ gridTemplateColumns: `repeat(${cols}, max-content)` }}
      >
        {matrix.map((row, i) => (
          <div
            key={i}
            className="matrix-table-row"
          >
            {row.map((cell, j) => (
              <div
                key={j}
                className="matrix-table-cell"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}