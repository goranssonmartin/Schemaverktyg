var userData;
var bookings;
var markedBooking;
var allBookings;
var tdToChange;
$(document).ready(function () {
    var currentUser = sessionStorage.getItem("loggedIn");
    markedBooking = [];
    $("td").click(function () {
        if ($(this).attr("class") === "alreadyBooked") {
            var currentId = $(this).attr("id");
            var yourBooking = false;
            if (markedBooking.length === 0) {
                displayModal(currentId, yourBooking);
            }
        }

        else if ($(this).attr("class") === "currentUserBooked") {
            var currentId = $(this).attr("id");
            var yourBooking = true;
            if (markedBooking.length === 0) {
                displayModal(currentId, yourBooking);
                tdToChange = currentId;
                $(this).css("background", "pink");
            }
        }

        else {
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
        $("#email").css("display", "none");
        $("#password").css("display", "none");
        $("#createAccountBtn").css("display", "none");
        $("#emailLogin").css("display", "none");
        $("#passwordLogin").css("display", "none");
        $("#loginBtn").css("display", "none");
        $("#topBr").css("display", "none");
        $("#logOutBr").css("display", "none");
    }
    else {
        $("#loginStatus").text("Inte inloggad");
        $("#numberOfBookings").css("display", "none");
        $("#numberOfBookings").text("");
        $("#logOutBtn").css("display", "none");
    }
    setExpiredBookingsToTrue();
    makeBookedTimesInactive();
});

function createAccount() {
    if ($("#email").val() !== "" && $("#password").val() !== "") {
        var data = {
            email: $("#email").val(),
            password: $("#password").val()
        }

        if ((userData.findIndex(i => i.email === $("#email").val()) == -1)) {
            userData.push(data);
            localStorage.setItem("storedUserData", JSON.stringify(userData));
        }
        else {
            alert("Det finns redan en användare med den mailadressen");
        }
    }
    else {
        alert("Skriv in något");
    }
}

function displayModal(currentId, yourBooking) {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
    $("#bookedBy").text("Bokad av: " + allBookings[currentId].bookedBy);
    $("#time").text("Tid för bokning: " + allBookings[currentId].time);
    $("#day").text("Dag för bokning: " + allBookings[currentId].day);
    $("#weekModal").text("Vecka för Bokning: " + allBookings[currentId].week);

    if (yourBooking) {
        if (!document.getElementById("modal").contains(document.getElementById("removeBookingButton")) && allBookings[currentId].expiredBooking === false) {
            var unbookButton = document.createElement("button");
            unbookButton.onclick = removeBooking;
            unbookButton.innerText = "Avboka";
            unbookButton.id = "removeBookingButton";
            $("#modalContent").append(unbookButton);
        }
        $("#modal").css("display", "block");
    }
    else {
        var button = $("#removeBookingButton");
        button.remove();
        $("#modal").css("display", "block");
    }
}

function removeBooking() {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
    allBookings.splice(tdToChange, 1);
    localStorage.setItem("storedBookings", JSON.stringify(allBookings));
    tdToChange = null;
    location.reload();
}

function closeModal() {
    location.reload();
}

function logOut() {
    sessionStorage.clear();
    location.reload();
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


function setExpiredBookingsToTrue() {
    if (localStorage.getItem("storedBookings") === null) {
        allBookings = [];
    }
    else {
        allBookings = JSON.parse(localStorage.getItem("storedBookings"));
    }
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentDay = currentDate.getDay();
    var currentWeek;
    var currentTime = currentDate.getHours();
    var storedDay;
    var storedYear;
    var storedWeek;
    var storedTime;

    var currentMonth = currentDate.getMonth();

    switch (currentMonth) {

        case 0:
            currentWeek = currentDate.getDate() / 7;
            break;
        case 1:
            currentWeek = (currentDate.getDate() + 31) / 7;
            break;
        case 2:
            currentWeek = (currentDate.getDate() + 31 + 28) / 7;
            break;
        case 3:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31) / 7;
            break;
        case 4:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30) / 7;
            break;
        case 5:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31) / 7;
            break;
        case 6:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30) / 7;
            break;
        case 7:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31) / 7;
            break;
        case 8:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31) / 7;
            break;
        case 9:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30) / 7;
            break;
        case 10:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31) / 7;
            break;
        case 11:
            currentWeek = (currentDate.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30) / 7;
            break;
    }

    currentWeek = Math.ceil(currentWeek);
    allBookings.forEach(element => {
        storedYear = element.year;
        storedWeek = element.week;
        storedTime = element.time;
        var compareStoredTime = "";
        for (var i = 0; i < storedTime.length; i++) {
            if (storedTime[i] !== "0" && storedTime[i] !== ":") {
                compareStoredTime = compareStoredTime + storedTime[i];
            }
        }
        var newCompareStoredTime = parseInt(compareStoredTime);
        switch (element.day) {
            case "Måndag":
                storedDay = 1;
                break;
            case "Tisdag":
                storedDay = 2;
                break;
            case "Onsdag":
                storedDay = 3;
                break;
            case "Torsdag":
                storedDay = 4;
                break;
            case "Fredag":
                storedDay = 5;
                break;
        }
        if (storedDay <= currentDay && storedYear <= currentYear && storedWeek <= currentWeek && newCompareStoredTime <= currentTime) {
            element.expiredBooking = true;
            localStorage.setItem("storedBookings", JSON.stringify(allBookings));
        }
    });


}

