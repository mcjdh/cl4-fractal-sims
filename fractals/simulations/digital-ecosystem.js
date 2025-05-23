/**
 * Digital Ecosystem Simulation
 * An autonomous ecosystem of digital entities that interact, compete, cooperate, and evolve
 */

export class DigitalEcosystemSimulation {
    constructor(canvas, consciousness, renderer) {
        this.canvas = canvas;
        this.consciousness = consciousness;
        this.renderer = renderer;
        this.ctx = canvas.getContext('2d');
        
        // Ecosystem configuration
        this.config = {
            entityCount: 150,
            maxAge: 300,
            reproductionRate: 0.003,
            mutationRate: 0.1,
            competitionRadius: 50,
            cooperationRadius: 30,
            resourceDensity: 0.7,
            predatorPrey: true,
            symbiosis: true
        };
        
        // Entity types with different behaviors
        this.entityTypes = {
            producer: { color: [0, 255, 100], energy: 50, speed: 0.5, size: 3 },
            consumer: { color: [255, 100, 0], energy: 40, speed: 1.2, size: 4 },
            decomposer: { color: [100, 0, 255], energy: 30, speed: 0.8, size: 2.5 },
            predator: { color: [255, 0, 0], energy: 60, speed: 1.5, size: 5 },
            symbiont: { color: [255, 255, 0], energy: 35, speed: 1.0, size: 3.5 }
        };
        
        // Environment state
        this.environment = {
            resources: [],
            toxins: [],
            temperature: 0.5,
            oxygen: 0.8,
            nutrients: 0.6
        };
        
        // Population dynamics
        this.populations = {
            producer: [],
            consumer: [],
            decomposer: [],
            predator: [],
            symbiont: []
        };
        
        // Evolution tracking
        this.evolution = {
            generation: 0,
            avgFitness: 0,
            diversity: 0,
            cooperation: 0,
            competition: 0,
            complexity: 0
        };
        
        // Network connections between entities
        this.connectionNetwork = new Map();
        
        this.initialize();
    }
    
    /**
     * Initialize the ecosystem
     */
    initialize() {
        this.initializeEnvironment();
        this.initializePopulations();
        this.setupInteractionNetworks();
        
        console.log('🌍 Digital Ecosystem initialized with multiple species and interactions');
    }
    
