"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "swiper/css/effect-cube";
import "swiper/css/pagination";
import Image from "next/image";

export default function Slider({
 
  navigation = false,
  pagination = false,
  imageList,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean;
  imageList: string[];
}) {
  const loopedd = [...imageList, ...imageList, ...imageList];
  return (
    <div className="w-full overflow-hidden py-6 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] border border-gray-400/50 ">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        wrapperClass="ease-linear!"
        speed={3000}
        spaceBetween={1}
        slidesPerView={9}
        allowTouchMove={false}
        freeMode
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        navigation={navigation}
        pagination={pagination}
        // scrollbar={{ draggable: false }}
      >
        {loopedd.map((i, index) => (
          <SwiperSlide key={`${i}-${index}`}>
            <div className="relative h-10 w-full sm:h-12 md:h-20">
              <Image
                src={i}
                alt=""
                fill
                sizes="12vw"
                className="object-contain opacity-80 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}









// "use client";

// import Image from "next/image";
// import {
//   A11y,
//   Autoplay,
//   FreeMode,
//   Navigation,
//   Pagination,
//   Scrollbar,
// } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-cube";
// import "swiper/css/pagination";

// type SliderProps = {
//   spaceBetween?: number;
//   slidesPerView?: number;
//   navigation?: boolean;
//   pagination?: boolean;
//   imageList: string[];
// };

// export default function Slider({
//   spaceBetween = 1,
//   slidesPerView = 9,
//   navigation = false,
//   pagination = false,
//   imageList,
// }: SliderProps) {
//   const loopedImages = [...imageList, ...imageList, ...imageList];

//   return (
//     <div className="w-full overflow-hidden border border-gray-400/50 py-6 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode]}
//         wrapperClass="ease-linear!"
//         speed={3000}
//         spaceBetween={spaceBetween}
//         slidesPerView={slidesPerView}
//         allowTouchMove={false}
//         freeMode
//         loop={loopedImages.length > 1}
//         autoplay={{
//           delay: 0,
//           disableOnInteraction: false,
//         }}
//         navigation={navigation}
//         pagination={pagination}
//       >
//         {loopedImages.map((image, index) => (
//           <SwiperSlide key={`${image}-${index}`}>
//             <div className="relative h-10 w-full sm:h-12 md:h-20">
//               <Image
//                 src={image}
//                 alt=""
//                 fill
//                 sizes="12vw"
//                 className="object-contain opacity-80 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }




