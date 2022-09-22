import resizeImg from '../../utils/imageprocess';
import fs from 'fs';
import path from 'path';

// Resizing image suite
describe('Resize Image suite', (): void => {
  // Img path parameters
  const filename = 'fjord';
  const width = 800;
  const height = 400;
  const invalidPath = path.resolve(
    __dirname,
    '../../../images/original',
    'test.jpg'
  );
  const originalImgPath = path.resolve(
    __dirname,
    '../../../images/original',
    `${filename}.jpg`
  );
  const processedImgPath = path.resolve(
    __dirname,
    '../../../images/thumb',
    `${filename}_${width}_${height}.jpg`
  );

  it('Image should be processed Successfully!', async (): Promise<void> => {
    await expectAsync(
      resizeImg({
        width,
        height,
        originalImgPath,
        processedImgPath,
      })
    ).toBeResolved();
  });

  it('Image must return processedImgPath!', async (): Promise<void> =>
    expect(
      await resizeImg({
        width,
        height,
        originalImgPath,
        processedImgPath,
      })
    ).toEqual(processedImgPath));

  it('Should be rejected due to false img path!', async (): Promise<void> => {
    await expectAsync(
      resizeImg({
        width,
        height,
        invalidPath,
        processedImgPath,
      })
    ).toBeRejected();
  });

  it('Should be falsy if the original image does not exist', async (): Promise<void> => {
    const imgPath = await fs.existsSync('images/original/test.jpg');
    expect(imgPath).toBeFalsy();
  });
});
