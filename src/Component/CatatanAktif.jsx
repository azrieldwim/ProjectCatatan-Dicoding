import React from 'react'
import { getInitialData } from '..'

const Catatan = ({item, btn_delete, btn_toggle }) => {

  const hapus = () => {
    btn_delete(item.id);
  }

  const btn_arsip = () => {
    btn_toggle(item.id)
  }
  return (
        <div key={item.id} className='w-full h-full bg-neutral-900 p-2 hover:bg-blue-950 border-2 border-gray-600 rounded'>
          <div className='w-fit rounded p-2 min-h-[310px] min-w-full'>
            <h1 className='text-2xl font-bold'>{item.title}</h1>
            <h2 className='text-gray-500 my-2'>{item.createdAt}</h2>
            <p className=''>{item.body}</p>
          </div>
          <div className='p-3 flex items-center justify-center'>
            <button className='px-4 bg-red-700 mx-2 text-lg' onClick={hapus}>Delete</button>
            <button className='px-4 bg-green-700 mx-2 text-lg' onClick={btn_arsip}>Arsip</button>
          </div>
        </div>
  )
}

export default Catatan