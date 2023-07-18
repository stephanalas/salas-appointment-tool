import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InputLabel } from "@mui/material";

type DialogProps = {
  open: boolean;
  onClose: () => void;
};

interface Stage {
  label: string;
  value: string;
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  industry: string;
  stage: Stage;
  notes: string;
}

const stageOptions: Stage[] = [
  {
    label: "PROPSECT",
    value: "PROPSECT",
  },
  {
    label: "CLIENT",
    value: "CLIENT",
  },
];

const ProfileDialog = (props: DialogProps) => {
  const { open, onClose } = props;
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      industry: "",
      stage: { label: "", value: "" },
      notes: "",
    },
  });

  const renderOptions = () => {
    return stageOptions.map((option: Stage) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("submitting", data);
  };
  const handleClose = () => {
    onClose();
    reset();
  };
  // TODO: switch to 07
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>Add Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            justifyContent={"space-around"}
            sx={{
              margin: ".5rem",
              padding: ".5rem",
            }}
          >
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First name"
                  helperText={error ? "Missing first name" : null}
                  error={!!error}
                />
              )}
            />
            <Controller
              name="lastName"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last name"
                  helperText={error ? "Missing last name" : null}
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid
            container
            justifyContent={"space-around"}
            sx={{
              margin: ".5rem",
              padding: ".5rem",
            }}
          >
            <Controller
              name="email"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  helperText={error ? "Missing Email" : null}
                  error={!!error}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  helperText={error ? "Missing Phone number" : null}
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid
            container
            justifyContent={"space-around"}
            sx={{
              margin: ".5rem",
              padding: ".5rem",
            }}
          >
            <Controller
              name="industry"
              control={control}
              render={({ field }) => <TextField {...field} label="Industry" />}
            />

            <Controller
              name="stage"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stage"
                  select
                  children={renderOptions()}
                />
              )}
            />
            {/* <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) =>
                    field.onChange({
                      label: e.target.value,
                      value: e.target.value,
                    })
                  }
                  sx={{
                    width: "40%",
                  }}
                  label="Stage"
                  value={field.value.label}
                >
                  {renderOptions()}
                </Select> 
              )}
            />
            */}
          </Grid>
          <Grid container></Grid>

          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
