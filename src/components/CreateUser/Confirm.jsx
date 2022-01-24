import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { API_URL } from '../../../config'
import { useNavigate } from "react-router-dom"

const Confirm = () => {
  const navigate = useNavigate()
  const [mailConfirm, setmailConfirm] = useState(false);
  const id =  window.location.pathname.slice(9)

  useEffect(() => {
    fetch(`${API_URL}/email/confirm/${id}`)
      .then(res => res.json())
      .then(data => {
        setmailConfirm(true)
      })
      .catch(err => console.log(err))
  }, []);

  return (
      <div className='confirm'>
      {mailConfirm
        ? navigate('/')
        : <Spinner /> 
      }
    </div>
  );
}

export default Confirm;
