import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InsightCard } from '@/components/home/insight-card';
import { RecentVisitCard } from '@/components/home/recent-visit-card';
import { SectionHeader } from '@/components/home/section-header';
import { StatsGrid } from '@/components/home/stats-grid';
import { WelcomeSection } from '@/components/home/welcome-section';
import { SearchBar } from '@/components/wanderlog/search-bar';
import { BottomTabInset, Fonts } from '@/constants/theme';
import { useHomeDashboard } from '@/hooks/use-home-dashboard';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { greeting, firstName, stats, recentVisits, insights, isDemoData } =
    useHomeDashboard();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + BottomTabInset + 24,
          },
        ]}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <WelcomeSection greeting={greeting} firstName={firstName} />

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={() => {
            // TODO: wire search when backend is ready
          }}
        />

        <SectionHeader title="Quick Stats" />
        <StatsGrid stats={stats} />

        <SectionHeader title="Recent Visits" />
        <View style={styles.visitList}>
          {recentVisits.map((visit) => (
            <RecentVisitCard key={visit.id} visit={visit} />
          ))}
        </View>

        <SectionHeader title="Explore Insights" />
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.insightsRow}
        >
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </ScrollView>

        {isDemoData ? (
          <Text style={styles.demoHint}>
            Showing sample data until you log your first visit
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  visitList: {
    gap: 10,
  },
  insightsRow: {
    paddingRight: 16,
  },
  demoHint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#636366',
    textAlign: 'center',
    marginTop: 4,
  },
});
