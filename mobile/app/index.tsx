import { FlatList, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useSpaceships } from '@/hooks/useSpaceships';
import { SpaceshipCard } from '@/components/SpaceshipCard';
import FilterButton from '@/components/FilterButton';
import { filterSpaceships, getFactions, getFactionColorMap } from '@/utils/filters';

export default function HomeScreen() {
  const { data, loading, error } = useSpaceships();
  const router = useRouter();
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);

  const factions = useMemo(() => getFactions(data), [data]);
  const factionColorMap = useMemo(() => getFactionColorMap(data), [data]);

  const filteredData = useMemo(() => filterSpaceships(data, selectedFaction), [data, selectedFaction]);

  if (loading) {
    return <Text style={{ padding: 16 }}>Loading...</Text>;
  }

  if (error) {
    return <Text style={{ padding: 16 }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingVertical: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
          <FilterButton label="All" selected={selectedFaction === null} onPress={() => setSelectedFaction(null)} />

          {factions.map((f) => (
            <FilterButton
              key={f}
              label={f}
              selected={selectedFaction === f}
              color={factionColorMap[f]}
              onPress={() => setSelectedFaction(f)}
            />
          ))}
        </ScrollView>
      </View>

      <Text style={{ paddingHorizontal: 16, paddingBottom: 8, color: '#666' }}>{filteredData.length} result(s)</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SpaceshipCard
            spaceship={item}
            onPress={() =>
              router.push({
                pathname: '/spaceship/[id]',
                params: {
                  id: item.id.toString(),
                  name: item.name,
                  faction: item.faction,
                  color: factionColorMap[item.faction],
                  description: item.description,
                },
              })
            }
            color={factionColorMap[item.faction]}
          />
        )}
      />
    </View>
  );
}
