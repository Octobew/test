// Sample data - reuse from candidate management
const parties = [
  { id: 1, name: "พรรคก้าวหน้า", color: "#5ea8e8" },
  { id: 2, name: "พรรคเสรีไทย", color: "#2d3748" },
  { id: 3, name: "พรรคอนาคตเขียว", color: "#6b7d4f" },
  { id: 4, name: "พรรคสามัคคีไทย", color: "#8b9a7e" },
  { id: 5, name: "พรรคมรดกไทย", color: "#4a2942" },
  { id: 6, name: "พรรคพัฒนาไทย", color: "#8b4789" },
];

const districts = [
  "กรุงเทพมหานคร เขต 1",
  "กรุงเทพมหานคร เขต 2",
  "กรุงเทพมหานคร เขต 3",
  "เชียงใหม่ เขต 1",
  "เชียงใหม่ เขต 2",
  "ภูเก็ต เขต 1",
  "นครราชสีมา เขต 1",
  "นครราชสีมา เขต 2",
  "ขอนแก่น เขต 1",
  "ขอนแก่น เขต 2",
];

let candidatesData = [
  {
    id: 1,
    name: "นายสมชาย วงศ์สุวรรณ",
    number: 1,
    partyId: 1,
    district: "กรุงเทพมหานคร เขต 1",
    photo:
      "https://ui-avatars.com/api/?name=สมชาย+วงศ์สุวรรณ&background=5ea8e8&color=fff&size=200",
  },
  {
    id: 2,
    name: "นางสาวกัลยา ศรีสวัสดิ์",
    number: 2,
    partyId: 2,
    district: "กรุงเทพมหานคร เขต 1",
    photo:
      "https://ui-avatars.com/api/?name=กัลยา+ศรีสวัสดิ์&background=2d3748&color=fff&size=200",
  },
  {
    id: 3,
    name: "นายธนากร ใจซื่อ",
    number: 3,
    partyId: 3,
    district: "กรุงเทพมหานคร เขต 2",
    photo:
      "https://ui-avatars.com/api/?name=ธนากร+ใจซื่อ&background=6b7d4f&color=fff&size=200",
  },
  {
    id: 4,
    name: "นางวิภา สมานฉันท์",
    number: 1,
    partyId: 4,
    district: "กรุงเทพมหานคร เขต 2",
    photo:
      "https://ui-avatars.com/api/?name=วิภา+สมานฉันท์&background=8b9a7e&color=fff&size=200",
  },
  {
    id: 5,
    name: "นายประวัติ มั่นคง",
    number: 2,
    partyId: 5,
    district: "กรุงเทพมหานคร เขต 3",
    photo:
      "https://ui-avatars.com/api/?name=ประวัติ+มั่นคง&background=4a2942&color=fff&size=200",
  },
  {
    id: 6,
    name: "นางสาวอรุณี นวัตกรรม",
    number: 1,
    partyId: 6,
    district: "เชียงใหม่ เขต 1",
    photo:
      "https://ui-avatars.com/api/?name=อรุณี+นวัตกรรม&background=8b4789&color=fff&size=200",
  },
];

let selectedCandidateId = null;
let currentDistrict = "กรุงเทพมหานคร เขต 1"; // Default locked district from user's registered address
let hasVoted = false; // Track if user has voted
let votingClosed = false; // Track if voting is closed
// Mock: User has already voted
let myVote = {
  id: 123456,
  userId: 1,
  candidateId: 1,
  createdAt: "2026-02-07T10:30:00.000Z",
  updatedAt: "2026-02-07T10:30:00.000Z",
}; // Store user's submitted vote

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set user as logged in when on voting page
  sessionStorage.setItem("isLoggedIn", "true");

  setupEventListeners();
  startTimer();
  renderCandidates(); // Auto-render candidates for user's district
});

// Setup event listeners
function setupEventListeners() {
  // Modal buttons
  document.getElementById("changeBtn").addEventListener("click", () => {
    selectedCandidateId = null;
    updateConfirmationBox();
    renderCandidates();
  });

  document.getElementById("submitBtn").addEventListener("click", () => {
    if (selectedCandidateId) {
      showSubmitModal();
    }
  });

  document
    .getElementById("cancelSubmit")
    .addEventListener("click", closeSubmitModal);
  document
    .getElementById("confirmSubmit")
    .addEventListener("click", submitVote);
  document
    .getElementById("closeSuccess")
    .addEventListener("click", closeSuccessModal);
  document.getElementById("changeVote").addEventListener("click", changeVote);

  // Close modals on background click
  document.getElementById("submitModal").addEventListener("click", (e) => {
    if (e.target.id === "submitModal") closeSubmitModal();
  });

  document.getElementById("successModal").addEventListener("click", (e) => {
    if (e.target.id === "successModal") closeSuccessModal();
  });

  // User profile dropdown
  const userProfile = document.getElementById("userProfile");
  const userDropdown = document.getElementById("userDropdown");

  userProfile.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    userDropdown.classList.remove("show");
  });

  // Prevent dropdown from closing when clicking inside it
  userDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Render candidates
