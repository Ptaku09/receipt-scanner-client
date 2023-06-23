import FileInput from '@/components/FileInput';
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UploadStatus } from '@/constants/uploadStatus';
import ImageCropper from '@/components/ImageCropper';
import ImagePreview from '@/components/ImagePreview';
import { NextPage } from 'next';
import anime, { AnimeTimelineInstance } from 'animejs';
import axios from 'axios';
import ProductsPreview from '@/components/ProductsPreview';
import { ProductsContext } from '@/providers/ProductsProvider';
import LoadingScreen from '@/components/LoadingScreen';
import UsersScreen from '@/components/UsersScreen';

const Home: NextPage = () => {
  const [image, setImage] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<UploadStatus>(UploadStatus.SELECTING);
  const { setProducts } = useContext(ProductsContext);
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

  const onScan = async () => {
    setCurrentStep(UploadStatus.SCANNING);

    const bodyFormData = new FormData();
    const blob = await (await fetch(croppedImage)).blob();
    bodyFormData.append('uploaded_receipt', blob);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/receipt/scan`, bodyFormData)
      .then((res) => {
        setProducts(res.data);
        setCurrentStep(UploadStatus.RESULTS);
      })
      .catch((err) => console.log(err));
  };

  const onProductsConfirmed = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(UploadStatus.USERS);
  };

  const onUsersConfirmed = (users: string[]) => {
    setUsers(users);
    console.log(users);
    // TODO: connect to next step
  };

  return (
    <div className="w-full min-h-screen h-full bg-neutral-100 flex items-center justify-start flex-col py-10 px-4 overflow-auto">
      <div className="title text-5xl font-sans font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{currentStep}</span>
      </div>

      <div className="content w-full">
        {currentStep === UploadStatus.SELECTING ? (
          <FileInput onImageSelected={onImageSelected} />
        ) : currentStep === UploadStatus.CROPPING ? (
          <ImageCropper imageSrc={image} onCropFinished={onCropFinished} onCropCancel={() => setCurrentStep(UploadStatus.SELECTING)} />
        ) : currentStep === UploadStatus.UPLOADING ? (
          <ImagePreview imageSrc={croppedImage} onPreviewCancel={() => setCurrentStep(UploadStatus.CROPPING)} onScan={onScan} />
        ) : currentStep === UploadStatus.SCANNING ? (
          <LoadingScreen />
        ) : currentStep === UploadStatus.RESULTS ? (
          <ProductsPreview onProductsConfirmed={onProductsConfirmed} onPreviewCancel={() => setCurrentStep(UploadStatus.UPLOADING)} />
        ) : currentStep === UploadStatus.USERS ? (
          <UsersScreen onUsersConfirmed={onUsersConfirmed} onAddingCancel={() => setCurrentStep(UploadStatus.RESULTS)} />
        ) : (
          <div className="w-full flex items-center justify-center flex-col gap-5">
            <p>error</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
