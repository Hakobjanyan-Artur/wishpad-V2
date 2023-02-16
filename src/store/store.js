import { configureStore } from "@reduxjs/toolkit";
import { messengerReducer } from "./slices/messages/messageSlices";
import { settingsReducer } from "./slices/setting/settingSlices";
import { usersReducer } from "./slices/users/usersSlices";

const store = configureStore({
    reducer: {
        users: usersReducer,
        messenger: messengerReducer,
        setting: settingsReducer
    }
})

export default store