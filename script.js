$(document).ready(function () {
    let data = []; // Placeholder for data

    function updateTable() {
        const tbody = $('#crudTable tbody');
        tbody.empty();

        data.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.age}</td>
                    <td>${item.state}</td>
                    <td>
                        <button class="btnEdit" data-index="${index}">Edit</button>
                        <button class="btnDelete" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function clearForm() {
        $('#crudForm')[0].reset();
        $('#currentIndex').val('');
    }

    function showForm() {
        $('.form-container').show();
        $('#crudTable').hide();
    }

    function hideForm() {
        $('.form-container').hide();
        $('#crudTable').show();
    }

    // Add button click event
    $('#btnAdd').on('click', function () {
        clearForm();
        showForm();
    });

    // Save button click event
    $('#btnSave').on('click', function () {
        const currentIndex = $('#currentIndex').val();
        const formData = $('#crudForm').serializeArray().reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {});

        if (currentIndex === '') {
            // Add new record
            data.push(formData);
        } else {
            // Update existing record
            data[currentIndex] = formData;
        }

        updateTable();
        clearForm();
        hideForm();
    });

    // Edit button click event
    $(document).on('click', '.btnEdit', function () {
        const index = $(this).data('index');
        const record = data[index];

        $('#name').val(record.name);
        $('#address').val(record.address);
        $('#age').val(record.age);
        $('#state').val(record.state);
        $('#currentIndex').val(index);

        showForm();
    });

    // Delete button click event
    $(document).on('click', '.btnDelete', function () {
        const index = $(this).data('index');
        data.splice(index, 1);
        updateTable();
    });

    // Cancel button click event
    $('#btnCancel').on('click', function () {
        clearForm();
        hideForm();
    });

    // Initial table update
    updateTable();
});