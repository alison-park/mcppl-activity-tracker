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
  btn.onclick = function () {
    modal.style.display = "block";
  }
  
  // If user clicks on <button> (x), close modal
  closebtn.onclick = function () {
    modal.style.display = "none";
  }
  
  // If the user clicks anywhere outside of the modal, close modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  document.getElementById('trackerForm')
    .addEventListener('submit', submitForm);
  
  function checkUserExists(f,l,eid_0,uid_0,d,newS){
    database.ref("Users/").orderByChild('eid').equalTo(eid_0).once('value', function(snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          var value = childSnapshot.val();
          if (value.steps!==null){
            let newPushSteps = (+newS) + (+value.steps);
            childSnapshot.ref.update({steps: newPushSteps});
            childSnapshot.ref.update({negsteps: newPushSteps*-1});
          }
        });
      } else {
        saveActivity(f,l,eid_0,uid_0,d,+newS, 0);
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
  function submitForm(e) {
    e.preventDefault();
    // Get values
    var fname = getInputVal('fname');
    var lname = getInputVal('lname');
    var eid = getInputVal('eid');
    var uid = eid.replace(/\./g, '-');
    var date = getInputVal('date');
    var newSteps = getInputVal("steps");
    checkUserExists(fname,lname,eid,uid,date,newSteps);
    //saveActivity(fname, lname, eid, date, newSteps, uid);
    document.getElementById('trackerForm').reset();
    modal.style.display = "none";
    const divElement = document.getElementById("bodyTable"); 
    divElement.innerHTML = ""; 
    loadLeaderboard();
    return uid;
  
  }
  
  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
  
  // Save activity log to firebase
  function saveActivity(f1, l1, e1, u1, d1, newS1, ex1) {
      var newPush = database.ref("Users/").push();
      newPush.set({
      steps: newS1 +ex1,
      fname: f1,
      lname: l1,
      eid: e1,
      date: d1,
      negsteps: (newS1+ex1)*-1,
    })
  }
  
  
  // Order all participants
  function loadLeaderboard(){
    database.ref("Users/").orderByChild("negsteps").limitToFirst(3).once('value', function(snapshot) {
      content = '';
      place = 0
      snapshot.forEach(function (data){
          var val = data.val();
                  content +='<tr>';       
                  content += '<td>' + (place+=1)+ '</td>';
                  content += '<td>' + val.eid + '</td>';
                  content += '<td>' + val.steps + '</td>';
                  content += '</tr>';
                  console.log(val.steps);
        }); $('#table1').append(content);
  
    });
    
  }
  
  
  window.addEventListener("load", (event) => {
    loadLeaderboard();
    console.log("page is fully loaded");
  });