// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#generos').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/genero', {
    method: 'GET',
    headers: getHeaders()
  });
  const genero = await request.json();


  let listadoHtml = '';
  for (let generos of genero) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + generos.gen_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+generos.gen_id+'</td><td>' + generos.gen_nombre + '</td><td>' + botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#generos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este genero?')) {
    return;
  }

 const request = await fetch('api/genero/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}