/**
 * Consciousness Stream Simulation
 * Flowing streams of thought, memory, and associations
 */
export class ConsciousnessStreamSimulation {
    constructor(canvas, consciousness, renderer) {
        this.canvas = canvas;
        this.consciousness = consciousness;
        this.renderer = renderer;
        
        // Stream configuration
        this.config = {
            maxStreams: 12,
            streamLength: 50,
            thoughtDensity: 0.8,
            associationRange: 150,
            memoryDecay: 0.98,
            emergenceThreshold: 0.6
        };
        
        // Thought streams
        this.streams = [];
        this.memories = [];
        this.associations = new Map();
        
        // Stream types
        this.streamTypes = {
            thought: { weight: 0.4, color: 'blue', flow: 'spiral' },
            emotion: { weight: 0.25, color: 'red', flow: 'wave' },
            memory: { weight: 0.2, color: 'green', flow: 'linear' },
            intuition: { weight: 0.15, color: 'purple', flow: 'chaotic' }
        };
        
        this.initialize();
    }
    
    /**
     * Initialize consciousness streams
     */
    initialize() {
        this.streams = [];
        this.memories = [];
        this.associations.clear();
        
        // Create initial thought streams
        for (let i = 0; i < this.config.maxStreams; i++) {
            if (Math.random() < this.config.thoughtDensity) {
                this.createThoughtStream();
            }
        }
        
        console.log('🌊 Consciousness stream simulation initialized');
    }
    
    /**
     * Create a new thought stream
     */
    createThoughtStream() {
        const typeNames = Object.keys(this.streamTypes);
        const typeName = this.selectStreamType(typeNames);
        const type = this.streamTypes[typeName];
        
        const stream = {
            id: Math.random().toString(36).substr(2, 9),
            type: typeName,
            typeData: type,
            
            // Position and movement
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            
            // Stream properties
            intensity: Math.random() * 0.8 + 0.2,
            coherence: Math.random(),
            age: 0,
            maxAge: 200 + Math.random() * 300,
            
            // Visual properties
            nodes: [],
            connections: [],
            
            // Consciousness properties
            thoughtPattern: Math.random() * Math.PI * 2,
            memoryStrength: Math.random(),
            associationLevel: Math.random(),
            
            // Flow dynamics
            flowPhase: Math.random() * Math.PI * 2,
            turbulence: Math.random() * 0.5,
            coherenceTarget: Math.random()
        };
        
        // Initialize stream nodes
        this.initializeStreamNodes(stream);
        
        this.streams.push(stream);
        return stream;
    }
    
    /**
     * Select stream type based on consciousness parameters
     */
    selectStreamType(typeNames) {
        const consciousness = this.consciousness.parameters;
        
        // Bias selection based on current consciousness state
        const weights = {
            thought: consciousness.complexity * 2,
            emotion: consciousness.emergence * 1.5,
            memory: consciousness.coherence * 1.8,
            intuition: consciousness.adaptation * 1.3
        };
        
        const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        
        for (const type of typeNames) {
            random -= weights[type];
            if (random <= 0) return type;
        }
        
        return typeNames[0]; // Fallback
    }
    
    /**
     * Initialize nodes along a stream
     */
    initializeStreamNodes(stream) {
        stream.nodes = [];
        const nodeCount = Math.floor(this.config.streamLength * stream.intensity);
        
        for (let i = 0; i < nodeCount; i++) {
            const progress = i / nodeCount;
            const node = {
                localX: Math.sin(progress * Math.PI * 4) * 20,
                localY: progress * 100 - 50,
                intensity: 1 - Math.pow(progress, 1.5),
                thoughtId: Math.random().toString(36).substr(2, 6),
                memoryWeight: Math.random(),
                lastActivation: 0
            };
            
            stream.nodes.push(node);
        }
    }
    
    /**
     * Update consciousness streams
     */
    update() {
        const time = this.consciousness.evolution.time;
        
        // Update existing streams
        this.streams.forEach(stream => {
            this.updateStream(stream, time);
        });
        
        // Remove expired streams
        this.streams = this.streams.filter(stream => stream.age < stream.maxAge);
        
        // Create new streams based on consciousness emergence
        this.handleStreamGeneration();
        
        // Update memory associations
        this.updateMemoryAssociations();
        
        // Handle stream interactions
        this.processStreamInteractions();
        
        // Phase transition effects
        this.handlePhaseTransitions();
    }
    
