import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct,getProduct , updateProduct} from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {
    getCategories, 
    getCategorySubs,
    updateCategory,
} from '../../../functions/category'
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'

const initialState = {
  title: "",
  description: "",
  price: "",

  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({match, history}) => {
const [values, setValues] = useState(initialState);
const[categories, SetCategories] =useState([]);
 const[loading, setLoading] =useState(false)
 const[subOptions, setSubOptions] = useState([]);
 const[showSub, setShowSub] = useState(false);
 const [arrayOfSubs, setArrayOfSubs] = useState([]);
const[selectedCategory, setSelectedCategory]=useState("");
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  //router
  const{slug} = match.params
  useEffect(()=> {
   loadProduct()
   loadCategories()
}, [])

const loadProduct = () => {
  getProduct(slug).then((p) => {
    // console.log("single product", p);
    // 1 load single proudct
    setValues({ ...values, ...p.data });
    // 2 load single product category subs
    getCategorySubs(p.data.category._id).then((res) => {
      setSubOptions(res.data); // on first load, show default subs
    });
    // 3 prepare array of sub ids to show as default sub values in antd Select
    let arr = [];
    p.data.subs.map((s) => {
      arr.push(s._id);
    });
    console.log("ARR", arr);
    setArrayOfSubs((prev) => arr); // required for ant design select to work
  });
};
 const loadCategories = () => {
  getCategories()
  .then((c) => {
    SetCategories(c.data) // on met à jours les catégories
  })
}
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
     
    values.subs = arrayOfSubs // on met à jour les nouvelles infos catégories dans objet values
    values.category = selectedCategory ? selectedCategory : values.category// seulement si le user sélectionne une nouvelle catégorie
    updateProduct(slug, values, user.token)
     .then(res=> {
      setLoading(false)
      console.log(res);
      toast.success(`"${res.data.title}" is updated`)
      history.push('/admin/products')
     })
     .catch(err => {
      console.log(err);
      //  if (err.response.status === 400) toast.error(err.response.data);
      toast.error(err.response.data.err) // permet d'afficher le problème exacte depuis le controller
     })
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); // met à jour toutes les données values
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    //console.log(('Cliqued category', e.target.value))
    setValues({...values,subs: []}) 
    setSelectedCategory(e.target.value)// met à jour category sélectionné avec value ID sans modifié la categorie initiale dans la fiche produit
   // console.log(('Catégorie initial non modifiée', values.category))
    getCategorySubs(e.target.value)// on nettoie le tableau sous-categories à chq changement
    .then(res=> {
      console.log('SUB OPTIONS ON CATEGORY CLICK', res)
      setSubOptions(res.data)
    })
      setShowSub(true)
    if(values.category._id === e.target.value) { // si user revient la cateforie initiallement sélectionnée
      loadProduct()     // on remet les sous-catégories qui étaient associées
    }
    setArrayOfSubs([]) // quand on change la catégorie principal on enlève les sous categories sélectionnées

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
         {loading ? <LoadingOutlined className="text-danger h1" /> :  <h4>Product Update</h4>}
         <FileUpload 
          setValues={setValues} 
          values={values} 
          setLoading={setLoading}
         />
        
         <ProductUpdateForm 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        values={values}
        handleCategoryChange={handleCategoryChange}
        subOptions={subOptions}
     //   showSub={showSub}
        setValues={setValues}
        categories={categories}
        arrayOfSubs={arrayOfSubs}
        setArrayOfSubs={setArrayOfSubs}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        />
          <hr />      
       </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
