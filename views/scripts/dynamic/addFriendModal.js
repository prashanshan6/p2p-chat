function sendFriendReq() {
    var friendEmail = document.getElementById("friendEmail").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/user/add_friend/" + friendEmail,
        beforeSend: function (xhr) {
            // set header if JWT is set
            if (sessionStorage.getItem("x-user-token")) {
                xhr.setRequestHeader(
                    "x-user-token",
                    sessionStorage.getItem("x-user-token")
                );
            }
        },
        success: function (data) {
            alert(data.status);
        },
        error: function (e) {
            alert(e.responseText);
            console.log(e.responseText, e.responseJSON, e.status, e.statusText);
        },

        dataType: "json",
        contentType: "application/json",
    });
}

var modal = document.getElementById("addFriendModal");
var btn = document.getElementById("addFriend");
var span = document.getElementsByClassName("addFriendClose")[0];
btn.onclick = function () {
    modal.style.display = "block";
};
span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
