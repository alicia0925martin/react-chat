import authReducer from "./slices/authSlice"
import configReducer from "./slices/configSlice"
import chatReducer from "./slices/chatSlice";

const rootReducer = {
    auth: authReducer,
    config: configReducer,
    chats: chatReducer,
}

export default rootReducer;