import { useEffect, useState } from "react";
import { list } from "./api-shop";
import { Link } from "react-router-dom";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";

export default function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data) {
        setShops(data);
      } else {
        console.log("Received empty or invalid data from server");
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {shops.map((shop, i) => {
        return (
          <Link to={"/shops/" + shop._id} key={i}>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={
                    "http://localhost:3000/api/shops/logo/" +
                    shop._id +
                    "?" +
                    new Date().getTime()
                  }
                />
              </ListItemAvatar>
              <div>
                <Typography variant="h2" component="h2" color="primary">
                  {shop.name}
                </Typography>
                <Typography variant="subtitle1" component="h4">
                  {shop.description}
                </Typography>
              </div>
            </ListItem>
            <Divider />
          </Link>
        );
      })}
    </div>
  );
}
