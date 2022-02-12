let initialState = []

// load cart items from local storage
if(typeof window !== "undefined") {
    if(localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'))
    } else {
        initialState = []
    }
}
export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return action.payload // envoi les nouvelles proprété au state
        default : 
            return state;
    }
}

//type payload = propriété 
//qui contient les données réelles
// dans un objet d'action Redux