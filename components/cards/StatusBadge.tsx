import React from "react";
import { StyleSheet, Text, View } from "react-native";

type RequestStatus = "פתוח" | "בטיפול" | "סגור";

interface StatusBadgeProps {
  status: RequestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "פתוח":
        return "#ef4444";
      case "בטיפול":
        return "#f59e0b";
      case "סגור":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusBgColor = (status: RequestStatus) => {
    switch (status) {
      case "פתוח":
        return "#fee2e2";
      case "בטיפול":
        return "#fef3c7";
      case "סגור":
        return "#d1fae5";
      default:
        return "#f3f4f6";
    }
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getStatusBgColor(status) },
      ]}
    >
      <Text style={[styles.text, { color: getStatusColor(status) }]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default StatusBadge;

