import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from 'react-redux';
import LZDrawerForm from '../../Component/DrawerForm/LZDrawerForm';
import { HttpRequest } from '../../Global/API_HTTP/http';
import { decryptObject, EncriptObject, ShowSnackbar } from '../../Util/globalUtils';
import { setIsShow, setModalConfirm } from '../../Store/Confirm/Confirm';
import LZTableDefault from '../../Component/LZTableDefault/LZTableDefault';
import LZIcon from '../../Component/Icon/LZIcon';
import {useNavigate,createSearchParams } from 'react-router-dom';
import {format} from 'date-fns';
import { GetBase64ByImage } from '../../Util/GetBase64ByImage';
import LZGlobal from '../../Util/LZGlobal';
import { SetFilterProvince } from '../../Store/Page/Address/Province/Province';

function AdProvince() {
    const dataList = useSelector((state)=>state.Country.dataList)
    const t = useSelector(state=>state.Language.translate)
    const filter = useSelector(state=>state.table.filterDef)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isShowModal,setIsShowModal]=useState(false)
    const [isCreate,setIsCreate]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [Filter,setFilter]=useState({})
    const [DrawData,setDrawData]=useState({})
    const [data,SetData] = useState([])
    const [Country,setCountry] = useState([])
    const [CountryId,setCountryId] = useState([])
    const [FilterCountry,setFilterCountry] = useState([])
    const [Cinemas,SetCinema] = useState([])
    const [CinemaId,setCinemaId] = useState(0)
    const EditCountry=(data)=>{
        setIsCreate(false)
        setDrawData(data)
        setIsShowModal(true)
    }
  

    const ViewDetail=(data)=>{
        dispatch(SetFilterProvince({
            search:Filter.Search,
            pages:Filter.Page,
            countryId:FilterCountry?.Country?.Id||CountryId,
            records:Filter.Record,
        }))
      const base64String = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      const urlSafeBase64String = encodeURIComponent(base64String);
    navigate(`/web/address/province/district?Info=${urlSafeBase64String}`);
    }
   
    const DeleteCountry=(data)=>{
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
                    url:`/api/province/delete?id=${data.Id}`,
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
        // getList()
    },[FilterCountry])
    const OnerrorImage=(e)=>{
        e.target.src= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
    }
    const columnData=[
        {
            title:t.photo,
            data:"Label",
            width: "50px" ,
            className:"all",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[35px] h-[35px] rounded-full bg-black overflow-hidden border p-[2px]'>
                            <img src={`http://localhost:8080`+Country.find(s=>s.Id==data.CountryId)?.ImagePath} alt="" onError={OnerrorImage}  className='preview-image rounded-full w-full h-full object-cover'/>
                        </div>
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
                            <LZIcon  typeIcon="edit" onClickIcon={()=>{EditCountry(data)}}/>
                            <LZIcon  typeIcon="delete" onClickIcon={()=>{DeleteCountry(data)}}/>
                        </div>
                    </>
                )
            }
        },
       
    ]
   
  
    const ErrorImage=(e)=>{
        e.target.src='https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
    }
    const FilterData=(data)=>{
        // console.log("Change filter")
        // console.log("filter",filter)
        console.log("data",data)
        setFilter((val)=>{
            return{
                ...val,
                ...data,
            }
        });
    }

   
    useEffect(()=>{
        console.log("skkkkkkkkkk2222kkkk2kkkkkkk")
        console.log(Filter)
         getList();
    },[Filter])

    useEffect( ()=>{
       
    },[])
    useEffect(()=>{
        GetCountry();
        // console.log(filter)
        // console.log(Filter)
        setTimeout(()=>{
            setFilter((val)=>{
            return {
                ...val,
                Page:filter.pages,
                Record:filter.records,
                Search:filter.search,
            }
        })
        },500)
        getListCinema();
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
                        DeleteCountry()
                        dispatch(setIsShow(false))
                    }
                }))
                dispatch(setIsShow(true))
            }
        })
        // getList();
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
       await  HttpRequest({
            url:"/api/province/list",
            method:'post',
            data:{
                search:filter.search,
                pages:filter.page  ,
                countryId:FilterCountry?.Country?.Id||CountryId,
                records:filter.record,
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
                if(result.length>0) setCountryId(result.filter(s=>s.Code=="Cambo")[0]?.Id)
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
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
                
          }
   
        HttpRequest({
            url:'api/province/update',
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
        else {
            setFilter(val=>{
                return {
                    ...val,
                    Page:1
                }
            })
            setFilterCountry(filter)
        }
    }
    useEffect(()=>{
        getList();
    },[CountryId])
    const dataInForm = [
         {
            label:t.country,
            name:"CountryId",
            isRequired:true,
            type:"select",
            data:  Country.map((val)=>({...val,PathImage:val.ImagePath,key:val.EnglishName,label:val.EnglishName})),
            onSelect:(data)=>{
                setCountryId(data);
            }
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
        console.log(data)
       await HttpRequest({
            url:"api/province/create",
            method:"Post",
            data:{
                name:data.Name,
                countryId:CountryId,
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
            },
            success:(result)=>{
                getList();
                setIsShowModal(false)
            },
            error:(error)=>{
                ShowSnackbar({message:error.message,type:"error"})
            }
        })
    }
    const btns = [{type:"Create",label:t.create,OnCreate:OnclickAdd}];
  return (
    <div className='h-full grid grid-rows-[30px_1fr]'>
        <h1 className='text-[17px] font-bold'>{t.province}</h1>
            <LZTableDefault onFilter={onFilter} isHasFilter={true}  column={columnData} filter={{url:"api/country/list",}}  data={data} OnChangeFilter={FilterData} Btns={btns} totalRecord={data[0]?.RecordCount||0}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={{...DrawData,PathImage:DrawData.ImagePath}} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:`${isCreate?t.add_drink:t.edit_drink}`}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default AdProvince