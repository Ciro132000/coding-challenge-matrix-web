import { useMutation } from "@tanstack/react-query";
import type { QRRequest, QRResponse } from "../../../services/matrix/types";
import { MatrixDatasource } from "../../../services/matrix/MatrixDataSource";


export function useMatrixSend() {
  return useMutation<QRResponse, Error, QRRequest>({
    mutationFn: MatrixDatasource.process,
  });
}