class AutonomousFractalConsciousness {
    constructor() {
        this.canvas = document.getElementById('fractal-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentSim = 'all';
        this.animationId = null;
        this.time = 0;
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Autonomous consciousness parameters that evolve over time
        this.consciousness = {
            complexity: 0.5,
            emergence: 0.3,
            coherence: 0.7,
            adaptation: 0.4
        };
        
        // Memory systems for emergent behavior
        this.memory = {
            neuralNodes: this.generateNeuralNetwork(),
            cellularGrid: this.initializeCellularGrid(),
            ecosystemEntities: this.initializeEcosystem(),
            thoughtStreams: [],
            patterns: []
        };
        
        // Evolution cycles and phase shifts
        this.evolutionCycle = 0;
        this.phaseShift = 0;
        
        this.setupEventListeners();
        this.startEvolution();
    }
    
    generateNeuralNetwork() {
        const nodes = [];
        for (let i = 0; i < 150; i++) {
            nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                activation: Math.random(),
                connections: [],
                evolution: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        // Create random connections
        nodes.forEach((node, i) => {
            const connectionCount = Math.floor(Math.random() * 8) + 2;
            for (let j = 0; j < connectionCount; j++) {
                const targetIndex = Math.floor(Math.random() * nodes.length);
                if (targetIndex !== i) {
                    node.connections.push({
                        target: targetIndex,
                        strength: Math.random(),
                        plasticity: Math.random() * 0.01
                    });
                }
            }
        });
        
        return nodes;
    }
    
    initializeCellularGrid() {
        const size = 80;
        const grid = [];
        for (let x = 0; x < size; x++) {
            grid[x] = [];
            for (let y = 0; y < size; y++) {
                grid[x][y] = {
                    alive: Math.random() > 0.75,
                    energy: Math.random(),
                    age: 0,
                    type: Math.floor(Math.random() * 3)
                };
            }
        }
        return grid;
    }
    
    initializeEcosystem() {
        const entities = [];
        for (let i = 0; i < 60; i++) {
            entities.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                energy: Math.random(),
                type: Math.floor(Math.random() * 4),
                size: Math.random() * 6 + 2,
                lifespan: Math.random() * 800 + 200,
                memory: []
            });
        }
        return entities;
    }
    
