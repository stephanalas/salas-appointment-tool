import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme, useMediaQuery, MenuItem } from "@mui/material";
import { useGetAllProfilesQuery, Profile } from "../../store/api";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  profile: Profile | null;
  urgency: string;
  deadline: string | Date | null;
  description: string;
  completed: Boolean;
}

const TaskDialog = (props: DialogProps) => {
  const { data: profiles, isLoading: isProfilesLoading } =
    useGetAllProfilesQuery();
  const { open = true, onClose } = props;
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      profile: null,
      urgency: "LOW",
      deadline: null,
      description: "",
      completed: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("Hey we are submitting");
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: FIX AUTOCOMPLETE
  // TODO: FINISH TASK FORM

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container>
            <Controller
              name="profile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  fullWidth
                  value={value}
                  onChange={(e, newValue) => onChange(newValue)}
                  options={profiles || []}
                  renderOption={(props, option) => (
                    <MenuItem {...props} key={option.id}>
                      {`${option.firstName} ${option.lastName}`}
                    </MenuItem>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id == value.id
                  }
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderInput={(params) => {
                    return <TextField {...params} label="profile" />;
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="urgency"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Urgency"
                  children={["LOW", "URGENT"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  select
                  // sx={{ width: "23.5ch" }}
                />
              )}
            />
            <Controller
              control={control}
              name="deadline"
              rules={{ required: true }}
              render={({ field: { value, onChange, ref } }) => (
                <DatePicker
                  value={value}
                  inputRef={ref}
                  onChange={onChange}
                  label="deadline"
                />
              )}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
