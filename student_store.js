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
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  console.log("Authenticated email:", loggedInUserEmail);

});
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "main.html";
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
}
document.getElementById('logoutButton').addEventListener('click', function() {
  logout();
});
const db = firebase.firestore();
document.getElementById('submitDetails').addEventListener('click', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const rollNumber = document.getElementById('rollNumber').value;
  const year = document.getElementById('year').value;
  const branch = document.getElementById('branch').value;
  const bonafideType = document.querySelector('.dropdown-content .active').id;
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  db.collection("students").add({
    name: name,
    rollNumber: rollNumber,
    email: loggedInUserEmail,
    year: year,
    branch: branch,
    bonafideType: bonafideType
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('submissionMessage').style.display = 'block';
    displaySubmissionDetails();
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
})
function toggleDropdown() {
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.classList.toggle('show');
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
const bonafideTypeLinks = document.querySelectorAll('.dropdown-content a');
bonafideTypeLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    bonafideTypeLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    this.classList.add('active');
    toggleDropdown();
  });
});
window.onload = displaySubmissionDetails;
function displaySubmissionDetails() {
  const tableBody = document.getElementById('submissionDetailsTableBody');
  tableBody.innerHTML = '';
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  db.collection('students').where('email', '==', loggedInUserEmail).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = tableBody.insertRow();
      const nameCell = row.insertCell();
      nameCell.textContent = data.name;
      const rollNumberCell = row.insertCell();
      rollNumberCell.textContent = data.rollNumber;
      const statusCell = row.insertCell();
      const downloadCell = row.insertCell();
      if (data.approved === true) {
        statusCell.textContent = 'Approved';
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadCell.appendChild(downloadButton);
        const bonafideContent = `This is to certify that ${data.name} with roll number ${data.rollNumber} is a bonafide student of this college and studying in ${data.branch} in ${data.year}th year. This certificate is being issued on the request of the student for the purpose of ${data.bonafideType} application.`;
        downloadButton.addEventListener('click', function () {
          const certificateContent = certificateTemplate.replace('--content as above--', bonafideContent);
          html2pdf().from(certificateContent).save();
        });
      } else {
        statusCell.textContent = 'Pending';
      }
    });
  }).catch((error) => {
    console.error('Error fetching submission details: ', error);
  });
}
const certificateTemplate = `
<style>
    body {
      font-family: Arial, sans-serif;
    }
    .certificate-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      max-width: 600px;
      margin: 0 auto;
      padding: 50px;
      background-color: #f9f9f9;
      height: 100vh;
      page-break-after: always;
    }
    h2 {
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      text-decoration: underline;
      margin-bottom: 10px;
    }
    p {
      text-align: justify;
      font-weight: bold;
    }
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px; 
    }
    .logo {
      width: 40px; 
      margin-right: 10px;
    }
    h1 {
      text-align: center;
      font-weight: bold;
      font-size: 30px;
      text-decoration: underline;
      margin: 0; 
    }
    .signature {
      margin-top: 20px; 
      text-align: right;
    }
    .signature img {
      width: 250px;
      right: 5px;
    }
  </style>
</head>
<body>
<div class="certificate-container">
  <div class="logo-container">
  <h1>BEST ENGINEERING COLLEGE, INDIA</h1>
  </div>
  <h2>Bonafide Certificate</h2>
  <p>--content as above-- </p>
  <div class="signature">
    <img src="principal.png" alt="Authorized Signature">
  </div>
</div>
`;