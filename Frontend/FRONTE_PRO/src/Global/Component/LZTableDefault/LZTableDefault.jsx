import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import moment from 'moment/moment'
import React from 'react'
import { useParams } from 'react-router-dom'
import LZPagination from './LZPagination';
import LZSearch from './LZSearch';
import LZSelectRecord from './LZSelectRecord';

function LZTableDefault({column,data}) {
    const param = useParams();
    console.log(param)
    const handleRowClick=(key)=>{
        console.log(key)
    }
    const onSearching=(text)=>{
        console.log(text)
    }
    const onSelectRecord=(record)=>{
        console.log(record)
    }
    const onSelectPage=(page)=>{
        console.log(page)
    }
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
        <LZPagination SelectPage={onSelectPage}/>
    </div>
  )
}

export default LZTableDefault