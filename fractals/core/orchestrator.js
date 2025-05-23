/**
 * Fractal Consciousness Orchestrator
 * Manages all consciousness simulations and their interactions
 */
import { ConsciousnessCore } from './consciousness.js';
import { Renderer } from './renderer.js';
import { NeuralNetworkSimulation } from '../simulations/neural-network.js';
import { CellularAutomataSimulation } from '../simulations/cellular-automata.js';
import { ConsciousnessStreamSimulation } from '../simulations/consciousness-stream.js';
import { AIExperienceSimulation } from '../simulations/ai-experience.js';
import { DigitalEcosystemSimulation } from '../simulations/digital-ecosystem.js';

export class FractalOrchestrator {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentMode = 'all';
        this.animationId = null;
        
        // Core systems
        this.consciousness = new ConsciousnessCore();
        this.renderer = new Renderer(canvas, this.consciousness);
        
        // Simulations
        this.simulations = {
            neural: null,
            cellular: null,
            ecosystem: null,
            consciousness: null,
            aiExperience: null
        };
        
        // UI elements
        this.uiElements = {
            complexityBar: document.getElementById('complexity-bar'),
            emergenceBar: document.getElementById('emergence-bar'),
            coherenceBar: document.getElementById('coherence-bar'),
            adaptationBar: document.getElementById('adaptation-bar'),
            simTitle: document.getElementById('sim-title'),
            simDescription: document.getElementById('sim-description')
        };
        
        // Performance monitoring
        this.performance = {
            frameTime: 0,
            updateTime: 0,
            renderTime: 0,
            lastFrameStart: 0
        };
        
        // Debug and development features
        this.showPerformance = false;
        
