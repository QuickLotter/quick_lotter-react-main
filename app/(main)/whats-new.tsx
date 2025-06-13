import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// US STATES DATA - with launch month/year and fun emojis
const allStates = [
  {
    code: "NY",
    name: "New York",
    emoji: "🗽",
    color: "#0E4CA1",
    date: "Jan 05, 2025",
  },
  {
    //code: "PA",
    //name: "Pennsylvania",
    //emoji: "🦅",
    //color: "#274B9F",
    //date: "Feb 10, 2025",
    //},
    //{
    //code: "OH",
    //name: "Ohio",
    //emoji: "🏟️",
    //color: "#A239CA",
    //date: "Mar 15, 2025",
    //},
    //{
    //code: "TX",
    //name: "Texas",
    //emoji: "🤠",
    //color: "#2497D2",
    //date: "Apr 12, 2025",
    //},
    //{
    //code: "CA",
    //name: "California",
    //emoji: "🌴",
    //color: "#FFAD42",
    //date: "May 16, 2025",
    //},
    //{
    //code: "IN",
    //name: "Indiana",
    //emoji: "🎉",
    //color: "#7766DA",
    //date: "June 24, 2025",
    //},
    // Next: simulated rollout in order (can randomize as you go)
    //{
    //code: "FL",
    //name: "Florida",
    //emoji: "🌞",
    //color: "#FDD835",
    //date: "July 18, 2025",
    //},
    //{
    //code: "IL",
    //name: "Illinois",
    //emoji: "🌽",
    //color: "#17A589",
    //date: "Aug 10, 2025",
    //},
    //{
    //code: "NJ",
    //name: "New Jersey",
    //emoji: "🏖️",
    //color: "#1F618D",
    //date: "Sep 01, 2025",
    //},
    //{
    //code: "GA",
    //name: "Georgia",
    //emoji: "🍑",
    //color: "#E67E22",
    //date: "Sep 18, 2025",
    //},
    //{
    //code: "NC",
    //name: "North Carolina",
    //emoji: "🏝️",
    //color: "#2874A6",
    //date: "Oct 03, 2025",
    //},
    //{
    //code: "AZ",
    //name: "Arizona",
    //emoji: "🌵",
    //color: "#F39C12",
    //date: "Oct 18, 2025",
    //},
    //{
    //code: "MI",
    //name: "Michigan",
    //emoji: "🚗",
    //color: "#2980B9",
    //date: "Nov 07, 2025",
    //},
    //{
    //code: "WA",
    //name: "Washington",
    //emoji: "🌲",
    //color: "#16A085",
    //date: "Nov 27, 2025",
    //},
    //{
    //code: "MA",
    //name: "Massachusetts",
    //emoji: "🏴‍☠️",
    //color: "#2E86C1",
    //date: "Dec 13, 2025",
    //},
    //{
    //code: "WI",
    //name: "Wisconsin",
    //emoji: "🧀",
    //color: "#FFB400",
    //date: "Jan 2026",
    //},
    //{
    //code: "MN",
    //name: "Minnesota",
    //emoji: "⛷️",
    //color: "#7D3C98",
    //date: "Jan 2026",
    //},
    //{
    //code: "CO",
    //name: "//colorado",
    //emoji: "⛰️",
    //color: "#45B39D",
    //date: "Feb 2026",
    //},
    //{
    //code: "TN",
    //name: "Tennessee",
    //emoji: "🎸",
    //color: "#DC7633",
    //date: "Feb 2026",
    //},
    //{
    //code: "MO",
    //name: "Missouri",
    //emoji: "🌉",
    //color: "#5D6D7E",
    //date: "Mar 2026",
    //},
    //{
    //code: "MD",
    //name: "Maryland",
    //emoji: "🦀",
    //color: "#1C2833",
    //date: "Mar 2026",
    //},
    //{
    //code: "SC",
    //name: "South Carolina",
    //emoji: "🌊",
    //color: "#2E4053",
    //date: "Apr 2026",
    //},
    //{
    //code: "VA",
    //name: "Virginia",
    //emoji: "🍁",
    //color: "#C0392B",
    //date: "Apr 2026",
    //},
    //{
    //code: "LA",
    //name: "Louisiana",
    //emoji: "🎷",
    //color: "#AF601A",
    //date: "May 2026",
    //},
    //{
    //code: "AL",
    //name: "Alabama",
    //emoji: "🚤",
    //color: "#2980B9",
    //date: "May 2026",
    //},
    //{
    //code: "OR",
    //name: "Oregon",
    //emoji: "🌲",
    //color: "#117864",
    //date: "Jun 2026",
    //},
    //{
    //code: "KY",
    //name: "Kentucky",
    //emoji: "🏇",
    //color: "#5DADE2",
    //date: "Jun 2026",
    //},
    //{
    //code: "OK",
    //name: "Oklahoma",
    //emoji: "🛢️",
    //color: "#A569BD",
    //date: "Jul 2026",
    //},
    //{ //code: "IA", //name: "Iowa", //emoji: "🌾", //color: "#52BE80", //date: "Jul 2026" //},
    //{
    //code: "MS",
    //name: "Mississippi",
    //emoji: "🎺",
    //color: "#B03A2E",
    //date: "Aug 2026",
    //},
    //{
    //code: "AR",
    //name: "Arkansas",
    //emoji: "💎",
    //color: "#884EA0",
    //date: "Aug 2026",
    //},
    //{
    //code: "NV",
    //name: "Nevada",
    //emoji: "🎰",
    //color: "#F4D03F",
    //date: "Sep 2026",
    //},
    //{
    //code: "NM",
    //name: "New Mexico",
    //emoji: "🌶️",
    //color: "#B9770E",
    //date: "Sep 2026",
    //},
    //{
    //code: "KS",
    //name: "Kansas",
    //emoji: "🌻",
    //color: "#F1C40F",
    //date: "Oct 2026",
    //},
    //{ //code: "UT", //name: "Utah", //emoji: "🧂", //color: "#B2BABB", //date: "Oct 2026" //},
    //{
    //code: "NE",
    //name: "Nebraska",
    //emoji: "🐮",
    //color: "#CD6155",
    //date: "Nov 2026",
    //},
    //{
    //code: "WV",
    //name: "West Virginia",
    //emoji: "⛺",
    //color: "#239B56",
    //date: "Nov 2026",
    //},
    //{
    //code: "ID",
    //name: "Idaho",
    //emoji: "🥔",
    //color: "#B7950B",
    //date: "Dec 2026",
    //},
    //{
    //code: "ME",
    //name: "Maine",
    //emoji: "🦞",
    //color: "#5DADE2",
    //date: "Dec 2026",
    //},
    //{
    //code: "NH",
    //name: "New Hampshire",
    //emoji: "⛳",
    //color: "#138D75",
    //date: "Jan 2027",
    //},
    //{
    //code: "MT",
    //name: "Montana",
    //emoji: "🏔️",
    //color: "#626567",
    //date: "Jan 2027",
    //},
    //{
    //code: "DE",
    //name: "Delaware",
    //emoji: "💎",
    //color: "#5B2C6F",
    //date: "Feb 2027",
    //},
    //{
    //code: "SD",
    //name: "South Dakota",
    //emoji: "🦬",
    //color: "#34495E",
    //date: "Feb 2027",
    //},
    //{
    //code: "ND",
    //name: "North Dakota",
    //emoji: "🌾",
    //color: "#2471A3",
    //date: "Mar 2027",
    //},
    //{
    //code: "VT",
    //name: "Vermont",
    //emoji: "🍁",
    //color: "#229954",
    //date: "Mar 2027",
    //},
    //{
    //code: "WY",
    //name: "Wyoming",
    //emoji: "🐴",
    //color: "#F1948A",
    //date: "Apr 2027",
    //},
    //{
    //code: "DC",
    //name: "District of Columbia",
    //emoji: "🏛️",
    //color: "#7B7D7D",
    //date: "Apr 2027",
    //},
    //{
    //code: "RI",
    //name: "Rhode Island",
    //emoji: "⚓",
    //color: "#85929E",
    //date: "May 2027",
  },
];

