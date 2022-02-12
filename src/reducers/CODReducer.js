export const CODReducer = (state = false, action) => {
  switch(action.type) {
      case "COD"://CASH ON DELIVERY
          return action.payload // envoi les nouvelles proprété au state
      default : 
          return state;
  }
}
