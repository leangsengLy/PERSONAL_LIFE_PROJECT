import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import moment from 'moment/moment'
import React from 'react'

function LZTableDefault({column,data}) {
    const onclickRow=(key)=>{
        console.log(key)
    }
  return (
    <div>
        <Table removeWrapper={false} 
            onCellAction={onclickRow}
            classNames={{wrapper:['bg-navleft'],th:['bg-box-wrapper']}}
            className='w-full'
        >
            <TableHeader columns={column}>
                {
                    column.map((val)=>(
                        <TableColumn width={val.width}>{val.title}</TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                    {
                        data.map((val,index)=>(
                        <TableRow key={val.Id}>
                            {column.map(v=>(
                                <TableCell>{v.isDraw?(<>
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
    </div>
  )
}

export default LZTableDefault