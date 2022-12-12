import { useEffect, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import { Card, Col, Row } from "antd";
import moment from "moment/moment";
//* Styles
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";
//* Firebase
import FirebaseConfig from "../../firebase";
//* Components
import Pin from "./pin.marker";
//* Services
import { foliosService, responsablesService } from "../../services";

const Monitoreo = () => {
  const [folios, setFolios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [actualCard, setActualCard] = useState();
  const [database, setDatabase] = useState();
  const [viewport, setViewport] = useState({
    longitude: -76.983,
    latitude: -12.085,
    zoom: 11.5,
  });

  const showCard = async (responsable) => {
    const folio = folios.find((f) => f._id === responsable.folio);
    const responseResponsable = await responsablesService.getOne(
      responsable.id
    );
    if (responseResponsable.data.statusCode === 200) {
      const responsable = responseResponsable.data.body;
      setActualCard({ folio: folio, responsable: responsable });
    }
  };

  const isValidDate = (date) => {
    if (!date) return false;

    const fecha = moment(date);
    const fechaActual = moment().zone("-05:00");
    if (fecha.format("YYYY-MM-DD") !== fechaActual.format("YYYY-MM-DD")) {
      return false;
    }

    const hora = fecha.format("HH");
    const horaActual = fechaActual.format("HH");
    if (hora < horaActual - 1 || hora > horaActual) {
      return false;
    }

    const minuto = fecha.format("mm");
    const minutoActual = fechaActual.format("mm");
    if (minuto < minutoActual - 5 || minuto > minutoActual) {
      return false;
    }

    return true;
  };

  const searchFolios = async (arrayFolios) => {
    const response = await foliosService.getMany({ ids: arrayFolios });
    if (response.data.statusCode === 200) return response.data.body;
    return [];
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 11,
      });
    });
  }, []);

  useEffect(() => {
    if (!database) {
      setDatabase(FirebaseConfig().ref("responsables"));
    } else {
      database.on("value", async (snapshot) => {
        const data = snapshot.val();
        const arrayVehiculos = [];
        const arrayFolios = [];
        for (let id in data) {
          if (isValidDate(data[id].date)) {
            arrayVehiculos.push({ id, ...data[id], key: id });
            arrayFolios.push(data[id].folio);
          } else {
            database.child(id).remove();
          }
        }

        setVehiculos(arrayVehiculos);
        const resp = await searchFolios(arrayFolios);
        setFolios(resp);
      });
    }
  }, [viewport]);

  useEffect(() => {
    if (actualCard && actualCard.responsable) {
      const responsable = vehiculos.find(
        (v) => v.id === actualCard.responsable._id
      );
      if (!responsable) {
        setActualCard();
      }
    }
  }, [vehiculos]);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: "500px", width: "100%", margin: 0 }}
        onClick={() => setActualCard()}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {folios.map((f) => (
          <Pin
            longitude={f.idDetalleEntrega.idUbicacionEntrega.longitud}
            latitude={f.idDetalleEntrega.idUbicacionEntrega.latitud}
            type="Folio"
            state={
              actualCard && actualCard.folio._id === f._id
                ? "Activo"
                : f.idEstado.descripcion
            }
          />
        ))}
        {vehiculos.map((v) => (
          <Pin
            longitude={v.lng}
            latitude={v.lat}
            onClick={() => showCard(v)}
            state={
              actualCard && actualCard.responsable._id === v.id
                ? "Activo"
                : "En camino"
            }
          />
        ))}
      </Map>
      <Card style={{ marginTop: "-30px", zIndex: "100" }}>
        {actualCard ? (
          <Row>
            <Col xs={7}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Folio</h5>
                <span>Número: {actualCard.folio.numeroFolio}</span>
                <span>Estado: {actualCard.folio.idEstado.descripcion}</span>
                <span>
                  Orden de entrega:{" "}
                  {actualCard.folio.idDetalleEntrega.ordenEntrega}
                </span>
                <span>
                  Horario de visita:{" "}
                  {`${
                    actualCard.folio.idDetalleEntrega.idHorarioVisita.inicioVisita.toString()
                      .length === 3
                      ? `0${actualCard.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                          .toString()
                          .substring(
                            0,
                            1
                          )}:${actualCard.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                          .toString()
                          .substring(1, 3)}`
                      : `${actualCard.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                          .toString()
                          .substring(
                            0,
                            2
                          )}:${actualCard.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                          .toString()
                          .substring(2, 4)}`
                  } ${
                    actualCard.folio.idDetalleEntrega.idHorarioVisita
                      .inicioVisita > 1200
                      ? "PM"
                      : "AM"
                  } - ${
                    actualCard.folio.idDetalleEntrega.idHorarioVisita.finVisita.toString()
                      .length === 3
                      ? `0${actualCard.folio.idDetalleEntrega.idHorarioVisita.finVisita
                          .toString()
                          .substring(
                            0,
                            1
                          )}:${actualCard.folio.idDetalleEntrega.idHorarioVisita.finVisita
                          .toString()
                          .substring(1, 3)}`
                      : `${actualCard.folio.idDetalleEntrega.idHorarioVisita.finVisita
                          .toString()
                          .substring(
                            0,
                            2
                          )}:${actualCard.folio.idDetalleEntrega.idHorarioVisita.finVisita
                          .toString()
                          .substring(2, 4)}`
                  } ${
                    actualCard.folio.idDetalleEntrega.idHorarioVisita
                      .finVisita > 1200
                      ? "PM"
                      : "AM"
                  }`}
                </span>
                <span>
                  Detalle: {actualCard.folio.idDetallePedido.descripcionPedido}
                </span>
              </div>
            </Col>
            <Col xs={7}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Cliente</h5>
                <span>Documento: {actualCard.folio.idDetalleCliente.dni}</span>
                <span>Nombre: {actualCard.folio.idDetalleCliente.nombre}</span>
                <span>
                  Teléfonos: {actualCard.folio.idDetalleCliente.telefono}
                </span>
                <span>
                  Dirección: {actualCard.folio.idDetalleCliente.direccion}
                </span>
                <span>
                  Distrito:{" "}
                  {
                    actualCard.folio.idDetalleEntrega.idUbicacionEntrega
                      .distrito
                  }
                </span>
              </div>
            </Col>
            <Col xs={5}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Vehículo</h5>
                <span>Placa: {actualCard.responsable.idVehiculo.placa}</span>
                <span>Marca: {actualCard.responsable.idVehiculo.marca}</span>
                <span>Modelo: {actualCard.responsable.idVehiculo.modelo}</span>
                <span>Color: {actualCard.responsable.idVehiculo.color}</span>
              </div>
            </Col>
            <Col xs={5}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Responsable</h5>
                <span>
                  Documento: {actualCard.responsable.idUsuario.documento}
                </span>
                <span>Nombre: {actualCard.responsable.idUsuario.nombre}</span>
                <span>
                  Apellidos: {actualCard.responsable.idUsuario.apellidos}
                </span>
                <span>Celular: {actualCard.responsable.idUsuario.celular}</span>
                <span>Ruta: {actualCard.responsable.ruta}</span>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={24}>
              <h5 style={{ margin: 0 }}>
                Seleccione un vehículo para ver el detalle de entrega
              </h5>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};

export default Monitoreo;
