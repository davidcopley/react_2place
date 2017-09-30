export const setLocale = locale => ({type:"setLocale",locale})
export const setZh = () => dispatch => dispatch(setLocale("zh"))
export const setEn = () => dispatch => dispatch(setLocale("en"))