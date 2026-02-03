// Sample party data
let partiesData = [
    {
        id: 1,
        name: 'พรรคก้าวหน้า',
        leader: 'นายสมชาย ใจดี',
        registrationDate: '12 ต.ค. 2566',
        logoColor: '#5ea8e8',
        logoIcon: 'fa-flag'
    },
    {
        id: 2,
        name: 'พรรคเสรีไทย',
        leader: 'นางสาวสมหญิง รักชาติ',
        registrationDate: '15 ก.ย. 2566',
        logoColor: '#2d3748',
        logoIcon: 'fa-dove'
    },
    {
        id: 3,
        name: 'พรรคอนาคตเขียว',
        leader: 'นายธนากร สิ่งแวดล้อม',
        registrationDate: '1 พ.ย. 2566',
        logoColor: '#6b7d4f',
        logoIcon: 'fa-leaf'
    },
    {
        id: 4,
        name: 'พรรคสามัคคีไทย',
        leader: 'นางวิภา เอกภาพ',
        registrationDate: '22 ส.ค. 2566',
        logoColor: '#8b9a7e',
        logoIcon: 'fa-handshake'
    },
    {
        id: 5,
        name: 'พรรคมรดกไทย',
        leader: 'นายประวัติ วัฒนธรรม',
        registrationDate: '10 ม.ค. 2567',
        logoColor: '#4a2942',
        logoIcon: 'fa-landmark'
    },
    {
        id: 6,
        name: 'พรรคพัฒนาไทย',
        leader: 'นางสาวกัลยา เจริญก้าว',
        registrationDate: '5 ธ.ค. 2566',
        logoColor: '#8b4789',
        logoIcon: 'fa-arrow-trend-up'
    },
    {
        id: 7,
        name: 'พรรคประชาธิปัตย์',
        leader: 'นายสุรชัย ประชาชน',
        registrationDate: '18 ก.ค. 2566',
        logoColor: '#3182ce',
        logoIcon: 'fa-users'
    },
    {
        id: 8,
        name: 'พรรคปฏิรูปไทย',
        leader: 'นายอนุชา เปลี่ยนแปลง',
        registrationDate: '30 พ.ค. 2566',
        logoColor: '#dd6b20',
        logoIcon: 'fa-rotate'
    },
    {
        id: 9,
        name: 'พรรคเลือกของประชาชน',
        leader: 'นางสาวมาลี พลเมือง',
        registrationDate: '14 เม.ย. 2566',
        logoColor: '#d53f8c',
        logoIcon: 'fa-heart'
    },
    {
        id: 10,
        name: 'พรรคยุติธรรม',
        leader: 'นายธรรมนูญ เท่าเทียม',
        registrationDate: '22 มี.ค. 2566',
        logoColor: '#2c5282',
        logoIcon: 'fa-scale-balanced'
    },
    {
        id: 11,
        name: 'พรรคอนาคตไกล',
        leader: 'นางสาวอรุณี นวัตกรรม',
        registrationDate: '8 ก.พ. 2566',
        logoColor: '#38a169',
        logoIcon: 'fa-rocket'
    },
    {
        id: 12,
        name: 'พรรคพลเมืองไทย',
        leader: 'นายสมศักดิ์ ประชาธิปไตย',
        registrationDate: '15 ม.ค. 2566',
        logoColor: '#e53e3e',
        logoIcon: 'fa-trophy'
    }
];

let currentPage = 1;
const itemsPerPage = 5;
let editingPartyId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupEventListeners();
    updatePagination();
});

