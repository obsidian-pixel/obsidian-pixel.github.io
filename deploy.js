const fs = require('fs-extra');
const path = require('path');

async function deploy() {
  const distPath = path.join(__dirname, 'dist');
  const rootPath = __dirname;
  
  // Files and dirs to exclude from copying
  const exclude = [
    'node_modules',
    'src',
    'dist',
    '.git',
    '.vscode',
    'coverage',
    '.storybook',
    'deploy.js',
    'package.json',
    'package-lock.json',
    'webpack.config.js',
    'babel.config.js',
    'jest.config.js',
    'tsconfig.json',
    'tsconfig.vscode.json',
    '.babelrc',
    '.eslintrc.js',
    '.prettierrc',
    'README.md'
  ];

  try {
    // Read dist directory
    const files = await fs.readdir(distPath);
    
    console.log('🚀 Deploying to GitHub Pages...');
    
    // Copy each file from dist to root
    for (const file of files) {
      const srcFile = path.join(distPath, file);
      const destFile = path.join(rootPath, file);
      
      await fs.copy(srcFile, destFile, { overwrite: true });
      console.log(`✅ Copied: ${file}`);
    }
    
    console.log('\n✨ Deployment complete! Commit and push to deploy to GitHub Pages.');
    console.log('Run: git add . && git commit -m "Deploy" && git push');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

deploy();
