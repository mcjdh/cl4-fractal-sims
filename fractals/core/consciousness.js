/**
 * Core Consciousness System
 * Manages the autonomous evolution of consciousness parameters
 */
export class ConsciousnessCore {
    constructor() {
        this.parameters = {
            complexity: 0.5,
            emergence: 0.3,
            coherence: 0.7,
            adaptation: 0.4
        };
        
        this.evolution = {
            time: 0,
            cycle: 0,
            phaseShift: 0,
            lastTransition: 0
        };
        
        this.attractor = {
            complexity: { frequency: 0.7, amplitude: 0.3, harmonics: [1.9, 3.1] },
            emergence: { frequency: 0.5, amplitude: 0.25, harmonics: [2.3, 4.7] },
            coherence: { frequency: 0.9, amplitude: 0.2, harmonics: [1.7, 2.9] },
            adaptation: { frequency: 1.1, amplitude: 0.2, harmonics: [0.8, 3.3] }
        };
    }
    
    /**
     * Evolve consciousness parameters using chaotic attractors
     */
    evolve() {
        this.evolution.time++;
        const t = this.evolution.time * 0.0008;
        
        // Non-linear evolution with multiple harmonics
        Object.keys(this.parameters).forEach(param => {
            const attractor = this.attractor[param];
            const base = 0.5;
            
            let value = base;
            value += Math.sin(t * attractor.frequency) * attractor.amplitude;
            
            // Add harmonic complexity
            attractor.harmonics.forEach((harmonic, i) => {
                const amplitude = attractor.amplitude * (0.1 / (i + 1));
                value += Math.sin(t * harmonic) * amplitude;
            });
            
            // Add phase shift influence
            value += Math.cos(t * attractor.frequency + this.evolution.phaseShift) * 0.05;
            
            // Clamp to valid range
            this.parameters[param] = Math.max(0.1, Math.min(0.9, value));
        });
        
        // Major phase transitions
        if (this.evolution.time - this.evolution.lastTransition > 1500) {
            this.triggerPhaseTransition();
        }
    }
    
    /**
     * Trigger a major phase transition in consciousness
     */
    triggerPhaseTransition() {
        this.evolution.phaseShift += Math.PI / 3;
        this.evolution.cycle++;
        this.evolution.lastTransition = this.evolution.time;
        
        // Slightly modify attractors for evolution
        Object.values(this.attractor).forEach(attractor => {
            attractor.frequency += (Math.random() - 0.5) * 0.1;
            attractor.amplitude += (Math.random() - 0.5) * 0.05;
            attractor.amplitude = Math.max(0.1, Math.min(0.4, attractor.amplitude));
        });
        
        return {
            type: 'phase_transition',
            cycle: this.evolution.cycle,
            parameters: { ...this.parameters }
        };
    }
    
    /**
     * Introduce novelty into the system
     */
    introduceNovelty() {
        const noveltyTypes = [];
        
        if (Math.random() < 0.3) {
            noveltyTypes.push('neural_reset');
        }
        if (Math.random() < 0.2) {
            noveltyTypes.push('ecosystem_injection');
        }
        if (Math.random() < 0.15) {
            noveltyTypes.push('cellular_mutation');
        }
        if (Math.random() < 0.1) {
            noveltyTypes.push('consciousness_surge');
        }
        
        return noveltyTypes;
    }
    
    /**
     * Get current consciousness state
     */
    getState() {
        return {
            parameters: { ...this.parameters },
            evolution: { ...this.evolution },
            entropy: this.calculateEntropy(),
            coherenceLevel: this.calculateCoherence()
        };
    }
    
    /**
     * Calculate system entropy
     */
    calculateEntropy() {
        const params = Object.values(this.parameters);
        const variance = params.reduce((sum, val, i, arr) => {
            const mean = arr.reduce((a, b) => a + b) / arr.length;
            return sum + Math.pow(val - mean, 2);
        }, 0) / params.length;
        
        return Math.sqrt(variance);
    }
    
    /**
     * Calculate overall system coherence
     */
    calculateCoherence() {
        const { complexity, emergence, coherence, adaptation } = this.parameters;
        
        // Coherence is higher when parameters are balanced
        const balance = 1 - this.calculateEntropy();
        const synergy = (complexity * emergence + coherence * adaptation) / 2;
        
        return (balance + synergy) / 2;
    }
    
    /**
     * Get evolution-based color
     */
    getEvolutionaryColor(base, timeOffset = 0, intensity = 1) {
        const t = this.evolution.time + timeOffset;
        const hue = (base * 140 + intensity * 200 + t * 0.3 + this.evolution.phaseShift * 25) % 360;
        const sat = 70 + intensity * 25 + Math.sin(t * 0.005) * 10;
        const light = 35 + Math.sin(t * 0.008 + intensity * Math.PI) * 30;
        
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }
} 