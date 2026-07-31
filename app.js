// 晚餐隨機轉盤 - 主程式應用邏輯 (app.js)

import { PRESET_THEMES, generateRandomOptions, WHEEL_COLORS } from './data.js';
import { DinnerWheel } from './wheel.js';
import { ConfettiEffect } from './confetti.js';

class DinnerApp {
  constructor() {
    this.options = [];
    this.history = this.loadHistory();
    this.activeTheme = 'random';
    this.audioCtx = null;

    this.initDOMReferences();
    this.initWebAudio();
    this.initWheel();
    this.initConfetti();
    this.renderPresetPills();
    
    // 預設加載驚喜全隨機選單 (8個選項)
    this.loadPresetOptions('random', 8);

    this.bindEvents();
    this.renderHistoryList();
  }

  initDOMReferences() {
    this.presetContainer = document.getElementById('presetContainer');
    this.itemCountSelect = document.getElementById('itemCountSelect');
    this.btnShuffle = document.getElementById('btnShuffle');
    this.btnSpin = document.getElementById('btnSpin');
    this.wheelPointer = document.getElementById('wheelPointer');

    this.tabOptionsBtn = document.getElementById('tabOptionsBtn');
    this.tabHistoryBtn = document.getElementById('tabHistoryBtn');
    this.tabOptions = document.getElementById('tabOptions');
    this.tabHistory = document.getElementById('tabHistory');
    this.activeCountBadge = document.getElementById('activeCountBadge');

    this.addOptionForm = document.getElementById('addOptionForm');
    this.inputEmoji = document.getElementById('inputEmoji');
    this.inputName = document.getElementById('inputName');
    this.optionsList = document.getElementById('optionsList');

    this.btnSelectAll = document.getElementById('btnSelectAll');
    this.btnDeselectAll = document.getElementById('btnDeselectAll');
    this.btnClearAll = document.getElementById('btnClearAll');

    this.historyCountText = document.getElementById('historyCountText');
    this.historyList = document.getElementById('historyList');
    this.btnClearHistory = document.getElementById('btnClearHistory');

    // Modal
    this.resultModal = document.getElementById('resultModal');
    this.modalEmoji = document.getElementById('modalEmoji');
    this.modalWinnerName = document.getElementById('modalWinnerName');
    this.modalWinnerDesc = document.getElementById('modalWinnerDesc');
    this.modalCalories = document.getElementById('modalCalories');
    this.btnGoogleMaps = document.getElementById('btnGoogleMaps');
    this.btnSpinAgain = document.getElementById('btnSpinAgain');
    this.btnCloseModal = document.getElementById('btnCloseModal');
  }

