
import { registerRootComponent } from 'expo';
import App from './App';

// Register the main component
registerRootComponent(App);

// For web support
if (module.hot) {
  module.hot.accept();
}

// IMPORTANT: Add the following scripts to your package.json file:
// "scripts": {
//   "dev": "expo start",
//   "build:dev": "vite build --mode development"
// }
// These scripts are required for proper building of the app
// You need to run 'node scripts/setup-scripts.js' to automatically add these scripts
