export const drawerReducer = (state = false, action) => {
    switch(action.type) {
        case "SET_VISIBLE":
            return action.payload // envoi les nouvelles proprété au state
        default : 
            return state;
    }
}