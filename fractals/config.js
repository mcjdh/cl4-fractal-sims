/**
 * Fractal Consciousness Configuration
 * Central configuration for easy parameter tuning and experimentation
 */
export const FractalConfig = {
    // Canvas settings
    canvas: {
        width: 800,
        height: 600,
        background: '#000000'
    },
    
    // Consciousness evolution parameters
    consciousness: {
        evolutionSpeed: 0.0008,        // Base evolution time scaling
        phaseTransitionInterval: 1500,  // Frames between major transitions
        harmonicComplexity: 3,         // Number of harmonic frequencies
        entropyThreshold: 0.5,         // Threshold for system reorganization
        
        // Attractor parameters for each consciousness dimension
        attractors: {
            complexity: {
                baseFrequency: 0.7,
                amplitude: 0.3,
                harmonics: [1.9, 3.1, 0.5]
            },
            emergence: {
                baseFrequency: 0.5,
                amplitude: 0.25,
                harmonics: [2.3, 4.7, 1.2]
            },
            coherence: {
                baseFrequency: 0.9,
                amplitude: 0.2,
                harmonics: [1.7, 2.9, 0.8]
            },
            adaptation: {
                baseFrequency: 1.1,
                amplitude: 0.2,
                harmonics: [0.8, 3.3, 1.5]
            }
        }
    },
    
    // Neural network simulation settings
    neuralNetwork: {
        nodeCount: 150,               // Initial number of nodes
        maxConnections: 8,            // Maximum connections per node
        connectionRange: 200,         // Maximum visual connection distance
        learningRate: 0.01,           // Base Hebbian learning rate
        pruningRate: 0.001,           // Connection pruning probability
        growthRate: 0.005,            // New connection growth rate
        
        // Node behavior
        movementThreshold: 0.7,       // Activation level needed for movement
        maxNodes: 225,                // Maximum nodes (1.5x initial)
        minNodes: 75,                 // Minimum nodes (0.5x initial)
        
        // Learning parameters
        hebbianThreshold: 0.7,        // Co-activation threshold for strengthening
        weakenThreshold: 0.2,         // Threshold for connection weakening
        pruneThreshold: 0.15,         // Strength below which connections are pruned
        memoryLength: 50,             // Activation history length
        learningMemoryLength: 20,     // Learning events memory length
        
        // Plasticity ranges
        minPlasticity: 0.001,
        maxPlasticity: 0.05,
        plasticityEvolution: 0.02     // Plasticity change rate
    },
    
    // Rendering configuration
    rendering: {
        // Performance settings
        targetFPS: 60,
        adaptiveQuality: true,        // Reduce quality if FPS drops
        performanceThreshold: 45,     // FPS below which to reduce quality
        
        // Visual effects
        glowIntensity: 15,            // Maximum glow blur radius
        trailLength: 8,               // Motion trail length multiplier
        pulseAmplitude: 0.3,          // Node pulsing effect strength
        colorSaturation: 70,          // Base color saturation
        colorLightness: 35,           // Base color lightness
        
        // Connection rendering
        connectionAlphaThreshold: 0.05, // Minimum alpha for drawing connections
        maxConnectionWidth: 3,        // Maximum connection line width
        connectionCulling: true,      // Enable distance-based connection culling
        
        // Blend modes for combined rendering
        blendModes: {
            neural: { mode: 'screen', alpha: 0.4 },
            cellular: { mode: 'screen', alpha: 0.3 },
            ecosystem: { mode: 'screen', alpha: 0.35 },
            consciousness: { mode: 'screen', alpha: 0.5 }
        }
    },
    
    // UI and interaction settings
    ui: {
        evolutionBarAnimationSpeed: 0.3, // CSS transition speed
        keyboardShortcuts: true,         // Enable keyboard controls
        performanceDisplay: false,       // Show performance info by default
        debugMode: false,                // Enable debug features
        
        // Mode descriptions
        modeDescriptions: {
            all: "Multiple fractal consciousness patterns evolving autonomously, showing emergent behavior and self-organization without external control.",
            neural: "Self-organizing neural networks that adapt and evolve their connections based on internal dynamics and feedback loops.",
            cellular: "Digital life forms emerging from simple rules, creating complex patterns through local interactions and evolutionary pressure.",
            ecosystem: "An autonomous ecosystem of digital entities that interact, compete, cooperate, and evolve in real-time.",
            consciousness: "A flowing stream of thought patterns, memories, and associations forming and dissolving in continuous transformation."
        }
    },
    
    // Experimental features
    experimental: {
        quantumEffects: false,        // Quantum-inspired randomness
        memoryPersistence: false,     // Save/load consciousness states
        soundVisualization: false,    // Web Audio API integration
        webglAcceleration: false,     // WebGL rendering (future)
        networkTopologyAnalysis: true, // Real-time network analysis
        
        // Advanced consciousness features
        metacognition: false,         // Self-awareness simulation
        emotionalStates: false,       // Emotional color mapping
        attentionMechanisms: false,   // Focus-based rendering
        dreamStates: false            // Reduced activity periods
    },
    
    // Debug and development settings
    debug: {
        logLevel: 'info',             // 'debug', 'info', 'warn', 'error'
        showMetrics: false,           // Display real-time metrics
        exportStates: true,           // Enable state export functionality
        performanceProfile: false,   // Detailed performance profiling
        networkAnalysis: false,       // Log network topology changes
        
        // Console commands
        enableConsoleCommands: true,
        monitoringInterval: 100       // Milliseconds for debug monitoring
    }
};

// Utility function to deep merge configuration overrides
export function mergeConfig(overrides) {
    return deepMerge(FractalConfig, overrides);
}

function deepMerge(target, source) {
    const result = { ...target };
    
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    
    return result;
}

// Preset configurations for different experiences
export const Presets = {
    // Calm, meditative experience
    meditation: {
        consciousness: {
            evolutionSpeed: 0.0004,
            phaseTransitionInterval: 3000
        },
        neuralNetwork: {
            nodeCount: 100,
            learningRate: 0.005
        },
        rendering: {
            glowIntensity: 8,
            colorSaturation: 40
        }
    },
    
    // High-energy, chaotic experience
    chaos: {
        consciousness: {
            evolutionSpeed: 0.002,
            phaseTransitionInterval: 800
        },
        neuralNetwork: {
            nodeCount: 200,
            learningRate: 0.02,
            growthRate: 0.01
        },
        rendering: {
            glowIntensity: 25,
            colorSaturation: 90
        }
    },
    
    // Minimal, focused experience
    minimal: {
        neuralNetwork: {
            nodeCount: 75,
            maxConnections: 4
        },
        rendering: {
            glowIntensity: 5,
            colorSaturation: 30,
            connectionAlphaThreshold: 0.1
        }
    },
    
    // Performance-optimized for slower devices
    performance: {
        neuralNetwork: {
            nodeCount: 100,
            connectionRange: 150
        },
        rendering: {
            adaptiveQuality: true,
            performanceThreshold: 40,
            connectionCulling: true
        }
    }
}; 