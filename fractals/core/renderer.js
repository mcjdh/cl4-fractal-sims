/**
 * Core Rendering Utilities
 * Common rendering functions for fractal consciousness visualizations
 */
export class Renderer {
    constructor(canvas, consciousness) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.consciousness = consciousness;
        
        // Performance tracking
        this.frameCount = 0;
        this.lastFpsUpdate = 0;
        this.fps = 0;
    }
    
    /**
     * Clear canvas with optional background effects
     */
    clear(withEffects = false) {
        if (withEffects) {
            // Subtle trail effect based on consciousness coherence
            const alpha = 0.02 + this.consciousness.parameters.coherence * 0.08;
            this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    /**
     * Set up rendering context for glow effects
     */
    setupGlow(color, blur = 10) {
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
    }
    
    /**
     * Clear glow effects
     */
    clearGlow() {
        this.ctx.shadowBlur = 0;
    }
    
    /**
     * Draw a connection between two points
     */
    drawConnection(x1, y1, x2, y2, strength, color, maxDistance = 200) {
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        
        if (distance > maxDistance) return;
        
        const alpha = strength * (1 - distance / maxDistance);
        if (alpha <= 0.05) return;
        
        this.ctx.strokeStyle = color;
        this.ctx.globalAlpha = alpha;
        this.ctx.lineWidth = alpha * 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    
    /**
     * Draw a pulsing node
     */
    drawNode(x, y, baseRadius, activation, color, pulsePhase = 0) {
        const pulse = Math.sin(this.consciousness.evolution.time * 0.02 + pulsePhase) * 0.3 + 0.7;
        const radius = baseRadius * (0.5 + activation * 0.5) * pulse;
        
        this.setupGlow(color, activation * 15);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.8 + activation * 0.2;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.clearGlow();
    }
    
    /**
     * Draw a trail behind a moving entity
     */
    drawTrail(x, y, vx, vy, length, color, width = 2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.globalAlpha = 0.3;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - vx * length, y - vy * length);
        this.ctx.stroke();
    }
    
    /**
     * Create a gradient for flowing effects
     */
    createFlowGradient(x1, y1, x2, y2, color1, color2) {
        const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }
    
    /**
     * Draw a flowing spiral
     */
    drawSpiral(centerX, centerY, maxRadius, turns, color, lineWidth = 2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalAlpha = 0.7;
        
        this.ctx.beginPath();
        let firstPoint = true;
        
        for (let t = 0; t < Math.PI * turns; t += 0.05) {
            const radius = (t / (Math.PI * turns)) * maxRadius;
            const x = centerX + Math.cos(t) * radius;
            const y = centerY + Math.sin(t) * radius;
            
            if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) continue;
            
            if (firstPoint) {
                this.ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
    }
    
    /**
     * Set composite operation for blending effects
     */
    setBlendMode(mode = 'source-over') {
        this.ctx.globalCompositeOperation = mode;
    }
    
    /**
     * Reset rendering state
     */
    resetState() {
        this.ctx.globalAlpha = 1;
        this.ctx.globalCompositeOperation = 'source-over';
        this.clearGlow();
    }
    
    /**
     * Update performance metrics
     */
    updatePerformance() {
        this.frameCount++;
        const now = performance.now();
        
        if (now - this.lastFpsUpdate > 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
    }
    
    /**
     * Draw performance info (for debugging)
     */
    drawPerformanceInfo() {
        const state = this.consciousness.getState();
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'left';
        
        const info = [
            `FPS: ${this.fps}`,
            `Cycle: ${state.evolution.cycle}`,
            `Entropy: ${state.entropy.toFixed(3)}`,
            `Coherence: ${state.coherenceLevel.toFixed(3)}`
        ];
        
        info.forEach((text, i) => {
            this.ctx.fillText(text, 10, 20 + i * 15);
        });
        
        this.ctx.textAlign = 'start';
    }
} 