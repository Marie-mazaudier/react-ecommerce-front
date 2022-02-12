import React, {useState} from "react";
import { Card, Tabs, Tooltip } from "antd";
import noImage from '../../images/default.jpg'
import { Link } from "react-router-dom";
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from "./ProductListItems";
import StarRating from 'react-star-ratings'
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash"
import { useSelector, useDispatch } from "react-redux";
import {addToWishlist} from '../../functions/user'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const {TabPane} = Tabs
const SingleProduct = ({product, onStarClick, star}) => { // this is children component of product page
    const {title, description, images, _id} = product;
    const[tooltip, setTooltip]=useState('Click to add')
   
   
    //redux
  const {user, cart} = useSelector((state) => ({...state})) // grab the cart & user from the state
  const dispatch = useDispatch()
  // router
  let history = useHistory();



    const handleAddToCart = () => {

      // create cart array of product.s
      let cart = []
      if(typeof window !== 'undefined'){
        // if cart is in localstorage GET it
        if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'))
        }
        // push new prodcut to cart
        cart.push({
          ...product, // spread to get all this values
          count:1,
        });
        //remove duplicate
        let unique = _.uniqWith(cart, _.isEqual) // lodash library methode, take the array card and keep the unique values
        // save to local storage (without duplicate !!)
        //console.log('unique, unique)
        localStorage.setItem('cart', JSON.stringify(unique))
        //show tooltip
        setTooltip('Added')
        // Add to redux State
        dispatch({
          type:"ADD_TO_CART",
          payload: unique,
        })
        dispatch({
          type:"SET_VISIBLE",
          payload: true,
        })
      }
    }
    const handleAddToWishlist = e => {
      e.preventDefault();
      addToWishlist(product._id, user.token).then(res => {
        console.log('ADDED TO WISHLIST')
        toast.success('Added to wishlist')
        history.push('/user/wishlist')
      })

    }
    return(
        <>
       
        <div className="col-md-7">
          
        {images && images.length ?
          (  <Carousel
            showArrows={true}
            autoPlay
            infiniteLoop
            >
                {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
            </Carousel>)
            :
            ( <Card
                cover={
                    <img
                      src={noImage}
                      className="mb-3 card-image"
                    />
                  }
            >
                
            </Card>)
        }

        <Tabs type="card">
            <TabPane tab="Description" key="1">
                {description && description}
            </TabPane>
            <TabPane tab="Info" key="2">
               Call us on XXXX xx xx xx to learn more about this product
            </TabPane>
        </Tabs>

        </div>
        <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length>0 ? 
        showAverage(product) 
        : 
        <div className="text-center pt-1 pb-3">No rating yet</div>}
            <Card 
             actions=
             {[
                 <>
                   <Tooltip
                    title={tooltip}
                    >
                    <a onClick={handleAddToCart}>
                    <ShoppingCartOutlined className="text-success" /> <br/> Add to Cart
                    
                    </a>
                    </Tooltip> ,
                
                 </>,
                 <a onClick={handleAddToWishlist}>
                  <HeartOutlined className="text-info" /><br/>  Add to Wishlist
                  </a>
                ,
                   <RatingModal>
                   <StarRating
                     name={_id}
                     numberOfStars={5}
                     rating={star}
                     changeRating={onStarClick}
                     isSelectable={true}
                     starRatedColor="red"
                   />
                 </RatingModal>,
             ]}
            >
           
               
            <ProductListItems product={product}/>
           </Card>
        </div>
        </>
    )

}

export default SingleProduct