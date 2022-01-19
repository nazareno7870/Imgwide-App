import './Gallery.css'
import { useState } from 'react';
import ModalImage from '../ModalImage/ModalImage';

const Gallery = () => {
    const [modal, setmodal] = useState(false);
    const [image, setimage] = useState('');

  const handleImage = (e)=>{
    setimage(e.target.currentSrc)
    setmodal(!modal)
  }

  const images = [
      {
      src:'https://www.rionegro.com.ar/wp-content/uploads/2021/11/avellaneda-libertadores.jpg',
      tags:['Independiente','Estadio','Libertadores de America']
  },
  {
    src:'https://radiografica.org.ar/wp-content/uploads/2021/06/Alan-Velasco.jpg',
    tags:['Alan','Velasco','Crack']
},
{
    src:'https://media.ambito.com/p/88353d36226b13f9e099aa50c5416aab/adjuntos/239/imagenes/039/505/0039505578/1200x1200/smart/bochini-maximo-idolo-de-independiente-1072522jpg.jpg',
    tags:['Bochini','The Best','Libertadores de America']
},
]

    return (
        <>
            <div className="gallery">
                {images.map(img=>{
                    return(     

                    <div className="img-item" key={img.src}>
                        <img src={img.src} alt="Libertadores de America" onClick={handleImage}/>
                    </div>
                    )
                })}

            </div>

            <ModalImage
            modal={modal}
            setmodal={setmodal}
            image={image}
            setimage={setimage}
            />
        </>
    );
    
}

export default Gallery;