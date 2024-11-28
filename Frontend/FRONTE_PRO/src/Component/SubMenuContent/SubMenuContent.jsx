import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Country from '../../Page/Setting/Country/Country';
import Province from '../../Page/Setting/Country/Province';

function SubMenuContent() {
const param = useParams();
const renderFile = param.subType;
const subChild = param.subChild;
let render = "";
if(Object.keys(param).includes('subChild')){
  if(subChild=="province") render = <Province/>;
}else{
  if(renderFile=="country") render = <Country/>;
}
  return (
    render
  );
}

export default SubMenuContent