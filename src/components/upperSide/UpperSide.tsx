import { EqualApproximatelyIcon, Gift, GiftIcon, LetterText, LetterTextIcon, LucideTruck, Mail, Phone, Truck, TruckElectricIcon, TruckIcon } from 'lucide-react';
import React from 'react'

export default function UpperSide() {
  return (
    <div className="border-gray-600/50 border-b pb-2 hidden md:flex w-10/12 mx-auto ">
      <div className=" w-full hidden md:flex container justify-between ">
        <div className=" flex justify-between items-center  ">
          <div className="flex justify-between items-center gap-5">
            <p className="flex justify-between items-center font-bold text-[10px] gap-1">
              <Truck className="text-green-700  w-4 h-4" /> Free Shipping on
              Orders 500 EGP{" "}
            </p>
            <p className="flex justify-between items-center font-bold text-[10px] gap-1">
              <GiftIcon className="text-green-700  w-4 h-4" /> New Arrivals
              Daily{" "}
            </p>
          </div>

          <div></div>
        </div>

        <div className="flex justify-between text-[10px] gap-4 items-center  ">
          <p className="flex justify-between items-center font-bold text-[10px] gap-1">
            <Phone className="w-4 h-4 text-green-700" /> +1 (800) 123-4567
          </p>
          <p className="flex justify-between items-center font-bold text-[10px] gap-1">
            <Mail className="w-4 h-4 text-green-700" /> +1 (800) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
