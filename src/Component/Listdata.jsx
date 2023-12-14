import React, { useEffect, useState } from 'react'
import { getInitialData } from '..'
import Catatan from './CatatanAktif'
import Arsip from './Arsip'

const Showdata = ({data, btn_delete, btn_toggle}) => {
    const [data1, setData1]= useState(data)
    useEffect(() =>{
        setData1(data)
    },[data]
    )

  return (
    <div className='text-white w-[1200px] h-fit flex justify-center flex-col '>
        <div className='mt-8'>
            <h1 className='text-3xl text-white font-bold'>Catatan Aktif</h1>

            <div className='grid grid-cols-4 gap-4 mt-4'>
            {data1.some(item =>!item.archived) ?(
                data1.filter(item => !item.archived).map((item)=>(
                    <Catatan key={item.id} item={item} btn_delete={btn_delete} btn_toggle={btn_toggle}/>
                ))
            ):(
                <h1 className='p-8 text-white flex items-center justify-center w-[1200px] text-l'>TIDAK ADA CATATAN</h1>
            )}    
            
            </div>
        </div>

        <div className='mt-8'>
            <h1 className='text-3xl text-white font-bold my-4'>Arsip </h1>
            <div className='grid grid-cols-4 gap-4 mt-4'>
            {data1.some(item =>item.archived)? (
                data1.filter(item => item.archived).map((item)=>(
                <Arsip key={item.id} item={item} btn_delete={btn_delete} btn_toggle={btn_toggle}/>
                ))
            ):(
                <h1 className='p-8 text-white flex items-center justify-center w-[1200px] text-l'>TIDAK ADA CATATAN</h1>
            )}
            </div>
        </div>
    </div> 
)
}

export default Showdata