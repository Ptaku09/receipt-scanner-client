import React, { FC, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';
import Button from '@/components/Button';

interface ImageCropperProps {
  imageSrc: string;
}

const ImageCropper: FC<ImageCropperProps> = ({ imageSrc }) => {
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 0, height: 0, x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d')!;

    canvas.width = crop.width!;
    canvas.height = crop.height!;

    ctx.drawImage(image, crop.x! * scaleX, crop.y! * scaleY, crop.width! * scaleX, crop.height! * scaleY, 0, 0, crop.width!, crop.height!);

    return canvas.toDataURL('image/png');
  };

  return (
    <div className="flex flex-col gap-5 overflow-auto">
      <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-2 pb-6 rounded-b-lg rounded-t-md shadow-lg">
        <ReactCrop crop={crop} onChange={onCropChange}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imageRef} src={imageSrc} className="max-h-64 object-contain" alt="Image Preview" />
        </ReactCrop>
      </div>
      <div className="w-full h-44 p-1 bg-color-corners rounded-md overflow-auto">
        <div className="w-full h-full p-2 bg-neutral-100 rounded-sm flex items-center justify-center">
          {crop.width > 0 && crop.height > 0 ? (
            <div className="relative w-full h-full">
              <Image fill quality={100} style={{ objectFit: 'contain' }} src={getCroppedImg(imageRef.current!, crop)} alt="Cropped Image Preview" />
            </div>
          ) : (
            <p>Select to see preview</p>
          )}
        </div>
      </div>
      <Button>Scan</Button>
    </div>
  );
};

export default ImageCropper;
