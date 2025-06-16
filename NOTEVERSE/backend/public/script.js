let token = "";

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    token = data.token;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('notesApp').style.display = 'block';
    fetchNotes();
  });
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');
  errorMsg.textContent = ''; // Clear previous error

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) {
      errorMsg.textContent = data.error || 'Login failed';
            showToast('Invalid credentials!', 'error'); 
      return;
    }

    token = data.token;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('notesApp').style.display = 'block';

        document.getElementById('welcomeMsg').textContent = `Welcome back, ${username}!`;

    fetchNotes();
    showToast('Logged in successfully!', 'success'); // ✅ Success toast

  });
}


function fetchNotes() {
  fetch('/notes', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(notes => {
    const container = document.getElementById('notes');
    container.innerHTML = '';
    notes.forEach(note => {
      const div = document.createElement('div');
      div.className = 'note';
      div.innerHTML = `
        <div>${marked.parse(note.content)}</div>
        <small>${new Date(note.created_at).toLocaleString()}</small><br>
        <button onclick="editNote(${note.id}, \`${note.content.replace(/`/g, '\`')}\`)">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      `;
      container.appendChild(div);
    });
  });
}

function addNote() {
  const content = document.getElementById('noteInput').value;
  fetch('/notes', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ content })
  }).then(fetchNotes);
}

function deleteNote(id) {
  fetch(`/notes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  }).then(fetchNotes);
}

function editNote(id, oldContent) {
  const newContent = prompt("Edit note:", oldContent);
  if (newContent) {
    fetch(`/notes/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ content: newContent })
    }).then(fetchNotes);
  }
}
function logout() {
  token = null;
  document.getElementById('notesApp').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('loginError').textContent = '';
}
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  const container = document.getElementById('toastContainer');
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // disappears after 3 seconds
}
