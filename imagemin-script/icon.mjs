import sharp from 'sharp';
import path from 'path';

const settings = [48, 72, 96, 144, 180, 192, 256, 384, 512];
const target = './public/icons/icon.png';
const paths = path.parse(target);
const dir = paths.dir;
const filename = paths.name;
(async () => {
  await Promise.all(
    settings.map(async (size) => {
      await sharp(target).resize({ width: size, height: size }).toFile(`${dir}/${filename}-${size}x${size}.png`);
    }),
  );
})();
