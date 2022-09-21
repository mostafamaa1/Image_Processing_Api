import sharp from 'sharp';

// image parameter interface
interface imgParams {
  width: number;
  height: number;
  originalImgPath?: string;
  processedImgPath: string;
  invalidPath?: string;
}

// resizeImg function to resize image using sharp
const resizeImg = async ({
  width,
  height,
  originalImgPath,
  processedImgPath,
}: imgParams): Promise<unknown> => {
  await sharp(originalImgPath)
    .resize(width, height)
    .toFormat('jpeg')
    .toFile(processedImgPath);
  return processedImgPath;
};

export default resizeImg;
