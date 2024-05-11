import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from './api'

type TypeData = {
  name: string;
}
const App:FC = ():ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<TypeData[]>([]);
  const [value, setValue] = useState<string>('')

  const getData = async() => {
    try{
      const {data} = await axios<TypeData[]>(api + '/product');
      setData(data);
    } catch(e) {
    } finally {
      setIsLoading(false)
    }
  }
  const postData = async() => {
    try{
      await axios.post(api + '/product', {name: value});
     getData();
     setValue('')
    }catch(e) {}
  }
  useEffect(()=>{
    getData()
  },[]);
  
  
  return (
    <div>
      {
        isLoading ?
         "loading.."
        :
        <div>
          {data.map((el:TypeData, id:number)=>(
            <h2 key={id}>{el.name}</h2>
          ))}
        </div>
      }
      <div className="">
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
        <button onClick={postData} >Add</button>
      </div>
    </div>
  )
}
export default App