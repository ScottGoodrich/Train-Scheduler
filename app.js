var firebaseConfig = {
    apiKey: "AIzaSyD7-dC-cv4AOk-dEoWMG-CnKzvvDwTZWSA",
    authDomain: "fir-intro-76151.firebaseapp.com",
    databaseURL: "https://fir-intro-76151.firebaseio.com",
    projectId: "fir-intro-76151",
    storageBucket: "",
    messagingSenderId: "572928853975",
    appId: "1:572928853975:web:f336efac7260b627"
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTime = 0;
  var frequency = "";
  var minAway = 0;

  // var currentTime = moment();
  // var firstTimeAdj = moment(firstTime, "HH:mm").subtract(1, "years");
  //   console.log("FIRST TIME ADJUSTED: " + firstTimeAdj);
  // var timeDiff = moment().diff(moment(firstTimeAdj), "minutes");
  //   console.log("DIFFERENCE IN TIME: " + timeDiff);
  // var remainder = timeDiff % frequency;
  //   console.log("REMAINDER: " + remainder);
  // var minAway = frequency - remainder;
  //   console.log("MINUTES TILL TRAIN: " + minAway);
  // var nextArrival = moment().add(minAway, "minutes");
  //   console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));


  $("#submit").on ("click", function() {
      event.preventDefault();

      name = $("#train-name").val().trim();
      destination = $("#train-dest").val().trim();
      firstTime = $("#train-first").val().trim();
      frequency = $("#train-freq").val().trim();

      database.ref().set({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
      });
      $("#train-name").val("");
      $("#train-dest").val("");
      $("#train-first").val("");
      $("#train-freq").val("");
  });
  database.ref().on("value", function(snapshot) {
      var snap = snapshot.val();

      console.log(snap.name);
      console.log(snap.destination);
      console.log(snap.firstTime);
      console.log(snap.frequency);

      currentTime = moment();
      frequency = snap.frequency;
      var firstTimeAdj = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log("FIRST TIME ADJUSTED: " + firstTimeAdj);
      var timeDiff = moment().diff(moment(firstTimeAdj), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDiff);
      var remainder = timeDiff % frequency;
        console.log("REMAINDER: " + remainder);
      var minAway = frequency - remainder;
        console.log("MINUTES TILL TRAIN: " + minAway);
      var nextArrival = currentTime.add(minAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

      var newRow = "<tr><td>" + snap.name + "</td><td>" + snap.destination + 
        "</td><td>" + snap.frequency + "</td><td>" + nextArrival.format("HH:mm") + "</td><td>" + minAway + "</td></tr>"

      $("#sched-table").append(newRow);
      
  }), function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  }