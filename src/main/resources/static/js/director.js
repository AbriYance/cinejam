// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#directores').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/director', {
    method: 'GET',
    headers: getHeaders()
  });
  const director = await request.json();


  let listadoHtml = '';
  for (let directores of director) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + directores.dir_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+directores.dir_id+'</td><td>' + directores.dir_nombre + '</td><td>' + botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#directores tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este director?')) {
    return;
  }

 const request = await fetch('api/director/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}