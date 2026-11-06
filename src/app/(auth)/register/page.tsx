import React from 'react'
import RegisterForm from './RegisterForm'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function page() {
  return (
    <>
      <div className="">
        <div className="container bg-white/30 rounded-xl lg:p-4 shadow-2xl  w-full px-3 md:w-10/12 lg:w-6/12 text-center">
          <h1 className="text-green-700 font-bold text-4xl text-center mb-4">
            Hello From Green Shop
          </h1>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
