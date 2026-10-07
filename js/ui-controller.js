// ==========================================
// CAMPUS LIFE: UI CONTROLLER & VIEW BINDINGS
// ==========================================

const UI = {
  init() {
    this.bindDOM();
    this.bindEvents();

    // Check if character already exists or needs authentication/spawn
    const hasSave = localStorage.getItem("campus_life_save");
    if (!hasSave) {
      this.openAuthModal();
    } else {
      this.renderAll();
    }

    // Initialize CloudSync if available
    if (window.cloudSync) {
      window.cloudSync.init();
    }

    // Live clock ticker
    setInterval(() => {
      game.advanceTime(1);
      this.updateHeaderAndStats();
    }, 4000); // 1 in-game minute every 4 seconds for a fun, lively pace
  },

  bindDOM() {
    this.dom = {
      appContainer: document.getElementById("app-container"),
      schoolTitle: document.getElementById("school-title"),
      schoolSubtitle: document.getElementById("school-subtitle"),
      clockTime: document.getElementById("clock-time"),
      clockPhase: document.getElementById("clock-phase"),
      fillEnergy: document.getElementById("fill-energy"),
      fillHunger: document.getElementById("fill-hunger"),
      fillHygiene: document.getElementById("fill-hygiene"),
      fillFun: document.getElementById("fill-fun"),
      fillHealth: document.getElementById("fill-health"),
      fillCgpa: document.getElementById("fill-cgpa"),
      valEnergy: document.getElementById("val-energy"),
      valHunger: document.getElementById("val-hunger"),
      valHygiene: document.getElementById("val-hygiene"),
      valFun: document.getElementById("val-fun"),
      valHealth: document.getElementById("val-health"),
      valCgpa: document.getElementById("val-cgpa"),
      walletAmount: document.getElementById("wallet-amount"),
      semesterBadge: document.getElementById("semester-badge"),
      vehicleBadge: document.getElementById("vehicle-badge"),
      locationName: document.getElementById("location-name"),
      locationTag: document.getElementById("location-tag"),
      locationDesc: document.getElementById("location-desc"),
      feedLogs: document.getElementById("feed-logs"),
      phoneModal: document.getElementById("phone-modal"),
      phoneFloatingBtn: document.getElementById("phone-floating-btn"),
      eventModal: document.getElementById("event-modal"),
      spawnScreen: document.getElementById("spawn-screen"),
      authModal: document.getElementById("auth-modal"),
      authBadge: document.getElementById("auth-badge"),
      campusMapView: document.getElementById("campus-map-view"),
      playerRoomView: document.getElementById("player-room-view"),
      campusActionsView: document.getElementById("campus-actions-view"),
      mapUniTitle: document.getElementById("map-uni-title"),
      mapCurrentLocBadge: document.getElementById("map-current-loc-badge"),
      mapPinsContainer: document.getElementById("map-pins-container"),
      houseTitle: document.getElementById("house-title"),
      houseRentStatus: document.getElementById("house-rent-status"),
      houseDesc: document.getElementById("house-desc")
    };
  },

  bindEvents() {
    // Dock Navigation buttons
    document.querySelectorAll(".dock-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".dock-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Phone Floating Button Toggle
    if (this.dom.phoneFloatingBtn) {
      this.dom.phoneFloatingBtn.addEventListener("click", () => {
        this.openPhoneModal();
      });
    }

    // Phone Home Bar click closes phone
    const homeBar = document.getElementById("phone-home-bar");
    if (homeBar) {
      homeBar.addEventListener("click", () => {
        this.closePhoneModal();
      });
    }

    // Phone Back buttons
    document.querySelectorAll(".app-back-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (btn.id === "whatschat-back-btn") {
          const convoView = document.getElementById("whatschat-convo-view");
          if (convoView && convoView.style.display === "flex") {
            this.renderWhatsChatApp();
            return;
          }
        }
        this.showPhoneHomeScreen();
      });
    });

    // Phone App Grid icons
    document.querySelectorAll(".app-icon-item").forEach(item => {
      item.addEventListener("click", () => {
        const appName = item.dataset.app;
        this.openPhoneApp(appName);
      });
    });

    // Spawn Class Selection
    document.querySelectorAll(".class-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".class-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        document.getElementById("selected-class").value = card.dataset.class;
      });
    });

    const spawnUni = document.getElementById("spawn-uni");
    if (spawnUni) {
      spawnUni.addEventListener("change", () => this.updateAvatarPreview());
    }

    const spawnDept = document.getElementById("spawn-dept");
    if (spawnDept) {
      spawnDept.addEventListener("change", () => this.updateAvatarPreview());
    }

    // Start Life button
    const startLifeBtn = document.getElementById("start-life-btn");
    if (startLifeBtn) {
      startLifeBtn.addEventListener("click", () => {
        this.handleSpawnSubmit();
      });
    }

    // Auth Button in header
    if (this.dom.authBadge) {
      this.dom.authBadge.addEventListener("click", () => {
        this.openAuthModal();
      });
    }
  },

  renderAll() {
    this.updateHeaderAndStats();
    this.renderLocation();
    this.renderVisualMap();
    this.renderHousingRoom();
    this.renderActivityLogs();
    this.checkPendingEvent();
  },

  switchViewportView(viewName) {
    document.querySelectorAll(".view-tab-btn").forEach(b => b.classList.remove("active"));
    const activeBtn = document.getElementById(`tab-btn-${viewName}`);
    if (activeBtn) activeBtn.classList.add("active");

    if (this.dom.campusMapView) this.dom.campusMapView.style.display = viewName === "map" ? "flex" : "none";
    if (this.dom.playerRoomView) this.dom.playerRoomView.style.display = viewName === "room" ? "flex" : "none";
    if (this.dom.campusActionsView) this.dom.campusActionsView.style.display = viewName === "actions" ? "block" : "none";
  },

  updateHeaderAndStats() {
    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    const semLabel = game.time.level === "300L" && game.time.semester === 2 ? "300L SIWES" : `${game.time.level} S${game.time.semester || 1}`;
    this.dom.schoolTitle.textContent = `${uni.short} • ${game.profile.name}`;
    this.dom.schoolSubtitle.textContent = `${uni.motto} (${semLabel} ${game.profile.department})`;

    const phase = game.getTimePhase();
    this.dom.clockTime.textContent = game.formatTime();
    this.dom.clockPhase.textContent = `${phase.label} • Day ${game.time.day}`;

    // Update body theme class for dynamic sky lighting
    document.body.className = `time-${phase.phase}`;

    // Update 6 Core Stat Meters
    if (this.dom.fillEnergy) this.dom.fillEnergy.style.width = `${game.stats.energy}%`;
    if (this.dom.fillHunger) this.dom.fillHunger.style.width = `${game.stats.hunger}%`;
    if (this.dom.fillHygiene) this.dom.fillHygiene.style.width = `${game.stats.hygiene}%`;
    if (this.dom.fillFun) this.dom.fillFun.style.width = `${game.stats.fun}%`;
    if (this.dom.fillHealth) this.dom.fillHealth.style.width = `${game.stats.health}%`;
    if (this.dom.fillCgpa) this.dom.fillCgpa.style.width = `${(game.stats.cgpa / 5.0) * 100}%`;

    if (this.dom.valEnergy) this.dom.valEnergy.textContent = `${game.stats.energy}%`;
    if (this.dom.valHunger) this.dom.valHunger.textContent = `${game.stats.hunger}%`;
    if (this.dom.valHygiene) this.dom.valHygiene.textContent = `${game.stats.hygiene}%`;
    if (this.dom.valFun) this.dom.valFun.textContent = `${game.stats.fun}%`;
    if (this.dom.valHealth) this.dom.valHealth.textContent = `${game.stats.health}%`;
    if (this.dom.valCgpa) this.dom.valCgpa.textContent = `${game.stats.cgpa.toFixed(2)}`;

    // Wallet, Vehicle & Semester
    if (this.dom.walletAmount) this.dom.walletAmount.textContent = game.formatMoney(game.finances.cash || game.stats.cash || 0);
    if (this.dom.semesterBadge) this.dom.semesterBadge.textContent = `${semLabel} • Wk ${game.time.semesterWeek}`;

    const v = VEHICLE_TIERS[game.vehicle] || VEHICLE_TIERS.trek;
    if (this.dom.vehicleBadge) this.dom.vehicleBadge.innerHTML = `<span>🚲</span> ${v.name}`;

    // Update WhatsUni Unread Badges
    const unreadChats = game.getUnreadChatCount ? game.getUnreadChatCount() : 0;
    const whatschatBadge = document.getElementById("whatschat-badge");
    if (whatschatBadge) {
      whatschatBadge.style.display = unreadChats > 0 ? "flex" : "none";
      whatschatBadge.textContent = unreadChats;
    }
    const pingDot = document.querySelector(".phone-badge-ping");
    if (pingDot) {
      pingDot.style.display = unreadChats > 0 ? "block" : "none";
    }
  },

  renderVisualMap() {
    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    if (this.dom.mapUniTitle) this.dom.mapUniTitle.innerHTML = `<span>🏛️</span> ${uni.name} World Map`;

    const currLoc = uni.locations.find(l => l.id === game.currentLocationId) || uni.locations[0];
    if (this.dom.mapCurrentLocBadge) this.dom.mapCurrentLocBadge.textContent = `📍 ${currLoc.name}`;

    // 1. Render Terrain SVG Roads and Landscape
    const svg = document.getElementById("map-terrain-svg");
    if (svg) {
      if (game.profile.university === "unilag") {
        svg.innerHTML = `
          <defs>
            <linearGradient id="lagoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0096c7" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#03045e" stop-opacity="0.95"/>
            </linearGradient>
          </defs>
          <!-- Lagos Lagoon Coastline -->
          <path d="M 720,0 Q 820,180 780,360 Q 740,500 850,650 L 1000,650 L 1000,0 Z" fill="url(#lagoonGrad)"/>
          <!-- Akoka Boulevard Expressway Base -->
          <path d="M 140,530 Q 280,510 440,510 L 560,420 L 540,220 L 800,220" fill="none" stroke="#252a3d" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 140,530 Q 280,510 440,510 L 560,420 L 540,220 L 800,220" fill="none" stroke="#161928" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 140,530 Q 280,510 440,510 L 560,420 L 540,220 L 800,220" fill="none" stroke="#ffd600" stroke-width="2" stroke-dasharray="8,6" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Lagoon Front Walkway -->
          <path d="M 540,220 L 780,220 L 840,120" fill="none" stroke="#00b0ff" stroke-width="8" stroke-opacity="0.5" stroke-linecap="round"/>
          <!-- Hostel Roadways -->
          <path d="M 560,420 L 740,470 L 620,340" fill="none" stroke="#252a3d" stroke-width="16" stroke-linecap="round"/>
          <path d="M 560,420 L 740,470 L 620,340" fill="none" stroke="#161928" stroke-width="12" stroke-linecap="round"/>
        `;
      } else {
        // UNILORIN Terrain
        svg.innerHTML = `
          <defs>
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0077b6" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#023e8a" stop-opacity="0.9"/>
            </linearGradient>
            <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1b4332" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#081c15" stop-opacity="0.6"/>
            </linearGradient>
          </defs>
          <!-- Biological Gardens / Zoo Area -->
          <path d="M 650,40 Q 850,20 950,150 Q 850,260 700,200 Z" fill="url(#grassGrad)"/>
          <!-- Unilorin Dam Reservoir -->
          <path d="M 720,50 Q 880,30 960,100 Q 920,180 800,160 Q 730,120 720,50 Z" fill="url(#lakeGrad)"/>
          <!-- Main Campus Arterial Expressway -->
          <path d="M 120,550 Q 260,570 280,470 L 420,415 L 500,325 L 500,220 L 680,245 L 820,180" fill="none" stroke="#252a3d" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 120,550 Q 260,570 280,470 L 420,415 L 500,325 L 500,220 L 680,245 L 820,180" fill="none" stroke="#161928" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 120,550 Q 260,570 280,470 L 420,415 L 500,325 L 500,220 L 680,245 L 820,180" fill="none" stroke="#ffab00" stroke-width="2" stroke-dasharray="8,6" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- The Covered PS Walkway (Glowing Green Path) -->
          <path d="M 420,415 Q 460,360 500,325 L 340,300 L 200,245" fill="none" stroke="#00e676" stroke-width="6" stroke-opacity="0.4" stroke-linecap="round"/>
          <!-- Hostel Village & Stadium Roads -->
          <path d="M 500,325 L 680,420 L 820,360" fill="none" stroke="#252a3d" stroke-width="16" stroke-linecap="round"/>
          <path d="M 500,325 L 680,420 L 820,360" fill="none" stroke="#161928" stroke-width="12" stroke-linecap="round"/>
        `;
      }
    }

    // 2. Render Interactive Building Landmark Nodes
    const buildingsLayer = document.getElementById("map-buildings-layer");
    if (buildingsLayer) {
      buildingsLayer.innerHTML = "";
      uni.locations.forEach(loc => {
        const isCurrent = loc.id === game.currentLocationId;
        const node = document.createElement("div");
        node.className = `landmark-node ${isCurrent ? "active" : ""}`;
        node.style.left = `${loc.x || 50}%`;
        node.style.top = `${loc.y || 50}%`;
        node.title = `${loc.name} (${loc.tag})`;
        node.innerHTML = `
          <div class="landmark-node-bubble">${loc.icon || "📍"}</div>
          <div class="landmark-node-label">${loc.name.split(" ")[0]}</div>
        `;

        node.onclick = () => {
          this.startTravelTo(loc.id);
        };

        buildingsLayer.appendChild(node);
      });
    }

    // 3. Position and Style Animated Virtual Player Avatar
    const avatar = document.getElementById("player-map-avatar");
    if (avatar && currLoc) {
      avatar.style.left = `${currLoc.x || 50}%`;
      avatar.style.top = `${currLoc.y || 50}%`;

      const nametag = document.getElementById("player-avatar-nametag");
      if (nametag) {
        const icon = game.profile.avatarEmoji || (game.profile.gender === "female" ? "👩🏾‍🎓" : "🧑🏾‍🎓");
        nametag.textContent = `${icon} ${game.profile.name}`;
      }

      const sprite = document.getElementById("player-avatar-sprite");
      if (sprite) {
        if (game.vehicle === "corolla" || game.vehicle === "lexus") sprite.textContent = "🚗";
        else if (game.vehicle === "bike") sprite.textContent = "🛵";
        else if (game.vehicle === "bicycle") sprite.textContent = "🚲";
        else sprite.textContent = game.profile.gender === "female" ? "🚶‍♀️" : "🚶‍♂️";
      }
    }

    // 4. Render Directory Cards in Accordion
    if (this.dom.mapPinsContainer) {
      this.dom.mapPinsContainer.innerHTML = "";
      uni.locations.forEach(loc => {
        const card = document.createElement("div");
        const isCurrent = loc.id === game.currentLocationId;
        card.className = `map-landmark-card ${isCurrent ? "current-location" : ""}`;
        card.innerHTML = `
          <div class="landmark-top">
            <span class="landmark-icon">${loc.icon || "📍"}</span>
            <span class="landmark-badge">${isCurrent ? "HERE" : loc.tag}</span>
          </div>
          <div class="landmark-name">${loc.name}</div>
          <div class="landmark-vibe">${loc.desc}</div>
        `;

        card.onclick = () => {
          this.startTravelTo(loc.id);
        };

        this.dom.mapPinsContainer.appendChild(card);
      });
    }
  },

  startTravelTo(targetId) {
    if (this.isTraveling) return;
    if (targetId === game.currentLocationId) {
      this.openLandmarkDrawer(targetId);
      return;
    }

    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    const targetLoc = uni.locations.find(l => l.id === targetId);
    if (!targetLoc) return;

    this.isTraveling = true;
    sfx.playTravel();

    // Show Transit HUD
    const hud = document.getElementById("map-transit-hud");
    const bar = document.getElementById("transit-progress-bar");
    const v = VEHICLE_TIERS[game.vehicle] || VEHICLE_TIERS.trek;

    if (hud) {
      hud.style.display = "flex";
      document.getElementById("transit-hud-icon").textContent = v.name.includes("Car") ? "🚗" : (v.name.includes("Bike") ? "🛵" : "🚶‍♂️");
      document.getElementById("transit-hud-title").textContent = `Traveling to ${targetLoc.name}...`;
      document.getElementById("transit-hud-sub").textContent = `Cruising via ${v.name} (${v.energyCost}⚡ Energy)`;
      if (bar) {
        bar.style.width = "0%";
        setTimeout(() => { bar.style.width = "100%"; }, 20);
      }
    }

    // Animate Player Avatar across map
    const avatar = document.getElementById("player-map-avatar");
    if (avatar) {
      avatar.classList.add("moving");
      avatar.style.left = `${targetLoc.x}%`;
      avatar.style.top = `${targetLoc.y}%`;
    }

    // Complete Travel
    setTimeout(() => {
      this.isTraveling = false;
      if (avatar) avatar.classList.remove("moving");
      if (hud) hud.style.display = "none";
      if (bar) bar.style.width = "0%";

      game.travelTo(targetId);
      this.renderAll();
      this.openLandmarkDrawer(targetId);
    }, 1100);
  },

  openLandmarkDrawer(locationId) {
    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    const loc = uni.locations.find(l => l.id === locationId);
    if (!loc) return;

    const drawer = document.getElementById("landmark-drawer");
    if (!drawer) return;

    document.getElementById("drawer-landmark-icon").textContent = loc.icon || "📍";
    document.getElementById("drawer-landmark-name").textContent = loc.name;
    document.getElementById("drawer-landmark-tag").textContent = loc.tag || "Campus Spot";
    document.getElementById("drawer-landmark-desc").textContent = loc.desc || "";

    const actionsContainer = document.getElementById("drawer-landmark-actions");
    actionsContainer.innerHTML = "";

    // Specific Location Action
    if (loc.actionLabel) {
      const actBtn = document.createElement("button");
      actBtn.className = "landmark-action-btn";
      actBtn.innerHTML = `<span>${loc.actionLabel}</span> <span>⚡ Go</span>`;
      actBtn.onclick = () => {
        this.runLandmarkAction(loc);
      };
      actionsContainer.appendChild(actBtn);
    }

    // General Explore / Hangout Action
    const chillBtn = document.createElement("button");
    chillBtn.className = "landmark-action-btn";
    chillBtn.innerHTML = `<span>👀 Look Around &amp; Chat Coursemates (+10 Fun)</span> <span>💬</span>`;
    chillBtn.onclick = () => {
      game.stats.fun = Math.min(100, game.stats.fun + 10);
      game.stats.energy = Math.max(0, game.stats.energy - 5);
      game.advanceTime(15);
      game.addLog(`Hung out at ${loc.name} exchanging campus gist. (+10 Fun)`, "positive");
      this.renderAll();
      sfx.playNotification();
    };
    actionsContainer.appendChild(chillBtn);

    drawer.style.display = "flex";
  },

  closeLandmarkDrawer() {
    const drawer = document.getElementById("landmark-drawer");
    if (drawer) drawer.style.display = "none";
  },

  runLandmarkAction(loc) {
    if (loc.actionCost && game.finances.cash < loc.actionCost) {
      alert(`Not enough cash! You need ${game.formatMoney(loc.actionCost)}.`);
      return;
    }

    if (loc.actionCost) {
      game.finances.cash -= loc.actionCost;
    }

    if (loc.actionType === "food") {
      game.stats.hunger = Math.min(100, game.stats.hunger + 45);
      game.stats.energy = Math.min(100, game.stats.energy + 15);
      game.addLog(`Ate delicious food at ${loc.name}! (+45 Hunger, +15 Energy)`, "positive");
      sfx.playCash();
    } else if (loc.actionType === "study") {
      game.stats.cgpa = Math.min(5.0, +(game.stats.cgpa + 0.08).toFixed(2));
      game.stats.energy = Math.max(0, game.stats.energy - 15);
      game.addLog(`Studied and solved practice questions at ${loc.name}! (+0.08 CGPA 📚)`, "positive");
      sfx.playNotification();
    } else if (loc.actionType === "fun") {
      game.stats.fun = Math.min(100, game.stats.fun + 25);
      game.addLog(`Had a great time chilling at ${loc.name}! (+25 Fun 🎉)`, "positive");
      sfx.playNotification();
    } else {
      game.stats.fun = Math.min(100, game.stats.fun + 10);
      game.addLog(`Completed campus activity at ${loc.name}.`, "positive");
      sfx.playNotification();
    }

    game.advanceTime(20);
    this.renderAll();
  },

  renderHousingRoom() {
    const tier = HOUSING_TIERS[game.housing] || HOUSING_TIERS.squatter;
    if (this.dom.houseTitle) this.dom.houseTitle.innerHTML = `<span>🏠</span> ${tier.name}`;
    if (this.dom.houseRentStatus) {
      if (tier.rentCost === 0) {
        this.dom.houseRentStatus.textContent = "Rent Free (Squatter)";
      } else {
        this.dom.houseRentStatus.textContent = `Rent: ${game.formatMoney(tier.rentCost)}/yr (${game.finances.rentDueInDays || 30}d left)`;
      }
    }
    if (this.dom.houseDesc) {
      this.dom.houseDesc.textContent = `${tier.desc} Perks: ${tier.perks}`;
    }
  },

  openHousingUpgradeSelector() {
    const keys = Object.keys(HOUSING_TIERS);
    const options = keys.map((k, i) => {
      const h = HOUSING_TIERS[k];
      return `${i + 1}. ${h.name} (${game.formatMoney(h.rentCost)}/yr) - ${h.roomType}`;
    }).join("\n\n");

    const choice = prompt(`Select New Accommodation to rent:\n\n${options}`);
    const idx = parseInt(choice) - 1;
    if (!isNaN(idx) && keys[idx]) {
      game.upgradeHousing(keys[idx]);
      this.renderAll();
    }
  },

  updateAuthBadge(user) {
    if (!this.dom.authBadge) return;
    if (user) {
      const email = user.email ? user.email.split("@")[0] : "Guest Player";
      this.dom.authBadge.innerHTML = `<span style="color:#00e676;">☁️</span> ${email}`;
      this.dom.authBadge.title = "Cloud Save Synced via Firebase";
    } else {
      this.dom.authBadge.innerHTML = `<span style="color:#ffab00;">👤</span> Sign In`;
      this.dom.authBadge.title = "Click to Sign Up or Login";
    }
  },

  openAuthModal() {
    if (this.dom.authModal) {
      this.dom.authModal.classList.add("open");
    }
  },

  closeAuthModal() {
    if (this.dom.authModal) {
      this.dom.authModal.classList.remove("open");
    }
  },

  renderLocation() {
    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    const loc = uni.locations.find(l => l.id === game.currentLocationId) || uni.locations[0];

    this.dom.locationName.innerHTML = `<span>📍</span> ${loc.name}`;
    this.dom.locationTag.textContent = loc.tag;
    this.dom.locationDesc.textContent = loc.desc;
  },

  renderActivityLogs() {
    if (!this.dom.feedLogs) return;
    this.dom.feedLogs.innerHTML = "";
    game.activityLog.slice(0, 10).forEach(log => {
      const div = document.createElement("div");
      div.className = `log-item event-${log.type}`;
      div.innerHTML = `<strong>[${log.time || game.formatTime()}]</strong> ${log.text}`;
      this.dom.feedLogs.appendChild(div);
    });
  },

  checkPendingEvent() {
    if (game.activeEvent) {
      this.renderEventModal(game.activeEvent);
    }
  },

  renderEventModal(event) {
    const modal = this.dom.eventModal;
    const title = document.getElementById("event-title");
    const desc = document.getElementById("event-desc");
    const optionsContainer = document.getElementById("event-options");

    title.textContent = event.title;
    desc.textContent = event.desc;
    optionsContainer.innerHTML = "";

    event.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "event-opt-btn";
      btn.textContent = `${idx + 1}. ${opt.text}`;
      btn.onclick = () => {
        const res = opt.outcome(game.stats);
        game.addLog(res.msg, res.type);
        game.activeEvent = null;
        modal.classList.remove("open");
        this.renderAll();
      };
      optionsContainer.appendChild(btn);
    });

    modal.classList.add("open");
  },

  // In-Game Phone Management
  openPhoneModal() {
    this.dom.phoneModal.classList.add("open");
    this.showPhoneHomeScreen();
    sfx.playNotification();

    // Update phone time
    document.getElementById("phone-time-clock").textContent = game.formatTime();
    document.getElementById("phone-date-clock").textContent = `Day ${game.time.day} • Semester Week ${game.time.semesterWeek}`;
  },

  closePhoneModal() {
    this.dom.phoneModal.classList.remove("open");
  },

  showPhoneHomeScreen() {
    document.querySelectorAll(".phone-app-window").forEach(w => w.classList.remove("active"));
    document.getElementById("phone-home-screen").style.display = "block";
  },

  openPhoneApp(appName) {
    document.getElementById("phone-home-screen").style.display = "none";
    document.querySelectorAll(".phone-app-window").forEach(w => w.classList.remove("active"));

    const targetApp = document.getElementById(`app-${appName}`);
    if (targetApp) {
      targetApp.classList.add("active");
      this.renderAppContent(appName);
    }
    sfx.playNotification();
  },

  renderAppContent(appName) {
    if (appName === "palmpay") {
      document.getElementById("palmpay-balance").textContent = game.formatMoney(game.stats.cash);
      document.getElementById("palmpay-debt").textContent = game.formatMoney(game.stats.debt);
    } else if (appName === "chowdeck") {
      this.renderFoodMenu();
    } else if (appName === "chitter") {
      this.renderChitterFeed();
    } else if (appName === "hustle") {
      this.renderHustleGigs();
    } else if (appName === "whatschat") {
      this.renderWhatsChatApp();
    } else if (appName === "portal") {
      this.renderStudentPortal();
    }
  },

  getOnlineStudents() {
    return [
      { id: "segun", name: "Segun Adebayo", uni: "unilorin", dept: "Computer Science", level: "200L", avatar: "👨🏾‍💻", tag: "Tech Bro & Course Rep", status: "Online" },
      { id: "chidimma", name: "Chidimma Okoro", uni: "unilag", dept: "Mass Communication", level: "100L", avatar: "👩🏾‍🎓", tag: "Akoka Fresher Baddie", status: "Online" },
      { id: "farouk", name: "Farouk Bello", uni: "unilorin", dept: "Mechanical Engr", level: "300L", avatar: "🧑🏾‍🦱", tag: "Sanrab Generator Chairman", status: "Online" },
      { id: "blessing", name: "Blessing Danjuma", uni: "unilag", dept: "Law", level: "200L", avatar: "👩🏾‍💼", tag: "New Hall Campus Diva", status: "Online" },
      { id: "emeka", name: "Emeka Obi", uni: "unilorin", dept: "Accounting", level: "400L", avatar: "🤴🏾", tag: "Final Year Big Boy", status: "Online" },
      { id: "aisha", name: "Aisha Mohammed", uni: "unilorin", dept: "Pharmacy", level: "300L", avatar: "🧕", tag: "PS Walkway First Class", status: "Online" },
      { id: "dayo", name: "Dayo Oladipo", uni: "unilag", dept: "Economics", level: "200L", avatar: "👨🏾", tag: "Crypto Trader & Hustler", status: "Online" }
    ];
  },

  renderWhatsChatApp() {
    this.currentChatId = null;
    this.activeDmStudent = null;
    const contactsView = document.getElementById("whatschat-contacts-view");
    const convoView = document.getElementById("whatschat-convo-view");
    const title = document.getElementById("whatschat-title");
    const status = document.getElementById("whatschat-header-status");

    if (contactsView) contactsView.style.display = "block";
    if (convoView) convoView.style.display = "none";
    if (title) title.textContent = "WhatsUni 💬";
    if (status) status.textContent = "Online";

    const list = document.getElementById("whatschat-contacts-list");
    if (!list) return;
    list.innerHTML = "";

    // 1. PINNED LIVE MULTIPLAYER CAMPUS CHAT GROUP
    const liveGroupCard = document.createElement("div");
    liveGroupCard.className = "chat-contact-card";
    liveGroupCard.style.borderColor = "var(--primary)";
    liveGroupCard.style.background = "linear-gradient(135deg, rgba(0, 230, 118, 0.12), rgba(0, 240, 255, 0.06))";

    let liveMsgs = (window.cloudSync && window.cloudSync.liveChatMessages && window.cloudSync.liveChatMessages.length > 0)
      ? window.cloudSync.liveChatMessages
      : (window.cloudSync && window.cloudSync.getDefaultLiveChatMessages ? window.cloudSync.getDefaultLiveChatMessages() : [
        { senderName: "Segun", text: "Who is at Tanke Tipper garage? How is the bus line looking?", time: "08:14" },
        { senderName: "Chidimma", text: "Good morning scholars! Does anyone have the PDF for GST 111?", time: "08:20" }
      ]);
    const lastLiveMsg = liveMsgs[liveMsgs.length - 1];
    const livePreview = lastLiveMsg ? `${lastLiveMsg.senderName}: ${lastLiveMsg.text}` : "Tap to chat with real students online!";
    const liveTime = lastLiveMsg ? (lastLiveMsg.time || "Now") : "Live";

    liveGroupCard.innerHTML = `
      <div class="chat-contact-avatar" style="background:linear-gradient(135deg, #00e676, #00b0ff); color:#000; font-size:18px;">🏛️</div>
      <div class="chat-contact-info">
        <div class="chat-contact-top">
          <span class="chat-contact-name" style="color:#00e676; font-weight:900;">🇳🇬 All-Nigeria Campus Hub 🟢</span>
          <span class="chat-contact-time" style="color:var(--primary);">${liveTime}</span>
        </div>
        <div class="chat-contact-preview" style="color:#e2e8f0;">${livePreview}</div>
      </div>
      <div class="chat-contact-badge" style="background:var(--primary); color:#000; font-weight:900;">LIVE</div>
    `;

    liveGroupCard.onclick = () => {
      this.openLiveCampusChat();
    };
    list.appendChild(liveGroupCard);

    // 2. ONLINE STUDENTS TRAY (1v1 DIRECT MESSAGE)
    const onlineSection = document.createElement("div");
    onlineSection.style.cssText = "margin: 12px 0 6px;";
    onlineSection.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:var(--cyan); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; display:flex; align-items:center; justify-content:space-between;">
        <span>🟢 Online Coursemates (1v1 DM)</span>
        <span style="font-size:10px; color:var(--text-muted);">Tap to Chat</span>
      </div>
    `;
    const onlineTray = document.createElement("div");
    onlineTray.style.cssText = "display:flex; gap:8px; overflow-x:auto; padding-bottom:6px; scrollbar-width:thin;";

    const onlineStudents = this.getOnlineStudents();
    onlineStudents.forEach(stu => {
      const bubble = document.createElement("div");
      bubble.style.cssText = "flex-shrink:0; display:flex; flex-direction:column; align-items:center; width:64px; cursor:pointer;";
      bubble.innerHTML = `
        <div style="position:relative; width:44px; height:44px; border-radius:50%; background:#1a2038; border:2px solid var(--primary); display:flex; align-items:center; justify-content:center; font-size:20px;">
          ${stu.avatar}
          <span style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#00e676; border:2px solid #0f1322; border-radius:50%;"></span>
        </div>
        <div style="font-size:10.5px; font-weight:700; color:#fff; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; margin-top:3px;">${stu.name.split(" ")[0]}</div>
        <div style="font-size:8.5px; color:var(--text-muted); text-align:center;">${stu.level}</div>
      `;
      bubble.onclick = () => {
        this.open1v1Chat(stu);
      };
      onlineTray.appendChild(bubble);
    });
    onlineSection.appendChild(onlineTray);
    list.appendChild(onlineSection);

    // 3. ACTIVE 1v1 DIRECT MESSAGES
    const dmKeys = Object.keys(game.dms || {});
    if (dmKeys.length > 0) {
      const dmHeader = document.createElement("div");
      dmHeader.style.cssText = "font-size:11px; font-weight:800; color:var(--accent); text-transform:uppercase; letter-spacing:0.5px; margin:10px 0 6px;";
      dmHeader.textContent = "💬 Active 1v1 Direct Messages";
      list.appendChild(dmHeader);

      dmKeys.forEach(k => {
        const dm = game.dms[k];
        const dmCard = document.createElement("div");
        dmCard.className = "chat-contact-card";
        const lastMsg = dm.messages && dm.messages.length > 0 ? dm.messages[dm.messages.length - 1] : null;
        const previewText = lastMsg ? (lastMsg.sender === "you" ? `You: ${lastMsg.text}` : lastMsg.text) : "Started a direct chat";
        const previewTime = lastMsg ? (lastMsg.time || "") : "";

        dmCard.innerHTML = `
          <div class="chat-contact-avatar">${dm.avatar || "👤"}</div>
          <div class="chat-contact-info">
            <div class="chat-contact-top">
              <span class="chat-contact-name">${dm.name} <span style="font-size:9.5px; color:var(--primary); font-weight:700;">(${(dm.uni || "").toUpperCase()})</span></span>
              <span class="chat-contact-time">${previewTime}</span>
            </div>
            <div class="chat-contact-preview">${previewText}</div>
          </div>
          <div class="chat-contact-badge" style="background:rgba(0,240,255,0.2); color:var(--cyan); border:1px solid var(--cyan);">1v1</div>
        `;

        dmCard.onclick = () => {
          this.open1v1Chat(dm);
        };
        list.appendChild(dmCard);
      });
    }

    // 4. STORY NPC CONTACTS
    const storyHeader = document.createElement("div");
    storyHeader.style.cssText = "font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin:10px 0 6px;";
    storyHeader.textContent = "📱 Campus Contacts & Family";
    list.appendChild(storyHeader);

    const chats = game.chats || [];
    chats.forEach(chat => {
      const card = document.createElement("div");
      card.className = "chat-contact-card";
      const lastMsg = chat.messages[chat.messages.length - 1];
      const previewText = lastMsg ? (lastMsg.sender === "you" ? `You: ${lastMsg.text}` : lastMsg.text) : "No messages yet";
      const previewTime = lastMsg ? lastMsg.time : "";

      card.innerHTML = `
        <div class="chat-contact-avatar">${chat.avatar || "👤"}</div>
        <div class="chat-contact-info">
          <div class="chat-contact-top">
            <span class="chat-contact-name">${chat.name}</span>
            <span class="chat-contact-time">${previewTime}</span>
          </div>
          <div class="chat-contact-preview">${previewText}</div>
        </div>
        ${chat.unread ? `<div class="chat-contact-badge">1</div>` : ""}
      `;

      card.onclick = () => {
        this.openChatConversation(chat.id);
      };

      list.appendChild(card);
    });

    this.updateHeaderAndStats();
  },

  openLiveCampusChat() {
    this.currentChatId = "live_campus_chat";
    this.activeDmStudent = null;
    const contactsView = document.getElementById("whatschat-contacts-view");
    const convoView = document.getElementById("whatschat-convo-view");
    const title = document.getElementById("whatschat-title");
    const status = document.getElementById("whatschat-header-status");
    const replyBox = document.getElementById("whatschat-replies-box");
    const inputBar = document.getElementById("whatschat-input-bar");

    if (contactsView) contactsView.style.display = "none";
    if (convoView) convoView.style.display = "flex";
    if (title) title.textContent = "🇳🇬 All-Campus Hub";
    if (status) status.textContent = "Real Students Online 🟢";

    if (replyBox) replyBox.style.display = "none";
    if (inputBar) inputBar.style.display = "flex";

    this.renderLiveChatMessages();

    // Hook up Enter key
    const liveInput = document.getElementById("whatschat-live-input");
    if (liveInput) {
      liveInput.placeholder = "Message coursemates online...";
      liveInput.focus();
      liveInput.onkeydown = (e) => {
        if (e.key === "Enter") {
          this.sendLiveChatMessage();
        }
      };
    }
    const sendBtn = document.getElementById("whatschat-live-send-btn");
    if (sendBtn) {
      sendBtn.onclick = () => {
        this.sendLiveChatMessage();
      };
    }
  },

  renderLiveChatMessages() {
    if (this.currentChatId !== "live_campus_chat") return;
    const msgBox = document.getElementById("whatschat-messages-box");
    if (!msgBox) return;

    let liveMsgs = (window.cloudSync && window.cloudSync.liveChatMessages && window.cloudSync.liveChatMessages.length > 0)
      ? window.cloudSync.liveChatMessages
      : (window.cloudSync && window.cloudSync.getDefaultLiveChatMessages ? window.cloudSync.getDefaultLiveChatMessages() : [
        { senderName: "Segun", university: "unilorin", department: "Computer Science", level: "200L", text: "Who is at Tanke Tipper garage? How is the bus line looking?", time: "08:14" },
        { senderName: "Chidimma", university: "unilag", department: "Mass Comm", level: "100L", text: "Good morning scholars! Does anyone have the PDF for GST 111?", time: "08:20" },
        { senderName: "Farouk", university: "unilorin", department: "Mechanical Engr", level: "300L", text: "Light just went off in Sanrab. Baba Sanrab is already collecting ₦1,500 diesel dues 😂", time: "08:25" }
      ]);

    msgBox.innerHTML = "";
    const myName = (window.game && window.game.profile) ? window.game.profile.name : "You";

    liveMsgs.forEach(msg => {
      const isMine = msg.senderName === myName || (window.cloudSync && window.cloudSync.currentUser && msg.senderId === window.cloudSync.currentUser.uid);
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${isMine ? "outgoing" : "incoming"}`;

      const uniTag = (msg.university || "CAMPUS").toUpperCase();
      const levelTag = msg.level || "Student";
      const headerText = isMine ? "You" : `[${uniTag} • ${levelTag}] ${msg.senderName}`;

      bubble.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px; gap:8px;">
          <span style="font-size:10px; font-weight:800; color:${isMine ? "#000" : "var(--cyan)"}; opacity:0.85;">${headerText}</span>
          ${!isMine ? `<button class="chat-dm-action-btn" onclick="UI.open1v1ChatFromLive('${msg.senderName}', '${msg.university || ""}', '${msg.department || ""}', '${msg.level || ""}')" style="background:rgba(0,230,118,0.18); border:1px solid var(--primary); color:var(--primary); font-size:9.5px; font-weight:800; border-radius:10px; padding:2px 7px; cursor:pointer;">💬 1v1 DM</button>` : ""}
        </div>
        <div style="word-break:break-word;">${msg.text}</div>
        <div class="chat-bubble-time">${msg.time || "Now"} ${isMine ? "✓✓" : ""}</div>
      `;
      msgBox.appendChild(bubble);
    });

    msgBox.scrollTop = msgBox.scrollHeight;
  },

  sendLiveChatMessage() {
    const input = document.getElementById("whatschat-live-input");
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = "";

    if (window.cloudSync && window.cloudSync.sendLiveChatMessage) {
      window.cloudSync.sendLiveChatMessage(text);
      sfx.playNotification();
    } else {
      if (!this.offlineLiveMsgs) this.offlineLiveMsgs = [];
      const timeStr = game.formatTime();
      this.offlineLiveMsgs.push({
        senderName: game.profile.name,
        university: game.profile.university,
        department: game.profile.department,
        level: game.profile.level,
        text,
        time: timeStr
      });
      if (window.cloudSync) window.cloudSync.liveChatMessages = this.offlineLiveMsgs;
      this.renderLiveChatMessages();
      sfx.playNotification();
    }
  },

  // 1v1 DIRECT MESSAGING SUITE
  open1v1Chat(student) {
    if (typeof student === "string") {
      const allOnline = this.getOnlineStudents();
      student = allOnline.find(s => s.id === student || s.name === student) || {
        id: student.toLowerCase().replace(/\s+/g, "_"),
        name: student,
        uni: "unilorin",
        dept: "Student",
        level: "100L",
        avatar: "👤"
      };
    }
    const studentId = student.id;
    this.currentChatId = "dm_" + studentId;
    this.activeDmStudent = student;

    if (!game.dms) game.dms = {};
    if (!game.dms[studentId]) {
      game.dms[studentId] = {
        id: studentId,
        name: student.name,
        uni: student.uni || "unilorin",
        dept: student.dept || "General Studies",
        level: student.level || "100L",
        avatar: student.avatar || "👤",
        messages: [
          { sender: "them", text: `Hey! I'm ${student.name.split(" ")[0]} from ${student.dept || "campus"}. How far with school stress today?`, time: game.formatTime() }
        ]
      };
      game.saveGame();
    }

    const contactsView = document.getElementById("whatschat-contacts-view");
    const convoView = document.getElementById("whatschat-convo-view");
    const title = document.getElementById("whatschat-title");
    const status = document.getElementById("whatschat-header-status");
    const replyBox = document.getElementById("whatschat-replies-box");
    const inputBar = document.getElementById("whatschat-input-bar");

    if (contactsView) contactsView.style.display = "none";
    if (convoView) convoView.style.display = "flex";
    if (title) title.textContent = `${student.avatar || "👤"} ${student.name.split(" ")[0]}`;
    if (status) status.textContent = `${(student.uni || "").toUpperCase()} • Online 🟢`;

    if (replyBox) {
      replyBox.style.display = "flex";
      replyBox.innerHTML = `
        <button class="chat-reply-btn" onclick="UI.send1v1QuickAction('urgent2k')">💸 Ask for Urgent 2k</button>
        <button class="chat-reply-btn" onclick="UI.send1v1QuickAction('pq')">📚 Past Questions</button>
        <button class="chat-reply-btn" onclick="UI.send1v1QuickAction('date')">❤️ Propose Date</button>
        <button class="chat-reply-btn" onclick="UI.send1v1QuickAction('hype')">🔥 Hype Drip</button>
      `;
    }

    if (inputBar) {
      inputBar.style.display = "flex";
      const liveInput = document.getElementById("whatschat-live-input");
      if (liveInput) {
        liveInput.placeholder = `Message ${student.name.split(" ")[0]}...`;
        liveInput.focus();
        liveInput.onkeydown = (e) => {
          if (e.key === "Enter") {
            this.send1v1Message();
          }
        };
      }
      const sendBtn = document.getElementById("whatschat-live-send-btn");
      if (sendBtn) {
        sendBtn.onclick = () => {
          this.send1v1Message();
        };
      }
    }

    this.render1v1Messages();
    sfx.playNotification();
  },

  render1v1Messages() {
    if (!this.activeDmStudent) return;
    const studentId = this.activeDmStudent.id;
    const dm = game.dms && game.dms[studentId];
    if (!dm) return;

    const msgBox = document.getElementById("whatschat-messages-box");
    if (!msgBox) return;
    msgBox.innerHTML = "";

    dm.messages.forEach(msg => {
      const isMine = msg.sender === "you";
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${isMine ? "outgoing" : "incoming"}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div class="chat-bubble-time">${msg.time || game.formatTime()} ${isMine ? "✓✓" : ""}</div>
      `;
      msgBox.appendChild(bubble);
    });

    msgBox.scrollTop = msgBox.scrollHeight;
  },

  send1v1Message(customText) {
    if (!this.activeDmStudent) return;
    const student = this.activeDmStudent;
    const studentId = student.id;
    const input = document.getElementById("whatschat-live-input");
    const text = customText || (input ? input.value.trim() : "");
    if (!text) return;
    if (input) input.value = "";

    if (!game.dms[studentId]) return;
    const nowTime = game.formatTime();

    // 1. Add user message
    game.dms[studentId].messages.push({
      sender: "you",
      text: text,
      time: nowTime
    });

    this.render1v1Messages();
    sfx.playNotification();

    // 2. Realistic context-aware Nigerian student response
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("urgent 2k") || lower.includes("money") || lower.includes("cash") || lower.includes("borrow")) {
        if (Math.random() < 0.5) {
          game.finances.cash += 2000;
          reply = `Sent you ₦2,000 on PalmPay! Just refund when your monthly allowance drops o! 💸`;
          sfx.playCash();
          game.addLog(`${student.name} sent you ₦2,000 on PalmPay!`, "positive");
        } else {
          reply = `Haha guy me sef dey manage concoction rice since yesterday! Account balance is ₦150 😭`;
        }
      } else if (lower.includes("pq") || lower.includes("past question") || lower.includes("exam") || lower.includes("test")) {
        game.stats.cgpa = Math.min(5.0, +(game.stats.cgpa + 0.05).toFixed(2));
        reply = `I have the 5-year past questions PDF! Just sent it to your email. Make sure you read topics 3 and 7! 📚`;
        sfx.playCash();
        game.addLog(`${student.name} shared past questions PDF (+0.05 CGPA)!`, "positive");
      } else if (lower.includes("date") || lower.includes("hangout") || lower.includes("amala") || lower.includes("cold stone")) {
        game.stats.fun = Math.min(100, game.stats.fun + 25);
        reply = `Say less! Meet me at Tanke amala joint by 4 PM. Food is on you though! 💃`;
        sfx.playNotification();
        game.addLog(`Planned hangout date with ${student.name} (+25 Fun)!`, "positive");
      } else if (lower.includes("drip") || lower.includes("fine") || lower.includes("fresh") || lower.includes("fit")) {
        game.stats.fun = Math.min(100, game.stats.fun + 15);
        reply = `Haha thank you so much! Real recognize real! Your fit at the lecture theatre was sharp too! ✨`;
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("how far") || lower.includes("xup")) {
        reply = `I dey o! Just finished a 2-hour lecture. How is your side? Hope no test today?`;
      } else {
        const fallbacks = [
          `True talk! Campus life no easy at all, but we move! 🚀`,
          `No cap! Are you going for night class at PTDF library later tonight?`,
          `Lmaooo you are not serious 😂! Let's link up after class!`,
          `Facts! Make sure you submit that assignment before the portal closes o!`
        ];
        reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      game.dms[studentId].messages.push({
        sender: "them",
        text: reply,
        time: game.formatTime()
      });
      game.saveGame();
      this.render1v1Messages();
      this.updateHeaderAndStats();
      sfx.playNotification();
    }, 600);
  },

  send1v1QuickAction(actionType) {
    if (actionType === "urgent2k") {
      this.send1v1Message("How far my guy, abeg fit borrow me urgent 2k till weekend? Things hard o 🙏");
    } else if (actionType === "pq") {
      this.send1v1Message("Abeg you get past questions for GST / faculty courses? Exam is around the corner! 📚");
    } else if (actionType === "date") {
      this.send1v1Message("Are you free this evening? Let me take you out for cold ice cream and suya! 🍦✨");
    } else if (actionType === "hype") {
      this.send1v1Message("Your drip at lecture theatre today was pure fire! Who is your stylist? 🔥👟");
    }
  },

  open1v1ChatFromLive(senderName, university, department, level) {
    const student = {
      id: senderName.toLowerCase().replace(/\s+/g, "_"),
      name: senderName,
      uni: university || "unilorin",
      dept: department || "Computer Science",
      level: level || "100L",
      avatar: "🧑🏾‍🎓"
    };
    this.open1v1Chat(student);
  },

  openChatConversation(chatId) {
    this.currentChatId = chatId;
    const contactsView = document.getElementById("whatschat-contacts-view");
    const convoView = document.getElementById("whatschat-convo-view");
    const title = document.getElementById("whatschat-title");
    const status = document.getElementById("whatschat-header-status");
    const msgBox = document.getElementById("whatschat-messages-box");
    const replyBox = document.getElementById("whatschat-replies-box");
    const inputBar = document.getElementById("whatschat-input-bar");

    const chat = (game.chats || []).find(c => c.id === chatId);
    if (!chat) return;

    chat.unread = false;
    game.saveGame();
    this.updateHeaderAndStats();

    if (contactsView) contactsView.style.display = "none";
    if (convoView) convoView.style.display = "flex";
    if (title) title.textContent = chat.name;
    if (status) status.textContent = chat.tag || "Active";

    if (replyBox) replyBox.style.display = "flex";
    if (inputBar) inputBar.style.display = "none";

    if (!msgBox || !replyBox) return;
    msgBox.innerHTML = "";
    replyBox.innerHTML = "";

    // Render message bubbles
    chat.messages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${msg.sender === "you" ? "outgoing" : "incoming"}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div class="chat-bubble-time">${msg.time} ${msg.sender === "you" ? "✓✓" : ""}</div>
      `;
      msgBox.appendChild(bubble);
    });
    msgBox.scrollTop = msgBox.scrollHeight;

    // Render interactive reply buttons
    if (chat.availableReplies && chat.availableReplies.length > 0) {
      chat.availableReplies.forEach((rep, idx) => {
        const btn = document.createElement("button");
        btn.className = "chat-reply-btn";
        btn.textContent = `💬 ${rep.label}`;
        btn.onclick = () => {
          game.sendChatReply(chat.id, idx);
          sfx.playNotification();
          this.openChatConversation(chat.id);
          this.renderAll();
        };
        replyBox.appendChild(btn);
      });
    } else {
      const endNote = document.createElement("div");
      endNote.style.cssText = "font-size:11px; color:var(--text-muted); text-align:center; padding:6px;";
      endNote.textContent = "✓ Conversation caught up. Check back later for new updates!";
      replyBox.appendChild(endNote);
    }
  },

  renderFoodMenu() {
    const list = document.getElementById("chowdeck-food-list");
    list.innerHTML = "";
    SHOP_ITEMS.filter(item => item.category === "food").forEach(item => {
      const card = document.createElement("div");
      card.className = "meter-card";
      card.style.flexDirection = "row";
      card.style.justifyContent = "space-between";
      card.style.alignItems = "center";
      card.style.padding = "10px";

      card.innerHTML = `
        <div>
          <div style="font-size:13px; font-weight:800; color:#fff;">${item.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">${item.desc}</div>
          <div style="font-size:12px; font-weight:800; color:var(--primary); margin-top:2px;">${game.formatMoney(item.cost)}</div>
        </div>
        <button class="action-btn" style="padding:6px 12px; border-radius:10px; background:var(--primary); color:#000; font-weight:800; border:none; cursor:pointer;">Order</button>
      `;

      card.querySelector("button").onclick = () => {
        if (game.buyShopItem(item)) {
          this.renderAll();
          document.getElementById("palmpay-balance").textContent = game.formatMoney(game.stats.cash);
        }
      };

      list.appendChild(card);
    });
  },

  renderChitterFeed() {
    const container = document.getElementById("chitter-posts-list");
    if (!container) return;
    container.innerHTML = "";
    game.chitterFeed.forEach(post => {
      const card = document.createElement("div");
      card.className = "meter-card";
      card.style.padding = "10px";
      card.style.background = "#141728";
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:12px; font-weight:800; color:var(--cyan);">${post.author}</span>
          <span style="font-size:10px; color:var(--text-muted);">${post.time || "Just now"}</span>
        </div>
        <div style="font-size:12.5px; color:#fff; line-height:1.4;">${post.text}</div>
      `;
      container.appendChild(card);
    });

    const sendBtn = document.getElementById("chitter-send-btn");
    const input = document.getElementById("chitter-input");
    if (sendBtn) {
      sendBtn.onclick = () => {
        if (input.value.trim()) {
          game.postChitterTweet(input.value.trim());
          input.value = "";
          this.renderChitterFeed();
          this.renderAll();
        }
      };
    }
  },

  renderHustleGigs() {
    const list = document.getElementById("hustle-jobs-list");
    if (!list) return;
    list.innerHTML = "";

    // Section 1: Daily Quick Gigs
    const sec1Title = document.createElement("div");
    sec1Title.style.cssText = "font-size:11px; font-weight:900; color:var(--accent); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;";
    sec1Title.textContent = "⚡ Daily Quick Hustles & Jobs";
    list.appendChild(sec1Title);

    CAMPUS_JOBS.forEach(job => {
      const card = document.createElement("div");
      card.className = "meter-card";
      card.style.padding = "12px";
      card.style.marginBottom = "8px";
      card.innerHTML = `
        <div style="font-size:13.5px; font-weight:800; color:#fff;">${job.name}</div>
        <div style="font-size:11px; color:var(--text-muted); margin:3px 0 6px;">${job.desc}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:12px; color:var(--accent); font-weight:700;">Energy: -${job.energyCost}⚡</span>
          <button class="action-btn" style="padding:6px 14px; background:var(--accent); color:#000; font-weight:800; border:none; border-radius:10px; cursor:pointer;">Hustle</button>
        </div>
      `;

      card.querySelector("button").onclick = () => {
        game.doCampusHustle(job);
        this.renderAll();
      };

      list.appendChild(card);
    });

    // Section 2: Campus Business Empire (Investments & Passive Assets)
    if (typeof CAMPUS_BUSINESSES !== "undefined") {
      const sec2Title = document.createElement("div");
      sec2Title.style.cssText = "font-size:11px; font-weight:900; color:var(--primary); text-transform:uppercase; margin:16px 0 8px; letter-spacing:0.5px;";
      sec2Title.textContent = "🏢 Campus Business Assets (Daily Dividends)";
      list.appendChild(sec2Title);

      CAMPUS_BUSINESSES.forEach(biz => {
        const isOwned = game.businesses && game.businesses.some(b => b.id === biz.id);
        const bCard = document.createElement("div");
        bCard.className = "meter-card";
        bCard.style.padding = "12px";
        bCard.style.marginBottom = "8px";
        bCard.style.borderColor = isOwned ? "var(--primary)" : "var(--card-border)";
        bCard.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:13.5px; font-weight:800; color:#fff;">${biz.icon} ${biz.name}</div>
            <span style="font-size:11px; font-weight:800; color:var(--primary);">${game.formatMoney(biz.dailyReturn)} / day</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin:4px 0 8px;">${biz.desc}</div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:#fff; font-weight:700;">Capital: ${game.formatMoney(biz.cost)}</span>
            <button class="action-btn" style="padding:6px 14px; background:${isOwned ? "rgba(0,230,118,0.18)" : "var(--primary)"}; color:${isOwned ? "var(--primary)" : "#000"}; font-weight:800; border:${isOwned ? "1px solid var(--primary)" : "none"}; border-radius:10px; cursor:pointer;">${isOwned ? "✅ Active Asset" : "Acquire"}</button>
          </div>
        `;

        const btn = bCard.querySelector("button");
        if (!isOwned) {
          btn.onclick = () => {
            if (game.buyBusiness(biz.id)) {
              this.renderHustleGigs();
              this.updateHeaderAndStats();
            }
          };
        }
        list.appendChild(bCard);
      });
    }
  },

  renderStudentPortal() {
    const cgpaEl = document.getElementById("portal-cgpa-score");
    if (cgpaEl) cgpaEl.textContent = game.stats.cgpa.toFixed(2);
    let standing = "First Class Honours (Distinction)";
    if (game.stats.cgpa < 4.5) standing = "Second Class Upper (2:1)";
    if (game.stats.cgpa < 3.5) standing = "Second Class Lower (2:2)";
    if (game.stats.cgpa < 2.4) standing = "Third Class (Spillover Risk!)";
    if (game.stats.cgpa < 1.5) standing = "Advised to Withdraw (Probation)";
    const standingEl = document.getElementById("portal-standing-text");
    if (standingEl) standingEl.textContent = standing;

    // Detailed 8-Semester Academic Breakdown
    const semLabel = game.time.level === "300L" && game.time.semester === 2 ? "300L 6-Month SIWES (Industrial Attachment)" : `${game.time.level} Semester ${game.time.semester || 1}`;
    const courseCode = game.getCurrentCourseCode ? game.getCurrentCourseCode() : "GST 111";

    const portalApp = document.getElementById("app-portal");
    let detailsBox = document.getElementById("portal-deep-details");
    if (portalApp && !detailsBox) {
      detailsBox = document.createElement("div");
      detailsBox.id = "portal-deep-details";
      detailsBox.style.cssText = "margin-top:14px; background:#121526; border:1px solid var(--card-border); border-radius:16px; padding:12px; font-size:12px; display:flex; flex-direction:column; gap:8px;";
      portalApp.appendChild(detailsBox);
    }
    if (detailsBox) {
      detailsBox.innerHTML = `
        <div style="font-weight:900; color:var(--cyan); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px;">🎓 Degree &amp; Semester Records</div>
        <div><strong>Current Stage:</strong> <span style="color:#fff;">${semLabel}</span></div>
        <div><strong>Active Prerequisite:</strong> <span style="color:var(--primary); font-weight:700;">${courseCode}</span></div>
        <div><strong>Continuous Assessment:</strong> <span style="color:#fff;">${game.academics.caScore || 24} / 30 Marks</span></div>
        <div><strong>SUG Political Office:</strong> <span style="color:var(--accent); font-weight:700;">${game.academics.sugOffice || "Ordinary Student"}</span></div>
        <div><strong>Final Year Project:</strong> <span style="color:#fff;">${game.academics.projectTopic ? `${game.academics.projectTopic} (${game.academics.projectProgress}%)` : (parseInt(game.time.level) >= 400 ? "In Progress" : "Commences in 400L")}</span></div>
        <div><strong>Campus Honours:</strong> <span style="color:#00e676;">${game.academics.dinnerAwards && game.academics.dinnerAwards.length > 0 ? game.academics.dinnerAwards.join(", ") : "Pending Final Year"}</span></div>
      `;
    }
  },

  // Tab Switcher on Dock
  switchTab(tab) {
    if (tab === "campus") {
      this.renderLocation();
    } else if (tab === "map") {
      this.openMapLocationSelector();
    } else if (tab === "hustle") {
      this.openPhoneModal();
      this.openPhoneApp("hustle");
    } else if (tab === "profile") {
      this.openPhoneModal();
      this.openPhoneApp("portal");
    }
  },

  openMapLocationSelector() {
    const uni = UNIVERSITIES[game.profile.university] || UNIVERSITIES.unilorin;
    const locNames = uni.locations.map(l => l.name);
    const chosen = prompt(`Choose Campus Location to visit:\n\n${locNames.map((n, i) => `${i + 1}. ${n}`).join("\n")}`);
    const index = parseInt(chosen) - 1;
    if (!isNaN(index) && uni.locations[index]) {
      game.currentLocationId = uni.locations[index].id;
      game.advanceTime(20);
      game.addLog(`Boarded a campus shuttle to ${uni.locations[index].name}.`, "positive");
      this.renderAll();
      sfx.playNotification();
    }
  },

  // Spawn Screen & Character Customization Handlers
  selectSpawnGender(gender) {
    const genderInput = document.getElementById("spawn-gender");
    if (genderInput) genderInput.value = gender;

    const maleCard = document.getElementById("gender-card-male");
    const femaleCard = document.getElementById("gender-card-female");
    if (maleCard) maleCard.classList.toggle("selected", gender === "male");
    if (femaleCard) femaleCard.classList.toggle("selected", gender === "female");

    const hairSelect = document.getElementById("spawn-hair");
    if (hairSelect) {
      if (gender === "female") {
        hairSelect.innerHTML = `
          <option value="bone_straight">💇🏾‍♀️ Bone Straight Hair (Campus Baddie / Slay Queen)</option>
          <option value="braids">👩🏾‍🦱 Knotless Braids &amp; Beads (Natural Campus Diva)</option>
          <option value="curly_wig">💁🏾‍♀️ Deep Wave Frontal Wig (Party Baller / Influencer)</option>
          <option value="hijab">🧕 Modest Hijab &amp; Abaya (Disciplined Scholar / Sister)</option>
          <option value="natural_afro">👩🏾 Afro Curls &amp; Edge Control (Creative Artiste / Alté)</option>
        `;
      } else {
        hairSelect.innerHTML = `
          <option value="fade">💈 Low Fade &amp; Waves (Guy Man / Fresh Cut)</option>
          <option value="locks">🧑🏾‍🦱 Dreadlocks &amp; Twists (Alté Creative / Tech Bro)</option>
          <option value="scholar">👨🏾‍💼 Clean Shave &amp; Glasses (Serious First Class)</option>
          <option value="cap">🧢 Senator Cap &amp; Agbada (Campus Big Boy / Politician)</option>
        `;
      }
    }

    this.updateAvatarPreview();
  },

  getAvatarEmoji(gender, hair) {
    if (gender === "female") {
      switch (hair) {
        case "bone_straight": return "👩🏾‍💼";
        case "braids": return "👩🏾‍🎓";
        case "curly_wig": return "💁🏾‍♀️";
        case "hijab": return "🧕";
        case "natural_afro": return "👩🏾‍🎨";
        default: return "👩🏾";
      }
    } else {
      switch (hair) {
        case "fade": return "👨🏾‍💻";
        case "locks": return "🧑🏾‍🦱";
        case "scholar": return "👨🏾‍🎓";
        case "cap": return "🤴🏾";
        default: return "👨🏾";
      }
    }
  },

  updateAvatarPreview() {
    const nameInput = document.getElementById("spawn-name");
    const genderInput = document.getElementById("spawn-gender");
    const hairSelect = document.getElementById("spawn-hair");
    const dripSelect = document.getElementById("spawn-drip");
    const uniSelect = document.getElementById("spawn-uni");
    const deptSelect = document.getElementById("spawn-dept");

    const name = (nameInput && nameInput.value.trim()) || "Student";
    const gender = (genderInput && genderInput.value) || "male";
    const hair = (hairSelect && hairSelect.value) || (gender === "female" ? "braids" : "fade");
    const drip = (dripSelect && dripSelect.value) || "streetwear";
    const uniKey = (uniSelect && uniSelect.value) || "unilorin";
    const dept = (deptSelect && deptSelect.value) || "Computer Science";

    const emoji = this.getAvatarEmoji(gender, hair);
    const avatarDisplay = document.getElementById("spawn-avatar-display");
    if (avatarDisplay) avatarDisplay.textContent = emoji;

    const previewName = document.getElementById("spawn-preview-name");
    if (previewName) previewName.textContent = name;

    const previewDetails = document.getElementById("spawn-preview-details");
    if (previewDetails) {
      const hairText = hairSelect && hairSelect.options[hairSelect.selectedIndex] ? hairSelect.options[hairSelect.selectedIndex].text.split("(")[0].trim() : hair;
      const dripText = dripSelect && dripSelect.options[dripSelect.selectedIndex] ? dripSelect.options[dripSelect.selectedIndex].text.split("(")[0].trim() : drip;
      const genderLabel = gender === "female" ? "Female (Baddie / Fine Girl)" : "Male (Guy Man / Baller)";
      previewDetails.textContent = `${genderLabel} • ${hairText} • ${dripText}`;
    }

    const previewDept = document.getElementById("spawn-preview-dept");
    if (previewDept) {
      const uniShort = uniKey === "unilag" ? "UNILAG" : "UNILORIN";
      previewDept.textContent = `${uniShort} • ${dept}`;
    }
  },

  openSpawnModal() {
    if (this.dom.spawnScreen) {
      this.dom.spawnScreen.style.display = "flex";
      this.updateAvatarPreview();
    }
  },

  handleSpawnSubmit() {
    const name = (document.getElementById("spawn-name") && document.getElementById("spawn-name").value.trim()) || "Student";
    const gender = (document.getElementById("spawn-gender") && document.getElementById("spawn-gender").value) || "male";
    const hair = (document.getElementById("spawn-hair") && document.getElementById("spawn-hair").value) || (gender === "female" ? "braids" : "fade");
    const drip = (document.getElementById("spawn-drip") && document.getElementById("spawn-drip").value) || "streetwear";
    const university = (document.getElementById("spawn-uni") && document.getElementById("spawn-uni").value) || "unilorin";
    const department = (document.getElementById("spawn-dept") && document.getElementById("spawn-dept").value) || "Computer Science";
    const spawnClass = (document.getElementById("selected-class") && document.getElementById("selected-class").value) || "trench";
    const avatarEmoji = this.getAvatarEmoji(gender, hair);

    game.initFromSpawn({
      name,
      gender,
      hair,
      drip,
      avatarEmoji,
      university,
      department,
      spawnClass
    });

    if (this.dom.spawnScreen) {
      this.dom.spawnScreen.style.display = "none";
    }
    this.renderAll();
    sfx.playCash();

    if (window.cloudSync && window.cloudSync.currentUser) {
      window.cloudSync.syncToCloud();
    }
  },

  // ==========================================
  // CBT EXAM SIMULATOR
  // ==========================================
  startCbtExam(courseCode = "GST 111", callback = null) {
    const modal = document.getElementById("cbt-exam-modal");
    if (!modal) return;

    // Pick 3 questions (shuffle order)
    const pool = (typeof CBT_QUESTIONS !== "undefined" && CBT_QUESTIONS.length) ? [...CBT_QUESTIONS] : [
      {
        q: "In Nigerian university 5.0 CGPA scale, what minimum score awards an 'A' grade (5.00 points)?",
        options: ["70% and above", "60% - 69%", "50% - 59%", "45% - 49%"],
        answer: 0
      },
      {
        q: "What is the common meaning of the student acronym 'TDB' during exam weeks?",
        options: ["Till Day Break (Night Reading)", "To Do Better", "Today Don Break", "Teaching Department Board"],
        answer: 0
      },
      {
        q: "Which official document officially binds a 100L student to university code of conduct?",
        options: ["Matriculation Oath Form", "Hostel Bedspace Chit", "SUG Manifesto", "Library Card"],
        answer: 0
      }
    ];

    pool.sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, 3).map(item => {
      const correctText = item.options[item.answer];
      const shuffledOpts = [...item.options].sort(() => 0.5 - Math.random());
      const newAnsIdx = shuffledOpts.indexOf(correctText);
      return {
        q: item.q,
        options: shuffledOpts,
        answer: newAnsIdx
      };
    });

    this.cbtData = {
      courseCode,
      questions: selected,
      currentIdx: 0,
      selectedOpt: null,
      score: 0,
      timerSeconds: 90,
      timerInterval: null,
      callback
    };

    modal.style.display = "flex";
    this.startCbtTimer();
    this.renderCbtQuestion();
    sfx.playNotification();
  },

  startCbtTimer() {
    const timerEl = document.getElementById("cbt-timer");
    if (this.cbtData && this.cbtData.timerInterval) clearInterval(this.cbtData.timerInterval);

    this.cbtData.timerInterval = setInterval(() => {
      if (!this.cbtData) return;
      this.cbtData.timerSeconds -= 1;
      const mins = String(Math.floor(this.cbtData.timerSeconds / 60)).padStart(2, "0");
      const secs = String(this.cbtData.timerSeconds % 60).padStart(2, "0");
      if (timerEl) timerEl.textContent = `⏳ ${mins}:${secs}`;

      if (this.cbtData.timerSeconds <= 0) {
        clearInterval(this.cbtData.timerInterval);
        alert("⏰ TIME IS UP! The CBT Portal has submitted your exam automatically!");
        this.finishCbtExam();
      }
    }, 1000);
  },

  renderCbtQuestion() {
    if (!this.cbtData) return;
    const qData = this.cbtData.questions[this.cbtData.currentIdx];
    if (!qData) {
      this.finishCbtExam();
      return;
    }

    const codeEl = document.getElementById("cbt-course-code");
    const countEl = document.getElementById("cbt-q-counter");
    const qTextEl = document.getElementById("cbt-question-text");
    const optListEl = document.getElementById("cbt-options-list");
    const nextBtn = document.getElementById("cbt-next-btn");

    if (codeEl) codeEl.textContent = `${this.cbtData.courseCode}: CBT Examination Arena`;
    if (countEl) countEl.textContent = `Question ${this.cbtData.currentIdx + 1} of ${this.cbtData.questions.length}`;
    if (qTextEl) qTextEl.textContent = qData.q;

    if (optListEl) {
      optListEl.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      qData.options.forEach((opt, idx) => {
        const item = document.createElement("div");
        item.className = "cbt-option-item";
        item.dataset.index = idx;
        item.innerHTML = `<span style="display:inline-block; width:22px; height:22px; border-radius:50%; background:rgba(255,255,255,0.1); text-align:center; line-height:22px; font-weight:800; font-size:11px;">${letters[idx]}</span> <span>${opt}</span>`;
        item.onclick = () => this.cbtSelectOption(idx);
        optListEl.appendChild(item);
      });
    }

    this.cbtData.selectedOpt = null;
    if (nextBtn) {
      nextBtn.textContent = this.cbtData.currentIdx === this.cbtData.questions.length - 1 ? "Submit & Finish Exam 🎯" : "Submit Answer →";
    }
  },

  cbtSelectOption(idx) {
    if (!this.cbtData) return;
    this.cbtData.selectedOpt = idx;
    const items = document.querySelectorAll(".cbt-option-item");
    items.forEach(el => {
      if (parseInt(el.dataset.index) === idx) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
    sfx.playNotification();
  },

  cbtSubmitQuestion() {
    if (!this.cbtData) return;
    if (this.cbtData.selectedOpt === null) {
      alert("Please choose an answer (A, B, C, or D) before clicking Submit!");
      return;
    }

    const currentQ = this.cbtData.questions[this.cbtData.currentIdx];
    if (this.cbtData.selectedOpt === currentQ.answer) {
      this.cbtData.score += 1;
      sfx.playCash();
    } else {
      sfx.playBuzzer();
    }

    this.cbtData.currentIdx += 1;
    if (this.cbtData.currentIdx < this.cbtData.questions.length) {
      this.renderCbtQuestion();
    } else {
      this.finishCbtExam();
    }
  },

  cbtPeepNeighbor() {
    if (!this.cbtData) return;
    const currentQ = this.cbtData.questions[this.cbtData.currentIdx];
    if (!currentQ) return;

    if (Math.random() < 0.65) {
      this.cbtSelectOption(currentQ.answer);
      alert("👀 Success! You peeped your neighbor's monitor and selected option " + ["A","B","C","D"][currentQ.answer] + "!");
    } else {
      game.stats.energy = Math.max(0, game.stats.energy - 15);
      game.stats.fun = Math.max(0, game.stats.fun - 10);
      sfx.playAlert();
      alert("🚨 'HEY YOU!' The Chief Invigilator spotted your neck stretching and banged your monitor table! (-15 Energy, -10 Fun)");
      game.addLog("Chief Invigilator caught you peeping at neighbor's screen! Serious warning issued.", "negative");
      this.updateHeaderAndStats();
    }
  },

  finishCbtExam() {
    if (!this.cbtData) return;
    if (this.cbtData.timerInterval) clearInterval(this.cbtData.timerInterval);

    const score = this.cbtData.score;
    const cb = this.cbtData.callback;
    const modal = document.getElementById("cbt-exam-modal");
    if (modal) modal.style.display = "none";

    this.cbtData = null;
    if (typeof cb === "function") {
      cb(score);
    }
    this.renderAll();
  },

  // ==========================================
  // NEPA & POWER OUTAGE SIMULATOR
  // ==========================================
  showNepaModal(isRestored) {
    const modal = document.getElementById("nepa-modal");
    if (!modal) return;

    const iconEl = document.getElementById("nepa-modal-icon");
    const titleEl = document.getElementById("nepa-modal-title");
    const descEl = document.getElementById("nepa-modal-desc");
    const optionsEl = document.getElementById("nepa-modal-options");

    if (isRestored) {
      if (iconEl) iconEl.textContent = "⚡";
      if (titleEl) titleEl.textContent = "UP NEPAAAAA! 💡⚡";
      if (descEl) descEl.textContent = "Electric power restored to all hostels! The entire block erupted with chants of 'UP NEPA!' out of windows.";
      if (optionsEl) {
        optionsEl.innerHTML = `
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('shout')">🗣️ Shout 'UP NEPA!' with whole hostel (+20 Fun)</button>
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('charge')">🔌 Quick! Plug phone, power bank & ring light before it goes!</button>
        `;
      }
    } else {
      if (iconEl) iconEl.textContent = "💡";
      if (titleEl) titleEl.textContent = "NEPA Took Light! 🌚";
      if (descEl) descEl.textContent = "Total darkness in the hostel! Ceiling fans stopped, boiling ring went cold, and room is pitch dark. What do you do?";
      if (optionsEl) {
        optionsEl.innerHTML = `
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('diesel')">⛽ Contribute ₦1,500 fuel token for compound generator (4h Light)</button>
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('barber')">💈 Pay ₦200 to charge phone at Tanke/Akoka barbershop (-₦200)</button>
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('candle')">🕯️ Light candle and read past questions in the heat (+0.05 CGPA)</button>
          <button class="nepa-opt-btn" onclick="UI.resolveNepaChoice('sleep')">😴 Just sleep in the heat (Conserve Energy)</button>
        `;
      }
    }

    modal.style.display = "flex";
  },

  closeNepaModal() {
    const modal = document.getElementById("nepa-modal");
    if (modal) modal.style.display = "none";
  },

  resolveNepaChoice(choice) {
    this.closeNepaModal();
    if (choice === "shout") {
      game.stats.fun = Math.min(100, game.stats.fun + 20);
      sfx.playUpNepa();
      game.addLog("Shouted 'UP NEPAAAAA!' with entire hostel block! (+20 Fun)", "positive");
    } else if (choice === "charge") {
      game.stats.energy = Math.min(100, game.stats.energy + 10);
      sfx.playNotification();
      game.addLog("Plugged all devices to charge. 100% battery secured! 🔋", "positive");
    } else if (choice === "diesel") {
      if (game.finances.cash >= 1500) {
        game.finances.cash -= 1500;
        game.powerGrid.generatorFuelHours = 4;
        game.powerGrid.generatorRunning = true;
        sfx.playCash();
        game.addLog("Contributed ₦1,500 for generator fuel. Compound light running for 4 hours! 💡", "positive");
      } else {
        alert("You don't have up to ₦1,500 cash for generator contribution!");
      }
    } else if (choice === "barber") {
      if (game.finances.cash >= 200) {
        game.finances.cash -= 200;
        sfx.playCash();
        game.addLog("Charged phone to 100% at campus barbershop (-₦200) 🔌", "positive");
      } else {
        alert("Not enough cash for barbershop charging fee!");
      }
    } else if (choice === "candle") {
      game.stats.energy = Math.max(0, game.stats.energy - 15);
      game.stats.cgpa = Math.min(5.0, +(game.stats.cgpa + 0.05).toFixed(2));
      sfx.playNotification();
      game.addLog("Read through past questions by candlelight in the heat (+0.05 CGPA) 🕯️", "positive");
    } else if (choice === "sleep") {
      game.stats.energy = Math.min(100, game.stats.energy + 20);
      game.advanceTime(180);
      game.addLog("Slept through the blackout heat. Woke up refreshed after 3 hours 😴", "neutral");
    }

    this.renderAll();
  },

  // ==========================================
  // ASUU STRIKE CRISIS SIMULATOR
  // ==========================================
  showAsuuModal() {
    const modal = document.getElementById("asuu-modal");
    if (!modal) return;

    const optionsEl = document.getElementById("asuu-options");
    if (optionsEl) {
      optionsEl.innerHTML = `
        <button class="asuu-opt-btn" onclick="UI.resolveAsuuChoice('tech')">💻 1. Enroll in Intensive Tech Bootcamp (+₦25,000 Freelance, +0.05 CGPA)</button>
        <button class="asuu-opt-btn" onclick="UI.resolveAsuuChoice('business')">💼 2. Start Campus POS &amp; Okrika Hustle (+₦45,000 Profit)</button>
        <button class="asuu-opt-btn" onclick="UI.resolveAsuuChoice('home')">🚌 3. Travel Home to Parents (+100 Food, +₦15,000 Pocket Money)</button>
        <button class="asuu-opt-btn" onclick="UI.resolveAsuuChoice('chill')">🍿 4. Chill at Hostel &amp; Binge Nigerian Movies (Energy 100%)</button>
      `;
    }

    modal.style.display = "flex";
  },

  closeAsuuModal() {
    const modal = document.getElementById("asuu-modal");
    if (modal) modal.style.display = "none";
  },

  resolveAsuuChoice(choice) {
    this.closeAsuuModal();
    game.resolveAsuuPath(choice);
    this.renderAll();
  },

  // ==========================================
  // 400L SIGN-OUT & NYSC CALL-UP SIMULATOR
  // ==========================================
  showSignOutModal(data = {}) {
    const modal = document.getElementById("signout-modal");
    if (!modal) return;

    const nameEl = document.getElementById("nysc-name");
    const uniEl = document.getElementById("nysc-uni");
    const deptEl = document.getElementById("nysc-dept");
    const classEl = document.getElementById("nysc-class");
    const stateEl = document.getElementById("nysc-state");

    if (nameEl) nameEl.textContent = data.name || game.profile.name;
    if (uniEl) uniEl.textContent = data.uni || (UNIVERSITIES[game.profile.university] ? UNIVERSITIES[game.profile.university].name : "University of Ilorin");
    if (deptEl) deptEl.textContent = data.dept || game.profile.department;
    if (classEl) classEl.textContent = data.degreeClass || "First Class Honours";
    if (stateEl) stateEl.textContent = data.state || "Lagos State (Orientation Camp: Iyana Ipaja)";

    modal.style.display = "flex";
    sfx.playCash();
  },

  closeSignOutModal() {
    const modal = document.getElementById("signout-modal");
    if (modal) modal.style.display = "none";
    this.renderAll();
  }
};

// Global hooks for direct button onclicks
window.UI = UI;
window.attendLecture = () => { game.attendLecture(); UI.renderAll(); };
window.readNightClass = () => { game.readNightClass(); UI.renderAll(); };
window.takeShower = () => { game.takeShower(); UI.renderAll(); };
window.sleepInRoom = () => { game.sleepInRoom(); UI.renderAll(); };
window.cookConcoctionRice = () => { game.cookConcoctionRice(); UI.renderAll(); };
window.visitClinic = () => { game.visitClinic(); UI.renderAll(); };
window.partyNight = () => { game.partyNight(); UI.renderAll(); };
window.openPhone = () => { UI.openPhoneModal(); };

document.addEventListener("DOMContentLoaded", () => {
  UI.init();
});