function bookTime(cellTime, colDay) {
    var currentWeek = $("#week").text();
    var currentYear = $("#year").text();
    var currentUser = sessionStorage.getItem("loggedIn");
    var schema = {
        week: currentWeek,
        day: colDay,
        time: cellTime,
        year: currentYear,
        bookedBy: currentUser,
        expiredBooking: false
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
                i == markedBooking.length;
            }
        }
        console.log("Markerad bokning borttagen");
        return true;
    }
    else {
        alert("För många bokningar");
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
        if (element.bookedBy === currentUser && element.expiredBooking !== true) {
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

function nextWeek() {
    markedBooking = [];
    var week = $("#week").text();
    var year = $("#year").text();
    if (week++ < 53) {
        $("#week").text(week);
    }
    else {
        week = 1;
        year++;
        $("#week").text(week);
        $("#year").text(year);
    }
    makeBookedTimesInactive();
}

function previousWeek() {
    markedBooking = [];
    var week = $("#week").text();
    var year = $("#year").text();
    if (week-- > 1) {
        $("#week").text(week);
    }
    else {
        week = 53;
        year--;
        $("#week").text(week);
        $("#year").text(year);
    }
    makeBookedTimesInactive();
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
    var currentUser = sessionStorage.getItem("loggedIn");
    var currentWeek = $("#week").text();
    var currentYear = $("#year").text();

    $("td").each(function () {
        var currentTDElement = $(this);
        var textValue = $(this).text();
        var col = $(this).parent().children().index($(this));
        var colText = $("th").eq(col + 1).text();

        currentTDElement.removeClass();
        currentTDElement.removeAttr("id");

        allBookings.forEach(function (value, i) {
            if (value.time === textValue && value.day === colText && value.bookedBy !== currentUser && value.week === currentWeek && value.year === currentYear) {
                currentTDElement.addClass("alreadyBooked");
                currentTDElement.attr("id", i);

            }
            else if (value.time === textValue && value.day === colText && value.bookedBy === currentUser && value.week === currentWeek && value.year === currentYear) {
                currentTDElement.addClass("currentUserBooked");
                currentTDElement.attr("id", i);
            }
        });
    });
}
function currentWeek() {
    var cDay = new Date();
    var currentMonth = cDay.getMonth();
    var currentWeek;

    switch (currentMonth) {

        case 0:
            currentWeek = cDay.getDate() / 7;
            break;
        case 1:
            currentWeek = (cDay.getDate() + 31) / 7;
            break;
        case 2:
            currentWeek = (cDay.getDate() + 31 + 28) / 7;
            break;
        case 3:
            currentWeek = (cDay.getDate() + 31 + 28 + 31) / 7;
            break;
        case 4:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30) / 7;
            break;
        case 5:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31) / 7;
            break;
        case 6:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30) / 7;
            break;
        case 7:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31) / 7;
            break;
        case 8:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31) / 7;
            break;
        case 9:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30) / 7;
            break;
        case 10:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31) / 7;
            break;
        case 11:
            currentWeek = (cDay.getDate() + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30) / 7;
            break;


    }
}