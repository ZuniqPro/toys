/**
 * LIFEPULSE - Blood Donation & Inventory Management System
 * Core State, WhatsApp Integration & HTML5 GPS Live Location Engine
 */

// Initial Seed Dataset for Peshawar, Pakistan with authentic Pakistani names & GPS coordinates
const INITIAL_DONORS = [
    { id: 'd-101', name: 'Muhammad Ali Khan', group: 'O+', age: 29, gender: 'Male', phone: '+923005912345', email: 'm.ali.khan@gmail.com', city: 'Saddar Bazar, Peshawar', lat: 34.0040, lng: 71.5369, lastDate: '2026-07-15', status: 'Available' },
    { id: 'd-102', name: 'Fatima Zahra', group: 'A-', age: 25, gender: 'Female', phone: '+923339876543', email: 'fatima.z@live.com', city: 'Hayatabad Phase 4, Peshawar', lat: 33.9922, lng: 71.4398, lastDate: '2026-09-02', status: 'Available' },
    { id: 'd-103', name: 'Dr. Hamza Shah', group: 'B+', age: 34, gender: 'Male', phone: '+923125544332', email: 'dr.hamza@kth.edu.pk', city: 'University Town, Peshawar', lat: 34.0089, lng: 71.4851, lastDate: '2026-08-10', status: 'Available' },
    { id: 'd-104', name: 'Ayesha Rehman', group: 'O-', age: 28, gender: 'Female', phone: '+923451122334', email: 'ayesha.r@uop.edu.pk', city: 'Gulbahar Colony, Peshawar', lat: 34.0125, lng: 71.5833, lastDate: '2026-06-20', status: 'Available' },
    { id: 'd-105', name: 'Tariq Mehmood', group: 'AB+', age: 41, gender: 'Male', phone: '+923018877665', email: 'tariq.m@tech.pk', city: 'Dabgari Garden, Peshawar', lat: 34.0094, lng: 71.5654, lastDate: '2026-10-01', status: 'Unavailable' },
    { id: 'd-106', name: 'Bilal Ahmed Khattak', group: 'B-', age: 23, gender: 'Male', phone: '+923159988776', email: 'bilal.khattak@gmail.com', city: 'Warsak Road, Peshawar', lat: 34.0410, lng: 71.5200, lastDate: '2026-05-12', status: 'Available' },
    { id: 'd-107', name: 'Usman Abbasi', group: 'A+', age: 31, gender: 'Male', phone: '+923347766554', email: 'usman.abbasi@gmail.com', city: 'Khyber Bazaar, Peshawar', lat: 34.0101, lng: 71.5710, lastDate: '2026-08-28', status: 'Available' }
];

const INITIAL_INVENTORY = [
    { id: 'inv-801', batch: 'LRH-O101', group: 'O+', volume: 450, source: 'Muhammad Ali Khan', collectionDate: '2026-09-20', expiryDate: '2026-11-04', location: 'LRH Main Bank - Freezer 1', status: 'Fresh' },
    { id: 'inv-802', batch: 'HMC-A202', group: 'A+', volume: 450, source: 'Fatima Zahra', collectionDate: '2026-09-18', expiryDate: '2026-11-02', location: 'HMC Blood Unit - Shelf B', status: 'Fresh' },
    { id: 'inv-803', batch: 'KTH-B303', group: 'B+', volume: 450, source: 'Dr. Hamza Shah', collectionDate: '2026-09-25', expiryDate: '2026-11-09', location: 'KTH Freezer 2', status: 'Fresh' },
    { id: 'inv-804', batch: 'RMI-O404', group: 'O-', volume: 450, source: 'Ayesha Rehman', collectionDate: '2026-09-10', expiryDate: '2026-10-25', location: 'Emergency Blood Safe 1', status: 'Fresh' },
    { id: 'inv-805', batch: 'LRH-AB5', group: 'AB-', volume: 400, source: 'University Campus Drive', collectionDate: '2026-09-01', expiryDate: '2026-10-16', location: 'LRH Reserve Vault', status: 'Expiring Soon' },
    { id: 'inv-806', batch: 'HMC-A606', group: 'A-', volume: 450, source: 'Usman Abbasi', collectionDate: '2026-09-28', expiryDate: '2026-11-12', location: 'HMC Main Freezer', status: 'Fresh' }
];

const INITIAL_REQUESTS = [
    { id: 'req-301', patient: 'Zeeshan Afridi', group: 'O-', units: 2, hospital: 'Lady Reading Hospital (LRH), Emergency Ward, Peshawar', lat: 34.0151, lng: 71.5714, urgency: 'Critical Emergency', contact: '+923009876543', date: '2026-10-06', status: 'Pending' },
    { id: 'req-302', patient: 'Gul Khanam', group: 'B+', units: 1, hospital: 'Hayatabad Medical Complex (HMC), ICU Room 204, Peshawar', lat: 33.9922, lng: 71.4398, urgency: 'Urgent', contact: '+923335544332', date: '2026-10-05', status: 'Pending' },
    { id: 'req-303', patient: 'Kamran Shinwari', group: 'A+', units: 3, hospital: 'Khyber Teaching Hospital (KTH), Surgical Ward, Peshawar', lat: 34.0089, lng: 71.4851, urgency: 'Normal', contact: '+923128877665', date: '2026-10-02', status: 'Fulfilled' }
];

