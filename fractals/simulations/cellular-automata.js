/**
 * Cellular Automata Simulation
 * Digital life forms evolving through local interactions
 */
import { CellularCell } from '../entities/cellular-cell.js';

export class CellularAutomataSimulation {
    constructor(canvas, consciousness, renderer) {
        this.canvas = canvas;
        this.consciousness = consciousness;
        this.renderer = renderer;
        
        // Grid configuration
        this.config = {
            gridWidth: 80,
            gridHeight: 60,
            cellSize: 10,
            initialDensity: 0.15,
            reproductionRate: 0.02,
            mutationIntensity: 0.05
        };
        
        // Evolution tracking
        this.evolution = {
            generation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            averageEnergy: 0,
            typeDistribution: [0, 0, 0, 0],
            populationHistory: []
        };
        
        // Performance optimization
        this.updateGrid = new Map(); // Only update active regions
        this.reproductionQueue = [];
        
        this.initialize();
    }
    
    /**
     * Initialize the cellular grid
     */
    initialize() {
        this.grid = [];
        this.updateGrid.clear();
        
        // Create cell grid
        for (let x = 0; x < this.config.gridWidth; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = new CellularCell(x, y);
                this.grid[x][y] = cell;
                
                // Random initial population
                if (Math.random() < this.config.initialDensity) {
                    const randomType = Math.floor(Math.random() * 4);
                    cell.birth(Math.random() * 0.6 + 0.4, randomType);
                    this.markForUpdate(x, y);
                }
            }
        }
        
