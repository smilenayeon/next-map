export {default} from "next-auth/middleware";

export const config = {
    //users can access these pages only when they are authorized
    matcher:["/users/mypage", "/stores/new", "/stores/:id/edit", "/users/likes"], 
}