import React from 'react'

export default function page() {


  let numbers = new Set([10, 20, 20, 30, 40, 50]);

  console.log(numbers); // Set(5) {10, 20, 30, 40, 50}
  console.log(typeof numbers);

  return <div>page</div>;
}
