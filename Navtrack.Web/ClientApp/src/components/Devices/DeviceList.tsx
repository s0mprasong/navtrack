import React, { useMemo, useState, useEffect, useCallback } from "react";
import ReactTable from "../Table/ReactTable"
import { useHistory } from "react-router";
import { DeviceModel } from "../../services/Api/Model/DeviceModel";
import { DeviceApi } from "../../services/Api/DeviceApi";
import { Link } from "react-router-dom";
import AdminLayout from "../Layouts/Admin/AdminLayout";
import DeleteModal from "../Common/DeleteModal";
import { addNotification } from "../Notifications";
import { ApiError } from "../../services/HttpClient/HttpClient";

export default function DeviceList() {
    const [devices, setDevices] = useState<DeviceModel[]>([]);
    const history = useHistory();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteHandler, setHandleDelete] = useState(() => () => { });

    useEffect(() => {
        DeviceApi.getAll().then(x => setDevices(x));
    }, []);

    const handleDeleteClick = useCallback((id: number) => {
        setShowDeleteModal(true);
        setHandleDelete(() => () => deleteDevice(id, devices));
    }, [devices]);

    const deleteDevice = (id: number, devices: DeviceModel[]) => {
        DeviceApi.delete(id)
            .then(() => {
                addNotification("Device deleted successfully.");
                setDevices(devices.filter(x => x.id !== id));
                
            })
            .catch((error: ApiError) => {
                addNotification(error.message);
            });
    }

    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Type",
            accessor: "type"
        },
        {
            Header: "IMEI",
            accessor: "imei"
        },
        {
            Header: "Actions",
            accessor: "id",
            Cell: (cell: any) =>
                <div>
                    <Link to={"/devices/" + cell.cell.value} className="mx-2"><i className="fas fa-edit" /></Link>
                    <span className="btn-link" onClick={() => handleDeleteClick(cell.cell.value)}><i className="fas fa-trash" /></span>
                </div>,
            disableSortBy: true
        }
    ], [handleDeleteClick]);

    return (
        <AdminLayout>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} deleteHandler={deleteHandler} />
            <div className="card shadow">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Devices</h3>
                        </div>
                        <div className="col text-right">
                            <button className="btn btn-sm btn-primary" onClick={() => history.push("/devices/add")}>Add device</button>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <ReactTable columns={columns} data={devices} />
                </div>
            </div>
        </AdminLayout>
    );
}