import React, { useState, useEffect } from 'react';

import { Card, Divider, Modal, Table } from 'antd';
import moment from 'moment';

import Boton from '../../components/Boton/Boton';
import ModalVehiculo from './ModalVehiculo';

import { vehiculo } from '../../models/vehiculo';


const Vehiculos = () => {
	const confirm = Modal.confirm;
	const [verModal, setVerModal] = useState(false);
	const [datoSeleccionado, setDatoSeleccionado] = useState(vehiculo);
	const [tipo, setTipo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [paginacion, setPaginacion] = useState({
		current: 1,
		pageSize: 5,
		showSizeChanger: true,
		pageSizeOptions: [5, 10, 20],
	});

	const agregar = () => {
		setDatoSeleccionado({ ...vehiculo });
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
			title: "¿Esta seguro que desea eliminar " + record.nombre + "?",
			content: "",
			okText: "Eliminar",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				eliminar(record);
			},
			onCancel() { },
		});
	};

	const traerDatos = async (pagination) => {
		setLoading(true);
		const limit = pagination.pageSize;
		const offset = pagination.current * pagination.pageSize - pagination.pageSize;
		// const respuesta = await httpClient.get(`auth/usuarios?limit=${limit}&offset=${offset}`);
		// const data = respuesta.data.body[0].map((e, i) => ({
		// 	key: i,
		// 	apellido: e.apellido,
		// 	avatar: e.avatar,
		// 	celular: e.celular,
		// 	email: e.email,
		// 	nombre: e.nombre,
		// 	id: e.id,
		// 	role: e.role,
		// 	rolId: e.role.id
		// }));
		setLoading(false);
		// setData([...data]);
		// setPaginacion({ ...pagination, total: respuesta.data.body[1] });
	};

	const eliminarData = async (record) => {
		setLoading(true);
		// const respuesta = await httpClient.delete("auth/usuarios/" + record.id);
		// if (respuesta.data.statusCode === 200) {
		// 	traerDatos(paginacion);
		// 	openNotification("Registro Eliminado", record.nombre + " fue eliminado con exito", "");
		// 	setLoading(false);
		// } else {
		// 	openNotification("Error al Eliminar", "Por favor vuelva a intentarlo", "Alerta");
		// }
	};

	const columns = [
		{
			title: "Placa",
			dataIndex: "placa",
			key: "placa",
		},
		{
			title: "Marca",
			dataIndex: "marca",
			key: "marca",
		},
		{
			title: "Color",
			dataIndex: "color",
			key: "color",
		},
		{
			title: "SOAT",
			dataIndex: "vencimientoSoat",
			key: "vencimientoSoat",
			render: (text) => {
				return <span>{moment(text).format("DD/MM/YYYY")}</span>;
			}
		},
		{
			title: "Revisión técnica",
			dataIndex: "vencimientoRevision",
			key: "vencimientoRevision",
			render: (text) => {
				return <span>{moment(text).format("DD/MM/YYYY")}</span>;
			}
		},
		{
			title: "Estado",
			dataIndex: "estado",
			key: "estado",
		},
		{
			title: "",
			key: "action",
			width: 150,
			render: (text, record) => (
				<span>
					{/* <span className="gx-link"> <i onClick={() => console.log('ver')} className="icon icon-view-o" style={{ fontSize: 20 }} /></span>
                    <Divider type="vertical" /> */}
					<span className="gx-link">
						{" "}
						<i onClick={() => editar(record)} className="icon icon-edit" style={{ fontSize: 20, color: "green" }} />
					</span>
					<Divider type="vertical" />
					<span className="gx-link">
						{" "}
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
		traerDatos(pagination);
	};

	useEffect(() => {
		traerDatos(paginacion);
	}, []);

	return (
		<Card
			title="Lista de vehiculos"
			extra={
				<Boton
					type="primary"
					onClick={agregar}
					name="Agregar Vehiculo"
				/>
			}
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
				<ModalVehiculo
					traerDatos={traerDatos}
					verModal={verModal}
					datoSeleccionado={datoSeleccionado}
					setVerModal={setVerModal}
					tipo={tipo}
				/>
			) : null}
		</Card>
	);
};

export default Vehiculos;

