import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LZPagination from './LZPagination';
import LZSearch from './LZSearch';
import LZSelectRecord from './LZSelectRecord';

function LZTableDefault({column,data,OnChangeFilter}) {
    const param = useParams();
    const [FilterData,SetFilterdata] = useState({
        Record:0,
        Search:'',
        Page:0,
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
    useEffect(()=>{
        setTimeout(()=>{
            console.log(FilterData)
        },100)
    },[FilterData.Search,FilterData.Page,FilterData.Record])
  return (
    <div>
        <div className='flex justify-between items-center mb-4'>
            <LZSearch onSearching={onSearching}/>
            <LZSelectRecord SelectRecord ={onSelectRecord}/>
        </div>
        <Table removeWrapper={false} 
            classNames={{wrapper:['bg-navleft lzscroll-table'],th:['bg-box-wrapper']}}
            className='w-full'
        >
            <TableHeader columns={column}>
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
  )
}

export default LZTableDefault