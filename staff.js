const firebaseConfig = {
  apiKey: "AIzaSyCMDXDQ0UDNv03TAO1Lzy3CUz5ORnSq7gg",
  authDomain: "bonafide-staff.firebaseapp.com",
  projectId: "bonafide-staff",
  storageBucket: "bonafide-staff.appspot.com",
  messagingSenderId: "139521570656",
  appId: "1:139521570656:web:b9945496c9eec6d1ded005",
  measurementId: "G-W7KS36Z04V"
};
      firebase.initializeApp(firebaseConfig);
document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('staffLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
                firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            window.location.href = "staff_dashboard.html";
          })
          .catch((error) => {
            error.message = " Invalid Email/Password.";
            alert(error.message);
          });
      });
    });
      