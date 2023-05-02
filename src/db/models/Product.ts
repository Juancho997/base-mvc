import { Schema, model } from 'mongoose';
import { IProduct } from '../../models/types/product/iproduct';

const Product_Schema = new Schema<IProduct>({
    name: String,
    description: String
});

const Product = model('Product', Product_Schema);

export default Product;
