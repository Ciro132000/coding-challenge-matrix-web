import { useMutation } from "@tanstack/react-query";
import type { QRRequest, QRResponse } from "../../../services/matrix/types";
import { MatrixDatasource } from "../../../services/matrix/MatrixDataSource";


export function useMatrixSend() {
  // Encapsula la mutación para mantener el componente desacoplado del datasource.
  return useMutation<QRResponse, Error, QRRequest>({
    mutationFn: MatrixDatasource.process,
  });
}
