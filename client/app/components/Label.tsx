import React from 'react'

type LabelType = {
    title:string,
    desc:string,
    required?:Boolean,
};
const Label = ({title,desc,required}:LabelType) => {
  return (
    <div>
        <p>{title}{required&&<span>*</span>}</p>
        <p>{desc}</p>
    </div>
  )
}

export default Label