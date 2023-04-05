import FileInput from '@/components/FileInput';
import React, { useEffect, useRef, useState } from 'react';
import { UploadStatus } from '@/constants/uploadStatus';
import ImageCropper from '@/components/ImageCropper';
import ImagePreview from '@/components/ImagePreview';
import { NextPage } from 'next';
import anime, { AnimeTimelineInstance } from 'animejs';

const Home: NextPage = () => {
  const [image, setImage] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<UploadStatus>(UploadStatus.SELECTING);
  const animationRef = useRef<AnimeTimelineInstance>();

  useEffect(() => {
    animationRef.current = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 300,
    });

    animationRef.current.add({
      targets: '.title',
      opacity: [0, 1],
      translateY: ['-50px', '0px'],
    });

    animationRef.current.add({
      targets: '.content',
      opacity: [0, 1],
      translateY: ['50px', '0px'],
    });
  }, [currentStep]);

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
      <div className="title text-5xl font-sans font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{currentStep} receipt!</span>
      </div>

      <div className="content">
        {currentStep === UploadStatus.SELECTING ? (
          <FileInput onImageSelected={onImageSelected} />
        ) : currentStep === UploadStatus.CROPPING ? (
          <ImageCropper imageSrc={image} onCropFinished={onCropFinished} onCropCancel={() => setCurrentStep(UploadStatus.SELECTING)} />
        ) : (
          <ImagePreview imageSrc={croppedImage} onPreviewCancel={() => setCurrentStep(UploadStatus.CROPPING)} />
        )}
      </div>
    </div>
  );
};

export default Home;
