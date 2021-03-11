import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Popup from "./Popup";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function EmployeeList() {
  const classes = useStyles();
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const employeeAPI = (url = "https://localhost:5001/api/Employee/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  function refreshEmployeeList() {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setEmployeeList(res.data);
      })
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    console.log(formData);
    if (formData.get("employeeID") == "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
          setOpenPopup(false);
        })
        .catch((err) => console.log(err));
    else
      employeeAPI()
        .update(formData.get("employeeID"), formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
          setOpenPopup(false);
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
    setOpenPopup(true);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure to delete this record?"))
      employeeAPI()
        .delete(id)
        .then((res) => refreshEmployeeList())
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      className="card"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <img src={data.imageSrc} className="card-img-top rounded-circle" />
      <div className="card-body">
        <h5>{data.employeeName}</h5>
        <span>{data.occupation}</span> <br />
        <button
          className="btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.employeeID))}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron jumbotron-fluid py-4">
            {/* <div className="container text-center">
            <h1 className="display-4">Employee Register</h1>
          </div> */}
            <div className={classes.root}>
              <Button
                variant="outlined"
                color="primary"
                href="#outlined-buttons"
                onClick={() => setOpenPopup(true)}
              >
                Add New
              </Button>
            </div>
          </div>
        </div>
        {/* <div classname="col-md-4">
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div> */}
        <div className="col-md-8">
          <table>
            <tbody>
              {
                // tr > 3 td
                [...Array(Math.ceil(employeeList.length / 3))].map((e, i) => (
                  <tr key={i}>
                    <td>{imageCard(employeeList[3 * i])}</td>
                    <td>
                      {employeeList[3 * i + 1]
                        ? imageCard(employeeList[3 * i + 1])
                        : null}
                    </td>
                    <td>
                      {employeeList[3 * i + 2]
                        ? imageCard(employeeList[3 * i + 2])
                        : null}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </Popup>
      </div>
    </section>
  );
}

{
  /* <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Employee Register</h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <Employee
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            tr > 3 td
                            [...Array(Math.ceil(employeeList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(employeeList[3 * i])}</td>
                                    <td>{employeeList[3 * i + 1] ? imageCard(employeeList[3 * i + 1]) : null}</td>
                                    <td>{employeeList[3 * i + 2] ? imageCard(employeeList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div> */
}
