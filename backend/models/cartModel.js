import {Schema, model} from 'mongoose';

const cartSchema = new Schema (
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productsList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model ('Cart', cartSchema);
