import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Modals from "../modals/modals";

export default function Results({ ticket, verifyTicket, index }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        maxWidth: "50%",
        marginTop: "25px",
        marginLeft: "25%",
        marginRight: "25%"
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ width: "100%" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Ticket</Typography>
          <Typography>{ticket?.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Guests = {ticket?.numberOfGuests}</Typography>
          <Typography>
            Status:
            {ticket?.verified ? (
              <Chip label="Verified" color="success" />
            ) : (
              <Chip label="UnVerified" color="primary" />
            )}
          </Typography>
          <hr />
          {ticket?.guestInfo?.map((item, i) => (
            <Typography>
              Guest {i + 1} (age:{item?.age})
            </Typography>
          ))}
          <hr />
          <Modals ticket={ticket} verifyTicket={verifyTicket} index={index} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
