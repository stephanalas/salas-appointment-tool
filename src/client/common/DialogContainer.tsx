import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Appointment, Profile, Task } from "../store/api";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  label: string;
  // IMPORTANT: add typing for any addtional selectedItem
  selectedItem: Appointment | Task | Profile | null;
  children: JSX.Element;
};

const DialogContainer = (props: PropsType) => {
  const { breakpoints } = useTheme();
  const fullScreen = useMediaQuery(breakpoints.down("sm"));

  const { open, handleClose, label, selectedItem, children } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth>
      <DialogTitle>
        {selectedItem ? `Edit ${label}` : `Add ${label}`}
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogContainer;
