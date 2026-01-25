const { createApp } = Vue;

// ข้อมูล Mock สำหรับการเลือกตั้ง
const electionData = {
    status: 'closed', // 'open' หรือ 'closed'
    closedAt: '2026-01-24 17:00:00',
    totalVoters: 45678,
    totalVoted: 38542,
    
    constituencies: [
        { id: 1, name: 'เขต 1', province: 'กรุงเทพมหานคร' },
        { id: 2, name: 'เขต 2', province: 'กรุงเทพมหานคร' },
        { id: 3, name: 'เขต 3', province: 'กรุงเทพมหานคร' },
        { id: 4, name: 'เขต 4', province: 'กรุงเทพมหานคร' },
        { id: 1, name: 'เขต 1', province: 'เชียงใหม่' },
        { id: 2, name: 'เขต 2', province: 'เชียงใหม่' },
    ],
    
    candidates: [
        {
            id: 1,
            name: 'สมชาย ใจดี',
            party: 'พรรคประชาธรรม',
            partyColor: '#1E40AF',
            image: 'https://ui-avatars.com/api/?name=Somchai&background=1E40AF&color=fff&size=200',
            number: 1,
            totalVotes: 12580,
            votesByConstituency: {
                'กรุงเทพมหานคร-เขต 1': 3200,
                'กรุงเทพมหานคร-เขต 2': 2800,
                'กรุงเทพมหานคร-เขต 3': 2100,
                'กรุงเทพมหานคร-เขต 4': 1980,
                'เชียงใหม่-เขต 1': 1500,
                'เชียงใหม่-เขต 2': 1000,
            }
        },
        {
            id: 2,
            name: 'สมหญิง รักชาติ',
            party: 'พรรคก้าวไกล',
            partyColor: '#F59E0B',
            image: 'https://ui-avatars.com/api/?name=Somying&background=F59E0B&color=fff&size=200',
            number: 2,
            totalVotes: 15420,
            votesByConstituency: {
                'กรุงเทพมหานคร-เขต 1': 4100,
                'กรุงเทพมหานคร-เขต 2': 3500,
                'กรุงเทพมหานคร-เขต 3': 2900,
                'กรุงเทพมหานคร-เขต 4': 2420,
                'เชียงใหม่-เขต 1': 1700,
                'เชียงใหม่-เขต 2': 800,
            }
        },
        {
            id: 3,
            name: 'วิชัย สร้างสรรค์',
            party: 'พรรคเพื่อไทย',
            partyColor: '#EF4444',
            image: 'https://ui-avatars.com/api/?name=Vichai&background=EF4444&color=fff&size=200',
            number: 3,
            totalVotes: 8320,
            votesByConstituency: {
                'กรุงเทพมหานคร-เขต 1': 2100,
                'กรุงเทพมหานคร-เขต 2': 1800,
                'กรุงเทพมหานคร-เขต 3': 1520,
                'กรุงเทพมหานคร-เขต 4': 1200,
                'เชียงใหม่-เขต 1': 900,
                'เชียงใหม่-เขต 2': 800,
            }
        },
        {
            id: 4,
            name: 'นภา พัฒนา',
            party: 'พรรคภูมิใจไทย',
            partyColor: '#10B981',
            image: 'https://ui-avatars.com/api/?name=Napa&background=10B981&color=fff&size=200',
            number: 4,
            totalVotes: 2222,
            votesByConstituency: {
                'กรุงเทพมหานคร-เขต 1': 600,
                'กรุงเทพมหานคร-เขต 2': 450,
                'กรุงเทพมหานคร-เขต 3': 380,
                'กรุงเทพมหานคร-เขต 4': 292,
                'เชียงใหม่-เขต 1': 300,
                'เชียงใหม่-เขต 2': 200,
            }
        }
    ]
};

