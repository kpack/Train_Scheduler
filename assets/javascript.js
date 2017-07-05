//set up variables
// connect to firebase
//add inputs
//


var config = {
    apiKey: "AIzaSyB6fr-v1IuJIf5GYcu4k-LwdV5Wn29pKDM",
    authDomain: "bootcampproject-abf19.firebaseapp.com",
    databaseURL: "https://bootcampproject-abf19.firebaseio.com",
    projectId: "bootcampproject-abf19",
    storageBucket: "bootcampproject-abf19.appspot.com",
    messagingSenderId: "375666788650"
  };
  firebase.initializeApp(config);

var url = (config.databaseURL);
var dataRef = Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';

console.log(dataRef)
console.log(url)

$(document).ready(function() {

$("#submit").on("click", function() {
	name = $('#train-input').val().trim();
    destination = $('#destination-input').val().trim();
    firstTrainTime = $('#first-time-input').val().trim();
    frequency = $('#frequency-input').val().trim();
    firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    minutesTillTrain = frequency - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");
	keyHolder = dataRef.push({
		name: name,
		destination: destination,
		firstTrainTime: firstTrainTime,  
		nextTrainFormatted: nextTrainFormatted,
		minutesTillTrain: minutesTillTrain
		});

	$('#train-input').val('');
	$('#destination-input').val('');
	$('#first-time-input').val('');
	$('#frequency-input').val('');
	return false;
});
          
dataRef.on("child_added", function(childSnapshot) {
	$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" + "<td class='col-xs-3'>" + childSnapshot.val().name + "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

}, function(errorObject){

});

$("body").on("click", ".remove-train", function(){
	$(this).closest ('tr').remove();
	getKey = $(this).parent().parent().attr('id');
	dataRef.child(getKey).remove();
});

}); 