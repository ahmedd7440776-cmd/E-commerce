import LoginFrom from './LoginFrom'

export default function page() {
  return (
    <>
      <div className="">
        <div className="container w-full px-3 bg-white/30 rounded-xl lg:p-4 shadow-2xl md:w-10/12 lg:w-6/12 text-center">
          <h1 className="text-green-700 mb-4 font-bold text-4xl text-center">
            Welcome back Green Shop member
          </h1>
          <LoginFrom />
        </div>
      </div>
      ;
    </>
  );
}

