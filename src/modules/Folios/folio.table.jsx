import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Divider, Input, Modal, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import Boton from "../../components/Boton/Boton";
import { openNotification } from "../../util/utils";

import { folio } from "../../models/folio";
import { foliosService } from "../../services";

import ModalFolios from "./folio.modal";
import InfoFolio from "./folio.drawer";

const Folios = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const confirm = Modal.confirm;
  const [verDetalle, setVerDetalle] = useState(false);
  const [verModal, setVerModal] = useState(false);
  const [datoSeleccionado, setDatoSeleccionado] = useState(folio);
  const [tipo, setTipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [paginacion, setPaginacion] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20],
  });

  const showInfo = (dato) => {
    setDatoSeleccionado(dato);
    setVerDetalle(true);
  };

  const agregar = () => {
    setDatoSeleccionado({ ...folio });
    setTipo("agregar");
    setVerModal(true);
  };

  const editar = (record) => {
    setDatoSeleccionado(record);
    setTipo("editar");
    setVerModal(true);
  };

  const eliminar = (record) => {
    eliminarData(record);
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "¿Esta seguro que desea eliminar " + record.numeroFolio + "?",
      content: "",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        eliminar(record);
      },
      onCancel() {},
    });
  };

  const traerDatos = async (pagination, searchCriteria, searchText) => {
    setLoading(true);
    const limit = pagination.pageSize;
    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const respuesta = await foliosService.getAll(
      limit,
      offset,
      searchText,
      searchCriteria
    );
    const data = respuesta.data.body.map((e, i) => ({
      ...e,
      key: i,
      idDetalleEntrega: {
        ...e.idDetalleEntrega,
        fechaEntrega: moment(e.idDetalleEntrega.fechaEntrega).utc(0),
        idHorarioVisita: {
          ...e.idDetalleEntrega.idHorarioVisita,
          inicioVisita: moment()
            .hour(
              e.idDetalleEntrega.idHorarioVisita.inicioVisita
                .toString()
                .substring(0, 2)
            )
            .minute(
              e.idDetalleEntrega.idHorarioVisita.inicioVisita
                .toString()
                .substring(2, 4)
            ),
          finVisita: moment()
            .hour(
              e.idDetalleEntrega.idHorarioVisita.finVisita
                .toString()
                .substring(0, 2)
            )
            .minute(
              e.idDetalleEntrega.idHorarioVisita.finVisita
                .toString()
                .substring(2, 4)
            ),
        },
      },
    }));
    setLoading(false);
    setData([...data]);
    setPaginacion({ ...pagination, total: respuesta.data.total });
  };

  const eliminarData = async (record) => {
    setLoading(true);
    const respuesta = await foliosService.delete(record._id);
    if (respuesta.data.statusCode === 200) {
      traerDatos(paginacion);
      openNotification(
        "Registro Eliminado",
        record.numeroFolio + " fue eliminado con exito",
        ""
      );
      setLoading(false);
    } else {
      openNotification(
        "Error al Eliminar",
        "Por favor vuelva a intentarlo",
        "Alerta"
      );
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
    handleReset(clearFilters);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex.toUpperCase()}`}
          value={dataIndex === searchedColumn ? searchText : selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex, clearFilters)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex, clearFilters)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) handleReset(clearFilters);
              close();
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: dataIndex === searchedColumn ? "#1890ff" : undefined,
        }}
      />
    ),
  });

  const columns = [
    {
      title: "#Folio",
      dataIndex: "numeroFolio",
      key: "numeroFolio",
      ...getColumnSearchProps("numeroFolio"),
    },
    {
      title: "DNI",
      dataIndex: ["idDetalleCliente", "dni"],
      key: "dni",
      ...getColumnSearchProps("dni"),
    },
    {
      title: "Teléfono",
      dataIndex: ["idDetalleCliente", "telefono"],
      key: "telefono",
      ...getColumnSearchProps("telefono"),
    },
    {
      title: "Dirección",
      dataIndex: ["idDetalleCliente", "direccion"],
      key: "direccion",
    },
    {
      title: "Entrega",
      dataIndex: ["idDetalleEntrega", "fechaEntrega"],
      key: "fechaEntrega",
      render: (text) => {
        return <span>{text ? text.format("DD/MM/YYYY") : "Sin fecha"}</span>;
      },
      ...getColumnSearchProps("fechaEntrega"),
    },
    {
      title: "Pedido",
      dataIndex: ["idDetallePedido", "descripcionPedido"],
      key: "descripcionPedido",
    },
    {
      title: "",
      key: "action",
      width: 150,
      render: (text, record) => (
        <span>
          <span className="gx-link">
            <i
              onClick={() => showInfo(record)}
              className="icon icon-view-o"
              style={{ fontSize: 20 }}
            />
          </span>
          <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => editar(record)}
              className="icon icon-edit"
              style={{ fontSize: 20, color: "green" }}
            />
          </span>
          <Divider type="vertical" />
          <span className="gx-link">
            <i
              onClick={() => showDeleteConfirm(record)}
              className="icon icon-trash"
              style={{ fontSize: 20, color: "red" }}
            />
          </span>
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPaginacion(pagination);
    traerDatos(pagination, searchedColumn, searchText);
  };

  useEffect(() => {
    traerDatos(paginacion, searchedColumn, searchText);
  }, []);

  useEffect(() => {
    traerDatos(paginacion, searchedColumn, searchText);
  }, [searchText, searchedColumn]);

  return (
    <Card
      title="Lista de folios"
      extra={<Boton type="primary" onClick={agregar} name="Agregar Folio" />}
    >
      <Table
        style={{ width: "100%", textAlign: "center" }}
        className="gx-table-responsive"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={paginacion}
        onChange={handleTableChange}
      />
      {verModal ? (
        <ModalFolios
          traerDatos={traerDatos}
          verModal={verModal}
          datoSeleccionado={datoSeleccionado}
          setVerModal={setVerModal}
          tipo={tipo}
        />
      ) : null}
      {verDetalle ? (
        <InfoFolio
          show={verDetalle}
          setShow={setVerDetalle}
          data={datoSeleccionado}
        />
      ) : null}
    </Card>
  );
};

export default Folios;
