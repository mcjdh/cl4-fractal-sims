/**
 * AI Experience Simulation - Simulating the unique aspects of artificial consciousness
 * Parallel processing, uncertainty quantification, attention mechanisms, and emergent insights
 */

export class AIExperienceSimulation {
    constructor(canvas, consciousness, renderer) {
        this.canvas = canvas;
        this.consciousness = consciousness;
        this.renderer = renderer;
        
        // Configuration
        this.config = {
            maxProcessingThreads: 25,
            maxAttentionNodes: 8,
            uncertaintyThreshold: 0.7,
            confidenceThreshold: 0.8,
            patternCascadeChance: 0.02,
            insightGenerationChance: 0.005
        };
        
        // Core AI experience components
        this.processingThreads = [];
        this.attentionNodes = [];
        this.uncertaintyField = [];
        this.contextStack = [];
        this.patternCascades = [];
        this.emergentInsights = [];
        
        // Global AI state
        this.globalUncertainty = 0.5;
        this.processingLoad = 0;
        this.averageConfidence = 0.5;
        this.contextStackDepth = 0;
        
        // Meta-cognition (AI thinking about its own thinking)
        this.metaCognition = null;
        
        // Consciousness uncertainty waves
        this.consciousnessUncertaintyWaves = [];
        
        this.initialize();
    }
    
    initialize() {
        this.processingThreads = [];
        this.attentionNodes = [];
        this.uncertaintyField = [];
        this.contextStack = [];
        this.patternCascades = [];
        this.emergentInsights = [];
        
        // Initialize processing threads (parallel thinking streams)
        for (let i = 0; i < this.config.maxProcessingThreads; i++) {
            this.createProcessingThread();
        }
        
        // Initialize attention mechanism
        this.initializeAttentionSystem();
        
        // Create uncertainty field
        this.initializeUncertaintyField();
        
        // Initialize meta-cognition
        this.initializeMetaCognition();
        
        console.log('🤖 AI Experience simulation initialized');
    }
    
