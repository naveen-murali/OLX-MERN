export const reducer = (state, action) => {
    if (action.type === "LOGIN") {
        const { user, userAccessToken } = action.payload;
        
        localStorage.setItem("userAccessToken", userAccessToken);
        localStorage.setItem("user", JSON.stringify(user));

        return state;
    }
    
    if (action.type === "LOGOUT") {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("user");
        return { ...state };
    }

    if (action.type === "ADMIN_LOGIN") {
        const { admin, adminAccessToken } = action.payload;
        
        localStorage.setItem("adminAccessToken", adminAccessToken);
        localStorage.setItem("admin", JSON.stringify(admin));

        return state;
    }

    if (action.type === "ADMIN_LOGOUT") {
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("admin");
        return { ...state };
    }
}