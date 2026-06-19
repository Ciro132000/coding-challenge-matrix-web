
import { api } from '../../core/api/axios';
import type { QRRequest, QRResponse } from './types';

export class MatrixDatasource {
  static async process(
    request: QRRequest,
  ): Promise<QRResponse> {
    const { data } = await api.post<QRResponse>(
      '/qr',
      request,
    );

    return data;
  }
}