// Sample data
const parties = [
    { id: 1, name: 'พรรคก้าวหน้า', color: '#5ea8e8' },
    { id: 2, name: 'พรรคเสรีไทย', color: '#2d3748' },
    { id: 3, name: 'พรรคอนาคตเขียว', color: '#6b7d4f' },
    { id: 4, name: 'พรรคสามัคคีไทย', color: '#8b9a7e' },
    { id: 5, name: 'พรรคมรดกไทย', color: '#4a2942' },
    { id: 6, name: 'พรรคพัฒนาไทย', color: '#8b4789' }
];

const districts = [
    'กรุงเทพมหานคร เขต 1',
    'กรุงเทพมหานคร เขต 2',
    'กรุงเทพมหานคร เขต 3',
    'เชียงใหม่ เขต 1',
    'เชียงใหม่ เขต 2',
    'ภูเก็ต เขต 1',
    'นครราชสีมา เขต 1',
    'นครราชสีมา เขต 2',
    'ขอนแก่น เขต 1',
    'ขอนแก่น เขต 2'
];

let candidatesData = [
    {
        id: 1,
        name: 'นายสมชาย วงศ์สุวรรณ',
        number: 1,
        partyId: 1,
        district: 'กรุงเทพมหานคร เขต 1',
        age: 45,
        education: 'ปริญญาเอก รัฐศาสตร์',
        experience: 'อดีตรัฐมนตรีช่วยว่าการกระทรวงการคลัง',
        policy: 'พัฒนาระบบขนส่งสาธารณะ ลดค่าครองชีพ เพิ่มสวัสดิการผู้สูงอายุ',
        photo: 'https://ui-avatars.com/api/?name=สมชาย+วงศ์สุวรรณ&background=5ea8e8&color=fff&size=200'
    },
    {
        id: 2,
        name: 'นางสาวกัลยา ศรีสวัสดิ์',
        number: 2,
        partyId: 2,
        district: 'กรุงเทพมหานคร เขต 1',
        age: 38,
        education: 'ปริญญาโท บริหารธุรกิจ',
        experience: 'ผู้บริหารบริษัทเอกชน 15 ปี',
        policy: 'สนับสนุน SME ส่งเสริมการท่องเที่ยว สร้างงานในท้องถิ่น',
        photo: 'https://ui-avatars.com/api/?name=กัลยา+ศรีสวัสดิ์&background=2d3748&color=fff&size=200'
    },
    {
        id: 3,
        name: 'นายธนากร ใจซื่อ',
        number: 3,
        partyId: 3,
        district: 'กรุงเทพมหานคร เขต 2',
        age: 42,
        education: 'ปริญญาตรี วิศวกรรมสิ่งแวดล้อม',
        experience: 'นักอนุรักษ์สิ่งแวดล้อม 20 ปี',
        policy: 'ลดมลพิษ เพิ่มพื้นที่สีเขียว พลังงานทางเลือก',
        photo: 'https://ui-avatars.com/api/?name=ธนากร+ใจซื่อ&background=6b7d4f&color=fff&size=200'
    },
    {
        id: 4,
        name: 'นางวิภา สมานฉันท์',
        number: 1,
        partyId: 4,
        district: 'กรุงเทพมหานคร เขต 2',
        age: 50,
        education: 'ปริญญาเอก สังคมวิทยา',
        experience: 'อาจารย์มหาวิทยาลัย 25 ปี',
        policy: 'ปฏิรูปการศึกษา พัฒนาคุณภาพชีวิตประชาชน',
        photo: 'https://ui-avatars.com/api/?name=วิภา+สมานฉันท์&background=8b9a7e&color=fff&size=200'
    },
    {
        id: 5,
        name: 'นายประวัติ มั่นคง',
        number: 2,
        partyId: 5,
        district: 'กรุงเทพมหานคร เขต 3',
        age: 55,
        education: 'ปริญญาโท ประวัติศาสตร์',
        experience: 'นักการเมืองท้องถิ่น 30 ปี',
        policy: 'รักษาวัฒนธรรมไทย พัฒนาชุมชน เสริมสร้างความมั่นคง',
        photo: 'https://ui-avatars.com/api/?name=ประวัติ+มั่นคง&background=4a2942&color=fff&size=200'
    },
    {
        id: 6,
        name: 'นางสาวอรุณี นวัตกรรม',
        number: 1,
        partyId: 6,
        district: 'เชียงใหม่ เขต 1',
        age: 35,
        education: 'ปริญญาเอก เทคโนโลยีสารสนเทศ',
        experience: 'ผู้เชี่ยวชาญด้านเทคโนโลยี',
        policy: 'Digital Thailand ส่งเสริม Startup เมืองอัจฉริยะ',
        photo: 'https://ui-avatars.com/api/?name=อรุณี+นวัตกรรม&background=8b4789&color=fff&size=200'
    },
    {
        id: 7,
        name: 'นายสุรชัย ประชาชน',
        number: 2,
        partyId: 1,
        district: 'เชียงใหม่ เขต 1',
        age: 47,
        education: 'ปริญญาตรี นิติศาสตร์',
        experience: 'ทนายความ 22 ปี',
        policy: 'ปกป้องสิทธิประชาชน ยุติธรรมเข้าถึงได้ ลดความเหลื่อมล้ำ',
        photo: 'https://ui-avatars.com/api/?name=สุรชัย+ประชาชน&background=5ea8e8&color=fff&size=200'
    },
    {
        id: 8,
        name: 'นางมาลี เจริญผล',
        number: 1,
        partyId: 2,
        district: 'เชียงใหม่ เขต 2',
        age: 43,
        education: 'ปริญญาโท เกษตรศาสตร์',
        experience: 'นักวิชาการเกษตร 18 ปี',
        policy: 'ยกระดับราคาสินค้าเกษตร เกษตรอินทรีย์ ส่งเสริมเกษตรกร',
        photo: 'https://ui-avatars.com/api/?name=มาลี+เจริญผล&background=2d3748&color=fff&size=200'
    },
    {
        id: 9,
        name: 'นายอนุชา เปลี่ยนแปลง',
        number: 3,
        partyId: 3,
        district: 'ภูเก็ต เขต 1',
        age: 40,
        education: 'ปริญญาตรี การท่องเที่ยว',
        experience: 'ผู้ประกอบการท่องเที่ยว 15 ปี',
        policy: 'ท่องเที่ยวยั่งยืน ฟื้นฟูแหล่งท่องเที่ยว พัฒนาโครงสร้างพื้นฐาน',
        photo: 'https://ui-avatars.com/api/?name=อนุชา+เปลี่ยนแปลง&background=6b7d4f&color=fff&size=200'
    },
    {
        id: 10,
        name: 'นายธรรมนูญ เท่าเทียม',
        number: 1,
        partyId: 4,
        district: 'นครราชสีมา เขต 1',
        age: 52,
        education: 'ปริญญาเอก รัฐประศาสนศาสตร์',
        experience: 'ข้าราชการบำนาญ 28 ปี',
        policy: 'ปฏิรูประบบราชการ โปร่งใส ตรวจสอบได้ ลดขั้นตอน',
        photo: 'https://ui-avatars.com/api/?name=ธรรมนูญ+เท่าเทียม&background=8b9a7e&color=fff&size=200'
    },
    {
        id: 11,
        name: 'นางสาวสมหญิง รักชาติ',
        number: 2,
        partyId: 5,
        district: 'นครราชสีมา เขต 1',
        age: 48,
        education: 'ปริญญาโท พยาบาลศาสตร์',
        experience: 'พยาบาลวิชาชีพ 25 ปี',
        policy: 'ปรับปรุงระบบสาธารณสุข เพิ่มสิทธิประโยชน์ บัตรทอง',
        photo: 'https://ui-avatars.com/api/?name=สมหญิง+รักชาติ&background=4a2942&color=fff&size=200'
    },
    {
        id: 12,
        name: 'นายสมศักดิ์ พัฒนา',
        number: 1,
        partyId: 6,
        district: 'ขอนแก่น เขต 1',
        age: 44,
        education: 'ปริญญาโท วิศวกรรมโยธา',
        experience: 'วิศวกรอาวุโส 20 ปี',
        policy: 'พัฒนาโครงสร้างพื้นฐาน รถไฟความเร็วสูง ถนนหนทาง',
        photo: 'https://ui-avatars.com/api/?name=สมศักดิ์+พัฒนา&background=8b4789&color=fff&size=200'
    }
];