    /**
     * Update a single stream
     */
    updateStream(stream, time) {
        stream.age++;
        
        // Update flow dynamics based on type
        this.updateStreamFlow(stream, time);
        
        // Update consciousness influence
        this.updateConsciousnessInfluence(stream);
        
        // Update stream nodes
        this.updateStreamNodes(stream, time);
        
        // Update movement
        this.updateStreamMovement(stream);
        
        // Handle memory formation
        if (Math.random() < 0.02 * stream.memoryStrength) {
            this.formMemory(stream);
        }
    }
    
    /**
     * Update stream flow patterns based on type
     */
    updateStreamFlow(stream, time) {
        const consciousness = this.consciousness.parameters;
        
        switch (stream.type) {
            case 'thought':
                // Spiral flow influenced by complexity
                stream.flowPhase += 0.05 + consciousness.complexity * 0.03;
                stream.vx += Math.cos(stream.flowPhase) * 0.5;
                stream.vy += Math.sin(stream.flowPhase) * 0.5;
                break;
                
            case 'emotion':
                // Wave-like flow influenced by emergence
                const waveFreq = 0.02 + consciousness.emergence * 0.04;
                stream.vy += Math.sin(time * waveFreq + stream.thoughtPattern) * 2;
                stream.intensity *= 0.999 + consciousness.emergence * 0.001;
                break;
                
            case 'memory':
                // Linear flow influenced by coherence
                const coherenceTarget = consciousness.coherence;
                stream.coherenceTarget = coherenceTarget;
                stream.vx *= 0.98;
                stream.vy *= 0.98;
                stream.intensity *= 0.995 + consciousness.coherence * 0.005;
                break;
                
            case 'intuition':
                // Chaotic flow influenced by adaptation
                stream.turbulence += (Math.random() - 0.5) * consciousness.adaptation * 0.1;
                stream.vx += stream.turbulence * (Math.random() - 0.5) * 3;
                stream.vy += stream.turbulence * (Math.random() - 0.5) * 3;
                break;
        }
        
        // Damping
        stream.vx *= 0.95;
        stream.vy *= 0.95;
    }
    
    /**
     * Update consciousness influence on stream
     */
    updateConsciousnessInfluence(stream) {
        const params = this.consciousness.parameters;
        
        // Intensity modulation
        const targetIntensity = (params.complexity + params.emergence) / 2;
        stream.intensity += (targetIntensity - stream.intensity) * 0.01;
        
        // Coherence influence
        const coherenceDelta = params.coherence - stream.coherence;
        stream.coherence += coherenceDelta * 0.02;
        
        // Adaptation influence on lifespan
        if (params.adaptation > 0.8) {
            stream.maxAge *= 1.001; // Extend life during high adaptation
        }
    }
    
    /**
     * Update individual nodes in a stream
     */
    updateStreamNodes(stream, time) {
        stream.nodes.forEach((node, index) => {
            // Update node positions relative to stream
            const progress = index / stream.nodes.length;
            const flowInfluence = stream.typeData.flow;
            
            switch (flowInfluence) {
                case 'spiral':
                    node.localX = Math.sin(stream.flowPhase + progress * Math.PI * 2) * 20 * stream.intensity;
                    node.localY = (progress - 0.5) * 100;
                    break;
                    
                case 'wave':
                    node.localX = Math.sin(time * 0.02 + progress * Math.PI * 4) * 30;
                    node.localY = (progress - 0.5) * 80;
                    break;
                    
                case 'linear':
                    node.localX = (Math.random() - 0.5) * 10;
                    node.localY = (progress - 0.5) * 60;
                    break;
                    
                case 'chaotic':
                    node.localX += (Math.random() - 0.5) * stream.turbulence * 5;
                    node.localY += (Math.random() - 0.5) * stream.turbulence * 5;
                    // Clamp to reasonable bounds
                    node.localX = Math.max(-40, Math.min(40, node.localX));
                    node.localY = Math.max(-60, Math.min(60, node.localY));
                    break;
            }
            
            // Update node intensity
            node.intensity *= this.config.memoryDecay;
            node.intensity = Math.max(0.1, node.intensity);
            
            // Random reactivation
            if (Math.random() < 0.05 * stream.intensity) {
                node.intensity = Math.min(1, node.intensity + 0.3);
                node.lastActivation = time;
            }
        });
    }
    
