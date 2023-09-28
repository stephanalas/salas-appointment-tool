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
import { RowData, useImportProfilesMutation } from "../../../store/api";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

// TODO: give feed back on file that is uploaded. maybe its missing import row data

const DropzoneDialog = (props: DialogProps) => {
  const { open, onClose } = props;
  const [importProfiles, { isLoading }] = useImportProfilesMutation();
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
    setParsing(false);
  }

  function handleClose() {
    onClose();
    setCSVData([]);
    setParsing(false);
  }
  async function handleSubmit() {
    console.log("submitting data", csvData);
    try {
      if (csvData.length) {
        const response = await importProfiles(csvData).unwrap();
        if (response.message) {
          handleClose();
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
        {isLoading ? (
          <DialogContentText>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>Importing rows into profile table...</Grid>
              <CircularProgress />
            </Grid>
          </DialogContentText>
        ) : csvData.length ? (
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
        <Button
          type="submit"
          disabled={!csvData.length || isLoading}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DropzoneDialog;
