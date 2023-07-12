import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const initialValue = {
  avatarFile: null
}

const EditAvatar = () => {
  const [avatar, setAvatar] = useState(initialValue)
  const { actions } = useContext(Context);
  const { changeAvatar } = actions;

  const changeHandler = ({ target }) => {
    setAvatar({
      ...avatar,
      [target.name]: target.type != 'file' ? target.value : target.files[0]
    })
  }

  const clickHandler = () => {
    if (avatar.avatarFile == null) {
      console.log('You have to choose an image')
      return '';
    }

    var formData = new FormData();
    formData.append("avatar", avatar.avatarFile);

    changeAvatar(formData);
  }

  return (
    <div className="modal fade" id="editAvatar" tabIndex="-1" aria-labelledby="editAvatarLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editAvatarLabel">
              Add a new avatar
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form action="">
              <input type="file"
                id="avatarFile" name="avatarFile"
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
  )
}
export default EditAvatar;