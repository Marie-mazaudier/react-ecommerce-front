import axios from 'axios'


export const createOrUpdateUser = async (authtoken) => { // requete envoyée au backend pour vérifier authtoken
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  };

  
  export const currentUser = async (authtoken) => { // requete envoyée au backend pour vérifier authtoken
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  };

    
  export const currentAdmin = async (authtoken) => { // requete envoyée au backend pour vérifier authtoken
    return await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  };