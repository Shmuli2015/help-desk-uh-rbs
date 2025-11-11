import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface RolePickerProps {
  roles: string[];
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
  label?: string;
  placeholder?: string;
}

const RolePicker: React.FC<RolePickerProps> = ({
  roles,
  selectedRole,
  onSelectRole,
  label = "בעל תפקיד",
  placeholder = "בחר בעל תפקיד",
}) => {
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (role: string) => {
    onSelectRole(role);
    setShowRolePicker(false);
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.rolePicker,
          isFocused && styles.rolePickerFocused,
          selectedRole && styles.rolePickerSelected,
        ]}
        onPress={() => {
          setShowRolePicker(!showRolePicker);
          setIsFocused(!showRolePicker);
        }}
      >
        <Text
          style={[
            styles.rolePickerText,
            !selectedRole && styles.rolePickerPlaceholder,
          ]}
        >
          {selectedRole || placeholder}
        </Text>
        <Text style={styles.rolePickerArrow}>{showRolePicker ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      <Modal
        visible={showRolePicker}
        transparent
        animationType="none"
        onRequestClose={() => {
          setShowRolePicker(false);
          setIsFocused(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setShowRolePicker(false);
            setIsFocused(false);
          }}
        >
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            style={styles.modalContent}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.roleList}>
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  {roles.map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleItem,
                        selectedRole === role && styles.roleItemSelected,
                      ]}
                      onPress={() => handleSelect(role)}
                    >
                      <Text
                        style={[
                          styles.roleItemText,
                          selectedRole === role && styles.roleItemTextSelected,
                        ]}
                      >
                        {role}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    textAlign: "right",
  },
  rolePicker: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rolePickerFocused: {
    borderColor: "#FF8800",
    borderWidth: 2,
  },
  rolePickerSelected: {
    borderColor: "#FF8800",
    borderWidth: 2,
  },
  rolePickerText: {
    fontSize: 16,
    color: "#111827",
    textAlign: "right",
    flex: 1,
  },
  rolePickerPlaceholder: {
    color: "#9ca3af",
  },
  rolePickerArrow: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
  },
  roleList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
    maxHeight: 300,
  },
  roleItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  roleItemSelected: {
    backgroundColor: "#fff7ed",
  },
  roleItemText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "right",
  },
  roleItemTextSelected: {
    color: "#FF8800",
    fontWeight: "600",
  },
});

export default RolePicker;
