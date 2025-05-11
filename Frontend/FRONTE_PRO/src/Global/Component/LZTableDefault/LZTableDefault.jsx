import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import moment from 'moment/moment'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LZPagination from './LZPagination';
import LZSearch from './LZSearch';
import LZSelectRecord from './LZSelectRecord';
import '../../Css/LZTableDefault/index.css'
// import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';

function LZTableDefault({column=[],data=[],OnChangeFilter,ChipperContent,Btns}) {
    const tableRef = useRef(null);
    const param = useParams();
    const blogFilterTop = useRef();
    const TableDefault = useRef();
    const [FilterData,SetFilterdata] = useState({
        Record:0,
        Search:'',
        Page:0,
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
        },100)
    },[FilterData.Search,FilterData.Page,FilterData.Record])
  return (
    <div>
        <div className='grid gap-y-3 mb-4 test-offset'>
            <div className='flex w-full mt-[15px]'>
                <div ref={blogFilterTop} className='w-full flex items-center'>
                <LZSelectRecord SelectRecord ={onSelectRecord}/>
                <LZSearch onSearching={onSearching}/>
                </div>
                <div className='flex gap-x-2'>
                    {
                        Btns.length>0?(Btns.map((val,index)=>{
                            return(
                                <Button onClick={val.OnCreate} radius='sm' key={index} size='md' color='success'>{val.type}</Button>
                            )
                            })):""
                            
                    }
                </div>
            </div>
            <div>
                {ChipperContent}
            </div>
        </div>
        <div className='h-[90%] flex flex-col justify-between '>
        <Table removeWrapper={false} 
            ref={TableDefault}
            classNames={{
                wrapper:['bg-navleft lzscroll-table'],
                th:['bg-box-wrapper'],
            }}
            className='w-full style-height-default'
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
        <LZPagination SelectPage={onSelectPage} totalRecord={data.length}/>
        </div>
    </div>
  )
}

export default LZTableDefault