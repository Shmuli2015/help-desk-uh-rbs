import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import RequestCard from "../../components/cards/RequestCard";
import Header from "../../components/layout/Header";
import OrangeGradientBackground from "../../components/layout/OrangeGradientBackground";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const { height } = Dimensions.get("window");

// סוגי סטטוס
type RequestStatus = "פתוח" | "בטיפול" | "סגור";

interface Request {
  id: string;
  title: string;
  role: string;
  status: RequestStatus;
  date: string;
  description: string;
}

// נתונים לדוגמה
const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    title: "בעיה בהתחברות למערכת",
    role: "מנהל מערכת",
    status: "פתוח",
    date: "2024-01-15",
    description: "לא מצליח להתחבר למערכת עם הפרטים שלי",
  },
  {
    id: "2",
    title: "עדכון תוכנה",
    role: "מנהל טכני",
    status: "בטיפול",
    date: "2024-01-14",
    description: "צריך לעדכן את התוכנה לגרסה החדשה",
  },
  {
    id: "3",
    title: "בעיית רשת",
    role: "מנהל רשת",
    status: "סגור",
    date: "2024-01-13",
    description: "החיבור לאינטרנט לא יציב",
  },
  {
    id: "4",
    title: "בקשת הרשאות",
    role: "מנהל אבטחה",
    status: "פתוח",
    date: "2024-01-12",
    description: "צריך הרשאות נוספות לגישה לקבצים",
  },
];

const RequestsScreen = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [refreshing, setRefreshing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // כאן תהיה קריאה לשרת לטעינת פניות חדשות
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    router.replace("/(auth)/login");
  };

  return (
    <OrangeGradientBackground>
      <View style={styles.container}>
        <Header
          title="פניות"
          subtitle="רשימת כל הפניות שלך"
          rightAction={
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          }
        />

        <FlatList
          data={requests}
          renderItem={({ item, index }) => (
            <RequestCard request={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Animated.View entering={FadeInDown.duration(600)}>
                <Text style={styles.emptyText}>אין פניות להצגה</Text>
              </Animated.View>
            </View>
          }
        />

        <ConfirmDialog
          visible={showLogoutDialog}
          title="התנתקות"
          message="האם אתה בטוח שברצונך להתנתק?"
          confirmText="התנתק"
          cancelText="ביטול"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogoutDialog(false)}
          icon="log-out-outline"
          variant="warning"
        />
      </View>
    </OrangeGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.7,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default RequestsScreen;