    /**
     * Update stream movement and boundary conditions
     */
    updateStreamMovement(stream) {
        stream.x += stream.vx;
        stream.y += stream.vy;
        
        // Boundary wrapping
        if (stream.x < -50) stream.x = this.canvas.width + 50;
        if (stream.x > this.canvas.width + 50) stream.x = -50;
        if (stream.y < -50) stream.y = this.canvas.height + 50;
        if (stream.y > this.canvas.height + 50) stream.y = -50;
    }
    
    /**
     * Handle new stream generation
     */
    handleStreamGeneration() {
        const consciousness = this.consciousness.parameters;
        const emergenceRate = consciousness.emergence * 0.008;
        
        if (this.streams.length < this.config.maxStreams && Math.random() < emergenceRate) {
            this.createThoughtStream();
        }
        
        // Spontaneous stream generation during high consciousness states
        if (consciousness.complexity > 0.8 && consciousness.emergence > 0.7) {
            if (Math.random() < 0.01 && this.streams.length < this.config.maxStreams + 3) {
                const surgeStream = this.createThoughtStream();
                surgeStream.intensity *= 1.5;
                surgeStream.maxAge *= 0.7; // Shorter but more intense
            }
        }
    }
    
    /**
     * Update memory associations between streams
     */
    updateMemoryAssociations() {
        // Clear old associations
        this.associations.clear();
        
        // Create new associations between nearby streams
        for (let i = 0; i < this.streams.length; i++) {
            for (let j = i + 1; j < this.streams.length; j++) {
                const stream1 = this.streams[i];
                const stream2 = this.streams[j];
                
                const distance = Math.sqrt(
                    (stream1.x - stream2.x) ** 2 + (stream1.y - stream2.y) ** 2
                );
                
                if (distance < this.config.associationRange) {
                    const strength = 1 - (distance / this.config.associationRange);
                    const associationId = `${stream1.id}-${stream2.id}`;
                    
                    this.associations.set(associationId, {
                        stream1, stream2, strength,
                        type: this.determineAssociationType(stream1, stream2),
                        age: 0
                    });
                }
            }
        }
    }
    
    /**
     * Determine the type of association between two streams
     */
    determineAssociationType(stream1, stream2) {
        if (stream1.type === stream2.type) return 'resonance';
        if (stream1.type === 'memory' || stream2.type === 'memory') return 'recall';
        if (stream1.type === 'emotion' || stream2.type === 'emotion') return 'feeling';
        return 'synthesis';
    }
    
    /**
     * Process interactions between streams
     */
    processStreamInteractions() {
        this.associations.forEach(association => {
            const { stream1, stream2, strength, type } = association;
            
            // Influence each other based on association type
            switch (type) {
                case 'resonance':
                    // Strengthen both streams
                    stream1.intensity = Math.min(1, stream1.intensity + strength * 0.02);
                    stream2.intensity = Math.min(1, stream2.intensity + strength * 0.02);
                    break;
                    
                case 'recall':
                    // Memory stream influences the other
                    const memoryStream = stream1.type === 'memory' ? stream1 : stream2;
                    const otherStream = stream1.type === 'memory' ? stream2 : stream1;
                    
                    otherStream.memoryStrength += strength * 0.01;
                    memoryStream.intensity = Math.min(1, memoryStream.intensity + 0.01);
                    break;
                    
                case 'feeling':
                    // Emotional coloring
                    const emotionStream = stream1.type === 'emotion' ? stream1 : stream2;
                    const targetStream = stream1.type === 'emotion' ? stream2 : stream1;
                    
                    targetStream.intensity *= (1 + emotionStream.intensity * 0.05);
                    break;
                    
                case 'synthesis':
                    // Create new insights
                    if (Math.random() < 0.001 * strength) {
                        this.createInsightStream(stream1, stream2);
                    }
                    break;
            }
            
            association.age++;
        });
    }
    
