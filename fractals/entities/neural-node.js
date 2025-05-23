/**
 * Neural Node Entity
 * Represents a single node in the neural network with autonomous learning
 */
export class NeuralNode {
    constructor(x, y, id) {
        this.id = id;
        this.position = { x, y };
        this.activation = Math.random();
        this.connections = new Map();
        
        // Learning parameters
        this.evolution = {
            rate: Math.random() * 0.02 + 0.005,
            phase: Math.random() * Math.PI * 2,
            plasticity: Math.random() * 0.01
        };
        
        // Memory and adaptation
        this.memory = {
            activationHistory: [],
            learningEvents: [],
            socialConnections: 0
        };
        
        // Movement and positioning
        this.movement = {
            vx: 0,
            vy: 0,
            targetX: x,
            targetY: y,
            movementThreshold: 0.7 // Activation level needed to move
        };
        
        this.age = 0;
        this.lastActivation = 0;
    }
    
    /**
     * Add connection to another node
     */
    addConnection(targetId, strength = null, plasticity = null) {
        const connectionStrength = strength ?? Math.random();
        const connectionPlasticity = plasticity ?? Math.random() * 0.01;
        
        this.connections.set(targetId, {
            strength: connectionStrength,
            plasticity: connectionPlasticity,
            age: 0,
            activationPairs: []
        });
        
        this.memory.socialConnections++;
    }
    
    /**
     * Remove connection to another node
     */
    removeConnection(targetId) {
        if (this.connections.has(targetId)) {
            this.connections.delete(targetId);
            this.memory.socialConnections--;
        }
    }
    
    /**
     * Update activation based on inputs and autonomous dynamics
     */
    updateActivation(nodes, time) {
        this.age++;
        let inputSum = 0;
        let activeConnections = 0;
        
        // Calculate input from connected nodes
        this.connections.forEach((connection, targetId) => {
            const targetNode = nodes.get(targetId);
            if (targetNode) {
                const input = targetNode.activation * connection.strength;
                inputSum += input;
                activeConnections++;
                
                // Track activation pairs for Hebbian learning
                connection.activationPairs.push({
                    source: this.activation,
                    target: targetNode.activation,
                    time: time
                });
                
                // Limit history
                if (connection.activationPairs.length > 10) {
                    connection.activationPairs.shift();
                }
                
                connection.age++;
            }
        });
        
        // Autonomous dynamics
        const autonomousInput = Math.sin(time * this.evolution.rate + this.evolution.phase) * 0.5;
        const memoryInfluence = this.calculateMemoryInfluence();
        
        // Sigmoid activation function
        const totalInput = activeConnections > 0 ? 
            (inputSum / activeConnections) + autonomousInput + memoryInfluence - 2 :
            autonomousInput + memoryInfluence;
            
        const newActivation = 1 / (1 + Math.exp(-totalInput));
        
        // Update activation with momentum
        this.activation = this.activation * 0.1 + newActivation * 0.9;
        
        // Store in memory
        this.memory.activationHistory.push(this.activation);
        if (this.memory.activationHistory.length > 50) {
            this.memory.activationHistory.shift();
        }
        
        this.lastActivation = time;
    }
    
    /**
     * Apply Hebbian learning to connections
     */
    applyHebbianLearning(nodes) {
        this.connections.forEach((connection, targetId) => {
            const targetNode = nodes.get(targetId);
            if (!targetNode) return;
            
            // Hebbian rule: "Neurons that fire together, wire together"
            const coActivation = this.activation * targetNode.activation;
            
            if (coActivation > 0.7) {
                // Strengthen connection
                connection.strength = Math.min(1, connection.strength + connection.plasticity);
                this.memory.learningEvents.push({
                    type: 'strengthen',
                    target: targetId,
                    time: this.age,
                    strength: connection.strength
                });
            } else if (coActivation < 0.2) {
                // Weaken connection
                connection.strength = Math.max(0.1, connection.strength - connection.plasticity * 0.5);
                this.memory.learningEvents.push({
                    type: 'weaken',
                    target: targetId,
                    time: this.age,
                    strength: connection.strength
                });
            }
            
            // Prune very weak connections
            if (connection.strength < 0.15 && Math.random() < 0.01) {
                this.removeConnection(targetId);
            }
        });
        
        // Limit learning events memory
        if (this.memory.learningEvents.length > 20) {
            this.memory.learningEvents.shift();
        }
    }
    
