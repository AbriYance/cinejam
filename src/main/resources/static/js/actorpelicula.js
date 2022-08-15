// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#actorespeliculas').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/actorpelicula', {
    method: 'GET',
    headers: getHeaders()
  });
  const actorpelicula = await request.json();


  let listadoHtml = '';
  for (let actorespeliculas of actorpelicula) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + actorespeliculas.apl_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+actorespeliculas.apl_id+'</td><td>' + actorespeliculas.act_id + '</td><td>' + actorespeliculas.pel_id + '</td><td>' + actorespeliculas.apl_papel + '</td><td>'+ botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#actorespeliculas tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este actorpelicula?')) {
    return;
  }

 const request = await fetch('api/actorpelicula/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}