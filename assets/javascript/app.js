$(document).ready(function () {
    // Your web app's Firebase configuration
    var config = {
        apiKey: "AIzaSyCC8qE0LPCxN9sgQsw1eIWiI0PzWrCm54M",
        authDomain: "train-time-sheet-hw.firebaseapp.com",
        databaseURL: "https://train-time-sheet-hw.firebaseio.com",
        projectId: "train-time-sheet-hw",
        storageBucket: "",
        messagingSenderId: "585815854157",
        appId: "1:585815854157:web:3ae435faee55d4d1"
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    var database = firebase.database();
    $("#addTrain").on("click", function (event) {
        event.preventDefult();

        var trnName = $("#trainName").val().trim();
        var trnDest = $("#destination").val().trim();
        var frstTrn = $("#firstTrain").val().trim();
        var trnFrqu = $("#frequency").val().trim();

        console.log(trnName);
        console.log(trnDest);
        console.log(frstTrn);
        console.log(trnFrqu);

        var newTrn = {
            name: trnName,
            dest: trnDest,
            first: frstTrn,
            frequ: trnFrqu
        };
        database.ref().push(newTrn);


        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var trnName = childSnapshot.val().name;
        var trnDest = childSnapshot.val().dest;
        var frstTrn = childSnapshot.val().first;
        var trnFrqu = childSnapshot.val().frequ;

        console.log(trnName);
        console.log(trnDest);
        console.log(frstTrn);
        console.log(trnFrqu);

        var firstTimeConverted = moment(frstTrn, "HH:mm");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % trnFrqu;
        var tMinutesTillTrain = trnFrqu - tRemainder;
        var nextTrain = moment(currentTime).add(tMinutesTillTrain, "minutes");
    });
});