import { makerStore } from "./makerStore";
import { loginStore } from "./loginStore";

const useStore = () => {
    return { makerStore, loginStore }
};

export default useStore;