import React from "react";
import { connect } from "react-redux";
import { removeFromPreview } from "../redux/products";

import AddItemPreview from "./AddItemPreview";
const PreviewAdded = ({ preview, removeFromPreview }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        margin: "100px 20px 0 0 ",
      }}
    >
      {preview.length !== 0 &&
        preview.map((product, index) => (
          <AddItemPreview
            key={index}
            product={product}
            edit={false}
            removeFromPreview={removeFromPreview}
          />
        ))}
    </div>
  );
};
export default connect(
  (state) => ({
    preview: state.products.preview,
  }),
  {
    removeFromPreview,
  }
)(PreviewAdded);
