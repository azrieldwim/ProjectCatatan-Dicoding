import { useEffect, useState } from 'react'
import Showdata from './Listdata'
import { getInitialData,showFormattedDate } from '..'


function App() {

  const [newdata, setNewdata] =useState({
    title:'',
    body:''
  })

  const [data, setData] = useState(getInitialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlechange = (e) => {
    const { id, value } = e.target;
  
    if (id === 'title' && value.length <= 50) {
      setNewdata({ ...newdata, [id]: value });
      setTitleCharacterCount(value.length);
    } else if (id === 'title') {
      setTitleCharacterCount(50);
    }
  
    if (id === 'body') {
      setNewdata({ ...newdata, [id]: value });
    }
  };
  

  const handlesubmit = (e) =>{
    e.preventDefault()
    
    const newCatatan={
      id: +new Date(),
      title:newdata.title,
      body:newdata.body,
      createdAt: new Date().toISOString(),
      archived: false
    };
    console.log(newCatatan)
    setData([...data, newCatatan])

    setNewdata({title:'', body:''})
  }
  
  useEffect(() => {
    console.log('Data berubah:', data);
  }, [data]);

   const btn_delete = (id) => {
        const newData = data.filter(item => item.id !== id);
        console.log({id})
        setData(newData);
      };
    
    const btn_toggle =(id) =>{
        const updatedata = data.map(item =>{
            if(item.id == id){
                return{
                    ...item, archived : !item.archived
                }
            }
            return item
        })
        setData(updatedata)
    }
    
  console.log(data)

  return (
    <div className='flex flex-col items-center bg-black/90 min-h-screen'>
      {/* Inputan */}
      <div className='w-full border-2 border-gray-600 flex'>
        <h1 className='m-4 text-3xl font-bold text-white'>Notes</h1>
        <input
          className='m-3 w-[300px] p-2 rounded bg-neutral-900 border-2 border-gray-600 text-white'
          placeholder='Cari catatan...'
          value={searchTerm}
          onChange={handleSearch}/>
      </div>

      <div className='m-8 w-[600px] h-[400px] border-2 border-gray-600 rounded-xl flex flex-col'>
          <div className='w-full h-fit flex items-center justify-center'>
            <h1 className='pt-3 font-bold text-xl text-white'>BUAT CATATAN</h1>
          </div>

        <div className='m-4 h-full'>
          <p className="pb-2 text-gray-600 text-sm text-right">
            Karakter tersisa: {50 - titleCharacterCount}
          </p>
          <form onSubmit={handlesubmit}>
            <input className='p-1 w-full rounded bg-neutral-900 border-2 border-gray-600 text-white'
            placeholder='Masukan Judul Catatanmu...'
            id='title'
            value={newdata.title}
            onChange={handlechange}
            maxLength={50}
            required
            ></input>

            <textarea className='my-2 p-2 w-full h-[215px] flex resize-none text-left align-top pl-1 bg-neutral-900 rounded border-2 border-gray-600 text-white'
            placeholder='Tuliskan catatanmu di sini...'
            id='body'
            value={newdata.body}
            onChange={handlechange}>
            </textarea>

            <div className='flex items-center justify-center'>
              <button className='text-white flex items-center bg-orange-700 px-6 py-1 border-2 border-gray-600 rounded hover:bg-orange-500 active:bg-orange-200' 
              type='submit'>
                Buat</button>
            </div>
          </form>
        </div>
      </div>
      <Showdata data={filteredData} btn_delete={btn_delete} btn_toggle={btn_toggle}/>
    </div>
  )
}

export default App