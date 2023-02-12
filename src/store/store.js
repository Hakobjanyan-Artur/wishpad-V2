import { configureStore } from "@reduxjs/toolkit";
import { messengerReducer } from "./slices/messages/messageSlices";
import { usersReducer } from "./slices/users/usersSlices";

const store = configureStore({
    reducer: {
        users: usersReducer,
        messenger: messengerReducer
    }
})

export default store