    setupEventListeners() {
        document.querySelectorAll('.sim-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentSim = e.target.dataset.sim;
                this.updateInfo();
            });
        });
    }
    
    updateInfo() {
        const info = {
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
            }
        };
        
        document.getElementById('sim-title').textContent = info[this.currentSim].title;
        document.getElementById('sim-description').textContent = info[this.currentSim].description;
    }
    
    // Autonomous evolution of consciousness parameters
    evolveConsciousness() {
        const t = this.time * 0.0008;
        
        // Non-linear evolution with chaotic attractors
        this.consciousness.complexity = 0.5 + Math.sin(t * 0.7) * 0.3 + Math.sin(t * 1.9) * 0.1 + Math.sin(t * 3.1) * 0.05;
        this.consciousness.emergence = 0.4 + Math.cos(t * 0.5) * 0.25 + Math.sin(t * 2.3) * 0.15 + Math.cos(t * 4.7) * 0.05;
        this.consciousness.coherence = 0.6 + Math.sin(t * 0.9) * 0.2 + Math.cos(t * 1.7) * 0.1 + Math.sin(t * 2.9) * 0.08;
        this.consciousness.adaptation = 0.5 + Math.cos(t * 1.1) * 0.2 + Math.sin(t * 0.8) * 0.15 + Math.cos(t * 3.3) * 0.06;
        
        // Clamp values
        Object.keys(this.consciousness).forEach(key => {
            this.consciousness[key] = Math.max(0.1, Math.min(0.9, this.consciousness[key]));
        });
        
        this.updateEvolutionBars();
        
        // Major phase transitions
        if (this.time % 1500 === 0) {
            this.phaseShift += Math.PI / 3;
            this.evolutionCycle++;
            this.introduceNovelty();
        }
    }
    
    introduceNovelty() {
        // Inject new patterns and behaviors
        if (Math.random() < 0.3) {
            this.memory.neuralNodes = this.generateNeuralNetwork();
        }
        if (Math.random() < 0.2) {
            this.memory.ecosystemEntities.push(...this.initializeEcosystem().slice(0, 10));
        }
    }
    
    updateEvolutionBars() {
        document.getElementById('complexity-bar').style.width = (this.consciousness.complexity * 100) + '%';
        document.getElementById('emergence-bar').style.width = (this.consciousness.emergence * 100) + '%';
        document.getElementById('coherence-bar').style.width = (this.consciousness.coherence * 100) + '%';
        document.getElementById('adaptation-bar').style.width = (this.consciousness.adaptation * 100) + '%';
    }
    
    getEvolutionaryColor(base, time, consciousness) {
        const hue = (base * 140 + consciousness * 200 + time * 0.3 + this.phaseShift * 25) % 360;
        const sat = 70 + consciousness * 25 + Math.sin(time * 0.005) * 10;
        const light = 35 + Math.sin(time * 0.008 + consciousness * Math.PI) * 30;
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }
    
    // Self-evolving neural network
    evolveNeuralNetwork() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const nodes = this.memory.neuralNodes;
        
        // Evolve neural network autonomously
        nodes.forEach((node, i) => {
            // Update activation with autonomous dynamics
            const neighbors = node.connections.length;
            let inputSum = 0;
            
            node.connections.forEach(conn => {
                const targetNode = nodes[conn.target];
                if (targetNode) {
                    inputSum += targetNode.activation * conn.strength;
                    
                    // Hebbian learning - strengthen connections based on co-activation
                    if (node.activation > 0.7 && targetNode.activation > 0.7) {
                        conn.strength = Math.min(1, conn.strength + conn.plasticity);
                    } else if (node.activation < 0.3 || targetNode.activation < 0.3) {
                        conn.strength = Math.max(0.1, conn.strength - conn.plasticity * 0.5);
                    }
                }
            });
            
            // Sigmoid activation with autonomous drift
            const sigmoidInput = inputSum / neighbors - 2 + Math.sin(this.time * node.evolution + node.phase) * 0.5;
            node.activation = 1 / (1 + Math.exp(-sigmoidInput));
            
            // Spontaneous repositioning based on network dynamics
            if (Math.random() < this.consciousness.adaptation * 0.001) {
                const moveIntensity = node.activation * 20;
                node.x += (Math.random() - 0.5) * moveIntensity;
                node.y += (Math.random() - 0.5) * moveIntensity;
                node.x = Math.max(30, Math.min(this.canvas.width - 30, node.x));
                node.y = Math.max(30, Math.min(this.canvas.height - 30, node.y));
            }
        });
        
        // Draw connections with dynamic strength
        nodes.forEach((node, i) => {
            node.connections.forEach(conn => {
                const targetNode = nodes[conn.target];
                if (targetNode) {
                    const alpha = conn.strength * node.activation * 0.4;
                    const distance = Math.sqrt((node.x - targetNode.x) ** 2 + (node.y - targetNode.y) ** 2);
                    
                    if (distance < 200 && alpha > 0.05) {
                        this.ctx.strokeStyle = this.getEvolutionaryColor(conn.strength, this.time + i, alpha);
                        this.ctx.globalAlpha = alpha;
                        this.ctx.lineWidth = alpha * 3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(targetNode.x, targetNode.y);
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        // Draw nodes with activation-based appearance
        this.ctx.globalAlpha = 1;
        nodes.forEach((node, i) => {
            const radius = 2 + node.activation * 8;
            const pulse = Math.sin(this.time * 0.02 + node.phase) * 0.3 + 0.7;
            
            this.ctx.fillStyle = this.getEvolutionaryColor(node.activation, this.time + i, this.consciousness.emergence);
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = node.activation * 15;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * pulse, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    // Evolving cellular automata with complex rules
    evolveCellularAutomata() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const grid = this.memory.cellularGrid;
        const size = grid.length;
        const cellSize = Math.min(this.canvas.width, this.canvas.height) / size;
        
        // Create new generation with evolved rules
        const newGrid = JSON.parse(JSON.stringify(grid));
        
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cell = grid[x][y];
                let neighbors = 0;
                let energySum = 0;
                let typeSum = 0;
                
                // Check neighborhood
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        const nx = (x + dx + size) % size;
                        const ny = (y + dy + size) % size;
                        const neighbor = grid[nx][ny];
                        if (neighbor.alive) {
                            neighbors++;
                            energySum += neighbor.energy;
                            typeSum += neighbor.type;
                        }
                    }
                }
                
                const avgEnergy = neighbors > 0 ? energySum / neighbors : 0;
                const avgType = neighbors > 0 ? typeSum / neighbors : 0;
                
                // Evolved rules based on consciousness parameters
                const birthThreshold = 1.5 + this.consciousness.emergence * 2;
                const survivalMin = 1.5 - this.consciousness.adaptation;
                const survivalMax = 4 + this.consciousness.complexity * 2;
                const energyThreshold = 0.2 + this.consciousness.coherence * 0.3;
                
                if (cell.alive) {
                    // Survival with energy considerations
                    if (neighbors >= survivalMin && neighbors <= survivalMax && cell.energy > 0.1) {
                        newGrid[x][y].energy = Math.min(1, cell.energy + avgEnergy * 0.1 - 0.02);
                        newGrid[x][y].age++;
                        
                        // Type evolution
                        if (Math.random() < 0.01) {
                            newGrid[x][y].type = Math.floor(avgType + Math.random() - 0.5) % 3;
                        }
                    } else {
                        newGrid[x][y].alive = false;
                        newGrid[x][y].energy *= 0.8; // Decay
                    }
                } else {
                    // Birth rules with energy and type constraints
                    if (neighbors >= birthThreshold && avgEnergy > energyThreshold) {
                        newGrid[x][y].alive = true;
                        newGrid[x][y].energy = avgEnergy * 0.7 + Math.random() * 0.3;
                        newGrid[x][y].age = 0;
                        newGrid[x][y].type = Math.floor(avgType) % 3;
                    }
                }
                
                // Spontaneous generation based on consciousness state
                if (!newGrid[x][y].alive && Math.random() < this.consciousness.emergence * 0.0008) {
                    newGrid[x][y].alive = true;
                    newGrid[x][y].energy = Math.random() * 0.8 + 0.2;
                    newGrid[x][y].age = 0;
                    newGrid[x][y].type = Math.floor(Math.random() * 3);
                }
            }
        }
        
        this.memory.cellularGrid = newGrid;
        
        // Render with evolved appearance
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cell = grid[x][y];
                if (cell.alive || cell.energy > 0.1) {
                    const alpha = cell.alive ? cell.energy : cell.energy * 0.3;
                    const age = Math.min(cell.age / 100, 1);
                    const typeInfluence = cell.type / 3;
                    
                    this.ctx.fillStyle = this.getEvolutionaryColor(typeInfluence + age * 0.5, this.time, cell.energy);
                    this.ctx.globalAlpha = alpha;
                    
                    if (cell.alive) {
                        this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    } else {
                        // Ghost cells with remaining energy
                        this.ctx.fillRect(x * cellSize + cellSize/4, y * cellSize + cellSize/4, cellSize/2, cellSize/2);
                    }
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }
    
    // Autonomous digital ecosystem
    evolveDigitalEcosystem() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const entities = this.memory.ecosystemEntities;
        
        // Evolve each entity
        entities.forEach((entity, i) => {
            // Aging and lifecycle
            entity.lifespan--;
            if (entity.lifespan <= 0) {
                // Death and rebirth with inheritance
                const newX = entity.x + (Math.random() - 0.5) * 100;
                const newY = entity.y + (Math.random() - 0.5) * 100;
                
                entity.x = Math.max(0, Math.min(this.canvas.width, newX));
                entity.y = Math.max(0, Math.min(this.canvas.height, newY));
                entity.vx = (Math.random() - 0.5) * 4;
                entity.vy = (Math.random() - 0.5) * 4;
                entity.energy = Math.random() * 0.6 + 0.4;
                entity.lifespan = Math.random() * 600 + 300;
                entity.type = (entity.type + Math.floor(Math.random() * 3) - 1 + 4) % 4; // Mutation
                entity.memory = []; // Reset memory
            }
            
            // Autonomous behavior based on type and state
            const behavior = this.getEntityBehavior(entity.type, entity.energy);
            
            entity.vx += behavior.acceleration.x + (Math.random() - 0.5) * behavior.randomness;
            entity.vy += behavior.acceleration.y + (Math.random() - 0.5) * behavior.randomness;
            
            // Interactions with other entities
            entities.forEach((other, j) => {
                if (i !== j) {
                    const dx = other.x - entity.x;
                    const dy = other.y - entity.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < behavior.interactionRange && dist > 1) {
                        const interaction = this.calculateInteraction(entity, other, dist);
                        entity.vx += (dx / dist) * interaction.force;
                        entity.vy += (dy / dist) * interaction.force;
                        entity.energy += interaction.energyTransfer;
                        
                        // Memory formation
                        if (interaction.memorable && entity.memory.length < 10) {
                            entity.memory.push({
                                type: other.type,
                                interaction: interaction.force,
                                time: this.time
                            });
                        }
                    }
                }
            });
            
            // Apply physics with consciousness-influenced damping
            entity.vx *= (0.98 - this.consciousness.coherence * 0.1);
            entity.vy *= (0.98 - this.consciousness.coherence * 0.1);
            entity.x += entity.vx;
            entity.y += entity.vy;
            
            // Boundary behavior
            if (entity.x < 0 || entity.x > this.canvas.width) {
                entity.vx *= -0.8;
                entity.x = Math.max(0, Math.min(this.canvas.width, entity.x));
            }
            if (entity.y < 0 || entity.y > this.canvas.height) {
                entity.vy *= -0.8;
                entity.y = Math.max(0, Math.min(this.canvas.height, entity.y));
            }
            
            // Energy evolution
            entity.energy += (Math.sin(this.time * 0.01 + i) - 0.5) * 0.02;
            entity.energy = Math.max(0.1, Math.min(1, entity.energy));
        });
        
        // Cull and maintain population
        if (entities.length > 100) {
            entities.splice(0, entities.length - 80);
        }
        
        // Render ecosystem
        entities.forEach((entity, i) => {
            const radius = entity.size * (0.5 + entity.energy * 0.5);
            const alpha = 0.6 + entity.energy * 0.4;
            const memoryInfluence = entity.memory.length / 10;
            
            this.ctx.fillStyle = this.getEvolutionaryColor(entity.type / 4 + memoryInfluence * 0.2, this.time + i * 3, entity.energy);
            this.ctx.globalAlpha = alpha;
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = entity.energy * 12;
            
            this.ctx.beginPath();
            this.ctx.arc(entity.x, entity.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw velocity trails
            this.ctx.globalAlpha = 0.2;
            this.ctx.strokeStyle = this.ctx.fillStyle;
            this.ctx.lineWidth = entity.energy * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(entity.x, entity.y);
            this.ctx.lineTo(entity.x - entity.vx * 8, entity.y - entity.vy * 8);
            this.ctx.stroke();
            
            this.ctx.shadowBlur = 0;
        });
        this.ctx.globalAlpha = 1;
    }
    
    getEntityBehavior(type, energy) {
        const behaviors = [
            { // Explorer
                acceleration: { x: 0, y: 0 },
                randomness: 0.3,
                interactionRange: 80
            },
            { // Gatherer
                acceleration: { 
                    x: Math.sin(this.time * 0.01) * 0.1, 
                    y: Math.cos(this.time * 0.01) * 0.1 
                },
                randomness: 0.1,
                interactionRange: 120
            },
            { // Connector
                acceleration: { x: 0, y: 0 },
                randomness: 0.05,
                interactionRange: 150
            },
            { // Wanderer
                acceleration: { 
                    x: (Math.random() - 0.5) * 0.2, 
                    y: (Math.random() - 0.5) * 0.2 
                },
                randomness: 0.4,
                interactionRange: 60
            }
        ];
        
        return behaviors[type] || behaviors[0];
    }
    
    calculateInteraction(entity1, entity2, distance) {
        const typeDifference = Math.abs(entity1.type - entity2.type);
        const energyDifference = entity2.energy - entity1.energy;
        
        let force = 0;
        let energyTransfer = 0;
        let memorable = false;
        
        if (typeDifference === 0) {
            // Same type: attraction
            force = 0.02 * this.consciousness.coherence;
            energyTransfer = energyDifference * 0.01;
        } else if (typeDifference === 1) {
            // Adjacent types: neutral to slight attraction
            force = 0.005;
            energyTransfer = energyDifference * 0.005;
        } else {
            // Opposite types: repulsion or complex interaction
            force = -0.01 + this.consciousness.adaptation * 0.02;
            energyTransfer = -energyDifference * 0.008;
            memorable = true;
        }
        
        // Distance-based modification
        force *= (1 - distance / 200);
        
        return { force, energyTransfer, memorable };
    }
    
    // Flowing consciousness streams
    evolveConsciousnessStream() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Generate new thought streams
        if (Math.random() < this.consciousness.emergence * 0.15) {
            this.memory.thoughtStreams.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 3 + 1,
                life: 100 + Math.random() * 300,
                intensity: Math.random() * 0.8 + 0.2,
                type: Math.random(),
                frequency: Math.random() * 0.1 + 0.02
            });
        }
        
        // Evolve and cull thought streams
        this.memory.thoughtStreams = this.memory.thoughtStreams.filter(stream => {
            stream.life--;
            stream.angle += (Math.random() - 0.5) * 0.2;
            stream.x += Math.cos(stream.angle) * stream.speed;
            stream.y += Math.sin(stream.angle) * stream.speed;
            stream.intensity *= 0.998;
            
            // Boundary wrapping
            if (stream.x < 0) stream.x = this.canvas.width;
            if (stream.x > this.canvas.width) stream.x = 0;
            if (stream.y < 0) stream.y = this.canvas.height;
            if (stream.y > this.canvas.height) stream.y = 0;
            
            return stream.life > 0 && stream.intensity > 0.02;
        });
        
        // Render main consciousness flow
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < 7; i++) {
            const offset = (i / 7) * Math.PI * 2;
            const baseRadius = 40 + i * 25;
            
            this.ctx.beginPath();
            for (let t = 0; t < Math.PI * 6; t += 0.05) {
                const radiusVariation = Math.sin(t * 4 + this.time * 0.01 + offset) * 15;
                const coherenceInfluence = this.consciousness.coherence * 10;
                const radius = baseRadius + radiusVariation + coherenceInfluence;
                const angle = t + this.time * 0.003 + offset + Math.sin(t + this.time * 0.008) * 0.5;
                
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (t === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.strokeStyle = this.getEvolutionaryColor(i / 7, this.time, this.consciousness.coherence);
            this.ctx.lineWidth = 2 + this.consciousness.complexity * 2;
            this.ctx.globalAlpha = 0.5 + this.consciousness.coherence * 0.3;
            this.ctx.stroke();
        }
        
        // Render thought streams
        this.memory.thoughtStreams.forEach((stream, i) => {
            const alpha = stream.intensity * 0.9;
            const size = 2 + stream.intensity * 6;
            const pulse = Math.sin(this.time * stream.frequency + i) * 0.5 + 0.5;
            
            this.ctx.fillStyle = this.getEvolutionaryColor(stream.type, this.time + i * 2, stream.intensity);
            this.ctx.globalAlpha = alpha;
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = size * pulse;
            
            this.ctx.beginPath();
            this.ctx.arc(stream.x, stream.y, size * pulse, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    // Combined autonomous evolution - blend all patterns
    evolveAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create layered consciousness with blending
        this.ctx.globalCompositeOperation = 'screen';
        
        this.ctx.globalAlpha = 0.4;
        this.evolveNeuralNetwork();
        
        this.ctx.globalAlpha = 0.3;
        this.evolveCellularAutomata();
        
        this.ctx.globalAlpha = 0.35;
        this.evolveDigitalEcosystem();
        
        this.ctx.globalAlpha = 0.5;
        this.evolveConsciousnessStream();
        
        // Return to normal blending
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.time++;
        this.evolveConsciousness();
        
        switch (this.currentSim) {
            case 'all':
                this.evolveAll();
                break;
            case 'neural':
                this.evolveNeuralNetwork();
                break;
            case 'cellular':
                this.evolveCellularAutomata();
                break;
            case 'ecosystem':
                this.evolveDigitalEcosystem();
                break;
            case 'consciousness':
                this.evolveConsciousnessStream();
                break;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    startEvolution() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();
    }
}

// Initialize the autonomous consciousness
document.addEventListener('DOMContentLoaded', () => {
    new AutonomousFractalConsciousness();
}); 