const fs = require('fs');
const path = require('path');

const zodiacDir = path.join(__dirname, '..', 'public', 'zodiac');
const slugs = ['ty', 'suu', 'dan', 'mao', 'thin', 'ti', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi'];

let lines = ['// Auto-generated base64 PNG data for 12 zodiac animals', 'export const ZODIAC_BASE64: Record<string, string> = {'];

for (const s of slugs) {
  const pngPath = path.join(zodiacDir, `${s}.png`);
  const buf = fs.readFileSync(pngPath);
  const b64 = `data:image/png;base64,${buf.toString('base64')}`;
  lines.push(`  ${s}: "${b64}",`);
}

lines.push('};');
lines.push('');

const targetPath = path.join(__dirname, '..', 'components', 'zodiac', 'zodiacData.ts');
fs.writeFileSync(targetPath, lines.join('\n'), 'utf8');
console.log('Successfully generated zodiacData.ts!');
