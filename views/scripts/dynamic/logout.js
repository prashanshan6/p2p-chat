$("#logout").click(() => {
    sessionStorage.removeItem("x-user-token");
    window.location = "/api/user/login.html";
});
