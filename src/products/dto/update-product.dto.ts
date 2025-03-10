import {CreateProductDto} from './create-product.dto'

// Convierte todos los campo opcionales
export type UpdateProductDto = Partial<CreateProductDto>
