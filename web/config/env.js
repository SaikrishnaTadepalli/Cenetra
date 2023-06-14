import { BACKEND_URI, TEST_BACKEND_URI } from "@env";

export default __DEV__ ? BACKEND_URI : TEST_BACKEND_URI;
