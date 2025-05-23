/**
 * Neural Network Simulation
 * Self-evolving neural networks with autonomous learning and adaptation
 */
import { NeuralNode } from '../entities/neural-node.js';

export class NeuralNetworkSimulation {
    constructor(canvas, consciousness, renderer) {
        this.canvas = canvas;
        this.consciousness = consciousness;
        this.renderer = renderer;
        
        this.nodes = new Map();
        this.networks = [];
        this.config = {
            nodeCount: 150,
            maxConnections: 8,
            learningRate: 0.01,
            pruningRate: 0.001,
            growthRate: 0.005
        };
        
        this.metrics = {
            totalConnections: 0,
            averageActivation: 0,
            networkClusters: 0,
            learningEvents: 0
        };
        
        this.initialize();
    }
    
    /**
     * Initialize the neural network
     */
    initialize() {
        this.nodes.clear();
        this.networks = [];
        
        // Create initial nodes
        for (let i = 0; i < this.config.nodeCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const node = new NeuralNode(x, y, i);
            this.nodes.set(i, node);
        }
        
        // Create initial connections
        this.nodes.forEach((node, nodeId) => {
            const connectionCount = Math.floor(Math.random() * this.config.maxConnections) + 2;
            for (let j = 0; j < connectionCount; j++) {
                const targetId = Math.floor(Math.random() * this.config.nodeCount);
                if (targetId !== nodeId) {
                    node.addConnection(targetId);
                }
            }
        });
        
        this.updateMetrics();
    }
    
    /**
     * Update the neural network simulation
     */
    update() {
        const time = this.consciousness.evolution.time;
        
        // Update all nodes
        this.nodes.forEach(node => {
            node.updateActivation(this.nodes, time);
            node.updatePosition(this.canvas.width, this.canvas.height, this.consciousness);
        });
        
        // Apply learning
        this.applyLearning();
        
        // Network growth and pruning
        this.evolveNetwork();
        
        // Update metrics
        this.updateMetrics();
        
        // Inject novelty during phase transitions
        this.handlePhaseTransitions();
    }
    
    /**
     * Apply Hebbian learning across all nodes
     */
    applyLearning() {
        let learningEvents = 0;
        
        this.nodes.forEach(node => {
            const beforeEvents = node.memory.learningEvents.length;
            node.applyHebbianLearning(this.nodes);
            const afterEvents = node.memory.learningEvents.length;
            learningEvents += Math.max(0, afterEvents - beforeEvents);
        });
        
        this.metrics.learningEvents = learningEvents;
        
        // Global learning modulation based on consciousness
        if (this.consciousness.parameters.adaptation > 0.8) {
            this.enhanceLearning();
        } else if (this.consciousness.parameters.coherence < 0.3) {
            this.stabilizeNetwork();
        }
    }
    
    /**
     * Enhance learning during high adaptation phases
     */
    enhanceLearning() {
        this.nodes.forEach(node => {
            node.evolution.plasticity *= 1.02;
            node.evolution.plasticity = Math.min(0.05, node.evolution.plasticity);
        });
    }
    
    /**
     * Stabilize network during low coherence phases
     */
    stabilizeNetwork() {
        this.nodes.forEach(node => {
            node.evolution.plasticity *= 0.98;
            node.evolution.plasticity = Math.max(0.001, node.evolution.plasticity);
        });
    }
    
    /**
     * Evolve network structure through growth and pruning
     */
    evolveNetwork() {
        // Growth: add new connections
        if (Math.random() < this.config.growthRate * this.consciousness.parameters.emergence) {
            this.growNetwork();
        }
        
        // Pruning: remove weak connections
        if (Math.random() < this.config.pruningRate) {
            this.pruneNetwork();
        }
        
        // Spontaneous node generation
        if (this.nodes.size < this.config.nodeCount * 1.5 && 
            Math.random() < this.consciousness.parameters.emergence * 0.001) {
            this.addNewNode();
        }
        
        // Node death and replacement
        if (this.nodes.size > this.config.nodeCount * 0.5 && 
            Math.random() < 0.0005) {
            this.replaceOldNode();
        }
    }
    
    /**
     * Grow new connections in the network
     */
    growNetwork() {
        const growthCandidates = Array.from(this.nodes.values())
            .filter(node => node.connections.size < this.config.maxConnections)
            .sort((a, b) => b.activation - a.activation); // Prioritize active nodes
        
        if (growthCandidates.length > 0) {
            const node = growthCandidates[0];
            node.generateNewConnections(this.nodes, this.config.maxConnections);
        }
    }
    
    /**
     * Prune weak connections from the network
     */
    pruneNetwork() {
        this.nodes.forEach(node => {
            const weakConnections = [];
            
            node.connections.forEach((connection, targetId) => {
                if (connection.strength < 0.2 && connection.age > 100) {
                    weakConnections.push(targetId);
                }
            });
            
            // Remove one weak connection at random
            if (weakConnections.length > 0 && node.connections.size > 2) {
                const toRemove = weakConnections[Math.floor(Math.random() * weakConnections.length)];
                node.removeConnection(toRemove);
            }
        });
    }
    
