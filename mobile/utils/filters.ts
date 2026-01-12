import { Spaceship } from '@/models/Spaceship';

export function filterSpaceships(spaceships: Spaceship[], faction?: string | null): Spaceship[] {
    if (!faction) return spaceships;
    return spaceships.filter((s) => s.faction === faction);
}

export function getFactions(spaceships: Spaceship[]): string[] {
    const set = new Set<string>();
    spaceships.forEach((s) => set.add(s.faction));
    return Array.from(set).sort();
}

export default { filterSpaceships, getFactions };
