// Sample data using existing parties and districts
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

// Election results data
let electionResults = {
    all: {
        totalVoters: 52400000,
        turnout: 42100000,
        precincts: { reported: 8452, total: 10200 },
        seats: { won: 380, total: 500 },
        partyResults: [
            { partyId: 1, votes: 18314800, seats: 162 },
            { partyId: 2, votes: 14041200, seats: 118 },
            { partyId: 3, votes: 4210000, seats: 42 },
            { partyId: 4, votes: 3168000, seats: 38 },
            { partyId: 5, votes: 1684000, seats: 12 },
            { partyId: 6, votes: 682200, seats: 8 }
        ]
    }
};

// Generate district-specific results
districts.forEach(district => {
    const baseVotes = Math.floor(Math.random() * 100000) + 50000;
    electionResults[district] = {
        totalVoters: baseVotes * 1.2,
        turnout: baseVotes,
        precincts: { reported: Math.floor(Math.random() * 50) + 50, total: 100 },
        seats: { won: Math.random() > 0.5 ? 1 : 0, total: 1 },
        partyResults: parties.map(party => ({
            partyId: party.id,
            votes: Math.floor(Math.random() * baseVotes * 0.4),
            seats: 0
        })).sort((a, b) => b.votes - a.votes)
    };
    // Assign seat to winner
    if (electionResults[district].seats.won === 1) {
        electionResults[district].partyResults[0].seats = 1;
    }
});

let currentDistrict = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateDistrictSelect();
    updateDashboard();
    setupEventListeners();
    startLiveUpdates();
});

// Populate district selector
function populateDistrictSelect() {
    const select = document.getElementById('districtSelect');
    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        select.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('districtSelect').addEventListener('change', (e) => {
        currentDistrict = e.target.value;
        updateDashboard();
    });
}

// Update dashboard with current district data
function updateDashboard() {
    const data = electionResults[currentDistrict];
    
    // Update stats
    updateStats(data);
    
    // Update leading parties
    updateLeadingParties(data);
    
    // Update vote distribution chart
    updateVoteChart(data);
    
    // Update district results table
    updateDistrictTable();
}

// Update stats cards
function updateStats(data) {
    document.getElementById('totalVoters').textContent = formatNumber(data.totalVoters);
    document.getElementById('turnout').textContent = formatNumber(data.turnout);
    document.getElementById('precincts').textContent = 
        `${formatNumber(data.precincts.reported)} / ${formatNumber(data.precincts.total)}`;
    document.getElementById('seats').textContent = 
        `${data.seats.won} / ${data.seats.total}`;
    
    const reportingPercent = (data.precincts.reported / data.precincts.total * 100).toFixed(1);
    document.getElementById('reportingPercent').textContent = reportingPercent + '%';
    document.getElementById('precinctsProgress').style.width = reportingPercent + '%';
    
    const turnoutPercent = (data.turnout / data.totalVoters * 100).toFixed(1);
    document.getElementById('turnoutPercent').textContent = turnoutPercent + '%';
}

// Update leading parties list
function updateLeadingParties(data) {
    const container = document.getElementById('leadingParties');
    const sortedResults = [...data.partyResults].sort((a, b) => b.votes - a.votes).slice(0, 5);
    const totalVotes = data.turnout;
    
    container.innerHTML = sortedResults.map(result => {
        const party = parties.find(p => p.id === result.partyId);
        const percent = (result.votes / totalVotes * 100).toFixed(1);
        
        return `
            <div class="party-item">
                <div class="party-header">
                    <span class="party-name">${party.name}</span>
                    <span class="party-percent" style="color: ${party.color}">${percent}%</span>
                </div>
                <div class="party-bar">
                    <div class="party-bar-fill" style="width: ${percent}%; background-color: ${party.color}"></div>
                </div>
                <div class="party-details">
                    <span>${formatNumber(result.votes)} คะแนน</span>
                    <span>${result.seats} ที่นั่ง</span>
                </div>
            </div>
        `;
    }).join('');
}

// Update vote distribution chart
function updateVoteChart(data) {
    const sortedResults = [...data.partyResults].sort((a, b) => b.votes - a.votes);
    const totalVotes = data.turnout;
    
    // Update donut chart
    const svg = document.getElementById('donutChart');
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let currentAngle = 0;
    
    // Remove old paths
    const oldPaths = svg.querySelectorAll('circle:not(:first-child)');
    oldPaths.forEach(path => path.remove());
    
    sortedResults.forEach(result => {
        const party = parties.find(p => p.id === result.partyId);
        const percent = result.votes / totalVotes;
        const strokeDasharray = `${circumference * percent} ${circumference}`;
        const rotation = currentAngle * 360;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '100');
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', party.color);
        circle.setAttribute('stroke-width', '40');
        circle.setAttribute('stroke-dasharray', strokeDasharray);
        circle.setAttribute('transform', `rotate(${rotation} 100 100)`);
        
        svg.appendChild(circle);
        
        currentAngle += percent;
    });
    
    // Update chart total
    document.getElementById('totalVotesChart').textContent = formatNumber(totalVotes);
    
    // Update legend
    const legend = document.getElementById('chartLegend');
    legend.innerHTML = sortedResults.slice(0, 5).map(result => {
        const party = parties.find(p => p.id === result.partyId);
        const percent = (result.votes / totalVotes * 100).toFixed(1);
        
        return `
            <div class="legend-item">
                <div class="legend-name">
                    <div class="legend-color-box" style="background-color: ${party.color}"></div>
                    ${party.name}
                </div>
                <div class="legend-value">${percent}%</div>
            </div>
        `;
    }).join('');
}

// Update district results table
function updateDistrictTable() {
    const tbody = document.getElementById('districtResults');
    
    const tableData = currentDistrict === 'all' 
        ? districts.map(d => ({ name: d, data: electionResults[d] }))
        : [{ name: currentDistrict, data: electionResults[currentDistrict] }];
    
    tbody.innerHTML = tableData.map(item => {
        const winner = item.data.partyResults[0];
        const runnerUp = item.data.partyResults[1];
        const winnerParty = parties.find(p => p.id === winner.partyId);
        const margin = ((winner.votes - runnerUp.votes) / item.data.turnout * 100).toFixed(1);
        const reporting = (item.data.precincts.reported / item.data.precincts.total * 100).toFixed(0);
        
        return `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>
                    <div class="winner-name" style="color: ${winnerParty.color}">${winnerParty.name}</div>
                </td>
                <td class="${parseFloat(margin) > 5 ? 'margin-positive' : 'margin-close'}">
                    +${margin}%
                </td>
                <td>${reporting}%</td>
                <td>${item.data.seats.won}</td>
            </tr>
        `;
    }).join('');
}

// Format number with M/K suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Simulate live updates
function startLiveUpdates() {
    setInterval(() => {
        const updates = [
            'พรรคก้าวหน้านำในกรุงเทพมหานคร เขต 1 ด้วยคะแนน 12,400 คะแนน',
            'พรรคเสรีไทยชนะในเชียงใหม่ เขต 2 ด้วยคะแนนนำ 8.2%',
            'การนับคะแนนในภูเก็ต เขต 1 เสร็จสมบูรณ์ 92%',
            'พรรคอนาคตเขียวชนะที่นั่งที่ 42 ในนครราชสีมา',
            'ผู้มาใช้สิทธิ์เลือกตั้งทะลุ 42 ล้านคนแล้ว'
        ];
        
        const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
        document.getElementById('liveUpdate').textContent = randomUpdate;
    }, 5000);
}
