# Clean up
rm -rf dist
rm build.zip

# Build
npm run build

# Generate zip
cp manifest.json dist
cp icons/*.png dist
rm dist/hot-reload.js

TMP_MANIFEST=dist/tmp_manifest.json
cp dist/manifest.json $TMP_MANIFEST
sed -i "s#dist/#./#" $TMP_MANIFEST
sed -i "s#icons/#./#" $TMP_MANIFEST
cat $TMP_MANIFEST | jq 'del(.background)' > dist/manifest.json
rm $TMP_MANIFEST

zip build.zip -r dist
