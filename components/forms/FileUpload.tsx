import type { DocumentPickerAsset } from "expo-document-picker";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FileUploadProps {
  files: DocumentPickerAsset[];
  onFilesChange: (files: DocumentPickerAsset[]) => void;
  label?: string;
  buttonText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  label = "קבצים מצורפים",
  buttonText = "+ הוסף קבצים",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        onFilesChange([...files, ...result.assets]);
      }
    } catch (error) {
      Alert.alert("שגיאה", "לא ניתן לבחור קבצים");
    }
  };

  const handleRemoveFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.fileButton,
          isFocused && styles.fileButtonFocused,
        ]}
        onPress={handlePickDocument}
        onPressIn={() => setIsFocused(true)}
        onPressOut={() => setIsFocused(false)}
      >
        <Text style={styles.fileButtonText}>{buttonText}</Text>
      </TouchableOpacity>

      {files && files.length > 0 && (
        <View style={styles.filesList}>
          {files.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveFile(index)}
                style={styles.removeFileButton}
              >
                <Text style={styles.removeFileText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
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
  fileButton: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fileButtonFocused: {
    borderColor: "#FF8800",
    borderWidth: 2,
  },
  fileButtonText: {
    fontSize: 16,
    color: "#FF8800",
    fontWeight: "600",
  },
  filesList: {
    marginTop: 12,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  fileName: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    textAlign: "right",
    marginRight: 8,
  },
  removeFileButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  removeFileText: {
    fontSize: 18,
    color: "#dc2626",
    fontWeight: "bold",
  },
});

export default FileUpload;

