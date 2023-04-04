import FileInput from '@/components/FileInput';
import { useState } from 'react';
import { UploadStatus } from '@/constants/uploadStatus';
import ImageCropper from '@/components/ImageCropper';
import Image from 'next/image';
import Button from '@/components/Button';

const Home = () => {
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
      <div className="text-5xl font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Upload receipt!</span>
      </div>

      {currentStep === UploadStatus.SELECTING ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentStep === UploadStatus.CROPPING ? (
        <>
          <ImageCropper imageSrc={image} onCropFinished={onCropFinished} />
          <Button func={() => setCurrentStep(UploadStatus.SELECTING)}>Back</Button>
        </>
      ) : (
        <>
          <div className="relative w-full h-80">
            <Image src={croppedImage} quality={100} alt="Cropped Image Preview" fill style={{ objectFit: 'contain' }} />
          </div>
          <Button func={() => setCurrentStep(UploadStatus.CROPPING)}>Back</Button>
          <Button>Scan</Button>
        </>
      )}
    </div>
  );
};

export default Home;