let currentPage = 1;
const itemsPerPage = 12;
let filteredData = [...candidatesData];
let editingCandidateId = null;
let currentPhotoData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    renderGrid();
    setupEventListeners();
    updatePagination();
});

// Populate dropdowns
function populateDropdowns() {
    // Party dropdowns
    const partySelects = [document.getElementById('partyFilter'), document.getElementById('candidateParty')];
    partySelects.forEach(select => {
        if (select) {
            parties.forEach(party => {
                const option = document.createElement('option');
                option.value = party.id;
                option.textContent = party.name;
                select.appendChild(option);
            });
        }
    });

    // District dropdowns
    const districtSelects = [document.getElementById('districtFilter'), document.getElementById('candidateDistrict')];
    districtSelects.forEach(select => {
        if (select) {
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                select.appendChild(option);
            });
        }
    });
}

// Render grid
function renderGrid() {
    const grid = document.getElementById('candidatesGrid');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    if (pageData.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-users-slash"></i>
                <p>ไม่พบข้อมูลผู้สมัคร</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = pageData.map(candidate => {
        const party = parties.find(p => p.id === candidate.partyId);
        return `
            <div class="candidate-card" onclick="viewCandidate(${candidate.id})">
                <div class="candidate-header" style="background: linear-gradient(135deg, ${party.color} 0%, ${adjustColorBrightness(party.color, -20)} 100%);">
                    <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo">
                    <div class="candidate-number">เบอร์ ${candidate.number}</div>
                </div>
                <div class="candidate-body">
                    <h3 class="candidate-name">${candidate.name}</h3>
                    <div style="text-align: center; margin-bottom: 16px;">
                        <span class="candidate-party">
                            <i class="fas fa-flag"></i>
                            ${party.name}
                        </span>
                    </div>
                    <div class="candidate-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${candidate.district}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-user"></i>
                            <span>อายุ ${candidate.age} ปี</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>${candidate.education}</span>
                        </div>
                    </div>
                    <p class="candidate-policy">${candidate.policy}</p>
                    <div class="candidate-actions" onclick="event.stopPropagation()">
                        <button class="action-btn edit" onclick="editCandidate(${candidate.id})">
                            <i class="fas fa-pen"></i>
                            แก้ไข
                        </button>
                        <button class="action-btn delete" onclick="deleteCandidate(${candidate.id})">
                            <i class="fas fa-trash"></i>
                            ลบ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    updatePaginationInfo();
}

// View candidate details
function viewCandidate(id) {
    const candidate = candidatesData.find(c => c.id === id);
    if (!candidate) return;

    const party = parties.find(p => p.id === candidate.partyId);
    const viewContent = document.getElementById('viewContent');

    viewContent.innerHTML = `
        <div class="view-header">
            <img src="${candidate.photo}" alt="${candidate.name}" class="view-photo">
            <div class="view-basic">
                <div class="view-number">เบอร์ ${candidate.number}</div>
                <h2 class="view-name">${candidate.name}</h2>
                <span class="view-party-tag">
                    <i class="fas fa-flag"></i>
                    ${party.name}
                </span>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-card">
                <label>เขตเลือกตั้ง</label>
                <div class="value"><i class="fas fa-map-marker-alt"></i> ${candidate.district}</div>
            </div>
            <div class="info-card">
                <label>อายุ</label>
                <div class="value"><i class="fas fa-calendar"></i> ${candidate.age} ปี</div>
            </div>
            <div class="info-card">
                <label>การศึกษา</label>
                <div class="value"><i class="fas fa-graduation-cap"></i> ${candidate.education}</div>
            </div>
            <div class="info-card">
                <label>ประสบการณ์</label>
                <div class="value"><i class="fas fa-briefcase"></i> ${candidate.experience}</div>
            </div>
        </div>

        <div class="view-section">
            <h3><i class="fas fa-bullhorn"></i>นโยบายหลัก</h3>
            <p>${candidate.policy}</p>
        </div>
    `;

    document.getElementById('viewModal').classList.add('show');
}

// Update pagination info
function updatePaginationInfo() {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredData.length);
    
    document.getElementById('showingStart').textContent = filteredData.length > 0 ? start : 0;
    document.getElementById('showingEnd').textContent = end;
    document.getElementById('totalEntries').textContent = filteredData.length;
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationControls = document.querySelector('.pagination-controls');
    
    paginationControls.innerHTML = `
        <button class="page-btn" id="prevBtn" ${currentPage === 1 ? 'disabled' : ''}>ก่อนหน้า</button>
        ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
            <button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>
        `).join('')}
        <button class="page-btn" id="nextBtn" ${currentPage === totalPages ? 'disabled' : ''}>ถัดไป</button>
    `;

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderGrid();
            updatePagination();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderGrid();
            updatePagination();
        }
    });

    document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPage = parseInt(e.target.dataset.page);
            renderGrid();
            updatePagination();
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add Candidate Button
    document.getElementById('addCandidateBtn').addEventListener('click', () => {
        editingCandidateId = null;
        currentPhotoData = null;
        document.getElementById('modalTitle').textContent = 'เพิ่มผู้สมัครใหม่';
        document.getElementById('candidateForm').reset();
        document.getElementById('photoPreview').innerHTML = '<i class="fas fa-user"></i>';
        document.getElementById('candidateModal').classList.add('show');
    });

    // Close Modals
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('closeViewModal').addEventListener('click', closeViewModal);

    // Photo upload
    document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('candidatePhoto').click();
    });

    document.getElementById('candidatePhoto').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('ไฟล์รูปภาพมีขนาดใหญ่เกิน 2MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                currentPhotoData = e.target.result;
                document.getElementById('photoPreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submit
    document.getElementById('candidateForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCandidate();
    });

    // Filters
    document.getElementById('districtFilter').addEventListener('change', applyFilters);
    document.getElementById('partyFilter').addEventListener('change', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Search
    document.getElementById('searchInput').addEventListener('input', applyFilters);

    // Close modal on background click
    document.getElementById('candidateModal').addEventListener('click', (e) => {
        if (e.target.id === 'candidateModal') closeModal();
    });

    document.getElementById('viewModal').addEventListener('click', (e) => {
        if (e.target.id === 'viewModal') closeViewModal();
    });
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const districtFilter = document.getElementById('districtFilter').value;
    const partyFilter = document.getElementById('partyFilter').value;

    filteredData = candidatesData.filter(candidate => {
        const matchSearch = !searchTerm || 
            candidate.name.toLowerCase().includes(searchTerm) ||
            candidate.policy.toLowerCase().includes(searchTerm);
        
        const matchDistrict = !districtFilter || candidate.district === districtFilter;
        const matchParty = !partyFilter || candidate.partyId === parseInt(partyFilter);

        return matchSearch && matchDistrict && matchParty;
    });

    currentPage = 1;
    renderGrid();
    updatePagination();
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('districtFilter').value = '';
    document.getElementById('partyFilter').value = '';
    filteredData = [...candidatesData];
    currentPage = 1;
    renderGrid();
    updatePagination();
}

// Close modals
function closeModal() {
    document.getElementById('candidateModal').classList.remove('show');
    document.getElementById('candidateForm').reset();
    editingCandidateId = null;
    currentPhotoData = null;
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('show');
}

// Save candidate
function saveCandidate() {
    const name = document.getElementById('candidateName').value;
    const number = parseInt(document.getElementById('candidateNumber').value);
    const partyId = parseInt(document.getElementById('candidateParty').value);
    const district = document.getElementById('candidateDistrict').value;
    const age = parseInt(document.getElementById('candidateAge').value) || 0;
    const education = document.getElementById('candidateEducation').value || '-';
    const experience = document.getElementById('candidateExperience').value || '-';
    const policy = document.getElementById('candidatePolicy').value;

    const photo = currentPhotoData || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=200`;

    if (editingCandidateId) {
        // Update existing candidate
        const index = candidatesData.findIndex(c => c.id === editingCandidateId);
        if (index !== -1) {
            candidatesData[index] = {
                ...candidatesData[index],
                name,
                number,
                partyId,
                district,
                age,
                education,
                experience,
                policy,
                photo
            };
        }
    } else {
        // Add new candidate
        const newCandidate = {
            id: Math.max(...candidatesData.map(c => c.id)) + 1,
            name,
            number,
            partyId,
            district,
            age,
            education,
            experience,
            policy,
            photo
        };
        candidatesData.push(newCandidate);
    }

    closeModal();
    applyFilters(); // Reapply current filters
}

// Edit candidate
function editCandidate(id) {
    const candidate = candidatesData.find(c => c.id === id);
    if (!candidate) return;

    editingCandidateId = id;
    document.getElementById('modalTitle').textContent = 'แก้ไขข้อมูลผู้สมัคร';
    document.getElementById('candidateName').value = candidate.name;
    document.getElementById('candidateNumber').value = candidate.number;
    document.getElementById('candidateParty').value = candidate.partyId;
    document.getElementById('candidateDistrict').value = candidate.district;
    document.getElementById('candidateAge').value = candidate.age || '';
    document.getElementById('candidateEducation').value = candidate.education;
    document.getElementById('candidateExperience').value = candidate.experience;
    document.getElementById('candidatePolicy').value = candidate.policy;
    
    currentPhotoData = candidate.photo;
    document.getElementById('photoPreview').innerHTML = `<img src="${candidate.photo}" alt="Preview">`;
    
    document.getElementById('candidateModal').classList.add('show');
}

// Delete candidate
function deleteCandidate(id) {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบผู้สมัครนี้?')) {
        candidatesData = candidatesData.filter(c => c.id !== id);
        applyFilters();
    }
}

// Helper function to adjust color brightness
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}
