import FileInput from '@/components/FileInput';
import { useState } from 'react';

const Home = () => {
  const [image, setImage] = useState('');

  const onImageSelected = (img: string) => {
    setImage(img);
  };

  return (
    <div className="w-full min-h-screen h-full bg-neutral-100 flex items-center justify-start flex-col py-10 px-4 overflow-auto">
      <div className="text-5xl font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Upload receipt!</span>
      </div>

      <FileInput onImageSelected={onImageSelected} />
    </div>
  );
};

export default Home;