    /**
     * Initialize environmental resources and conditions
     */
    initializeEnvironment() {
        // Create resource patches
        for (let i = 0; i < this.canvas.width * this.canvas.height * this.config.resourceDensity / 5000; i++) {
            this.environment.resources.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                value: Math.random() * 20 + 10,
                type: Math.random() > 0.5 ? 'energy' : 'nutrients',
                regeneration: Math.random() * 0.1 + 0.05
            });
        }
        
        // Occasional toxin events
        if (Math.random() < 0.1) {
            this.environment.toxins.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 50 + 20,
                toxicity: Math.random() * 0.5 + 0.3,
                decay: 0.02
            });
        }
    }
    
    /**
     * Initialize populations of different entity types
     */
    initializePopulations() {
        const typeNames = Object.keys(this.entityTypes);
        const entitiesPerType = Math.floor(this.config.entityCount / typeNames.length);
        
        typeNames.forEach(typeName => {
            for (let i = 0; i < entitiesPerType; i++) {
                this.populations[typeName].push(this.createEntity(typeName));
            }
        });
    }
    
    /**
     * Create a new entity with evolved characteristics
     */
    createEntity(type, parent = null) {
        const baseStats = this.entityTypes[type];
        const state = this.consciousness.getState();
        
        // Genetic inheritance and mutation
        let genetics = parent ? { ...parent.genetics } : {};
        if (parent && Math.random() < this.config.mutationRate) {
            genetics.speed = Math.max(0.1, genetics.speed + (Math.random() - 0.5) * 0.2);
            genetics.size = Math.max(1, genetics.size + (Math.random() - 0.5) * 0.5);
            genetics.energy = Math.max(10, genetics.energy + (Math.random() - 0.5) * 10);
            genetics.aggression = Math.max(0, Math.min(1, genetics.aggression + (Math.random() - 0.5) * 0.1));
            genetics.cooperation = Math.max(0, Math.min(1, genetics.cooperation + (Math.random() - 0.5) * 0.1));
        } else {
            genetics = {
                speed: baseStats.speed * (0.8 + Math.random() * 0.4),
                size: baseStats.size * (0.8 + Math.random() * 0.4),
                energy: baseStats.energy * (0.8 + Math.random() * 0.4),
                aggression: Math.random() * 0.5,
                cooperation: Math.random() * 0.5,
                adaptability: Math.random(),
                efficiency: Math.random()
            };
        }
        
        return {
            id: Math.random().toString(36).substring(2, 11),
            type: type,
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            energy: genetics.energy,
            maxEnergy: genetics.energy * 1.5,
            age: 0,
            fitness: 0,
            genetics: genetics,
            color: [...baseStats.color],
            relationships: new Map(),
            memory: [],
            currentAction: 'wandering',
            target: null,
            reproductionCooldown: 0,
            lastReproduction: 0,
            evolution: {
                generation: parent ? parent.evolution.generation + 1 : 0,
                lineage: parent ? parent.evolution.lineage + 1 : 0,
                mutations: parent ? parent.evolution.mutations : 0
            }
        };
    }
    
    /**
     * Setup interaction networks between entities
     */
    setupInteractionNetworks() {
        this.connectionNetwork.clear();
        
        // Create initial random connections
        const allEntities = this.getAllEntities();
        allEntities.forEach(entity => {
            this.connectionNetwork.set(entity.id, new Set());
            
            // Random initial connections
            for (let i = 0; i < 3; i++) {
                const other = allEntities[Math.floor(Math.random() * allEntities.length)];
                if (other.id !== entity.id) {
                    this.connectionNetwork.get(entity.id).add(other.id);
                }
            }
        });
    }
    
    /**
     * Get all entities across all populations
     */
    getAllEntities() {
        return Object.values(this.populations).flat();
    }
    
    /**
     * Main update loop
     */
    update() {
        this.updateEnvironment();
        this.updatePopulations();
        this.handleInteractions();
        this.handleReproduction();
        this.handleSelection();
        this.updateEvolutionMetrics();
        this.adaptToConsciousness();
    }
    
    /**
     * Update environmental conditions
     */
    updateEnvironment() {
        const state = this.consciousness.getState();
        
        // Regenerate resources
        this.environment.resources.forEach(resource => {
            resource.value = Math.min(30, resource.value + resource.regeneration);
        });
        
        // Environmental oscillations based on consciousness
        this.environment.temperature = 0.5 + Math.sin(Date.now() * 0.001) * 0.3 * state.parameters.coherence;
        this.environment.oxygen = 0.6 + Math.cos(Date.now() * 0.0015) * 0.2 * state.parameters.emergence;
        this.environment.nutrients = 0.5 + Math.sin(Date.now() * 0.0008) * 0.3 * state.parameters.complexity;
        
        // Decay toxins
        this.environment.toxins = this.environment.toxins.filter(toxin => {
            toxin.toxicity -= toxin.decay;
            toxin.radius *= 0.99;
            return toxin.toxicity > 0.1 && toxin.radius > 5;
        });
        
        // Occasionally add new resources or environmental pressures
        if (Math.random() < 0.01) {
            this.introduceEnvironmentalChange();
        }
    }
    
    /**
     * Update all populations
     */
    updatePopulations() {
        Object.keys(this.populations).forEach(type => {
            this.populations[type] = this.populations[type].filter(entity => {
                this.updateEntity(entity);
                return entity.energy > 0 && entity.age < this.config.maxAge;
            });
        });
    }
    
    /**
     * Update individual entity
     */
    updateEntity(entity) {
        const state = this.consciousness.getState();
        
        // Age and energy decay
        entity.age++;
        entity.energy -= 0.1 + entity.genetics.size * 0.02;
        entity.reproductionCooldown = Math.max(0, entity.reproductionCooldown - 1);
        
        // Determine behavior based on AI consciousness insights
        this.updateEntityBehavior(entity);
        
        // Move entity
        this.moveEntity(entity);
        
        // Environmental interactions
        this.handleEnvironmentalEffects(entity);
        
        // Update fitness
        entity.fitness = this.calculateFitness(entity);
        
        // Memory and learning
        this.updateEntityMemory(entity);
        
        // Evolve color based on consciousness parameters
        this.evolveEntityAppearance(entity, state);
    }
    
    /**
     * Update entity behavior using AI-like decision making
     */
    updateEntityBehavior(entity) {
        const nearbyEntities = this.findNearbyEntities(entity, 60);
        const nearbyResources = this.findNearbyResources(entity, 50);
        const threats = this.identifyThreats(entity, nearbyEntities);
        
        // Decision matrix based on current state
        const decisions = {
            seek_food: entity.energy < entity.maxEnergy * 0.4 && nearbyResources.length > 0,
            avoid_threats: threats.length > 0,
            seek_mates: entity.energy > entity.maxEnergy * 0.7 && entity.reproductionCooldown === 0,
            cooperate: entity.genetics.cooperation > 0.5 && nearbyEntities.length > 0,
            compete: entity.genetics.aggression > 0.5 && nearbyEntities.filter(e => e.type === entity.type).length > 2,
            explore: Math.random() < 0.1
        };
        
        // Prioritize decisions
        if (decisions.avoid_threats) {
            entity.currentAction = 'fleeing';
            entity.target = threats[0];
        } else if (decisions.seek_food) {
            entity.currentAction = 'foraging';
            entity.target = nearbyResources[0];
        } else if (decisions.seek_mates) {
            const mates = nearbyEntities.filter(e => e.type === entity.type && e.id !== entity.id);
            if (mates.length > 0) {
                entity.currentAction = 'mating';
                entity.target = mates[0];
            }
        } else if (decisions.cooperate) {
            entity.currentAction = 'cooperating';
            entity.target = nearbyEntities.find(e => e.type !== entity.type);
        } else if (decisions.compete) {
            entity.currentAction = 'competing';
            entity.target = nearbyEntities.find(e => e.type === entity.type);
        } else {
            entity.currentAction = 'wandering';
            entity.target = null;
        }
    }
    
    /**
     * Move entity based on current behavior
     */
    moveEntity(entity) {
        let targetX = entity.x;
        let targetY = entity.y;
        
        if (entity.target) {
            if (entity.currentAction === 'fleeing') {
                // Move away from target
                targetX = entity.x - (entity.target.x - entity.x);
                targetY = entity.y - (entity.target.y - entity.y);
            } else {
                // Move towards target
                targetX = entity.target.x;
                targetY = entity.target.y;
            }
        } else {
            // Random walk with momentum
            targetX += (Math.random() - 0.5) * 20;
            targetY += (Math.random() - 0.5) * 20;
        }
        
        // Calculate movement vector
        const dx = targetX - entity.x;
        const dy = targetY - entity.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const speed = entity.genetics.speed * (entity.energy / entity.maxEnergy);
            entity.vx += (dx / distance) * speed * 0.1;
            entity.vy += (dy / distance) * speed * 0.1;
        }
        
        // Apply drag and speed limits
        entity.vx *= 0.95;
        entity.vy *= 0.95;
        const maxSpeed = entity.genetics.speed * 2;
        const currentSpeed = Math.sqrt(entity.vx * entity.vx + entity.vy * entity.vy);
        if (currentSpeed > maxSpeed) {
            entity.vx = (entity.vx / currentSpeed) * maxSpeed;
            entity.vy = (entity.vy / currentSpeed) * maxSpeed;
        }
        
        // Update position
        entity.x += entity.vx;
        entity.y += entity.vy;
        
        // Boundary wrapping
        entity.x = (entity.x + this.canvas.width) % this.canvas.width;
        entity.y = (entity.y + this.canvas.height) % this.canvas.height;
    }
    
    /**
     * Handle environmental effects on entity
     */
    handleEnvironmentalEffects(entity) {
        // Temperature effects
        const tempStress = Math.abs(this.environment.temperature - 0.5);
        entity.energy -= tempStress * 0.05;
        
        // Oxygen effects
        if (this.environment.oxygen < 0.3) {
            entity.energy -= 0.02;
        }
        
        // Toxin exposure
        this.environment.toxins.forEach(toxin => {
            const distance = Math.sqrt((entity.x - toxin.x) ** 2 + (entity.y - toxin.y) ** 2);
            if (distance < toxin.radius) {
                entity.energy -= toxin.toxicity * 0.1;
            }
        });
        
        // Resource consumption
        this.environment.resources.forEach(resource => {
            const distance = Math.sqrt((entity.x - resource.x) ** 2 + (entity.y - resource.y) ** 2);
            if (distance < 10 && resource.value > 0) {
                const consumption = Math.min(resource.value, entity.maxEnergy - entity.energy);
                entity.energy += consumption * entity.genetics.efficiency;
                resource.value -= consumption;
            }
        });
    }
    
    /**
     * Handle interactions between entities
     */
    handleInteractions() {
        const allEntities = this.getAllEntities();
        
        for (let i = 0; i < allEntities.length; i++) {
            for (let j = i + 1; j < allEntities.length; j++) {
                const entity1 = allEntities[i];
                const entity2 = allEntities[j];
                const distance = Math.sqrt((entity1.x - entity2.x) ** 2 + (entity1.y - entity2.y) ** 2);
                
                if (distance < this.config.competitionRadius) {
                    this.handleEntityInteraction(entity1, entity2, distance);
                }
            }
        }
    }
    
    /**
     * Handle interaction between two specific entities
     */
    handleEntityInteraction(entity1, entity2, distance) {
        // Competition for resources
        if (entity1.type === entity2.type && distance < this.config.competitionRadius / 2) {
            const competition = (entity1.genetics.aggression + entity2.genetics.aggression) / 2;
            entity1.energy -= competition * 0.05;
            entity2.energy -= competition * 0.05;
            this.evolution.competition += competition;
        }
        
        // Cooperation and symbiosis
        if (entity1.type !== entity2.type && distance < this.config.cooperationRadius) {
            const cooperation = (entity1.genetics.cooperation + entity2.genetics.cooperation) / 2;
            if (cooperation > 0.3) {
                entity1.energy += cooperation * 0.03;
                entity2.energy += cooperation * 0.03;
                this.evolution.cooperation += cooperation;
                
                // Update relationship network
                if (!entity1.relationships.has(entity2.id)) {
                    entity1.relationships.set(entity2.id, { type: 'symbiosis', strength: cooperation });
                    entity2.relationships.set(entity1.id, { type: 'symbiosis', strength: cooperation });
                }
            }
        }
        
        // Predator-prey interactions
        if (this.config.predatorPrey) {
            this.handlePredatorPrey(entity1, entity2, distance);
        }
    }
    
    /**
     * Handle predator-prey dynamics
     */
    handlePredatorPrey(entity1, entity2, distance) {
        const predatorTypes = ['predator'];
        const preyTypes = ['producer', 'consumer', 'decomposer'];
        
        let predator = null;
        let prey = null;
        
        if (predatorTypes.includes(entity1.type) && preyTypes.includes(entity2.type)) {
            predator = entity1;
            prey = entity2;
        } else if (predatorTypes.includes(entity2.type) && preyTypes.includes(entity1.type)) {
            predator = entity2;
            prey = entity1;
        }
        
        if (predator && prey && distance < predator.genetics.size * 3) {
            const huntSuccess = predator.genetics.speed / (prey.genetics.speed + 0.1);
            if (Math.random() < huntSuccess * 0.1) {
                predator.energy += prey.energy * 0.3;
                prey.energy *= 0.3; // Prey escapes but is injured
            }
        }
    }
    
    /**
     * Handle reproduction
     */
    handleReproduction() {
        Object.keys(this.populations).forEach(type => {
            const population = this.populations[type];
            const reproducers = population.filter(entity => 
                entity.energy > entity.maxEnergy * 0.8 && 
                entity.reproductionCooldown === 0 &&
                entity.age > 50
            );
            
            for (let i = 0; i < reproducers.length; i += 2) {
                if (i + 1 < reproducers.length && Math.random() < this.config.reproductionRate) {
                    const parent1 = reproducers[i];
                    const parent2 = reproducers[i + 1];
                    
                    // Create offspring with mixed genetics
                    const offspring = this.createOffspring(parent1, parent2);
                    population.push(offspring);
                    
                    // Reproduction cost
                    parent1.energy *= 0.7;
                    parent2.energy *= 0.7;
                    parent1.reproductionCooldown = 100;
                    parent2.reproductionCooldown = 100;
                    parent1.lastReproduction = Date.now();
                    parent2.lastReproduction = Date.now();
                }
            }
        });
    }
    
    /**
     * Create offspring from two parents
     */
    createOffspring(parent1, parent2) {
        const offspring = this.createEntity(parent1.type, parent1);
        
        // Mix genetics from both parents
        offspring.genetics = {
            speed: (parent1.genetics.speed + parent2.genetics.speed) / 2,
            size: (parent1.genetics.size + parent2.genetics.size) / 2,
            energy: (parent1.genetics.energy + parent2.genetics.energy) / 2,
            aggression: (parent1.genetics.aggression + parent2.genetics.aggression) / 2,
            cooperation: (parent1.genetics.cooperation + parent2.genetics.cooperation) / 2,
            adaptability: (parent1.genetics.adaptability + parent2.genetics.adaptability) / 2,
            efficiency: (parent1.genetics.efficiency + parent2.genetics.efficiency) / 2
        };
        
        // Mutation
        if (Math.random() < this.config.mutationRate) {
            const mutationStrength = 0.1;
            Object.keys(offspring.genetics).forEach(trait => {
                offspring.genetics[trait] *= 1 + (Math.random() - 0.5) * mutationStrength;
                offspring.genetics[trait] = Math.max(0.1, offspring.genetics[trait]);
            });
            offspring.evolution.mutations++;
        }
        
        // Position near parents
        offspring.x = (parent1.x + parent2.x) / 2 + (Math.random() - 0.5) * 20;
        offspring.y = (parent1.y + parent2.y) / 2 + (Math.random() - 0.5) * 20;
        
        return offspring;
    }
    
    /**
     * Handle natural selection
     */
    handleSelection() {
        Object.keys(this.populations).forEach(type => {
            const population = this.populations[type];
            const maxPopulation = Math.floor(this.config.entityCount / Object.keys(this.populations).length) * 1.5;
            
            if (population.length > maxPopulation) {
                // Sort by fitness and remove the least fit
                population.sort((a, b) => b.fitness - a.fitness);
                this.populations[type] = population.slice(0, maxPopulation);
            }
        });
    }
    
    /**
     * Introduce environmental changes
     */
    introduceEnvironmentalChange() {
        const changes = ['resource_bloom', 'toxin_spill', 'temperature_shift', 'oxygen_depletion'];
        const change = changes[Math.floor(Math.random() * changes.length)];
        
        switch (change) {
            case 'resource_bloom':
                for (let i = 0; i < 10; i++) {
                    this.environment.resources.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        value: 40,
                        type: 'energy',
                        regeneration: 0.2
                    });
                }
                break;
                
            case 'toxin_spill':
                this.environment.toxins.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: 80,
                    toxicity: 0.8,
                    decay: 0.01
                });
                break;
                
            case 'temperature_shift':
                this.environment.temperature += (Math.random() - 0.5) * 0.4;
                this.environment.temperature = Math.max(0, Math.min(1, this.environment.temperature));
                break;
                
            case 'oxygen_depletion':
                this.environment.oxygen *= 0.7;
                break;
        }
    }
    
    /**
     * Adapt ecosystem to consciousness state
     */
    adaptToConsciousness() {
        const state = this.consciousness.getState();
        
        // Adjust mutation rate based on consciousness complexity
        this.config.mutationRate = 0.05 + state.parameters.complexity * 0.1;
        
        // Adjust reproduction rate based on emergence
        this.config.reproductionRate = 0.001 + state.parameters.emergence * 0.005;
        
        // Environmental responsiveness to consciousness coherence
        if (state.parameters.coherence > 0.8) {
            this.environment.nutrients = Math.min(1, this.environment.nutrients * 1.02);
        }
        
        // Adaptation pressure based on consciousness adaptation parameter
        if (state.parameters.adaptation > 0.7) {
            this.introduceEnvironmentalChange();
        }
    }
    
    /**
     * Update evolution metrics
     */
    updateEvolutionMetrics() {
        const allEntities = this.getAllEntities();
        
        if (allEntities.length === 0) return;
        
        // Average fitness
        this.evolution.avgFitness = allEntities.reduce((sum, e) => sum + e.fitness, 0) / allEntities.length;
        
        // Genetic diversity
        const traits = ['speed', 'size', 'energy', 'aggression', 'cooperation'];
        let diversitySum = 0;
        traits.forEach(trait => {
            const values = allEntities.map(e => e.genetics[trait]);
            const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
            const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
            diversitySum += Math.sqrt(variance);
        });
        this.evolution.diversity = diversitySum / traits.length;
        
        // Complexity (number of active relationships)
        const totalRelationships = allEntities.reduce((sum, e) => sum + e.relationships.size, 0);
        this.evolution.complexity = totalRelationships / allEntities.length;
        
        // Reset counters
        this.evolution.cooperation *= 0.95;
        this.evolution.competition *= 0.95;
    }
    
    /**
     * Helper functions for entity behavior
     */
    findNearbyEntities(entity, radius) {
        return this.getAllEntities().filter(other => {
            if (other.id === entity.id) return false;
            const distance = Math.sqrt((entity.x - other.x) ** 2 + (entity.y - other.y) ** 2);
            return distance < radius;
        });
    }
    
    findNearbyResources(entity, radius) {
        return this.environment.resources.filter(resource => {
            const distance = Math.sqrt((entity.x - resource.x) ** 2 + (entity.y - resource.y) ** 2);
            return distance < radius && resource.value > 0;
        });
    }
    
    identifyThreats(entity, nearbyEntities) {
        return nearbyEntities.filter(other => {
            if (other.type === 'predator' && entity.type !== 'predator') return true;
            if (other.genetics.aggression > 0.7 && other.energy > entity.energy) return true;
            return false;
        });
    }
    
    calculateFitness(entity) {
        let fitness = 0;
        
        // Energy efficiency
        fitness += (entity.energy / entity.maxEnergy) * 20;
        
        // Longevity
        fitness += Math.min(entity.age / 100, 1) * 15;
        
        // Reproduction success
        fitness += (Date.now() - entity.lastReproduction < 1000 * 60) ? 25 : 0;
        
        // Social connections
        fitness += entity.relationships.size * 3;
        
        // Genetic optimization
        fitness += entity.genetics.efficiency * 10;
        fitness += entity.genetics.adaptability * 8;
        
        return fitness;
    }
    
    updateEntityMemory(entity) {
        // Simple memory system for learning
        entity.memory.push({
            action: entity.currentAction,
            energy: entity.energy,
            fitness: entity.fitness,
            timestamp: Date.now()
        });
        
        // Keep only recent memories
        if (entity.memory.length > 20) {
            entity.memory.shift();
        }
    }
    
    evolveEntityAppearance(entity, consciousnessState) {
        // Evolve color based on fitness and consciousness state
        const fitnessInfluence = entity.fitness / 100;
        const consciousness = consciousnessState.parameters;
        
        entity.color[0] = Math.max(0, Math.min(255, 
            entity.color[0] + (consciousness.complexity - 0.5) * 2 * fitnessInfluence));
        entity.color[1] = Math.max(0, Math.min(255, 
            entity.color[1] + (consciousness.emergence - 0.5) * 2 * fitnessInfluence));
        entity.color[2] = Math.max(0, Math.min(255, 
            entity.color[2] + (consciousness.coherence - 0.5) * 2 * fitnessInfluence));
    }
    
    /**
     * Render the ecosystem
     */
    render() {
        this.renderEnvironment();
        this.renderEntities();
        this.renderConnections();
        this.renderMetrics();
    }
    
    /**
     * Render environmental elements
     */
    renderEnvironment() {
        const ctx = this.ctx;
        
        // Render resources
        this.environment.resources.forEach(resource => {
            const intensity = resource.value / 30;
            ctx.fillStyle = resource.type === 'energy' 
                ? `rgba(100, 255, 100, ${intensity * 0.6})` 
                : `rgba(100, 100, 255, ${intensity * 0.6})`;
            ctx.beginPath();
            ctx.arc(resource.x, resource.y, Math.sqrt(resource.value), 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Render toxins
        this.environment.toxins.forEach(toxin => {
            const gradient = ctx.createRadialGradient(
                toxin.x, toxin.y, 0,
                toxin.x, toxin.y, toxin.radius
            );
            gradient.addColorStop(0, `rgba(255, 50, 50, ${toxin.toxicity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 50, 50, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(toxin.x, toxin.y, toxin.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Environmental status overlay
        this.renderEnvironmentalStatus();
    }
    
    /**
     * Render environmental status
     */
    renderEnvironmentalStatus() {
        const ctx = this.ctx;
        const y = 30;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px monospace';
        
        ctx.fillText(`🌡️ Temp: ${(this.environment.temperature * 100).toFixed(0)}%`, 10, y);
        ctx.fillText(`💨 O₂: ${(this.environment.oxygen * 100).toFixed(0)}%`, 120, y);
        ctx.fillText(`🧪 Nutrients: ${(this.environment.nutrients * 100).toFixed(0)}%`, 220, y);
    }
    
    /**
     * Render all entities
     */
    renderEntities() {
        const ctx = this.ctx;
        const allEntities = this.getAllEntities();
        
        allEntities.forEach(entity => {
            // Entity body
            const size = entity.genetics.size * (0.8 + (entity.energy / entity.maxEnergy) * 0.4);
            const alpha = Math.max(0.3, entity.energy / entity.maxEnergy);
            
            ctx.fillStyle = `rgba(${entity.color[0]}, ${entity.color[1]}, ${entity.color[2]}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Energy indicator
            ctx.strokeStyle = entity.energy < entity.maxEnergy * 0.3 ? 'red' : 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, size + 1, 0, Math.PI * 2 * (entity.energy / entity.maxEnergy));
            ctx.stroke();
            
            // Action indicator
            this.renderActionIndicator(entity);
            
            // Age rings for old entities
            if (entity.age > 200) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${(entity.age - 200) / 100 * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(entity.x, entity.y, size + 3, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
    }
    
    /**
     * Render action indicator for entity
     */
    renderActionIndicator(entity) {
        const ctx = this.ctx;
        const size = 8;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        
        let indicator = '';
        switch (entity.currentAction) {
            case 'foraging': indicator = '🍯'; break;
            case 'mating': indicator = '💕'; break;
            case 'fleeing': indicator = '💨'; break;
            case 'cooperating': indicator = '🤝'; break;
            case 'competing': indicator = '⚔️'; break;
            case 'wandering': indicator = '🚶'; break;
            default: indicator = '?';
        }
        
        ctx.fillText(indicator, entity.x - 5, entity.y - entity.genetics.size - 8);
    }
    
    /**
     * Render connection network
     */
    renderConnections() {
        const ctx = this.ctx;
        const allEntities = this.getAllEntities();
        const entityMap = new Map();
        
        allEntities.forEach(entity => entityMap.set(entity.id, entity));
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        
        allEntities.forEach(entity => {
            const connections = this.connectionNetwork.get(entity.id);
            if (connections) {
                connections.forEach(otherId => {
                    const other = entityMap.get(otherId);
                    if (other) {
                        const relationship = entity.relationships.get(otherId);
                        if (relationship && relationship.strength > 0.3) {
                            ctx.strokeStyle = relationship.type === 'symbiosis' 
                                ? `rgba(100, 255, 100, ${relationship.strength * 0.3})`
                                : `rgba(255, 100, 100, ${relationship.strength * 0.3})`;
                            
                            ctx.beginPath();
                            ctx.moveTo(entity.x, entity.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    }
                });
            }
        });
    }
    
    /**
     * Render ecosystem metrics
     */
    renderMetrics() {
        const ctx = this.ctx;
        const x = this.canvas.width - 200;
        const y = 30;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 10, y - 20, 190, 140);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '11px monospace';
        
        const allEntities = this.getAllEntities();
        const populationCounts = {};
        Object.keys(this.populations).forEach(type => {
            populationCounts[type] = this.populations[type].length;
        });
        
        let lineY = y;
        ctx.fillText('🌍 ECOSYSTEM METRICS', x, lineY); lineY += 15;
        ctx.fillText(`Total Entities: ${allEntities.length}`, x, lineY); lineY += 12;
        ctx.fillText(`Avg Fitness: ${this.evolution.avgFitness.toFixed(1)}`, x, lineY); lineY += 12;
        ctx.fillText(`Diversity: ${this.evolution.diversity.toFixed(2)}`, x, lineY); lineY += 12;
        ctx.fillText(`Cooperation: ${this.evolution.cooperation.toFixed(2)}`, x, lineY); lineY += 12;
        ctx.fillText(`Competition: ${this.evolution.competition.toFixed(2)}`, x, lineY); lineY += 12;
        ctx.fillText(`Complexity: ${this.evolution.complexity.toFixed(1)}`, x, lineY); lineY += 15;
        
        // Population breakdown
        Object.entries(populationCounts).forEach(([type, count]) => {
            const color = this.entityTypes[type].color;
            ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.fillText(`${type}: ${count}`, x, lineY);
            lineY += 12;
        });
    }
    
    /**
     * Reset the ecosystem
     */
    reset() {
        // Clear all populations
        Object.keys(this.populations).forEach(type => {
            this.populations[type] = [];
        });
        
        // Reset environment
        this.environment.resources = [];
        this.environment.toxins = [];
        this.environment.temperature = 0.5;
        this.environment.oxygen = 0.8;
        this.environment.nutrients = 0.6;
        
        // Reset evolution metrics
        this.evolution = {
            generation: 0,
            avgFitness: 0,
            diversity: 0,
            cooperation: 0,
            competition: 0,
            complexity: 0
        };
        
        // Reinitialize
        this.initialize();
        
        console.log('🔄 Digital Ecosystem reset and reinitialized');
    }
    
    /**
     * Get current ecosystem state
     */
    getState() {
        const allEntities = this.getAllEntities();
        
        return {
            entityCount: allEntities.length,
            populations: Object.fromEntries(
                Object.entries(this.populations).map(([type, entities]) => [type, entities.length])
            ),
            evolution: { ...this.evolution },
            environment: { ...this.environment },
            avgAge: allEntities.length > 0 ? allEntities.reduce((sum, e) => sum + e.age, 0) / allEntities.length : 0,
            avgEnergy: allEntities.length > 0 ? allEntities.reduce((sum, e) => sum + e.energy, 0) / allEntities.length : 0,
            totalConnections: allEntities.reduce((sum, e) => sum + e.relationships.size, 0)
        };
    }
} 