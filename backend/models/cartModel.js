import {Schema, model} from 'mongoose';

const cartSchema = new Schema (
  {
    cartName: {
      type: String,
      required: true,
      minlength: [3, 'Cart name must contain 3 letters at least.'],
      maxlength: [30, 'Cart name can not contain more than 30 letters.'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productsList: [
      {
        productName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model ('Cart', cartSchema);
