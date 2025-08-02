// public/js/script.js

// Client-side validation for the add task form
function validateForm() {
    const titleInput = document.getElementById('todo-title');
    if (titleInput.value.trim() === '') {
        alert('Task title cannot be empty!');
        return false;
    }
    return true;
}

// Function to toggle between display and edit modes for a todo item
function toggleEdit(id, button) {
    const todoItem = button.closest('.todo-item');
    const titleSpan = todoItem.querySelector('.todo-title');
    const actionsDiv = todoItem.querySelector('.todo-actions');
    const editFormContainer = todoItem.querySelector('.edit-form-container');

    if (editFormContainer.style.display === 'none') {
        // Switch to edit mode
        titleSpan.style.display = 'none';
        actionsDiv.style.display = 'none';
        editFormContainer.style.display = 'block';
    } else {
        // Switch to display mode
        titleSpan.style.display = 'inline';
        actionsDiv.style.display = 'flex';
        editFormContainer.style.display = 'none';
    }
}

function cancelEdit(id, button) {
    const todoItem = button.closest('.todo-item');
    const titleSpan = todoItem.querySelector('.todo-title');
    const actionsDiv = todoItem.querySelector('.todo-actions');
    const editFormContainer = todoItem.querySelector('.edit-form-container');

    // Switch back to display mode
    titleSpan.style.display = 'inline';
    actionsDiv.style.display = 'flex';
    editFormContainer.style.display = 'none';
}

// Function to filter todos based on priority
document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('priority-filter');
    const todoItems = document.querySelectorAll('.todo-item');

    filterSelect.addEventListener('change', (event) => {
        const selectedPriority = event.target.value;

        todoItems.forEach(item => {
            const itemPriority = item.getAttribute('data-priority');
            if (selectedPriority === 'All' || selectedPriority === itemPriority) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});