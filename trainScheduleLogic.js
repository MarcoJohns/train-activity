// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDPoctDCclY9xkjZTvo7Lx1S4dxpX3kNyQ",
    authDomain: "train-times-cabe6.firebaseapp.com",
    databaseURL: "https://train-times-cabe6.firebaseio.com",
    projectId: "train-times-cabe6",
    storageBucket: "",
    messagingSenderId: "396189922761"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var tName = $("#train-name-input").val().trim();
    var tDes = $("#destination-input").val().trim();
    var tArrival = moment($("#first-arrival-input").val().trim(), "MM/DD/YYYY").format("X");
    var tFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: tName,
        destination: tDes,
        arrival: tArrival,
        frequency: tFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.arrival);
    console.log(newTrain.frequency);

    // alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-arrival-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding tain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDes = childSnapshot.val().destination;
    var tArrival = childSnapshot.val().arrival;
    var tFreq = childSnapshot.val().frequency;

    // Train Info
    console.log(tName);
    console.log(tDes);
    console.log(tArrival);
    console.log(tFreq);

    // Prettify the Train start
    var tArrivalPretty = moment.unix(tArrival).format("HH:mm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked

    // 
    var empMonths = moment().diff(moment(etArrival, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDes),
        $("<td>").text(tArrivalPretty),
        $("<td>").text(empMonths),
        $("<td>").text(tFreq),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);

    
});



// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));