import React from 'react';
import '../../styles/placeImage.css';

const PlaceImage = ({ deleteable, image }) => {
  
  const deleteHandler = () => {
    console.log('a');
  }

  return (
    <div className='placeImage col-12 col-md-4 col-lg-3'>
      <img
        src={image.image_url}
        alt="Place Image"
        className='placeImage__img' />
      {
        deleteable &&
        <>
          <button type='button' className='placeImage__delete' data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="bi bi-x-circle-fill text-danger"></i>
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
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
                  <button type="button" onClick={deleteHandler} className="btn btn-success">
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