class LifePulseApp {
    constructor() {
        this.donors = [];
        this.inventory = [];
        this.requests = [];
        this.deleteTarget = null;

        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupTheme();
        this.renderAll();
    }

    // Load from LocalStorage or seed defaults
    loadData() {
        const storedDonors = localStorage.getItem('lifepulse_donors');
        const storedInv = localStorage.getItem('lifepulse_inventory');
        const storedReq = localStorage.getItem('lifepulse_requests');

        this.donors = storedDonors ? JSON.parse(storedDonors) : [...INITIAL_DONORS];
        this.inventory = storedInv ? JSON.parse(storedInv) : [...INITIAL_INVENTORY];
        this.requests = storedReq ? JSON.parse(storedReq) : [...INITIAL_REQUESTS];

        this.saveData();
    }

    saveData() {
        localStorage.setItem('lifepulse_donors', JSON.stringify(this.donors));
        localStorage.setItem('lifepulse_inventory', JSON.stringify(this.inventory));
        localStorage.setItem('lifepulse_requests', JSON.stringify(this.requests));
    }

    resetDemoData() {
        this.donors = [...INITIAL_DONORS];
        this.inventory = [...INITIAL_INVENTORY];
        this.requests = [...INITIAL_REQUESTS];
        this.saveData();
        this.renderAll();
        this.showToast('Demo dataset has been reset with live GPS & WhatsApp details!', 'info');
    }

