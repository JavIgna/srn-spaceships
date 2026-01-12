import { filterSpaceships, getFactions } from '../utils/filters';

const sample = [
  { id: 1, name: 'A', description: '', faction: 'Rebels' },
  { id: 2, name: 'B', description: '', faction: 'Empire' },
  { id: 3, name: 'C', description: '', faction: 'Rebels' },
];

describe('filters utils', () => {
  test('getFactions returns unique sorted list', () => {
    const f = getFactions(sample as any);
    expect(f).toEqual(['Empire', 'Rebels']);
  });

  test('filterSpaceships filters by faction', () => {
    const rebels = filterSpaceships(sample as any, 'Rebels');
    expect(rebels).toHaveLength(2);
    expect(rebels.every((s) => s.faction === 'Rebels')).toBe(true);
  });

  test('filterSpaceships returns full list when faction is null', () => {
    const all = filterSpaceships(sample as any, null);
    expect(all).toHaveLength(3);
  });
});
