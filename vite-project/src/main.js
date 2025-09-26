const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearList = document.getElementById("clear-completed");

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

    const actions = document.createElement("div");
    actions.className = "actions";

    const editList = document.createElement("button");
    editList.type = "button";
    editList.title = "Edit this item";
    editList.innerHTML = '<img src="pencil.jpg" alt="edit" class="icon">';
    actions.appendChild(editList);

    const delList = document.createElement("button");
    delList.type = "button";
    delList.title = "Delete this item";
    delList.innerHTML = '<img src="trash.jpg" alt="delete" class="icon">';
    actions.appendChild(delList);

    li.appendChild(actions);

    checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);
    });

    editList.addEventListener("click", () => {
        if (li.querySelector("input.editing")) return;

        const current = span.textContent;
        const editor = document.createElement("input");
        editor.type = "text";
        editor.value = current;
        editor.className = "editing";
        editor.setAttribute("aria-label", "Edit todo text");

        li.replaceChild(editor, span);
        editor.focus();
        editor.setSelectionRange(editor.value.length, editor.value.length);

        const saveNewText = () => {
            const newText = editor.value.trim();
            if (newText === "") {
                li.removeEventListener();
                return;
            }
            span.textContent = newText;
            li.replaceChild(span, editor);
        };

        const cancel = () => {
            li.replaceChild(span, editor);
        };

        editor.addEventListener("blur", saveNewText);
    });

    delList.addEventListener("click", () => {
        li.remove();
    });

    return li;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const li = createTodoItem(text);
    list.appendChild(li);
    input.value = "";
    input.focus();
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