const isUserAccess = () => {
    const userAccessToken = localStorage.getItem("userAccessToken");

    if (!userAccessToken)
        return false;
    
    return true;
}

export { isUserAccess };