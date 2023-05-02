export interface ICreateProductDTO {
    name: string;
    description: string;
}

export interface IUpdateProductDTO {
    name?: string;
    description?: string;
}
