import api from "./api";
import sessionSlice from "./session/sessionSlice";

export default {
  session: sessionSlice,
  [api.reducerPath]: api.reducer,
};
