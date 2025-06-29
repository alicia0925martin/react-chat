import authReducer from "./slices/authSlice"
import configReducer from "./slices/configSlice"


const rootReducer = {
    auth: authReducer,
    config: configReducer,
}

export default rootReducer;