import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Home({ onLogout }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processed, setProcessed] = useState(false);
  const [captured, setCaptured] = useState(require('../assets/skeleton.png'));

  // 🟩 NEW STATE: to show dieline preview
  const [dielineGenerated, setDielineGenerated] = useState(false);

  const runSegmentation = () => {
    setRunning(true);
    setProcessed(false);
    setProgress(0);
    setDielineGenerated(false); // reset preview when rerunning
    // simulate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 12) + 8; // increment
        if (next >= 100) {
          clearInterval(interval);
          setProgress(100);
          setRunning(false);
          setProcessed(true);
        }
        return Math.min(next, 100);
      });
    }, 180);
  };

  const onCapture = () => {
    // placeholder - in a real app open camera
    setCaptured(require('../assets/skeleton.png'));
  };

  // 🟩 NEW FUNCTION: simulates dieline generation
  const onGenerateDieline = () => {
    setDielineGenerated(true);
  };

  return (
    <LinearGradient
      colors={['#F3E095', '#DACC96', '#999999']}
      locations={[0, 0.28, 1.0]}
      style={styles.root}
    >
      <View style={styles.nav}>
        <Image
          source={require('../assets/cartoniq_only-removebg-preview.png')}
          style={styles.brandLogo}
        />
        <TouchableOpacity onPress={onLogout} style={styles.avatar}>
          <Image source={require('../assets/me.jpg')} style={styles.avatarImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.panels}>
        {/* LEFT PANEL */}
        <View style={[styles.panel, styles.leftPanel]}>
          <View style={styles.photoCard}>
            <Image source={captured} style={styles.photo} />
            <View style={styles.photoActions}>
              <TouchableOpacity style={styles.captureBtn} onPress={onCapture}>
                <Text style={styles.captureText}>Capture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallBtn} onPress={() => {}}>
                <Text style={styles.smallBtnText}>⟳</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CENTER PANEL */}
        <View style={[styles.panel, styles.centerPanel]}>
          {running ? (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Processing image...</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
          ) : processed ? (
            <View style={styles.resultWrap}>
              <View style={styles.segCanvas}>
                {/* simple mock of segmentation visualization */}
                <View style={styles.segBox}>
                  <View style={styles.centerCrossV} />
                  <View style={styles.centerCrossH} />
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Segmentation complete - Dimensions Detected</Text>
                <View style={styles.dimRow}>
                  <View style={styles.dimCol}>
                    <Text style={styles.dimLabel}>Length</Text>
                    <Text style={styles.dimValue}>180 mm</Text>
                  </View>
                  <View style={styles.dimCol}>
                    <Text style={styles.dimLabel}>Width</Text>
                    <Text style={styles.dimValue}>116 mm</Text>
                  </View>
                </View>
                <View style={styles.dimRow}>
                  <View style={styles.dimCol}>
                    <Text style={styles.dimLabel}>Height</Text>
                    <Text style={styles.dimValue}>108 mm</Text>
                  </View>
                  <View style={styles.dimCol}>
                    <Text style={styles.dimLabel}>Weight</Text>
                    <Text style={styles.dimValue}>460 g</Text>
                  </View>
                </View>
              </View>

              <View style={styles.resultActions}>
                {/* 🟩 UPDATED BUTTON: triggers dieline preview */}
                <TouchableOpacity style={styles.confirmBtn} onPress={onGenerateDieline}>
                  <Text style={styles.confirmText}>Confirm & Generate Dieline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => {
                    setProcessed(false);
                    setProgress(0);
                    setDielineGenerated(false);
                  }}
                >
                  <Text style={styles.smallBtnText}>⟳</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.runBtn} onPress={runSegmentation} activeOpacity={0.85}>
              <Text style={styles.runText}>Run Segmentation Model</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* RIGHT PANEL */}
        <View style={[styles.panel, styles.rightPanel]}>
          {/* 🟩 SHOW DIELINE PREVIEW WHEN GENERATED */}
          {dielineGenerated ? (
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Generated Dieline Preview</Text>
              <Image
                source={require('../assets/dieline.png')}
                style={styles.previewImage}
              />
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                No results yet. Run the model to see output.
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  nav: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#e0c98a',
    borderBottomWidth: 1,
  },
  brand: { fontWeight: '700', color: '#0f172a' },
  brandLogo: { width: 120, height: 120, resizeMode: 'contain' },
  avatar: { width: 36, height: 36, borderRadius: 18, overflow: 'hidden' },
  avatarImg: { width: 36, height: 36 },
  panels: { flex: 1, flexDirection: width > 700 ? 'row' : 'column', padding: 24, gap: 24 },
  panel: { flex: 1, backgroundColor: '#fff', marginHorizontal: 12, borderRadius: 4, minHeight: 300, elevation: 4 },
  leftPanel: { flex: 1.2, padding: 20 },
  centerPanel: { flex: 1.1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  rightPanel: { flex: 1, padding: 20 },
  photoCard: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 6,
    borderRadius: 2,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  photo: { width: '100%', aspectRatio: 2 / 3, resizeMode: 'contain', marginBottom: 12, flexShrink: 1 },
  photoActions: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, marginTop: 12 },
  captureBtn: { backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12 },
  captureText: { color: '#fff', fontWeight: '700' },
  smallBtn: { backgroundColor: '#000', width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  smallBtnText: { color: '#fff', fontSize: 18 },
  runBtn: { backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 24 },
  runText: { color: '#fff', fontWeight: '700' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#6b7280' },
  processingContainer: { alignItems: 'center' },
  processingText: { marginBottom: 12, color: '#374151' },
  progressBar: { width: 260, height: 12, backgroundColor: '#e6e6e6', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#10b981' },
  resultWrap: { width: '100%', alignItems: 'center' },
  segCanvas: {
    width: '100%',
    height: 320,
    backgroundColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  segBox: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    backgroundColor: '#0f172a33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCrossV: { position: 'absolute', width: 2, height: '80%', backgroundColor: '#60a5fa' },
  centerCrossH: { position: 'absolute', height: 2, width: '80%', backgroundColor: '#60a5fa' },
  infoBox: { backgroundColor: '#ecfdf5', padding: 12, width: '100%', borderRadius: 4, marginBottom: 12 },
  infoTitle: { fontSize: 12, color: '#065f46', marginBottom: 8 },
  dimRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dimCol: { width: '48%', padding: 8, backgroundColor: '#fff', borderRadius: 4, marginBottom: 8 },
  dimLabel: { fontSize: 11, color: '#6b7280' },
  dimValue: { fontSize: 16, fontWeight: '700', color: '#111827' },
  resultActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  confirmBtn: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24 },
  confirmText: { color: '#fff', fontWeight: '700' },

  // 🟩 NEW STYLES
  previewContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  previewTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#111827' },
  previewImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
});
