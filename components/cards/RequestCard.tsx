import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import StatusBadge from "./StatusBadge";

type RequestStatus = "פתוח" | "בטיפול" | "סגור";

interface Request {
  id: string;
  title: string;
  role: string;
  status: RequestStatus;
  date: string;
  description: string;
}

interface RequestCardProps {
  request: Request;
  index?: number;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, index = 0 }) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(600).delay(index * 100)}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{request.title}</Text>
        </View>
        <StatusBadge status={request.status} />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>בעל תפקיד:</Text>
          <Text style={styles.detailValue}>{request.role}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>תאריך:</Text>
          <Text style={styles.detailValue}>{request.date}</Text>
        </View>
      </View>

      <Text style={styles.description}>{request.description}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "right",
  },
  details: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#374151",
    textAlign: "right",
    lineHeight: 20,
  },
});

export default RequestCard;