  initWebAudio() {
    // 簡單優雅的 Web Audio 音效產生器 (不需外部 mp3 檔案)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  playTickSound() {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay restrictions safeguard
    }
  }

  playFanfareSound() {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.4, this.audioCtx.currentTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.1);
        osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.45);
      });
    } catch (e) {}
  }

  initWheel() {
    const canvas = document.getElementById('wheelCanvas');
    this.wheel = new DinnerWheel(
      canvas,
      this.options,
      (winner) => this.handleSpinEnd(winner),
      () => this.handleWheelTick()
    );
  }

  initConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    this.confetti = new ConfettiEffect(confettiCanvas);
  }

  renderPresetPills() {
    this.presetContainer.innerHTML = '';
    PRESET_THEMES.forEach((theme) => {
      const btn = document.createElement('button');
      btn.className = `preset-btn ${theme.id === this.activeTheme ? 'active' : ''}`;
      btn.innerHTML = `<span>${theme.name}</span>`;
      btn.addEventListener('click', () => {
        this.activeTheme = theme.id;
        this.updateActivePresetPills();
        const count = parseInt(this.itemCountSelect.value, 10) || 8;
        this.loadPresetOptions(theme.id, count);
      });
      this.presetContainer.appendChild(btn);
    });
  }

  updateActivePresetPills() {
    const pills = this.presetContainer.querySelectorAll('.preset-btn');
    pills.forEach((pill, idx) => {
      if (PRESET_THEMES[idx].id === this.activeTheme) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  loadPresetOptions(category, count) {
    this.options = generateRandomOptions(category, count);
    this.updateOptionsUI();
  }

  updateOptionsUI() {
    this.renderOptionsList();
    this.wheel.setOptions(this.options);
    
    const activeCount = this.options.filter(o => o.enabled).length;
    this.activeCountBadge.textContent = `${activeCount}/${this.options.length}`;
    this.btnSpin.disabled = activeCount === 0;
  }

  renderOptionsList() {
    this.optionsList.innerHTML = '';
    if (this.options.length === 0) {
      this.optionsList.innerHTML = `<div class="empty-hint" style="text-align:center; padding:1.5rem; color:var(--color-text-muted);">選單目前為空，請點擊上方生成按鈕或自訂新增！</div>`;
      return;
    }

    this.options.forEach((opt, index) => {
      const item = document.createElement('div');
      item.className = 'option-item';

      item.innerHTML = `
        <div class="option-left">
          <input type="checkbox" class="option-checkbox" ${opt.enabled ? 'checked' : ''} data-id="${opt.id}" />
          <div class="option-color-dot" style="background:${opt.color || '#7c4dff'};"></div>
          <span class="option-name">${opt.emoji ? opt.emoji + ' ' : ''}${opt.name}</span>
        </div>
        <div class="option-right">
          <div class="weight-control">
            <span>權重:</span>
            <button class="btn-icon btn-weight-down" data-id="${opt.id}">-</button>
            <strong style="min-width:18px; text-align:center; color:#fff;">${opt.weight || 1}</strong>
            <button class="btn-icon btn-weight-up" data-id="${opt.id}">+</button>
          </div>
          <button class="btn-delete" data-id="${opt.id}">&times;</button>
        </div>
      `;

      this.optionsList.appendChild(item);
    });

    // 綁定動態事件
    this.optionsList.querySelectorAll('.option-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const target = this.options.find(o => o.id === id);
        if (target) {
          target.enabled = e.target.checked;
          this.updateOptionsUI();
        }
      });
    });

    this.optionsList.querySelectorAll('.btn-weight-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const target = this.options.find(o => o.id === id);
        if (target && target.weight > 1) {
          target.weight -= 1;
          this.updateOptionsUI();
        }
      });
    });

    this.optionsList.querySelectorAll('.btn-weight-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const target = this.options.find(o => o.id === id);
        if (target && target.weight < 10) {
          target.weight += 1;
          this.updateOptionsUI();
        }
      });
    });

    this.optionsList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        this.options = this.options.filter(o => o.id !== id);
        this.updateOptionsUI();
      });
    });
  }

  bindEvents() {
    // 洗牌與數量切換
    this.itemCountSelect.addEventListener('change', () => {
      const count = parseInt(this.itemCountSelect.value, 10) || 8;
      this.loadPresetOptions(this.activeTheme, count);
    });

    this.btnShuffle.addEventListener('click', () => {
      const count = parseInt(this.itemCountSelect.value, 10) || 8;
      this.loadPresetOptions(this.activeTheme, count);
    });

    // 旋轉按鈕
    this.btnSpin.addEventListener('click', () => {
      if (this.wheel.isSpinning) return;
      this.btnSpin.disabled = true;
      this.wheel.spin();
    });

    // 新增自訂選項
    this.addOptionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.inputName.value.trim();
      const emoji = this.inputEmoji.value.trim() || '🍽️';
      if (!name) return;

      const newOpt = {
        id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name,
        emoji,
        desc: '自訂推薦美食',
        calories: '估計 500-700 kcal',
        weight: 1,
        enabled: true,
        color: WHEEL_COLORS[this.options.length % WHEEL_COLORS.length]
      };

      this.options.push(newOpt);
      this.inputName.value = '';
      this.inputEmoji.value = '';
      this.updateOptionsUI();
    });

    // 批次控制按鈕
    this.btnSelectAll.addEventListener('click', () => {
      this.options.forEach(o => o.enabled = true);
      this.updateOptionsUI();
    });

    this.btnDeselectAll.addEventListener('click', () => {
      this.options.forEach(o => o.enabled = false);
      this.updateOptionsUI();
    });

    this.btnClearAll.addEventListener('click', () => {
      this.options = [];
      this.updateOptionsUI();
    });

    // 頁籤切換
    this.tabOptionsBtn.addEventListener('click', () => {
      this.tabOptionsBtn.classList.add('active');
      this.tabHistoryBtn.classList.remove('active');
      this.tabOptions.classList.add('active');
      this.tabHistory.classList.remove('active');
    });

    this.tabHistoryBtn.addEventListener('click', () => {
      this.tabHistoryBtn.classList.add('active');
      this.tabOptionsBtn.classList.remove('active');
      this.tabHistory.classList.add('active');
      this.tabOptions.classList.remove('active');
    });

    // 清除歷史紀錄
    this.btnClearHistory.addEventListener('click', () => {
      this.history = [];
      this.saveHistory();
      this.renderHistoryList();
    });

    // Modal 控制
    this.btnCloseModal.addEventListener('click', () => this.hideModal());
    this.btnSpinAgain.addEventListener('click', () => {
      this.hideModal();
      this.btnSpin.click();
    });
  }

  handleWheelTick() {
    this.playTickSound();
    this.wheelPointer.classList.add('tick');
    setTimeout(() => {
      this.wheelPointer.classList.remove('tick');
    }, 80);
  }

  handleSpinEnd(winner) {
    this.btnSpin.disabled = false;
    this.playFanfareSound();
    this.confetti.trigger(3500);

    // 紀錄至歷史
    const historyItem = {
      id: Date.now(),
      name: winner.name,
      emoji: winner.emoji || '🍽️',
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    };
    this.history.unshift(historyItem);
    this.saveHistory();
    this.renderHistoryList();

    // 彈出獲勝卡片
    this.showModal(winner);
  }

  showModal(winner) {
    this.modalEmoji.textContent = winner.emoji || '🍱';
    this.modalWinnerName.textContent = winner.name;
    this.modalWinnerDesc.textContent = winner.desc || '美味晚餐的最佳選擇！';
    this.modalCalories.textContent = winner.calories || '熱量適中';

    // Google Maps Search Link
    const query = encodeURIComponent(`附近的 ${winner.name}`);
    this.btnGoogleMaps.href = `https://www.google.com/maps/search/${query}`;

    this.resultModal.classList.remove('hidden');
  }

  hideModal() {
    this.resultModal.classList.add('hidden');
  }

  loadHistory() {
    try {
      const data = localStorage.getItem('dinner_wheel_history');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('dinner_wheel_history', JSON.stringify(this.history.slice(0, 30)));
    } catch (e) {}
  }

  renderHistoryList() {
    this.historyCountText.textContent = this.history.length;
    this.historyList.innerHTML = '';

    if (this.history.length === 0) {
      this.historyList.innerHTML = `<div class="empty-hint" style="text-align:center; padding:1.5rem; color:var(--color-text-muted);">尚無抽獎紀錄</div>`;
      return;
    }

    this.history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <span>${item.emoji} <strong>${item.name}</strong></span>
        <span class="history-time">${item.time}</span>
      `;
      this.historyList.appendChild(div);
    });
  }
}

// 初始化 App
window.addEventListener('DOMContentLoaded', () => {
  new DinnerApp();
});
