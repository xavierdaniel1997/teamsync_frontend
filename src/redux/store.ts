import {configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import workspaceReducer from "./workspaceSlice";
import projectReducer from "./projectSlice"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const workspacePersistConfig = {
    key: 'workspace',
    storage,
    whitelist: ['selectWorkspaceId', 'selectWorkspace']
  };

const projectPersistConfig = {
    key: 'project',
    storage,
    whitelist: ['selectedProject', 'selectedProjectId']
}

const persistedReducer = persistReducer(persistConfig, authReducer);
const workspacePersistedReducer =  persistReducer(workspacePersistConfig, workspaceReducer)
const projectPersistedReducer = persistReducer(projectPersistConfig, projectReducer)
const store = configureStore({
    reducer: {
        auth: persistedReducer,
        workspace: workspacePersistedReducer,
        project: projectPersistedReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
})

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
