import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import BacKButton from '../components/BacKButton';
import Spinner from '../components/Spinner';


const EditBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigae = useNavigate();
  const { id } = useParams()
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author);
      setTitle(response.data.title);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    }).catch((error) => {
      setLoading(false)
      
      alert('There is an error, please check the console')
      console.log(error);

    })
  },[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigae('/');
      }).catch((error) => {
        console.log(error);
        alert('An error occured, pls check the console')
        setLoading(false);

      })
  }

  return (
    <div className='p-4'>
      <BacKButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl 
      w-[600px] p-4 mx-auto '>
        <div className="my-4">
          <label htmlFor="" className='text-xl mt-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />

        </div>

        <div className="my-4">
          <label htmlFor="" className='text-xl mt-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />

        </div>

        <div className="my-4">
          <label htmlFor="" className='text-xl mt-4 text-gray-500'>Published Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />

        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook }>save </button>
      </div>

    </div>
  )
}

export default EditBook