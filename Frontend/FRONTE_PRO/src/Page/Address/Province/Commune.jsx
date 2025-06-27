import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from 'react-redux';
import LabelHeader from '../../../Component/Header/LabelHeader';
import LZDrawerForm from '../../../Component/DrawerForm/LZDrawerForm';
import { HttpRequest } from '../../../Global/API_HTTP/http';
import { decryptObject, EncriptObject, ShowSnackbar } from '../../../Util/globalUtils';
import { setIsShow, setModalConfirm } from '../../../Store/Confirm/Confirm';
import LZTableDefault from '../../../Component/LZTableDefault/LZTableDefault';
import LZIcon from '../../../Component/Icon/LZIcon';
import {useNavigate,createSearchParams } from 'react-router-dom';
import {format} from 'date-fns';
import { SetFilterProvince } from '../../../Store/Page/Address/Province/Province';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import LZGlobal from '../../../Util/LZGlobal';

function Commune() {
   const params = new URLSearchParams(location.search);
    const dataList = useSelector((state)=>state.Country.dataList)
    const t = useSelector(state=>state.Language.translate)
    const filter = useSelector(state=>state.province.filter)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isShowModal,setIsShowModal]=useState(false)
    const [isCreate,setIsCreate]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [dataDistrict,setDataDistrict]=useState({})
    const [Filter,setFilter]=useState({
        Record:10,
        Page:1,
        Search:""
    })
    const [DrawData,setDrawData]=useState({})
    const [data,SetData] = useState([])
    const [Country,setCountry] = useState([])
    const [CountryId,setCountryId] = useState([])
    const [FilterCountry,setFilterCountry] = useState([])
    const [Cinemas,SetCinema] = useState([])
    const [CinemaId,setCinemaId] = useState(0)
    const OnEditData=(data)=>{
        setIsCreate(false)
        setDrawData(data)
        setIsShowModal(true)
    }
  

    const ViewDetail=(data)=>{
        dispatch(SetFilterProvince({
            search:Filter.Search,
            pages:Filter.Page,
            countryId:FilterCountry?.Country?.Id||0,
            records:Filter.Record,
        }))
      const base64String = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      const urlSafeBase64String = encodeURIComponent(base64String);
        navigate(`/web/address/province/district?Info=${urlSafeBase64String}`);
    }
   
    const DeleteData=(data)=>{
        dispatch(setIsShow(true))
        dispatch(setModalConfirm({
            type:"delete",
            message:"Do you want to delete?",
            onClose:()=>{
                dispatch(setIsShow(false))
            },
            onOk:async()=>{
                 dispatch(setIsShow(false))
                await HttpRequest({
                    url:`api/district/delete?id=${data.Id}`,
                    method:"get",
                    success:(result)=>{
                        // SystemSpeakByText(result.data.message,false);
                        getList();
                        ShowSnackbar({message:result.data.message,type:'success'})
                    },
                    error:(err)=>{
                        // SystemSpeakByText(err.message,false);
                        ShowSnackbar({message:err.message,type:'error'})
                    }
                })
            }
        }))
        
    }

    useEffect(()=>{
        getList()
    },[FilterCountry])
    const OnerrorImage=(e)=>{
        e.target.src= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
    }
    const columnData=[
          {
            title:t.code,
            data:"Label",
            width: "100px" ,
            className:"all max-w-[100px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[70px] text-ellipsis overflow-hidden'>{data.Code}</div>
                    </>
                )
            }
        },
        {
            title:t.name,
            data:"Label",
            width: "100px" ,
            className:"all max-w-[200px]",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[170px] text-ellipsis overflow-hidden'>{data.Name}</div>
                    </>
                )
            }
        },
        {
            title:t.english_name,
            data:"Detail",
            className:"all max-w-[200px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[200px] text-ellipsis overflow-hidden'>{data.EnglishName}</div>
                    </>
                )
            }
        },
        {
            title:t.created_by,
            data:"CreateBy",
            width: "100px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                   <>
                        <div>
                            <p className='text-[14px]'>{data.CreateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.CreateDate), 'MMMM dd,yyyy')}</p>
                        </div>
                    </>
                )
            }
        },
        {
            title:t.updated_by,
            data:"DateCreated",
            isDateTime:true,
            width: "180px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        {
                            data.UpdateBy!=null?<div>
                            <p className='text-[14px]'>{data.UpdateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.UpdateDate), 'MMMM dd,yyyy')}</p>
                        </div>:<></>
                        }
                    </>
                )
            }
        },
      
        {
            title:t.action,
            data:null,
            width: "100px" ,
            className:"all",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='text-red-400 flex gap-x-2'>
                            <LZIcon  typeIcon="view" onClickIcon={()=>{ViewDetail(data)}}/>
                            <LZIcon  typeIcon="edit" onClickIcon={()=>{OnEditData(data)}}/>
                            <LZIcon  typeIcon="delete" onClickIcon={()=>{DeleteData(data)}}/>
                        </div>
                    </>
                )
            }
        },
       
    ]
   
  
    const ErrorImage=(e)=>{
        e.target.src='https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
    }
    const FilterData=(filter)=>{
        setFilter(filter);
    }
    useEffect(()=>{
        console.log("Got Filter",Filter)
         getList();
    },[Filter])

    useEffect( ()=>{
        window.addEventListener("click",(e)=>{
            if(e.target.className.includes("edit")) console.log("edit")
            else if(e.target.className.includes("view")) console.log("view")
            else if(e.target.className.includes("delete")){
                let Id = e.target.attributes
                dispatch(setModalConfirm({
                    type:"delete",
                    message:"Do you want to delete this country?",
                    onClose:()=>{
                        dispatch(setIsShow(false))
                    },
                    onOk:()=>{
                        DeleteData()
                        dispatch(setIsShow(false))
                    }
                }))
                dispatch(setIsShow(true))
            }
        })
    },[])
    useEffect(()=>{
         const jsonStringDecoded = decodeURIComponent(escape(atob(params.get('Info'))));
          const jsonObjectDecoded = JSON.parse(jsonStringDecoded);
          console.log('encode data =>',jsonObjectDecoded)
        setDataDistrict(jsonObjectDecoded);
        getListCinema();
        getList();
        GetCountry();
    },[])

    const getListCinema = async ()=>{
        await  HttpRequest({
            url:"/api/cinema/list",
            method:'post',
            data:{
                 id:0,
                 search:""
            },
            success:(result)=>{
                SetCinema(result)
                console.log(Cinemas)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    }
     const getList=async()=>{
        // console.log("get list with filter",FilterCountry)
        console.log("get list with filter",Filter)
        console.log("------------------------------------")
       await  HttpRequest({
            url:"/api/commune/list",
            method:'post',
            data:{
                search:Filter.Search,
                pages:Filter.Page,
                countryId:dataDistrict?.CountryId||0,
                provinceId:dataDistrict?.Id||0,
                records:Filter.Record,
            },
            success:(result)=>{
                SetData(result)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    }
    const GetCountry=async()=>{
        console.log("call list country")
       await  HttpRequest({
            url:"/api/country/list",
            method:'post',
            data:{
                search:"",
                pages:0,
                records:0,
            },
            success:(result)=>{
                console.log("list country",result)
                setCountry(result)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    }
    const CloseModal=()=>{
        setIsShowModal(false)
    }
    const UpdateData=async(data)=>{
          const dataSend = {
              id:data.Id,
                 name:data.Name,
                code:data.Code,
                countryId:dataDistrict?.CountryId,
                provinceId:dataDistrict?.Id,
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
          }
   
        HttpRequest({
            url:'api/commune/update',
            data:dataSend,
            method:"post",
            success:(success)=>{
                setIsShowModal(false)
                getList();
                ShowSnackbar({message:success.message,type:'success'})
            },
            error:(error)=>{
                ShowSnackbar({message:error.message,type:'error'})
            }
        })
    }
    const OnclickAdd=()=>{
        setIsCreate(true)   
        setIsShowModal(true)
    }
    const onFilter=(filter)=>{
        if(filter==0) setFilterCountry({Country:{Id:0}});
        else setFilterCountry(filter)
    }

    const dataInForm = [
        {
            label:t.code,
            name:"Code",
            isRequired:true,
            isDisabled:true,
            isCheckCode:true,
            checkCode:{
                url:"api/commune/check_code",
                param:{
                    field:"id",
                    db:"LZ",
                }
            },
            type:"text",
        },
        {
            label:t.name,
            name:"Name",
            isRequired:true,
            type:"text",
        },
        {
            label:t.english_name,
            name:"EnglishName",
            type:"text",
        }
    ]
    const CanceModal=(title)=>{
        setIsShowModal(false)
    }
    
    const SaveData=async (data)=>{
       await HttpRequest({
            url:"api/commune/create",
            method:"Post",
            data:{
                name:data.Name,
                code:data.Code,
                countryId:dataDistrict?.CountryId,
                provinceId:dataDistrict?.Id,
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
            },
            success:(result)=>{
                getList();
                setIsShowModal(false)
            },
            error:(error)=>{
                ShowSnackbar({message:error.data.detail,type:"error"})
            }
        })
    }
    const btns = [{type:"Create",label:t.create,OnCreate:OnclickAdd}];
  return (
    <div className='h-full grid grid-rows-[60px_1fr]'>
            {dataDistrict?.prevBreadCrumb!=""?<LabelHeader label={t.commune} BreadcrumbItems={[LZGlobal.translate({en:dataDistrict.prevBreadCrumb,km:dataDistrict.prevBreadCrumb}),LZGlobal.translate({en:dataDistrict.EnglishName,km:dataDistrict.Name})]}/>:<></>}
            <LZTableDefault onFilter={onFilter} isHasFilter={false}  column={columnData} data={data} OnChangeFilter={FilterData} Btns={btns} totalRecord={data[0]?.RecordCount||0}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={{...DrawData,PathImage:DrawData.ImagePath}} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:`${isCreate?"បង្កើតឃំុ":"កែប្រែឃំុ"}`}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default Commune