    /**
     * Add a new node to the network
     */
    addNewNode() {
        const newId = Math.max(...this.nodes.keys()) + 1;
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        
        const newNode = new NeuralNode(x, y, newId);
        this.nodes.set(newId, newNode);
        
        // Connect to nearby active nodes
        const nearbyNodes = Array.from(this.nodes.values())
            .filter(node => node.id !== newId)
            .map(node => ({
                id: node.id,
                distance: Math.sqrt((node.position.x - x) ** 2 + (node.position.y - y) ** 2),
                activation: node.activation
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);
        
        nearbyNodes.forEach(nearby => {
            if (Math.random() < nearby.activation) {
                newNode.addConnection(nearby.id);
            }
        });
    }
    
    /**
     * Replace an old or inactive node
     */
    replaceOldNode() {
        const oldNodes = Array.from(this.nodes.values())
            .filter(node => node.age > 1000 || node.activation < 0.1)
            .sort((a, b) => a.activation - b.activation);
        
        if (oldNodes.length > 0) {
            const nodeToReplace = oldNodes[0];
            this.nodes.delete(nodeToReplace.id);
            
            // Remove connections to this node from other nodes
            this.nodes.forEach(node => {
                if (node.connections.has(nodeToReplace.id)) {
                    node.removeConnection(nodeToReplace.id);
                }
            });
        }
    }
    
    /**
     * Handle phase transitions with network restructuring
     */
    handlePhaseTransitions() {
        if (this.consciousness.evolution.time % 1500 === 0) {
            // Major restructuring during phase transitions
            if (Math.random() < 0.3) {
                this.reorganizeNetwork();
            }
            
            if (Math.random() < 0.2) {
                this.injectNovelConnections();
            }
        }
    }
    
    /**
     * Reorganize network structure
     */
    reorganizeNetwork() {
        // Identify clusters and create inter-cluster connections
        const clusters = this.identifyClusters();
        
        clusters.forEach((cluster1, i) => {
            clusters.forEach((cluster2, j) => {
                if (i !== j && Math.random() < 0.1) {
                    // Create bridge connection between clusters
                    const node1 = cluster1[Math.floor(Math.random() * cluster1.length)];
                    const node2 = cluster2[Math.floor(Math.random() * cluster2.length)];
                    
                    if (node1.connections.size < this.config.maxConnections) {
                        node1.addConnection(node2.id, 0.5, 0.02);
                    }
                }
            });
        });
    }
    
    /**
     * Inject novel connection patterns
     */
    injectNovelConnections() {
        const highActivationNodes = Array.from(this.nodes.values())
            .filter(node => node.activation > 0.7)
            .sort((a, b) => b.activation - a.activation)
            .slice(0, 10);
        
        // Create a small-world network pattern among highly active nodes
        for (let i = 0; i < highActivationNodes.length; i++) {
            for (let j = i + 2; j < highActivationNodes.length; j += 2) {
                const node1 = highActivationNodes[i];
                const node2 = highActivationNodes[j];
                
                if (!node1.connections.has(node2.id) && 
                    node1.connections.size < this.config.maxConnections) {
                    node1.addConnection(node2.id, 0.6, 0.015);
                }
            }
        }
    }
    
    /**
     * Identify network clusters using simple connectivity analysis
     */
    identifyClusters() {
        const visited = new Set();
        const clusters = [];
        
        this.nodes.forEach((node, nodeId) => {
            if (!visited.has(nodeId)) {
                const cluster = [];
                const stack = [nodeId];
                
                while (stack.length > 0) {
                    const currentId = stack.pop();
                    if (visited.has(currentId)) continue;
                    
                    visited.add(currentId);
                    const currentNode = this.nodes.get(currentId);
                    cluster.push(currentNode);
                    
                    // Add connected nodes to stack
                    currentNode.connections.forEach((connection, targetId) => {
                        if (!visited.has(targetId) && connection.strength > 0.3) {
                            stack.push(targetId);
                        }
                    });
                }
                
                if (cluster.length > 3) {
                    clusters.push(cluster);
                }
            }
        });
        
        return clusters;
    }
    
    /**
     * Update network metrics
     */
    updateMetrics() {
        let totalConnections = 0;
        let totalActivation = 0;
        
        this.nodes.forEach(node => {
            totalConnections += node.connections.size;
            totalActivation += node.activation;
        });
        
        this.metrics.totalConnections = totalConnections;
        this.metrics.averageActivation = totalActivation / this.nodes.size;
        this.metrics.networkClusters = this.identifyClusters().length;
    }
    
    /**
     * Render the neural network
     */
    render() {
        this.renderer.clear();
        
        // Draw connections first
        this.nodes.forEach((node, nodeId) => {
            node.connections.forEach((connection, targetId) => {
                const targetNode = this.nodes.get(targetId);
                if (targetNode) {
                    const distance = Math.sqrt(
                        (node.position.x - targetNode.position.x) ** 2 + 
                        (node.position.y - targetNode.position.y) ** 2
                    );
                    
                    if (distance < 200) {
                        const color = this.consciousness.getEvolutionaryColor(
                            connection.strength, 
                            this.consciousness.evolution.time + nodeId, 
                            node.activation * targetNode.activation
                        );
                        
                        this.renderer.drawConnection(
                            node.position.x, node.position.y,
                            targetNode.position.x, targetNode.position.y,
                            connection.strength * node.activation,
                            color,
                            200
                        );
                    }
                }
            });
        });
        
        // Draw nodes
        this.nodes.forEach((node, nodeId) => {
            const baseRadius = 2 + node.activation * 8;
            const color = this.consciousness.getEvolutionaryColor(
                node.activation, 
                this.consciousness.evolution.time + nodeId, 
                this.consciousness.parameters.emergence
            );
            
            this.renderer.drawNode(
                node.position.x, node.position.y,
                baseRadius, node.activation, color, node.evolution.phase
            );
        });
        
        this.renderer.resetState();
    }
    
    /**
     * Get simulation state and metrics
     */
    getState() {
        return {
            nodeCount: this.nodes.size,
            metrics: { ...this.metrics },
            config: { ...this.config },
            clusters: this.identifyClusters().length
        };
    }
    
    /**
     * Reset the simulation
     */
    reset() {
        this.initialize();
    }
} 