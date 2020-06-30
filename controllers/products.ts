import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { Product } from "../types.ts"

let products: Product[] = [
    {
        id: "1",
        name: "Produto Um",
        description: "Esse é o produto um",
        price: 29.99
    },
    {
        id: "2",
        name: "Produto Dois",
        description: "Esse é o produto dois",
        price: 39.99 
    },
    {
        id: "3",
        name: "Produto Três",
        description: "Esse é o produto três",
        price: 59.99
    }
]

// @desc        Pegar todos produtos
// @route       GET /api/v1/products
const getProducts = ({ response } : { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

// @desc        Pegar único produto
// @route       GET /api/v1/products/:id
const getProduct = ({ params, response } : { params: { id : string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'Nenhum produto foi encontrado'
        }
    }
}

// @desc        Adicionar produto
// @route       POST /api/v1/products
const addProduct = async ({ request, response } : { request: any, response: any }) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: "Nenhum dado"
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc        Atualizar um produto
// @route       PUT /api/v1/products/:id
const updateProduct = async ({ params, request, response } : { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        const body = await request.body()

        const updateData: { name?: string, description?: string, price?: number } = body.value

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : product) // Andando por array com map, trocando valor em id igual ao especificado

        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'Nenhum produto foi encontrado'
        }
    }
}

// @desc        Deletar um produto
// @route       DELETE /api/v1/products/:id
const deleteProduct = ({ params, response } : { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id) // Todos os objetos exceto o que queremos deletar
    response.body = {
        success: true,
        msg: 'Produto removido'
    }

}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }