import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useState, useRef } from 'react';
import Home from './screens/Home';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignIn = () => {
    console.log('Sign in pressed', { email, password, rememberMe });
    // for now, just toggle logged in state
    setLoggedIn(true);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in pressed');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign in pressed');
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign in pressed');
  };

  const handleMicrosoftSignIn = () => {
    console.log('Microsoft sign in pressed');
  };

  // animated scale for checkbox press feedback
  const checkboxScale = useRef(new Animated.Value(1)).current;
  const animateCheckbox = (toValue) => {
    Animated.spring(checkboxScale, { toValue, useNativeDriver: true, friction: 6 }).start();
  };

  // Always show login immediately (no landing screen)
  if (loggedIn) {
    return <Home onLogout={() => setLoggedIn(false)} />;
  }

  return (
    <View style={styles.container}>
      {/* Left Column - Background Image (70%) */}
      <View style={styles.imageColumn}>
        <Image
          source={require('./assets/carton.jpg')}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={0}
        />
      </View>

      {/* Right Column - Login Container (30%) */}
      <LinearGradient
        colors={['#F3E095', '#DACC96', '#999999']}
        locations={[0, 0.28, 1.0]}
        style={styles.loginColumn}
      >
        <View style={styles.loginContainer}>
          {/* Logo and Title */}
          <View style={styles.logoSection}>
            <Image
              source={require('./assets/cartoniq.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.appName}>CartonIQ</Text>
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome to CartonIQ</Text>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Email or phone number"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me and Forgot Password */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  onPressIn={() => animateCheckbox(0.95)}
                  onPressOut={() => animateCheckbox(1)}
                  activeOpacity={0.8}
                >
                  <Animated.View style={[styles.checkbox, rememberMe && styles.checkboxChecked, { transform: [{ scale: checkboxScale }] }] }>
                    {rememberMe && <FontAwesome name="check" size={10} color="#fff" />}
                  </Animated.View>
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8}>
              <LinearGradient
                colors={['#F3E095', '#DACC96']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInButton}
              >
                <Text style={styles.signInButtonText}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Social icon-only buttons: Google, Facebook, Apple, Microsoft */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialIconButton}
                onPress={handleGoogleSignIn}
                activeOpacity={0.8}
                accessibilityLabel="Sign in with Google"
              >
                <Image
                  source={require('./assets/google-icon.png')}
                  style={styles.googleIcon}
                  contentFit="contain"
                  transition={0}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIconButton}
                onPress={handleFacebookSignIn}
                activeOpacity={0.8}
                accessibilityLabel="Sign in with Facebook"
              >
                <Image
                  source={require('./assets/facebook-logo.png')}
                  style={styles.socialLogo}
                  contentFit="contain"
                  transition={0}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIconButton}
                onPress={handleAppleSignIn}
                activeOpacity={0.8}
                accessibilityLabel="Sign in with Apple"
              >
                <FontAwesome name="apple" size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialIconButton}
                onPress={handleMicrosoftSignIn}
                activeOpacity={0.8}
                accessibilityLabel="Sign in with Microsoft"
              >
                <FontAwesome name="windows" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Sign up now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageColumn: {
    width: '80%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  loginColumn: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '85%',
    maxWidth: 420,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 28,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  eyeIcon: {
    padding: 12,
  },
  eyeIconText: {
    fontSize: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: 4,
  },
  rememberMeText: {
    fontSize: 13,
    color: '#4b5563',
  },
  forgotPassword: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
  signInButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 16,
  },
  googleButton: {
    backgroundColor: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  googleIcon: {
    width: 28,
    height: 28,
    marginRight: 0,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    width: '100%',
  },
  socialIconButton: {
    backgroundColor: '#262626',
    width: 60,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  socialLogo: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpText: {
    fontSize: 13,
    color: '#4b5563',
  },
  signUpLink: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '600',
  },
});
