export const searchReducer = (state = {text:""}, action) => {
    switch(action.type) {
        case "SEARCH_QUERY": // search query = action type
            return {...state, ...action.payload} // envoi les nouvelles proprété au state  avec le texte
        default : 
            return state;
    }
}

//type payload = propriété 
//qui contient les données réelles
// dans un objet d'action Redux