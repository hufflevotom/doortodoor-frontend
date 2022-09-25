export const folio = {
  _id: "",
  numeroFolio: "",
  ruta: "",
  detalleCliente: {
    _id: "",
    nombre: "",
    dni: "",
    telefono: "",
    direccion: "",
  },
  detalleEntrega: {
    _id: "",
    fechaEntrega: "",
    ubicacionEntrega: {
      _id: "",
      latitud: "",
      longitud: "",
      distrito: "",
    },
    ordenEntrega: 0,
    horarioVisita: {
      _id: "",
      inicioVisita: 0,
      finVisita: 0,
    },
  },
  detallePedido: { _id: "", descripcionPedido: "" },
  localAbastecimiento: { _id: "", localAbastecimiento: "" },
  createdAt: "",
  updatedAt: "",
};

export const folios = [];
