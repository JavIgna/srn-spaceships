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

export function hexToRgba(hex: string, alpha = 1) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const bigint = parseInt(full, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const DEFAULT_FACTION_PALETTE = [
    '#FF6B6B',
    '#4D96FF',
    '#FFC857',
    '#6BE28F',
    '#C084FC',
    '#FF9F1C',
    '#4DD0E1',
];

export function getFactionColorMap(spaceships: Spaceship[]): Record<string, string> {
    const map: Record<string, string> = {};
    const seen: string[] = [];
    for (const s of spaceships) {
        if (!s.faction) continue;
        if (!seen.includes(s.faction)) seen.push(s.faction);
    }
    seen.forEach((f, idx) => {
        map[f] = DEFAULT_FACTION_PALETTE[idx % DEFAULT_FACTION_PALETTE.length];
    });
    return map;
}

export default { filterSpaceships, getFactions, getFactionColorMap, hexToRgba };
