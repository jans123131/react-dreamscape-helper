import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../common/design';

// Get screen dimensions
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  card: {
    marginHorizontal: width * 0.05,
    padding: width * 0.05,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: 'white',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    height: height * 0.06,
  },
  input: {
    flex: 1,
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  forgotPassword: {
    color: '#b8658f',
    textAlign: 'right',
    marginBottom: height * 0.02,
    fontSize: width * 0.035,
  },
  gradientButton: {
    borderRadius: 8,
    padding: height * 0.018,
    marginVertical: height * 0.01,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: height * 0.018,
  },
  googleText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  bottomText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  signupLink: {
    color: '#b8658f',
    fontWeight: 'bold',
  },
});

export default styles;
