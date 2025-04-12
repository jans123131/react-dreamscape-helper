
const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson;

try {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  packageJson = JSON.parse(packageJsonContent);

  // Add dev script if it doesn't exist
  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = "vite";
  }

  // Add build:dev script if it doesn't exist
  if (!packageJson.scripts["build:dev"]) {
    packageJson.scripts["build:dev"] = "vite build --mode development";
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Successfully added "dev" and "build:dev" scripts to package.json');

} catch (error) {
  console.error('❌ Error updating package.json:', error);
}
