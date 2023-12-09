import React from "react";

import "./CustomerFavorites.css";

import steak from "../../assets/steak.png";

const CustomerFavorites = () => {
  return (
    <section className="align_center customer_favorites">
      <h1 className="customer_favorites_heading">Customer Favorites</h1>
      <div className="align_center customer_favorites_products">
        <article className="product_details">
          <div className="product_details_photo">
            <img src={steak} />
          </div>
          <div className=" product_details_container">
            <p className="product_details_heading">Rib-Eye Steak</p>
            <div className="align_center product_details_footer">
              <div className="footer_title">£10.00</div>
              <div>
                <button className="add_to_cart">Add to basket</button>
              </div>
            </div>
          </div>
        </article>
        <article className="product_details">
          <div className="product_details_photo">
            <img src={steak} />
          </div>
          <div className=" product_details_container">
            <p className="product_details_heading">Rib-Eye Steak</p>
            <div className="align_center product_details_footer">
              <div className="footer_title">£10.00</div>
              <div>
                <button className="add_to_cart">Add to basket</button>
              </div>
            </div>
          </div>
        </article>
        <article className="product_details">
          <div className="product_details_photo">
            <img src={steak} />
          </div>
          <div className=" product_details_container">
            <p className="product_details_heading">Rib-Eye Steak</p>
            <div className="align_center product_details_footer">
              <div className="footer_title">£10.00</div>
              <div>
                <button className="add_to_cart">Add to basket</button>
              </div>
            </div>
          </div>
        </article>
        <article className="product_details">
          <div className="product_details_photo">
            <img src={steak} />
          </div>
          <div className=" product_details_container">
            <p className="product_details_heading">Rib-Eye Steak</p>
            <div className="align_center product_details_footer">
              <div className="footer_title">£10.00</div>
              <div>
                <button className="add_to_cart">Add to basket</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CustomerFavorites;
