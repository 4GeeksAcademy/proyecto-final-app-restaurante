import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/placeImage.css';

const PlaceImage = ({ deleteable, image }) => {
  const { actions } = useContext(Context);
  const { deletePlaceImage } = actions;

  const deleteHandler = (id) => {
    deletePlaceImage(id);
  }

  return (
    <div className='placeImage'>
      <div className='col-12'>
        <img
          src={image.image_url}
          alt={`Place Image ${image.id}`}
          className='placeImage__img' />
      </div>
      {
        deleteable &&
        <>
          <button type='button' className='placeImage__delete' data-bs-toggle="modal" data-bs-target={`#placeImage${image.id}`}>
            <i className="bi bi-x-circle-fill"></i>
          </button>

          <div className="modal fade" id={`placeImage${image.id}`} tabIndex="-1" aria-labelledby={`placeImage${image.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={`placeImage${image.id}Label`}>
                    Borrar Imágen
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Tu imágen actual se borrará permanentemente, estás seguro?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button type="button" onClick={() => { deleteHandler(image.id) }} className="btn btn-success">
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};
export default PlaceImage;