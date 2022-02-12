export const userReducer = (state = null, action) => {
    switch(action.type) {
        case "LOGGED_IN_USER":
            return action.payload // envoi les nouvelles proprété au state
        case "LOGOUT" :
            return action.payload // user : {}
        default : 
            return state;
    }
}

//type payload = propriété 
//qui contient les données réelles
// dans un objet d'action Redux