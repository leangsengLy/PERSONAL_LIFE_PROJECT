import React, { useEffect } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import $ from 'jquery';
DataTable.use(DT);
function LzDataTable({columns,data}) {
    useEffect(()=>{
        $(".dt-input").attr("placeholder","Searching...")
        $("div.dt-container div.dt-layout-full").addClass("lzscroll")
    })
  return (
    <div>
      
        <DataTable 
        columns={columns} 
        options={{
            responsive: true,
            select: true,
            language:{
                lengthMenu: "_MENU_ " ,
                search: "", 
                // info: `Total Record ${data.length}`,             
            }
        }} 
        data={data} className="display"
        >
        </DataTable>
    </div>
  )
}

export default LzDataTable