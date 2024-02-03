import React from "react";

import { ProductProps } from "../model/productProps";
import { priceFormat } from "../model/FormatVND";
import { Button } from "reactstrap";

type product = ProductProps & {
  imageUrl: string | undefined;
  delete: (id: any) => void;
  edit: (id: any) => void;
};

const ProductItem = (props: product) => {
  return (
    <tr>
      <td>
        <img src={props.imgUrl} alt="" />
      </td>
      <td>{props.productName}</td>
      <td>{props.category}</td>
      <td>{priceFormat(props.price)}</td>
      <td>
        <Button
          style={{marginRight:"5px"}}
          className="btn btn-danger "
          onClick={() => props.delete(props.id)}
        >
          Delete
        </Button>
        <button
          className="btn btn-primary ml-2"
          onClick={() => props.edit(props.id)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
