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
    <div className='placeImage col-12 col-md-4 col-lg-3'>
      <img
        src={image.image_url}
        alt={`Place Image ${image.id}`}
        className='placeImage__img' />
      {
        deleteable &&
        <>
          <button type='button' className='placeImage__delete' data-bs-toggle="modal" data-bs-target={`#placeImage${image.id}`}>
            <i className="bi bi-x-circle-fill text-danger"></i>
          </button>

          <div className="modal fade" id={`placeImage${image.id}`} tabIndex="-1" aria-labelledby={`placeImage${image.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={`placeImage${image.id}Label`}>
                    Delete place image
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  You will delete the current place image permanently, are you sure?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="button" onClick={() => { deleteHandler(image.id) }} className="btn btn-success">
                    Accept
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