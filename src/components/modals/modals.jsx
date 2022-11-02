import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Modals({ ticket, verifyTicket, index }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>More Details & Verify</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ticket {ticket?.date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Guests = {ticket?.numberOfGuests}
            <hr />
            {ticket?.guestInfo?.map((item, i) => (
              <Typography>
                Guest {i + 1} (age:{item?.age})
              </Typography>
            ))}
            <hr />
            <Typography>Id : {ticket?.id}</Typography>
            <Typography>Time: {ticket?.time}</Typography>
            <Typography>Date: {ticket?.date}</Typography>
            <Typography>
              status: {ticket?.verified ? "Verified" : "UnVerified"}
            </Typography>
            <Typography>Total Amount: {ticket?.amount}</Typography>
            <hr />
            {ticket?.verified === false && (
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={(e) => {
                  verifyTicket(index);
                  setOpen(false);
                }}
              >
                Verify
              </Button>
            )}
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={(e) => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
