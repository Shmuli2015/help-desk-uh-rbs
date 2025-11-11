import type { DocumentPickerAsset } from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import FileUpload from "../../components/forms/FileUpload";
import RolePicker from "../../components/forms/RolePicker";
import FormContainer from "../../components/layout/FormContainer";
import Header from "../../components/layout/Header";
import OrangeGradientBackground from "../../components/layout/OrangeGradientBackground";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Input from "../../components/ui/Input";

const { height } = Dimensions.get("window");

// רשימת בעלי תפקידים לדוגמה
const ROLES = [
  "מנהל מערכת",
  "מנהל טכני",
  "תמיכה טכנית",
  "מנהל אבטחה",
  "מנהל רשת",
];

const NewRequestScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [referralDetails, setReferralDetails] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [files, setFiles] = useState<DocumentPickerAsset[]>([]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const isButtonDisabled = !title.trim() || !selectedRole;

  const handleSubmit = () => {
    if (isButtonDisabled) return;
    Alert.alert("הצלחה", "הפנייה נשלחה בהצלחה!", [
      {
        text: "אישור",
        onPress: () => {
          setTitle("");
          setReferralDetails("");
          setSelectedRole(null);
          setFiles([]);
        },
      },
    ]);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    router.replace("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <OrangeGradientBackground>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header
            title="פנייה חדשה"
            subtitle="מלא את הפרטים הבאים כדי לשלוח פנייה"
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

          <FormContainer>
            <Animated.View entering={FadeInUp.duration(600).delay(600)}>
              <Input
                label="כותרת"
                placeholder="הכנס כותרת לפנייה"
                value={title}
                onChangeText={setTitle}
                multiline
                numberOfLines={2}
                style={styles.multilineInput}
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(700)}>
              <Input
                label="פרטי הפניה"
                placeholder="הכנס פרטים נוספים על הפנייה"
                value={referralDetails}
                onChangeText={setReferralDetails}
                multiline
                numberOfLines={4}
                style={styles.multilineInput}
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(800)}>
              <RolePicker
                roles={ROLES}
                selectedRole={selectedRole}
                onSelectRole={setSelectedRole}
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
              <FileUpload files={files} onFilesChange={setFiles} />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(1100)}>
              <Button
                title="שלח"
                onPress={handleSubmit}
                disabled={isButtonDisabled}
                style={styles.button}
              />
            </Animated.View>
          </FormContainer>
        </ScrollView>
      </OrangeGradientBackground>

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100,
    minHeight: height,
  },
  multilineInput: {
    minHeight: 50,
  },
  button: {
    marginTop: 12,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default NewRequestScreen;
