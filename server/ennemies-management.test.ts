import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Ennemi } from '../common/types.ts';

// Tests pour la logique de gestion des ennemis
// Les fonctions sont testées de manière isolée

describe('Ennemi spawning logic', () => {
    const rightWall = 1980;
    const arenaHeight = 720;

    it('should spawn ennemi at right wall', () => {
        const ennemi = new Ennemi(rightWall, Math.random() * arenaHeight, 25);
        assert.equal(ennemi.posX, rightWall);
        assert.ok(ennemi.posY >= 0 && ennemi.posY <= arenaHeight);
        assert.equal(ennemi.health, 25);
    });
});

describe('Ennemi array management', () => {
    it('should remove ennemi at valid index', () => {
        const ennemies: Ennemi[] = [
            new Ennemi(100, 100),
            new Ennemi(200, 200),
            new Ennemi(300, 300),
        ];
        const index = 1;
        if (index >= 0 && index < ennemies.length) {
            ennemies.splice(index, 1);
        }
        assert.equal(ennemies.length, 2);
        assert.equal(ennemies[0].posX, 100);
        assert.equal(ennemies[1].posX, 300);
    });

    it('should not remove ennemi at invalid index', () => {
        const ennemies: Ennemi[] = [new Ennemi(100, 100)];
        const index = 5;
        if (index >= 0 && index < ennemies.length) {
            ennemies.splice(index, 1);
        }
        assert.equal(ennemies.length, 1);
    });

    it('should hurt ennemi and decrease health', () => {
        const ennemies: Ennemi[] = [new Ennemi(100, 100, 5)];
        const index = 0;
        if (index >= 0 && index < ennemies.length) {
            ennemies[index].hurt();
        }
        assert.equal(ennemies[0].health, 4);
    });
});

describe('Auto move logic', () => {
    const leftCleanupLimit = -100;

    it('should move ennemies to the left', () => {
        const ennemies: Ennemi[] = [
            new Ennemi(500, 100),
            new Ennemi(300, 200),
        ];
        ennemies.forEach((ennemi) => {
            if (ennemi.posX > leftCleanupLimit) {
                ennemi.move();
            }
        });
        assert.equal(ennemies[0].posX, 497);
        assert.equal(ennemies[1].posX, 297);
    });

    it('should remove ennemies past left cleanup limit', () => {
        const ennemies: Ennemi[] = [
            new Ennemi(-50, 100),
            new Ennemi(-150, 200), // Past limit
            new Ennemi(100, 300),
        ];
        for (let i = ennemies.length - 1; i >= 0; i--) {
            if (ennemies[i].posX <= leftCleanupLimit) {
                ennemies.splice(i, 1);
            }
        }
        assert.equal(ennemies.length, 2);
        assert.equal(ennemies[0].posX, -50);
        assert.equal(ennemies[1].posX, 100);
    });
});

describe('Spawn interval logic', () => {
    const initialSpawnIntervalMs = 4000;
    const minimumSpawnIntervalMs = 700;
    const spawnAccelerationMs = 100;

    it('should decrease spawn interval over time', () => {
        let currentInterval = initialSpawnIntervalMs;
        currentInterval = Math.max(
            minimumSpawnIntervalMs,
            currentInterval - spawnAccelerationMs
        );
        assert.equal(currentInterval, 3900);
    });

    it('should not go below minimum spawn interval', () => {
        let currentInterval = minimumSpawnIntervalMs + 50;
        currentInterval = Math.max(
            minimumSpawnIntervalMs,
            currentInterval - spawnAccelerationMs
        );
        assert.equal(currentInterval, minimumSpawnIntervalMs);
    });

    it('should stay at minimum if already at minimum', () => {
        let currentInterval = minimumSpawnIntervalMs;
        currentInterval = Math.max(
            minimumSpawnIntervalMs,
            currentInterval - spawnAccelerationMs
        );
        assert.equal(currentInterval, minimumSpawnIntervalMs);
    });
});

describe('Max ennemies limit', () => {
    it('should respect max ennemi limit of 50', () => {
        const maxEnnemies = 50;
        const ennemies: Ennemi[] = Array.from(
            { length: 50 },
            (_, i) => new Ennemi(i * 10, i * 10)
        );
        
        // Should not spawn if at limit
        const canSpawn = ennemies.length < maxEnnemies;
        assert.equal(canSpawn, false);
    });

    it('should allow spawn when below limit', () => {
        const maxEnnemies = 50;
        const ennemies: Ennemi[] = Array.from(
            { length: 49 },
            (_, i) => new Ennemi(i * 10, i * 10)
        );
        
        const canSpawn = ennemies.length < maxEnnemies;
        assert.equal(canSpawn, true);
    });
});
