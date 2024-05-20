import SearchForm from "@/components/search";

const HomePage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-l from-sky-200 to-blue-400">
      <div className="w-[300px] bg-white rounded-md shadow-md p-6 flex flex-col gap-1">
        <h1 className="w-full text-left font-bold text-xl">Download Fav</h1>
        <span className="text-xs text-gray-600">
          Supports: Instagram & Youtube
        </span>
        <div className="my-1 w-full h-[1px] bg-gray-100"></div>
        <SearchForm />
      </div>
    </div>
  );
};

export default HomePage;