    // Theme Management
    setupTheme() {
        const currentTheme = localStorage.getItem('lifepulse_theme') || 'dark';
        if (currentTheme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            this.updateThemeIcon('light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            this.updateThemeIcon('dark');
        }
    }

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('lifepulse_theme', 'light');
            this.updateThemeIcon('light');
            this.showToast('Switched to Light Theme', 'info');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('lifepulse_theme', 'dark');
            this.updateThemeIcon('dark');
            this.showToast('Switched to Dark Theme', 'info');
        }
    }

    updateThemeIcon(theme) {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.innerHTML = theme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        }
    }

    // Setup Event Handlers
    setupEventListeners() {
        // Navigation Tabs
        document.querySelectorAll('.nav-btn, .nav-jump-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = btn.getAttribute('data-tab');
                if (targetTab) this.switchTab(targetTab);
            });
        });

        // Theme Toggle
        document.getElementById('theme-toggle-btn').addEventListener('click', () => this.toggleTheme());

        // Reset & Export Buttons
        document.getElementById('seed-data-btn').addEventListener('click', () => this.resetDemoData());
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportJSON());

        // Open Modal Buttons
        document.getElementById('open-donate-modal-btn').addEventListener('click', () => this.openDonorModal());
        document.getElementById('open-add-donor-btn-2').addEventListener('click', () => this.openDonorModal());
        document.getElementById('open-request-modal-btn').addEventListener('click', () => this.openRequestModal());
        document.getElementById('open-create-request-btn-2').addEventListener('click', () => this.openRequestModal());
        document.getElementById('open-add-stock-modal-btn').addEventListener('click', () => this.openInventoryModal());

        const sosBtn = document.getElementById('open-sos-modal-btn');
        if (sosBtn) {
            sosBtn.addEventListener('click', () => this.openModal('sos-modal'));
        }

        // Close Modal Buttons
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                if (modalId) this.closeModal(modalId);
            });
        });

        // GPS Geolocation Detect Buttons
        const donorGpsBtn = document.getElementById('detect-donor-location-btn');
        if (donorGpsBtn) {
            donorGpsBtn.addEventListener('click', () => {
                this.detectLiveLocation('donor-city', 'donor-lat', 'donor-lng', 'donor-location-status');
            });
        }

        const reqGpsBtn = document.getElementById('detect-req-location-btn');
        if (reqGpsBtn) {
            reqGpsBtn.addEventListener('click', () => {
                this.detectLiveLocation('req-hospital', 'req-lat', 'req-lng', 'req-location-status');
            });
        }

        // Form Submissions
        document.getElementById('donor-form').addEventListener('submit', (e) => this.handleDonorSubmit(e));
        document.getElementById('inventory-form').addEventListener('submit', (e) => this.handleInventorySubmit(e));
        document.getElementById('request-form').addEventListener('submit', (e) => this.handleRequestSubmit(e));

        // Delete Confirm Button
        document.getElementById('confirm-delete-btn').addEventListener('click', () => this.executeDelete());

        // Search & Filters
        document.getElementById('donor-search-input').addEventListener('input', () => this.renderFindDonors());
        document.getElementById('donor-filter-group').addEventListener('change', () => this.renderFindDonors());
        document.getElementById('donor-filter-status').addEventListener('change', () => this.renderFindDonors());
        document.getElementById('reset-donor-filters').addEventListener('click', () => {
            document.getElementById('donor-search-input').value = '';
            document.getElementById('donor-filter-group').value = 'ALL';
            document.getElementById('donor-filter-status').value = 'ALL';
            this.renderFindDonors();
        });

        document.getElementById('registry-search-input').addEventListener('input', () => this.renderDonorTable());
        document.getElementById('inventory-filter-group').addEventListener('change', () => this.renderInventoryTable());
        document.getElementById('request-filter-status').addEventListener('change', () => this.renderRequestsTable());

        // Certificate Print & WhatsApp Share
        const printBtn = document.getElementById('print-cert-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }

        const shareCertBtn = document.getElementById('share-cert-whatsapp-btn');
        if (shareCertBtn) {
            shareCertBtn.addEventListener('click', () => {
                const donorName = document.getElementById('cert-donor-name').textContent;
                const donorGroup = document.getElementById('cert-donor-group').textContent;
                const serial = document.getElementById('cert-serial-no').textContent;
                const msg = `🏆 Official Blood Donor Certificate of Appreciation!\n\nThis certifies that ${donorName} donated ${donorGroup} blood on LifePulse Network.\nCertificate ID: ${serial}\nThank you for saving lives! 🩸❤️`;
                this.sendWhatsApp('', msg);
            });
        }
    }

    // HTML5 GEOLOCATION API (LIVE GPS DETECT)
    detectLiveLocation(cityInputId, latInputId, lngInputId, statusId) {
        const cityInput = document.getElementById(cityInputId);
        const latInput = document.getElementById(latInputId);
        const lngInput = document.getElementById(lngInputId);
        const statusSpan = document.getElementById(statusId);

        if (!navigator.geolocation) {
            this.showToast('Geolocation is not supported by your browser.', 'danger');
            if (statusSpan) statusSpan.textContent = 'Geolocation unsupported.';
            return;
        }

        if (statusSpan) statusSpan.textContent = '📍 Acquiring GPS signal...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                if (latInput) latInput.value = lat;
                if (lngInput) lngInput.value = lng;

                const gpsLabel = `Live GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                cityInput.value = gpsLabel;

                if (statusSpan) statusSpan.innerHTML = `<span class="text-success"><i class="fa-solid fa-circle-check"></i> GPS Location Acquired!</span>`;
                this.showToast(`Live location detected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, 'success');
            },
            (error) => {
                let msg = 'Failed to acquire location.';
                if (error.code === error.PERMISSION_DENIED) msg = 'Location permission denied.';
                if (statusSpan) statusSpan.innerHTML = `<span class="text-danger"><i class="fa-solid fa-triangle-exclamation"></i> ${msg}</span>`;
                this.showToast(msg, 'amber');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }

    // WHATSAPP DIRECT MESSAGE INTEGRATION
    sendWhatsApp(phone, message) {
        if (!phone) {
            this.showToast('No phone number available for WhatsApp.', 'danger');
            return;
        }
        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        const url = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        this.showToast(`Opening WhatsApp chat for ${cleanPhone}...`, 'success');
    }

    sendWhatsAppDonor(id) {
        const donor = this.donors.find(d => d.id === id);
        if (!donor) return;
        const message = `Hello ${donor.name},\n\nWe urgently need a blood donor for blood group ${donor.group} in ${donor.city}.\nAre you available to donate and help save a life?\n\n- Sent via LifePulse Blood Portal`;
        this.sendWhatsApp(donor.phone, message);
    }

    sendWhatsAppRequest(id) {
        const req = this.requests.find(r => r.id === id);
        if (!req) return;
        const message = `Hello,\n\nI am contacting you regarding the emergency blood request for patient ${req.patient} (${req.units} units of ${req.group} blood at ${req.hospital}).\n\n- LifePulse Blood Donation Team`;
        this.sendWhatsApp(req.contact, message);
    }

    // GOOGLE MAPS NAVIGATION INTEGRATION
    viewOnMap(lat, lng, addressQuery) {
        let mapsUrl = '';
        if (lat && lng && lat !== 'undefined' && lng !== 'undefined') {
            mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        } else if (addressQuery) {
            mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`;
        } else {
            this.showToast('No map location details available.', 'amber');
            return;
        }
        window.open(mapsUrl, '_blank');
        this.showToast('Opening location on Google Maps...', 'info');
    }

    // Navigation Switcher
    switchTab(tabId) {
        document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const activeView = document.getElementById(tabId);
        if (activeView) {
            activeView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Modal Controls
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // Render All Components
    renderAll() {
        this.renderMetrics();
        this.renderBloodGroupStockGrid();
        this.renderDashboardLists();
        this.renderFindDonors();
        this.renderDonorTable();
        this.renderInventoryTable();
        this.renderRequestsTable();
    }

    // 1. DASHBOARD RENDERERS
    renderMetrics() {
        document.getElementById('stat-total-donors').textContent = this.donors.length;
        
        const totalUnits = this.inventory.length;
        document.getElementById('stat-total-units').textContent = totalUnits;

        const pendingReqs = this.requests.filter(r => r.status === 'Pending').length;
        document.getElementById('stat-pending-requests').textContent = pendingReqs;
        document.getElementById('nav-pending-badge').textContent = pendingReqs;
        document.getElementById('requests-pending-count-badge').textContent = `${pendingReqs} Pending`;

        const livesSaved = this.requests.filter(r => r.status === 'Fulfilled').length;
        document.getElementById('stat-lives-saved').textContent = livesSaved;
    }

    renderBloodGroupStockGrid() {
        const groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        const container = document.getElementById('blood-groups-stock-container');
        container.innerHTML = '';

        groups.forEach(grp => {
            const count = this.inventory.filter(i => i.group === grp).length;
            const donorCount = this.donors.filter(d => d.group === grp && d.status === 'Available').length;
            
            let fillClass = '';
            if (count === 0) fillClass = 'critical';
            else if (count <= 2) fillClass = 'low';

            const fillWidth = Math.min(100, Math.max(10, count * 20));

            const card = document.createElement('div');
            card.className = 'blood-stock-card';
            card.innerHTML = `
                <div class="blood-badge">${grp}</div>
                <div class="stock-count">${count}</div>
                <div class="stock-unit">Units Stocked</div>
                <div class="stock-level-bar">
                    <div class="stock-level-fill ${fillClass}" style="width: ${fillWidth}%;"></div>
                </div>
                <div class="mt-2 text-muted" style="font-size: 0.74rem;">
                    <i class="fa-solid fa-user-check text-success"></i> ${donorCount} Donors Ready
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderDashboardLists() {
        // Urgent requests
        const reqList = document.getElementById('dashboard-recent-requests');
        const recentReqs = this.requests.filter(r => r.status === 'Pending').slice(0, 4);
        
        if (recentReqs.length === 0) {
            reqList.innerHTML = `<div class="text-muted text-center py-4">No pending urgent blood requests.</div>`;
        } else {
            reqList.innerHTML = recentReqs.map(r => `
                <div class="recent-item">
                    <div class="item-left">
                        <span class="blood-tag">${r.group}</span>
                        <div>
                            <div class="item-title">${r.patient} (${r.units} Unit${r.units > 1 ? 's' : ''})</div>
                            <div class="item-sub"><i class="fa-solid fa-hospital"></i> ${r.hospital}</div>
                        </div>
                    </div>
                    <div class="item-left gap-2">
                        <button class="btn btn-sm btn-whatsapp" onclick="app.sendWhatsAppRequest('${r.id}')" title="Send WhatsApp Message">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="btn-icon-sm" onclick="app.viewOnMap('${r.lat}', '${r.lng}', '${r.hospital}')" title="View Hospital Map">
                            <i class="fa-solid fa-map-location-dot text-danger"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Available Donors
        const donorList = document.getElementById('dashboard-recent-donors');
        const activeDonors = this.donors.filter(d => d.status === 'Available').slice(0, 4);

        if (activeDonors.length === 0) {
            donorList.innerHTML = `<div class="text-muted text-center py-4">No active donors listed.</div>`;
        } else {
            donorList.innerHTML = activeDonors.map(d => `
                <div class="recent-item">
                    <div class="item-left">
                        <span class="blood-tag">${d.group}</span>
                        <div>
                            <div class="item-title">${d.name}</div>
                            <div class="item-sub"><i class="fa-solid fa-location-dot text-danger"></i> ${d.city}</div>
                        </div>
                    </div>
                    <div class="item-left gap-2">
                        <button class="btn btn-sm btn-whatsapp" onclick="app.sendWhatsAppDonor('${d.id}')" title="Send WhatsApp Message">
                            <i class="fa-brands fa-whatsapp"></i> Chat
                        </button>
                        <button class="btn-icon-sm" onclick="app.viewOnMap('${d.lat}', '${d.lng}', '${d.city}')" title="View Live Location Map">
                            <i class="fa-solid fa-map-location-dot text-primary"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // 2. FIND DONORS SEARCH VIEW
    renderFindDonors() {
        const query = document.getElementById('donor-search-input').value.toLowerCase().trim();
        const selectedGroup = document.getElementById('donor-filter-group').value;
        const selectedStatus = document.getElementById('donor-filter-status').value;

        const filtered = this.donors.filter(d => {
            const matchesQuery = !query || 
                d.name.toLowerCase().includes(query) || 
                d.city.toLowerCase().includes(query) || 
                d.phone.toLowerCase().includes(query);
            
            const matchesGroup = selectedGroup === 'ALL' || d.group === selectedGroup;
            const matchesStatus = selectedStatus === 'ALL' || d.status === selectedStatus;

            return matchesQuery && matchesGroup && matchesStatus;
        });

        const container = document.getElementById('find-donors-cards-container');
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="glass-card text-center span-full" style="grid-column: 1/-1; padding: 40px;">
                    <i class="fa-solid fa-user-slash text-muted" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
                    <h3>No Donors Found</h3>
                    <p class="text-muted mt-2">Try adjusting your search keywords or blood group filters.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(d => `
            <div class="donor-card">
                <div>
                    <div class="donor-card-top">
                        <div class="donor-avatar">${d.name.substring(0, 2).toUpperCase()}</div>
                        <span class="blood-badge" style="margin: 0;">${d.group}</span>
                    </div>
                    <div class="donor-meta">
                        <h3 class="donor-name">${d.name}</h3>
                        <div class="donor-info-row"><i class="fa-solid fa-cake-candles text-muted"></i> ${d.age} yrs • ${d.gender}</div>
                        <div class="donor-info-row"><i class="fa-solid fa-location-dot text-danger"></i> ${d.city} ${d.lat ? '<span class="badge badge-success" style="font-size:0.65rem;"><i class="fa-solid fa-crosshairs"></i> Live GPS</span>' : ''}</div>
                        <div class="donor-info-row"><i class="fa-solid fa-calendar-day text-info"></i> Last Donated: ${d.lastDate || 'N/A'}</div>
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 12px;">
                        ${d.status === 'Available' 
                            ? `<span class="badge badge-success"><i class="fa-solid fa-circle"></i> Available to Donate</span>`
                            : `<span class="badge badge-secondary"><i class="fa-solid fa-circle"></i> Recently Donated / Unavailable</span>`}
                    </div>
                    <div class="donor-actions-flex">
                        <button class="btn btn-sm btn-whatsapp" onclick="app.sendWhatsAppDonor('${d.id}')" title="Send WhatsApp Message">
                            <i class="fa-brands fa-whatsapp"></i> Chat
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="app.generateCertificate('${d.id}')" title="View Official Certificate of Appreciation">
                            <i class="fa-solid fa-award text-amber"></i> Certificate
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="app.viewOnMap('${d.lat}', '${d.lng}', '${d.city}')" title="View Live Location Map">
                            <i class="fa-solid fa-map-location-dot text-primary"></i> Map
                        </button>
                        <button class="btn btn-sm btn-secondary icon-btn-only" onclick="app.openDonorEdit('${d.id}')" title="Edit Donor">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // GENERATE OFFICIAL CERTIFICATE OF APPRECIATION
    generateCertificate(id) {
        const donor = this.donors.find(d => d.id === id);
        if (!donor) {
            this.showToast('Donor profile not found.', 'danger');
            return;
        }

        const serialNo = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        document.getElementById('cert-serial-no').textContent = serialNo;
        document.getElementById('cert-donor-name').textContent = donor.name;
        document.getElementById('cert-donor-group').textContent = donor.group;
        document.getElementById('cert-blood-badge').textContent = `${donor.group} Positive/Negative`;
        document.getElementById('cert-donor-location').textContent = donor.city || 'LifePulse Center';
        
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('cert-issue-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

        this.openModal('certificate-modal');
        this.showToast(`Generated Certificate of Appreciation for ${donor.name}!`, 'success');
    }

    // 3. DONOR REGISTRY TABLE (CRUD)
    renderDonorTable() {
        const query = document.getElementById('registry-search-input').value.toLowerCase().trim();
        const filtered = this.donors.filter(d => 
            !query || 
            d.name.toLowerCase().includes(query) || 
            d.city.toLowerCase().includes(query) || 
            d.phone.toLowerCase().includes(query) || 
            d.group.toLowerCase().includes(query)
        );

        document.getElementById('donor-table-count').textContent = filtered.length;
        const tbody = document.getElementById('donors-table-body');

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted py-4">No donor records found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(d => `
            <tr>
                <td><strong>${d.name}</strong><br><small class="text-muted">${d.email || 'No email'}</small></td>
                <td><span class="blood-tag">${d.group}</span></td>
                <td>${d.age} / ${d.gender}</td>
                <td>
                    <div class="item-left gap-1">
                        <a href="tel:${d.phone}" class="text-info">${d.phone}</a>
                        <button class="btn-icon-sm btn-icon-whatsapp" onclick="app.sendWhatsAppDonor('${d.id}')" title="Chat on WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <div class="item-left gap-1">
                        <span>${d.city}</span>
                        <button class="btn-icon-sm" onclick="app.viewOnMap('${d.lat}', '${d.lng}', '${d.city}')" title="View on Map">
                            <i class="fa-solid fa-map-location-dot text-danger"></i>
                        </button>
                    </div>
                </td>
                <td>${d.lastDate || '—'}</td>
                <td>
                    <button class="badge ${d.status === 'Available' ? 'badge-success' : 'badge-secondary'}" 
                            style="border:none; cursor:pointer;" 
                            onclick="app.toggleDonorStatus('${d.id}')" 
                            title="Click to toggle status">
                        ${d.status}
                    </button>
                </td>
                <td class="text-right">
                    <div class="action-btns">
                        <button class="btn-icon-sm" onclick="app.generateCertificate('${d.id}')" title="View Appreciation Certificate"><i class="fa-solid fa-award text-amber"></i></button>
                        <button class="btn-icon-sm" onclick="app.openDonorEdit('${d.id}')" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon-sm hover-danger" onclick="app.promptDelete('donor', '${d.id}', '${d.name}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    toggleDonorStatus(id) {
        const donor = this.donors.find(d => d.id === id);
        if (donor) {
            donor.status = donor.status === 'Available' ? 'Unavailable' : 'Available';
            this.saveData();
            this.renderAll();
            this.showToast(`Updated ${donor.name} status to ${donor.status}`, 'info');
        }
    }

    openDonorModal(donor = null) {
        const form = document.getElementById('donor-form');
        form.reset();
        const statusSpan = document.getElementById('donor-location-status');
        if (statusSpan) statusSpan.textContent = '';

        if (donor) {
            document.getElementById('donor-modal-title').innerHTML = `<i class="fa-solid fa-user-pen text-primary"></i> Edit Donor Information`;
            document.getElementById('donor-id').value = donor.id;
            document.getElementById('donor-name').value = donor.name;
            document.getElementById('donor-group').value = donor.group;
            document.getElementById('donor-age').value = donor.age;
            document.getElementById('donor-gender').value = donor.gender;
            document.getElementById('donor-phone').value = donor.phone;
            document.getElementById('donor-email').value = donor.email || '';
            document.getElementById('donor-city').value = donor.city;
            document.getElementById('donor-lat').value = donor.lat || '';
            document.getElementById('donor-lng').value = donor.lng || '';
            document.getElementById('donor-last-date').value = donor.lastDate || '';
            document.getElementById('donor-status').value = donor.status;
        } else {
            document.getElementById('donor-modal-title').innerHTML = `<i class="fa-solid fa-heart-pulse text-danger"></i> Register New Donor`;
            document.getElementById('donor-id').value = '';
            document.getElementById('donor-lat').value = '';
            document.getElementById('donor-lng').value = '';
            document.getElementById('donor-status').value = 'Available';
        }

        this.openModal('donor-modal');
    }

    openDonorEdit(id) {
        const donor = this.donors.find(d => d.id === id);
        if (donor) this.openDonorModal(donor);
    }

    handleDonorSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('donor-id').value;
        const name = document.getElementById('donor-name').value.trim();
        const group = document.getElementById('donor-group').value;
        const age = parseInt(document.getElementById('donor-age').value);
        const gender = document.getElementById('donor-gender').value;
        const phone = document.getElementById('donor-phone').value.trim();
        const email = document.getElementById('donor-email').value.trim();
        const city = document.getElementById('donor-city').value.trim();
        const lat = parseFloat(document.getElementById('donor-lat').value) || null;
        const lng = parseFloat(document.getElementById('donor-lng').value) || null;
        const lastDate = document.getElementById('donor-last-date').value;
        const status = document.getElementById('donor-status').value;

        let newId = null;
        if (id) {
            const index = this.donors.findIndex(d => d.id === id);
            if (index !== -1) {
                this.donors[index] = { id, name, group, age, gender, phone, email, city, lat, lng, lastDate, status };
                this.showToast(`Updated donor profile for ${name}`, 'success');
            }
        } else {
            newId = 'd-' + Date.now();
            this.donors.unshift({ id: newId, name, group, age, gender, phone, email, city, lat, lng, lastDate, status });
            this.showToast(`Registered new donor: ${name} (${group})`, 'success');
        }

        this.saveData();
        this.renderAll();
        this.closeModal('donor-modal');

        if (newId) {
            setTimeout(() => {
                this.generateCertificate(newId);
            }, 400);
        }
    }

    // 4. BLOOD INVENTORY TABLE (CRUD)
    renderInventoryTable() {
        const filterGroup = document.getElementById('inventory-filter-group').value;
        const filtered = this.inventory.filter(i => filterGroup === 'ALL' || i.group === filterGroup);

        document.getElementById('inventory-table-count').textContent = filtered.length;
        const tbody = document.getElementById('inventory-table-body');

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted py-4">No blood inventory batches found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(i => `
            <tr>
                <td><code>${i.batch}</code></td>
                <td><span class="blood-tag">${i.group}</span></td>
                <td>${i.volume} ml</td>
                <td>${i.source || 'Anonymous'}</td>
                <td>${i.collectionDate}</td>
                <td>${i.expiryDate}</td>
                <td><small class="text-muted"><i class="fa-solid fa-warehouse"></i> ${i.location || 'Central Shelf'}</small></td>
                <td><span class="badge ${i.status === 'Fresh' ? 'badge-success' : 'badge-amber'}">${i.status}</span></td>
                <td class="text-right">
                    <div class="action-btns">
                        <button class="btn-icon-sm" onclick="app.openInventoryEdit('${i.id}')" title="Edit Batch"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon-sm hover-danger" onclick="app.promptDelete('inventory', '${i.id}', '${i.batch}')" title="Delete Bag"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    openInventoryModal(item = null) {
        const form = document.getElementById('inventory-form');
        form.reset();

        if (item) {
            document.getElementById('inventory-modal-title').innerHTML = `<i class="fa-solid fa-boxes-stacked text-primary"></i> Edit Blood Bag Batch`;
            document.getElementById('inventory-id').value = item.id;
            document.getElementById('inv-batch').value = item.batch;
            document.getElementById('inv-group').value = item.group;
            document.getElementById('inv-volume').value = item.volume;
            document.getElementById('inv-source').value = item.source || '';
            document.getElementById('inv-collection').value = item.collectionDate;
            document.getElementById('inv-expiry').value = item.expiryDate;
            document.getElementById('inv-location').value = item.location || '';
        } else {
            document.getElementById('inventory-modal-title').innerHTML = `<i class="fa-solid fa-boxes-stacked text-primary"></i> Add Blood Bag Unit`;
            document.getElementById('inventory-id').value = '';
            document.getElementById('inv-batch').value = 'BATCH-' + Math.floor(1000 + Math.random() * 9000);
            
            const today = new Date().toISOString().split('T')[0];
            const expiry = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            document.getElementById('inv-collection').value = today;
            document.getElementById('inv-expiry').value = expiry;
        }

        this.openModal('inventory-modal');
    }

    openInventoryEdit(id) {
        const item = this.inventory.find(i => i.id === id);
        if (item) this.openInventoryModal(item);
    }

    handleInventorySubmit(e) {
        e.preventDefault();
        const id = document.getElementById('inventory-id').value;
        const batch = document.getElementById('inv-batch').value.trim();
        const group = document.getElementById('inv-group').value;
        const volume = parseInt(document.getElementById('inv-volume').value);
        const source = document.getElementById('inv-source').value.trim();
        const collectionDate = document.getElementById('inv-collection').value;
        const expiryDate = document.getElementById('inv-expiry').value;
        const location = document.getElementById('inv-location').value.trim();

        const status = new Date(expiryDate) < new Date() ? 'Expired' : 'Fresh';

        if (id) {
            const index = this.inventory.findIndex(i => i.id === id);
            if (index !== -1) {
                this.inventory[index] = { id, batch, group, volume, source, collectionDate, expiryDate, location, status };
                this.showToast(`Updated stock batch ${batch}`, 'success');
            }
        } else {
            const newId = 'inv-' + Date.now();
            this.inventory.unshift({ id: newId, batch, group, volume, source, collectionDate, expiryDate, location, status });
            this.showToast(`Added blood unit batch ${batch} (${group})`, 'success');
        }

        this.saveData();
        this.renderAll();
        this.closeModal('inventory-modal');
    }

    // 5. EMERGENCY REQUESTS TABLE (CRUD)
    renderRequestsTable() {
        const filterStatus = document.getElementById('request-filter-status').value;
        const filtered = this.requests.filter(r => filterStatus === 'ALL' || r.status === filterStatus);

        const tbody = document.getElementById('requests-table-body');
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted py-4">No blood requests recorded.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(r => `
            <tr>
                <td><strong>${r.patient}</strong></td>
                <td><span class="blood-tag">${r.group}</span></td>
                <td><strong>${r.units}</strong> Unit${r.units > 1 ? 's' : ''}</td>
                <td>
                    <div class="item-left gap-1">
                        <span><i class="fa-solid fa-hospital text-muted"></i> ${r.hospital}</span>
                        <button class="btn-icon-sm" onclick="app.viewOnMap('${r.lat}', '${r.lng}', '${r.hospital}')" title="View Hospital Map">
                            <i class="fa-solid fa-map-location-dot text-danger"></i>
                        </button>
                    </div>
                </td>
                <td><span class="badge ${r.urgency.includes('Critical') ? 'badge-danger' : 'badge-amber'}">${r.urgency}</span></td>
                <td>
                    <div class="item-left gap-1">
                        <a href="tel:${r.contact}" class="text-info">${r.contact}</a>
                        <button class="btn-icon-sm btn-icon-whatsapp" onclick="app.sendWhatsAppRequest('${r.id}')" title="Send WhatsApp Message">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
                <td>${r.date}</td>
                <td>
                    <select class="form-select" style="padding: 4px 8px; font-size: 0.8rem; width: auto;" 
                            onchange="app.changeRequestStatus('${r.id}', this.value)">
                        <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Fulfilled" ${r.status === 'Fulfilled' ? 'selected' : ''}>Fulfilled</option>
                        <option value="Cancelled" ${r.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td class="text-right">
                    <div class="action-btns">
                        <button class="btn-icon-sm" onclick="app.openRequestEdit('${r.id}')" title="Edit Request"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon-sm hover-danger" onclick="app.promptDelete('request', '${r.id}', 'Request for ${r.patient}')" title="Delete Request"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    changeRequestStatus(id, newStatus) {
        const req = this.requests.find(r => r.id === id);
        if (req) {
            req.status = newStatus;
            this.saveData();
            this.renderAll();
            this.showToast(`Request for ${req.patient} status changed to ${newStatus}`, 'info');
        }
    }

    openRequestModal(request = null) {
        const form = document.getElementById('request-form');
        form.reset();
        const statusSpan = document.getElementById('req-location-status');
        if (statusSpan) statusSpan.textContent = '';

        if (request) {
            document.getElementById('request-modal-title').innerHTML = `<i class="fa-solid fa-pen text-primary"></i> Edit Emergency Request`;
            document.getElementById('request-id').value = request.id;
            document.getElementById('req-patient').value = request.patient;
            document.getElementById('req-group').value = request.group;
            document.getElementById('req-units').value = request.units;
            document.getElementById('req-hospital').value = request.hospital;
            document.getElementById('req-lat').value = request.lat || '';
            document.getElementById('req-lng').value = request.lng || '';
            document.getElementById('req-urgency').value = request.urgency;
            document.getElementById('req-contact').value = request.contact;
        } else {
            document.getElementById('request-modal-title').innerHTML = `<i class="fa-solid fa-kit-medical text-danger"></i> Post Emergency Request`;
            document.getElementById('request-id').value = '';
            document.getElementById('req-lat').value = '';
            document.getElementById('req-lng').value = '';
            document.getElementById('req-units').value = 1;
        }

        this.openModal('request-modal');
    }

    openRequestEdit(id) {
        const req = this.requests.find(r => r.id === id);
        if (req) this.openRequestModal(req);
    }

    handleRequestSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('request-id').value;
        const patient = document.getElementById('req-patient').value.trim();
        const group = document.getElementById('req-group').value;
        const units = parseInt(document.getElementById('req-units').value);
        const hospital = document.getElementById('req-hospital').value.trim();
        const lat = parseFloat(document.getElementById('req-lat').value) || null;
        const lng = parseFloat(document.getElementById('req-lng').value) || null;
        const urgency = document.getElementById('req-urgency').value;
        const contact = document.getElementById('req-contact').value.trim();
        const date = new Date().toISOString().split('T')[0];

        if (id) {
            const index = this.requests.findIndex(r => r.id === id);
            if (index !== -1) {
                const prevStatus = this.requests[index].status;
                this.requests[index] = { id, patient, group, units, hospital, lat, lng, urgency, contact, date, status: prevStatus };
                this.showToast(`Updated request for ${patient}`, 'success');
            }
        } else {
            const newId = 'req-' + Date.now();
            this.requests.unshift({ id: newId, patient, group, units, hospital, lat, lng, urgency, contact, date, status: 'Pending' });
            this.showToast(`Emergency request posted for ${patient} (${group})`, 'danger');
        }

        this.saveData();
        this.renderAll();
        this.closeModal('request-modal');
    }

    // DELETE PROMPT & EXECUTION
    promptDelete(type, id, name) {
        this.deleteTarget = { type, id };
        document.getElementById('delete-modal-msg').textContent = `Are you sure you want to delete "${name}"? This item will be permanently removed from the data store.`;
        this.openModal('delete-modal');
    }

    executeDelete() {
        if (!this.deleteTarget) return;

        const { type, id } = this.deleteTarget;
        if (type === 'donor') {
            this.donors = this.donors.filter(d => d.id !== id);
            this.showToast('Donor record deleted', 'info');
        } else if (type === 'inventory') {
            this.inventory = this.inventory.filter(i => i.id !== id);
            this.showToast('Inventory bag deleted', 'info');
        } else if (type === 'request') {
            this.requests = this.requests.filter(r => r.id !== id);
            this.showToast('Emergency request deleted', 'info');
        }

        this.saveData();
        this.renderAll();
        this.closeModal('delete-modal');
        this.deleteTarget = null;
    }

    // EXPORT JSON DATA BACKUP
    exportJSON() {
        const payload = {
            appName: 'LifePulse Blood Donation System',
            exportDate: new Date().toISOString(),
            donors: this.donors,
            inventory: this.inventory,
            requests: this.requests
        };

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
        const anchor = document.createElement('a');
        anchor.setAttribute('href', dataStr);
        anchor.setAttribute('download', `lifepulse_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        this.showToast('Exported system data backup as JSON!', 'success');
    }

    // TOAST NOTIFICATIONS
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = 'fa-info-circle text-info';
        if (type === 'success') icon = 'fa-circle-check text-success';
        if (type === 'danger') icon = 'fa-triangle-exclamation text-danger';

        toast.innerHTML = `
            <i class="fa-solid ${icon}" style="font-size: 1.2rem;"></i>
            <span style="font-weight: 600; font-size: 0.9rem;">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new LifePulseApp();
});
