// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#alquileres').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function cargarUsuarios() {
  const request = await fetch('api/alquiler', {
    method: 'GET',
    headers: getHeaders()
  });
  const alquiler = await request.json();


  let listadoHtml = '';
  for (let alquileres of alquiler) {
    let botonGuardar = '<a href="#" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>';
    let botonEditar = '<a href="#" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + alquileres.alq_id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = '<tr><td>'+alquileres.alq_id+'</td><td>' + alquileres.soc_id + '</td><td>' + alquileres.pel_id +
    '</td><td>' + alquileres.alq_fecha_desde + '</td><td>' + alquileres.alq_fecha_hasta + '</td><td>' + alquileres.alq_valor+ '</td><td>' + alquileres.alq_fecha_entrega +'</td><td>' + botonGuardar + '    ' + botonEditar + '    ' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }

document.querySelector('#alquileres tbody').outerHTML = listadoHtml;

}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': localStorage.token
   };
}

async function eliminarUsuario(id) {

  if (!confirm('¿Desea eliminar este alquiler?')) {
    return;
  }

 const request = await fetch('api/alquiler/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload()
}