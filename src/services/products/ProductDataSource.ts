import { api } from '../../core/api/axios';
import type { CreateProductDto, Product, UpdateProductDto } from './types';

export class ProductDatasource {

    async getAll(): Promise<Product[]> {

        const { data } = await api.get<Product[]>('/product');

        return data;
    }

    async create(
        product: CreateProductDto,
    ): Promise<Product> {

        const { data } = await api.post<Product>(
            '/product/create',
            product,
        );

        return data;
    }

    async update(
        product: UpdateProductDto,
    ): Promise<Product> {

        const {
            id,
            ...body
        } = product;

        const { data } = await api.put<Product>(
            `/product/update/${id}`,
            body,
        );

        return data;
    }

    async delete(id: number): Promise<void> {

        await api.delete(`/product/delete/${id}`);

    }

}