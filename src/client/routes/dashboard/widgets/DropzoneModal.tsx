import { useState, useEffect } from "react";
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
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { parse } from "papaparse";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const DropzoneDialog = (props: DialogProps) => {
  const { open, onClose } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [],
    },
    maxFiles: 1,
  });
  const [parsing, setParsing] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!parsing && acceptedFiles.length) {
      const file = acceptedFiles[0];

      file.text().then((result) => {
        const jsonData = parse(result);
        console.log("data", jsonData);
      });
    }
  }, [parse, acceptedFiles]);

  // const files = acceptedFiles.map((file) => {
  //   console.log("file", file);
  //   const reader = new FileReader();

  //   return <ListItem>file</ListItem>;
  // });
  // drop a file
  // save file to currentFile state
  // parse file using papaparse
  // check for errors
  // if no errors
  // make a request to server to add profiles to db

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        width: "100%",
      }}
      fullWidth
    >
      <DialogTitle>Import profiles</DialogTitle>
      <DialogContent>
        <Paper
          {...getRootProps({ className: "dropzone" })}
          sx={{
            backgroundColor: "#ededed",
            height: 250,
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DropzoneDialog;
