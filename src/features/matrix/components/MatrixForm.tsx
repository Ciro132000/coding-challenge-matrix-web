import { useState } from 'react';

type MatrixValue = number | '';

interface MatrixFormProps {
    onSubmit: (matrix: number[][], withStatistics: boolean) => void;
    onClear?: () => void;
    isLoading?: boolean;
}

export function MatrixForm({
    onSubmit,
    onClear,
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
        value = value > 50 ? 50 : value;

        setRows(value);

        generateMatrix(
            value,
            Number(cols) || 0,
        );
    };

    const handleColsChange = (
        value: number,
    ) => {

        value = value > 50 ? 50 : value;

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

    const handleClear = () => {
        setError('');
        if (rows !== '' && cols !== '') {
            generateMatrix(Number(rows), Number(cols));
        } else {
            setMatrix([]);
        }
        if (onClear) {
            onClear();
        }
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

        onSubmit(payload, true);
    };

    return (
        <div className="matrix-form-container">

            <h2 className='flex justify-center'>
                Generar matriz
            </h2>

            <div className="matrix-size-inputs flex justify-center">

                <input
                    type="number"
                    min={1}
                    max={50}
                    placeholder="Filas"
                    value={rows}
                    disabled={isLoading}
                    className="matrix-input"
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
                    max={50}
                    placeholder="Columnas"
                    value={cols}
                    disabled={isLoading}
                    className="matrix-input"
                    onChange={e =>
                        handleColsChange(
                            Number(e.target.value),
                        )
                    }
                />

            </div>

            <div className='flex justify-center'>
                <div className='overflow-x-auto'>
                    <div className={matrix.length > 0 ? "matrix-grid-container" : ""}>

                        {matrix.map(
                            (
                                row,
                                rowIndex,
                            ) => (

                                <div
                                    key={rowIndex}
                                    className="matrix-row"
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
                                                className="matrix-cell-input"
                                                onChange={e =>
                                                    handleCellChange(
                                                        rowIndex,
                                                        colIndex,
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                        ),
                                    )}

                                </div>

                            ),
                        )}

                    </div>
                </div>
            </div>

            {error && (

                <p className="error-text">
                    {error}
                </p>

            )}

            <div className='flex justify-center gap-4'>
                <button
                    type="button"
                    className="btn-secondary"
                    disabled={isLoading}
                    onClick={handleClear}
                >
                    Limpiar
                </button>
                <button
                    type="button"
                    className="btn-primary"
                    disabled={
                        isLoading ||
                        matrix.length === 0
                    }
                    onClick={handleSubmit}
                >
                    {isLoading
                        ? 'Calculando...'
                        : 'Calcular'}
                </button>
            </div>

        </div>
    );
}