    /**
     * Create insight stream from two interacting streams
     */
    createInsightStream(stream1, stream2) {
        if (this.streams.length >= this.config.maxStreams + 2) return;
        
        const insight = this.createThoughtStream();
        
        // Position between the two parent streams
        insight.x = (stream1.x + stream2.x) / 2;
        insight.y = (stream1.y + stream2.y) / 2;
        
        // Inherit properties
        insight.intensity = Math.min(1, (stream1.intensity + stream2.intensity) / 2 + 0.2);
        insight.type = 'intuition'; // Insights are intuitive
        insight.typeData = this.streamTypes.intuition;
        insight.maxAge *= 0.6; // Shorter-lived but intense
        
        // Give it unique movement
        insight.vx = (stream1.vx + stream2.vx) / 2 + (Math.random() - 0.5) * 2;
        insight.vy = (stream1.vy + stream2.vy) / 2 + (Math.random() - 0.5) * 2;
        
        console.log('💡 Insight stream created from interaction');
    }
    
    /**
     * Form persistent memory from stream
     */
    formMemory(stream) {
        const memory = {
            id: stream.id + '_memory',
            x: stream.x,
            y: stream.y,
            type: stream.type,
            intensity: stream.intensity * 0.7,
            age: 0,
            maxAge: 500 + Math.random() * 300,
            thoughtPattern: stream.thoughtPattern,
            formationTime: this.consciousness.evolution.time
        };
        
        this.memories.push(memory);
        
        // Limit memory count
        if (this.memories.length > 20) {
            this.memories.shift();
        }
    }
    
    /**
     * Handle phase transitions
     */
    handlePhaseTransitions() {
        if (this.consciousness.evolution.time % 1500 === 0) {
            this.triggerConsciousnessShift();
        }
    }
    
    /**
     * Trigger major consciousness shift
     */
    triggerConsciousnessShift() {
        // Fade all current streams
        this.streams.forEach(stream => {
            stream.intensity *= 0.7;
            stream.maxAge *= 0.8;
        });
        
        // Create new thought patterns
        for (let i = 0; i < 3; i++) {
            if (this.streams.length < this.config.maxStreams) {
                const newStream = this.createThoughtStream();
                newStream.intensity = 0.8 + Math.random() * 0.2;
            }
        }
        
        // Reactivate some memories
        this.memories.forEach(memory => {
            if (Math.random() < 0.3) {
                memory.intensity = Math.min(1, memory.intensity + 0.4);
            }
        });
        
        console.log('🌊 Consciousness shift - thought patterns reorganizing');
    }
    
    /**
     * Render consciousness streams
     */
    render() {
        this.renderer.clear(true); // Use trail effects
        
        // Render memories first (background layer)
        this.renderMemories();
        
        // Render associations
        this.renderAssociations();
        
        // Render active streams
        this.renderStreams();
        
        this.renderer.resetState();
    }
    
    /**
     * Render persistent memories
     */
    renderMemories() {
        this.memories.forEach(memory => {
            if (memory.intensity > 0.1) {
                const alpha = memory.intensity * 0.4;
                const color = this.consciousness.getEvolutionaryColor(
                    memory.type === 'memory' ? 0.3 : 0.7,
                    memory.formationTime + memory.age,
                    memory.intensity
                );
                
                this.renderer.ctx.fillStyle = color;
                this.renderer.ctx.globalAlpha = alpha;
                this.renderer.ctx.beginPath();
                this.renderer.ctx.arc(memory.x, memory.y, 3 + memory.intensity * 5, 0, Math.PI * 2);
                this.renderer.ctx.fill();
            }
            
            memory.age++;
            memory.intensity *= 0.999; // Very slow decay
        });
        
        // Remove old memories
        this.memories = this.memories.filter(memory => memory.age < memory.maxAge);
    }
    
