# Clean up
rm -rf dist
rm build.zip

# Build
npm run build

# Generate zip
cp manifest.json dist
sed -i s/dist/./ dist/manifest.json
zip build.zip -r dist
