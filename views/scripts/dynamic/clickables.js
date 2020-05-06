function deleteConvo(email) {
    email = email.replace("@", "").replace(".", "");
    let chatMsgsList = email + "ChatMsgsList";
    $("#" + chatMsgsList).empty();
}
function makeConvoActive(email) {
    $(".defaultBackground").removeClass("active");

    let convoDiv = email + "ConvoDiv";
    $(".conversation").removeClass("active");
    $("#" + convoDiv).toggleClass("active");

    let chatTitle = email + "ChatTitleDiv";
    $(".chat-title").removeClass("active");
    $("#" + chatTitle).toggleClass("active");

    let chatMsgsList = email + "ChatMsgsList";
    $(".chat-message-list").removeClass("active");
    $("#" + chatMsgsList).toggleClass("active");

    let chatFormDiv = email + "ChatForm";
    $(".chat-form").removeClass("active");
    $("#" + chatFormDiv).toggleClass("active");
}
function makeOnline(email) {
    email = email.replace("@", "").replace(".", "");
    const chatForm = email + "ChatForm";
    const divName = email + "ConvoDiv";

    if (!$("#" + divName + " .fas").hasClass("online"))
        $("#" + divName + " .fas").toggleClass("online");

    $("#" + chatForm + " input").prop("disabled", false);
    $("#" + chatForm + " input").attr("placeholder", "type a message : ");
}
function makeOffline(email) {
    email = email.replace("@", "").replace(".", "");
    const chatForm = email + "ChatForm";
    const divName = email + "ConvoDiv";

    if ($("#" + divName + " .fas").hasClass("online"))
        $("#" + divName + " .fas").toggleClass("online");

    $("#" + chatForm + " input").prop("disabled", true);
    $("#" + chatForm + " input").attr(
        "placeholder",
        "you cannot send messages when friend is offline"
    );
}
let init_peers = {};
let simple_peers = {};
// array of online friends sent during initiaion

// add new line character every 40 characters
function addNewLines(str) {
    return str.replace(/(?!$|\n)([^\n]{40}(?!\n))/g, "$1\n");
}

let moment = window.moment;
function sendMessage(email) {
    let divStr = email.replace("@", "").replace(".", "");
    let chatMsgsList = divStr + "ChatMsgsList";
    let chatForm = divStr + "ChatForm";
    let messageString = $("#" + chatForm + " input:text").val();
    // add new line characters

    if (messageString.length == 0) return null;

    messageString = addNewLines(messageString);

    if (email in init_peers) init_peers[email].send(messageString);
    else if (email in simple_peers) simple_peers[email].send(messageString);

    let time = moment().format("MMM DD hh:mm");
    let msgHtml =
        '<div class="message-row you-message"><div class="message-content"> <div class="message-text">' +
        messageString +
        '</div><div class="message-time">' +
        time +
        "</div></div></div>";

    $("#" + chatMsgsList).prepend(msgHtml);
    $("#" + chatForm + " input:text").val("");

    let convoDivStr = email.replace("@", "").replace(".", "") + "ConvoDiv";
    $("#" + convoDivStr + " .created-date").html(time.slice(-5));
    $("#" + convoDivStr + " .conversation-message").html(
        messageString.slice(0, 20) + "..."
    );
}

function recievedMessage(email, messageString) {
    let divStr = email.replace("@", "").replace(".", "");
    let chatMsgsList = divStr + "ChatMsgsList";
    let chatForm = divStr + "ChatForm";

    // add new line characters
    if (messageString.length == 0) return null;
    messageString = addNewLines(messageString);

    let time = moment().format("MMM DD hh:mm");
    let msgHtml =
        '<div class="message-row other-message"><div class="message-content"> <img src="./img/chatApp/avatarM.png" width="45px"/><div class="message-text">' +
        messageString +
        '</div><div class="message-time">' +
        time +
        "</div></div></div>";

    $("#" + chatMsgsList).prepend(msgHtml);
    $("#" + chatForm + " input:text").val("");

    let convoDivStr = email.replace("@", "").replace(".", "") + "ConvoDiv";
    $("#" + convoDivStr + " .created-date").html(time.slice(-5));
    $("#" + convoDivStr + " .conversation-message").html(
        messageString.slice(0, 18) + "..."
    );
}
