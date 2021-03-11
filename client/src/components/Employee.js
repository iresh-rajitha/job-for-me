import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
});

const defaultImageSrc = "https://www.w3schools.com/w3images/avatar2.png";

const initialFieldValues = {
  employeeID: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee(props) {
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeID", values.employeeID);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : "";

  return (
    <>
      {/* <div className="container text-center">
        <p className="lead">An Employee</p>
      </div> */}
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={values.imageSrc}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Add an Employee
              </Typography>
              <TextField
                type="file"
                variant="standard"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
              <br />
              <br />

              <TextField
                variant="outlined"
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
              <br />
              <br />

              <TextField
                variant="outlined"
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button type="submit" className="btn btn-light">
              Submit
            </Button>
          </CardActions>
        </Card>
        {/* <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div> */}
      </form>
    </>
  );
}
