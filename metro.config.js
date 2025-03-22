
const { getDefaultConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add all required extensions
defaultConfig.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');
defaultConfig.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

module.exports = defaultConfig;