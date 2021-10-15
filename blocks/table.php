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
                                <button class="btn btn-dark edit-user__modal" data-id="<?php echo $row['id'] ?>" type='button' data-bs-target='#userModal' data-bs-toggle='modal' data-toggle='tooltip' title='' data-original-title='Edit'>
                                    <span tooltip='edit this user'><i class='fas fa-edit'></i></span>
                                </button>
                            </li>
                            <li>
                                <button data-trash='<?php echo $row['id'] ?>' id='delete' type='button' class='btn delete btn-danger' data-toggle='tooltip' title='' data-original-title='Delete'>
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