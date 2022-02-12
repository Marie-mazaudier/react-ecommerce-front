import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from "../functions/user";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Checkout = ({ history }) => {
    const [products, setProducts]=useState([])
    const[total, setTotal]=useState(0)
    const [postal, setPostal]= useState('')
    const [ville, setVille]= useState('')
    const [rue, setRue]= useState('')
    const[address, setAddress]= useState('')
    const[addressSaved, setAddressSaved] =useState(false)
    const [coupon, setCoupon] =useState('')
    // discount price
    const[totalAfterDiscount, setTotalAfterDiscount]=useState(0)
    const [discountError, setDisountError] =useState('')

    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon );

    useEffect(() => {
    if(user && user.token){ 
      getUserCart(user.token).then((res) => {
       // console.log("user cart res", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
    }, [user, history]);
    const saveAddressToDb= (e) => {
        setAddress(rue + ','  + postal  + ' '  +ville)

        e.preventDefault()
        //validation
        if(!rue || !postal || !ville) {
            toast.error('Rue, code postal et ville requis')
            return // n'execute pas la suite du code si pblm
        }
  
        console.log(address)
        
        saveUserAddress(user.token, address)
        
        .then(res => {
            if(res.data.ok) {
                setAddressSaved(true)
                toast.success('Address saved')
            }
           
        })
    }

    const applyDiscountCoupon = () => {
        console.log("send coupn to backend", coupon)
        applyCoupon(user.token, coupon)
        .then(res => {
            console.log('Respond on coupon applied', res.data)
            if(res.data){
                setTotalAfterDiscount(res.data)
                //update redux coupon applied true or false
                dispatch({
                    type:"COUPON_APPLIED",
                    payload: true,
                })

            }
            //error
            if(res.data.err){
                setDisountError(res.data.err);
                // update redux coupon applied true or false
                dispatch({
                    type:"COUPON_APPLIED",
                    payload: false,
                })
            }
        })
    }
    /* Exemple de réponse envoyée dans la console
    "products": [
        {
            "_id": "616a7bdcf72f7d5af0c5ee20",
            "product": "614ca0cbb50a5a55c8470b14",
            "count": 2,
            "color": "Blue",
            "price": 40
        },*/
    const emptyCart = () => {
            // remove from local storage
            if(typeof window !== 'undefnied') {
                localStorage.removeItem('cart')
            }
            // remove from redux
            dispatch({
                type: "ADD_TO_CART",
                payload: [],
            })
            // remove from  backend
            emptyUserCart(user.token)
            .then(res => {
                setProducts([])
                setTotal(0)
                setTotalAfterDiscount(0)
                setCoupon("")
                toast.success('Cart is empty. Continue shopping')
            })
    }
    /*save adresse*/
      // Pourrait aussi être direct écrit dans return en dessous
   const RegistrationAddress = () => 
   ( 
    <>
        <input type="text" 
         className="form-control" 
         value={rue}
         onChange={(e)=> setRue(e.target.value)} 
         placeholder="Rue"
         autoFocus
      />
       <input type="text" 
         className="form-control" 
         value={postal} 
         onChange={(e)=>setPostal(e.target.value)}
         placeholder="Code Postal"
      />
       <input type="text" 
         className="form-control" 
         value={ville} 
         onChange={(e)=>setVille(e.target.value)}
         placeholder="Ville"
      />
      <br/>
      <button  onClick={saveAddressToDb} type="submit" className="btn btn-raised">
              Complete Registration
      </button>
           

    </>
   )
   const showProductSummary = () =>
   products.map((p, i) => (
     <div key={i}>
       <p>
         {p.product.title} ({p.color}) x {p.count} ={" "}
         {p.product.price * p.count}
       </p>
     </div>
   ));
   const showApplyCoupon = () => (
       <>
        <input onChange={(e) => {
            setCoupon(e.target.value);
            setDisountError('');
        }}
       
        value={coupon}
        type="text"
        className="form-control"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
       </>
   )
   const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

return(
    <div className="row">
        <div className="col-md-6">
            
            <h4>Delivery Address</h4>
            <br/>
            {RegistrationAddress()}
            <br/>
   
            <hr/>
            <h4>Got Coupon ?</h4>
            <br/>
                {showApplyCoupon()}  
            <br/>
            {discountError && <p className="bg-danger p-2">{discountError}</p>}     
         </div>
        <div className="col-md-6">
            <h4>Order Summary</h4>
        
            <hr/>
            <p>Products {products.length}</p>
            <hr/>
            {showProductSummary()}
            <hr/>
            <p>Cart Total: ${total}</p>

            {totalAfterDiscount > 0 &&(
                <p className="bg-success p-2"> Discount Applied : Total Payable :${totalAfterDiscount}</p>
            ) }

    <div className="row">
                <div className="col-md-6">
                {COD ? (
                  <button 
                  className="btn btn-primary" 
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                  > 
                 Commander
                  </button>  
                ) : (
                    <button 
                    className="btn btn-primary" 
                    disabled={!addressSaved || !products.length}
                    onClick={() => history.push('payment')}
                    > 
                  Commander
                    </button>    
                )}
                </div>
                <div className="col-md-6">
                    <button 
                    disabled={!products.length} 
                    onClick={emptyCart} 
                    className="btn btn-primary"> Empty Cart</button>
                </div>
            </div>
    </div>

    </div>
)
}

export default Checkout