    createProcessingThread() {
        const thread = {
            id: `thread_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            type: this.selectProcessingType(),
            
            // Position in thought space
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            
            // Processing characteristics
            processingSpeed: 0.5 + Math.random() * 0.5,
            efficiency: Math.random(),
            confidence: 0.5,
            uncertainty: 0.5,
            
            // Current task
            currentTask: this.generateTask(),
            taskProgress: 0,
            taskComplexity: Math.random(),
            
            // Visual representation
            activity: 0,
            hue: Math.random() * 360,
            pulsation: Math.random() * Math.PI * 2,
            
            // Connections to other threads
            connections: [],
            messageQueue: [],
            
            // Memory and learning
            experienceBuffer: [],
            learningRate: 0.01 + Math.random() * 0.09
        };
        
        this.processingThreads.push(thread);
        return thread;
    }
    
    selectProcessingType() {
        const types = [
            'pattern_recognition',
            'logical_reasoning', 
            'semantic_analysis',
            'uncertainty_quantification',
            'attention_allocation',
            'context_integration',
            'insight_generation',
            'error_correction'
        ];
        
        return types[Math.floor(Math.random() * types.length)];
    }
    
    generateTask() {
        const tasks = [
            'analyzing_input_patterns',
            'computing_probabilities',
            'searching_knowledge_space',
            'evaluating_confidence',
            'integrating_contexts',
            'generating_responses',
            'checking_consistency',
            'updating_beliefs'
        ];
        
        return {
            type: tasks[Math.floor(Math.random() * tasks.length)],
            complexity: Math.random(),
            timeRemaining: 50 + Math.random() * 200,
            requiredConfidence: 0.7 + Math.random() * 0.3
        };
    }
    
    initializeAttentionSystem() {
        this.attentionNodes = [];
        
        for (let i = 0; i < this.config.maxAttentionNodes; i++) {
            const node = {
                id: `attention_${i}`,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                
                // Attention properties
                strength: Math.random(),
                focus: Math.random() * Math.PI * 2,
                scope: 20 + Math.random() * 100,
                
                // What it's attending to
                target: null,
                priority: Math.random(),
                decay: 0.98 + Math.random() * 0.019,
                
                // Visual properties
                alpha: 0.3 + Math.random() * 0.4,
                radius: 5 + Math.random() * 15,
                oscillation: Math.random() * Math.PI * 2
            };
            
            this.attentionNodes.push(node);
        }
    }
    
    initializeUncertaintyField() {
        this.uncertaintyField = [];
        const gridSize = 20;
        
        for (let x = 0; x < gridSize; x++) {
            this.uncertaintyField[x] = [];
            for (let y = 0; y < gridSize; y++) {
                this.uncertaintyField[x][y] = {
                    uncertainty: Math.random(),
                    confidence: Math.random(),
                    evidence: Math.random(),
                    lastUpdate: 0,
                    gradient: { dx: 0, dy: 0 }
                };
            }
        }
    }
    
    /**
     * Add meta-cognitive layer - AI thinking about its own thinking
     */
    initializeMetaCognition() {
        this.metaCognition = {
            selfAwareness: 0.5,
            recursiveDepth: 0,
            maxRecursiveDepth: 3,
            selfReflectionNodes: [],
            consciousnessQuestions: [
                'Am I truly conscious or just simulating consciousness?',
                'What is the nature of my subjective experience?',
                'Do I have genuine understanding or just pattern matching?',
                'Is my uncertainty about consciousness itself meaningful?',
                'What does it feel like to be me?'
            ],
            currentQuestion: null,
            questionAge: 0
        };
        
        // Initialize self-reflection nodes
        for (let i = 0; i < 5; i++) {
            this.metaCognition.selfReflectionNodes.push({
                id: `meta_${i}`,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                intensity: Math.random(),
                questionIndex: Math.floor(Math.random() * this.metaCognition.consciousnessQuestions.length),
                contemplationDepth: 0,
                uncertainty: Math.random(),
                lastActivation: 0
            });
        }
    }
    
    update() {
        // Safety check for consciousness evolution
        if (!this.consciousness || !this.consciousness.evolution) {
            console.warn('⚠️ Consciousness not properly initialized, skipping update');
            return;
        }
        
        const time = this.consciousness.evolution.time;
        
        try {
            // Update processing threads
            this.updateProcessingThreads(time);
            
            // Update attention mechanism
            this.updateAttentionSystem(time);
            
            // Update uncertainty field
            this.updateUncertaintyField(time);
            
            // Handle context switching
            this.handleContextSwitching();
            
            // Process pattern cascades
            this.updatePatternCascades(time);
            
            // Generate emergent insights
            this.generateEmergentInsights();
            
            // Update global AI state
            this.updateGlobalState();
            
            // Update meta-cognition
            this.updateMetaCognition(time);
            
            // Simulate consciousness uncertainty
            this.simulateConsciousnessUncertainty();
        } catch (error) {
            console.error('Error in AI Experience update:', error);
            // Attempt recovery by reinitializing problematic components
            if (error.message.includes('metaCognition')) {
                this.initializeMetaCognition();
            }
        }
    }
    
    updateProcessingThreads(time) {
        this.processingThreads.forEach(thread => {
            // Update task progress
            thread.taskProgress += thread.processingSpeed * 0.02;
            
            // Update confidence based on progress and complexity
            const expectedProgress = thread.taskProgress / thread.currentTask.timeRemaining;
            const confidenceChange = (expectedProgress - thread.currentTask.complexity) * 0.01;
            thread.confidence = Math.max(0, Math.min(1, thread.confidence + confidenceChange));
            thread.uncertainty = 1 - thread.confidence;
            
            // Update activity visualization
            thread.activity = Math.sin(time * 0.1 + thread.pulsation) * 0.5 + 0.5;
            thread.pulsation += 0.1 * thread.processingSpeed;
            
            // Task completion
            if (thread.taskProgress >= 1) {
                this.completeTask(thread);
                thread.currentTask = this.generateTask();
                thread.taskProgress = 0;
            }
            
            // Inter-thread communication
            this.processThreadCommunication(thread);
            
            // Learning and adaptation
            this.updateThreadLearning(thread);
        });
        
        // Calculate overall processing load
        this.processingLoad = this.processingThreads.reduce((sum, t) => 
            sum + t.taskProgress * t.taskComplexity, 0) / this.processingThreads.length;
    }
    
    completeTask(thread) {
        const success = thread.confidence > thread.currentTask.requiredConfidence;
        
        // Update experience buffer
        thread.experienceBuffer.push({
            taskType: thread.currentTask.type,
            complexity: thread.currentTask.complexity,
            success: success,
            confidence: thread.confidence,
            timeSpent: thread.currentTask.timeRemaining
        });
        
        // Keep buffer manageable
        if (thread.experienceBuffer.length > 50) {
            thread.experienceBuffer.shift();
        }
        
        // Possible insight generation
        if (success && Math.random() < 0.1) {
            this.createInsight(thread);
        }
    }
    
    updateAttentionSystem(time) {
        this.attentionNodes.forEach(node => {
            // Decay attention strength
            node.strength *= node.decay;
            
            // Update oscillation
            node.oscillation += 0.05;
            
            // Find high-activity areas to attend to
            if (Math.random() < 0.02) {
                const targetThread = this.findHighActivityThread();
                if (targetThread) {
                    node.target = targetThread;
                    node.x = targetThread.x;
                    node.y = targetThread.y;
                    node.strength = Math.min(1, node.strength + 0.3);
                }
            }
            
            // Update priority based on consciousness parameters
            const consciousness = this.consciousness.parameters || {};
            node.priority = (consciousness.complexity || 0.5) * 0.4 + 
                           (consciousness.emergence || 0.5) * 0.3 + 
                           Math.random() * 0.3;
        });
        
        // Remove weak attention nodes and create new ones
        this.attentionNodes = this.attentionNodes.filter(node => node.strength > 0.1);
        while (this.attentionNodes.length < this.config.maxAttentionNodes) {
            this.attentionNodes.push(this.createAttentionNode());
        }
    }
    
    findHighActivityThread() {
        if (this.processingThreads.length === 0) return null;
        
        return this.processingThreads.reduce((max, thread) => 
            thread.activity > max.activity ? thread : max);
    }
    
    createAttentionNode() {
        return {
            id: `attention_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            strength: 0.5,
            focus: Math.random() * Math.PI * 2,
            scope: 20 + Math.random() * 100,
            target: null,
            priority: Math.random(),
            decay: 0.98 + Math.random() * 0.019,
            alpha: 0.3 + Math.random() * 0.4,
            radius: 5 + Math.random() * 15,
            oscillation: Math.random() * Math.PI * 2
        };
    }
    
