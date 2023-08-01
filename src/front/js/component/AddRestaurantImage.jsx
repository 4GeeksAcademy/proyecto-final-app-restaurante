import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const AddRestaurantImage = ({ restaurantId }) => {
  const [image, setImage] = useState(null)
  const { actions } = useContext(Context);
  const { addRestaurantImage, getOneRestaurant } = actions;

  const changeHandler = ({ target }) => {
    setImage(target.files[0])
  }

  const clickHandler = async () => {
    if (image == null) {
      console.log('You have to choose an image')
      return '';
    }

    var formData = new FormData();
    formData.append("image", image);

    const response = await addRestaurantImage(formData);

    if (response) {
      $('#addRestaurantImage').modal('hide');  // close modal
      await getOneRestaurant(restaurantId);         // refresh data
    }
  }

  return (
    <>
      {/* button */}
      <button type="button" className="button--blue--galeria w-100" data-bs-toggle="modal" data-bs-target="#addRestaurantImage">
        <strong>Agregar imágen</strong>
      </button>
      {/* modal */}
      <div className="modal fade" id="addRestaurantImage" tabIndex="-1" aria-labelledby="addRestaurantImageLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRestaurantImageLabel">
                Agrega una nueva imágen
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
                Cerrar
              </button>
              <button type="button" className="btn btn-primary" onClick={clickHandler}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddRestaurantImage;