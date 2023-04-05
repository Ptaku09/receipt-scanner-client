import React, { ChangeEvent, useRef } from 'react';
import Button from '@/components/Button';

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
      <Button primary func={onChooseImage}>
        CHOOSE
      </Button>
    </div>
  );
};

export default FileInput;
