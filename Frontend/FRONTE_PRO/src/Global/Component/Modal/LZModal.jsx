import { useDispatch, useSelector } from "react-redux"
import {setIsShowModal} from '../../../Store/Modal/ModalStore';
function LZModal() {
    const dispath = useDispatch()
    const label = useSelector(state=>state.Modal.label);
    const isShow = useSelector(state=>state.Modal.isShow);
    const onClickCloseModal=()=>{
        dispath(setIsShowModal(false))
    }
  return (
    <>
     {isShow?(<>
     <div className='w-screen h-screen fixed top-0 left-0 z-[10000000] bg-[#0000006b]'>
        <div className='w-full h-full relative flex justify-center items-center'>
           <div className='w-[440px] h-[500px] bg-white p-5 py-3 rounded-xl'>
                {
                    label!==""?(<>
                     <div className="flex justify-between items-center">
                        <b>{label}</b>
                       <i onClick={onClickCloseModal} class="ri-close-line text-[22px] cursor-pointer opacity-50 hover:opacity-100 transition-all ease-linear"></i>
                    </div>
                    </>):(<></>)
                }
               
           </div>
        </div>
    </div>
    </>):(<></>)}
    </>
    
  )
}

export default LZModal