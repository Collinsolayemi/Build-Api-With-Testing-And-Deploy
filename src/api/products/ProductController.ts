import { inject } from "inversify";
import { Body, Controller, Get, Path, Post, Route, Security, SuccessResponse } from "tsoa";
import securities from "../auth/securities";
import { provideSingleton } from "../../util/provideSingleton";
import { v4 } from "uuid";

export interface Product {
  id: String;
  name: String;
  description: String;
  price: Number;
  createdAt: Date;
}

export interface newProduct extends Omit<Product, "id" | "createdat"> {}

export type ProductRequestBody = {
  product: newProduct;
};

export type ProductResponseBody = {
  product: Product;
};

@Route("product")
@provideSingleton(ProductController)
export class ProductController extends Controller {
  @SuccessResponse(201)
  @Security(securities.USER_AUTH)
  @Post()
  public async postProduct(@Body() reqBody: ProductRequestBody): Promise<ProductResponseBody> {
    return Promise.resolve({
      product: {
        ...reqBody.product,
        id: v4(),
        createdAt: new Date(),
      },
    });
  }
}
