import React, { FC } from 'react';
import Button from '@/components/Button';
import { UploadStatus } from '@/constants/uploadStatus';
import Image from 'next/image';

interface ImagePreviewProps {
  imageSrc: string;
  onPreviewCancel: (stage: UploadStatus) => void;
  onScan: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = ({ imageSrc, onPreviewCancel, onScan }) => {
  return (
    <div className="w-full flex items-center justify-start flex-col gap-5">
      <div className="w-full flex items-center justify-center gap-7">
        <Button func={onPreviewCancel}>BACK</Button>
        <Button primary func={onScan}>
          SCAN
        </Button>
      </div>
      <p className="text-neutral-500 font-light text-center text-sm">
        Please check if the receipt is properly cropped and then send the image for scanning
      </p>
      <div className="w-full h-80 p-1 bg-color-corners rounded-md overflow-auto">
        <div className="relative w-full h-full p-2 bg-neutral-100 rounded-sm flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image src={imageSrc} quality={100} alt="Cropped Image Preview" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
