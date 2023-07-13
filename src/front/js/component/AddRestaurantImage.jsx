import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const AddRestaurantImage = () => {
  const [image, setImage] = useState(null)
  const { actions } = useContext(Context);
  const { addRestaurantImage } = actions;

  const changeHandler = ({ target }) => {
    setImage(target.files[0])
  }

  const clickHandler = () => {
    if (image == null) {
      console.log('You have to choose an image')
      return '';
    }

    var formData = new FormData();
    formData.append("image", image);

    addRestaurantImage(formData);
  }

  return (
    <>
      {/* button */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRestaurantImage">
        Add image
      </button>
      {/* modal */}
      <div className="modal fade" id="addRestaurantImage" tabIndex="-1" aria-labelledby="addRestaurantImageLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRestaurantImageLabel">
                Add a new restaurant image
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="">
                <input type="file"
                  id="image" name="image"
                  accept="image/png, image/jpeg"
                  onChange={changeHandler} />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={clickHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddRestaurantImage;