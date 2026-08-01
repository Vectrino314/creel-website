import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const assetsDir = path.join(root, "src/assets");
const logoPath = path.join(assetsDir, "Logo-nueva-de-incentitours.png");

const WHATSAPP = "5216143946100";
const MESSAGE =
  "¡Hola buen día!, Me gustaría saber mas sobre sus paquetes de viaje";
const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;

const OG_SOURCES = {
  destinos: {
    divisadero: "Hasselblad26091819-11-Copiar.jpg",
    creel: "CREEL.png",
    chihuahua: "Mesa-de-trabajo-6-1.png",
    cuauhtemoc: "Mesa-de-trabajo-5cuau.png",
    "el-fuerte": "Mesa-de-trabajo-5cuau-1.png",
  },
  paquetes: {
    "barrancas-express": "Hasselblad26091819-11-Copiar.jpg",
    "entre-dos-pueblos-magicos": "CREEL.png",
    "altura-y-aventura": "Chepe-Express-Copiar.jpg",
    cultural:
      "303PAISAJE-PIEDRA-VOLADA-TARAHUMARA-ARNULFO-KIMARE-FOTO-ALEX-AGUIRRE-TERRAZAS-4-OCT-2014-Copiar-Copiar.jpg",
    espectacular: "Mesa-de-trabajo-5-2.png",
    maravillosa: "CREEL.png",
  },
};

await mkdir(publicDir, { recursive: true });

const logo = await readFile(logoPath);

await sharp(logo)
  .resize(180, 180, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

await sharp(logo)
  .resize(32, 32, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(path.join(publicDir, "favicon-32x32.png"));

await QRCode.toFile(path.join(publicDir, "whatsapp-qr.png"), waUrl, {
  type: "png",
  width: 180,
  margin: 2,
  errorCorrectionLevel: "M",
  color: {
    dark: "#122820",
    light: "#ffffff",
  },
});

for (const [section, entries] of Object.entries(OG_SOURCES)) {
  const outDir = path.join(publicDir, "og", section);
  await mkdir(outDir, { recursive: true });
  for (const [slug, filename] of Object.entries(entries)) {
    const source = await readFile(path.join(assetsDir, filename));
    await sharp(source)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outDir, `${slug}.jpg`));
  }
}

console.log(
  "Generated favicons, WhatsApp QR, and public/og sitemap/social images",
);
