import {Schema, model} from 'mongoose';

const productSchema = new Schema (
  {
    productName: {
      type: String,
      required: true,
      minlength: [2, 'Product name must contain 2 letters at least.'],
      maxlength: [50, 'Product name can not contain more than 50 letters.'],
      unique: true,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, 'Product code must contain 10 letters at least.'],
      minlength: [50, 'Product code can not contain more than 50 letters.'],
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model ('Product', productSchema);
