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
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Sign up form states
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animated values for text inputs
  const emailBorderAnim = useRef(new Animated.Value(0)).current;
  const emailScaleAnim = useRef(new Animated.Value(1)).current;
  const passwordBorderAnim = useRef(new Animated.Value(0)).current;
  const passwordScaleAnim = useRef(new Animated.Value(1)).current;
  const signUpNameBorderAnim = useRef(new Animated.Value(0)).current;
  const signUpNameScaleAnim = useRef(new Animated.Value(1)).current;
  const signUpEmailBorderAnim = useRef(new Animated.Value(0)).current;
  const signUpEmailScaleAnim = useRef(new Animated.Value(1)).current;
  const signUpPasswordBorderAnim = useRef(new Animated.Value(0)).current;
  const signUpPasswordScaleAnim = useRef(new Animated.Value(1)).current;
  const signUpConfirmPasswordBorderAnim = useRef(new Animated.Value(0)).current;
  const signUpConfirmPasswordScaleAnim = useRef(new Animated.Value(1)).current;

  // Animation handlers for Sign In
  const handleEmailFocus = () => {
    Animated.parallel([
      Animated.timing(emailBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(emailScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handleEmailBlur = () => {
    Animated.parallel([
      Animated.timing(emailBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(emailScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handlePasswordFocus = () => {
    Animated.parallel([
      Animated.timing(passwordBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(passwordScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handlePasswordBlur = () => {
    Animated.parallel([
      Animated.timing(passwordBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(passwordScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  // Animation handlers for Sign Up
  const handleSignUpNameFocus = () => {
    Animated.parallel([
      Animated.timing(signUpNameBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpNameScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handleSignUpNameBlur = () => {
    Animated.parallel([
      Animated.timing(signUpNameBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpNameScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSignUpEmailFocus = () => {
    Animated.parallel([
      Animated.timing(signUpEmailBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpEmailScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handleSignUpEmailBlur = () => {
    Animated.parallel([
      Animated.timing(signUpEmailBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpEmailScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSignUpPasswordFocus = () => {
    Animated.parallel([
      Animated.timing(signUpPasswordBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpPasswordScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handleSignUpPasswordBlur = () => {
    Animated.parallel([
      Animated.timing(signUpPasswordBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpPasswordScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSignUpConfirmPasswordFocus = () => {
    Animated.parallel([
      Animated.timing(signUpConfirmPasswordBorderAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpConfirmPasswordScaleAnim, { toValue: 1.02, friction: 3, useNativeDriver: true }),
    ]).start();
  };
  const handleSignUpConfirmPasswordBlur = () => {
    Animated.parallel([
      Animated.timing(signUpConfirmPasswordBorderAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.spring(signUpConfirmPasswordScaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSignIn = () => {
    console.log('Sign in pressed', { email, password, rememberMe });
    setShowWelcome(true);
    setTimeout(() => {
      setShowWelcome(false);
      setLoggedIn(true);
    }, 2000);
  };

  const handleSignUp = () => {
    console.log('Sign up pressed', { signUpName, signUpEmail, signUpPassword });
    setUserName(signUpName);
    setShowWelcome(true);
    setTimeout(() => {
      setShowWelcome(false);
      setLoggedIn(true);
    }, 2000);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setSignUpName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpConfirmPassword('');
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

  const checkboxScale = useRef(new Animated.Value(1)).current;
  const animateCheckbox = (toValue) => {
    Animated.spring(checkboxScale, { toValue, useNativeDriver: true, friction: 6 }).start();
  };

  // Interpolate border colors
  const emailBorderColor = emailBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });
  const passwordBorderColor = passwordBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });
  const signUpNameBorderColor = signUpNameBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });
  const signUpEmailBorderColor = signUpEmailBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });
  const signUpPasswordBorderColor = signUpPasswordBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });
  const signUpConfirmPasswordBorderColor = signUpConfirmPasswordBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#3b82f6'],
  });

  if (loggedIn) {
    return <Home onLogout={() => setLoggedIn(false)} userName={userName} />;
  }

  if (showWelcome) {
    return (
      <LinearGradient
        colors={['#F3E095', '#DACC96', '#999999']}
        locations={[0, 0.28, 1.0]}
        style={styles.welcomeScreen}
      >
        <View style={styles.welcomeContent}>
          <Image
            source={require('./assets/cartoniq.png')}
            style={styles.welcomeLogo}
            contentFit="contain"
          />
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>{userName}</Text>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
            <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Left Column - Background Image (80%) */}
      <View style={styles.imageColumn}>
        <Image
          source={require('./assets/carton.jpg')}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={0}
        />
      </View>

      {/* Right Column - Login/SignUp Container (20%) */}
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
          <Text style={styles.welcomeText}>
            {isSignUp ? 'Create Your Account' : 'Welcome to CartonIQ'}
          </Text>

          {/* Conditional Render: Sign In or Sign Up Form */}
          {!isSignUp ? (
            // SIGN IN FORM
            <View style={styles.formContainer}>
              {/* Email Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Login</Text>
                <Animated.View
                  style={[
                    styles.animatedInputWrapper,
                    {
                      borderColor: emailBorderColor,
                      transform: [{ scale: emailScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Email or phone number"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Animated.View>
              </View>

              {/* Password Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Animated.View
                  style={[
                    styles.animatedPasswordWrapper,
                    {
                      borderColor: passwordBorderColor,
                      transform: [{ scale: passwordScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesome 
                      name={showPassword ? 'eye' : 'eye-slash'} 
                      size={18} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </Animated.View>
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

              {/* Social icon-only buttons */}
              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={[styles.socialIconButton, styles.googleButton]}
                  onPress={handleGoogleSignIn}
                  activeOpacity={0.8}
                  accessibilityLabel="Sign in with Google"
                >
                  <FontAwesome name="google" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialIconButton, styles.facebookButton]}
                  onPress={handleFacebookSignIn}
                  activeOpacity={0.8}
                  accessibilityLabel="Sign in with Facebook"
                >
                  <FontAwesome name="facebook" size={18} color="#fff" />
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
                  style={[styles.socialIconButton, styles.microsoftButton]}
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
                <TouchableOpacity onPress={toggleSignUp}>
                  <Text style={styles.signUpLink}>Sign up now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // SIGN UP FORM
            <View style={styles.formContainer}>
              {/* Full Name Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <Animated.View
                  style={[
                    styles.animatedInputWrapper,
                    {
                      borderColor: signUpNameBorderColor,
                      transform: [{ scale: signUpNameScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9ca3af"
                    value={signUpName}
                    onChangeText={setSignUpName}
                    onFocus={handleSignUpNameFocus}
                    onBlur={handleSignUpNameBlur}
                    autoCapitalize="words"
                  />
                </Animated.View>
              </View>

              {/* Email Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <Animated.View
                  style={[
                    styles.animatedInputWrapper,
                    {
                      borderColor: signUpEmailBorderColor,
                      transform: [{ scale: signUpEmailScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#9ca3af"
                    value={signUpEmail}
                    onChangeText={setSignUpEmail}
                    onFocus={handleSignUpEmailFocus}
                    onBlur={handleSignUpEmailBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Animated.View>
              </View>

              {/* Password Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Animated.View
                  style={[
                    styles.animatedPasswordWrapper,
                    {
                      borderColor: signUpPasswordBorderColor,
                      transform: [{ scale: signUpPasswordScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Create password"
                    placeholderTextColor="#9ca3af"
                    value={signUpPassword}
                    onChangeText={setSignUpPassword}
                    onFocus={handleSignUpPasswordFocus}
                    onBlur={handleSignUpPasswordBlur}
                    secureTextEntry={!showSignUpPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowSignUpPassword(!showSignUpPassword)}
                  >
                    <FontAwesome 
                      name={showSignUpPassword ? 'eye' : 'eye-slash'} 
                      size={18} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Confirm Password Input with Animation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <Animated.View
                  style={[
                    styles.animatedPasswordWrapper,
                    {
                      borderColor: signUpConfirmPasswordBorderColor,
                      transform: [{ scale: signUpConfirmPasswordScaleAnim }],
                    },
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="#9ca3af"
                    value={signUpConfirmPassword}
                    onChangeText={setSignUpConfirmPassword}
                    onFocus={handleSignUpConfirmPasswordFocus}
                    onBlur={handleSignUpConfirmPasswordBlur}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesome 
                      name={showConfirmPassword ? 'eye' : 'eye-slash'} 
                      size={18} 
                      color="#6b7280" 
                    />
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8} style={{ marginTop: 8 }}>
                <LinearGradient
                  colors={['#F3E095', '#DACC96']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signInButton}
                >
                  <Text style={styles.signInButtonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Back to Sign In Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Already have an account? </Text>
                <TouchableOpacity onPress={toggleSignUp}>
                  <Text style={styles.signUpLink}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  animatedInputWrapper: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 2,
  },
  input: {
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: 'transparent',
  },
  animatedPasswordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 2,
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
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  microsoftButton: {
    backgroundColor: '#00A4EF',
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
  welcomeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeLogo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 32,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1f2937',
    opacity: 0.3,
  },
  loadingDotDelay1: {
    opacity: 0.6,
  },
  loadingDotDelay2: {
    opacity: 0.9,
  },
});
