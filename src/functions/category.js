import axios from 'axios'


export const getCategories = async () =>  // requete envoyée au backend pour vérifier authtoken
 await axios.get(`${process.env.REACT_APP_API}/categories`); // une seule ligne pas de crochet nécessaire
  

export const getCategory = async (slug) =>  // requete envoyée au backend pour vérifier authtoken
 await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>  // chemin protégé seulement  admin-
 await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
     headers: {
        authtoken,
     }
 });

 export const updateCategory = async (slug, category, authtoken) =>  // 2eme argument : category modifiée
 await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category,{
     headers: {
        authtoken,
     }
 });

 export const createCategory = async (category, authtoken) =>  //1er argument : category a créer
 await axios.post(`${process.env.REACT_APP_API}/category`, category, {
     headers: {
        authtoken,
     }
 });

 // requete envoyée au backend pour retrouver les sous catégories associés catégorie sélectionnée
 export const getCategorySubs = async (_id) =>  
 await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);