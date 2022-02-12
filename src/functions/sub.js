import axios from 'axios'


export const getSubs = async () =>  // requete envoyée au backend pour vérifier authtoken
 await axios.get(`${process.env.REACT_APP_API}/subs`); // une seule ligne pas de crochet nécessaire
  

export const getSub = async (slug) =>  // requete envoyée au backend pour vérifier authtoken
 await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>  // chemin protégé seulement  admin-
 await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
     headers: {
        authtoken,
     }
 });

 export const updateSub = async (slug, sub, authtoken) =>  // 2eme argument : sub modifiée
 await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub,{
     headers: {
        authtoken,
     }
 });

 export const createSub = async (sub, authtoken) =>  //1er argument : sub a créer
 await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
     headers: {
        authtoken,
     }
 });
