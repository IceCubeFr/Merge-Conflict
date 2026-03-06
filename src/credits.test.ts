import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { render } from './credits.ts';

describe('render devList', () => {
    it("should render list", () => {
        assert.deepEqual(render(), `<tr>
            <td>Florian</td>
            <td>GAVOILLE</td>
            <td>flopsi</td>
            <td>I</td>
            <td>Minecraft</td>
            <td>100</td>
        </tr><tr>
            <td>Sulivan</td>
            <td>CERDAN</td>
            <td>susu</td>
            <td>I</td>
            <td>Call of Duty Mode Zombies</td>
            <td>100</td>
        </tr><tr>
            <td>Sebastian</td>
            <td>NOVAK</td>
            <td>seb</td>
            <td>I</td>
            <td>Red Dead Redemption II</td>
            <td>100</td>
        </tr><tr>
            <td>Thomas</td>
            <td>FRITSCH</td>
            <td>Heisenberg</td>
            <td>Ens</td>
            <td>Mario Kart 8 Deluxe</td>
            <td>0</td>
        </tr><tr>
            <td>Patricia</td>
            <td>EVERAERE</td>
            <td>Hugo Destroyer</td>
            <td>Ens</td>
            <td>Merge Conflict</td>
            <td>0</td>
        </tr>`);
    });
});