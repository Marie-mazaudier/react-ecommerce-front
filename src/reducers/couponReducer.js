export const couponReducer = (state = false, action) => {
    switch(action.type) {
        case "COUPON_APPLIED":
            return action.payload // envoi les nouvelles proprété au state
        default : 
            return state;
    }
}

//type payload = propriété 
//qui contient les données réelles
// dans un objet d'action Redux