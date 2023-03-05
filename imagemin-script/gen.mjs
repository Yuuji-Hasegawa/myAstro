import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const getData = (dirPath) => {
  const result = fs.readdirSync(dirPath);
  return result.map((itemName) => {
    return path.join(dirPath, itemName);
  });
};
const getAllData = (dirPath) => {
  let result = [];
  const getData = (dirPath) => {
    let items = fs.readdirSync(dirPath);
    items = items.map((itemName) => {
      return path.join(dirPath, itemName);
    });
    items.forEach((itemPath) => {
      result.push(itemPath);
      if (fs.statSync(itemPath).isDirectory()) {
        getData(itemPath);
      }
    });
  };
  getData(dirPath);
  return result;
};

const fileList = getAllData('./public/img').filter((file) => /\.(png|jpe?g)$/i.test(file));
(async () => {
  await Promise.all(
    fileList.map(async (item) => {
      const paths = path.parse(item);
      const filename = paths.name;
      //const dir = paths.dir.replace('src/images','src/public/img');
      const dir = paths.dir;
      await sharp(item).webp({ quality: 70 }).toFile(`${dir}/${filename}.webp`);
      await sharp(item).avif().toFile(`${dir}/${filename}.avif`);
    }),
  );
})();
