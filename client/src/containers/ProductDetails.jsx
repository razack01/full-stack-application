import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/ProductActions";
const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            {/* <div className="ui vertical divider">AND</div> */}
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <button className="buy-now-button"
                  onClick={() => navigate("/buy-product", { state: { product } })}> Buy Now
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;