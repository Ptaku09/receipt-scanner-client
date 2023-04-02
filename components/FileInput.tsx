import React, { ChangeEvent, useRef } from 'react';

const FileInput = ({ onImageSelected }: { onImageSelected: any }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChooseImage = () => {
    inputRef.current?.click();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        onImageSelected(reader.result);
      };
    }
  };

  return (
    <div className="w-full flex items-center flex-col">
      <input className="hidden" type="file" accept="image/png, image/jpg, image/jpeg" ref={inputRef} onChange={handleOnChange} />
      <button
        className="bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-2 text-bold text-white text-xl rounded-xl shadow-xl"
        onClick={onChooseImage}
      >
        Choose image
      </button>
    </div>
  );
};

export default FileInput;