function renderCandidates() {
  const list = document.getElementById("candidatesList");
  const filteredCandidates = candidatesData.filter(
    (c) => c.district === currentDistrict,
  );

  if (filteredCandidates.length === 0) {
    list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users-slash"></i>
                <p>ไม่มีผู้สมัครในเขตนี้</p>
            </div>
        `;
    return;
  }

  list.innerHTML = filteredCandidates
    .map((candidate) => {
      const party = parties.find((p) => p.id === candidate.partyId);
      const isSelected = selectedCandidateId === candidate.id;
      // Show voted badge if user hasn't selected anyone, or selected the same candidate they voted for
      const isVoted =
        myVote &&
        myVote.candidateId === candidate.id &&
        (!selectedCandidateId || selectedCandidateId === candidate.id);

      return `
            <div class="candidate-item ${isSelected ? "selected" : ""} ${isVoted ? "voted" : ""}" data-id="${candidate.id}">
                <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo">
                <div class="candidate-details">
                    <h3 class="candidate-name">${candidate.name}</h3>
                    <div class="candidate-party">
                        <span class="party-dot" style="background-color: ${party.color}"></span>
                        ${party.name}
                    </div>
                    ${isVoted ? '<div class="voted-badge"><i class="fas fa-check-circle"></i> คุณได้โหวตให้ผู้สมัครนี้</div>' : ""}
                </div>
                <div class="candidate-actions">
                    <button class="btn-vote ${isSelected ? "selected" : ""} ${isVoted ? "voted" : ""}" onclick="selectCandidate(${candidate.id})">
                        ${isVoted ? '<i class="fas fa-check-circle"></i>คุณโหวตให้คนนี้' : isSelected ? '<i class="fas fa-check"></i>เลือกแล้ว' : "เลือก"}
                    </button>
                </div>
            </div>
        `;
    })
    .join("");
}

// Select candidate
function selectCandidate(id) {
  if (votingClosed) {
    document.getElementById("closedModal").classList.add("show");
    return;
  }

  selectedCandidateId = id;
  renderCandidates();
  updateConfirmationBox();
}

// Update confirmation box
function updateConfirmationBox() {
  const box = document.getElementById("confirmationBox");

  // Don't show confirmation box if no candidate selected
  if (!selectedCandidateId) {
    box.style.display = "none";
    return;
  }

  // Don't show confirmation box if selected candidate is the one already voted for
  if (myVote && myVote.candidateId === selectedCandidateId) {
    box.style.display = "none";
    return;
  }

  const candidate = candidatesData.find((c) => c.id === selectedCandidateId);
  if (!candidate) return;

  document.getElementById("selectedPhoto").src = candidate.photo;
  document.getElementById("selectedName").textContent = candidate.name;
  box.style.display = "block";

  // Scroll to confirmation box
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Show submit modal
function showSubmitModal() {
  if (votingClosed) {
    document.getElementById("closedModal").classList.add("show");
    return;
  }

  const candidate = candidatesData.find((c) => c.id === selectedCandidateId);
  if (!candidate) return;

  const party = parties.find((p) => p.id === candidate.partyId);

  document.getElementById("finalPhoto").src = candidate.photo;
  document.getElementById("finalName").textContent = candidate.name;
  document.getElementById("finalParty").textContent = party.name;

  document.getElementById("submitModal").classList.add("show");
}

// Close submit modal
function closeSubmitModal() {
  document.getElementById("submitModal").classList.remove("show");
}

// Submit vote
function submitVote() {
  closeSubmitModal();

  hasVoted = true;

  // Store the vote data
  const now = new Date().toISOString();
  myVote = {
    id: Math.floor(Math.random() * 1000000), // Mock vote ID
    userId: 1, // Mock user ID
    candidateId: selectedCandidateId,
    createdAt: now,
    updatedAt: now,
  };

  // Show success modal
  document.getElementById("successModal").classList.add("show");
}

// Get my vote - Mock function to retrieve user's vote
function getMyVote() {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (myVote) {
        resolve({
          success: true,
          data: myVote,
          message: "ดึงข้อมูลการลงคะแนนสำเร็จ",
        });
      } else {
        resolve({
          success: false,
          data: null,
          message: "คุณยังไม่ได้ลงคะแนนเสียง",
        });
      }
    }, 500); // Simulate 500ms network delay
  });
}

// Example usage of getMyVote
async function checkMyVote() {
  try {
    const response = await getMyVote();

    if (response.success) {
      console.log("🗳️ ข้อมูลการลงคะแนนของคุณ:");
      console.log("Vote ID:", response.data.id);
      console.log("User ID:", response.data.userId);
      console.log("Candidate ID:", response.data.candidateId);
      console.log(
        "Created At:",
        new Date(response.data.createdAt).toLocaleString("th-TH"),
      );
      console.log(
        "Updated At:",
        new Date(response.data.updatedAt).toLocaleString("th-TH"),
      );
    } else {
      console.log("ℹ️", response.message);
    }

    return response;
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    return {
      success: false,
      data: null,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
    };
  }
}

// Close success modal
function closeSuccessModal() {
  document.getElementById("successModal").classList.remove("show");
}

// Change vote - go back to selection
function changeVote() {
  closeSuccessModal();
  selectedCandidateId = null;
  updateConfirmationBox();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Timer countdown
function startTimer() {
  let hours = 4;
  let minutes = 22;
  let seconds = 15;

  setInterval(() => {
    if (votingClosed) return;

    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 0;
      minutes = 0;
      seconds = 0;
      votingClosed = true;

      // Show voting closed modal if user is viewing the page
      setTimeout(() => {
        document.getElementById("closedModal").classList.add("show");
      }, 1000);
    }

    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0",
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0",
    );
  }, 1000);
}

// Logout function
function logout() {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "main.html";
}
