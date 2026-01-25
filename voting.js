const { createApp } = Vue;

// ข้อมูล Mock ผู้ใช้ที่เข้าสู่ระบบ
const currentUser = {
    citizenId: '1234567890123',
    firstName: 'สมชาย',
    lastName: 'ทดสอบ',
    province: 'กรุงเทพมหานคร',
    district: 'บางรัก',
    constituency: 'เขต 1',
    hasVoted: false,
    votedAt: null
};

// ตรวจสอบสถานะการลงคะแนนจาก localStorage
function loadVotingStatus() {
    const votingData = localStorage.getItem('votingData_' + currentUser.citizenId);
    if (votingData) {
        const data = JSON.parse(votingData);
        currentUser.hasVoted = data.hasVoted;
        currentUser.votedAt = data.votedAt;
    }
}

loadVotingStatus();

// ข้อมูลการเลือกตั้ง
const electionInfo = {
    title: 'การเลือกตั้งสมาชิกสภาผู้แทนราษฎร 2026',
    status: 'open', // 'open', 'closed', 'upcoming'
    startDate: '2026-01-24 08:00:00',
    endDate: '2026-01-24 17:00:00'
};

// รายชื่อผู้สมัครในเขตของผู้ใช้
const candidates = [
    {
        id: 1,
        name: 'สมชาย ใจดี',
        party: 'พรรคประชาธรรม',
        partyColor: '#1E40AF',
        image: 'https://ui-avatars.com/api/?name=Somchai&background=1E40AF&color=fff&size=400',
        number: 1,
        age: 45,
        education: 'ปริญญาโท รัฐศาสตร์',
        policies: [
            'พัฒนาโครงสร้างพื้นฐาน',
            'ส่งเสริมการศึกษาคุณภาพ',
            'เพิ่มสวัสดิการผู้สูงอายุ'
        ]
    },
    {
        id: 2,
        name: 'สมหญิง รักชาติ',
        party: 'พรรคก้าวไกล',
        partyColor: '#F59E0B',
        image: 'https://ui-avatars.com/api/?name=Somying&background=F59E0B&color=fff&size=400',
        number: 2,
        age: 38,
        education: 'ปริญญาเอก เศรษฐศาสตร์',
        policies: [
            'ปฏิรูประบบสาธารณสุข',
            'สนับสนุน SME และสตาร์ทอัพ',
            'แก้ปัญหาหนี้ครัวเรือน'
        ]
    },
    {
        id: 3,
        name: 'วิชัย สร้างสรรค์',
        party: 'พรรคเพื่อไทย',
        partyColor: '#EF4444',
        image: 'https://ui-avatars.com/api/?name=Vichai&background=EF4444&color=fff&size=400',
        number: 3,
        age: 52,
        education: 'ปริญญาตรี บริหารธุรกิจ',
        policies: [
            'เพิ่มรายได้เกษตรกร',
            'พัฒนาระบบขนส่งสาธารณะ',
            'ลดความเหลื่อมล้ำ'
        ]
    },
    {
        id: 4,
        name: 'นภา พัฒนา',
        party: 'พรรคภูมิใจไทย',
        partyColor: '#10B981',
        image: 'https://ui-avatars.com/api/?name=Napa&background=10B981&color=fff&size=400',
        number: 4,
        age: 41,
        education: 'ปริญญาโท วิศวกรรมศาสตร์',
        policies: [
            'ส่งเสริมพลังงานสะอาด',
            'พัฒนาเมืองอัจฉริยะ',
            'สร้างงานคุณภาพ'
        ]
    }
];

