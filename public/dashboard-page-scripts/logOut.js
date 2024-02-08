function logOut() {
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/home"
    sessionStorage.removeItem("username");
}
