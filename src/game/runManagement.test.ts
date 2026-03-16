import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Test des fonctions pures extraites de runManagement.ts
// Ces fonctions sont copiées ici car elles sont privées dans le module original

function formatDuration(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function computeScore(survivalSeconds: number, killedEnemies: number) {
    return survivalSeconds * 5 + killedEnemies * 100;
}

describe('formatDuration', () => {
    it('should format 0 seconds as 00:00', () => {
        assert.equal(formatDuration(0), '00:00');
    });

    it('should format seconds less than a minute', () => {
        assert.equal(formatDuration(5), '00:05');
        assert.equal(formatDuration(30), '00:30');
        assert.equal(formatDuration(59), '00:59');
    });

    it('should format exactly one minute', () => {
        assert.equal(formatDuration(60), '01:00');
    });

    it('should format minutes and seconds', () => {
        assert.equal(formatDuration(65), '01:05');
        assert.equal(formatDuration(125), '02:05');
        assert.equal(formatDuration(3661), '61:01');
    });

    it('should pad single digit values with leading zero', () => {
        assert.equal(formatDuration(61), '01:01');
        assert.equal(formatDuration(9), '00:09');
    });
});

describe('computeScore', () => {
    it('should return 0 for 0 seconds and 0 kills', () => {
        assert.equal(computeScore(0, 0), 0);
    });

    it('should compute score based on survival time only', () => {
        assert.equal(computeScore(10, 0), 50);  // 10 * 5
        assert.equal(computeScore(60, 0), 300); // 60 * 5
    });

    it('should compute score based on kills only', () => {
        assert.equal(computeScore(0, 1), 100);  // 1 * 100
        assert.equal(computeScore(0, 5), 500);  // 5 * 100
    });

    it('should compute combined score', () => {
        assert.equal(computeScore(10, 2), 250);  // 10*5 + 2*100 = 50 + 200
        assert.equal(computeScore(120, 10), 1600); // 120*5 + 10*100 = 600 + 1000
    });
});