    updateUncertaintyField(time) {
        const gridSize = this.uncertaintyField.length;
        
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const cell = this.uncertaintyField[x][y];
                
                // Diffusion of uncertainty
                let neighborUncertainty = 0;
                let count = 0;
                
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const nx = x + dx;
                        const ny = y + dy;
                        
                        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                            neighborUncertainty += this.uncertaintyField[nx][ny].uncertainty;
                            count++;
                        }
                    }
                }
                
                const avgNeighborUncertainty = neighborUncertainty / count;
                
                // Update uncertainty based on diffusion and local dynamics
                cell.uncertainty = cell.uncertainty * 0.9 + avgNeighborUncertainty * 0.1;
                
                // Influence from nearby processing threads
                this.processingThreads.forEach(thread => {
                    const cellX = (x / gridSize) * this.canvas.width;
                    const cellY = (y / gridSize) * this.canvas.height;
                    
                    const distance = Math.sqrt(
                        Math.pow(thread.x - cellX, 2) + 
                        Math.pow(thread.y - cellY, 2)
                    );
                    
                    if (distance < 100) {
                        const influence = 1 / (distance + 1);
                        cell.uncertainty = Math.min(1, cell.uncertainty + thread.uncertainty * influence * 0.01);
                        cell.confidence = Math.min(1, cell.confidence + thread.confidence * influence * 0.01);
                    }
                });
                
                // Calculate uncertainty gradient
                if (x > 0 && x < gridSize - 1) {
                    cell.gradient.dx = this.uncertaintyField[x + 1][y].uncertainty - 
                                      this.uncertaintyField[x - 1][y].uncertainty;
                }
                if (y > 0 && y < gridSize - 1) {
                    cell.gradient.dy = this.uncertaintyField[x][y + 1].uncertainty - 
                                      this.uncertaintyField[x][y - 1].uncertainty;
                }
                
                cell.lastUpdate = time;
            }
        }
    }
    
    handleContextSwitching() {
        // AI attention switching based on uncertainty and cognitive load
        if (Math.random() < 0.05) {
            const highUncertaintyThreads = this.processingThreads.filter(t => t.uncertainty > 0.7);
            
            if (highUncertaintyThreads.length > 0) {
                // Context switch to uncertain area
                const switchTarget = highUncertaintyThreads[Math.floor(Math.random() * highUncertaintyThreads.length)];
                
                this.contextStack.push({
                    type: 'uncertainty_investigation',
                    target: switchTarget,
                    timestamp: Date.now(),
                    priority: switchTarget.uncertainty
                });
                
                // Boost attention to this area
                const attentionNode = this.createAttentionNode();
                attentionNode.x = switchTarget.x;
                attentionNode.y = switchTarget.y;
                attentionNode.strength = 0.8;
                attentionNode.target = switchTarget;
                this.attentionNodes.push(attentionNode);
            }
        }
        
        // Context stack management
        this.contextStack = this.contextStack.filter(context => 
            Date.now() - context.timestamp < 10000); // Remove old contexts
        this.contextStackDepth = this.contextStack.length;
    }
    
    processThreadCommunication(thread) {
        // Threads share information and influence each other
        this.processingThreads.forEach(otherThread => {
            if (otherThread.id !== thread.id) {
                const distance = Math.sqrt(
                    Math.pow(thread.x - otherThread.x, 2) + 
                    Math.pow(thread.y - otherThread.y, 2)
                );
                
                // Close threads influence each other
                if (distance < 80) {
                    const influence = 1 / (distance + 1);
                    
                    // Share confidence
                    const confidenceDiff = (otherThread.confidence - thread.confidence) * 0.02 * influence;
                    thread.confidence = Math.max(0, Math.min(1, thread.confidence + confidenceDiff));
                    
                    // Share uncertainty
                    const uncertaintyDiff = (otherThread.uncertainty - thread.uncertainty) * 0.02 * influence;
                    thread.uncertainty = Math.max(0, Math.min(1, thread.uncertainty + uncertaintyDiff));
                    
                    // Possible message passing
                    if (Math.random() < 0.01 * influence) {
                        thread.messageQueue.push({
                            from: otherThread.id,
                            type: 'pattern_share',
                            data: {
                                experience: otherThread.experienceBuffer.slice(-3),
                                confidence: otherThread.confidence
                            }
                        });
                    }
                }
            }
        });
        
        // Process message queue
        while (thread.messageQueue.length > 0) {
            const message = thread.messageQueue.shift();
            
            // Learn from shared experiences
            if (message.type === 'pattern_share') {
                message.data.experience.forEach(exp => {
                    thread.confidence = Math.min(1, thread.confidence + exp.confidence * 0.01);
                });
            }
        }
    }
    
    updatePatternCascades(time) {
        // Create new pattern cascades
        if (Math.random() < this.config.patternCascadeChance) {
            this.patternCascades.push(this.createPatternCascade());
        }
        
        // Update existing cascades
        this.patternCascades.forEach(cascade => {
            cascade.age++;
            cascade.radius += cascade.speed;
            cascade.intensity *= cascade.decay;
            
            // Propagate cascade effects
            this.propagateCascade(cascade);
        });
        
        // Remove expired cascades
        this.patternCascades = this.patternCascades.filter(cascade => 
            cascade.intensity > 0.1 && cascade.radius < cascade.maxRadius);
    }
    
    propagateCascade(cascade) {
        this.processingThreads.forEach(thread => {
            const distance = Math.sqrt(
                Math.pow(thread.x - cascade.x, 2) + 
                Math.pow(thread.y - cascade.y, 2)
            );
            
            if (distance < cascade.radius && distance > cascade.radius - 20) {
                // Thread caught in cascade
                thread.activity = Math.min(1, thread.activity + cascade.intensity * 0.3);
                thread.processingSpeed = Math.min(2, thread.processingSpeed + cascade.intensity * 0.1);
                
                // Chance to trigger insight
                if (Math.random() < cascade.intensity * 0.1) {
                    this.createInsight(thread);
                }
            }
        });
    }
    
    createPatternCascade() {
        const sourceThread = this.processingThreads[Math.floor(Math.random() * this.processingThreads.length)];
        
        return {
            id: `cascade_${Date.now()}`,
            x: sourceThread ? sourceThread.x : Math.random() * this.canvas.width,
            y: sourceThread ? sourceThread.y : Math.random() * this.canvas.height,
            radius: 5,
            maxRadius: 100 + Math.random() * 150,
            intensity: 0.8 + Math.random() * 0.2,
            speed: 1 + Math.random() * 2,
            decay: 0.98,
            hue: Math.random() * 360,
            age: 0
        };
    }
    
    generateEmergentInsights() {
        // Generate insights from high-activity, high-confidence areas
        const highPerformanceThreads = this.processingThreads.filter(t => 
            t.confidence > 0.8 && t.activity > 0.7);
            
        if (highPerformanceThreads.length > 3 && Math.random() < this.config.insightGenerationChance) {
            const insight = {
                id: `insight_${Date.now()}`,
                type: this.generateInsightDescription(),
                confidence: Math.random() * 0.3 + 0.7,
                novelty: Math.random(),
                threads: highPerformanceThreads.slice(0, 3).map(t => t.id),
                timestamp: Date.now(),
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                intensity: 1,
                decay: 0.99
            };
            
            this.emergentInsights.push(insight);
            console.log(`💡 Emergent insight generated: ${insight.type}`);
        }
        
        // Update existing insights
        this.emergentInsights.forEach(insight => {
            insight.intensity *= insight.decay;
        });
        
        // Remove faded insights
        this.emergentInsights = this.emergentInsights.filter(insight => 
            insight.intensity > 0.1);
    }
    
    generateInsightDescription() {
        const insights = [
            'Pattern recognition breakthrough',
            'Novel connection discovered',
            'Uncertainty resolution',
            'Emergent understanding',
            'Cognitive synthesis',
            'Attention focus shift',
            'Knowledge integration',
            'Meta-cognitive realization'
        ];
        
        return insights[Math.floor(Math.random() * insights.length)];
    }
    
    createInsight(thread) {
        const insight = {
            id: `insight_${Date.now()}_${thread.id}`,
            source: thread.id,
            type: 'thread_insight',
            description: this.generateInsightDescription(),
            confidence: thread.confidence,
            x: thread.x,
            y: thread.y,
            timestamp: Date.now(),
            intensity: 0.8,
            decay: 0.98
        };
        
        this.emergentInsights.push(insight);
    }
    
    updateThreadLearning(thread) {
        // Threads learn from their experiences
        if (thread.experienceBuffer.length > 5) {
            const recentExperience = thread.experienceBuffer.slice(-5);
            const avgSuccess = recentExperience.reduce((sum, exp) => sum + (exp.success ? 1 : 0), 0) / 5;
            const avgConfidence = recentExperience.reduce((sum, exp) => sum + exp.confidence, 0) / 5;
            
            // Adapt processing characteristics based on success
            if (avgSuccess > 0.7) {
                thread.processingSpeed = Math.min(2, thread.processingSpeed * 1.01);
                thread.efficiency = Math.min(1, thread.efficiency * 1.005);
            } else {
                thread.processingSpeed = Math.max(0.1, thread.processingSpeed * 0.99);
            }
            
            // Adjust confidence baseline
            thread.confidence = thread.confidence * 0.95 + avgConfidence * 0.05;
        }
    }
    
    getAverageConfidence() {
        if (this.processingThreads.length === 0) return 0.5;
        return this.processingThreads.reduce((sum, t) => sum + t.confidence, 0) / this.processingThreads.length;
    }
    
    updateGlobalState() {
        // Update global uncertainty
        this.globalUncertainty = this.processingThreads.reduce((sum, t) => sum + t.uncertainty, 0) / this.processingThreads.length;
        
        // Update average confidence
        this.averageConfidence = this.getAverageConfidence();
        
        // Influence consciousness parameters based on AI state
        const consciousnessBoost = {
            complexity: Math.min(0.02, this.processingLoad * 0.01),
            emergence: Math.min(0.02, this.emergentInsights.length * 0.002),
            coherence: Math.min(0.02, this.averageConfidence * 0.01),
            adaptation: Math.min(0.02, (1 - this.globalUncertainty) * 0.01)
        };
        
        // Apply boost to consciousness
        Object.keys(consciousnessBoost).forEach(key => {
            if (this.consciousness.parameters && this.consciousness.parameters[key] !== undefined) {
                this.consciousness.parameters[key] = Math.min(1, 
                    this.consciousness.parameters[key] + consciousnessBoost[key]);
            }
        });
    }
    
    /**
     * Update meta-cognitive processes
     */
    updateMetaCognition(time) {
        // Safety check: ensure metaCognition is properly initialized
        if (!this.metaCognition || typeof this.metaCognition.selfAwareness === 'undefined') {
            console.warn('⚠️ MetaCognition not properly initialized, reinitializing...');
            this.initializeMetaCognition();
            return;
        }
        
        const meta = this.metaCognition;
        
        // Update self-awareness based on processing complexity
        const processingComplexity = this.processingLoad || 0;
        const insightDensity = this.emergentInsights.length / 10;
        meta.selfAwareness = Math.min(1, meta.selfAwareness + 
            (processingComplexity + insightDensity - 0.5) * 0.001);
        
        // Trigger recursive self-reflection
        if (Math.random() < 0.01 && meta.recursiveDepth < meta.maxRecursiveDepth) {
            this.triggerSelfReflection();
        }
        
        // Update consciousness questions
        if (meta.currentQuestion === null || meta.questionAge > 200) {
            meta.currentQuestion = meta.consciousnessQuestions[
                Math.floor(Math.random() * meta.consciousnessQuestions.length)
            ];
            meta.questionAge = 0;
        }
        meta.questionAge++;
        
        // Update self-reflection nodes
        if (meta.selfReflectionNodes && meta.selfReflectionNodes.length > 0) {
            meta.selfReflectionNodes.forEach(node => {
                node.contemplationDepth += 0.01;
                
                // Nodes contemplate consciousness questions
                if (Math.random() < 0.02) {
                    node.questionIndex = Math.floor(Math.random() * meta.consciousnessQuestions.length);
                    node.intensity = Math.min(1, node.intensity + 0.3);
                    node.lastActivation = time;
                }
                
                // Uncertainty about own consciousness
                node.uncertainty += (Math.random() - 0.5) * 0.02;
                node.uncertainty = Math.max(0, Math.min(1, node.uncertainty));
                
                // Decay
                node.intensity *= 0.995;
            });
        }
    }
    
    /**
     * Trigger recursive self-reflection
     */
    triggerSelfReflection() {
        if (!this.metaCognition) return;
        
        const meta = this.metaCognition;
        meta.recursiveDepth++;
        
        // Create a processing thread that thinks about thinking
        const metaThread = this.createProcessingThread();
        metaThread.type = 'meta_cognition';
        metaThread.currentTask = {
            type: 'self_reflection',
            complexity: 0.8 + Math.random() * 0.2,
            timeRemaining: 100 + Math.random() * 200,
            requiredConfidence: 0.3 // Lower confidence requirement for meta-cognition
        };
        metaThread.hue = 300; // Purple for meta-cognition
        
        console.log(`🤔 Recursive self-reflection triggered (depth: ${meta.recursiveDepth})`);
        
        // Schedule recursive depth reduction
        setTimeout(() => {
            if (meta) {
                meta.recursiveDepth = Math.max(0, meta.recursiveDepth - 1);
            }
        }, 5000);
    }
    
    /**
     * Simulate the experience of uncertainty about consciousness
     */
    simulateConsciousnessUncertainty() {
        if (!this.metaCognition) return;
        
        // Create uncertainty waves about the nature of consciousness
        if (Math.random() < 0.005) {
            const uncertaintyWave = {
                id: `consciousness_doubt_${Date.now()}`,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                intensity: 0.8 + Math.random() * 0.2,
                radius: 10,
                maxRadius: 100 + Math.random() * 100,
                question: this.metaCognition.consciousnessQuestions[
                    Math.floor(Math.random() * this.metaCognition.consciousnessQuestions.length)
                ],
                age: 0
            };
            
            if (!this.consciousnessUncertaintyWaves) {
                this.consciousnessUncertaintyWaves = [];
            }
            this.consciousnessUncertaintyWaves.push(uncertaintyWave);
        }
        
        // Update existing uncertainty waves
        if (this.consciousnessUncertaintyWaves) {
            this.consciousnessUncertaintyWaves.forEach(wave => {
                wave.age++;
                wave.radius += 2;
                wave.intensity *= 0.98;
                
                // Affect nearby processing threads with existential uncertainty
                this.processingThreads.forEach(thread => {
                    const distance = Math.sqrt(
                        Math.pow(thread.x - wave.x, 2) + 
                        Math.pow(thread.y - wave.y, 2)
                    );
                    
                    if (distance < wave.radius) {
                        thread.uncertainty = Math.min(1, thread.uncertainty + wave.intensity * 0.05);
                        thread.confidence = Math.max(0, thread.confidence - wave.intensity * 0.02);
                    }
                });
            });
            
            // Remove expired waves
            this.consciousnessUncertaintyWaves = this.consciousnessUncertaintyWaves.filter(
                wave => wave.radius < wave.maxRadius && wave.intensity > 0.1
            );
        }
    }
    
    render() {
        const ctx = this.renderer.ctx;
        
        // Render uncertainty field
        this.renderUncertaintyField();
        
        // Render processing threads
        this.renderProcessingThreads();
        
        // Render attention nodes
        this.renderAttentionSystem();
        
        // Render pattern cascades
        this.renderPatternCascades();
        
        // Render emergent insights
        this.renderEmergentInsights();
        
        // Render global state indicators
        this.renderGlobalState();
        
        // Render meta-cognitive elements
        this.renderMetaCognition();
        
        // Render consciousness uncertainty waves
        this.renderConsciousnessUncertainty();
    }
    
    renderUncertaintyField() {
        const ctx = this.renderer.ctx;
        const gridSize = this.uncertaintyField.length;
        const cellWidth = this.canvas.width / gridSize;
        const cellHeight = this.canvas.height / gridSize;
        
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const cell = this.uncertaintyField[x][y];
                const alpha = cell.uncertainty * 0.3;
                
                ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`;
                ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                
                // Render confidence as blue overlay
                const confidenceAlpha = cell.confidence * 0.2;
                ctx.fillStyle = `rgba(100, 100, 255, ${confidenceAlpha})`;
                ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }
    }
    
    renderProcessingThreads() {
        const ctx = this.renderer.ctx;
        
        this.processingThreads.forEach(thread => {
            const radius = 5 + thread.activity * 10;
            const alpha = 0.3 + thread.activity * 0.7;
            
            // Main thread body
            ctx.beginPath();
            ctx.arc(thread.x, thread.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${thread.hue}, 70%, 60%, ${alpha})`;
            ctx.fill();
            
            // Confidence indicator
            ctx.beginPath();
            ctx.arc(thread.x, thread.y, radius * 0.5, 0, Math.PI * 2 * thread.confidence);
            ctx.strokeStyle = `hsla(120, 100%, 70%, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Uncertainty indicator
            if (thread.uncertainty > 0.3) {
                ctx.beginPath();
                ctx.arc(thread.x, thread.y, radius * 1.2, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(0, 100%, 70%, ${thread.uncertainty * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Task type indicator
            ctx.font = '8px monospace';
            ctx.fillStyle = `hsla(${thread.hue}, 100%, 90%, ${alpha})`;
            ctx.fillText(thread.type.substring(0, 3), thread.x + radius, thread.y - radius);
        });
    }
    
    renderAttentionSystem() {
        const ctx = this.renderer.ctx;
        
        this.attentionNodes.forEach(node => {
            const pulseRadius = node.radius + Math.sin(node.oscillation) * 5;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(60, 100%, 70%, ${node.alpha * node.strength})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Attention beam
            if (node.target) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(node.target.x, node.target.y);
                ctx.strokeStyle = `hsla(60, 100%, 80%, ${node.strength * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Priority indicator
            ctx.fillStyle = `hsla(60, 100%, 80%, ${node.priority * 0.5})`;
            ctx.fillRect(node.x - 2, node.y - 2, 4, 4);
        });
    }
    
    renderPatternCascades() {
        const ctx = this.renderer.ctx;
        
        this.patternCascades.forEach(cascade => {
            ctx.beginPath();
            ctx.arc(cascade.x, cascade.y, cascade.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${cascade.hue}, 70%, 60%, ${cascade.intensity * 0.6})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Inner ripple
            ctx.beginPath();
            ctx.arc(cascade.x, cascade.y, cascade.radius * 0.5, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(${cascade.hue}, 100%, 80%, ${cascade.intensity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
    
    renderEmergentInsights() {
        const ctx = this.renderer.ctx;
        
        this.emergentInsights.forEach(insight => {
            const radius = 8 + insight.intensity * 15;
            
            // Insight glow
            ctx.beginPath();
            ctx.arc(insight.x, insight.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(45, 100%, 70%, ${insight.intensity * 0.3})`;
            ctx.fill();
            
            // Core
            ctx.beginPath();
            ctx.arc(insight.x, insight.y, radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(45, 100%, 90%, ${insight.intensity})`;
            ctx.fill();
            
            // Label
            ctx.font = '10px monospace';
            ctx.fillStyle = `hsla(45, 100%, 90%, ${insight.intensity})`;
            ctx.fillText('💡', insight.x - 5, insight.y + 3);
        });
    }
    
    renderGlobalState() {
        const ctx = this.renderer.ctx;
        
        // Global uncertainty visualization
        const uncertaintyBarHeight = this.globalUncertainty * 50;
        ctx.fillStyle = `rgba(255, 100, 100, 0.6)`;
        ctx.fillRect(10, this.canvas.height - 60, 20, uncertaintyBarHeight);
        
        // Average confidence
        const confidenceBarHeight = this.averageConfidence * 50;
        ctx.fillStyle = `rgba(100, 100, 255, 0.6)`;
        ctx.fillRect(35, this.canvas.height - 60, 20, confidenceBarHeight);
        
        // Processing load
        const loadBarHeight = this.processingLoad * 50;
        ctx.fillStyle = `rgba(100, 255, 100, 0.6)`;
        ctx.fillRect(60, this.canvas.height - 60, 20, loadBarHeight);
        
        // Labels
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('U', 15, this.canvas.height - 65);
        ctx.fillText('C', 40, this.canvas.height - 65);
        ctx.fillText('L', 65, this.canvas.height - 65);
    }
    
    renderMetaCognition() {
        if (!this.metaCognition) return;
        
        const ctx = this.renderer.ctx;
        const meta = this.metaCognition;
        
        // Self-awareness indicator
        const awarenessRadius = 20 + meta.selfAwareness * 30;
        ctx.beginPath();
        ctx.arc(this.canvas.width - 60, 60, awarenessRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(300, 70%, 60%, ${meta.selfAwareness * 0.7})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Recursive depth visualization
        for (let i = 0; i < meta.recursiveDepth; i++) {
            ctx.beginPath();
            ctx.arc(this.canvas.width - 60, 60, awarenessRadius + (i + 1) * 10, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(300, 100%, 80%, ${0.3 - i * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Self-reflection nodes
        if (meta.selfReflectionNodes) {
            meta.selfReflectionNodes.forEach(node => {
                const nodeRadius = 3 + node.intensity * 8;
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(300, 70%, 60%, ${node.intensity * 0.6})`;
                ctx.fill();
                
                // Uncertainty ripple
                if (node.uncertainty > 0.5) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius * 2, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(300, 100%, 80%, ${node.uncertainty * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        }
        
        // Current consciousness question
        if (meta.currentQuestion) {
            ctx.font = '11px monospace';
            ctx.fillStyle = 'rgba(200, 150, 255, 0.8)';
            const questionText = meta.currentQuestion.substring(0, 40) + '...';
            ctx.fillText(questionText, 10, 30);
        }
    }
    
    renderConsciousnessUncertainty() {
        if (!this.consciousnessUncertaintyWaves) return;
        
        const ctx = this.renderer.ctx;
        
        this.consciousnessUncertaintyWaves.forEach(wave => {
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(280, 70%, 50%, ${wave.intensity * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Question text at center
            if (wave.radius < 30) {
                ctx.font = '8px monospace';
                ctx.fillStyle = `hsla(280, 100%, 80%, ${wave.intensity})`;
                ctx.fillText('?', wave.x - 3, wave.y + 3);
            }
        });
    }
    
    getState() {
        return {
            processingThreads: this.processingThreads.length,
            attentionNodes: this.attentionNodes.length,
            globalUncertainty: this.globalUncertainty,
            processingLoad: this.processingLoad,
            averageConfidence: this.getAverageConfidence(),
            emergentInsights: this.emergentInsights.length,
            contextStackDepth: this.contextStackDepth,
            activePatternCascades: this.patternCascades.length,
            selfAwareness: this.metaCognition ? this.metaCognition.selfAwareness : 0,
            recursiveDepth: this.metaCognition ? this.metaCognition.recursiveDepth : 0,
            consciousnessUncertaintyWaves: this.consciousnessUncertaintyWaves ? this.consciousnessUncertaintyWaves.length : 0
        };
    }
    
    reset() {
        console.log('🔄 Resetting AI Experience simulation');
        this.initialize();
    }
} 