import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieType from '../../Page/Setting/Country/MovieType';
import Province from '../../Page/Setting/Country/Province';
import Offers from '../../Page/Media/Offers';
import Drink from '../../Page/Food/Drink';
import Cinema from '../../Page/Movie/Cinema';
import Movie from '../../Page/Setting/Movie';
import Test from '../../Page/Setting/Test';
import Hall from '../../Page/Setting/Hall';
import AdProvince from '../../Page/Address/ADProvince';
import Country from '../../Page/Address/Country';
import District from '../../Page/Address/Province/District';

function SubMenuContent() {
const param = useParams();
const renderFile = param.subType;
const subChild = param.subChild;
let render = "";
if(Object.keys(param).includes('subChild')){
  console.log("subChild",subChild)
  if(subChild=="province") render = <Province/>;
  else if(subChild=="district") render = <District/>;
}else{
  if(renderFile=="movie_type") render = <MovieType/>;
  if(renderFile=="offer") render = <Offers/>;
  if(renderFile=="drink") render = <Drink/>;
  if(renderFile=="cinema") render = <Cinema/>;
  if(renderFile=="movie") render = <Movie/>;
  if(renderFile=="test") render = <Test/>;
  if(renderFile=="hall") render = <Hall/>;
  if(renderFile=="country") render = <Country/>;
  if(renderFile=="province") render = <AdProvince/>;
}
  return (
    render
  );
}

export default SubMenuContent