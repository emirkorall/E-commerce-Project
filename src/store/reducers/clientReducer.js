const initialState = {
  user: {},
  adressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
};

export const SET_USER = "SET_USER";
export const SET_ROLES = "SET_ROLES";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        adressList: action.payload.adressList || [],
        creditCards: action.payload.creditCards || [],
      };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default clientReducer; 