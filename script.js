var userData;
var bookings;
var markedBooking;
var allBookings;
$(document).ready(function () {
    var currentUser = sessionStorage.getItem("loggedIn");
    markedBooking = [];
    $("td").click(function () {
        if($(this).attr("class")==="alreadyBooked"){
            var currentId=$(this).attr("id");
            displayModal(currentId);
        }

        else if($(this).attr("class")==="currentUserBooked"){
            var currentId=$(this).attr("id");
            displayModal(currentId);
        }

        else{
        if (sessionStorage.getItem("loggedIn") !== null) {
            var col = $(this).parent().children().index($(this));
            if (bookTime($(this).text(), $("th").eq(col + 1).text()) === true) {
                $(this).toggleClass("tempSelected");
            }
        }
    }
    });


    if (localStorage.getItem("storedUserData") === null) {
        userData = [];
    }
    else {
        userData = JSON.parse(localStorage.getItem("storedUserData"));
    }

    if (sessionStorage.getItem("loggedIn") !== null) {
        $("#loginStatus").text("Inloggad som: " + currentUser);
        $("#numberOfBookings").css("display", "inline");
        $("#numberOfBookings").text("Antal bokningar: " + checkTotalBookingsForUser(currentUser) + " av 5");
        $("#email").css("display","none");
        $("#password").css("display","none");
        $("#createAccount").css("display","none");
        $("#emailLogin").css("display","none");
        $("#passwordLogin").css("display","none");
        $("#loginBtn").css("display","none");
    }
    else {
        $("#loginStatus").text("Inte inloggad");
        $("#numberOfBookings").css("display", "none");
        $("#numberOfBookings").text("");
    }
    makeBookedTimesInactive();
});

function displayModal(currentId){
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
    console.log(allBookings[currentId].bookedBy);
}


function logOut() {
    sessionStorage.clear();
    location.reload();
}

function createAccount() {
    var data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    if ((userData.findIndex(i => i.email === $("#email").val()) == -1) && sessionStorage.getItem("currentlyLoggedIn") !== "true") {
        userData.push(data);
        localStorage.setItem("storedUserData", JSON.stringify(userData));
        console.log(userData);
    }
    else if (sessionStorage.getItem("currentlyLoggedIn") === "true") {
        alert("Can not create new account while logged in.")
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
            sessionStorage.setItem("currentlyLoggedIn", "true");
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
    if ((markedBooking.length < 5) && (containsObject(JSON.stringify(schema), markedBooking) === false) && (checkTotalBookingsForUser(currentUser) < 5) && ((markedBooking.length + checkTotalBookingsForUser(currentUser) < 5))) {
        markedBooking.push(schema);
        return true;
    }
    else if (containsObject(JSON.stringify(schema), markedBooking) === true) {
        var i;
        for (i = 0; i < markedBooking.length; i++) {
            if (JSON.stringify(markedBooking[i]) === JSON.stringify(schema)) {
                markedBooking.splice(i, 1);
<<<<<<< HEAD
                i == markedBooking.length;
=======
               i == markedBooking.length;
>>>>>>> 48d8e1bebd94eed10c9a55449569abc4da7f2d60
            }
        }
        console.log("removed");
        return true;
    }
    else {
        alert("Too many bookings");
        return false;
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
    var currentUser = sessionStorage.getItem("loggedIn");

    if (checkTotalBookingsForUser(currentUser) < 6) {
        markedBooking.forEach(element => {
            allBookings.push(element);
        });

        localStorage.setItem("storedBookings", JSON.stringify(allBookings));
        location.reload();
    }
    else {
    }
}

function makeBookedTimesInactive() {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
<<<<<<< HEAD
    var currentUser = sessionStorage.getItem("loggedIn");
=======
    var currentUser=sessionStorage.getItem("loggedIn");
>>>>>>> 48d8e1bebd94eed10c9a55449569abc4da7f2d60

    $("td").each(function () {
        var currentTDElement = $(this);
        var textValue = $(this).text();
        var col = $(this).parent().children().index($(this));
        var colText = $("th").eq(col + 1).text();

<<<<<<< HEAD
        allBookings.forEach(function (value, i) {
            if (value.time === textValue && value.day === colText && value.bookedBy !== currentUser) {
                currentTDElement.addClass("alreadyBooked");
                currentTDElement.attr("id", i);

            }
            else if (value.time === textValue && value.day === colText && value.bookedBy === currentUser) {
                currentTDElement.addClass("currentUserBooked");
                currentTDElement.attr("id", i);
=======
        allBookings.forEach(element => {
            if (element.time === textValue && element.day === colText && element.bookedBy!==currentUser) {
                $(this).addClass("alreadyBooked");
>>>>>>> 48d8e1bebd94eed10c9a55449569abc4da7f2d60
            }
            else if (element.time === textValue && element.day === colText && element.bookedBy===currentUser){
                $(this).addClass("currentUserBooked");
            }
        });
    });
}