// Example description per state (can customize or randomize)
function getDesc(state) {
  switch (state.code) {
    case "NY":
      return "Our journey began here! Full support for Powerball, Mega Millions, NY Lotto, Take 5, Win 4, and more.";
    case "CA":
      return "Welcome, California! Golden State players now enjoy full analysis and direct print for SuperLotto Plus and more.";
    case "TX":
      return "Lone Star gets the power! Texas Lotto, Cash Five, and all major games ready to play and analyze.";
    case "FL":
      return "Florida's sunshine now powers Quick Lotter. Try Powerball, Lotto, and Fantasy 5 with all premium features.";
    default:
      return `Quick Lotter now supports all major state games, including Powerball and Mega Millions!`;
  }
}

export default function WhatsNewScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top - 20 }} />
        <ResponsiveContainer>
          <View style={styles.emojiBox}>
            <Text style={styles.emoji}></Text>
          </View>
          <Text style={styles.title}>What’s New: State by State</Text>
          <Text style={styles.subtitle}>
            Quick Lotter is rolling out across America — track which states are
            live, and see upcoming launches!
          </Text>

          {/* Dynamic "news feed" with all states */}
          {allStates.map((item, idx) => (
            <View
              key={item.code}
              style={[
                styles.newsCard,
                {
                  backgroundColor: "#fff",
                  borderLeftColor: item.color,
                  borderLeftWidth: 5,
                  marginTop: idx === 0 ? 0 : 10,
                  shadowColor: item.color + "22",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text style={styles.newsEmoji}>{item.emoji}</Text>
                <Text style={styles.newsState}>{item.name}</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>
              <Text style={styles.newsHeadline}>
                {item.code === "NY"
                  ? "Quick Lotter Launch"
                  : item.code === "CA"
                  ? "Golden State Goes Live"
                  : item.code === "TX"
                  ? "Now in Texas"
                  : item.code === "FL"
                  ? "Florida Launch"
                  : item.code === "IN"
                  ? "Indiana Joins!"
                  : item.code === "PA"
                  ? "Pennsylvania Arrives"
                  : item.code === "OH"
                  ? "Now in Ohio"
                  : "Now Supported"}
              </Text>
              <Text style={styles.newsDesc}>{getDesc(item)}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.85}
            onPress={() => {
              /* TODO: link to full roadmap or all states page */
            }}
          >
            <Ionicons
              name="earth"
              size={17}
              color="#0E4CA1"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.moreButtonText}>
              See full state rollout plan
            </Text>
          </TouchableOpacity>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    paddingBottom: 48,
    backgroundColor: "#F2F2F7",
  },
  emojiBox: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 0,
  },
  emoji: {
    fontSize: 38,
    marginBottom: 3,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#05549E",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15.5,
    color: "#545B6B",
    textAlign: "center",
    marginBottom: 23,
    fontWeight: "500",
    lineHeight: 22,
  },
  newsCard: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
    gap: 1,
  },
  newsEmoji: {
    fontSize: 22,
    marginRight: 8,
  },
  newsState: {
    fontWeight: "700",
    fontSize: 16.3,
    color: "#0E4CA1",
    letterSpacing: -0.2,
    marginRight: 7,
  },
  newsDate: {
    color: "#9495A1",
    fontSize: 13,
    fontWeight: "500",
  },
  newsHeadline: {
    fontWeight: "700",
    color: "#1A2333",
    fontSize: 17,
    marginTop: 2,
    marginBottom: 2,
    letterSpacing: -0.08,
  },
  newsDesc: {
    fontSize: 14.5,
    color: "#454859",
    lineHeight: 21,
    fontWeight: "400",
  },
  moreButton: {
    flexDirection: "row",
    backgroundColor: "#E7F0FE",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    marginTop: 18,
    marginBottom: 28,
  },
  moreButtonText: {
    color: "#05549E",
    fontWeight: "700",
    fontSize: 15.7,
    letterSpacing: 0.2,
  },
});
