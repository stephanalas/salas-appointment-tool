import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMediaQuery, useTheme } from "@mui/material";
import { Stage, Profile } from "../../store/api";
import { useCreateProfileMutation } from "../../store/api";
type DialogProps = {
  open: boolean;
  onClose: () => void;
};

type StageOption = {
  label: Stage;
  value: Stage;
};

const stageOptions: StageOption[] = [
  {
    label: "PROSPECT",
    value: "PROSPECT",
  },
  {
    label: "CLIENT",
    value: "CLIENT",
  },
];

const ProfileDialog = (props: DialogProps) => {
  const { open, onClose } = props;
  const [createProfile] = useCreateProfileMutation();
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
      stage: { label: "PROSPECT", value: "PROSPECT" },
      notes: "",
    },
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderOptions = () => {
    return stageOptions.map((option: StageOption) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    try {
      const payload = { ...data, stage: data.stage };
      const response = await createProfile(payload).unwrap();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const handleClose = () => {
    onClose();
    reset();
  };
  // TODO: switch to 07
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      fullScreen={fullScreen}
    >
      <DialogTitle>Add Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent={"space-around"}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="dense"
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
                  margin="dense"
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid container justifyContent={"space-around"}>
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
                  margin="dense"
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
                  margin="dense"
                  label="Phone number"
                  helperText={error ? "Missing Phone number" : null}
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid container justifyContent={"space-around"}>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Industry" margin="dense" />
              )}
            />
            <Controller
              name="stage"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  value={field.value.value}
                  onChange={(e) => {
                    field.onChange({
                      label: e.target.value,
                      value: e.target.value,
                    });
                  }}
                  label="Stage"
                  select
                  margin="dense"
                  children={renderOptions()}
                  helperText={error ? "Select stage" : null}
                  error={!!error}
                  sx={{
                    width: "23.5ch",
                  }}
                />
              )}
            />
          </Grid>
          <Grid container justifyContent={"space-around"}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes (Optional)"
                  margin="normal"
                />
              )}
            />
          </Grid>

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
