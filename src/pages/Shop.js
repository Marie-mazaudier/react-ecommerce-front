import React, { useState, useEffect } from "react";
import {getProductsByCount, fetchProductsByFilter} from '../functions/product'
import {getCategories} from '../functions/category'
import {getSubs} from '../functions/sub'
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../components/cards/ProductCard'
import {Menu, Slider, Checkbox, Radio} from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Star from '../components/forms/Star'

const {SubMenu, ItemGroup}= Menu;

const Shop =() => {
    const [products, setProducts] = useState([])
    const [loading, setLoading]= useState(false)
    const [price, setPrice] = useState([0,0])
    const [ok, setOk]= useState(false)
    const [categories, setCatgories]=useState([])
    const [categoryIds, setCategoryIds]=useState([])
    const [star, setStar] =useState('')
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"]);
    const [brand, setBrand] = useState('')
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
    const [color, setColor] = useState('')
    const [shipping, setShipping] = useState("");

    let dispatch = useDispatch()
    const {search} = useSelector((state) => ({...state})) // grab the search from the state
    const {text} = search
    useEffect(() => {
        loadAllProducts()
        //fetch categories
        getCategories()
        .then(res => setCatgories(res.data))
      // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
}, []);
    const fetchProduct = (arg) => {
        fetchProductsByFilter(arg)
        .then(res => {
            setProducts(res.data)
        });
    }

    
//1. Load products by default  on page load 
    const loadAllProducts = () => {
        getProductsByCount(12)
        .then(p => {
            setProducts(p.data);
            setLoading(false)
        })
    }

// 2. load products on user search input
    useEffect(() => {
       // console.log('load products on user search input', text)
    const delayed = setTimeout(()=> { // améliorer performance affichage des requêtes
        fetchProduct({query: text}) // controller attend un objet query
        if(!text) {
            loadAllProducts()
        }
    }, 300)
        return () => clearTimeout(delayed)
    }, [text]) // s'execute à chq fois que le texte change

  
    //3. load products based on price range
    useEffect(() => {
        fetchProduct({price: price}) // req.body.price
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY", // efface recherche texte au sein du state 
            payload: {text: ""}
        })
        //reset
        setColor('')
        setBrand("")
        setSub('')
        setStar('')
        setCategoryIds([])
        setShipping('')
        setPrice(value)
        setTimeout(() => {
            setOk(!ok) // toggle
        }, 300) // delai pour le nb de requetes => performances
    }   

    //4. Load products load on category
        //show category in list of checkbox
    const showCategories = () => categories.map((c) => (<div key={c._id}>
        <Checkbox 
        onChange={handleCheck}
        className="pb-2 pl-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)} //check if the category in the state include the given category
        >
            {c.name}
        </Checkbox>
        <br/>
    </div>))
    // handle check for categories
    const handleCheck = (e) => { // permet d'éviter doublon dans le state si catégorie cliqué puis décliqué
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
          });
          //reset
          setColor('')
          setBrand("")
          setSub('')
          setStar('')
          setPrice([0, 0]);
          setShipping('')
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // Recherche l'objet spécifié (justChecked) dans le tableau inTheState 
      
        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
        inTheState.push(justChecked);
      } else {
        // if found pull out one item from index
        inTheState.splice(foundInTheState, 1);
      }
  
      setCategoryIds(inTheState);
       console.log(inTheState);
      fetchProduct({ category: inTheState });
    };
    //5. show products by star rating and when user click send number to backend
    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        })
        //reset
        setSub('')
        setPrice([0, 0]);
        setCategoryIds([])
        setStar(num)
        setBrand("")
        setColor('')
        setShipping('')
        fetchProduct({stars: num})
    }
    const showStars = () => (
       
          
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={5} />
          <Star starClick={handleStarClick} numberOfStars={4} />
          <Star starClick={handleStarClick} numberOfStars={3} />
          <Star starClick={handleStarClick} numberOfStars={2} />
          <Star starClick={handleStarClick} numberOfStars={1} />
            </div>
        )
    //6. show product by sub categories
    const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("")
    setColor('')
    setShipping('')
    fetchProduct({ sub });
  };
    //7. show products base on brand
    const showBrands = () => brands.map((b) =>
    <Radio 
    key={b}
    value={b} 
    name={b}
    checked={b=== brand}
    onChange={handleBrand}
    className="pb-1 pl-5 pr-5"
    >
       {b}   
    </Radio>
    )
    const handleBrand = (e) => {
    // console.log("SUB", sub);
    setSub('');
    dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor('')
    setShipping('')
    setBrand(e.target.value)
    
    fetchProduct({ brand: e.target.value });
    }
     //8. show products base on color
     const showColors = () => colors.map((c) =>
     <Radio 
     key={c}
     value={c} 
     name={c}
     checked={c=== color}
     onChange={handleColor}
     className="pb-1 pl-5 pr-5"
     >
        {c}   
     </Radio>)
    const handleColor = (e) => {
        // console.log("SUB", sub);
    setSub('');
    dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand('')
    setShipping('')
    setColor(e.target.value)
    
    fetchProduct({ color: e.target.value });
    }
    //9 show product base on shipping yes/ no
    const showShipping=()=> (<>
    <Checkbox
    className="pb-2 pl-4 pr-4"
    onChange={handleShippingchange}
    value="Yes"
    checked={shipping === "Yes"}
    >Yes
    </Checkbox>
    <Checkbox
    className="pb-2 pl-4 pr-4"
    onChange={handleShippingchange}
    value="No"
    checked={shipping === "No"}
    >No
    </Checkbox>
    </>)
    const handleShippingchange = (e) => {
        setSub('');
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand('')
        setColor('')
        setShipping(e.target.value)
        
        fetchProduct({ shipping: e.target.value });
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                   <h4>Search / Filter</h4>
                   <hr/>
                   <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} mode="inline">
                        {/*price*/}
                        <SubMenu
                        key="1"
                        title={
                            <span className="h6">
                            <DollarOutlined /> Price
                            </span>
                        }
                        >
                        <div>
                            <Slider
                            className="ml-4 mr-4"
                            tipFormatter={(v) => `$${v}`}
                            range
                            value={price}
                            onChange={handleSlider}  // quand user change la valeur on met à jour le prix                            
                            max="4999"
                            />
                        </div>
                        </SubMenu>
                        {/*category*/}
                        <SubMenu
                        key="2"
                        title={
                            <span className="h6">
                            <DownSquareOutlined /> Categories
                            </span>
                        }
                        >
                        <div style={{marginTtop: '-10px'}}>
                            {showCategories()}
                        </div>
                        </SubMenu>
                        {/*stars*/}
                        <SubMenu
                        key="3"
                        title={
                            <span className="h6">
                            <StarOutlined /> Rating
                            </span>
                        }
                        >
                        <div style={{marginTtop: '-10px'}}>
                            {showStars()}
                        </div>
                        </SubMenu>
                         {/* sub category */}
                        <SubMenu
                        
                        key="4"
                        title={
                            <span className="h6">
                            <DownSquareOutlined /> Sub Categories
                            </span>
                        }
                        >
                        <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                            {showSubs()}
                        </div>
                        </SubMenu>
                          {/* brands*/}
                          <SubMenu
                           
                            key="5"
                            title={
                            <span className="h6">
                            <DownSquareOutlined /> Brands
                            </span>
                        }
                        >
                        <div style={{ maringTop: "-10px" }} className=" pr-5">
                            {showBrands()}
                        </div>
                        </SubMenu>
                         {/* colors*/}
                         <SubMenu
                           
                           key="6"
                           title={
                           <span className="h6">
                           <DownSquareOutlined /> Colors
                           </span>
                       }
                       >
                       <div style={{ maringTop: "-10px" }} className=" pr-5">
                           {showColors()}
                       </div>
                       </SubMenu>
                     
                         {/* Shipping*/}
                         <SubMenu
                           
                           key="7"
                           title={
                           <span className="h6">
                           <DownSquareOutlined /> Shipping
                           </span>
                       }
                       >
                       <div style={{ maringTop: "-10px" }} className=" pr-5">
                           {showShipping()}
                       </div>
                       </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? 
                    (<h4 className="text-dangert">Loading...</h4>) 
                    : 
                    (<h4 className="text-dangert">Products</h4>)
                    }

                    {products.length < 1 && <p>No products found</p>}

                    <div className="row pb-5">
                        {products.map((p) => (
                        <div className="col-md-4 mt-3" key={p._id}>
                            <ProductCard product={p}/>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;