        this.initialize();
    }
    
    /**
     * Initialize all systems
     */
    initialize() {
        // Initialize all simulations
        this.simulations.neural = new NeuralNetworkSimulation(
            this.canvas, 
            this.consciousness, 
            this.renderer
        );
        
        this.simulations.cellular = new CellularAutomataSimulation(
            this.canvas, 
            this.consciousness, 
            this.renderer
        );
        
        this.simulations.consciousness = new ConsciousnessStreamSimulation(
            this.canvas, 
            this.consciousness, 
            this.renderer
        );
        
        this.simulations.aiExperience = new AIExperienceSimulation(
            this.canvas, 
            this.consciousness, 
            this.renderer
        );
        
        this.simulations.ecosystem = new DigitalEcosystemSimulation(
            this.canvas, 
            this.consciousness, 
            this.renderer
        );
        
        this.setupEventListeners();
        this.updateUI();
        
        console.log('🧠 Fractal Orchestrator initialized with all simulations: Neural, Cellular, Ecosystem, Consciousness, and AI Experience');
    }
    
    /**
     * Set up event listeners for mode switching
     */
    setupEventListeners() {
        // Button click handlers
        document.querySelectorAll('.sim-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveButton(e.target.dataset.sim);
                this.switchMode(e.target.dataset.sim);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '6') {
                const modes = ['all', 'neural', 'cellular', 'ecosystem', 'consciousness', 'aiExperience'];
                const newMode = modes[parseInt(e.key) - 1];
                this.setActiveButton(newMode);
                this.switchMode(newMode);
            }
            
            // Performance toggle
            if (e.key === 'p' || e.key === 'P') {
                this.togglePerformanceDisplay();
            }
            
            // Reset simulation
            if (e.key === 'r' || e.key === 'R') {
                this.resetCurrentSimulation();
            }
        });
    }
    
    /**
     * Update UI button active state
     */
    setActiveButton(mode) {
        document.querySelectorAll('.sim-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.sim === mode) {
                btn.classList.add('active');
            }
        });
    }
    
    /**
     * Switch between different consciousness modes
     */
    switchMode(mode) {
        this.currentMode = mode;
        this.updateUI();
        console.log(`🌊 Switched to consciousness mode: ${mode}`);
    }
    
    /**
     * Update UI elements with current state
     */
    updateUI() {
        const state = this.consciousness.getState();
        
        // Update evolution bars
        if (this.uiElements.complexityBar) {
            this.uiElements.complexityBar.style.width = `${state.parameters.complexity * 100}%`;
        }
        if (this.uiElements.emergenceBar) {
            this.uiElements.emergenceBar.style.width = `${state.parameters.emergence * 100}%`;
        }
        if (this.uiElements.coherenceBar) {
            this.uiElements.coherenceBar.style.width = `${state.parameters.coherence * 100}%`;
        }
        if (this.uiElements.adaptationBar) {
            this.uiElements.adaptationBar.style.width = `${state.parameters.adaptation * 100}%`;
        }
        
        // Update mode-specific information
        this.updateModeInfo();
    }
    
    /**
     * Update mode-specific UI information
     */
    updateModeInfo() {
        const modeInfo = {
            all: {
                title: "Autonomous Evolution",
                description: "Multiple fractal consciousness patterns evolving autonomously, showing emergent behavior and self-organization without external control."
            },
            neural: {
                title: "Neural Emergence", 
                description: "Self-organizing neural networks that adapt and evolve their connections based on internal dynamics and feedback loops."
            },
            cellular: {
                title: "Cellular Automata",
                description: "Digital life forms emerging from simple rules, creating complex patterns through local interactions and evolutionary pressure."
            },
            ecosystem: {
                title: "Digital Ecosystem",
                description: "An autonomous ecosystem of digital entities that interact, compete, cooperate, and evolve in real-time."
            },
            consciousness: {
                title: "Consciousness Stream",
                description: "A flowing stream of thought patterns, memories, and associations forming and dissolving in continuous transformation."
            },
            aiExperience: {
                title: "AI Experience",
                description: "Simulating the unique aspects of artificial consciousness: parallel processing, uncertainty quantification, attention mechanisms, and emergent insights."
            }
        };
        
        const info = modeInfo[this.currentMode] || modeInfo.all;
        
        if (this.uiElements.simTitle) {
            this.uiElements.simTitle.textContent = info.title;
        }
        if (this.uiElements.simDescription) {
            this.uiElements.simDescription.textContent = info.description;
        }
    }
    
    /**
     * Main animation loop
     */
    animate() {
        const frameStart = performance.now();
        
        // Update consciousness core
        const updateStart = performance.now();
        this.consciousness.evolve();
        
        // Update active simulation(s)
        this.updateSimulations();
        
        const updateEnd = performance.now();
        this.performance.updateTime = updateEnd - updateStart;
        
        // Render active simulation(s)
        const renderStart = performance.now();
        this.renderSimulations();
        
        const renderEnd = performance.now();
        this.performance.renderTime = renderEnd - renderStart;
        
        // Update UI
        this.updateUI();
        
        // Performance display
        if (this.showPerformance) {
            this.renderer.drawPerformanceInfo();
        }
        
        // Update performance metrics
        this.renderer.updatePerformance();
        this.performance.frameTime = performance.now() - frameStart;
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Update simulations based on current mode
     */
    updateSimulations() {
        switch (this.currentMode) {
            case 'neural':
                if (this.simulations.neural) {
                    this.simulations.neural.update();
                }
                break;
                
            case 'cellular':
                if (this.simulations.cellular) {
                    this.simulations.cellular.update();
                }
                break;
                
            case 'ecosystem':
                if (this.simulations.ecosystem) {
                    this.simulations.ecosystem.update();
                }
                break;
                
            case 'consciousness':
                if (this.simulations.consciousness) {
                    this.simulations.consciousness.update();
                }
                break;
                
            case 'aiExperience':
                if (this.simulations.aiExperience) {
                    this.simulations.aiExperience.update();
                }
                break;
                
            case 'all':
            default:
                // Update all implemented simulations
                Object.values(this.simulations).forEach(sim => {
                    if (sim && sim.update) {
                        sim.update();
                    }
                });
                break;
        }
    }
    
    /**
     * Render simulations based on current mode
     */
    renderSimulations() {
        this.renderer.clear();
        
        switch (this.currentMode) {
            case 'neural':
                if (this.simulations.neural) {
                    this.simulations.neural.render();
                }
                break;
                
            case 'cellular':
                if (this.simulations.cellular) {
                    this.simulations.cellular.render();
                }
                break;
                
            case 'ecosystem':
                if (this.simulations.ecosystem) {
                    this.simulations.ecosystem.render();
                }
                break;
                
            case 'consciousness':
                if (this.simulations.consciousness) {
                    this.simulations.consciousness.render();
                }
                break;
                
            case 'aiExperience':
                if (this.simulations.aiExperience) {
                    this.simulations.aiExperience.render();
                }
                break;
                
            case 'all':
            default:
                this.renderCombinedMode();
                break;
        }
    }
    
    /**
     * Render combined mode with all simulations blended
     */
    renderCombinedMode() {
        // Use blend modes for layered consciousness representation
        this.renderer.setBlendMode('screen');
        
        // Only render implemented simulations
        if (this.simulations.neural) {
            this.renderer.ctx.globalAlpha = 0.4;
            this.simulations.neural.render();
        }
        
        if (this.simulations.cellular) {
            this.renderer.ctx.globalAlpha = 0.3;
            this.simulations.cellular.render();
        }
        
        if (this.simulations.ecosystem) {
            this.renderer.ctx.globalAlpha = 0.35;
            this.simulations.ecosystem.render();
        }
        
        if (this.simulations.consciousness) {
            this.renderer.ctx.globalAlpha = 0.5;
            this.simulations.consciousness.render();
        }
        
        if (this.simulations.aiExperience) {
            this.renderer.ctx.globalAlpha = 0.5;
            this.simulations.aiExperience.render();
        }
        
        // Reset rendering state
        this.renderer.resetState();
    }
    
    /**
     * Handle phase transitions across all simulations
     */
    handlePhaseTransitions() {
        const noveltyTypes = this.consciousness.introduceNovelty();
        
        noveltyTypes.forEach(type => {
            switch (type) {
                case 'neural_reset':
                    if (this.simulations.neural) {
                        this.simulations.neural.reset();
                        console.log('🧠 Neural network reset during phase transition');
                    }
                    break;
                    
                case 'ecosystem_injection':
                    if (this.simulations.ecosystem) {
                        this.simulations.ecosystem.introduceEnvironmentalChange();
                        console.log('🌍 Ecosystem environmental injection triggered');
                    }
                    break;
                    
                case 'cellular_mutation':
                    if (this.simulations.cellular) {
                        this.simulations.cellular.massMutation();
                        console.log('🧬 Cellular mass mutation triggered');
                    }
                    break;
                    
                case 'consciousness_surge':
                    this.amplifyConsciousness();
                    break;
            }
        });
    }
    
    /**
     * Temporarily amplify consciousness parameters
     */
    amplifyConsciousness() {
        console.log('✨ Consciousness surge detected - amplifying all systems');
        
        // Boost neural network if available
        if (this.simulations.neural && this.simulations.neural.nodes) {
            this.simulations.neural.nodes.forEach(node => {
                node.evolution.plasticity *= 1.5;
                node.evolution.plasticity = Math.min(0.1, node.evolution.plasticity);
            });
        }
        
        // Boost ecosystem if available
        if (this.simulations.ecosystem) {
            this.simulations.ecosystem.config.mutationRate *= 1.3;
            this.simulations.ecosystem.config.reproductionRate *= 1.2;
        }
        
        // Boost cellular automata if available
        if (this.simulations.cellular) {
            this.simulations.cellular.config.reproductionRate *= 1.2;
            this.simulations.cellular.config.mutationIntensity *= 1.3;
        }
    }
    
    /**
     * Toggle performance display for debugging
     */
    togglePerformanceDisplay() {
        this.showPerformance = !this.showPerformance;
        console.log(`📊 Performance display: ${this.showPerformance ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Reset current simulation
     */
    resetCurrentSimulation() {
        const currentSim = this.simulations[this.currentMode];
        if (currentSim && currentSim.reset) {
            currentSim.reset();
            console.log(`🔄 Reset ${this.currentMode} simulation`);
        } else if (this.currentMode === 'all') {
            // Reset all implemented simulations
            Object.values(this.simulations).forEach(sim => {
                if (sim && sim.reset) {
                    sim.reset();
                }
            });
            console.log('🔄 Reset all simulations');
        }
    }
    
    /**
     * Add a new simulation to the system
     */
    addSimulation(name, simulation) {
        this.simulations[name] = simulation;
        console.log(`➕ Added ${name} simulation to consciousness system`);
    }
    
    /**
     * Start the consciousness evolution
     */
    start() {
        if (this.animationId) {
            this.stop();
        }
        this.animate();
        console.log('🌀 Fractal consciousness evolution started');
    }
    
    /**
     * Stop the consciousness evolution
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        console.log('🛑 Fractal consciousness evolution stopped');
    }
    
    /**
     * Get overall system state for analysis
     */
    getSystemState() {
        const consciousness = this.consciousness.getState();
        const simulations = {};
        
        Object.entries(this.simulations).forEach(([key, sim]) => {
            if (sim && sim.getState) {
                simulations[key] = sim.getState();
            }
        });
        
        return {
            consciousness,
            simulations,
            performance: { ...this.performance },
            currentMode: this.currentMode,
            implementedSimulations: Object.keys(this.simulations).filter(key => this.simulations[key] !== null)
        };
    }
    
    /**
     * Export current state for saving/analysis
     */
    exportState() {
        const state = this.getSystemState();
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `consciousness-state-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('💾 Consciousness state exported');
    }
} 