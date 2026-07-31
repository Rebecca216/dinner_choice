// Canvas 物理旋轉轉盤組件

export class DinnerWheel {
  constructor(canvasElement, options = [], onSpinEnd = null, onTick = null) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.options = options; // Array of option objects { id, name, emoji, weight, enabled, color }
    this.onSpinEnd = onSpinEnd;
    this.onTick = onTick;

    this.currentAngle = 0; // Current rotation angle in radians (0 = 12 o'clock)
    this.isSpinning = false;
    this.animationFrameId = null;

    // Pointer angle: Top position (12 o'clock, which is -Math.PI/2 or 270 deg in canvas standard 0deg at 3 o'clock)
    this.pointerAngle = -Math.PI / 2;

    this.lastTickSegment = -1;

    this.initCanvasSize();
    window.addEventListener('resize', () => this.initCanvasSize());
  }

  initCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size
    const displayWidth = rect.width || 400;
    const displayHeight = rect.height || 400;

    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;

    this.ctx.scale(dpr, dpr);
    this.width = displayWidth;
    this.height = displayHeight;
    this.centerX = displayWidth / 2;
    this.centerY = displayHeight / 2;
    this.radius = Math.min(this.centerX, this.centerY) - 15;

    this.draw();
  }

  setOptions(newOptions) {
    this.options = newOptions;
    this.draw();
  }

  getEnabledOptions() {
    return this.options.filter(opt => opt.enabled !== false);
  }

  /**
   * 繪製完整轉盤
   */
  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const activeOptions = this.getEnabledOptions();

    if (activeOptions.length === 0) {
      this.drawEmptyState();
      return;
    }

    const totalWeight = activeOptions.reduce((sum, opt) => sum + (Number(opt.weight) || 1), 0);
    let startAngle = this.currentAngle;

    // 1. 繪製外框光暈與陰影底座
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius + 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.shadowColor = 'rgba(124, 77, 255, 0.5)';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // 2. 繪製各個扇形區塊
    activeOptions.forEach((opt, index) => {
      const weight = Number(opt.weight) || 1;
      const sliceAngle = (weight / totalWeight) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;

      // 扇形主體
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
      ctx.closePath();

      // 漸層填色
      const midAngle = startAngle + sliceAngle / 2;
      const fillGradient = ctx.createRadialGradient(
        this.centerX, this.centerY, 10,
        this.centerX, this.centerY, this.radius
      );
      fillGradient.addColorStop(0, '#ffffff22');
      fillGradient.addColorStop(0.5, opt.color || '#7c4dff');
      fillGradient.addColorStop(1, this.adjustColorBrightness(opt.color || '#7c4dff', -30));

      ctx.fillStyle = fillGradient;
      ctx.fill();

      // 邊框切線
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // 3. 繪製扇形內文字與 Emoji
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      ctx.rotate(midAngle);

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Emoji
      const textRadius = this.radius * 0.72;
      if (opt.emoji) {
        ctx.font = '22px sans-serif';
        ctx.fillText(opt.emoji, textRadius + 22, 0);
      }

      // 文字
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px "Noto Sans TC", sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 4;
      
      const displayName = opt.name.length > 7 ? opt.name.substring(0, 6) + '…' : opt.name;
      ctx.fillText(displayName, textRadius, 0);

      ctx.restore();

      startAngle = endAngle;
    });

    // 4. 繪製中心金屬圓心蓋
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, 32, 0, Math.PI * 2);
    const centerGrad = ctx.createLinearGradient(
      this.centerX - 30, this.centerY - 30,
      this.centerX + 30, this.centerY + 30
    );
    centerGrad.addColorStop(0, '#ffffff');
    centerGrad.addColorStop(0.5, '#7c4dff');
    centerGrad.addColorStop(1, '#1a1829');
    ctx.fillStyle = centerGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 圓心 Logo 圖示
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', this.centerX, this.centerY);
    ctx.restore();

    // 5. 外圍裝飾小霓虹燈點
    this.drawOuterPegs();
  }

  drawOuterPegs() {
    const ctx = this.ctx;
    const pegCount = 24;
    for (let i = 0; i < pegCount; i++) {
      const angle = (i / pegCount) * Math.PI * 2;
      const x = this.centerX + Math.cos(angle) * (this.radius + 3);
      const y = this.centerY + Math.sin(angle) * (this.radius + 3);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#FFD700' : '#FFFFFF';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }
  }

  drawEmptyState() {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    ctx.fillStyle = '#8e8a9f';
    ctx.font = '16px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('請新增或啟用至少一個選項', this.centerX, this.centerY);
    ctx.restore();
  }

  /**
   * 觸發物理旋轉
   */
  spin() {
    if (this.isSpinning) return;

    const activeOptions = this.getEnabledOptions();
    if (activeOptions.length === 0) return;

    this.isSpinning = true;

    // 計算加權隨機獲勝者
    const totalWeight = activeOptions.reduce((sum, opt) => sum + (Number(opt.weight) || 1), 0);
    let randomVal = Math.random() * totalWeight;
    let winningIndex = 0;
    let accumulatedWeight = 0;

    for (let i = 0; i < activeOptions.length; i++) {
      accumulatedWeight += Number(activeOptions[i].weight) || 1;
      if (randomVal <= accumulatedWeight) {
        winningIndex = i;
        break;
      }
    }

    // 計算獲勝區域對應的目標角度
    // 轉盤繪製時從 startAngle (currentAngle) 開始順時針畫扇形
    // 當轉盤旋轉了 AngleRad，頂部指針 (12 o'clock, angle -PI/2) 指向的位置為：
    // Angle_on_wheel = (-PI/2 - finalRotation) mod 2PI
    let startWeightRatio = 0;
    for (let i = 0; i < winningIndex; i++) {
      startWeightRatio += (Number(activeOptions[i].weight) || 1) / totalWeight;
    }
    const winnerWeightRatio = (Number(activeOptions[winningIndex].weight) || 1) / totalWeight;

    // Winner arc range relative to wheel origin: [startWeightRatio * 2PI, (startWeightRatio + winnerWeightRatio) * 2PI]
    // Random landing angle within winner slice (leaving 10% safety margin from edges)
    const margin = winnerWeightRatio * 0.1;
    const targetSliceOffset = (startWeightRatio + margin + Math.random() * (winnerWeightRatio - 2 * margin)) * Math.PI * 2;

    // We want: (pointerAngle - finalAngle) mod 2PI = targetSliceOffset
    // Pointer is at 12 o'clock = -Math.PI / 2
    // finalAngle mod 2PI = -Math.PI / 2 - targetSliceOffset
    const targetModAngle = (-Math.PI / 2 - targetSliceOffset) % (Math.PI * 2);

    // Number of full rotations (e.g. 5 ~ 8 full turns)
    const extraTurns = 5 + Math.floor(Math.random() * 3);
    const startAngle = this.currentAngle;
    
    // Calculate final target angle > startAngle
    let deltaAngle = targetModAngle - (startAngle % (Math.PI * 2));
    if (deltaAngle <= 0) {
      deltaAngle += Math.PI * 2;
    }
    const finalAngle = startAngle + deltaAngle + extraTurns * Math.PI * 2;

    const duration = 4500; // Spin duration in ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out cubic / quart
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      this.currentAngle = startAngle + (finalAngle - startAngle) * easeProgress;
      this.draw();

      // Check pointer segment tick
      this.checkSegmentTick(activeOptions, totalWeight);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.currentAngle = finalAngle;
        this.draw();
        this.isSpinning = false;
        if (this.onSpinEnd) {
          this.onSpinEnd(activeOptions[winningIndex]);
        }
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  checkSegmentTick(activeOptions, totalWeight) {
    if (activeOptions.length === 0) return;

    // Calculate current pointer slice
    const normAngle = ((-Math.PI / 2 - this.currentAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    let currentWeightAcc = 0;
    let currentSegment = 0;

    for (let i = 0; i < activeOptions.length; i++) {
      currentWeightAcc += ((Number(activeOptions[i].weight) || 1) / totalWeight) * Math.PI * 2;
      if (normAngle <= currentWeightAcc) {
        currentSegment = i;
        break;
      }
    }

    if (currentSegment !== this.lastTickSegment) {
      this.lastTickSegment = currentSegment;
      if (this.onTick) this.onTick();
    }
  }

  adjustColorBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }
}