    /**
     * Render associations between streams
     */
    renderAssociations() {
        this.associations.forEach(association => {
            const { stream1, stream2, strength, type } = association;
            
            const alpha = strength * 0.3;
            if (alpha <= 0.05) return;
            
            let color;
            switch (type) {
                case 'resonance': color = '#4CAF50'; break;
                case 'recall': color = '#2196F3'; break;
                case 'feeling': color = '#FF5722'; break;
                case 'synthesis': color = '#9C27B0'; break;
                default: color = '#FFC107';
            }
            
            this.renderer.ctx.strokeStyle = color;
            this.renderer.ctx.globalAlpha = alpha;
            this.renderer.ctx.lineWidth = strength * 2;
            this.renderer.ctx.beginPath();
            this.renderer.ctx.moveTo(stream1.x, stream1.y);
            this.renderer.ctx.lineTo(stream2.x, stream2.y);
            this.renderer.ctx.stroke();
        });
    }
    
    /**
     * Render active thought streams
     */
    renderStreams() {
        this.streams.forEach(stream => {
            this.renderStream(stream);
        });
    }
    
    /**
     * Render a single stream
     */
    renderStream(stream) {
        const time = this.consciousness.evolution.time;
        
        // Render stream nodes
        stream.nodes.forEach((node, index) => {
            const worldX = stream.x + node.localX;
            const worldY = stream.y + node.localY;
            
            // Skip if off-screen
            if (worldX < -20 || worldX > this.canvas.width + 20 || 
                worldY < -20 || worldY > this.canvas.height + 20) return;
            
            const alpha = node.intensity * stream.intensity * 0.8;
            if (alpha <= 0.05) return;
            
            const color = this.consciousness.getEvolutionaryColor(
                stream.thoughtPattern + index * 0.1,
                time + stream.age + index * 10,
                node.intensity
            );
            
            const radius = 2 + node.intensity * stream.intensity * 6;
            
            this.renderer.setupGlow(color, alpha * 8);
            this.renderer.ctx.fillStyle = color;
            this.renderer.ctx.globalAlpha = alpha;
            this.renderer.ctx.beginPath();
            this.renderer.ctx.arc(worldX, worldY, radius, 0, Math.PI * 2);
            this.renderer.ctx.fill();
            this.renderer.clearGlow();
        });
        
        // Render connections between adjacent nodes
        for (let i = 0; i < stream.nodes.length - 1; i++) {
            const node1 = stream.nodes[i];
            const node2 = stream.nodes[i + 1];
            
            const x1 = stream.x + node1.localX;
            const y1 = stream.y + node1.localY;
            const x2 = stream.x + node2.localX;
            const y2 = stream.y + node2.localY;
            
            const alpha = Math.min(node1.intensity, node2.intensity) * stream.intensity * 0.5;
            if (alpha <= 0.03) continue;
            
            const color = this.consciousness.getEvolutionaryColor(
                stream.thoughtPattern,
                time + stream.age,
                alpha
            );
            
            this.renderer.ctx.strokeStyle = color;
            this.renderer.ctx.globalAlpha = alpha;
            this.renderer.ctx.lineWidth = alpha * 3;
            this.renderer.ctx.beginPath();
            this.renderer.ctx.moveTo(x1, y1);
            this.renderer.ctx.lineTo(x2, y2);
            this.renderer.ctx.stroke();
        }
    }
    
    /**
     * Get simulation state and metrics
     */
    getState() {
        return {
            streamCount: this.streams.length,
            memoryCount: this.memories.length,
            associationCount: this.associations.size,
            averageStreamIntensity: this.streams.reduce((sum, s) => sum + s.intensity, 0) / Math.max(1, this.streams.length),
            typeDistribution: this.getTypeDistribution(),
            coherenceLevel: this.streams.reduce((sum, s) => sum + s.coherence, 0) / Math.max(1, this.streams.length)
        };
    }
    
    /**
     * Get distribution of stream types
     */
    getTypeDistribution() {
        const distribution = { thought: 0, emotion: 0, memory: 0, intuition: 0 };
        this.streams.forEach(stream => {
            distribution[stream.type]++;
        });
        return distribution;
    }
    
    /**
     * Reset the simulation
     */
    reset() {
        this.initialize();
        console.log('🌊 Consciousness stream simulation reset');
    }
} 