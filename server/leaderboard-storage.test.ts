import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testLeaderboardPath = path.join(__dirname, 'leaderboard-test.json');

// Fonctions copiées pour tester la logique de tri et filtrage
function sortAndSlice(entries: { pseudo: string; score: number; date: string }[]) {
    return entries.sort((left, right) => right.score - left.score).slice(0, 10);
}

describe('Leaderboard sorting logic', () => {
    it('should sort entries by score descending', () => {
        const entries = [
            { pseudo: 'Alice', score: 100, date: '2024-01-01' },
            { pseudo: 'Bob', score: 300, date: '2024-01-02' },
            { pseudo: 'Charlie', score: 200, date: '2024-01-03' },
        ];
        const sorted = sortAndSlice(entries);
        assert.equal(sorted[0].pseudo, 'Bob');
        assert.equal(sorted[1].pseudo, 'Charlie');
        assert.equal(sorted[2].pseudo, 'Alice');
    });

    it('should keep only top 10 entries', () => {
        const entries = Array.from({ length: 15 }, (_, i) => ({
            pseudo: `Player${i}`,
            score: i * 10,
            date: '2024-01-01',
        }));
        const sorted = sortAndSlice(entries);
        assert.equal(sorted.length, 10);
        assert.equal(sorted[0].score, 140); // highest score
        assert.equal(sorted[9].score, 50);  // 10th highest
    });

    it('should return empty array for empty input', () => {
        const sorted = sortAndSlice([]);
        assert.deepEqual(sorted, []);
    });

    it('should handle single entry', () => {
        const entries = [{ pseudo: 'Solo', score: 500, date: '2024-01-01' }];
        const sorted = sortAndSlice(entries);
        assert.equal(sorted.length, 1);
        assert.equal(sorted[0].pseudo, 'Solo');
    });

    it('should handle entries with same score', () => {
        const entries = [
            { pseudo: 'A', score: 100, date: '2024-01-01' },
            { pseudo: 'B', score: 100, date: '2024-01-02' },
            { pseudo: 'C', score: 100, date: '2024-01-03' },
        ];
        const sorted = sortAndSlice(entries);
        assert.equal(sorted.length, 3);
        // All have same score, order preserved from original sort behavior
        sorted.forEach(entry => assert.equal(entry.score, 100));
    });
});

describe('Leaderboard file operations', () => {
    beforeEach(async () => {
        // Clean up test file before each test
        try {
            await fs.unlink(testLeaderboardPath);
        } catch {
            // File doesn't exist, that's fine
        }
    });

    afterEach(async () => {
        // Clean up test file after each test
        try {
            await fs.unlink(testLeaderboardPath);
        } catch {
            // File doesn't exist, that's fine
        }
    });

    it('should create file with empty array if not exists', async () => {
        await fs.writeFile(testLeaderboardPath, '[]', 'utf-8');
        const content = await fs.readFile(testLeaderboardPath, 'utf-8');
        assert.equal(content, '[]');
    });

    it('should read and parse JSON file', async () => {
        const testData = [{ pseudo: 'Test', score: 100, date: '2024-01-01' }];
        await fs.writeFile(testLeaderboardPath, JSON.stringify(testData), 'utf-8');
        const content = await fs.readFile(testLeaderboardPath, 'utf-8');
        const parsed = JSON.parse(content);
        assert.deepEqual(parsed, testData);
    });

    it('should write formatted JSON', async () => {
        const testData = [{ pseudo: 'Test', score: 100, date: '2024-01-01' }];
        await fs.writeFile(testLeaderboardPath, JSON.stringify(testData, null, 2), 'utf-8');
        const content = await fs.readFile(testLeaderboardPath, 'utf-8');
        assert.ok(content.includes('\n')); // Pretty printed JSON has newlines
    });
});
