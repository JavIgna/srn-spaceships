import { FlatList, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useSpaceships } from '@/hooks/useSpaceships';
import { SpaceshipCard } from '@/components/SpaceshipCard';
import { filterSpaceships, getFactions } from '@/utils/filters';

export default function HomeScreen() {
  const { data, loading, error } = useSpaceships();
  const router = useRouter();
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);

  const factions = useMemo(() => getFactions(data), [data]);

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
          <Pressable
            onPress={() => setSelectedFaction(null)}
            style={({ pressed }) => ({
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginRight: 8,
              borderRadius: 16,
              backgroundColor: selectedFaction === null ? '#333' : pressed ? '#eee' : '#f0f0f0',
            })}
          >
            <Text style={{ color: selectedFaction === null ? '#fff' : '#333' }}>All</Text>
          </Pressable>

          {factions.map((f) => (
            <Pressable
              key={f}
              onPress={() => setSelectedFaction(f)}
              style={({ pressed }) => ({
                paddingVertical: 8,
                paddingHorizontal: 12,
                marginRight: 8,
                borderRadius: 16,
                backgroundColor: selectedFaction === f ? '#333' : pressed ? '#eee' : '#f0f0f0',
              })}
            >
              <Text style={{ color: selectedFaction === f ? '#fff' : '#333' }}>{f}</Text>
            </Pressable>
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
                  description: item.description,
                },
              })
            }
          />
        )}
      />
    </View>
  );
}
