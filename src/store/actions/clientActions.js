import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from "../reducers/clientReducer";

export const setUser = (user, adressList = [], creditCards = []) => ({
  type: SET_USER,
  payload: {
    user,
    adressList,
    creditCards
  }
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

