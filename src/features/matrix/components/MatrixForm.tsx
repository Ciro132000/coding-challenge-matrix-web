import { useState } from 'react';

type MatrixValue = number | '';

interface MatrixFormProps {
    onSubmit: (matrix: number[][]) => void;
    isLoading?: boolean;
}

export function MatrixForm({
    onSubmit,
    isLoading = false,
}: MatrixFormProps) {

    const [rows, setRows] = useState<number | ''>('');
    const [cols, setCols] = useState<number | ''>('');
    const [matrix, setMatrix] = useState<MatrixValue[][]>([]);
    const [error, setError] = useState('');

    const generateMatrix = (
        newRows: number,
        newCols: number,
    ) => {

        if (newRows <= 0 || newCols <= 0) {
            setMatrix([]);
            return;
        }

        const newMatrix: MatrixValue[][] =
            Array.from(
                { length: newRows },
                () =>
                    Array.from(
                        { length: newCols },
                        () => '',
                    ),
            );

        setMatrix(newMatrix);
    };

    const handleRowsChange = (
        value: number,
    ) => {

        setRows(value);

        generateMatrix(
            value,
            Number(cols) || 0,
        );
    };

    const handleColsChange = (
        value: number,
    ) => {

        setCols(value);

        generateMatrix(
            Number(rows) || 0,
            value,
        );
    };

    const handleCellChange = (
        rowIndex: number,
        colIndex: number,
        value: string,
    ) => {

        const updatedMatrix =
            matrix.map(row => [...row]);

        updatedMatrix[rowIndex][colIndex] =
            value === ''
                ? ''
                : Number(value);

        setMatrix(updatedMatrix);
    };

    const handleSubmit = () => {

        setError('');

        if (
            rows === '' ||
            cols === ''
        ) {

            setError(
                'Debe indicar el tamaño de la matriz.',
            );

            return;
        }

        const hasEmptyValues =
            matrix.some(row =>
                row.some(
                    cell => cell === '',
                ),
            );

        if (hasEmptyValues) {

            setError(
                'Debe completar todos los valores de la matriz.',
            );

            return;
        }

        const payload =
            matrix.map(row =>
                row.map(cell => Number(cell)),
            );

        onSubmit(payload);
    };

    return (
        <div>

            <h2>
                Generar matriz
            </h2>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >

                <input
                    type="number"
                    min={1}
                    placeholder="Filas"
                    value={rows}
                    disabled={isLoading}
                    onChange={e =>
                        handleRowsChange(
                            Number(e.target.value),
                        )
                    }
                />

                <span>x</span>

                <input
                    type="number"
                    min={1}
                    placeholder="Columnas"
                    value={cols}
                    disabled={isLoading}
                    onChange={e =>
                        handleColsChange(
                            Number(e.target.value),
                        )
                    }
                />

            </div>

            <div>

                {matrix.map(
                    (
                        row,
                        rowIndex,
                    ) => (

                        <div
                            key={rowIndex}
                            style={{
                                display: 'flex',
                                gap: '8px',
                                marginBottom: '8px',
                            }}
                        >

                            {row.map(
                                (
                                    cell,
                                    colIndex,
                                ) => (

                                    <input
                                        key={`${rowIndex}-${colIndex}`}
                                        type="number"
                                        value={cell}
                                        disabled={isLoading}
                                        onChange={e =>
                                            handleCellChange(
                                                rowIndex,
                                                colIndex,
                                                e.target.value,
                                            )
                                        }
                                        style={{
                                            width: '70px',
                                        }}
                                    />

                                ),
                            )}

                        </div>

                    ),
                )}

            </div>

            {error && (

                <p
                    style={{
                        color: 'red',
                        marginTop: '16px',
                    }}
                >
                    {error}
                </p>

            )}

            <button
                type="button"
                disabled={
                    isLoading ||
                    matrix.length === 0
                }
                onClick={handleSubmit}
                style={{
                    marginTop: '20px',
                }}
            >
                {isLoading
                    ? 'Calculando...'
                    : 'Calcular'}
            </button>

        </div>
    );
}

// import { useMemo, useState, type ChangeEvent } from 'react';

// type Props = {
//   value: string;
//   onChange: (value: string) => void;
//   onSubmit: (matrix: number[][]) => void;
//   loading: boolean;
// };

// function parseMatrix(input: string): number[][] {
//   return input
//     .trim()
//     .split('\n')
//     .map(row =>
//       row.trim().split(/\s+/).map(Number)
//     );
// }

// export function MatrixForm({
//   value,
//   onChange,
//   onSubmit,
//   loading,
// }: Props) {
//   const isValid = useMemo(() => {
//     try {
//       const matrix = parseMatrix(value);
//       return matrix.every(row =>
//         row.every(n => !isNaN(n))
//       );
//     } catch {
//       return false;
//     }
//   }, [value]);

//   const handleSubmit = () => {
//     const matrix = parseMatrix(value);
//     onSubmit(matrix);
//   };

//   const [rows, setRows] = useState(1);
//   const [cols, setCols] = useState(2);
//   const [matrix, setMatrix] = useState<number[][]>([]);

//   const generateMatrix = (newRows: number, newCols: number) => {
//     if (newRows <= 0 || newCols <= 0) {
//       setMatrix([]);
//       return;
//     }

//     const newMatrix = Array.from({ length: newRows }, () =>
//       Array.from({ length: newCols }, () => 0)
//     );

//     setMatrix(newMatrix);
//   };

//   const handleRowsChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
//     const value = Number(e.target.value);

//     setRows(value);
//     generateMatrix(value, cols);
//   };

//   const handleColsChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
//     const value = Number(e.target.value);

//     setCols(value);
//     generateMatrix(rows, value);
//   };

//   const handleCellChange = (rowIndex: number, colIndex: number, value:string) => {
//     const updatedMatrix = matrix.map((row) => [...row]);

//     updatedMatrix[rowIndex][colIndex] =
//       value === "" ? 0 : Number(value);

//     setMatrix(updatedMatrix);
//   };


//   return (
//     <div>

//        <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <input
//           type="number"
//           min="1"
//           placeholder="Filas"
//           value={rows || ""}
//           onChange={handleRowsChange}
//         />

//         <span>x</span>

//         <input
//           type="number"
//           min="1"
//           placeholder="Columnas"
//           value={cols || ""}
//           onChange={handleColsChange}
//         />
//       </div>


//         <div>
//         {matrix.map((row, rowIndex) => (
//           <div
//             key={rowIndex}
//             style={{
//               display: "flex",
//               gap: "8px",
//               marginBottom: "8px",
//             }}
//           >
//             {row.map((cell, colIndex) => (
//               <input
//                 key={`${rowIndex}-${colIndex}`}
//                 type="number"
//                 value={cell}
//                 onChange={(e) =>
//                   handleCellChange(
//                     rowIndex,
//                     colIndex,
//                     e.target.value
//                   )
//                 }
//                 style={{
//                   width: "70px",
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>


//       <textarea
//         rows={6}
//         cols={40}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />

//       <br />

//       <button
//         onClick={handleSubmit}
//         disabled={!isValid || loading}
//       >
//         {loading ? 'Procesando...' : 'Enviar matriz'}
//       </button>

//       {!isValid && (
//         <p style={{ color: 'orange' }}>
//           Matriz inválida
//         </p>
//       )}
//     </div>
//   );
// }