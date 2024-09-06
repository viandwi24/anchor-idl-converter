# anchor-idl-converter
Converter for Anchor IDL, convert your IDL from anchor new version to old version.

This is a simple tool i made to convert new Anchor IDL (anchor v0.30.0+) to old Anchor IDL (anchor v0.29.0-). Im using this tool because some another tools like SolanaFM Local IDL until now still not support the new Anchor IDL.

## How to use
```bash
# use with bun
bunx anchor-idl-converter@latest to-old -i contract-idl.json -o converted-idl.json
# or with npm
npx anchor-idl-converter@latest to-old -i contract-idl.json -o converted-idl.json
# or install it globally
npm install -g anchor-idl-converter
anchor-idl-converter to-old -i contract-idl.json -o converted-idl.json
```