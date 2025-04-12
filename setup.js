
const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson;

try {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  packageJson = JSON.parse(packageJsonContent);

  // Add dev script if it doesn't exist
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = "vite";
    console.log('✅ Added "dev" script to package.json');
  }

  // Add build:dev script if it doesn't exist
  if (!packageJson.scripts["build:dev"]) {
    packageJson.scripts["build:dev"] = "vite build --mode development";
    console.log('✅ Added "build:dev" script to package.json');
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Successfully updated package.json');

} catch (error) {
  console.error('❌ Error updating package.json:', error);
}

console.log('✨ Setup complete! You can now run:');
console.log('npm run dev      - To start the development server');
console.log('npm run build:dev - To build the project for development');
