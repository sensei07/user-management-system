$(document).ready(function () {
    // delete danger confirm 
    function deleteDangerModal() {
        var paras = $('.error-name');
        for (var i = 0; i < paras.length; i++) {
            paras.remove();
        }
    };
    // remove checkbox
    function removeCheckbox() {
        $('#check_all, .check').prop('checked', false)
    }
    /// remove error block
    $('#firstname,#lastname,#role').change(function () {
        let inputName = $('#firstname').val();
        let inputNameLength = inputName.length;
        let inputLastName = $('#lastname').val();
        let inputLastNameLength = inputLastName.length;
        let selectRole = $('#role').val();
        if (selectRole == '1' || selectRole == '2') {
            $('.danger-role').remove();
            $('.error-name').remove();
        }
        if (inputNameLength && inputLastNameLength >= 2) {
            $('.danger-name').remove();
        }
    })
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
    });
    $('.check').click(function () {
        let countChecked = $('.check:checkbox:checked').length;
        let countAll = $('.check:checkbox').length;
        if (countChecked === countAll) {
            $('#check_all').prop('checked', true);
        } else {
            $('#check_all').prop('checked', false);
        }
    });
    // added ADD-BTN
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
        } else {
            status = 'off';
        }
        if (role == '2') {
            role = 'user';
        } else if (role == '1') {
            role = 'admin';
        }
        if (firstName.length < 2 || lastName.length < 2) {
            let confirmError = `<div class="alert alert-danger danger danger-name" role="alert">
                    please enter your first name or last name
                </div>`;
            if (!$('#confirm-name').children('.danger').length > 0) {
                $('#confirm-name').append(confirmError);
            } return false;
        }
        if (role == '0') {
            let confirmError = `<div class="alert alert-danger danger danger-role" role="alert">
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
                deleteDangerModal();
                let dataParse = $.parseJSON(data);
                let userId = dataParse.user.id;
                let statusParse = dataParse.user.status;
                if (statusParse === 'on') {
                    statusImg = "<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>";
                } else {
                    statusImg = "<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>";
                }
                $('#firstname').val('');
                $('#lastname').val('');
                $('#role').val(0);
                $('#userModal').modal('hide');
                let tbody = `<tbody>
                            <tr data-idrow = '${userId}'>
                                <td class='checkboxes'><input class='form-check-input check' type='checkbox' value='${userId}'></td>
                                <td class='first-name'>${dataParse.user.firstName}</td>
                                <td class='last-name'>${dataParse.user.lastName}</td>
                                <td class='status-user'>${statusImg}</td>
                                <td class='role-user'>${dataParse.user.role}</td>
                                <td>   
                                    <ul class='list-unstyled mb-0 d-flex justify-content-start btn-edit-delete'>
                                        <li class="edit-btn__item">
                                            <button data-id='${userId}' type='button' data-bs-target='#userModal' data-bs-toggle='modal' class='btn btn-dark edit-user__modal' data-toggle='tooltip' title='' data-original-title='Edit'>
                                                <span tooltip='edit this user'><i class='fas fa-edit'></i></span>
                                            </button>
                                        </li> 
                                        <li>
                                            <button data-trash='${userId}' id='delete' type='button' class='btn delete btn-danger'data-toggle='tooltip' title='' data-original-title='Delete' >
                                                <span tooltip='delete this user'><i class='fas fa-trash-alt'></i></span>         
                                            </button>
                                        </li>
                                    </ul>        
                                </td>
                            </tr>
                        </tbody>`;
                $('table').append(tbody);
            },
            error: function (data) {
                let dataParse = $.parseJSON(data.responseText);
                let errorText = dataParse.error.message;
                let confirmError = `<div class="alert alert-danger danger error-name" role="alert">
                    ${errorText}
                </div>`;
                if (!$('#confirm-name').children('.error-name').length > 0) {
                    $('#confirm-name').append(confirmError);
                } return false;
            }
        });
    });
    /// added EDIT-
    $(document).on('click', '.edit-user__modal', function () {
        $('.title').text('Edit user');
        let idEdit = $(this).data('id');
        console.log(idEdit);
        let btnEdit = `<button type='button' id='edit-user__btn' class='btn btn-primary'>Edit</button>`;
        if (!$('#userModal .modal-footer').children('#edit-user__btn').length > 0) {
            $('#userModal .modal-footer').append(btnEdit);
            $('#add-user__btn').remove();
        };
        if ($(`[data-idrow='${idEdit}']`).find('.status-input').val() == 'on') {
            $('#status').prop('checked', true);
        } else {
            $('#status').prop('checked', false);
        }
        $('#firstname').val($(`[data-idrow='${idEdit}']`).find('.first-name').text());
        $('#lastname').val($(`[data-idrow='${idEdit}']`).find('.last-name').text());
        if ($(`[data-idrow='${idEdit}']`).find('.role-user').text() == 'admin') {
            $('#role').val(1);
        } else if ($(`[data-idrow='${idEdit}']`).find('.role-user').text() == 'user') {
            $('#role').val(2);
        }
        $('#edit-user__btn:last').click(function () {
            let firstNameEdit = $('#firstname').val();
            let lastNameEdit = $('#lastname').val();
            let statusEdit = $('#status').val();
            let roleEdit = $('#role').val();
            if (firstNameEdit.length < 2 || lastNameEdit.length < 2) {
                let confirmError = `<div class="alert alert-danger danger danger-name" role="alert">
                    please enter your first name or last name
                </div>`;
                if (!$('#confirm-name').children('.danger').length > 0) {
                    $('#confirm-name').append(confirmError);
                } return false;
            }
            if (roleEdit == '0') {
                let confirmError = `<div class="alert alert-danger danger danger-role" role="alert">
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
                    idEdit: idEdit,
                },
                beforeSend: function () {
                    idEdit = 0;
                },
                success: function (data) {
                    $('#edit-user__btn').remove();
                    let dataParse = $.parseJSON(data);
                    let userId = dataParse.user.id;
                    let statusParse = dataParse.user.status;
                    $('#userModal').modal('hide');
                    $(`[data-idrow='${userId}']`).find('.first-name').text(dataParse.user.firstName);
                    $(`[data-idrow='${userId}']`).find('.last-name').text(dataParse.user.lastName);
                    if (statusParse == 'on') {
                        statusEdit = 'on';
                        $(`[data-idrow='${userId}']`).find('.status-user').html("<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>");
                    } else {
                        statusEdit = 'off';
                        $(`[data-idrow='${userId}']`).find('.status-user').html("<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>");
                    }
                    if (dataParse.user.role == 'admin') {
                        $(`[data-idrow='${userId}']`).find('.role-user').text(dataParse.user.role);
                    } else {
                        $(`[data-idrow='${userId}']`).find('.role-user').text(dataParse.user.role);
                    }
                    idEdit = null;
                }, error: function (data) {
                    let dataParse = $.parseJSON(data.responseText);
                    let errorText = dataParse.error.message;
                    let confirmError = `<div class="alert alert-danger danger error-name" role="alert">
                    ${errorText}
                </div>`;
                    if (!$('#confirm-name').children('.error-name').length > 0) {
                        $('#confirm-name').append(confirmError);
                    } return false;
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
        if ($("#delete-row").length === 0) {
            $('#deleteModal .modal-footer').append("<button type='button' class='btn btn-dark' id='delete-row'>OK</button>");
        }
        $('#delete-row').click(function () {
            $.ajax({
                url: "delete.php",
                type: 'post',
                data: {
                    deleteId: deleteId
                },
                dataType: 'html',
                success: function (data) {
                    $('#delete-row').remove();
                    dataParse = $.parseJSON(data);
                    $('#deleteModal').modal('hide');
                    $(`[data-idrow='${dataParse.id}']`).remove();
                    deleteId = 0;
                }
            })
        });
    });
    ///// Edit status
    $(document).on('click', '.btn-okey:first', function () {
        let id = [];
        let idString = '';
        $('.check:checkbox:checked').each(function (i) {
            id.push($(this).val());
            idString = id.toString();
        })
        $("#deleteModal").on("hidden.bs.modal", function () {
            console.log(idString);
            console.log(id);
        });
        // select's confirm window
        if ($('.select:first').val() === '0' || id.length === 0) {
            $('#deleteModal').modal('show');
            $('.title-modal').text('Please select');
            $('.body-modal').text('Select an action or users');
            $('#delete-row').remove();
        }
        // actions 1/2/3
        if ($('.select:first').val() === '1' && id.length >= 1) {
            let selectValue = 'on';
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                success: function (data) {
                    dataParse = $.parseJSON(data);
                    let dataId = dataParse.selectId;
                    removeCheckbox();
                    for (let i = 0; i < dataId.length; i++) {
                        $(`[data-idrow='${dataId[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>");
                    }
                }
            });
        } else if ($('.select:first').val() === '2' && id.length >= 1) {
            let selectValue = 'off';;
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                success: function (data) {
                    dataParse = $.parseJSON(data);
                    let dataId = dataParse.selectId;
                    removeCheckbox();
                    for (let i = 0; i < dataId.length; i++) {
                        $(`[data-idrow='${dataId[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>");
                    }
                }
            });
        }
        else if ($('.select:first').val() === '3') {
            if ($('.select:first').val() === '3' && id.length === 0) {
                $('#deleteModal').modal('toggle');
                $('.title-modal').text('Please select');
                $('.body-modal').text('Select an action or users');
                return;
            }
            if ($("#delete-row").length === 0) {
                $('#deleteModal .modal-footer').append("<button type='button' class='btn btn-dark' id='delete-row'>OK</button>");
            }
            $('#deleteModal').modal('show');
            $('.title-modal').text('Delete');
            $('.body-modal').text('Are you sure you want to delete the user?');
            $('#delete-row').click(function () {
                $.ajax({
                    url: 'delete.php',
                    method: 'POST',
                    data: {
                        selectedId: idString
                    },
                    success: function (data) {
                        $('#delete-row').remove();
                        dataParse = $.parseJSON(data);
                        let res = dataParse.selectId.split(",");
                        console.log(res);
                        // let dataId = dataParse.selectId;
                        $('#deleteModal').modal('hide');
                        removeCheckbox();
                        for (let i = 0; i <= res.length; i++) {
                            $(`[data-idrow='${res[i]}']`).remove();
                        };
                    },
                });
            });
        };
    });
    
    
    
    
    
    
    
    
    
    
    //// second block
    $('.btn-okey:last').click(function () {
        let id = [];
        $('.check:checkbox:checked').each(function (i) {
            id[i] = $(this).val();
        })
        // select's confirm window
        if ($('.select:last').val() === '0' || id.length === 0) {
            $('#deleteModal').modal('toggle');
            $('.title-modal').text('Please select');
            $('.body-modal').text('Select an action or users');
            $('#delete-row').remove();
        }
        // actions 1/2/3
        if ($('.select:last').val() === '1' && id.length >= 1) {
            let selectValue = 'on';
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                success: function (data) {
                    dataParse = $.parseJSON(data);
                    let dataId = dataParse.selectId;
                    removeCheckbox();
                    for (let i = 0; i < dataId.length; i++) {
                        $(`[data-idrow='${dataId[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='on'><span tooltip='online'><i class='fas fa-circle online'></i></span>");
                    }
                }
            });
        } else if ($('.select:last').val() === '2' && id.length >= 1) {
            let selectValue = 'off';;
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    id: id,
                    selectValue: selectValue
                },
                dataType: 'html',
                success: function (data) {
                    dataParse = $.parseJSON(data);
                    let dataId = dataParse.selectId;
                    removeCheckbox();
                    for (let i = 0; i < dataId.length; i++) {
                        $(`[data-idrow='${dataId[i]}']`).find('.status-user').html("<input class='status-input' type='hidden' value='off'><span tooltip='offline'><i class='fas fa-circle offline'></i></span>");
                    }
                }
            });
        }
        else if ($('.select:last').val() === '3') {
            if ($('.select:last').val() === '3' && id.length === 0) {
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
                    success: function (data) {
                        $('#delete-row').remove();
                        dataParse = $.parseJSON(data);
                        let dataId = dataParse.selectId;
                        $('#deleteModal').modal('hide');
                        removeCheckbox();
                        for (let i = 0; i < dataId.length; i++) {
                            $(`[data-idrow='${dataId[i]}']`).remove();
                        };
                    },
                });
            })
        }
    });
})
