import FileInput from '@/components/FileInput';
import React, { FC, useState } from 'react';
import { UploadStatus } from '@/constants/uploadStatus';
import ImageCropper from '@/components/ImageCropper';
import ImagePreview from '@/components/ImagePreview';

const Home: FC = () => {
  const [image, setImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [currentStep, setCurrentStep] = useState<UploadStatus>(UploadStatus.SELECTING);

  const onImageSelected = (img: string) => {
    setImage(img);
    setCurrentStep(UploadStatus.CROPPING);
  };

  const onCropFinished = (croppedImage: string) => {
    setCroppedImage(croppedImage);
    setCurrentStep(UploadStatus.UPLOADING);
  };

  return (
    <div className="w-full min-h-screen h-full bg-neutral-100 flex items-center justify-start flex-col py-10 px-4 overflow-auto">
      <div className="text-5xl font-sans font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{currentStep} receipt!</span>
      </div>

      {currentStep === UploadStatus.SELECTING ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentStep === UploadStatus.CROPPING ? (
        <ImageCropper imageSrc={image} onCropFinished={onCropFinished} onCropCancel={() => setCurrentStep(UploadStatus.SELECTING)} />
      ) : (
        <ImagePreview imageSrc={croppedImage} onPreviewCancel={() => setCurrentStep(UploadStatus.CROPPING)} />
      )}
    </div>
  );
};

export default Home;
