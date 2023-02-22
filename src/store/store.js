import { configureStore } from "@reduxjs/toolkit";
import { messengerReducer } from "./slices/messages/messageSlices";
import { postsReducer } from "./slices/posts/postsSlices";
import { settingsReducer } from "./slices/setting/settingSlices";
import { usersReducer } from "./slices/users/usersSlices";

const store = configureStore({
    reducer: {
        users: usersReducer,
        messenger: messengerReducer,
        setting: settingsReducer,
        posts: postsReducer
    }
})

export default store