// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#sexos').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/sexo', {
    method: 'GET',
    headers: getHeaders()
  });
  const sexo = await request.json();


  let listadoHtml = '';
  for (let sexos of sexo) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + sexos.sex_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+sexos.sex_id+'</td><td>' + sexos.sex_nombre + '</td><td>' + botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#sexos tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este sexo?')) {
    return;
  }

 const request = await fetch('api/sexo/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}