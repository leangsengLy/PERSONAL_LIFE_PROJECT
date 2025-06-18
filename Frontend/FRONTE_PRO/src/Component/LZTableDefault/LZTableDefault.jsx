import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import moment from 'moment/moment'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LZPagination from './LZPagination';
import LZSearch from './LZSearch';
import LZSelectRecord from './LZSelectRecord';
import '../../Css/LZTableDefault/index.css'
import LZButton from '../Button/LZButton';
import LZPopover from '../Popover/LZPopover';
import { useSelector } from 'react-redux';
import LZGlobal from '../../Util/LZGlobal';
import LZChip from '../Chip/LZChip';
// import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';

function LZTableDefault({column=[],onFilter,data=[],OnChangeFilter,ChipperContent,Btns,filter,totalRecord,isHasFilter=false}) {
    const tableRef = useRef(null);
    const param = useParams();
    const blogFilterTop = useRef();
    const [Chips,setChips]  = useState([]);
    const [isClearChip,setIsClearChip]  = useState(false);
    const tr = useSelector(state=>state.Language.translate)
    const TableDefault = useRef();
    const [FilterData,SetFilterdata] = useState({
        Record:10,
        Search:'',
        Page:1,
    })
    useEffect(()=>{
        console.log(blogFilterTop.current.getBoundingClientRect().top+12)
        console.log(TableDefault.current.offsetHeight)
        console.log(data)
    })
    console.log(param)
    const handleRowClick=(key)=>{
        console.log(key)
       
    }
     const onCloseChip=(item)=>{
        setIsClearChip(true)
         if(onFilter) onFilter(0)
        setChips([])
     }
     const onApply=(data)=>{
            setIsClearChip(false)
           if(onFilter) onFilter(data)
            setChips(val=>{
                return [{label:LZGlobal.translate({en:data.Country.EnglishName,km:data.Country.Name}),value:data.Country.Id}]
            })
           
         }
    const onSearching=(text)=>{
        SetFilterdata(val=>{
            return {...val,Search:text}
        })
    }
    const onSelectRecord=(record)=>{
        SetFilterdata(val=>{
            return {...val,Record:record}
        })
    }
    const onSelectPage=(page)=>{
        SetFilterdata(val=>{
            return {...val,Page:page}
        })
    }
    const itemsFilter = [
        {type:"select",
                required:true,
                name:"Country",
                label:tr.country,
                options:{
                    isMulti:false,
                    api:{
                        url:filter?.url,
                        method:"post",
                        data:{  
                                search:"",
                                pages:1,
                                records:100
                        },
                        key:"Id",
                        value:LZGlobal.translate({en:"EnglishName",km:"Name"})
                    },
                    startContent:(item)=>{
                        return (<>
                                </>)
                    },
                    renderValue:(items,list)=>{
                        
                            var item = list.find((val)=>val.key==items[0].key)
                            return (
                                <>
                                    <div className='flex gap-x-2 items-center' >
                                        <span className='text-[13px] text-black'>{item[LZGlobal.translate({en:"EnglishName",km:"Name"})]}</span>
                                    </div>
                                </>
                            );
                        }
                }
            },
    ]
    // useEffect(() => {
    //     // Example: Initialize plugin after rendering
    //     console.log(tableRef.current)
    //     const tableInstance = tableRef.current.DataTable();
    
    //     return () => {
    //       // Cleanup plugin instance to avoid errors
    //       if (tableInstance && tableInstance.destroy) {
    //         tableInstance.destroy(true); // Destroy and clean up DOM
    //       }
    //     };
    //   }, []);
    useEffect(()=>{
        setTimeout(()=>{
            console.log(FilterData)
             OnChangeFilter(FilterData)
        },100)
    },[FilterData.Search,FilterData.Page,FilterData.Record])
  return (
    <div>
        <div className='grid gap-y-3 mb-4 test-offset'>
            <div className='flex w-full mt-[15px]'>
                <div ref={blogFilterTop} className='w-full flex items-center'>
                    {
                        isHasFilter? <div className='mr-2'><LZPopover  items={itemsFilter} isClearChip={isClearChip} onApply={onApply}/></div>:""
                    }
                   
                    <LZSelectRecord SelectRecord ={onSelectRecord}/>
                    <LZSearch onSearching={onSearching}/>
                     <LZChip items={Chips}  onClose = {onCloseChip}/>
                </div>
                <div className='flex gap-x-2'>
                    {
                        Btns.length>0?(Btns.map((val,index)=>{
                            return(
                                <LZButton  key={index} typeButton={val.typeButton} cl={val.color} click={val.OnCreate} label={val.label}/>
                            )
                            })):""
                            
                    }
                </div>
            </div>
            <div>
                {ChipperContent}
            </div>
        </div>
        <div className='h-[90%] !w-[calc(100vw-287px)] !max-h-[calc(100vh-257px)] flex flex-col justify-between '>
        <Table removeWrapper={false} 
            ref={TableDefault}
            classNames={{
                base:[" h-full"],
                wrapper:['bg-navleft lzscroll-table h-full'],
                th:['bg-box-wrapper'],
            }}
            className='w-full style-height-default  '
            // style={{height:"calc(100vh - 34vh)"}}
        >
            <TableHeader columns={column} ref={tableRef}>
                {
                    column.map((val)=>(
                        <TableColumn width={val.width}>{val.title}</TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody emptyContent={`Empty data of ${param.subType}`}>
                    {
                        data.map((val,index)=>(
                        <TableRow key={val.Id} onClick={() => handleRowClick(val)}>
                            {column.map(v=>(
                                <TableCell>{v.isDraw?(<>
                                {typeof v.renderTag == 'function'? v.renderTag(val):v.renderTag}
                                    {v.renderTag}
                                </>):(<>
                                    {
                                        v.isDateTime?(<>
                                        {
                                            val[v.data]!==null ?
                                            moment(val[v.data]).format("MMMM DD,YYYY hh:mm A"):''
                                        }
                                        </>):(<>
                                            {val[v.data]}
                                        </>)
                                    }
                                </>)}</TableCell>
                            ))}
                        </TableRow>)
                        )
                    }
                    
            </TableBody>
        </Table>
        <LZPagination SelectPage={onSelectPage} totalRecord={totalRecord}/>
        </div>
    </div>
  )
}

export default LZTableDefault