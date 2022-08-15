// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#peliculas').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/pelicula', {
    method: 'GET',
    headers: getHeaders()
  });
  const pelicula = await request.json();


  let listadoHtml = '';
  for (let peliculas of pelicula) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + peliculas.pel_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+peliculas.pel_id+'</td><td>' +
                        peliculas.gen_id + '</td><td>' +
                        peliculas.dir_id + '</td><td>' +
                        peliculas.for_id + '</td><td>' +
                        peliculas.pel_nombre + '</td><td>' +
                        peliculas.pel_costo + '</td><td>' +
                        peliculas.pel_fecha_estreno + '</td><td>' +
                        botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#peliculas tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este pelicula?')) {
    return;
  }

 const request = await fetch('api/pelicula/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}