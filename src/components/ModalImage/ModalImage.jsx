import { useState } from 'react';
import Spinner from './../Spinner/Spinner';
import './ModalImage.css'

const ModalImage = ({setmodal,modal,setimage,image}) => {

    const [loaded, setloaded] = useState(false);

    const handleModal =(e)=>{
        if(e.target.className === 'img-container' || e.target.nodeName === 'BUTTON'){
            setimage('')
            setloaded(false)
            setmodal(!modal)}
      }

    return (
        <div className="modal-image" onClick={handleModal}  style={{display:modal ? 'block':'none'}}>
        
            <div className="img-container" style={{display:loaded ? 'flex':'none'}}>
                <div className="img">
                <button onClick={handleModal}>X</button>

                    <img 
                src={image} 
                onLoad={()=>setloaded(true)}
                />
                </div>


            </div>


            {!loaded?<Spinner />:<></>}

      </div>
    );
}

export default ModalImage;