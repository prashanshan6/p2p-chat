for (var i = 0; i < 40; i++) {
    var left_pos = Math.random() * 100;
    var top_pos = Math.random() * 100;
    $("body").append(
        '<img src="./img/golden-star.png" height="10" class=' + i + ">"
    );

    $("." + i + "").addClass("golden-star");
    $("." + i + "")
        .css({
            position: "absolute",
            top: top_pos + "%",
            left: left_pos + "%"
        })
        .show();
    // console.log(top_pos, left_pos);
}

// /////////////////////////////////////////////
for (var i = 40; i < 80; i++) {
    var left_pos = Math.random() * 100;
    var top_pos = Math.random() * 100;
    $("body").append(
        '<img src="./img/silver-star.png" height="10" class=' + i + ">"
    );

    $("." + i + "")
        .css({
            position: "absolute",
            top: top_pos + "%",
            left: left_pos + "%"
        })
        .show();

    // console.log(top_pos, left_pos);
}

// /////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////

var pos_arr = [];
var flag = 0;

$("body").append(
    '<img src="./img/astranaut-light.png" height="20%" class=' + 00 + ">"
);
var left_pos = Math.random() * 90;
var top_pos = Math.random() * 80;
$("." + 00 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();
pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/planet1.png" height="20%" class=' + 01 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 01 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/planet2.png" height="20%" class=' + 02 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 02 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////
$("body").append('<img src="./img/sat.png" height="20%" class=' + 03 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 03 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////
$("body").append('<img src="./img/rocket.png" height="20%" class=' + 04 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 04 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/sun.png" height="20%" class=' + 05 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 05 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/earth.png" height="20%" class=' + 06 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 06 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/planet3.png" height="20%" class=' + 07 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 07 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////

$("body").append('<img src="./img/planet4.png" height="20%" class=' + 08 + ">");
while (true) {
    left_pos = Math.random() * 90;
    top_pos = Math.random() * 80;
    flag = 0;
    pos_arr.forEach(element => {
        if (top_pos > element[0] - 25 && top_pos < element[0] + 25) {
            if (left_pos > element[1] - 20 && left_pos < element[1] + 20) {
                flag = 1;
            }
        }
    });

    if (flag == 0) break;
}

$("." + 08 + "")
    .css({
        position: "absolute",
        top: top_pos + "%",
        left: left_pos + "%"
    })
    .show();

pos_arr.push([top_pos, left_pos]);
// //////////////////////////////////////////////////////////////////////////////////////////
