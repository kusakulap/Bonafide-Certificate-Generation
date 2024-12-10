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
const auth = firebase.auth();
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "main.html";
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
}
const db = firebase.firestore();
function displayStudentDetails() {
  const studentDetailsContainer = document.getElementById('studentDetails');
  studentDetailsContainer.innerHTML = '';
  db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const studentData = doc.data();
      const isApproved = studentData.approved || false;
      const actionButton = isApproved ? '' : `
          <div class="dropdown">
            <button class="dropbtn">Actions</button>
            <div class="dropdown-content">
              <a href="#" class="approve">Approve</a>
              <a href="#" class="deny">Deny</a>
            </div>
          </div>
        `;
      const studentDetails = `
        <div class="student-detail" data-id="${doc.id}">
          <p><strong>Name:</strong> ${studentData.name}</p>
          <p><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
          <p><strong>Year:</strong> ${studentData.year}</p>
          <p><strong>Branch:</strong> ${studentData.branch}</p>
          <p><strong>Bonafide Type:</strong> ${studentData.bonafideType}</p>
          ${actionButton}
        </div>
      `;
      studentDetailsContainer.innerHTML += studentDetails;
    });
  }).catch((error) => {
    console.error("Error fetching documents: ", error);
  });
}
displayStudentDetails();
function approveStudent(id) {
  const dropdownElement = document.querySelector(`.student-detail[data-id="${id}"] .dropdown`);
  db.collection("students").doc(id).update({
    approved: true
  })
  .then(() => {
    console.log("Document successfully updated");
    dropdownElement.remove();
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
}
document.addEventListener('click', function(event) {
if (event.target.classList.contains('approve')) {
  const studentDetail = event.target.closest('.student-detail');
  const studentId = studentDetail.dataset.id;
  approveStudent(studentId);
}
});