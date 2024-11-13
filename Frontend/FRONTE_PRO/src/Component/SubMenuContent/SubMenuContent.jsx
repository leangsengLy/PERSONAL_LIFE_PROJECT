import React from 'react'
import { useParams } from 'react-router-dom'
import Country from '../../Page/Setting/Country/Country';

function SubMenuContent() {
const param = useParams();
const renderFile = param.subType;
let render = "";
if(renderFile=="country")render = <Country/>;
  return render;
}

export default SubMenuContent