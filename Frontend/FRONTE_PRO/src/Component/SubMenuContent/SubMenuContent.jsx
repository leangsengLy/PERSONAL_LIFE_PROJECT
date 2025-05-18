import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Country from '../../Page/Setting/Country/Country';
import Province from '../../Page/Setting/Country/Province';
import Offers from '../../Page/Media/Offers';
import Drink from '../../Page/Food/Drink';
import Cinema from '../../Page/Movie/Cinema';
import Movie from '../../Page/Setting/Movie';
import Test from '../../Page/Setting/Test';

function SubMenuContent() {
const param = useParams();
const renderFile = param.subType;
const subChild = param.subChild;
let render = "";
if(Object.keys(param).includes('subChild')){
  if(subChild=="province") render = <Province/>;
}else{
  if(renderFile=="movie_type") render = <Country/>;
  if(renderFile=="offer") render = <Offers/>;
  if(renderFile=="drink") render = <Drink/>;
  if(renderFile=="cinema") render = <Cinema/>;
  if(renderFile=="movie") render = <Movie/>;
  if(renderFile=="test") render = <Test/>;
}
  return (
    render
  );
}

export default SubMenuContent