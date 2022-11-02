import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import moment from "moment";
import uuid from "react-uuid";
import Results from "../results/results";

export default function Forms() {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [guestInfo, setGuestInfo] = useState([]);
  const [tickets, setTickets] = useState([]);

  const addFields = () => {
    console.log(numberOfGuests);
    let arr = [];
    for (let i = 0; i < numberOfGuests; i++) {
      arr.push({ age: "" });
    }
    setGuestInfo([...arr]);
  };

  const handleChange = (value, index) => {
    let temp = guestInfo;
    temp[index] = { ...temp[index], age: value };
    setGuestInfo([...temp]);
  };

  const generateTickets = () => {
    let amt = 0;
    for (let i = 0; i < guestInfo?.length; i++) {
      let ele = guestInfo[i]?.age;
      if (ele <= 2) {
        amt = amt + 0;
      } else if (ele > 2 && ele < 18) {
        amt = amt + 100;
      } else if (ele >= 18 && ele < 60) {
        amt = amt + 500;
      } else if (ele >= 60) {
        amt = amt + 300;
      }
    }

    setTickets([
      ...tickets,
      {
        numberOfGuests: numberOfGuests,
        guestInfo: guestInfo,
        amount: amt,
        date: moment()?.format("DD/MM/YYYY"),
        time: moment()?.format("HH:MM:SS"),
        id: uuid(),
        verified: false
      }
    ]);
    setNumberOfGuests(0);
    setGuestInfo([]);
  };

  const verifyTicket = (index) => {
    let temp = tickets;
    temp[index] = { ...temp[index], verified: true };
    setTickets([...temp]);
  };

  const checkInput = (item) => {
    return item?.age?.length === 0;
  };

  console.log(tickets);
  return (
    <>
      <Card
        sx={{
          maxWidth: "50%",
          marginTop: "25px",
          marginLeft: "25%",
          marginRight: "25%"
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://jaipurtourism.co.in/images/places-to-visit/header/jaipur-zoo-entry-fee-timings-holidays-reviews-header.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Enter Visitor Details
          </Typography>
          <TextField
            id="outlined-basic"
            label="No. Of Guests"
            variant="outlined"
            value={numberOfGuests}
            onChange={(e) => {
              setNumberOfGuests(e.target.value);
            }}
            type="number"
            disabled={guestInfo?.length > 0}
          />
          <br />
          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            disabled={numberOfGuests === 0 || guestInfo?.length > 0}
            onClick={(e) => {
              addFields();
            }}
          >
            Submit
          </Button>
          <br />
          {guestInfo?.map((item, i) => (
            <>
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                style={{ marginTop: "5px" }}
                onChange={(e) => {
                  handleChange(e.target.value, i);
                }}
                value={guestInfo[i]?.age}
                key={i}
                type="number"
              />
              <br />
            </>
          ))}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={(e) => {
              generateTickets();
            }}
            disabled={guestInfo?.length === 0 || guestInfo.some(checkInput)}
          >
            Create
          </Button>
          <Button size="small" disabled={guestInfo?.length === 0}>
            Cancel
          </Button>
        </CardActions>
      </Card>
      {tickets?.map((item, i) => (
        <Results ticket={item} verifyTicket={verifyTicket} index={i} />
      ))}
    </>
  );
}
