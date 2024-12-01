import React, { useEffect, useState } from 'react'
import TitleHeaderFeature from '../../../Global/Component/TitleHeaderFeature/TitleHeaderFeature'
import { useNavigate } from 'react-router-dom'
import LZTableDefault from '../../../Global/Component/LZTableDefault/LZTableDefault'
import LZIcon from '../../../Global/Component/Icon/LZIcon'
import LZDrawerForm from '../../../Global/Component/DrawerForm/LZDrawerForm'
import LZButton from '../../../Global/Component/Button/LZButton'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow, setModalConfirm } from '../../../Store/Confirm/Confirm'
import { HttpRequest } from '../../../Global/API_HTTP/http'
import { ShowSnackbar } from '../../../Util/globalUtils'

function Province() {
    const navigate = useNavigate()
    const onBackpage=()=>{
        navigate('/web/setting/country')
    }
    const dispatch = useDispatch()
    const isOpenModal = useSelector(state=>state.Confirm.isOpen)
    const [isShowModal,SetIsShowModal] = useState(false)
    const [ReDrawDataProvince,SetReDrawDataProvince] = useState(false)
    const [DataProvince,SetDataProvince] = useState([]);
    const [isCreate,SetIsCreate] = useState(false)
    const ViewProvince=(data)=>{
      console.log(data)
    }
    useEffect(async()=>{
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
        onOk:onOkConfirm,
      }))
      dispatch(setIsShow(true))
    }
    const onOkConfirm=()=>{
      console.log("You are click ok ")
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
        },
        {
            title:"UpdateBy",
            data:"UpdateBy",
            width: "200px" ,
          
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
    // const DataProvince=[
    //     {
    //         Name:'ទឹកថ្លា',
    //         Code:'1',
    //         EnglishName:'Tek tla',
    //     },
    //     {
    //       Name:'ទឹកថ្លា',
    //       Code:'3',
    //       EnglishName:'Tek tla',
    //     },
    //     {Code:'3',
    //       Name:'ទឹកថ្លា',
    //       EnglishName:'Tek tla',
    //   },
    //     {
    //       Code:'3',
    //       Name:'ទឹកថ្លា',
    //       EnglishName:'Tek tla',
    //   }
    // ]
    const onSaveProvince=(data)=>{
      HttpRequest({
        url:'/api/province/create',
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