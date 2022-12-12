import { useEffect, useState } from "react";
import { DatePicker, Form, Select } from "antd";
import "moment/locale/es-mx";
import locale from "antd/es/date-picker/locale/es_ES";
import moment from "moment";
//* Components
import Boton from "../../components/Boton/Boton";
//* Utils
import { format } from "../../util/utils";
//* Services
import { foliosService, responsablesService } from "../../services";

function Busqueda({ setEvidencia }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fechaReparto, setFechaReparto] = useState();
  const [responsable, setResponsable] = useState();
  const [folio, setFolio] = useState();
  const [responsables, setResponsables] = useState([]);
  const [folios, setFolios] = useState([]);

  const searchResponsable = async (searchText) => {
    const responsablesArr = [];
    try {
      const respuesta = await responsablesService.getAllByDate(
        10,
        0,
        fechaReparto.toISOString(),
        searchText
      );
      if (respuesta.data.statusCode === 200) {
        respuesta.data.body.forEach((item) => {
          responsablesArr.push({
            ...item,
            key: item._id,
            value: item._id,
            label: `${item.idUsuario.nombre} ${item.idUsuario.apellidos}`,
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
    setResponsables(responsablesArr);
  };

  const searchFolio = async (searchText) => {
    const foliosArr = [];
    try {
      const respuesta = await foliosService.getAllByDate(
        10,
        0,
        searchText,
        fechaReparto.toISOString()
      );
      if (respuesta.data.statusCode === 200) {
        respuesta.data.body.forEach((item) => {
          foliosArr.push({
            ...item,
            key: item._id,
            value: item._id,
            label: `${item.numeroFolio} - ${item.idDetalleCliente.dni}`,
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
    setFolios(foliosArr);
  };

  useEffect(() => {
    if (fechaReparto) {
      searchResponsable("");
    }
  }, [fechaReparto]);

  useEffect(() => {
    if (responsable) {
      searchFolio("");
    }
  }, [responsable]);

  return (
    <Form layout="inline" form={form} style={{ width: "100%" }} {...format}>
      <div style={{ width: "100%", padding: "5px 20px" }}>
        <h3 style={{ marginBottom: "20px" }}>Busqueda de evidencias</h3>
      </div>
      <Form.Item
        label="1. Fecha de entrega"
        name="fechaReparto"
        style={{ width: "100%" }}
      >
        <DatePicker
          placeholder="Ingrese la fecha"
          style={{ width: "100%" }}
          locale={locale}
          format="DD/MM/YYYY"
          value={fechaReparto}
          onChange={(e) => setFechaReparto(e)}
        />
      </Form.Item>
      <Form.Item
        label="2. Nombre del responsable"
        name="responsable"
        style={{ width: "100%" }}
      >
        <Select
          showSearch
          placeholder="Seleccione el responsable"
          optionFilterProp="children"
          onSearch={searchResponsable}
          disabled={fechaReparto ? false : true}
          onSelect={(e) => {
            setResponsable(e);
          }}
        >
          {responsables.map((rol) => (
            <Select.Option key={rol.key} value={rol.value}>
              {rol.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="3. Numero de folio"
        name="folios"
        style={{ width: "100%" }}
      >
        <Select
          showSearch
          placeholder="Seleccione el folio"
          optionFilterProp="children"
          onSearch={searchFolio}
          disabled={form.getFieldValue("responsable") ? false : true}
          onSelect={(e) => {
            setFolio(e);
          }}
        >
          {folios.map((rol) => (
            <Select.Option key={rol.key} value={rol.value}>
              {rol.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <Boton
          name="Visualizar detalle"
          disabled={folio ? false : true}
          loader={loading}
          onClick={() => {
            const findResponsable = responsables.find(
              (item) => item._id === responsable
            );
            const findFolio = folios.find((item) => item._id === folio);
            setEvidencia({ responsable: findResponsable, folio: findFolio });
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default Busqueda;
