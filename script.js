var userData;
var bookings;
var markedBooking;
var allBookings;
$(document).ready(function () {
    var currentUser = sessionStorage.getItem("loggedIn");
    markedBooking = [];
    $("td").click(function () {
        if (sessionStorage.getItem("loggedIn") !== null) {
            if (markedBooking.length < 5 && checkTotalBookingsForUser(currentUser) < 5) {
                $(this).css("background-color", "blue");
            }
            var col = $(this).parent().children().index($(this));
            bookTime($(this).text(), $("th").eq(col + 1).text());
        }
    });


    if (localStorage.getItem("storedUserData") === null) {
        userData = [];
    }
    else {
        userData = JSON.parse(localStorage.getItem("storedUserData"));
    }

    if (sessionStorage.getItem("loggedIn") !== null) {
        $("#loginStatus").text("Inloggad som: " + sessionStorage.getItem("loggedIn"));
        $("#numberOfBookings").text("Antal bokningar: " + checkTotalBookingsForUser(currentUser) + " av 5");
    }
    else {
        $("#loginStatus").text("Inte inloggad");

        $("#numberOfBookings").text("");
    }
    makeBookedTimesInactive();
});


function logOut() {
    sessionStorage.clear();
    location.reload();
}

function createAccount() {
    var data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    if (userData.findIndex(i => i.email === $("#email").val()) == -1) {
        userData.push(data);
        localStorage.setItem("storedUserData", JSON.stringify(userData));
        console.log(userData);
    }

    else {
        alert("User already exist");
    }
}

function login() {
    if (userData.findIndex(i => i.email === $("#emailLogin").val()) != -1) {
        var currentIndex = userData.findIndex(i => i.email === $("#emailLogin").val());
        if (userData[currentIndex].password === $("#passwordLogin").val()) {
            sessionStorage.setItem("loggedIn", userData[currentIndex].email);
            location.reload();
        }
        else {
            console.log("Incorrect password");
        }
    }
    else {
        console.log("Incorrect information");
    }
}

function bookTime(cellText, cellColumn) {
    var currentWeek = $("#week").text();
    var currentUser = sessionStorage.getItem("loggedIn");
    var schema = {
        week: currentWeek,
        day: cellColumn,
        time: cellText,
        booked: true,
        bookedBy: currentUser
    }
    if (markedBooking.length < 5 && containsObject(JSON.stringify(schema), markedBooking) === false && checkTotalBookingsForUser(currentUser) < 6) {
        markedBooking.push(schema);
    }
    else {
        alert("Too many bookings");
    }
}

function checkTotalBookingsForUser(currentUser) {

    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
    var bookings = 0;

    allBookings.forEach(element => {
        if (element.bookedBy === currentUser) {
            bookings++;
        }
    });
    return bookings;
}

function containsObject(schema, markedBooking) {
    var i;
    for (i = 0; i < markedBooking.length; i++) {
        if (JSON.stringify(markedBooking[i]) === schema) {
            return true;
        }
    }
    return false;
}

function commitBookings() {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }

    markedBooking.forEach(element => {
        allBookings.push(element);
    });

    localStorage.setItem("storedBookings", JSON.stringify(allBookings));
    location.reload();
}

function makeBookedTimesInactive() {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }

    $("td").each(function () {
        var textValue = $(this).text();
        var col = $(this).parent().children().index($(this));
        var colText = $("th").eq(col + 1).text();

        allBookings.forEach(element => {
            if (element.time === textValue && element.day === colText) {
                $(this).addClass("alreadyBooked");
            }
        });
    });
}
