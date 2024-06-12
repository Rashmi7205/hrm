import React from 'react'

type LabelType = {
    title:string,
    desc:string,
    required?:Boolean,
};
const Label = ({title,desc,required}:LabelType) => {
  return (
    <div className='w-3/5 flex gap-1 flex-col font-medium'>
        <p className='text-slate-800 text-md uppercase'>{title}{required&&<span className='text-red-600'>*</span>}</p>
        <p className='text-slate-400 text-xs'>{desc}</p>
    </div>
  )
}

export default Label