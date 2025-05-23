/**
 * Cellular Automata Cell Entity
 * Represents a single cell in the digital life simulation
 */
export class CellularCell {
    constructor(x, y, type = 0) {
        this.position = { x, y };
        this.alive = false;
        this.energy = 0;
        this.age = 0;
        this.type = type; // 0: Basic, 1: Producer, 2: Consumer, 3: Hybrid
        
        // Evolution parameters
        this.evolution = {
            mutationRate: 0.01,
            energyDecay: 0.02,
            reproductionThreshold: 0.8,
            survivalThreshold: 0.1
        };
        
        // Environmental factors
        this.environment = {
            localDensity: 0,
            energyGradient: 0,
            typeDistribution: [0, 0, 0, 0]
        };
        
        // Memory of past states
        this.memory = {
            maxEnergy: 0,
            generations: 0,
            typeChanges: 0
        };
        
        this.lastUpdate = 0;
    }
    
    /**
     * Birth a new cell with inherited properties
     */
    birth(parentEnergy = 0.5, parentType = 0) {
        this.alive = true;
        this.energy = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        this.age = 0;
        this.type = this.inheritType(parentType);
        this.memory.generations++;
        
        // Inherit some parent energy
        this.energy = Math.min(1, this.energy + parentEnergy * 0.2);
        this.memory.maxEnergy = this.energy;
    }
    
    /**
     * Death of the cell
     */
    death() {
        this.alive = false;
        this.energy *= 0.3; // Leave some residual energy
        this.age = 0;
    }
    
    /**
     * Inherit type from parent with possible mutation
     */
    inheritType(parentType) {
        if (Math.random() < this.evolution.mutationRate) {
            // Mutation - change to random type
            const newType = Math.floor(Math.random() * 4);
            if (newType !== parentType) {
                this.memory.typeChanges++;
            }
            return newType;
        }
        return parentType;
    }
    
    /**
     * Update the cell based on its environment
     */
    update(neighbors, consciousness, time) {
        this.lastUpdate = time;
        
        if (this.alive) {
            this.age++;
            this.updateEnvironment(neighbors);
            this.processEnergy(neighbors, consciousness);
            this.checkSurvival();
        } else {
            // Gradual energy decay for dead cells
            this.energy *= (1 - this.evolution.energyDecay * 0.5);
        }
    }
    
    /**
     * Update environmental awareness
     */
    updateEnvironment(neighbors) {
        let aliveCount = 0;
        let totalEnergy = 0;
        const typeCount = [0, 0, 0, 0];
        
        neighbors.forEach(neighbor => {
            if (neighbor.alive) {
                aliveCount++;
                totalEnergy += neighbor.energy;
                typeCount[neighbor.type]++;
            }
        });
        
        this.environment.localDensity = aliveCount / neighbors.length;
        this.environment.energyGradient = totalEnergy / Math.max(1, aliveCount);
        this.environment.typeDistribution = typeCount.map(count => count / Math.max(1, aliveCount));
    }
    
    /**
     * Process energy based on cell type and environment
     */
    processEnergy(neighbors, consciousness) {
        const baseEnergyChange = this.getTypeEnergyBehavior(neighbors, consciousness);
        
        // Environmental modifiers
        const densityModifier = this.getDensityModifier();
        const coherenceModifier = consciousness.parameters.coherence * 0.1;
        const emergenceModifier = consciousness.parameters.emergence * 0.05;
        
        const totalEnergyChange = baseEnergyChange * densityModifier + coherenceModifier + emergenceModifier;
        
        // Apply energy change
        this.energy += totalEnergyChange;
        this.energy = Math.max(0, Math.min(1, this.energy));
        
        // Track maximum energy achieved
        this.memory.maxEnergy = Math.max(this.memory.maxEnergy, this.energy);
        
        // Natural energy decay
        this.energy *= (1 - this.evolution.energyDecay);
    }
    
