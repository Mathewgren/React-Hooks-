import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../../Service/MockAPI/MockAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { getUsers, deleteData } from "../../../../../Service/MockAPI/MockAPI";
import "./StateTable.css";
export default function Table() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    name: { value: null },
    email: { value: null },
    password: { value: null },
    confirmPassword: { value: null },
    phoneNumber: { value: null },
    gender: { value: null },
    language: { value: null },
    dob: { value: null },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [rowDeleted, setRowDeleted] = useState(false);
  const newuser = useNavigate();
  const tableDetails = useNavigate();
  const dt = useRef(null);

  const openNew = async () => {
    newuser("/form");
  };
  // Fetchdata

  const fetchTableData = async () => {
    try {
      // const response = await axios.get(API_URL);
      const response = await getUsers();

      console.log("API Response Status Code:", response.status);
      console.log("API Data:", response.data);
      setData(response.data);
      setLoading(false);
      // toast.success(" fetching table data:");
    } catch (error) {
      console.error("Error fetching table data:", error);
      setData([]);
      toast.error("Error fetching table data:", error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  const handleEdit = (id) => {
    // const editedData = data.find((rowData) => rowData.id === id);
    tableDetails(`/form/${id}`);
    // tableDetails(`/form/${id}`, { state: { editedData } });
  };

  const onGlobalFilterChange = (e) => {
    // setGlobalFilter(e.target.value);
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: { value },
    }));
    setGlobalFilter(value);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteSelectedProducts = async () => {
    const deletedIds = [];
    for (const selectedRow of selectedRows) {
      try {
        // const response = await axios.delete(API_URL + "/" + selectedRow.id);
        const response = await deleteData(selectedRow.id);
        console.log("Record deleted successfully:", response.data);
        deletedIds.push(selectedRow.id);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }

    const updatedData = data.filter(
      (rowData) => !deletedIds.includes(rowData.id)
    );
    setData(updatedData);
    toast.success("Deleted successfully!");
    setDeleteProductsDialog(false);
    setSelectedRows([]);
  };

  const deleteProductsDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductsDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={deleteSelectedProducts}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = async () => {
    try {
      const response = await deleteData(product.id);
      console.log("Record deleted successfully:", response.data);

      const updatedData = data.filter((val) => val.id !== product.id);
      setData(updatedData);
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row.id !== product.id)
      );

      setDeleteProductDialog(false);

      setRowDeleted(true);

      toast.success("Worker Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error deleting worker. Please try again later.");
    }
  };

  const handleRowSelect = (e) => {
    setSelectedRows(e.value);
    // setSelectedRows([]);
    setRowDeleted(false);
  };

  const deleteProductDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={() => deleteProduct(product.id)}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const clearSorting = () => {
    dt.current.reset();
  };

  const clearFilter = () => {
    initFilters();
    clearSorting();
    setGlobalFilter("");
  };

  const initFilters = () => {
    setFilters({
      name: {
        value: null,
      },
      email: {
        value: null,
      },
      password: {
        value: null,
      },
      confirmPassword: {
        value: null,
      },
      phoneNumber: {
        value: null,
      },
      gender: {
        value: null,
      },
      language: {
        value: null,
      },
      dob: {
        value: null,
        matchMode: FilterMatchMode.DATE_IS,
      },
    });
    setGlobalFilter("");
  };

  const header = () => {
    return (
      <div className="d-flex p-toolbar">
        <div>
          <h3 className="">Manage Workers</h3>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="me-2"
            outlined
            onClick={clearFilter}
          />
          <div className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => handleEdit(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="ms-2"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  // excel
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Workers");
    worksheet.columns = [
      { header: "Name", key: "name", width: 15 },
      { header: "Email", key: "email", width: 20 },
      { header: "Password", key: "password", width: 15 },
      { header: "Confirm Password", key: "confirmPassword", width: 20 },
      { header: "Phone Number", key: "phoneNumber", width: 15 },
      { header: "Gender", key: "gender", width: 15 },
      { header: "Language", key: "language", width: 15 },
      { header: "Date of Birth", key: "dob", width: 15 },
    ];

    data.forEach((rowData) => {
      worksheet.addRow({
        name: rowData.name,
        email: rowData.email,
        password: rowData.password,
        confirmPassword: rowData.confirmPassword,
        phoneNumber: rowData.phoneNumber,
        gender: rowData.gender,
        language: rowData.language,
        dob: rowData.dob,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const fileName = "Workers.xlsx";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  // pdf
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = data.map((rowData) => {
      return [
        rowData.name,
        rowData.email,
        rowData.password,
        rowData.confirmPassword,
        rowData.phoneNumber,
        rowData.gender,
        rowData.language,
        rowData.dob,
      ];
    });

    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "Password",
          "Confirm Password",
          "Phone Number",
          "Gender",
          "Language",
          "Date of Birth",
        ],
      ],
      body: tableData,
    });

    doc.save("Worker's.pdf");
  };
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          onClick={openNew}
          severity="success"
        />

        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          className="ms-2"
          onClick={confirmDeleteSelected}
          disabled={!selectedRows || selectedRows.length === 0 || rowDeleted}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          className="ms-2"
          rounded
          onClick={exportToExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          className="ms-2"
          rounded
          onClick={downloadPDF}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        {/* <div id="table-container" className="datatable-responsive container "> */}
        <DataTable
          value={data}
          ref={dt}
          paginator
          rows={5}
          dataKey="id"
          filters={filters}
          className="custom-datatable-style shadow rounded container border-info mt-3"
          filterDisplay="row"
          loading={loading}
          globalFilter={globalFilter}
          header={header}
          emptyMessage="No records found."
          selection={selectedRows}
          onSelectionChange={handleRowSelect}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} workers"
        >
          <Column
            selectionMode="multiple"
            header="#"
            exportable={false}
            className="fs-4"
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Name"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="email"
            header="Email"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Email"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="password"
            header="Password"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Password"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="confirmPassword"
            header="Confirm Password"
            className="text-center"
            sortable
            // filter
            //  filterPlaceholder="Enter Name"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="phoneNumber"
            header="Phone Number"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter PhoneNumber"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="gender"
            header="Gender"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Gender"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="language"
            header="Language"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Language"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter DOB "
            style={{ minWidth: "15rem" }}
          />
          <Column
            header="Actions"
            className=""
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={deleteProductsDialog}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <WarningAmberOutlinedIcon className="fs-1" />
          {selectedRows.length > 0 && (
            <span className="fs-5 ms-2 mt-4 ">
              Are you sure you want to delete {selectedRows.length}{" "}
              {selectedRows.length > 1 ? "Workers" : '"Worker\'s Data"'}?
            </span>
          )}
        </div>
      </Dialog>
      ;
      <ToastContainer autoClose={3000} />
    </div>
  );
}
