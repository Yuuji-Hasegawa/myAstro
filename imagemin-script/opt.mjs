import fs from 'fs';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import path from 'path';

const INPUT = "src/images";
const OUTPUT = "public/img";

function getInOut(input, output) {
  let ret = [];
  ret.push({ input, output });
  const dirs = fs.readdirSync(input);
  for (let dir of dirs) {
    let inputNext = path.join(input, dir);
    let outputNext = path.join(output, dir);
    if (fs.statSync(inputNext).isDirectory()) {
      ret.push(...getInOut(inputNext, outputNext));
    }
  }
  return ret;
}

(async () => {

  let input = path.join(process.cwd(), INPUT);
  let output = path.join(process.cwd(), OUTPUT);
  let dirs = getInOut(input, output);

  for (let item of dirs) {
    const files = await imagemin([`${item.input}/*.{jpg,png,gif,svg}`], {
      destination: item.output,
      plugins: [
        imageminMozjpeg({ quality: 85, progressive: true }),
        imageminPngquant({ quality: [0.7, 0.85] }),
        imageminGifsicle({ interlaced: false, optimizationLevel: 10, colors: 256 }),
        imageminSvgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        }),
      ],
    });
  }
})();
