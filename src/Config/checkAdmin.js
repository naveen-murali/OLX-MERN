const isAdminAccess = () => {
    const adminAccessToken = localStorage.getItem("adminAccessToken");

    if (!adminAccessToken)
        return false;
    
    return true;
}

export { isAdminAccess };