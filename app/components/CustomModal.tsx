import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  SetRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  SetRoute,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* Add your custom modal content here using the Box component or any other components */}
      <Box className=" absolute top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        {/* Your custom content goes here */}
        <Component setOpen={setOpen} setRoute={SetRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
