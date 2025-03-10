// export class CreateProductDto {}
import {Product} from '@prisma/client'
// Esto es lo que espera desde el fronted
export type CreateProductDto = Omit<Product, "id" | "createdAt"| "updatedAt">