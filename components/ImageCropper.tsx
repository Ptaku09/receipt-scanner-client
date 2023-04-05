import React, { FC, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';
import Button from '@/components/Button';
import { UploadStatus } from '@/constants/uploadStatus';

interface ImageCropperProps {
  imageSrc: string;
  onCropFinished: (croppedImage: string) => void;
  onCropCancel: (stage: UploadStatus) => void;
}

const ImageCropper: FC<ImageCropperProps> = ({ imageSrc, onCropFinished, onCropCancel }) => {
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 0, height: 0, x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    if (crop.width === 0 || crop.height === 0) return imageSrc;

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
    <div className="flex items-center justify-start flex-col gap-5">
      <div className="w-full flex items-center justify-center gap-7">
        <Button func={onCropCancel}>BACK</Button>
        <Button primary func={() => onCropFinished(getCroppedImg(imageRef.current!, crop))}>
          CROP
        </Button>
      </div>
      <p className="text-neutral-500 font-light text-center text-sm">
        Crop your receipt to include only the products and prices
        <br /> Including additional data may lead to incorrect scanning
      </p>
      <div className="flex items-center flex-col gap-5 overflow-auto">
        <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-1 pb-6 rounded-b-lg rounded-t-md shadow-lg">
          <ReactCrop crop={crop} onChange={onCropChange}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imageRef} src={imageSrc} className="max-h-64 object-contain" alt="Image Preview" />
          </ReactCrop>
        </div>
        <div className="w-full flex items-center justify-start flex-col gap-2">
          <h3 className="px-8 text-pink-500 border-b-2 border-b-pink-500">Preview</h3>
          <div className="w-full h-44 p-1 bg-color-corners rounded-md overflow-auto">
            <div className="w-full h-full p-2 bg-neutral-100 rounded-sm flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image fill quality={100} style={{ objectFit: 'contain' }} src={getCroppedImg(imageRef.current!, crop)} alt="Cropped Image Preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
