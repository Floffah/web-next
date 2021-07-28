import { ApiTokenName } from "../../util/storage/localstorage";

export const isLoggedIn = () =>
    typeof localStorage !== "undefined" &&
    localStorage.getItem(ApiTokenName) !== null;