    /**
     * Get energy behavior based on cell type
     */
    getTypeEnergyBehavior(neighbors, consciousness) {
        switch (this.type) {
            case 0: // Basic - balanced behavior
                return (Math.random() - 0.5) * 0.1;
                
            case 1: // Producer - generates energy, influenced by complexity
                return 0.05 + consciousness.parameters.complexity * 0.08;
                
            case 2: // Consumer - takes energy from neighbors
                const availableEnergy = neighbors.reduce((sum, n) => sum + (n.alive ? n.energy : 0), 0);
                return Math.min(0.08, availableEnergy * 0.02);
                
            case 3: // Hybrid - adapts based on environment
                if (this.environment.localDensity > 0.6) {
                    return 0.03; // Act like producer in crowded areas
                } else {
                    return (Math.random() - 0.3) * 0.12; // More variable in sparse areas
                }
                
            default:
                return 0;
        }
    }
    
    /**
     * Get density-based energy modifier
     */
    getDensityModifier() {
        const optimalDensity = 0.4; // Sweet spot for most cell types
        const densityDifference = Math.abs(this.environment.localDensity - optimalDensity);
        
        // Penalty for being too crowded or too isolated
        return Math.max(0.5, 1 - densityDifference * 2);
    }
    
    /**
     * Check if cell survives current conditions
     */
    checkSurvival() {
        // Die if energy too low
        if (this.energy < this.evolution.survivalThreshold) {
            this.death();
            return;
        }
        
        // Die of old age (probabilistic)
        const maxAge = 100 + this.memory.maxEnergy * 50;
        if (this.age > maxAge && Math.random() < 0.1) {
            this.death();
            return;
        }
        
        // Overcrowding death
        if (this.environment.localDensity > 0.8 && Math.random() < 0.05) {
            this.death();
            return;
        }
    }
    
    /**
     * Check if cell can reproduce
     */
    canReproduce() {
        return this.alive && 
               this.energy > this.evolution.reproductionThreshold && 
               this.age > 10 &&
               this.environment.localDensity < 0.7;
    }
    
    /**
     * Get reproduction energy contribution
     */
    getReproductionEnergy() {
        if (!this.canReproduce()) return 0;
        
        const energyContribution = (this.energy - this.evolution.reproductionThreshold) * 0.8;
        this.energy -= energyContribution; // Cost of reproduction
        
        return energyContribution;
    }
    
    /**
     * Evolve cell properties based on success
     */
    evolve() {
        // Successful cells (high energy, long life) become more stable
        const successMetric = (this.memory.maxEnergy + this.age / 100) / 2;
        
        if (successMetric > 0.7) {
            this.evolution.mutationRate *= 0.95; // Reduce mutation rate
            this.evolution.energyDecay *= 0.98; // Slightly slower decay
        } else if (successMetric < 0.3) {
            this.evolution.mutationRate *= 1.05; // Increase mutation rate
            this.evolution.mutationRate = Math.min(0.1, this.evolution.mutationRate);
        }
    }
    
    /**
     * Get visual properties for rendering
     */
    getVisualProperties(consciousness) {
        const baseIntensity = this.alive ? this.energy : this.energy * 0.3;
        const ageIntensity = Math.min(1, this.age / 50);
        const typeInfluence = this.type / 4;
        
        return {
            intensity: baseIntensity,
            age: ageIntensity,
            type: typeInfluence,
            evolutionPhase: (consciousness.evolution.cycle % 4) / 4,
            isAlive: this.alive,
            reproductionReady: this.canReproduce()
        };
    }
    
    /**
     * Get cell state for analysis
     */
    getState() {
        return {
            position: { ...this.position },
            alive: this.alive,
            energy: this.energy,
            age: this.age,
            type: this.type,
            environment: { ...this.environment },
            memory: { ...this.memory },
            canReproduce: this.canReproduce()
        };
    }
    
    /**
     * Serialize cell for saving/loading
     */
    serialize() {
        return {
            position: this.position,
            alive: this.alive,
            energy: this.energy,
            age: this.age,
            type: this.type,
            evolution: this.evolution,
            memory: this.memory
        };
    }
    
    /**
     * Create cell from serialized data
     */
    static deserialize(data) {
        const cell = new CellularCell(data.position.x, data.position.y, data.type);
        cell.alive = data.alive;
        cell.energy = data.energy;
        cell.age = data.age;
        cell.evolution = data.evolution;
        cell.memory = data.memory;
        return cell;
    }
} 