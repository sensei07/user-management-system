<div class='modal fade' id='userModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
  <div class='modal-dialog' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title title' id='exampleModalLabel'></h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body'>
        <div class="mb-3">
          <label for="name" class="form-label">First Name</label>
          <input type="text" class="form-control input-words" id="firstname" name="firstname" placeholder="enter your first name" pattern="[a-z]{1,15}" required>
        </div>
        <div class="mb-3">
          <label for="lastname" class="form-label">Last Name</label>
          <input type="text" class="form-control input-words" id="lastname" name="lastname" placeholder="enter your last name">
        </div>
        <div id="confirm-name"></div>
        <div class='form-check form-switch mt-2'>
          <input class='form-check-input' id="status" name='status' type='checkbox' checked>
          <label class='form-check-label' for='flexSwitchCheckChecked'>Status</label>
        </div>
        <select class='form-select mb-3 mt-2' id="role" name='role'>
          <option value='0'>Role</option>
          <option value='1'>Admin</option>
          <option value='2'>User</option>
        </select>
        <div id="confirm-role"></div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' id='close'>Close</button>
        <!-- <button type='button' id='add-user' name='update' class='btn btn-primary'>Save</button> -->
        <!-- <button type='button' id='edit-user__btn' class='btn btn-primary'>Edit</button> -->
      </div>
    </div>
  </div>
</div>