    /**
     * Update position based on network dynamics
     */
    updatePosition(canvasWidth, canvasHeight, consciousness) {
        // Movement based on activation level
        if (this.activation > this.movement.movementThreshold) {
            const moveIntensity = (this.activation - this.movement.movementThreshold) * 20;
            
            // Random walk with slight bias toward active regions
            this.movement.vx += (Math.random() - 0.5) * moveIntensity * consciousness.parameters.adaptation;
            this.movement.vy += (Math.random() - 0.5) * moveIntensity * consciousness.parameters.adaptation;
            
            // Damping
            this.movement.vx *= 0.9;
            this.movement.vy *= 0.9;
            
            // Update position
            this.position.x += this.movement.vx;
            this.position.y += this.movement.vy;
            
            // Boundary constraints
            this.position.x = Math.max(30, Math.min(canvasWidth - 30, this.position.x));
            this.position.y = Math.max(30, Math.min(canvasHeight - 30, this.position.y));
        }
    }
    
    /**
     * Calculate influence of memory on current activation
     */
    calculateMemoryInfluence() {
        if (this.memory.activationHistory.length === 0) return 0;
        
        // Recent activation trend
        const recentHistory = this.memory.activationHistory.slice(-5);
        const trend = recentHistory.reduce((sum, val, i, arr) => {
            if (i === 0) return 0;
            return sum + (val - arr[i - 1]);
        }, 0) / (recentHistory.length - 1);
        
        // Learning events influence
        const recentLearning = this.memory.learningEvents.slice(-3);
        const learningBoost = recentLearning.length * 0.05;
        
        return (trend * 0.1) + learningBoost;
    }
    
    /**
     * Generate new connections based on spatial proximity and activation patterns
     */
    generateNewConnections(nodes, maxConnections = 8) {
        if (this.connections.size >= maxConnections) return;
        
        const candidates = [];
        
        nodes.forEach((node, nodeId) => {
            if (nodeId === this.id || this.connections.has(nodeId)) return;
            
            const distance = Math.sqrt(
                (node.position.x - this.position.x) ** 2 + 
                (node.position.y - this.position.y) ** 2
            );
            
            const activationSimilarity = 1 - Math.abs(node.activation - this.activation);
            const score = activationSimilarity / (1 + distance * 0.01);
            
            candidates.push({ id: nodeId, score, distance });
        });
        
        // Sort by score and add best candidates
        candidates.sort((a, b) => b.score - a.score);
        const newConnections = Math.min(candidates.length, maxConnections - this.connections.size);
        
        for (let i = 0; i < newConnections && Math.random() < 0.02; i++) {
            this.addConnection(candidates[i].id);
        }
    }
    
    /**
     * Get node state for debugging/analysis
     */
    getState() {
        return {
            id: this.id,
            position: { ...this.position },
            activation: this.activation,
            connections: this.connections.size,
            age: this.age,
            memorySize: this.memory.activationHistory.length,
            learningEvents: this.memory.learningEvents.length,
            movementThreshold: this.movement.movementThreshold
        };
    }
    
    /**
     * Serialize node for saving/loading
     */
    serialize() {
        return {
            id: this.id,
            position: this.position,
            activation: this.activation,
            evolution: this.evolution,
            connections: Array.from(this.connections.entries()),
            age: this.age
        };
    }
    
    /**
     * Create node from serialized data
     */
    static deserialize(data) {
        const node = new NeuralNode(data.position.x, data.position.y, data.id);
        node.activation = data.activation;
        node.evolution = data.evolution;
        node.age = data.age;
        
        data.connections.forEach(([targetId, connection]) => {
            node.connections.set(targetId, connection);
        });
        
        return node;
    }
} 