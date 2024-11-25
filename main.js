// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCCHovaZANb_oSOAV0Fn4ZnlzbmgfbHLAU",
    authDomain: "mcppl-winter-activity-tracker.firebaseapp.com",
    databaseURL: "https://mcppl-winter-activity-tracker-default-rtdb.firebaseio.com",
    projectId: "mcppl-winter-activity-tracker",
    storageBucket: "mcppl-winter-activity-tracker.firebasestorage.app",
    messagingSenderId: "790744355209",
    appId: "1:790744355209:web:1fce315a7b313e1c0b5158",
    measurementId: "G-4N3CXQZSGL"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var closebtn = document.getElementsByClassName("close")[0];
var submitbtn = document.getElementsByClassName("submit")[0];

// if the user clicks the modal button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// If user clicks on <button> (x), close modal
closebtn.onclick = function() {
  modal.style.display = "none";
}

// If the user clicks anywhere outside of the modal, close modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('trackerForm')
.addEventListener('submit', submitForm);

function submitForm(e) {
e.preventDefault();

// Get values
var fname = getInputVal('fname');
var lname = getInputVal('lname');
var eid = getInputVal('eid');
var uid = eid.replace(/\./g,'-');
var week = getInputVal('week');
var steps = getInputVal("steps");
saveActivity(fname, lname, eid, week, steps, uid);
document.getElementById('trackerForm').reset();
modal.style.display = "none";

}

// Function to get form values
function getInputVal(id) {
return document.getElementById(id).value;
}



// Save week activity log to firebase
function saveActivity(fname, lname, eid, week, steps, uid) {
    var newPush = database.ref("Users/").child(uid).child(week).push();
    newPush.set({
     fname: fname,
     lname: lname,
     eid: eid,
     steps: steps,
    });
}





