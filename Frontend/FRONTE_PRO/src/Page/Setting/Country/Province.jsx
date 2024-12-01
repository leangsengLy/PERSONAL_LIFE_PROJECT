import React, { useEffect, useState } from 'react'
import TitleHeaderFeature from '../../../Global/Component/TitleHeaderFeature/TitleHeaderFeature'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import LZTableDefault from '../../../Global/Component/LZTableDefault/LZTableDefault'
import LZIcon from '../../../Global/Component/Icon/LZIcon'
import LZDrawerForm from '../../../Global/Component/DrawerForm/LZDrawerForm'
import LZButton from '../../../Global/Component/Button/LZButton'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow, setModalConfirm } from '../../../Store/Confirm/Confirm'
import { HttpRequest } from '../../../Global/API_HTTP/http'
import { decryptObject, ShowSnackbar } from '../../../Util/globalUtils'
import moment from 'moment'

function Province() {
    const navigate = useNavigate()
    const onBackpage=()=>{
        navigate('/web/setting/country')
    }
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()
    const isOpenModal = useSelector(state=>state.Confirm.isOpen)
    const [isShowModal,SetIsShowModal] = useState(false)
    const [ReDrawDataProvince,SetReDrawDataProvince] = useState(false)
    const [DataProvince,SetDataProvince] = useState([]);
    const [isCreate,SetIsCreate] = useState(false)
    const [dataCountry,setDataCountry] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); 
    console.log(atob(queryParams.get('Country')))
    const ViewProvince=(data)=>{
      console.log(data)
    }
    useEffect(async()=>{
      //decryptObject on this paramter we use for get object by convert fron encrypt code and atob we use for match the query string don't defferent value when we get from query string if don't have atob it will be different value
      setDataCountry(decryptObject(atob(queryParams.get('Country'))))
      await getListProvince();
    },[])
    const getListProvince =async()=>{
      await HttpRequest({
        url:'/api/province/list',
        method:'get',
        error:(error)=>{
          console.log(error)
        },
        success:(result)=>{
          SetDataProvince(result)
        },
      })
    }
    const DeleteProvince=(data)=>{
      console.log("deete")
      dispatch(setModalConfirm({
        message:'Do you want delete this pronvince?',
        type:'delete',
        onClose:onCloseConfirm,
        onOk:()=>{
          onOkConfirm(data)
        },
      }))
      dispatch(setIsShow(true))
    }
    const onOkConfirm=(data)=>{
      HttpRequest({
        url:`/api/province/delete/${data.Id}`,
        method:"get",
        success:(result)=>{
          SetIsShowModal(false)
          getListProvince()
          ShowSnackbar({message:result?.message,type:"success"})
        },
        error:(error)=>{
          ShowSnackbar({message:error?.message,type:"error"})
        }
      })
      dispatch(setIsShow(false))
    }
    const onCloseConfirm=()=>{
      dispatch(setIsShow(false))
    }
    const EditProvince=(data)=>{
      SetReDrawDataProvince(data)
      SetIsCreate(false)
      SetIsShowModal(true)
    }
      const columnData=[
        {
            title:"Name",
            data:"Name",
            width: "100px" ,
            className:"all ",
        },
        {
            title:"EnglishName",
            data:"EnglishName",
            width:'100px',
            className:"all ",
        },
        {
            title:"Description",
            data:"Description",
            width: "all" ,

        },
        {
            title:"CreateBy",
            data:"CreateBy",
            width: "200px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className=''>
                            <p>{data.CreateBy}</p>
                            <p>{moment(data.DateCreated).format('DD MMMM,YYYY')}</p>
                        </div>
                    </>
                )
            }
        },
        {
            title:"UpdateBy",
            data:"UpdateBy",
            width: "200px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className=''>
                            <p>{data.UpdateBy}</p>
                            <p>{moment(data.UpdateDate).format('DD MMMM,YYYY')}</p>
                        </div>
                    </>
                )
            }
          
        },
       
        {
            title:"Action",
            data:null,
            width: "100px" ,
            className:"all",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='text-red-400 flex gap-x-2'>
                            <LZIcon  typeIcon="view" onClickIcon={ ()=>{ ViewProvince(data)}}/>
                            <LZIcon  typeIcon="edit" onClickIcon={ ()=>{ EditProvince(data)}}/>
                            <LZIcon  typeIcon="delete" onClickIcon={ ()=>{ DeleteProvince(data)}}/>
                        </div>
                    </>
                )
            }
        },
      
    ]
      const dataInForm = [
        {
          label:"Code",
          name:"Code",
          isRequired:true,
          type:"text",
      },
        {
            label:"Name",
            name:"Name",
            isRequired:true,
            type:"text",
        },
        
        {
            label:"EnglishName",
            name:"EnglishName",
            type:"text",
        },
        {
          label:"Description",
          name:"Description",
          type:"textArea",
      },
    ]
    const onClickBtnCreate=()=>{
      SetIsShowModal(true)
      SetIsCreate(true)
    }
    const closeModal=()=>{
      SetIsShowModal(false)
    }
    const onSaveProvince=(data)=>{
      HttpRequest({
        url:'/api/province/create',
        data:{...data,CountryId:dataCountry.Id},
        method:"post",
        success:(result)=>{
          SetIsShowModal(false)
          getListProvince()
          ShowSnackbar({message:result?.message,type:"success"})

        },
        error:(error)=>{
          ShowSnackbar({message:error?.message,type:"error"})
        }
      })
    }
    const onSaveEditData=(data)=>{
      HttpRequest({
        url:'/api/province/update',
        data:data,
        method:"post",
        success:(result)=>{
          SetIsShowModal(false)
          getListProvince()
          ShowSnackbar({message:result?.message,type:"success"})

        },
        error:(error)=>{
          ShowSnackbar({message:error?.message,type:"error"})
        }
      })
    }
  return (
    <div>
        <TitleHeaderFeature onBack={onBackpage} title='Province' isBack={true}/>
        <div className='flex justify-end mb-2'>
          <LZButton typeButton="add" label="Add Provine" isIcon={true} click={onClickBtnCreate}/>
        </div>
        <LZTableDefault column={columnData} data={DataProvince} />
        <LZDrawerForm
          fn={{
            onCancel:closeModal,
            onClose:closeModal,
            onSave:onSaveProvince,
            onSaveEdit:onSaveEditData
          }}
          ui={{}}   
          data={dataInForm}
          reDrawData={ReDrawDataProvince}
          isCreate={isCreate} 
          propDrawer={{open:isShowModal,label:"Add Provine"}} 
        />
    </div>
  )
}

export default Province