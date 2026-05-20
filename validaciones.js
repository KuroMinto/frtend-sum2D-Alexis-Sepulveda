function mostrarError(campo, mensaje) {
  campo.classList.remove('campo-ok');
  campo.classList.add('campo-error');

  let mensajeElemento = campo.parentElement.querySelector('.error-message');
  if (!mensajeElemento) {
    mensajeElemento = document.createElement('span');
    mensajeElemento.className = 'error-message';
    campo.parentElement.appendChild(mensajeElemento);
  }
  mensajeElemento.textContent = mensaje;
}

function mostrarOk(campo) {
  campo.classList.remove('campo-error');
  campo.classList.add('campo-ok');
  const mensajeElemento = campo.parentElement.querySelector('.error-message');
  if (mensajeElemento) {
    mensajeElemento.remove();
  }
}

function limpiarEstado(campo) {
  campo.classList.remove('campo-error', 'campo-ok');
  const mensajeElemento = campo.parentElement.querySelector('.error-message');
  if (mensajeElemento) {
    mensajeElemento.remove();
  }
}

function validarTextoNombre(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{5,80}$/.test(valor.trim());
}

function validarDni(valor) {
  return /^\d{7,8}$/.test(valor.trim());
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function validarTelefono(valor) {
  const texto = valor.trim();
  const permitido = /^[0-9+\s-]+$/.test(texto);
  const digitos = texto.replace(/\D/g, '').length;
  return permitido && digitos >= 8;
}

function validarCuit(valor) {
  const texto = valor.trim();
  return /^\d{2}-\d{8}-\d$/.test(texto) || /^\d{11}$/.test(texto);
}

function generarNumeroOrden() {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return `TFX-${numero}`;
}

function mostrarConfirmacion(formulario) {
  const main = document.querySelector('main.form-container');
  main.innerHTML = `
    <div class="container">
      <div class="confirmation-screen">
        <h2>Ingreso registrado con éxito</h2>
        <p>Su equipo fue registrado correctamente. Nos comunicaremos pronto.</p>
        <div class="order-number">Orden #${generarNumeroOrden()}</div>
        <p>Guarde este número para cualquier consulta futura.</p>
      </div>
    </div>
  `;
}

function validarSeccionA() {
  let valido = true;

  const nombre = document.getElementById('nombre');
  const dni = document.getElementById('dni');
  const email = document.getElementById('email');
  const emailConfirm = document.getElementById('email-confirm');
  const telefono = document.getElementById('telefono');
  const tipoCliente = document.querySelector('input[name="tipo-cliente"]:checked');
  const empresaNombre = document.getElementById('nombre-empresa');
  const cuit = document.getElementById('cuit');
  const provincia = document.getElementById('provincia');
  const localidad = document.getElementById('localidad');

  if (!validarTextoNombre(nombre.value)) {
    mostrarError(nombre, 'Ingrese un nombre válido (solo letras y espacios, 5-80 caracteres).');
    valido = false;
  } else {
    mostrarOk(nombre);
  }

  if (!validarDni(dni.value)) {
    mostrarError(dni, 'DNI inválido. Debe tener 7 u 8 dígitos numéricos.');
    valido = false;
  } else {
    mostrarOk(dni);
  }

  if (!validarEmail(email.value)) {
    mostrarError(email, 'Ingrese un correo electrónico válido.');
    valido = false;
  } else {
    mostrarOk(email);
  }

  if (emailConfirm.value.trim() !== email.value.trim() || !validarEmail(emailConfirm.value)) {
    mostrarError(emailConfirm, 'El correo debe coincidir con el anterior.');
    valido = false;
  } else {
    mostrarOk(emailConfirm);
  }

  if (!validarTelefono(telefono.value)) {
    mostrarError(telefono, 'Ingrese un teléfono válido (mínimo 8 dígitos numéricos, puede incluir +, espacios y guiones).');
    valido = false;
  } else {
    mostrarOk(telefono);
  }

  if (!tipoCliente) {
    const legend = document.querySelector('fieldset legend');
    if (legend) legend.scrollIntoView({ behavior: 'smooth' });
    valido = false;
  }

  if (tipoCliente && tipoCliente.value === 'empresa') {
    if (!empresaNombre.value.trim()) {
      mostrarError(empresaNombre, 'Ingrese el nombre de la empresa.');
      valido = false;
    } else {
      mostrarOk(empresaNombre);
    }

    if (!validarCuit(cuit.value)) {
      mostrarError(cuit, 'CUIT inválido. Use ##-########-# o 11 dígitos seguidos.');
      valido = false;
    } else {
      mostrarOk(cuit);
    }
  } else {
    limpiarEstado(empresaNombre);
    limpiarEstado(cuit);
  }

  if (!provincia.value) {
    mostrarError(provincia, 'Seleccione una provincia.');
    valido = false;
  } else {
    mostrarOk(provincia);
  }

  if (localidad.value.trim().length < 2) {
    mostrarError(localidad, 'Localidad obligatoria. Mínimo 2 caracteres.');
    valido = false;
  } else {
    mostrarOk(localidad);
  }

  return valido;
}

function validarSeccionB() {
  let valido = true;

  const tipoDispositivo = document.getElementById('tipo-dispositivo');
  const otroDispositivo = document.getElementById('otro-dispositivo');
  const marca = document.getElementById('marca');
  const otraMarca = document.getElementById('otra-marca');
  const modelo = document.getElementById('modelo');
  const sistemaOperativo = document.getElementById('sistema-operativo');
  const garantia = document.getElementById('tiene-garantia');
  const ordenCompra = document.getElementById('orden-compra');

  if (!tipoDispositivo.value) {
    mostrarError(tipoDispositivo, 'Seleccione un tipo de dispositivo.');
    valido = false;
  } else {
    mostrarOk(tipoDispositivo);
  }

  if (tipoDispositivo.value === 'otro') {
    if (!otroDispositivo.value.trim()) {
      mostrarError(otroDispositivo, 'Especifique el dispositivo.');
      valido = false;
    } else {
      mostrarOk(otroDispositivo);
    }
  } else {
    limpiarEstado(otroDispositivo);
  }

  if (!marca.value) {
    mostrarError(marca, 'Seleccione una marca.');
    valido = false;
  } else {
    mostrarOk(marca);
  }

  if (marca.value === 'otra') {
    if (!otraMarca.value.trim()) {
      mostrarError(otraMarca, 'Especifique la marca.');
      valido = false;
    } else {
      mostrarOk(otraMarca);
    }
  } else {
    limpiarEstado(otraMarca);
  }

  if (modelo.value.trim().length < 2) {
    mostrarError(modelo, 'Ingrese un modelo válido. Mínimo 2 caracteres.');
    valido = false;
  } else {
    mostrarOk(modelo);
  }

  if (!sistemaOperativo.value) {
    mostrarError(sistemaOperativo, 'Seleccione un sistema operativo.');
    valido = false;
  } else {
    mostrarOk(sistemaOperativo);
  }

  if (garantia.checked) {
    if (!ordenCompra.value.trim()) {
      mostrarError(ordenCompra, 'Debe ingresar el número de orden o fecha de compra.');
      valido = false;
    } else {
      mostrarOk(ordenCompra);
    }
  } else {
    limpiarEstado(ordenCompra);
  }

  return valido;
}

function validarCampoAlIngresar(campo, validador) {
  campo.addEventListener('input', function() {
    if (!this.value.trim()) {
      limpiarEstado(this);
      return;
    }

    if (validador(this.value)) {
      mostrarOk(this);
    } else {
      mostrarError(this, this.dataset.error || 'Valor inválido.');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formularioIngreso');

  validarCampoAlIngresar(document.getElementById('nombre'), validarTextoNombre);
  validarCampoAlIngresar(document.getElementById('dni'), validarDni);
  validarCampoAlIngresar(document.getElementById('email'), validarEmail);
  validarCampoAlIngresar(document.getElementById('email-confirm'), function(valor) {
    return valor.trim() === document.getElementById('email').value.trim() && validarEmail(valor);
  });
  validarCampoAlIngresar(document.getElementById('telefono'), validarTelefono);
  validarCampoAlIngresar(document.getElementById('localidad'), function(valor) {
    return valor.trim().length >= 2;
  });
  validarCampoAlIngresar(document.getElementById('otro-dispositivo'), function(valor) {
    return valor.trim().length > 0;
  });
  validarCampoAlIngresar(document.getElementById('otra-marca'), function(valor) {
    return valor.trim().length > 0;
  });
  validarCampoAlIngresar(document.getElementById('modelo'), function(valor) {
    return valor.trim().length >= 2;
  });
  validarCampoAlIngresar(document.getElementById('orden-compra'), function(valor) {
    return valor.trim().length > 0;
  });

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const validoA = validarSeccionA();
    const validoB = validarSeccionB();

    if (validoA && validoB) {
      mostrarConfirmacion(formulario);
    } else {
      const primerError = document.querySelector('.campo-error');
      if (primerError) {
        primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
});
