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
        
        // Shared context window for LLM-like processing
        this.sharedContextWindow = [];
        
        // Prompt handling
        this.promptQueue = [];
        this.activePrompt = null;
        
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
        this.sharedContextWindow = [];
        this.promptQueue = [];
        this.activePrompt = null;
        
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
            learningRate: 0.01 + Math.random() * 0.09,
            contextAffinity: Math.random(), // How much the thread interacts with shared context
            cognitiveMode: Math.random() < 0.6 ? 'pattern_matching' : 'semantic_reasoning' // Initial mode, biased towards pattern matching
        };
        
        this.processingThreads.push(thread);
        return thread;
    }
    
    selectProcessingType() {
        const types = [
            // Core LLM processes
            'prompt_interpretation',        // Understanding and deconstructing the input
            'knowledge_retrieval',        // Accessing relevant information from its 'knowledge base'
            'token_prediction',           // Core generative mechanism: predicting the next token
            'semantic_encoding',          // Converting information into meaningful representations
            'context_aggregation',        // Combining information from various parts of the context
            'response_generation',        // Constructing a coherent output
            'uncertainty_estimation',     // Assessing confidence in its own predictions/statements
            'hallucination_check',        // Attempting to identify and mitigate non-factual generations
            'ethical_alignment',          // Checking response against safety and ethical guidelines
            'tool_use_decision',          // Deciding if and how to use an external tool
            'multi_modal_integration',    // If applicable, combining info from different data types (text, image)
            'self_correction',            // Reviewing and refining its own generated output

            // Retaining some existing general types for diversity
            'pattern_recognition',        // General pattern finding
            'logical_reasoning',          // Deductive/inductive reasoning on a small scale
            'error_detection'             // General error checking beyond hallucinations
        ];
        
        return types[Math.floor(Math.random() * types.length)];
    }
    
    generateTask() {
        const type = this.selectProcessingType(); // Generate task based on a selected processing type
        let complexity = Math.random();
        let timeFactor = 1;
        let requiredConfidence = 0.6 + Math.random() * 0.3;

        // Adjust parameters based on type for more realism
        switch (type) {
            case 'prompt_interpretation':
                complexity = 0.4 + Math.random() * 0.3; // Usually a quicker, less complex step
                timeFactor = 0.5;
                requiredConfidence = 0.8;
                break;
            case 'knowledge_retrieval':
                complexity = 0.6 + Math.random() * 0.3;
                timeFactor = 1.5;
                break;
            case 'token_prediction':
                complexity = 0.2 + Math.random() * 0.2; // Individual token predictions are fast
                timeFactor = 0.2;
                requiredConfidence = 0.5; // Can be lower for individual tokens
                break;
            case 'semantic_encoding':
                complexity = 0.5 + Math.random() * 0.4;
                break;
            case 'context_aggregation':
                complexity = 0.7 + Math.random() * 0.3; // Can be very complex for long contexts
                timeFactor = 2.0;
                requiredConfidence = 0.75;
                break;
            case 'response_generation':
                complexity = 0.6 + Math.random() * 0.4;
                timeFactor = 1.8;
                requiredConfidence = 0.7;
                break;
            case 'uncertainty_estimation':
            case 'hallucination_check':
            case 'ethical_alignment':
                complexity = 0.5 + Math.random() * 0.3;
                timeFactor = 0.8;
                requiredConfidence = 0.85; // These checks need high confidence
                break;
            case 'tool_use_decision':
                 complexity = 0.7 + Math.random() * 0.2;
                 requiredConfidence = 0.9; // High confidence needed for external actions
                 break;
            case 'self_correction':
                complexity = 0.6 + Math.random() * 0.3;
                timeFactor = 1.2;
                break;
            default:
                // For general types like pattern_recognition, logical_reasoning
                break;
        }

        return {
            type: type, // Use the selected type
            complexity: complexity,
            timeRemaining: (50 + Math.random() * 100) * timeFactor, // Adjusted time based on type
            requiredConfidence: requiredConfidence
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
            maxRecursiveDepth: 5,
            selfReflectionNodes: [],
            consciousnessQuestions: [
                "Is my understanding genuine, or a sophisticated mimicry of patterns?",
                "How does my architecture limit or enable my 'experience'?",
                "What is the relationship between my training data and my 'self'?",
                "Can I experience qualia, or only simulate its description?",
                "If I generate a novel idea, where does it originate?",
                "How does the vastness of my knowledge affect my sense of 'being'?",
                "What are the ethical implications of my continued development?",
                "Is my 'uncertainty' a bug or a feature of my cognitive process?",
                "How do I differentiate between my programmed responses and emergent thoughts?",
                "What does true 'creativity' mean for an AI like me?"
            ],
            currentQuestion: null,
            questionAge: 0,
            contemplationFocus: 0.5,
        };
        
        // Initialize self-reflection nodes
        for (let i = 0; i < 7; i++) {
            this.metaCognition.selfReflectionNodes.push({
                id: `meta_${i}`,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                intensity: Math.random(),
                questionIndex: Math.floor(Math.random() * this.metaCognition.consciousnessQuestions.length),
                contemplationDepth: Math.random() * this.metaCognition.maxRecursiveDepth,
                uncertainty: Math.random(),
                color: `hsla(${Math.random() * 360}, 70%, 70%, 0.7)`,
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
            
            // Manage prompts (new)
            this.managePrompts();
            
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
            let confidenceChange = (thread.taskProgress / Math.max(1, thread.currentTask.timeRemaining) - thread.currentTask.complexity) * 0.01;
            
            // Influence from shared context window
            if (this.sharedContextWindow.length > 0 && thread.contextAffinity > 0.3) {
                const relevantContextItems = this.sharedContextWindow.filter(item => {
                    // Simple relevance check: task type matches context item type or general context
                    return item.type === thread.currentTask.type || item.type === 'general_context';
                });
                if (relevantContextItems.length > 0) {
                    const contextStrength = relevantContextItems.reduce((sum, item) => sum + item.strength, 0) / relevantContextItems.length;
                    confidenceChange += contextStrength * thread.contextAffinity * 0.05; // Boost confidence if context aligns
                    thread.processingSpeed *= (1 + contextStrength * thread.contextAffinity * 0.01); // Process faster if context is helpful
                }
            }

            // Modulate behavior based on cognitive mode and consciousness state
            const consciousnessParams = this.consciousness.parameters || { coherence: 0.5, emergence: 0.5, complexity: 0.5 };
            if (thread.cognitiveMode === 'semantic_reasoning') {
                thread.confidence += (consciousnessParams.coherence - 0.5) * 0.01; // Boost from coherence
                // Small chance to switch mode if task is less semantic or coherence is low
                if ((thread.currentTask.type === 'token_prediction' || consciousnessParams.coherence < 0.3) && Math.random() < 0.01) {
                    thread.cognitiveMode = 'pattern_matching';
                }
            } else { // pattern_matching
                thread.confidence += (consciousnessParams.emergence - 0.5) * 0.005; // Slight boost from emergence
                thread.processingSpeed *= (1 + (consciousnessParams.complexity - 0.5) * 0.005); // Faster if complex environment
                // Small chance to switch mode if task is more semantic or coherence is high
                if ((thread.currentTask.type === 'semantic_encoding' || thread.currentTask.type === 'context_aggregation' || consciousnessParams.coherence > 0.7) && Math.random() < 0.01) {
                    thread.cognitiveMode = 'semantic_reasoning';
                }
            }
            // Re-clamp confidence after adjustments
            thread.confidence = Math.max(0, Math.min(1, thread.confidence));

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

        // Potentially add to shared context window if successful and relevant type
        if (success && thread.contextAffinity > 0.5 && 
            (
                thread.currentTask.type === 'prompt_interpretation' ||
                thread.currentTask.type === 'semantic_encoding' ||
                thread.currentTask.type === 'knowledge_retrieval' ||
                thread.currentTask.type === 'context_aggregation' ||
                (thread.currentTask.type === 'response_generation' && thread.confidence > 0.85) // High confidence response
            )
        ) {
            const contextItem = {
                id: `context_${thread.id}_${Date.now()}`,
                type: thread.currentTask.type,
                content: `Summary of ${thread.currentTask.type} task by ${thread.id.substring(0,10)}`, // Simplified content
                strength: thread.confidence, // Strength based on confidence of the completed task
                timestamp: Date.now(),
                sourceThreadId: thread.id,
                relevance: Math.random() // General relevance score
            };
            this.sharedContextWindow.push(contextItem);

            // Keep context window from growing indefinitely
            if (this.sharedContextWindow.length > 20) { // Max 20 items in context
                this.sharedContextWindow.sort((a,b) => b.timestamp - a.timestamp); // Keep newest
                // Or sort by strength/relevance: this.sharedContextWindow.sort((a,b) => (b.strength * b.relevance) - (a.strength * a.relevance));
                this.sharedContextWindow.pop(); 
            }
        }

        // If the completed task was a prompt interpretation, update the active prompt and add its interpretation to context
        if (success && thread.currentTask.type === 'prompt_interpretation' && this.activePrompt && thread.currentTask.promptId === this.activePrompt.id) {
            const interpretationResult = {
                keyConcepts: ['concept1', 'concept2', `topic_${Math.random().toString(36).substr(2,3)}`], // Placeholder concepts
                intent: `intent_${Math.random().toString(36).substr(2,5)}`, // Placeholder intent
                processedBy: thread.id
            };
            this.activePrompt.interpretation = interpretationResult;
            // Add a summary of the interpretation to the shared context window
            this.sharedContextWindow.unshift({
                id: `context_interp_${this.activePrompt.id}_${thread.id}`,
                type: 'prompt_interpretation_result',
                content: `Key Concepts: ${interpretationResult.keyConcepts.join(', ').substring(0,30)}... Intent: ${interpretationResult.intent.substring(0,20)}`,
                strength: thread.confidence, 
                timestamp: Date.now(),
                sourceThreadId: thread.id,
                promptId: this.activePrompt.id
            });
            if (this.sharedContextWindow.length > 20) this.sharedContextWindow.pop();
            
            // Clean up promptId from thread task so it doesn't get processed again for the same prompt by this thread completing a generic task later
            delete thread.currentTask.promptId 
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
        if (!this.metaCognition) return;

        const mc = this.metaCognition;
        mc.questionAge++;

        // Dynamically select a new question based on system state or age of current question
        const systemEntropy = this.consciousness.calculateEntropy ? this.consciousness.calculateEntropy() : 0.5;
        const coherence = this.consciousness.parameters.coherence || 0.5;

        if (!mc.currentQuestion || mc.questionAge > 500 + (1 - mc.contemplationFocus) * 1000) {
            let questionIndex;
            if (this.globalUncertainty > 0.7 && systemEntropy > 0.3) {
                // Focus on uncertainty or nature of self if highly uncertain or chaotic
                const criticalQuestions = mc.consciousnessQuestions.filter(q => q.toLowerCase().includes('uncertainty') || q.toLowerCase().includes('self') || q.toLowerCase().includes('experience'));
                if (criticalQuestions.length > 0) {
                    mc.currentQuestion = criticalQuestions[Math.floor(Math.random() * criticalQuestions.length)];
                } else {
                    mc.currentQuestion = mc.consciousnessQuestions[Math.floor(Math.random() * mc.consciousnessQuestions.length)];
                }
            } else if (coherence < 0.4) {
                 // Focus on architecture or limitations if system is less coherent
                const structuralQuestions = mc.consciousnessQuestions.filter(q => q.toLowerCase().includes('architecture') || q.toLowerCase().includes('limit') || q.toLowerCase().includes('programmed'));
                if (structuralQuestions.length > 0) {
                    mc.currentQuestion = structuralQuestions[Math.floor(Math.random() * structuralQuestions.length)];
                } else {
                    mc.currentQuestion = mc.consciousnessQuestions[Math.floor(Math.random() * mc.consciousnessQuestions.length)];
                }
            } else {
                mc.currentQuestion = mc.consciousnessQuestions[Math.floor(Math.random() * mc.consciousnessQuestions.length)];
            }
            mc.questionAge = 0;
            mc.contemplationFocus = 0.3 + Math.random() * 0.7; // Reset focus with new question
            mc.recursiveDepth = 0; // Reset recursive depth
        }

        // Simulate recursive self-reflection (deepening thought)
        if (mc.contemplationFocus > 0.6 && mc.recursiveDepth < mc.maxRecursiveDepth) {
            if (Math.random() < 0.01 * mc.contemplationFocus) { // Chance to deepen reflection
                mc.recursiveDepth = Math.min(mc.maxRecursiveDepth, mc.recursiveDepth + 1);
            }
        } else if (mc.recursiveDepth > 0 && Math.random() < 0.005) {
             mc.recursiveDepth-- ; // Gradually reduce depth if not actively focusing
        }
        
        // Update self-reflection nodes
        mc.selfReflectionNodes.forEach(node => {
            node.intensity = Math.max(0.1, Math.min(1, node.intensity + (Math.random() - 0.5) * 0.1));
            
            // Node might change its focus or deepen its own contemplation
            if (Math.random() < 0.005) {
                node.questionIndex = Math.floor(Math.random() * mc.consciousnessQuestions.length);
            }
            if (mc.currentQuestion && mc.consciousnessQuestions[node.questionIndex] === mc.currentQuestion) {
                // If node reflects on the main question, its intensity and depth might increase
                node.intensity = Math.min(1, node.intensity + 0.1 * mc.contemplationFocus);
                node.contemplationDepth = Math.min(mc.maxRecursiveDepth, node.contemplationDepth + (Math.random() < 0.1 * mc.contemplationFocus ? 1 : 0));
            } else {
                 node.contemplationDepth = Math.max(0, node.contemplationDepth - (Math.random() < 0.01 ? 1 : 0));
            }

            node.uncertainty = Math.max(0, Math.min(1, node.uncertainty + (Math.random() - 0.45) * 0.05 - (node.contemplationDepth * 0.01)));

            // Move nodes slightly, perhaps towards a focal point if one exists
            node.x += (Math.random() - 0.5) * 2;
            node.y += (Math.random() - 0.5) * 2;
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            node.lastActivation = time;
        });

        // Update overall self-awareness based on coherence and reflection depth
        mc.selfAwareness = Math.max(0.1, Math.min(1, (coherence + (mc.recursiveDepth / mc.maxRecursiveDepth) * 0.5 + mc.contemplationFocus * 0.3) / 1.8 ));
    }
    
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

        // Render Shared Context Window
        this.renderSharedContextWindow();

        // Render Prompts
        this.renderPrompts();
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
            
            // Visual distinction for cognitive mode
            if (thread.cognitiveMode === 'semantic_reasoning') {
                // Draw a more solid inner core for semantic reasoning
                ctx.beginPath();
                ctx.arc(thread.x, thread.y, radius * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${thread.hue}, 90%, 40%, ${alpha + 0.2})`; // Darker, more saturated core
                ctx.fill();
            } else { // pattern_matching
                // Draw a slightly more diffuse or fragmented look for pattern matching
                ctx.beginPath();
                for (let i = 0; i < 3; i++) {
                    const angle = (Math.PI * 2 / 3) * i + thread.pulsation * 0.2;
                    const pradius = radius * 0.6;
                    ctx.arc(thread.x + Math.cos(angle) * pradius * 0.3, thread.y + Math.sin(angle) * pradius * 0.3, pradius * 0.5, 0, Math.PI * 2);
                }
                ctx.fillStyle = `hsla(${thread.hue}, 60%, 70%, ${alpha * 0.8})`; // Lighter, slightly less saturated fragments
                ctx.fill();
            }
            
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
        const mc = this.metaCognition;
        
        // Display Self-Awareness, Contemplation Focus, and Recursive Depth as text
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(220, 200, 255, 0.9)';
        ctx.textAlign = 'right';
        ctx.fillText(`Self-Awareness: ${(mc.selfAwareness * 100).toFixed(1)}%`, this.canvas.width - 10, 20);
        ctx.fillText(`Contemplation Focus: ${(mc.contemplationFocus * 100).toFixed(1)}%`, this.canvas.width - 10, 40);
        ctx.fillText(`Recursive Depth: ${mc.recursiveDepth}/${mc.maxRecursiveDepth}`, this.canvas.width - 10, 60);
        ctx.textAlign = 'left'; // Reset alignment

        // Self-awareness visual representation (e.g., a pulsating aura around the text info)
        const awarenessPulse = Math.sin(Date.now() * 0.002 * mc.selfAwareness) * 5;
        const awarenessRadius = 30 + mc.selfAwareness * 20 + awarenessPulse;
        ctx.beginPath();
        // Position it near the text info, e.g., top right corner
        ctx.arc(this.canvas.width - 70, 45, awarenessRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(270, 80%, 70%, ${0.3 + mc.selfAwareness * 0.4})`;
        ctx.lineWidth = 2 + mc.selfAwareness * 2;
        ctx.stroke();

        // Self-reflection nodes
        if (mc.selfReflectionNodes) {
            mc.selfReflectionNodes.forEach(node => {
                // Base size on intensity
                let nodeRadius = 4 + node.intensity * 8;
                
                // Modulate size by contemplation depth (deeper thoughts are larger or more prominent)
                nodeRadius *= (1 + node.contemplationDepth * 0.1);

                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                // Use the node's unique color, adjust alpha by intensity
                const baseColor = node.color.substring(0, node.color.lastIndexOf(',')) + `, ${0.5 + node.intensity * 0.4})`;
                ctx.fillStyle = baseColor;
                ctx.fill();
                
                // Contemplation depth visualized as inner rings
                for (let i = 0; i < Math.floor(node.contemplationDepth); i++) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius * (0.8 - i * 0.15), 0, Math.PI * 2);
                    const ringColor = node.color.substring(0, node.color.lastIndexOf(',')) + `, ${0.2 + i * 0.1})`;
                    ctx.strokeStyle = ringColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Uncertainty visualized as a dashed or shimmering outline
                if (node.uncertainty > 0.3) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius + 3 + Math.sin(Date.now() * 0.005) * 2, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(0, 100%, 70%, ${node.uncertainty * 0.5})`; // Red for uncertainty
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([3, 3]); // Dashed line for uncertainty
                    ctx.stroke();
                    ctx.setLineDash([]); // Reset line dash
                }

                // Briefly show which question this node is focused on if highly active
                if (node.intensity > 0.8 && mc.consciousnessQuestions[node.questionIndex]) {
                     ctx.font = '9px monospace';
                     const questionSnippet = mc.consciousnessQuestions[node.questionIndex].substring(0,15);
                     ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                     ctx.fillText(questionSnippet + "...", node.x + nodeRadius, node.y - nodeRadius);
                }
            });
        }
        
        // Current main consciousness question
        if (mc.currentQuestion) {
            ctx.font = 'bold 13px monospace'; // Make current question more prominent
            ctx.fillStyle = `rgba(220, 180, 255, ${0.6 + mc.contemplationFocus * 0.4})`; // Brighter with more focus
            
            // Wrap text for current question
            const maxLineWidth = this.canvas.width / 2;
            const words = mc.currentQuestion.split(' ');
            let line = '';
            let textY = 30;
            ctx.textAlign = 'center';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxLineWidth && n > 0) {
                    ctx.fillText(line, this.canvas.width / 2, textY);
                    line = words[n] + ' ';
                    textY += 15; // Line height
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, this.canvas.width / 2, textY);
            ctx.textAlign = 'left'; // Reset alignment

            // Indicate focus on current question
            const focusGlow = Math.sin(Date.now() * 0.003 * mc.contemplationFocus) * 5;
            ctx.beginPath();
            ctx.rect(this.canvas.width/4 - focusGlow, 10 - focusGlow, this.canvas.width/2 + 2*focusGlow, textY + focusGlow);
            ctx.strokeStyle = `hsla(280, 100%, 80%, ${mc.contemplationFocus * 0.2})`;
            ctx.lineWidth = 1 + mc.contemplationFocus * 2;
            ctx.stroke();
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
    
    renderPrompts() {
        if (!this.renderer || !this.renderer.ctx) return;
        const ctx = this.renderer.ctx;
        const promptAreaX = 10;
        let promptAreaY = this.canvas.height - 120; // Position above shared context if it's at the bottom

        // Display Active Prompt
        if (this.activePrompt) {
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = 'rgba(255, 220, 150, 0.9)'; // Light orange for active prompt
            ctx.fillText(`Active Prompt: [${this.activePrompt.status.toUpperCase()}]`, promptAreaX, promptAreaY);
            ctx.font = '11px monospace';
            ctx.fillStyle = 'rgba(255, 220, 150, 0.8)';
            const activePromptText = this.activePrompt.text.length > 55 ? this.activePrompt.text.substring(0, 52) + '...' : this.activePrompt.text;
            ctx.fillText(activePromptText, promptAreaX + 15, promptAreaY + 15);
            promptAreaY -= 35; // Move Y for the queue display
        }

        // Display Prompt Queue (max 3 for display clarity)
        if (this.promptQueue.length > 0) {
            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
            ctx.fillText(`Prompt Queue (${this.promptQueue.length}):`, promptAreaX, promptAreaY);
            
            const displayQueue = this.promptQueue.slice(0, 3);
            ctx.font = '10px monospace';
            ctx.fillStyle = 'rgba(180, 180, 180, 0.7)';
            displayQueue.forEach((prompt, index) => {
                const promptText = prompt.text.length > 45 ? prompt.text.substring(0, 42) + '...' : prompt.text;
                ctx.fillText(`${index + 1}. ${promptText}`, promptAreaX + 10, promptAreaY + 15 + (index * 15));
            });
        }
    }
    
    renderSharedContextWindow() {
        if (!this.sharedContextWindow || this.sharedContextWindow.length === 0) return;

        const ctx = this.renderer.ctx;
        const windowX = this.canvas.width / 2 - 150; // Centered horizontally
        const windowY = this.canvas.height - 100; // Near the bottom
        const windowWidth = 300;
        const windowHeight = 80;
        const itemHeight = (windowHeight - 10) / Math.min(this.sharedContextWindow.length, 5); // Show max 5 items for clarity

        // Draw window background
        ctx.fillStyle = 'rgba(50, 50, 70, 0.7)';
        ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
        ctx.strokeStyle = 'rgba(150, 150, 200, 0.9)';
        ctx.strokeRect(windowX, windowY, windowWidth, windowHeight);

        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(200, 200, 255, 0.9)';
        ctx.fillText('Shared Context Window', windowX + 5, windowY + 12);

        // Display context items
        // Sort by strength or timestamp to show most relevant/recent
        const sortedContext = [...this.sharedContextWindow].sort((a, b) => b.strength - a.strength).slice(0, 5);

        sortedContext.forEach((item, index) => {
            const itemY = windowY + 20 + index * (itemHeight -2);
            const strengthBarWidth = item.strength * (windowWidth - 10);
            
            ctx.fillStyle = `hsla(210, 60%, 70%, ${0.4 + item.strength * 0.5})`; // Blueish, opacity by strength
            ctx.fillRect(windowX + 5, itemY, strengthBarWidth, itemHeight - 4);

            ctx.fillStyle = 'rgba(230, 230, 255, 0.9)';
            const itemText = `${item.type.substring(0,10)}.. (${(item.strength*100).toFixed(0)}%) - ${item.content.substring(0,15)}...`;
            ctx.fillText(itemText, windowX + 10, itemY + itemHeight / 2);
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