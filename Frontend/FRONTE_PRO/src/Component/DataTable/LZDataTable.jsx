import React, { useEffect } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import $ from 'jquery';
DataTable.use(DT);
function LzDataTable({columns,data}) {
    console.log(data)
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
            language:{
                lengthMenu: "_MENU_ " ,
                search: "", 
            },
        }} 
        data={data}
        className="display"
        >
        </DataTable>
    </div>
  )
}

export default LzDataTable