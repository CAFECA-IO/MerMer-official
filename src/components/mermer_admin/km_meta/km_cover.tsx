import React, {useState, Dispatch} from 'react';
import Image from 'next/image';
import {FiEdit3} from 'react-icons/fi';

type Props = {
  selectedImage: File | null;
  setSelectedImage: Dispatch<React.SetStateAction<File | null>>;
  setIsNewImage: Dispatch<React.SetStateAction<boolean>>;
};

export default function KmCover({selectedImage, setSelectedImage, setIsNewImage}: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    !!selectedImage ? URL.createObjectURL(selectedImage) : null
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsNewImage(true);
    }
  };

  return (
    <div className="flex h-189px w-230px shrink-0 items-center justify-center gap-24 rounded-[4px] bg-mermerTheme">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="cover-upload"
      />
      <label
        htmlFor="cover-upload"
        className="relative flex size-full cursor-pointer items-center justify-center"
      >
        {previewImage ? (
          <>
            <img src={previewImage} alt="Cover Preview" className="size-full object-cover" />
            <div className="absolute bottom-1 right-1 flex size-44px items-center justify-center rounded-full bg-mermerTheme shadow-drop">
              <FiEdit3 size={24} />
            </div>
          </>
        ) : (
          <Image src="/elements/camera.svg" height={60} width={60} alt="Upload Your Cover" />
        )}
      </label>
    </div>
  );
}
