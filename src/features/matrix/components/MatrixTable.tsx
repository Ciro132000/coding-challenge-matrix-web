type Props = {
  title: string;
  matrix: number[][];
};

export function MatrixTable({ title, matrix }: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>{title}</h3>

      <div
        style={{
          display: 'inline-block',
          border: '1px solid #ccc',
          padding: 8,
        }}
      >
        {matrix.map((row, i) => (
          <div
            key={i}
            style={{ display: 'flex' }}
          >
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  // width: 40,
                  // height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                }}
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