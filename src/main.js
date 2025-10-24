const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearList = document.getElementById("clear-completed");

function createActions() {
    const actions = document.createElement("div");
        actions.className = "actions";

    const editList = document.createElement("button");
        editList.type = "button";
        editList.title = "Edit this item";
        const editIcon = document.createElement("img");
            editIcon.src = "pencil.jpg"
            editIcon.alt = "edit"
            editIcon.className = "icon"
        editList.appendChild(editIcon);
    actions.appendChild(editList);

    const delList = document.createElement("button");
        delList.type = "button";
        delList.title = "Delete this item";
        const delIcon = document.createElement("img");
            delIcon.src = "trash.jpg"
            delIcon.alt = "delete"
            delIcon.className = "icon"
        delList.appendChild(delIcon);
    actions.appendChild(delList);

    return {actions, editList, delList};
}

function createEditInput (currentText) {
    const editor = document.createElement("input");
        editor.type = "text";
        editor.value = currentText;
        editor.className = "editing";
        editor.setAttribute("aria-label", "Edit todo text");
    return editor;
}

function createTodoItem(text) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "toggle";
        checkbox.setAttribute("aria-label", "Complete");
    li.appendChild(checkbox);

    const span = document.createElement("span");
        span.textContent = text;
        span.title = "Click pencil to edit";
    li.appendChild(span);

    const {actions, editList, delList} = createActions();
    li.appendChild(actions);

    checkbox.addEventListener("click", () => {
        li.classList.toggle("done", checkbox.checked);
    });

    editList.addEventListener("click", () => {
        if (li.querySelector("input.editing")) {
            return;
        } else {
            const currentText = span.textContent;
            const editor = createEditInput(currentText);

            li.replaceChild(editor, span);
                editor.focus();
                editor.setSelectionRange(editor.value.length, editor.value.length);

            const saveNewText = () => {
                const newText = editor.value.trim();
                if (newText === "") {
                    li.remove();
                    return;
                } else {
                span.textContent = newText;
                li.replaceChild(span, editor);
                }
            };
            editor.addEventListener("blur", saveNewText);
        }
    });

    delList.addEventListener("click", () => {
        li.remove();
    });

    return li;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") {
        return;
    } else {
        const li = createTodoItem(text);
        list.appendChild(li);
        input.value = "";
        input.focus();
    }
});

clearList.addEventListener("click", () => {
    const items = Array.from(list.querySelectorAll("li"));
    for (const li of items) {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            li.remove();
        }
    }
});