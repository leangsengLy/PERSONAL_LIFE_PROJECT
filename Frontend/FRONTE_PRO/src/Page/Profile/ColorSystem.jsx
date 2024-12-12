import { useDispatch, useSelector } from "react-redux"
import { setColorSystem } from "../../Store/Profile/ColorSystem/ColorSystem";

function ColorSystem() {
  const Colors = useSelector(state=>state.ColorSystem.colors);
  const dispatch = useDispatch();
  const selectedColor = useSelector(state=>state.ColorSystem.selectColor);
  console.log("ColorSystem List => ",Colors)
  const onSelectTheColorSystem=(color)=>{
    dispatch(setColorSystem(color))
  }
  return (
    <div className='w-full'>
        <h2>Theme</h2>
        <p>In the below for switch the theme between mode white and dark</p>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3'>
          {
            Colors.map((val)=>{
              return (<><div onClick={()=>{onSelectTheColorSystem(val)}} className='w-[40px] cursor-pointer h-[40px] rounded-md ' style={{backgroundColor:`#${val}`}}>
                </div></>)
            })
          }
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <p>Pick up your color sysyem</p>
            <div className='w-[70px] h-[70px] rounded-full ' style={{backgroundColor:`#${selectedColor}`}}></div>
        </div>
    </div>
  )
}

export default ColorSystem