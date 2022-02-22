import {Component} from 'react'

import {AiOutlineDelete} from 'react-icons/ai'

import {FiEdit} from 'react-icons/fi'

import './index.css'

class User extends Component {
  state = {
    editName: '',
    editEmail: '',
    editRole: '',
    editMode: false,
  }

  onChangeCheckBox = () => {
    const {eachUserDetails, toggleCheckBox} = this.props
    const {id} = eachUserDetails
    toggleCheckBox(id)
  }

  onClickEditButton = () => {
    const {eachUserDetails} = this.props
    const {name, email, role} = eachUserDetails
    this.setState(prevState => ({
      editName: name,
      editEmail: email,
      editRole: role,
      editMode: !prevState.editMode,
    }))
  }

  onClickDeleteBtn = () => {
    const {eachUserDetails, deleteUser} = this.props
    const {id} = eachUserDetails
    deleteUser(id)
  }

  onChangeUserName = event => {
    this.setState({editName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({editEmail: event.target.value})
  }

  onChangeUserRole = event => {
    this.setState({editRole: event.target.value})
  }

  onClickSaveOrEditButton = () => {
    const {editName, editEmail, editRole} = this.state
    const {eachUserDetails, savedUser} = this.props
    const {id} = eachUserDetails
    const editUser = {
      id,
      name: editName,
      email: editEmail,
      role: editRole,
    }

    savedUser(editUser)
    this.setState({editMode: false})
  }

  render() {
    const {eachUserDetails} = this.props
    const {name, email, role, isChecked} = eachUserDetails

    const {editName, editEmail, editRole, editMode} = this.state

    return (
      <li className="user-item">
        {editMode ? (
          <div className="edit-all-fields-container">
            <input
              type="text"
              className="user-name-input"
              value={editName}
              onChange={this.onChangeUserName}
              placeholder="USERNAME"
            />

            <input
              type="text"
              value={editEmail}
              onChange={this.onChangeEmail}
              placeholder="EMAIL"
              className="user-email"
            />
            <input
              type="text"
              className="user-role-input"
              value={editRole}
              onChange={this.onChangeUserRole}
              placeholder="ROLE"
            />
            <button
              type="button"
              className="edit-mode-save-button"
              onClick={this.onClickSaveOrEditButton}
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              onChange={this.onChangeCheckBox}
              className="user-checkbox"
              checked={isChecked}
            />

            <p className="user-details">{name}</p>
            <p className="user-details">{email}</p>
            <p className="user-details">{role}</p>
            <div className="actions-container">
              <button
                className="edit-button"
                type="button"
                onClick={this.onClickEditButton}
              >
                <FiEdit className="edit-icon" />
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={this.onClickDeleteBtn}
              >
                <AiOutlineDelete className="delete-icon" />
              </button>
            </div>
          </>
        )}
      </li>
    )
  }
}

export default User
