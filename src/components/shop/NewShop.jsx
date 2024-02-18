import { useState } from "react";
import { auth } from "../auth/auth-helper";
import { create } from "./api-shop.js";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
import theme from "../../theme.js";
import { Link, Navigate } from "react-router-dom";
import Modal from '../UI/Modal.jsx';

// Style component NewShop
const sxStyle = {
  input: {
    display: "none",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  imageName: {
    fontSize: "18px",
    color: "green",
  },
  textField: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
    textDecoration: "none",
  },
};

export default function NewShop() {
  const [modalError, setModalError ] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    let shopData = new FormData();
    values.name && shopData.append("name", values.name);
    values.description && shopData.append("description", values.description);
    values.image && shopData.append("image", values.image);
    if (!values.name.trim()) {
      setValues({ ...values, error: "Name is required" });
      setModalError(true);
      return;
    }

    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      shopData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  function handleCloseModal() {
    setModalError(false)
  }

  if (values.redirect) {
    return <Navigate to={"/seller/"} />;
  }

  return (
    <div>
      <Card sx={sxStyle.card}>
        <CardContent>
          <Typography variant="h6" sx={sxStyle.title}>
            New Shop
          </Typography>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleChange("image")}
            style={sxStyle.input}
          />
          <Typography component="label" htmlFor="icon-button-file">
            <Button variant="contained" component="span">
              Upload Logo
              <FileUploadOutlined />
            </Button>
          </Typography>
          <br />
          <span style={sxStyle.imageName}>
            {values.image ? values.image.name : ""}
          </span>
          <br />
          {values.error && 
            <Modal open={modalError}>
              <Typography variant="h6" color="error">{values.error}</Typography>
              <Button color="error" variant="contained" onClick={handleCloseModal}>Close</Button>
            </Modal>
          }
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
              sx={sxStyle.textField}
            />
          <br />
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={values.description}
            onChange={handleChange("description")}
            sx={sxStyle.textField}
          />
        </CardContent>
        <CardActions>
          <Link style={sxStyle.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
          <Button
            onClick={clickSubmit}
            sx={sxStyle.submit}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
