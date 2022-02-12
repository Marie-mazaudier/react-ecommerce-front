import React from "react";
import { Select } from 'antd';
//destructure
const {Option} = Select

const ProductUpdateForm = ({ //props
  handleSubmit, 
  handleChange, 
  handleCategoryChange, 
  values,
  //showSub,
  subOptions,
  categories,
  setValues,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory
}) => {
  // destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
        value={shipping === 'Yes'? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
         
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select 
        value={color}
        name="color" 
        className="form-control" 
        onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
     
      <div className="form-group">
        <label>Brand</label>
        <select 
        value={brand}
        name="brand" 
        className="form-control" 
        onChange={handleChange}>
         
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
                <label>Category</label>
                <select name="category" 
                className="form-control" 
                onChange={handleCategoryChange}
                value={selectedCategory ? selectedCategory: category._id}
                >{/* Si le user sélectionne un autre catégorie on l'affiche, sinon on affiche l'original*/ }
                
                   {
                       categories.length > 0 && 
                       categories.map((c) => (
                       <option key={c._id} value={c._id}>
                           {c.name}
                       </option>)
                       )
                   }
                </select>

            </div>
            <div> {/* on affiche sous category quand showsub = true*/}
               <label>Sub Categories</label>
               <Select // antdesign component voir doc
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                value={arrayOfSubs} //{subs} => c'est un object dans DDB et ne fonctionne pas avec Antdesign--->ées et on met à jour le tableau subs
                onChange={value=> //console.log(value) on obtient les is des subs sélectionnées et on met à jour le tableau subs
                    setArrayOfSubs(value)} // on remplit le tableau subs qu'on va envoyé au backend
               >
                 {subOptions.length && subOptions.map((s) => (
                    <Option 
                    key={s._id} 
                    value={s._id}>
                     {s.name}
                    </Option>
                 ))}
                  
               </Select>   
            </div>
                 
            <br/>
        <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
