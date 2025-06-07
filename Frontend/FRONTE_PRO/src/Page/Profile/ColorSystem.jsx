import { useDispatch, useSelector } from "react-redux"
import { setColorSystem } from "../../Store/Profile/ColorSystem/ColorSystem";
import { useEffect } from "react";

function ColorSystem() {
  const Colors = useSelector(state=>state.ColorSystem.colors);
  const dispatch = useDispatch();
  const selectedColor = useSelector(state=>state.ColorSystem.selectColor);
  const isDark = useSelector(state=>state.Theme.isDark);
  console.log("ColorSystem List => ",Colors)
  const onSelectTheColorSystem=(color)=>{
    console.log("ColorSystem => ",color)
    dispatch(setColorSystem({color:color,isDark:isDark}));
    localStorage.setItem("colorSystem",color);
  }
  useEffect(()=>{
    console.log("ColorSystem Colors => ",Colors)
  },[])
  return (
    <div className='w-full'>
        <h2>Theme</h2>
        <p>In the below for switch the theme between mode white and dark</p>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3'>
          {
            Colors.filter(v=>v.isDark==isDark).map((val)=>{
              return (<><div onClick={()=>{onSelectTheColorSystem(val.color)}} className='w-[40px] cursor-pointer h-[40px] rounded-md ' style={{backgroundColor:`#${val.color}`}}>
                </div></>)
            })
          }
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <p>Pick up your color sysyem</p>
            <div className='w-[70px] h-[70px] rounded-full ' style={{backgroundColor:`#${selectedColor.color}`}}></div>
        </div>
    </div>
  )
}

export default ColorSystem