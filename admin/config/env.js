import { BACKEND_URI, TEST_BACKEND_URI, NODE_ENV } from "@env";

export default NODE_ENV === "dev" ? BACKEND_URI : TEST_BACKEND_URI;