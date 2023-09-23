import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme, useMediaQuery } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const DropzoneDialog = (props: DialogProps) => {
  const theme = useTheme();
  const { open, onClose } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const files = acceptedFiles.map((file) => {
    console.log("file", file);
    return <ListItem>file</ListItem>;
  });
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>Import profiles</DialogTitle>
      <DialogContent>
        <Paper
          {...getRootProps({ className: "dropzone" })}
          sx={{
            backgroundColor: "#ededed",
            width: "20vw",
            height: "20vh",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{
              height: "100%",
            }}
          >
            <input {...getInputProps()} />
            <AttachFileIcon color="secondary" />
            <DialogContentText>drag csv file or click to add</DialogContentText>
          </Grid>
        </Paper>
        <aside>
          <List>{files ? files : null}</List>
        </aside>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DropzoneDialog;
