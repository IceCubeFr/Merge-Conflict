import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Player, Ennemi } from './types.ts';

describe('Player', () => {
    it('should initialize with default values', () => {
        const player = new Player(10, 20);
        assert.equal(player.posX, 10);
        assert.equal(player.posY, 20);
        assert.equal(player.health, 3);
        assert.equal(player.shootSpeed, 10);
        assert.equal(player.projectileSize, 5);
        assert.equal(player.projectileDamage, 1);
        assert.equal(player.pseudo, "Guest");
        assert.equal(player.invincibility, false);
        assert.equal(player.killedEnnemies, 0);
    });

    it('should increment killedEnnemies when ennemyKilled is called', () => {
        const player = new Player(0, 0);
        assert.equal(player.killedEnnemies.size, 0);
        player.ennemyKilled(0);
        assert.equal(player.killedEnnemies.get(0), 1);
        player.ennemyKilled(0);
        assert.equal(player.killedEnnemies.get(0), 2);
    });

    it('should decrease health when takeHealth is called and not invincible', () => {
        const player = new Player(0, 0);
        assert.equal(player.health, 3);
        player.takeHealth();
        assert.equal(player.health, 2);
        assert.equal(player.invincibility, true);
    });

    it('should not decrease health when invincible', () => {
        const player = new Player(0, 0);
        player.takeHealth();
        assert.equal(player.health, 2);
        player.takeHealth(); // Should not decrease because invincible
        assert.equal(player.health, 2);
    });

    it('verifyHealth should return true if health > 0', () => {
        const player = new Player(0, 0);
        assert.equal(player.verifyHealth(), true);
        player.health = 1;
        assert.equal(player.verifyHealth(), true);
        player.health = 0;
        assert.equal(player.verifyHealth(), false);
    });

    it('giveHealth should add health if below 3', () => {
        const player = new Player(0, 0);
        player.health = 1;
        player.giveHealth(1);
        assert.equal(player.health, 2);
    });

    it('giveHealth should not add health if already at 3', () => {
        const player = new Player(0, 0);
        assert.equal(player.health, 3);
        player.giveHealth(1);
        assert.equal(player.health, 3);
    });

    it('giveShootSpeed should increase shootSpeed', () => {
        const player = new Player(0, 0);
        assert.equal(player.shootSpeed, 10);
        player.giveShootSpeed(5);
        assert.equal(player.shootSpeed, 15);
    });

    it('giveBiggerProjectiles should increase projectileSize', () => {
        const player = new Player(0, 0);
        assert.equal(player.projectileSize, 5);
        player.giveBiggerProjectiles(3);
        assert.equal(player.projectileSize, 8);
    });

    it('setPseudo should update pseudo', () => {
        const player = new Player(0, 0);
        assert.equal(player.pseudo, "Guest");
        player.setPseudo("Hero123");
        assert.equal(player.pseudo, "Hero123");
    });
});

describe('Ennemi', () => {
    it('should initialize with default values', () => {
        const ennemi = new Ennemi(100, 200, 1, 1, 0);
        assert.equal(ennemi.posX, 100);
        assert.equal(ennemi.posY, 200);
        assert.equal(ennemi.health, 1);
    });

    it('should initialize with custom values', () => {
        const ennemi = new Ennemi(50, 75, 25, 10, 5);
        assert.equal(ennemi.posX, 50);
        assert.equal(ennemi.posY, 75);
        assert.equal(ennemi.health, 25);
    });

    it('move should decrease posX by 3', () => {
        const ennemi = new Ennemi(100, 50, 1, 1, 0);
        ennemi.move();
        assert.equal(ennemi.posX, 97);
        ennemi.move();
        assert.equal(ennemi.posX, 94);
    });

    it('hurt should decrease health by 1', () => {
        const ennemi = new Ennemi(0, 0, 5, 1, 0);
        assert.equal(ennemi.health, 5);
        ennemi.hurt(1);
        assert.equal(ennemi.health, 4);
        ennemi.hurt(1);
        assert.equal(ennemi.health, 3);
    });
});
