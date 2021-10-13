<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Users</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class='container overflow-hidden'>
    <?php require_once 'modal/userModal.php';
    require_once 'modal/deleteModal.php'; ?>
    <h1 class="g-2 text-center">Users</h1>

    <div class="buttons">
      <div class="btn-add__inner">
        <button type="button" class="btn btn-dark" id="add-user__modal" data-bs-toggle="modal" data-bs-target="#userModal">
          ADD
        </button>
      </div>
      <div class="select-inner">
        <select class="form-select select">
          <option value="0">Please select</option>
          <option value="1">Set active</option>
          <option value="2">Set not active</option>
          <option value="3">Delete</option>
        </select>
      </div>
      <div class="btn-okey__inner">
        <button type='button' class="btn btn-dark ok" id="btn-okey">
          OK
        </button>
      </div>
    </div>
    <div class="table-responsive-lg">
      <table class='table'>
        <input type="hidden" class="find-id" value="">
        <thead>
          <tr class="table-dark">
            <th><input class='form-check-input check_all' type='checkbox' value='' id='check_all'></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>
        <?php require_once 'connect.php';
        $sql = "SELECT * FROM users ORDER BY id";
        $result = mysqli_query($con, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
          if ($row['status'] == 'on') {
            $status = "<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>";
          } else if ($row['status'] == 'off') {
            $status = "<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>";
          }
          if ($row['role'] == 'admin') {
            $role = 'admin';
          } else {
            $role = 'user';
          }
        ?>
          <tbody>
            <tr class="mt-3" data-idrow='<?php echo $row['id']; ?>'>
              <td class="checkboxes"><input class='form-check-input check' type='checkbox' value='<?php echo $row['id']; ?>'></td>
              <td class='first-name text-justify'><?php echo $row['firstName'] ?></td>
              <td class='last-name'><?php echo $row['lastName'] ?></td>
              <td class='status-user'><?php echo $status ?></td>
              <td class='role-user'><?php echo $role ?></td>
              <td>
                <ul class='list-unstyled mb-0 d-flex justify-content-start btn-edit-delete'>
                  <li>
                    <button data-id="<?php echo $row['id'] ?>" type='button' data-bs-target='#userModal' id="edit-user__modal" data-bs-toggle='modal' class='btn' data-toggle='tooltip' title='' data-original-title='Edit'>
                      <span tooltip='edit this user'><i class='fas fa-edit'></i></span>
                    </button>
                  </li>
                  <li>
                    <button data-trash='<?php echo $row['id'] ?>' id='delete' type='button' class='btn delete text-danger' data-toggle='tooltip' title='' data-original-title='Delete'>
                      <span tooltip='delete this user'><i class='fas fa-trash-alt'></i></span>
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          <?php } ?>
          </tbody>

      </table>
    </div>
    <div class="buttons">
      <div class="btn-add__inner">
        <button type="button" class="btn btn-dark" id="add-user__modal" data-bs-toggle="modal" data-bs-target="#userModal">
          ADD
        </button>
      </div>
      <div class="select-inner">
        <select class="form-select select">
          <option value="0">Please select</option>
          <option value="1">Set active</option>
          <option value="2">Set not active</option>
          <option value="3">Delete</option>
        </select>
      </div>
      <div class="btn-okey__inner">
        <button type='button' class="btn btn-dark ok" id="btn-okey2">
          OK
        </button>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"></script>
  <script src="js/script.js"></script>

</body>

</html>