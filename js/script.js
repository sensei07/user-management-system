$(document).ready(function () {
    // delete danger confirm 
    function deleteDangerModal() {
        let paras = $('.danger');
        for (let i = 0; i < paras.length; i++) {
            paras.remove();
        }
    }
    /// INPUT ADD EDIT NAME ONLY LETTERS
    $(document).ready(function () {
        $(".input-words").keydown(function (event) {
            let inputValue = event.which;
            if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 0)) {
                event.preventDefault();
            }
        });
    });
    // remove checkbox
    function removeCheckbox() {
        $('#check_all, .check').prop('checked', false)
    }
    /////    CHECKBOX
    $(document).on('click', '#check_all', function () {
        if (this.checked) {
            $('.check').each(function () {
                this.checked = true;
            });
        } else {
            $('.check').each(function () {
                this.checked = false;
            });
        }
        $('.check').click(function () {
            if ($(this).is(':checked') == false) {
                $('#check_all').prop('checked', false);
            }
        });
    });
    $(document).on('click', '.check', function () {
        $('#check_all').prop('checked', false);
    })
    ////// find DATA ID
    function getDataId() {
        $.post("add-edit.php",
            {
                id: true,
            },
            function (data) {
                dataId = $.parseJSON(data);
                for (let key in dataId) {
                    dataIdNumder = +dataId[key] + 1;
                    $('.find-id').val(dataIdNumder);
                }
            }
        )
    };
    getDataId();
    //// added ADD-BTN
    $(document).on('click', '#add-user__modal', function () {
        $('.title').text('Add user');
        let btnAdd = "<button type='button' id='add-user__btn' class='btn btn-primary'>Add</button>";
        if (!$('#userModal .modal-footer').children('#add-user__btn').length > 0) {
            $('#userModal .modal-footer').append(btnAdd);
            $('#edit-user__btn').remove();
        }
        $('#firstname').val('');
        $('#lastname').val('');
        $('#role').val(0);
    });
    // added ADD-FORM
    $(document).on('click', '#add-user__btn', function () {
        let firstName = $('#firstname').val();
        let lastName = $('#lastname').val();
        let status = $('#status').val();
        let role = $('#role').val();
        let statusImg = '';
        if ($("#status:checked").val() == 'on') {
            status = 'on';
            statusImg = "<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>";
        } else {
            status = 'off';
            statusImg = "<input class='status-input' type='hidden' value='on'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>";
        }
        if (role == '2') {
            role = 'user';
        } else if (role == '1') {
            role = 'admin';
        }
        if (firstName.length < 2 || lastName.length < 2) {
            let confirmError = `<div class="alert alert-danger danger" role="alert">
                    please enter your first name or last name
                </div>`;
            if (!$('#confirm-name').children('.danger').length > 0) {
                $('#confirm-name').append(confirmError);
            } return false;
        }
        if (role == '0') {
            let confirmError = `<div class="alert alert-danger danger" role="alert">
                    please enter a role
                </div>`;
            if (!$('#confirm-role').children('.danger').length > 0) {
                $('#confirm-role').append(confirmError);
            } return false;
        }
        $.ajax({
            url: 'add-edit.php',
            type: 'post',
            data: {
                firstName: firstName,
                lastName: lastName,
                status: status,
                role: role
            },
            success: function (data) {
                getDataId();
                deleteDangerModal();
                $('#firstname').val('');
                $('#lastname').val('');
                $('#role').val(0);
                $('#userModal').modal('hide');
                let userId = +$('.find-id').val();
                let tbody = `<tbody>
                            <tr data-idrow = '${userId}'>
                                <td class='checkboxes'><input class='form-check-input check' type='checkbox' value='${userId}'></td>
                                <td class='first-name'>${firstName}</td>
                                <td class='last-name'>${lastName}</td>
                                <td class='status-user'>${statusImg}</td>
                                <td class='role-user'>${role}</td>
                                <td>   
                                    <ul class='list-unstyled mb-0 d-flex justify-content-start btn-edit-delete'>
                                        <li>
                                            <button data-id='${userId}' type='button' data-bs-target='#userModal' id="edit-user__modal" data-bs-toggle='modal' class='btn' data-toggle='tooltip' title='' data-original-title='Edit'>
                                                <span tooltip='edit this user'><i class='fas fa-edit'></i></span>
                                            </button>
                                        </li> 
                                        <li>
                                            <button data-trash='${userId}' id='delete' type='button' class='btn delete text-danger'data-toggle='tooltip' title='' data-original-title='Delete' >
                                                <span tooltip='delete this user'><i class='fas fa-trash-alt'></i></span>         
                                            </button>
                                        </li>
                                    </ul>        
                                </td>
                            </tr>
                            </tbody>`;
                $('table').append(tbody);
            }
        })
    });
    /// added EDIT-
    $(document).on('click', '#edit-user__modal', function () {
        $('.title').text('Edit user');
        let editId = $(this).data('id');
        let btnAdd = `<button type='button' id='edit-user__btn' class='btn btn-primary'>Edit</button>`;
        if (!$('#userModal .modal-footer').children('#edit-user__btn').length > 0) {
            $('#userModal .modal-footer').append(btnAdd);
            $('#add-user__btn').remove();
        };
        if ($(`[data-idrow='${editId}']`).find('.status-input').val() == 'on') {
            $('#status').prop('checked', true);
        } else {
            $('#status').prop('checked', false);
        }
        $('#firstname').val($(`[data-idrow='${editId}']`).find('.first-name').text());
        $('#lastname').val($(`[data-idrow='${editId}']`).find('.last-name').text());
        if ($(`[data-idrow='${editId}']`).find('.role-user').text() == 'admin') {
            $('#role').val(1);
        } else if ($(`[data-idrow='${editId}']`).find('.role-user').text() == 'user') {
            $('#role').val(2);
        }
        $(document).on('click', '#edit-user__btn', function () {
            let firstNameEdit = $('#firstname').val();
            let lastNameEdit = $('#lastname').val();
            let statusEdit = $('#status').val();
            let roleEdit = $('#role').val();
            if (firstNameEdit.length < 2 || lastNameEdit.length < 2) {
                let confirmError = `<div class="alert alert-danger danger" role="alert">
                    please enter your first name or last name
                </div>`;
                if (!$('#confirm-name').children('.danger').length > 0) {
                    $('#confirm-name').append(confirmError);
                } return false;
            }
            if (roleEdit == '0') {
                let confirmError = `<div class="alert alert-danger danger" role="alert">
                    please enter a role
                </div>`;
                if (!$('#confirm-role').children('.danger').length > 0) {
                    $('#confirm-role').append(confirmError);
                } return false;
            }
            if ($("#status:checked").val() == 'on') {
                statusEdit = 'on';
            } else {
                statusEdit = 'off';
            }
            if (roleEdit == '2') {
                roleEdit = 'user';
            } else if (roleEdit == '1') {
                roleEdit = 'admin';
            }
            $.ajax({
                url: 'add-edit.php',
                type: 'post',
                data: {
                    firstNameEdit: firstNameEdit,
                    lastNameEdit: lastNameEdit,
                    statusEdit: statusEdit,
                    roleEdit: roleEdit,
                    idEdit: editId,
                },
                success: function () {
                    deleteDangerModal();
                    $('#userModal').modal('hide');
                    $(`[data-idrow='${editId}']`).find('.first-name').text(firstNameEdit);
                    $(`[data-idrow='${editId}']`).find('.last-name').text(lastNameEdit);
                    if ($("#status:checked").val() == 'on') {
                        statusEdit = 'on';
                        $(`[data-idrow='${editId}']`).find('.status-user').html("<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>");
                    } else {
                        statusEdit = 'off';
                        $(`[data-idrow='${editId}']`).find('.status-user').html("<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>");
                    }
                    if (roleEdit == 'admin') {
                        $(`[data-idrow='${editId}']`).find('.role-user').text('admin');
                    } else {
                        $(`[data-idrow='${editId}']`).find('.role-user').text('user');
                    }
                    editId = 0;
                }
            })
        });
    });
    /////// DELETE USER
    $(document).on('click', '#delete', function () {
        let deleteId = $(this).data('trash');
        $('#deleteModal').modal('toggle');
        $('.modal-title').text('Delete');
        $('.body-modal').text('Are you sure want to delete this user?');
        let btnDelete = `<button type='button' class='btn btn-dark' id='delete-row'>OK</button>`;
        if (!$('#deleteModal .modal-footer').children('#delete-row').length > 0) {
            $('#deleteModal .modal-footer').append(btnDelete);
        }
        $('#delete-row').click(function () {
            $.ajax({
                url: "delete.php",
                cache: false,
                type: 'post',
                data: {
                    deleteId: deleteId
                },
                dataType: 'html',
                beforeSend: function () {
                    $(`[data-idrow='${deleteId}']`).remove();
                },
                success: function (data, status) {
                    $('#deleteModal').modal('hide');
                }
            })
        });
    });
    ///// Edit status
    $('#btn-okey,#btn-okey2').click(function () {
        let id = [];
        $('.check:checkbox:checked').each(function (i) {
            id[i] = $(this).val();
        })
        // select's confirm window
        if ($('.select:last').val() === '0' && $('.select:first').val() === '0' || id.length === 0) {
            $('#deleteModal').modal('toggle');
            $('.title-modal').text('Please select');
            $('.body-modal').text('Select an action or users');
            $('#delete-row').remove();
        }
        // actions 1/2/3
        if ($('.select:first').val() === '1' || $('.select:last').val() === '1') {
            let selectValue = 'on';;
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                beforeSend: function () {
                    for (let i = 0; i < id.length; i++) {
                        $(`[data-idrow='${id[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>");
                    }
                },
                success: function () {
                    removeCheckbox();
                    $('.select:first,.select:last').val(0);
                }
            });
        } else if ($('.select:first').val() === '2' || $('.select:last').val() === '2') {
            let selectValue = 'off';;
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                beforeSend: function () {
                    for (let i = 0; i < id.length; i++) {
                        $(`[data-idrow='${id[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>");
                    }
                },
                success: function () {
                    removeCheckbox();
                    $('.select:first,.select:last').val(0);
                }
            });
        }
        else if ($('.select:first').val() === '3' || $('.select:last').val() === '3') {
            if ($('.select').val() === '3' && id.length === 0) {
                $('#deleteModal').modal('toggle');
                $('.title-modal').text('Please select');
                $('.body-modal').text('Select an action or users');
                return;
            }
            if ($("#delete-row").length === 0) {
                $('#deleteModal .modal-footer').append("<button type='button' class='btn btn-dark' id='delete-row'>OK</button>");
            }
            $('#deleteModal').modal('toggle');
            $('.title-modal').text('Delete');
            $('.body-modal').text('Are you sure you want to delete the user?');
            $('#delete-row').click(function () {
                $.ajax({
                    url: 'delete.php',
                    method: 'POST',
                    data: { selectedId: id },
                    dataType: 'html',
                    beforeSend: function () {
                        for (let i = 0; i < id.length; i++) {
                            $(`[data-idrow='${id[i]}']`).remove();
                        }
                    },
                    success: function () {
                        $('#deleteModal').modal('hide');
                        id = 0;
                        removeCheckbox();
                        $('.select:first,.select:last').val(0);
                    }
                });
            })
        }
    });
})