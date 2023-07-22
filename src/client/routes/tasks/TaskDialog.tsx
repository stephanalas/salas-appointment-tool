import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme, useMediaQuery } from "@mui/material";
import { useGetAllProfilesQuery } from "../../store/api";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  profile: number | null;
  urgency: string;
  deadline: string | Date;
  description: string;
  completed: Boolean;
}

const TaskDialog = (props: DialogProps) => {
  const { data: profiles, isLoading: isProfilesLoading } =
    useGetAllProfilesQuery();
  const { open = true, onClose } = props;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      profile: null,
      urgency: "LOW",
      deadline: "",
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
            <Grid item container>
              <Grid item>
                <Controller
                  name="profile"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      value={field.value}
                      options={profiles || []}
                      onChange={(e, newValue) => {
                        if (newValue) field.onChange(e);
                      }}
                      renderOption={(props, option) =>
                        `${option.firstName} ${option.lastName}`
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id == value.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="profile" />
                      )}
                    />
                  )}
                />
                profile autocomplete
              </Grid>
              <Grid item> urgency dropdown</Grid>
            </Grid>
            <Grid item>MuI calendar picker</Grid>
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
