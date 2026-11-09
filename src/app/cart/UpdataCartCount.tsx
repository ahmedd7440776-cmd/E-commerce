"use client"

import AppButton from "@/components/AppButton/AppButton";
import { useContext, useEffect, useRef, useState } from "react";
import { handleUpdataCartCount } from "./updatacart.action";
import { toast } from "@/components/ui/toast";
import { CartCountProvider } from "@/context/cartContext/cartContext";

export default function UpdataCartCount({
  productId,
  count,
  title,
}: {
  productId: string;
  count: number;
  title: string;
}) {
  const [localCount, setLocalCount] = useState(count);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef(count); // آخر رقم السيرفر أكدّه
const {setCount}= useContext(CartCountProvider)
  // لما السيرفر يرجّع رقم جديد، زامن (إلا لو المستخدم لسه بيضغط)
  useEffect(() => {
    if (timer.current === null) {
      setLocalCount(count);
      lastSaved.current = count;
    }
  }, [count]);

  function updataCount(newCount: number) {
    setLocalCount(newCount); // تغيير فوري

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      timer.current = null;

      const promise = handleUpdataCartCount(productId, newCount);

      toast.promise(promise, {
        success: (data) =>{
          setCount(data.numOfCartItems)
          return data.message
        },
        error: "can not updata the quentatiy",
        loading: "please wait while adding..",
      });

      promise
        .then(() => {
          lastSaved.current = newCount;
        })
        .catch(() => {
          setLocalCount(lastSaved.current); // رجوع للرقم القديم
        });
    }, 500);
  }

  return (
    <div className=" inline-flex h-8 items-center rounded-lg border border-slate-200 p-0.5">
      <AppButton
        onClick={() => updataCount(localCount - 1)}
        disabled={localCount <= 1}
        size="icon"
        className="size-7 rounded-md text-black bg-gray-400 hover:bg-gray-800 hover:text-white "
        aria-label={`Decrease ${title} quantity`}
      >
        −
      </AppButton>

      <span className="w-8 text-center text-xs font-bold">{localCount}</span>

      <AppButton
        onClick={() => updataCount(localCount + 1)}
        size="icon"
        className="size-7 rounded-md bg-green-600 text-white hover:bg-green-700"
        aria-label={`Increase ${title} quantity`}
      >
        +
      </AppButton>
    </div>
  );
}




// "use client";
// import AppButton from "@/components/AppButton/AppButton";
// import React, { useOptimistic, useTransition } from "react";
// import { handleUpdataCartCount } from "./cart.action";
// import { toast } from "@/components/ui/toast";

// export default function UpdataCartCount({
//   productId,
//   count,
//   title,
// }: {
//   productId: string;
//   count: number;
//   title: string;
// }) {
//   const [optimisticCount, setOptimisticCount] = useOptimistic(count);
//   const [, startTransition] = useTransition();

//   function updataCount(newCount: number) {
//     startTransition(async () => {
//       setOptimisticCount(newCount); // instant changing of the number

//       const promise = handleUpdataCartCount(productId, newCount);
//       toast.promise(promise, {
//         success: (data) => data.message,
//         error: "can not updata the quentatiy",
//         loading: "please wait",
//       });
//       try {
//         await promise;
//       } catch {
//         //  the number reterns automaticly to the prev
//       }
//     });
//   }

//   return (
//     <div className="mt-3 inline-flex h-8 items-center rounded-lg border border-slate-200 p-0.5">
//       <AppButton
//         //   productId={item.product._id}
//         //   count={item.count - 1}
//         onClick={() => updataCount(optimisticCount - 1)}
//         size="icon"
//         disabled={optimisticCount <= 1}
//         className="size-7 rounded-md text-black bg-gray-400 hover:bg-gray-800 hover:text-white "
//         aria-label={`Decrease ${title} quantity`}
//       >
//         −
//       </AppButton>
//       <span className="w-8 text-center text-xs font-bold">
//         {optimisticCount}
//       </span>
//       <AppButton
//         //   count={item.count + 1}
//         //   productId={item.product._id}
//         onClick={() => updataCount(optimisticCount + 1)}
//         size="icon"
//         // disabled={ispending}
//         className="size-7 rounded-md bg-green-600 text-white hover:bg-green-700"
//         aria-label={`Increase ${title} quantity`}
//       >
//         +
//       </AppButton>
//     </div>
//   );
// }
