import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  splitWordSegments,
  wrapIndex,
  nextAutoAdvance,
  formatStat,
  EXPLORER_PRESETS
} from '../../src/utils/motionHelpers.ts';
import { LEARNING_MODULES } from '../helpers/loadAppStore.ts';

describe('Motion Helpers & Apple Scroll Utilities', () => {
  it('should cleanly split multi-sentence segments into words with preserved emphasis metadata', () => {
    const segments = [
      { text: 'Screen time transformed.', emphasis: false },
      { text: 'Active inventors.', emphasis: true }
    ];
    const tokens = splitWordSegments(segments);
    assert.ok(tokens.length >= 4);

    const activeTokens = tokens.filter((t) => t.word === 'Active' || t.word === 'inventors.');
    for (const t of activeTokens) {
      assert.strictEqual(t.emphasis, true);
    }

    const plainTokens = tokens.filter((t) => t.word === 'Screen' || t.word === 'time');
    for (const t of plainTokens) {
      assert.strictEqual(t.emphasis, false);
    }
  });

  it('should wrap carousel index correctly across negative and positive bounds', () => {
    assert.strictEqual(wrapIndex(0, 5), 0);
    assert.strictEqual(wrapIndex(4, 5), 4);
    assert.strictEqual(wrapIndex(5, 5), 0);
    assert.strictEqual(wrapIndex(-1, 5), 4);
    assert.strictEqual(wrapIndex(0, 0), 0);
  });

  it('should calculate next auto-advance when not paused and hold when paused', () => {
    assert.strictEqual(nextAutoAdvance(2, 5, false), 3);
    assert.strictEqual(nextAutoAdvance(4, 5, false), 0);
    assert.strictEqual(nextAutoAdvance(2, 5, true), 2);
    assert.strictEqual(nextAutoAdvance(0, 1, false), 0);
  });

  it('should format stats with ease-out interpolation and hit exact end values at progress 1.0', () => {
    const statZero = formatStat(94, 0, '', '%');
    assert.strictEqual(statZero, '0%');

    const statFull = formatStat(94, 1.0, '', '%');
    assert.strictEqual(statFull, '94%');

    const decimalStat = formatStat(34.2, 1.0, '+', '%', 1);
    assert.strictEqual(decimalStat, '+34.2%');
  });

  it('should provide valid 3D viewport preset configs for all 6 curriculum modules', () => {
    for (const m of LEARNING_MODULES) {
      const preset = EXPLORER_PRESETS[m.id];
      assert.ok(preset, `Preset must exist for module ${m.id}`);
      assert.ok(['pavilion', 'desk_dock', 'primitives'].includes(preset.archetype));
      assert.ok(typeof preset.curvature === 'number');
      assert.ok(typeof preset.canopyColor === 'string');
      assert.ok(typeof preset.hasSolar === 'boolean');
    }
  });
});
