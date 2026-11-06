"use client"
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



export default function Slider({
  spaceBetween = 0,
  slidesPerView = 6,
  navigation = false,
  pagination = false,
  imageList,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean;
  imageList: string[];
}) 


{
  const loopedd = [...imageList, ...imageList,...imageList ];
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
        {loopedd.map((i) => (
          <SwiperSlide className="ease-liner!">
            <img
              className=" w-auto h-10 object-contain hover:grayscale-0 hover:opacity-100 opacity-80 grayscale transition duration-300 md:h-20 sm:h-12  "
              src={i}
              alt={i}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
