import FileInput from '@/components/FileInput';

const Home = () => {
  return (
    <div className="w-full min-h-screen h-full bg-neutral-100 flex items-center justify-start flex-col py-10">
      <div className="text-5xl font-extrabold mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Upload receipt!</span>
      </div>

      <FileInput onImageSelected={(img: any) => console.log(img)} />
    </div>
  );
};

export default Home;
