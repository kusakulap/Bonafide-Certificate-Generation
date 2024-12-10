
const firebaseConfig = {
  apiKey: "AIzaSyD-viJUnldgQ4aXMVJy3XT0RUeSd7cRrLo",
  authDomain: "bonafide-9256f.firebaseapp.com",
  projectId: "bonafide-9256f",
  storageBucket: "bonafide-9256f.appspot.com",
  messagingSenderId: "231579745439",
  appId: "1:231579745439:web:8a754e473a42caab3e36aa",
  measurementId: "G-CDJ2GG7T35"
};
  firebase.initializeApp(firebaseConfig);
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('studentLoginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    sessionStorage.setItem('loggedInUserEmail', email);
    window.location.href = "student_dashboard.html";
  })
  .catch((error) => {
    error.message = " Invalid Email/Password.";
    alert(error.message);
  });
    });
  });