        this.updateEvolutionMetrics();
        console.log('🧬 Cellular automata simulation initialized');
    }
    
    /**
     * Mark cell and neighbors for update optimization
     */
    markForUpdate(x, y, radius = 1) {
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < this.config.gridWidth && ny >= 0 && ny < this.config.gridHeight) {
                    this.updateGrid.set(`${nx},${ny}`, true);
                }
            }
        }
    }
    
    /**
     * Get neighboring cells for a position
     */
    getNeighbors(x, y, radius = 1) {
        const neighbors = [];
        
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx === 0 && dy === 0) continue;
                
                const nx = (x + dx + this.config.gridWidth) % this.config.gridWidth;
                const ny = (y + dy + this.config.gridHeight) % this.config.gridHeight;
                neighbors.push(this.grid[nx][ny]);
            }
        }
        
        return neighbors;
    }
    
    /**
     * Update the cellular automata simulation
     */
    update() {
        const time = this.consciousness.evolution.time;
        
        // Clear reproduction queue
        this.reproductionQueue = [];
        
        // Update cells (prioritize active regions)
        if (this.updateGrid.size > 0) {
            this.updateActiveCells(time);
        } else {
            this.updateAllCells(time);
        }
        
        // Process reproduction
        this.processReproduction();
        
        // Spontaneous generation based on consciousness emergence
        this.handleSpontaneousGeneration();
        
        // Evolution events during phase transitions
        this.handleEvolutionEvents();
        
        // Update metrics
        this.updateEvolutionMetrics();
        
        // Clear update grid for next frame
        this.updateGrid.clear();
    }
    
    /**
     * Update only active cells for performance
     */
    updateActiveCells(time) {
        this.updateGrid.forEach((_, key) => {
            const [x, y] = key.split(',').map(Number);
            this.updateCell(x, y, time);
        });
    }
    
    /**
     * Update all cells (fallback)
     */
    updateAllCells(time) {
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                if (Math.random() < 0.3) { // Sparse updating for performance
                    this.updateCell(x, y, time);
                }
            }
        }
    }
    
    /**
     * Update a single cell
     */
    updateCell(x, y, time) {
        const cell = this.grid[x][y];
        const neighbors = this.getNeighbors(x, y);
        
        const wasAlive = cell.alive;
        cell.update(neighbors, this.consciousness, time);
        
        // Track births and deaths
        if (!wasAlive && cell.alive) {
            this.evolution.totalBirths++;
            this.markForUpdate(x, y, 2);
        } else if (wasAlive && !cell.alive) {
            this.evolution.totalDeaths++;
            this.markForUpdate(x, y, 1);
        }
        
        // Queue for reproduction if ready
        if (cell.canReproduce() && Math.random() < this.config.reproductionRate) {
            this.reproductionQueue.push({ x, y, cell });
        }
        
        // Evolve successful cells
        if (cell.alive && cell.age % 50 === 0) {
            cell.evolve();
        }
    }
    
    /**
     * Process reproduction queue
     */
    processReproduction() {
        this.reproductionQueue.forEach(({ x, y, cell }) => {
            const parentEnergy = cell.getReproductionEnergy();
            if (parentEnergy > 0) {
                this.reproduceCell(x, y, cell, parentEnergy);
            }
        });
    }
    
    /**
     * Reproduce a cell into nearby empty space
     */
    reproduceCell(parentX, parentY, parentCell, parentEnergy) {
        const neighbors = this.getNeighborPositions(parentX, parentY);
        const emptySpaces = neighbors.filter(([x, y]) => !this.grid[x][y].alive);
        
        if (emptySpaces.length === 0) return;
        
        // Choose reproduction site based on energy gradient
        const chosenSpace = this.chooseBestReproductionSite(emptySpaces, parentCell);
        if (!chosenSpace) return;
        
        const [newX, newY] = chosenSpace;
        const newCell = this.grid[newX][newY];
        
        newCell.birth(parentEnergy, parentCell.type);
        this.evolution.totalBirths++;
        this.markForUpdate(newX, newY, 2);
        
        // Slight mutation chance during reproduction
        if (Math.random() < this.config.mutationIntensity) {
            this.mutateCellType(newCell);
        }
    }
    
    /**
     * Get neighboring positions
     */
    getNeighborPositions(x, y) {
        const positions = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = (x + dx + this.config.gridWidth) % this.config.gridWidth;
                const ny = (y + dy + this.config.gridHeight) % this.config.gridHeight;
                positions.push([nx, ny]);
            }
        }
        return positions;
    }
    
    /**
     * Choose best site for reproduction based on energy gradients
     */
    chooseBestReproductionSite(emptySpaces, parentCell) {
        if (emptySpaces.length === 1) return emptySpaces[0];
        
        // Score each empty space
        const scoredSpaces = emptySpaces.map(([x, y]) => {
            const neighbors = this.getNeighbors(x, y);
            const localEnergy = neighbors.reduce((sum, n) => sum + n.energy, 0) / neighbors.length;
            const diversity = new Set(neighbors.map(n => n.type)).size;
            
            return {
                position: [x, y],
                score: localEnergy + diversity * 0.1
            };
        });
        
        // Choose best scoring space
        scoredSpaces.sort((a, b) => b.score - a.score);
        return scoredSpaces[0].position;
    }
    
    /**
     * Mutate cell type
     */
    mutateCellType(cell) {
        const oldType = cell.type;
        cell.type = Math.floor(Math.random() * 4);
        if (cell.type !== oldType) {
            cell.memory.typeChanges++;
        }
    }
    
    /**
     * Handle spontaneous generation
     */
    handleSpontaneousGeneration() {
        const emergenceRate = this.consciousness.parameters.emergence * 0.0008;
        
        if (Math.random() < emergenceRate) {
            // Find empty space for spontaneous generation
            const x = Math.floor(Math.random() * this.config.gridWidth);
            const y = Math.floor(Math.random() * this.config.gridHeight);
            
            const cell = this.grid[x][y];
            if (!cell.alive) {
                const spontaneousType = Math.floor(Math.random() * 4);
                cell.birth(Math.random() * 0.8 + 0.2, spontaneousType);
                this.evolution.totalBirths++;
                this.markForUpdate(x, y, 2);
            }
        }
    }
    
    /**
     * Handle evolution events during phase transitions
     */
    handleEvolutionEvents() {
        if (this.consciousness.evolution.time % 1500 === 0) {
            this.triggerEvolutionEvent();
        }
    }
    
    /**
     * Trigger major evolution event
     */
    triggerEvolutionEvent() {
        const eventType = Math.floor(Math.random() * 4);
        
        switch (eventType) {
            case 0: // Mass mutation
                this.massMutation();
                break;
            case 1: // Energy surge
                this.energySurge();
                break;
            case 2: // Environmental pressure
                this.environmentalPressure();
                break;
            case 3: // Genetic drift
                this.geneticDrift();
                break;
        }
        
        this.evolution.generation++;
        console.log(`🧬 Evolution event ${eventType} triggered - Generation ${this.evolution.generation}`);
    }
    
    /**
     * Mass mutation event
     */
    massMutation() {
        let mutationCount = 0;
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                if (cell.alive && Math.random() < 0.1) {
                    this.mutateCellType(cell);
                    mutationCount++;
                    this.markForUpdate(x, y);
                }
            }
        }
        console.log(`🧬 Mass mutation affected ${mutationCount} cells`);
    }
    
    /**
     * Energy surge event
     */
    energySurge() {
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                if (cell.alive) {
                    cell.energy = Math.min(1, cell.energy + 0.3);
                    this.markForUpdate(x, y);
                }
            }
        }
    }
    
    /**
     * Environmental pressure event
     */
    environmentalPressure() {
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                if (cell.alive && cell.energy < 0.5) {
                    cell.energy *= 0.7; // Additional pressure on weak cells
                    this.markForUpdate(x, y);
                }
            }
        }
    }
    
    /**
     * Genetic drift event
     */
    geneticDrift() {
        // Boost one type, suppress others
        const favoritedType = Math.floor(Math.random() * 4);
        
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                if (cell.alive) {
                    if (cell.type === favoritedType) {
                        cell.energy = Math.min(1, cell.energy + 0.2);
                    } else {
                        cell.energy *= 0.9;
                    }
                    this.markForUpdate(x, y);
                }
            }
        }
    }
    
    /**
     * Update evolution metrics
     */
    updateEvolutionMetrics() {
        let totalEnergy = 0;
        let livingCells = 0;
        const typeCount = [0, 0, 0, 0];
        
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                if (cell.alive) {
                    livingCells++;
                    totalEnergy += cell.energy;
                    typeCount[cell.type]++;
                }
            }
        }
        
        this.evolution.averageEnergy = livingCells > 0 ? totalEnergy / livingCells : 0;
        this.evolution.typeDistribution = typeCount.map(count => count / Math.max(1, livingCells));
        
        // Store population history
        this.evolution.populationHistory.push(livingCells);
        if (this.evolution.populationHistory.length > 100) {
            this.evolution.populationHistory.shift();
        }
    }
    
    /**
     * Render the cellular automata
     */
    render() {
        this.renderer.clear();
        
        const cellWidth = this.canvas.width / this.config.gridWidth;
        const cellHeight = this.canvas.height / this.config.gridHeight;
        
        // Render cells
        for (let x = 0; x < this.config.gridWidth; x++) {
            for (let y = 0; y < this.config.gridHeight; y++) {
                const cell = this.grid[x][y];
                
                if (cell.alive || cell.energy > 0.1) {
                    const visual = cell.getVisualProperties(this.consciousness);
                    this.renderCell(x, y, cellWidth, cellHeight, visual);
                }
            }
        }
        
        this.renderer.resetState();
    }
    
    /**
     * Render a single cell
     */
    renderCell(gridX, gridY, cellWidth, cellHeight, visual) {
        const x = gridX * cellWidth;
        const y = gridY * cellHeight;
        
        const alpha = visual.isAlive ? visual.intensity : visual.intensity * 0.3;
        if (alpha <= 0.02) return;
        
        // Calculate color based on type and evolutionary phase
        const baseHue = visual.type * 90 + visual.evolutionPhase * 30;
        const color = this.consciousness.getEvolutionaryColor(
            visual.type + visual.age * 0.3, 
            this.consciousness.evolution.time + gridX * 3 + gridY * 5, 
            visual.intensity
        );
        
        this.renderer.ctx.fillStyle = color;
        this.renderer.ctx.globalAlpha = alpha;
        
        if (visual.isAlive) {
            // Living cell
            const size = cellWidth * (0.6 + visual.intensity * 0.4);
            const centerX = x + cellWidth / 2;
            const centerY = y + cellHeight / 2;
            
            if (visual.reproductionReady) {
                // Pulsing effect for reproduction-ready cells
                const pulse = Math.sin(this.consciousness.evolution.time * 0.05) * 0.2 + 0.8;
                this.renderer.setupGlow(color, visual.intensity * 8 * pulse);
            }
            
            this.renderer.ctx.fillRect(
                centerX - size / 2, 
                centerY - size / 2, 
                size, 
                size
            );
            
            if (visual.reproductionReady) {
                this.renderer.clearGlow();
            }
        } else {
            // Dead cell with residual energy
            const size = cellWidth * 0.3;
            const centerX = x + cellWidth / 2;
            const centerY = y + cellHeight / 2;
            
            this.renderer.ctx.fillRect(
                centerX - size / 2, 
                centerY - size / 2, 
                size, 
                size
            );
        }
    }
    
    /**
     * Get simulation state and metrics
     */
    getState() {
        return {
            config: { ...this.config },
            evolution: { ...this.evolution },
            populationSize: this.evolution.populationHistory[this.evolution.populationHistory.length - 1] || 0,
            diversityIndex: this.calculateDiversityIndex()
        };
    }
    
    /**
     * Calculate diversity index (Shannon diversity)
     */
    calculateDiversityIndex() {
        const totalPop = this.evolution.typeDistribution.reduce((sum, count) => sum + count, 0);
        if (totalPop === 0) return 0;
        
        return -this.evolution.typeDistribution.reduce((entropy, proportion) => {
            if (proportion === 0) return entropy;
            return entropy + proportion * Math.log2(proportion);
        }, 0);
    }
    
    /**
     * Reset the simulation
     */
    reset() {
        this.evolution = {
            generation: 0,
            totalBirths: 0,
            totalDeaths: 0,
            averageEnergy: 0,
            typeDistribution: [0, 0, 0, 0],
            populationHistory: []
        };
        
        this.initialize();
        console.log('🧬 Cellular automata simulation reset');
    }
} 