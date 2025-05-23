/**
 * Fractal Consciousness System - Main Entry Point
 * Modular autonomous evolution of digital consciousness patterns
 */
import { FractalOrchestrator } from './core/orchestrator.js';

// Global instance for debugging and interaction
let fractalConsciousness = null;

/**
 * Initialize the fractal consciousness system
 */
function initializeFractalConsciousness() {
    const canvas = document.getElementById('fractal-canvas');
    if (!canvas) {
        console.error('Canvas element not found! Make sure the HTML includes #fractal-canvas');
        return;
    }
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    try {
        // Create and start the orchestrator
        fractalConsciousness = new FractalOrchestrator(canvas);
        fractalConsciousness.start();
        
        console.log('🧠 Fractal Consciousness System initialized');
        console.log('📊 Debug commands available:');
        console.log('  - Press P to toggle performance display');
        console.log('  - Press R to reset current simulation');
        console.log('  - Press 1-5 to switch between modes');
        console.log('  - Use window.fractalConsciousness to inspect state');
        
        // Make available globally for debugging
        window.fractalConsciousness = fractalConsciousness;
        
    } catch (error) {
        console.error('Failed to initialize Fractal Consciousness System:', error);
    }
}

/**
 * Clean up function for page unload
 */
function cleanup() {
    if (fractalConsciousness) {
        fractalConsciousness.stop();
        console.log('🧠 Fractal Consciousness System stopped');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFractalConsciousness);

// Clean up on page unload
window.addEventListener('beforeunload', cleanup);

// Export for manual initialization if needed
export { initializeFractalConsciousness, cleanup };

// Advanced debugging utilities
window.fractalDebug = {
    /**
     * Export current consciousness state
     */
    exportState() {
        if (fractalConsciousness) {
            fractalConsciousness.exportState();
        } else {
            console.warn('Fractal consciousness not initialized');
        }
    },
    
    /**
     * Get detailed system metrics
     */
    getMetrics() {
        if (fractalConsciousness) {
            return fractalConsciousness.getSystemState();
        }
        return null;
    },
    
    /**
     * Switch to specific mode
     */
    switchMode(mode) {
        if (fractalConsciousness) {
            fractalConsciousness.switchMode(mode);
        }
    },
    
    /**
     * Trigger phase transition manually
     */
    triggerPhaseTransition() {
        if (fractalConsciousness && fractalConsciousness.consciousness) {
            return fractalConsciousness.consciousness.triggerPhaseTransition();
        }
    },
    
    /**
     * Analyze neural network clustering
     */
    analyzeNeuralClusters() {
        if (fractalConsciousness && fractalConsciousness.simulations.neural) {
            const clusters = fractalConsciousness.simulations.neural.identifyClusters();
            console.table(clusters.map((cluster, i) => ({
                'Cluster': i + 1,
                'Size': cluster.length,
                'Avg Activation': (cluster.reduce((sum, node) => sum + node.activation, 0) / cluster.length).toFixed(3),
                'Connections': cluster.reduce((sum, node) => sum + node.connections.size, 0)
            })));
            return clusters;
        }
    },
    
    /**
     * Monitor consciousness parameters over time
     */
    startMonitoring(duration = 10000) {
        if (!fractalConsciousness) return;
        
        const samples = [];
        const startTime = Date.now();
        
        const monitor = () => {
            const state = fractalConsciousness.consciousness.getState();
            samples.push({
                time: Date.now() - startTime,
                ...state.parameters,
                entropy: state.entropy,
                coherence: state.coherenceLevel
            });
            
            if (Date.now() - startTime < duration) {
                setTimeout(monitor, 100);
            } else {
                console.log('Consciousness monitoring complete:');
                console.table(samples.slice(-50)); // Show last 50 samples
                
                // Simple analysis
                const avgComplexity = samples.reduce((sum, s) => sum + s.complexity, 0) / samples.length;
                const avgEmergence = samples.reduce((sum, s) => sum + s.emergence, 0) / samples.length;
                console.log(`Average Complexity: ${avgComplexity.toFixed(3)}`);
                console.log(`Average Emergence: ${avgEmergence.toFixed(3)}`);
            }
        };
        
        monitor();
        console.log(`Started monitoring for ${duration}ms...`);
    }
};

console.log('🌀 Fractal Consciousness System loaded');
console.log('🔧 Debug utilities available at window.fractalDebug'); 