const VotingPage = {
    template: `
        <div class="voting-wrapper">
            <!-- Top Navigation Bar -->
            <nav class="navbar">
                <div class="navbar-container">
                    <div class="navbar-brand">
                        <div class="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-6-5.24-6-9V8.3l6-3 6 3V11c0 3.76-2.13 8.06-6 9z"/>
                                <path d="M8 11h2v6H8zm6 0h2v6h-2zm-3-2h2v8h-2z"/>
                            </svg>
                        </div>
                        <div class="brand-info">
                            <span class="brand-text">ระบบเลือกตั้งออนไลน์</span>
                            <span class="brand-subtitle">Online Voting System</span>
                        </div>
                    </div>
                    <div class="navbar-user">
                        <div class="user-info">
                            <div class="user-avatar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div class="user-details">
                                <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                                <div class="user-constituency">{{ user.province }} {{ user.constituency }}</div>
                            </div>
                        </div>
                        <a href="index.html" class="btn-logout">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
                            </svg>
                            ออกจากระบบ
                        </a>
                    </div>
                </div>
            </nav>

            <div class="voting-container">
                <!-- Header Section -->
                <div class="voting-header">
                    <div class="header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h1 class="page-title">{{ election.title }}</h1>
                    <p class="page-subtitle">{{ user.province }} - {{ user.constituency }}</p>
                    
                    <!-- Election Status -->
                    <div class="election-status" :class="electionStatusClass">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path v-if="election.status === 'open'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                            <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span>{{ electionStatusText }}</span>
                    </div>
                </div>

                <!-- Alert Messages -->
                <div v-if="errorMessage" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ errorMessage }}</span>
                </div>

                <div v-if="successMessage" class="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ successMessage }}</span>
                </div>

                <!-- Already Voted Section (Only if election is closed) -->
                <div v-if="user.hasVoted && election.status === 'closed'" class="voted-section">
                    <div class="voted-card">
                        <div class="voted-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h2>การเลือกตั้งปิดหีบแล้ว</h2>
                        <p>คุณได้ลงคะแนนเสียงเรียบร้อยแล้ว</p>
                        <div class="voted-time">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                            </svg>
                            ลงคะแนนเมื่อ: {{ formatDateTime(user.votedAt) }}
                        </div>
                        <a href="dashboard.html" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                            ดูผลการเลือกตั้ง
                        </a>
                    </div>
                </div>

                <!-- Voting Section -->
                <div v-else-if="election.status === 'open'" class="voting-section">
                    <!-- Alert for users who already voted but can change -->
                    <div v-if="user.hasVoted" class="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                        </svg>
                        <span>คุณได้ลงคะแนนไปแล้วเมื่อ {{ formatDateTime(user.votedAt) }} แต่ยังสามารถเปลี่ยนแปลงได้จนกว่าจะปิดหีบ</span>
                    </div>
                    <div class="instruction-card">
                        <h3 class="instruction-title">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                            </svg>
                            วิธีการลงคะแนน
                        </h3>
                        <ol class="instruction-list">
                            <li>เลือกผู้สมัครที่คุณต้องการสนับสนุน</li>
                            <li>ตรวจสอบข้อมูลให้ถูกต้อง</li>
                            <li>กดปุ่ม "ยืนยันการลงคะแนน"</li>
                            <li><strong>หมายเหตุ:</strong> คุณสามารถเปลี่ยนแปลงการลงคะแนนได้จนกว่าจะปิดหีบ</li>
                        </ol>
                    </div>

                    <!-- Candidates Grid -->
                    <div class="candidates-grid">
                        <div 
                            v-for="candidate in candidates" 
                            :key="candidate.id"
                            class="candidate-card"
                            :class="{ 'selected': selectedCandidate && selectedCandidate.id === candidate.id }"
                            @click="selectCandidate(candidate)"
                        >
                            <div class="selection-indicator">
                                <div class="radio-button">
                                    <div v-if="selectedCandidate && selectedCandidate.id === candidate.id" class="radio-dot"></div>
                                </div>
                            </div>

                            <div class="candidate-number" :style="{ background: candidate.partyColor }">
                                {{ candidate.number }}
                            </div>

                            <div class="candidate-image">
                                <img :src="candidate.image" :alt="candidate.name">
                            </div>

                            <div class="candidate-info">
                                <h3 class="candidate-name">{{ candidate.name }}</h3>
                                <p class="candidate-party" :style="{ color: candidate.partyColor }">
                                    {{ candidate.party }}
                                </p>
                                <div class="candidate-details">
                                    <div class="detail-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                        </svg>
                                        <span>อายุ {{ candidate.age }} ปี</span>
                                    </div>
                                    <div class="detail-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                        </svg>
                                        <span>{{ candidate.education }}</span>
                                    </div>
                                </div>

                                <div class="candidate-policies">
                                    <h4>นโยบายหลัก:</h4>
                                    <ul>
                                        <li v-for="(policy, index) in candidate.policies" :key="index">
                                            {{ policy }}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <button 
                                v-if="selectedCandidate && selectedCandidate.id === candidate.id"
                                class="btn-selected"
                                :style="{ background: candidate.partyColor }"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                เลือกแล้ว
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Section -->
                    <div v-if="selectedCandidate" class="confirm-section">
                        <div class="confirm-card">
                            <h3 class="confirm-title">ยืนยันการลงคะแนน</h3>
                            <p class="confirm-description">คุณเลือกที่จะลงคะแนนให้กับ:</p>
                            
                            <div class="selected-candidate-summary">
                                <div class="summary-image">
                                    <img :src="selectedCandidate.image" :alt="selectedCandidate.name">
                                </div>
                                <div class="summary-info">
                                    <div class="summary-number" :style="{ background: selectedCandidate.partyColor }">
                                        หมายเลข {{ selectedCandidate.number }}
                                    </div>
                                    <h4>{{ selectedCandidate.name }}</h4>
                                    <p :style="{ color: selectedCandidate.partyColor }">{{ selectedCandidate.party }}</p>
                                </div>
                            </div>

                            <div class="warning-box">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                                <span>คุณสามารถเปลี่ยนแปลงการลงคะแนนได้จนกว่าจะปิดหีบ</span>
                            </div>

                            <div class="confirm-actions">
                                <button @click="cancelSelection" class="btn-cancel">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                    </svg>
                                    ยกเลิก
                                </button>
                                <button @click="confirmVote" class="btn-confirm" :disabled="isLoading">
                                    <span v-if="!isLoading">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        {{ user.hasVoted ? 'เปลี่ยนการลงคะแนน' : 'ยืนยันการลงคะแนน' }}
                                    </span>
                                    <span v-else class="loading-spinner">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="32" stroke-linecap="round">
                                                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                                            </circle>
                                        </svg>
                                        กำลังบันทึก...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Election Closed Section -->
                <div v-else class="voted-section">
                    <div class="voted-card">
                        <div class="voted-icon" style="background: #EF4444;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h2>การเลือกตั้งปิดรับลงคะแนนแล้ว</h2>
                        <p>ขณะนี้ไม่สามารถลงคะแนนเสียงได้</p>
                        <a href="dashboard.html" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                            ดูผลการเลือกตั้ง
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="voting-footer">
                <p>&copy; 2026 ระบบเลือกตั้งออนไลน์ | ปลอดภัย มั่นคง โปร่งใส</p>
                <div class="footer-links">
                    <a href="#">นโยบายความเป็นส่วนตัว</a>
                    <span>•</span>
                    <a href="#">เงื่อนไขการใช้งาน</a>
                    <span>•</span>
                    <a href="#">ติดต่อเรา</a>
                </div>
            </footer>
        </div>
    `,
    data() {
        return {
            user: currentUser,
            election: electionInfo,
            candidates: candidates,
            selectedCandidate: null,
            errorMessage: '',
            successMessage: '',
            isLoading: false
        }
    },
    computed: {
        electionStatusClass() {
            return this.election.status === 'open' ? 'status-open' : 'status-closed';
        },
        electionStatusText() {
            return this.election.status === 'open' ? 
                'เปิดรับลงคะแนน' : 
                'ปิดรับลงคะแนนแล้ว';
        }
    },
    methods: {
        selectCandidate(candidate) {
            if (this.election.status !== 'open') {
                this.errorMessage = 'การเลือกตั้งปิดรับลงคะแนนแล้ว';
                return;
            }
            this.selectedCandidate = candidate;
            this.errorMessage = '';
            
            // Scroll to confirm section
            setTimeout(() => {
                const confirmSection = document.querySelector('.confirm-section');
                if (confirmSection) {
                    confirmSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        },
        cancelSelection() {
            this.selectedCandidate = null;
            this.errorMessage = '';
        },
        async confirmVote() {
            if (!this.selectedCandidate) {
                this.errorMessage = 'กรุณาเลือกผู้สมัครก่อนยืนยันการลงคะแนน';
                return;
            }

            if (this.election.status !== 'open') {
                this.errorMessage = 'การเลือกตั้งปิดรับลงคะแนนแล้ว ไม่สามารถลงคะแนนหรือเปลี่ยนแปลงได้';
                return;
            }

            this.isLoading = true;
            this.errorMessage = '';

            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                const isChanging = this.user.hasVoted;
                this.user.hasVoted = true;
                this.user.votedAt = new Date().toISOString();
                
                // บันทึกสถานะการลงคะแนนลง localStorage
                const votingData = {
                    hasVoted: true,
                    votedAt: this.user.votedAt,
                    candidateId: this.selectedCandidate.id
                };
                localStorage.setItem('votingData_' + this.user.citizenId, JSON.stringify(votingData));
                
                this.successMessage = isChanging 
                    ? 'เปลี่ยนแปลงการลงคะแนนสำเร็จ! คุณสามารถเปลี่ยนแปลงได้อีกจนกว่าจะปิดหีบ' 
                    : 'ลงคะแนนเสียงสำเร็จ! คุณสามารถเปลี่ยนแปลงได้จนกว่าจะปิดหีบ';
                
                // Clear selection and scroll to top
                this.selectedCandidate = null;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    this.successMessage = '';
                }, 5000);
            }, 2000);
        },
        formatDateTime(dateTimeString) {
            if (!dateTimeString) return '';
            const date = new Date(dateTimeString);
            return date.toLocaleString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
};

const app = createApp({
    components: {
        VotingPage
    }
});

app.mount('#app');
