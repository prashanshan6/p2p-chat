function acceptFriend(email) {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/user/accept/" + email,
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
            // alert(data.status);
            let tempId =
                "#" + email.replace("@", "").replace(".", "") + "ReqDiv";
            $(tempId).html("<h4>Friend request accepted</h4>");

            socket.emit("accepted-friend", {
                friendEmail: email,
                name: data.data.name,
                token: sessionStorage.getItem("x-user-token"),
            });
        },
        error: function (e) {
            alert(e.responseText);
            console.log(e.responseText, e.responseJSON, e.status, e.statusText);
        },
        dataType: "json",
        contentType: "application/json",
    });
}
function rejectFriend(email) {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/user/reject/" + email,
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
            let tempId =
                "#" + email.replace("@", "").replace(".", "") + "ReqDiv";
            $(tempId).html("<h4>Friend request Rejected</h4>");
            // alert(data.status);
        },
        error: function (e) {
            alert(e.responseText);
            console.log(e.responseText, e.responseJSON, e.status, e.statusText);
        },
        dataType: "json",
        contentType: "application/json",
    });
}
var friendReqBtn = document.getElementById("friendRequests");

friendReqBtn.onclick = function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/user/friend_requests/",
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
            if (Object.keys(data).length != 0) {
                $(".friendRequests-modal-content").html(
                    '<span class="friendRequestsClose">&times;</span>' +
                        "<h2>Friend Requests</h2>"
                );
                let reqs = "";
                Object.keys(data).forEach((element) => {
                    reqs +=
                        '<div id="' +
                        element.replace("@", "").replace(".", "") +
                        "ReqDiv" +
                        '" class="reqs"><h2>' +
                        data[element] +
                        "</h2><button onclick=\"acceptFriend('" +
                        element +
                        "')\">Accept</button><button onclick=\"rejectFriend('" +
                        element +
                        "')\">Reject</button></div>";
                });
                $(".friendRequests-modal-content").append(reqs);
            } else {
                $(".friendRequests-modal-content").html(
                    '<span class="friendRequestsClose">&times;</span><h2>No friend requests</h2>'
                );
            }
            $(".friendRequestsClose").click(function () {
                friendReqModal.style.display = "none";
            });
        },
        error: function (e) {
            alert(e.responseText);
            console.log(e.responseText, e.responseJSON, e.status, e.statusText);
        },

        dataType: "json",
        contentType: "application/json",
    });

    friendReqModal.style.display = "block";
};

var friendReqModal = document.getElementById("friendRequestsModal");

window.onclick = function (event) {
    if (event.target == friendReqModal) {
        friendReqModal.style.display = "none";
    }
};
