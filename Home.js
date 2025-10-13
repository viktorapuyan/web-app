import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView, Animated } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home({ onLogout, userName = 'John Doe' }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processed, setProcessed] = useState(false);
  const [captured, setCaptured] = useState(require('../assets/skeleton.png'));
  const [dielineGenerated, setDielineGenerated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const runSegmentation = () => {
    setRunning(true);
    setProcessed(false);
    setProgress(0);
    setDielineGenerated(false);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 12) + 8;
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
    setCaptured(require('../assets/skeleton.png'));
  };

  const onGenerateDieline = () => {
    setDielineGenerated(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <View style={styles.root}>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <View style={[styles.sidebar, sidebarOpen && styles.sidebarOpen]}>
        <View style={styles.sidebarHeader}>
          <Image
            source={require('../assets/cartoniq.png')}
            style={styles.sidebarLogo}
          />
          <Text style={styles.sidebarTitle}>CartonIQ</Text>
        </View>

        <ScrollView style={styles.sidebarContent}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="home" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="camera" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Capture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="image" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="file-text-o" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Dielines</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="history" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>History</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="cog" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="question-circle" size={20} color="#1f2937" />
            <Text style={styles.menuItemText}>Help</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main Content */}
      <LinearGradient
        colors={['#F3E095', '#DACC96', '#999999']}
        locations={[0, 0.28, 1.0]}
        style={styles.mainContent}
      >
        {/* Navbar */}
        <LinearGradient
          colors={['#F3E095', '#DACC96', '#999999']}
          locations={[0, 0.28, 1.0]}
          style={styles.nav}
        >
          <View style={styles.navContent}>
            <View style={styles.navLeft}>
              <TouchableOpacity 
                style={styles.menuButton} 
                onPress={toggleSidebar}
                activeOpacity={0.7}
              >
                <FontAwesome name="bars" size={24} color="#1f2937" />
              </TouchableOpacity>
              
              <Image
                source={require('../assets/cartoniq_only-removebg-preview.png')}
                style={styles.brandLogo}
              />
            </View>

            <View style={styles.navRight}>
              <TouchableOpacity style={styles.navIcon}>
                <FontAwesome name="bell-o" size={20} color="#1f2937" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileDropdownContainer}>
                <TouchableOpacity 
                  style={styles.profileButton} 
                  onPress={toggleProfileDropdown}
                  activeOpacity={0.8}
                >
                  <Image source={require('../assets/me.jpg')} style={styles.avatarImg} />
                  <View style={styles.profileNameContainer}>
                    <Text style={styles.profileNameText}>{userName}</Text>
                  </View>
                  <FontAwesome 
                    name={profileDropdownOpen ? "chevron-up" : "chevron-down"} 
                    size={12} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>

                {profileDropdownOpen && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem}>
                      <FontAwesome name="user" size={16} color="#1f2937" />
                      <Text style={styles.dropdownItemText}>My Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dropdownItem}>
                      <FontAwesome name="cog" size={16} color="#1f2937" />
                      <Text style={styles.dropdownItemText}>Account Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dropdownItem}>
                      <FontAwesome name="credit-card" size={16} color="#1f2937" />
                      <Text style={styles.dropdownItemText}>Billing</Text>
                    </TouchableOpacity>

                    <View style={styles.dropdownDivider} />

                    <TouchableOpacity 
                      style={[styles.dropdownItem, styles.logoutItem]} 
                      onPress={onLogout}
                    >
                      <FontAwesome name="sign-out" size={16} color="#dc2626" />
                      <Text style={[styles.dropdownItemText, { color: '#dc2626' }]}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Panels */}
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.panels}>
            {/* LEFT PANEL */}
            <View style={[styles.panel, styles.leftPanel]}>
              <Text style={styles.panelTitle}>Image Capture</Text>
              <View style={styles.photoCard}>
                <Image source={captured} style={styles.photo} />
                <View style={styles.photoActions}>
                  <TouchableOpacity style={styles.captureBtn} onPress={onCapture}>
                    <FontAwesome name="camera" size={16} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.captureText}>Capture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallBtn} onPress={() => {}}>
                    <FontAwesome name="refresh" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* CENTER PANEL */}
            <View style={[styles.panel, styles.centerPanel]}>
              <Text style={styles.panelTitle}>Segmentation</Text>
              <View style={styles.centerContent}>
                {running ? (
                  <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.processingText}>Processing image...</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{progress}%</Text>
                  </View>
                ) : processed ? (
                  <View style={styles.resultWrap}>
                    <View style={styles.segCanvas}>
                      <View style={styles.segBox}>
                        <View style={styles.centerCrossV} />
                        <View style={styles.centerCrossH} />
                      </View>
                    </View>

                    <View style={styles.infoBox}>
                      <Text style={styles.infoTitle}>
                        <FontAwesome name="check-circle" size={14} color="#10b981" /> Dimensions Detected
                      </Text>
                      <View style={styles.dimGrid}>
                        <View style={styles.dimCol}>
                          <Text style={styles.dimLabel}>Length</Text>
                          <Text style={styles.dimValue}>180 mm</Text>
                        </View>
                        <View style={styles.dimCol}>
                          <Text style={styles.dimLabel}>Width</Text>
                          <Text style={styles.dimValue}>116 mm</Text>
                        </View>
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
                      <TouchableOpacity style={styles.confirmBtn} onPress={onGenerateDieline}>
                        <FontAwesome name="check" size={16} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.confirmText}>Generate Dieline</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.smallBtn}
                        onPress={() => {
                          setProcessed(false);
                          setProgress(0);
                          setDielineGenerated(false);
                        }}
                      >
                        <FontAwesome name="refresh" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.runBtn} onPress={runSegmentation} activeOpacity={0.85}>
                    <FontAwesome name="play" size={16} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.runText}>Run Segmentation</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* RIGHT PANEL */}
            <View style={[styles.panel, styles.rightPanel]}>
              <Text style={styles.panelTitle}>Dieline Preview</Text>
              {dielineGenerated ? (
                <View style={styles.previewContainer}>
                  <Image
                    source={require('../assets/dieline.png')}
                    style={styles.previewImage}
                  />
                  <View style={styles.previewActions}>
                    <TouchableOpacity style={styles.downloadBtn}>
                      <FontAwesome name="download" size={16} color="#fff" />
                      <Text style={styles.downloadText}>Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareBtn}>
                      <FontAwesome name="share-alt" size={16} color="#1f2937" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.placeholder}>
                  <FontAwesome name="file-image-o" size={48} color="#d1d5db" />
                  <Text style={styles.placeholderText}>
                    No dieline generated yet
                  </Text>
                  <Text style={styles.placeholderSubtext}>
                    Run the segmentation model to generate a dieline
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
  },
  
  // Sidebar styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  sidebar: {
    position: 'absolute',
    left: -280,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#ffffff',
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    transition: 'left 0.3s',
  },
  sidebarOpen: {
    left: 0,
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  sidebarContent: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 12,
    color: '#6b7280',
  },

  // Main content
  mainContent: {
    flex: 1,
  },
  
  // Navbar
  nav: {
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  navContent: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  brandLogo: { 
    width: 140, 
    height: 120,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  navIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarImg: { 
    width: 40, 
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover', 
  },
  profileDropdownContainer: {
    position: 'relative',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 10,
  },
  profileNameContainer: {
    flexDirection: 'column',
  },
  profileNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  dropdown: {
    position: 'absolute',
    top: 56,
    right: 0,
    width: 220,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    paddingVertical: 8,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  logoutItem: {
    marginTop: 4,
  },

  // Panels
  scrollContainer: {
    flex: 1,
  },
  panels: { 
    flex: 1, 
    flexDirection: width > 900 ? 'row' : 'column', 
    padding: 24, 
    gap: 24 
  },
  panel: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  leftPanel: { 
    flex: 1.2,
  },
  centerPanel: { 
    flex: 1.1,
  },
  centerContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPanel: { 
    flex: 1,
  },
  
  // Photo card
  photoCard: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  photo: { 
    width: '100%', 
    aspectRatio: 2 / 3, 
    resizeMode: 'contain', 
    marginBottom: 12, 
    flexShrink: 1,
    borderRadius: 8,
  },
  photoActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 10, 
    marginTop: 12,
    gap: 12,
  },
  captureBtn: { 
    backgroundColor: '#000', 
    paddingVertical: 14, 
    paddingHorizontal: 28, 
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  captureText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 15,
  },
  smallBtn: { 
    backgroundColor: '#000', 
    width: 48, 
    height: 48, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  
  // Processing
  runBtn: { 
    backgroundColor: '#000', 
    paddingVertical: 16, 
    paddingHorizontal: 32, 
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  runText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16,
  },
  processingContainer: { 
    alignItems: 'center' 
  },
  processingText: { 
    marginTop: 16,
    marginBottom: 12, 
    color: '#374151',
    fontSize: 15,
  },
  progressBar: { 
    width: 280, 
    height: 8, 
    backgroundColor: '#e5e7eb', 
    borderRadius: 8, 
    overflow: 'hidden' 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#10b981' 
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  
  // Results
  resultWrap: { 
    width: '100%', 
    alignItems: 'center' 
  },
  segCanvas: {
    width: '100%',
    height: 280,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  segBox: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#1e3a8a33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCrossV: { 
    position: 'absolute', 
    width: 2, 
    height: '80%', 
    backgroundColor: '#60a5fa' 
  },
  centerCrossH: { 
    position: 'absolute', 
    height: 2, 
    width: '80%', 
    backgroundColor: '#60a5fa' 
  },
  infoBox: { 
    backgroundColor: '#f0fdf4', 
    padding: 16, 
    width: '100%', 
    borderRadius: 12, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  infoTitle: { 
    fontSize: 14, 
    color: '#065f46', 
    marginBottom: 12,
    fontWeight: '600',
  },
  dimGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 12,
  },
  dimCol: { 
    width: '47%', 
    padding: 12, 
    backgroundColor: '#fff', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dimLabel: { 
    fontSize: 12, 
    color: '#6b7280',
    marginBottom: 4,
  },
  dimValue: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#111827' 
  },
  resultActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    gap: 12,
  },
  confirmBtn: { 
    backgroundColor: '#000', 
    paddingVertical: 14, 
    paddingHorizontal: 24, 
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  confirmText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 15,
  },

  // Preview
  placeholder: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 32,
  },
  placeholderText: { 
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
  },
  placeholderSubtext: {
    color: '#9ca3af',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  previewContainer: { 
    flex: 1, 
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  downloadBtn: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    gap: 8,
  },
  downloadText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  shareBtn: {
    backgroundColor: '#f3f4f6',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});