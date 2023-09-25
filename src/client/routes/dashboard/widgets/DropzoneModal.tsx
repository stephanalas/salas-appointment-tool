import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { parse } from "papaparse";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { RowData } from "../../../store/api";

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
  const [csvData, setCSVData] = useState<RowData[]>([]);

  useEffect(() => {
    if (!parsing && acceptedFiles.length) {
      setParsing(true);
      const file = acceptedFiles[0];
      file.text().then((result) => {
        const { data, errors } = parse(result);
        if (!errors.length) {
          formatData(data);
        } else {
          toast.error("there is an issue with the csv file");
          console.log(errors);
        }
        // TODO: check for errors
      });
    }
  }, [parse, acceptedFiles]);

  function formatData(data: unknown[]) {
    // check for empty rows
    const createRow = (data: RowData) => ({
      ...data,
    });
    // [name, email, phone, industry, stage, notes]
    const rows = [];

    // start after columns array
    for (let i = 1; i < data.length; i++) {
      const [name, email, phone, industry, stage, notes] = data[i] as string[];
      if (name && email && stage) {
        const row = createRow({ name, email, phone, industry, stage, notes });
        rows.push(row);
      }
    }
    setCSVData(rows);
  }

  function handleClose() {
    onClose();
    setCSVData([]);
    setParsing(false);
  }
  function handleSubmit() {
    console.log("submitting data", csvData);
    // TODO:
    // use import profile mutation
    // handle response from server with react toastify
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        width: "100%",
      }}
      fullWidth
    >
      <DialogTitle>Import profiles</DialogTitle>
      <DialogContent>
        {csvData.length ? (
          <DialogContentText>
            File upload successful. Ready to import to profile's table?
          </DialogContentText>
        ) : (
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
              <input {...getInputProps()} disabled={parsing} />
              {parsing ? (
                <CircularProgress />
              ) : (
                <>
                  <AttachFileIcon color="secondary" />
                  <DialogContentText>
                    drag csv file or click to add
                  </DialogContentText>
                </>
              )}
            </Grid>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={!csvData.length} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DropzoneDialog;
