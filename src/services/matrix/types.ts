export type Matrix = number[][];

// Contratos compartidos entre la UI y el backend para el procesamiento QR.
export interface QRRequest {
  matrix: Matrix;
  withStatistics: boolean;
}

export interface MatrixStatistics {
  max: number;
  min: number;
  average: number;
  sum: number;
  isDiagonal: boolean;
}

export interface StatisticsResponse {
  rotatedMatrix?: MatrixStatistics;
  q?: MatrixStatistics;
  r?: MatrixStatistics;
}

export interface QRResponse {
  rotatedMatrix: Matrix;
  q: Matrix;
  r: Matrix;
  statistics: StatisticsResponse;
}