// Render table
function renderTable() {
    const tbody = document.getElementById('partiesTableBody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = partiesData.slice(start, end);

    tbody.innerHTML = pageData.map(party => `
        <tr>
            <td>
                <div class="party-info">
                    <div class="party-logo" style="background-color: ${party.logoColor}">
                        <i class="fas ${party.logoIcon}"></i>
                    </div>
                    <span class="party-name">${party.name}</span>
                </div>
            </td>
            <td>
                <span class="party-leader">${party.leader}</span>
            </td>
            <td>
                <span class="registration-date">${party.registrationDate}</span>
            </td>
            <td>
                <div class="actions">
                    <button class="action-btn edit" onclick="editParty(${party.id})" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteParty(${party.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updatePaginationInfo();
}

// Update pagination info
function updatePaginationInfo() {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, partiesData.length);
    
    document.getElementById('showingStart').textContent = start;
    document.getElementById('showingEnd').textContent = end;
    document.getElementById('totalEntries').textContent = partiesData.length;
}

// Update pagination buttons
function updatePagination() {
    const totalPages = Math.ceil(partiesData.length / itemsPerPage);
    const paginationControls = document.querySelector('.pagination-controls');
    
    paginationControls.innerHTML = `
        <button class="page-btn" id="prevBtn" ${currentPage === 1 ? 'disabled' : ''}>ก่อนหน้า</button>
        ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
            <button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>
        `).join('')}
        <button class="page-btn" id="nextBtn" ${currentPage === totalPages ? 'disabled' : ''}>ถัดไป</button>
    `;

    // Re-attach event listeners
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            updatePagination();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(partiesData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePagination();
        }
    });

    document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPage = parseInt(e.target.dataset.page);
            renderTable();
            updatePagination();
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add Party Button
    document.getElementById('addPartyBtn').addEventListener('click', () => {
        editingPartyId = null;
        document.getElementById('modalTitle').textContent = 'เพิ่มพรรคใหม่';
        document.getElementById('partyForm').reset();
        document.getElementById('partyModal').classList.add('show');
    });

    // Close Modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);

    // Close modal on background click
    document.getElementById('partyModal').addEventListener('click', (e) => {
        if (e.target.id === 'partyModal') {
            closeModal();
        }
    });

    // Form Submit
    document.getElementById('partyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveParty();
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = partiesData.filter(party => 
            party.name.toLowerCase().includes(searchTerm) ||
            party.leader.toLowerCase().includes(searchTerm)
        );
        
        // Temporarily update the table with filtered data
        if (searchTerm) {
            const tbody = document.getElementById('partiesTableBody');
            tbody.innerHTML = filteredData.map(party => `
                <tr>
                    <td>
                        <div class="party-info">
                            <div class="party-logo" style="background-color: ${party.logoColor}">
                                <i class="fas ${party.logoIcon}"></i>
                            </div>
                            <span class="party-name">${party.name}</span>
                        </div>
                    </td>
                    <td>
                        <span class="party-leader">${party.leader}</span>
                    </td>
                    <td>
                        <span class="registration-date">${party.registrationDate}</span>
                    </td>
                    <td>
                        <div class="actions">
                            <button class="action-btn edit" onclick="editParty(${party.id})" title="Edit">
                                <i class="fas fa-pen"></i>
                            </button>
                            <button class="action-btn delete" onclick="deleteParty(${party.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            if (filteredData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px; color: #94a3b8;">ไม่พบข้อมูลพรรค</td></tr>';
            }
        } else {
            renderTable();
        }
    });
}

// Close modal
function closeModal() {
    document.getElementById('partyModal').classList.remove('show');
    document.getElementById('partyForm').reset();
    editingPartyId = null;
}

// Save party
function saveParty() {
    const name = document.getElementById('partyName').value;
    const leader = document.getElementById('partyLeader').value;
    const date = document.getElementById('registrationDate').value;
    const logoColor = document.getElementById('partyLogo').value;
    const logoIcon = document.getElementById('logoIcon').value;

    // Format date to Thai
    const dateObj = new Date(date);
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = dateObj.getDate();
    const month = thaiMonths[dateObj.getMonth()];
    const year = dateObj.getFullYear() + 543; // Convert to Buddhist year
    const formattedDate = `${day} ${month} ${year}`;

    if (editingPartyId) {
        // Update existing party
        const index = partiesData.findIndex(p => p.id === editingPartyId);
        if (index !== -1) {
            partiesData[index] = {
                ...partiesData[index],
                name,
                leader,
                registrationDate: formattedDate,
                logoColor,
                logoIcon
            };
        }
    } else {
        // Add new party
        const newParty = {
            id: Math.max(...partiesData.map(p => p.id)) + 1,
            name,
            leader,
            registrationDate: formattedDate,
            logoColor,
            logoIcon
        };
        partiesData.push(newParty);
    }

    closeModal();
    renderTable();
    updatePagination();
}

// Edit party
function editParty(id) {
    const party = partiesData.find(p => p.id === id);
    if (!party) return;

    editingPartyId = id;
    document.getElementById('modalTitle').textContent = 'แก้ไขข้อมูลพรรค';
    document.getElementById('partyName').value = party.name;
    document.getElementById('partyLeader').value = party.leader;
    
    // Convert date format
    const dateParts = party.registrationDate.split(' ');
    const month = {
        'ม.ค.': '01', 'ก.พ.': '02', 'มี.ค.': '03', 'เม.ย.': '04',
        'พ.ค.': '05', 'มิ.ย.': '06', 'ก.ค.': '07', 'ส.ค.': '08',
        'ก.ย.': '09', 'ต.ค.': '10', 'พ.ย.': '11', 'ธ.ค.': '12'
    }[dateParts[1]];
    const day = dateParts[0];
    const year = parseInt(dateParts[2]) - 543; // Convert Buddhist year to Gregorian
    document.getElementById('registrationDate').value = `${year}-${month}-${day.padStart(2, '0')}`;
    
    document.getElementById('partyLogo').value = party.logoColor;
    document.getElementById('logoIcon').value = party.logoIcon;
    document.getElementById('partyModal').classList.add('show');
}

// Delete party
function deleteParty(id) {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบพรรคนี้?')) {
        partiesData = partiesData.filter(p => p.id !== id);
        
        // Adjust current page if needed
        const totalPages = Math.ceil(partiesData.length / itemsPerPage);
        if (currentPage > totalPages && currentPage > 1) {
            currentPage = totalPages;
        }
        
        renderTable();
        updatePagination();
    }
}
