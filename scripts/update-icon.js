const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '..');
const appDir = path.join(rootDir, 'app');
const publicDir = path.join(rootDir, 'public');

let inputImagePath = process.argv[2];

if (!inputImagePath) {
  const candidates = [
    path.join(publicDir, 'logo.png'),
    path.join(publicDir, 'icon.png'),
    path.join(publicDir, 'logo.jpg'),
    path.join(publicDir, 'icon.jpg'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      inputImagePath = c;
      break;
    }
  }
} else if (!path.isAbsolute(inputImagePath)) {
  inputImagePath = path.join(rootDir, inputImagePath);
}

if (!inputImagePath || !fs.existsSync(inputImagePath)) {
  console.error('\n❌ Gambar sumber tidak ditemukan!');
  console.error('Silakan letakkan gambar baru Anda di: public/logo.png');
  console.error('Atau jalankan: npm run update-icon <path/ke/gambar-anda>\n');
  process.exit(1);
}

console.log(`\n🎨 Memproses ikon dari sumber: ${inputImagePath}`);

async function createStandardBmpIco(imagePath, sizes = [16, 32, 48]) {
  const images = [];

  for (const size of sizes) {
    const raw = await sharp(imagePath)
      .ensureAlpha()
      .resize(size, size)
      .raw()
      .toBuffer();

    const bgra = Buffer.alloc(size * size * 4);
    for (let y = 0; y < size; y++) {
      const srcY = size - 1 - y;
      for (let x = 0; x < size; x++) {
        const srcIdx = (srcY * size + x) * 4;
        const dstIdx = (y * size + x) * 4;
        bgra[dstIdx + 0] = raw[srcIdx + 2]; // B
        bgra[dstIdx + 1] = raw[srcIdx + 1]; // G
        bgra[dstIdx + 2] = raw[srcIdx + 0]; // R
        bgra[dstIdx + 3] = raw[srcIdx + 3]; // A
      }
    }

    const andMaskSize = Math.ceil(size / 32) * 4 * size;
    const andMask = Buffer.alloc(andMaskSize, 0);

    const bih = Buffer.alloc(40);
    bih.writeUInt32LE(40, 0);
    bih.writeInt32LE(size, 4);
    bih.writeInt32LE(size * 2, 8);
    bih.writeUInt16LE(1, 12);
    bih.writeUInt16LE(32, 14);
    bih.writeUInt32LE(0, 16);
    bih.writeUInt32LE(bgra.length + andMask.length, 20);
    bih.writeInt32LE(0, 24);
    bih.writeInt32LE(0, 28);
    bih.writeUInt32LE(0, 32);
    bih.writeUInt32LE(0, 36);

    const dibData = Buffer.concat([bih, bgra, andMask]);
    images.push({ size, dibData });
  }

  const numImages = images.length;
  const headerSize = 6;
  const dirSize = 16 * numImages;
  const header = Buffer.alloc(headerSize + dirSize);

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  let offset = headerSize + dirSize;
  for (let i = 0; i < numImages; i++) {
    const { size, dibData } = images[i];
    const entryOffset = headerSize + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset + 0);
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(dibData.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += dibData.length;
  }

  return Buffer.concat([header, ...images.map((img) => img.dibData)]);
}

async function generateIcons() {
  // 1. High resolution icon (PNG 512x512)
  const png512 = await sharp(inputImagePath).ensureAlpha().resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(appDir, 'icon.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'logo.png'), png512);

  // 2. Apple touch icon (PNG 180x180)
  const apple180 = await sharp(inputImagePath).ensureAlpha().resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), apple180);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), apple180);

  // 3. True Windows Standard BMP Multi-size Favicon.ico (16, 32, 48)
  const icoBuf = await createStandardBmpIco(inputImagePath, [16, 32, 48]);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

  console.log('✅ Berhasil memperbarui semua ikon!');
  console.log('   - app/icon.png & public/icon.png (Tab modern)');
  console.log('   - app/favicon.ico & public/favicon.ico (Multi-size BMP ICO)');
  console.log('   - app/apple-icon.png & public/apple-icon.png (Mobile)');
  console.log('\n💡 Tekan Ctrl + F5 di browser untuk melihat perubahan (Clear Cache).\n');
}

generateIcons().catch((err) => {
  console.error('❌ Gagal memproses ikon:', err);
  process.exit(1);
});