const DashboardPage = {
    template: `
        <div class="dashboard-wrapper">
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
                        <span class="brand-text">ระบบเลือกตั้งออนไลน์</span>
                    </div>
                    <div class="navbar-actions">
                        <a href="index.html" class="btn-nav btn-login">เข้าสู่ระบบ</a>
                        <a href="register.html" class="btn-nav btn-register">ลงทะเบียน</a>
                    </div>
                </div>
            </nav>

            <div class="dashboard-container">
                <!-- Header Section -->
                <div class="dashboard-header">
                    <div class="header-content">
                        <h1 class="page-title">ผลการเลือกตั้ง 2026</h1>
                        <p class="page-subtitle">ติดตามผลการเลือกตั้งแบบเรียลไทม์</p>
                    </div>
                    
                    <!-- Election Status Badge -->
                    <div class="election-status" :class="electionStatus.class">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path v-if="election.status === 'open'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                            <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span>{{ electionStatus.text }}</span>
                    </div>
                </div>

                <!-- Statistics Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: #EFF6FF; color: #1E40AF;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">ผู้มีสิทธิ์เลือกตั้ง</div>
                            <div class="stat-value">{{ formatNumber(election.totalVoters) }}</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #D1FAE5; color: #10B981;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">ลงคะแนนแล้ว</div>
                            <div class="stat-value">{{ formatNumber(election.totalVoted) }}</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #FEF3C7; color: #F59E0B;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">เปอร์เซ็นต์การลงคะแนน</div>
                            <div class="stat-value">{{ votePercentage }}%</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #E0E7FF; color: #6366F1;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-label">จำนวนผู้สมัคร</div>
                            <div class="stat-value">{{ election.candidates.length }}</div>
                        </div>
                    </div>
                </div>

                <!-- Filter Section -->
                <div class="filter-section">
                    <div class="filter-header">
                        <h2 class="filter-title">กรองข้อมูล</h2>
                        <button v-if="selectedConstituency" @click="clearFilter" class="btn-clear-filter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                            ล้างตัวกรอง
                        </button>
                    </div>
                    <div class="filter-controls">
                        <div class="form-group">
                            <label class="form-label">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                </svg>
                                เลือกเขตเลือกตั้ง
                            </label>
                            <select v-model="selectedConstituency" class="form-input">
                                <option value="">ทุกเขต (แสดงผลรวม)</option>
                                <optgroup v-for="(group, province) in constituenciesByProvince" :key="province" :label="province">
                                    <option v-for="constituency in group" :key="constituency.key" :value="constituency.key">
                                        {{ constituency.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Results Section -->
                <div class="results-section">
                    <div class="results-header">
                        <h2 class="results-title">
                            {{ selectedConstituency ? 'ผลคะแนนรายเขต' : 'ผลคะแนนรวมทั้งหมด' }}
                        </h2>
                        <div v-if="selectedConstituency" class="selected-constituency-badge">
                            {{ getConstituencyName(selectedConstituency) }}
                        </div>
                    </div>

                    <!-- Candidates Grid -->
                    <div class="candidates-grid">
                        <div 
                            v-for="candidate in sortedCandidates" 
                            :key="candidate.id" 
                            class="candidate-card"
                            :class="{ 'winner': isWinner(candidate) && election.status === 'closed' }"
                        >
                            <!-- Winner Badge -->
                            <div v-if="isWinner(candidate) && election.status === 'closed'" class="winner-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                ผู้ชนะการเลือกตั้ง
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
                            </div>

                            <!-- Show votes only if election is closed -->
                            <div v-if="election.status === 'closed'" class="candidate-votes">
                                <div class="votes-count">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="votes-number">{{ formatNumber(getCandidateVotes(candidate)) }}</span>
                                    <span class="votes-label">คะแนน</span>
                                </div>
                                <div class="votes-percentage">
                                    {{ getCandidatePercentage(candidate) }}%
                                </div>
                                <div class="votes-bar">
                                    <div 
                                        class="votes-bar-fill" 
                                        :style="{ width: getCandidatePercentage(candidate) + '%', background: candidate.partyColor }"
                                    ></div>
                                </div>
                            </div>

                            <!-- Show status if election is still open -->
                            <div v-else class="candidate-status">
                                <div class="status-waiting">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>รอปิดหีบเพื่อนับคะแนน</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="dashboard-footer">
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
            election: electionData,
            selectedConstituency: ''
        }
    },
    computed: {
        electionStatus() {
            if (this.election.status === 'open') {
                return {
                    text: 'กำลังเปิดหีบลงคะแนน',
                    class: 'status-open'
                };
            } else {
                return {
                    text: 'ปิดหีบแล้ว - แสดงผลคะแนน',
                    class: 'status-closed'
                };
            }
        },
        votePercentage() {
            return ((this.election.totalVoted / this.election.totalVoters) * 100).toFixed(2);
        },
        constituenciesByProvince() {
            const grouped = {};
            this.election.constituencies.forEach(c => {
                const key = `${c.province}-${c.name}`;
                if (!grouped[c.province]) {
                    grouped[c.province] = [];
                }
                grouped[c.province].push({
                    key: key,
                    name: c.name
                });
            });
            return grouped;
        },
        sortedCandidates() {
            if (this.election.status === 'open') {
                return [...this.election.candidates].sort((a, b) => a.number - b.number);
            } else {
                return [...this.election.candidates].sort((a, b) => {
                    return this.getCandidateVotes(b) - this.getCandidateVotes(a);
                });
            }
        },
        totalVotesForConstituency() {
            if (!this.selectedConstituency) {
                return this.election.candidates.reduce((sum, c) => sum + c.totalVotes, 0);
            }
            return this.election.candidates.reduce((sum, c) => {
                return sum + (c.votesByConstituency[this.selectedConstituency] || 0);
            }, 0);
        }
    },
    methods: {
        formatNumber(num) {
            return num.toLocaleString('th-TH');
        },
        getCandidateVotes(candidate) {
            if (!this.selectedConstituency) {
                return candidate.totalVotes;
            }
            return candidate.votesByConstituency[this.selectedConstituency] || 0;
        },
        getCandidatePercentage(candidate) {
            const votes = this.getCandidateVotes(candidate);
            const total = this.totalVotesForConstituency;
            return total > 0 ? ((votes / total) * 100).toFixed(2) : 0;
        },
        isWinner(candidate) {
            if (this.election.status !== 'closed') return false;
            const maxVotes = Math.max(...this.election.candidates.map(c => this.getCandidateVotes(c)));
            return this.getCandidateVotes(candidate) === maxVotes;
        },
        getConstituencyName(key) {
            return key.replace('-', ' ');
        },
        clearFilter() {
            this.selectedConstituency = '';
        }
    }
};

const app = createApp({
    components: {
        DashboardPage
    }
});

app.mount('#app');
