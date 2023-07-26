import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DateTime } from "luxon";
import {
  useTheme,
  useMediaQuery,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  useGetAllProfilesQuery,
  Profile,
  useCreateTaskMutation,
  Task,
} from "../../store/api";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
interface DialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

interface IFormInput {
  profile: Profile | null;
  urgency: string;
  deadline: DateTime | null;
  description: string;
  completed: boolean;
}

const TaskDialog = (props: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [createTask] = useCreateTaskMutation();
  // todo use isProfileLoading add spinner to autocomplete adornment
  const { data: profiles, isLoading: isProfilesLoading } =
    useGetAllProfilesQuery();
  const { open, onClose, task } = props;
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      profile: null,
      urgency: "LOW",
      deadline: null,
      description: "",
      completed: false,
    },
  });

  useEffect(() => {
    // populate form with selected profile data
    if (task) {
      reset({
        profile: task.profile,
        urgency: task.urgency,
        deadline: task.deadline,
        description: task.description,
        completed: task.completed,
      });
    } else {
      reset({
        profile: null,
        urgency: "LOW",
        deadline: null,
        description: "",
        completed: false,
      });
    }
  }, [task]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (!task) {
        // create
        const response = await createTask({
          ...data,
          profile: data.profile!,
          deadline: data.deadline,
        }).unwrap();
        if (response.error) throw response.message;
        else toast.success(response.message);
      } else {
        // update
      }
      handleClose();
    } catch (error) {
      if (typeof error == "string") {
        toast.error(error);
        console.log(error);
      }
    }
  };
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>Add Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item width={"100%"}>
              <Controller
                name="profile"
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, value, ...field },
                  fieldState,
                }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    handleHomeEndKeys
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) onChange(newValue);
                    }}
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Profile"
                        inputRef={field.ref}
                        helperText={
                          fieldState.error
                            ? "Select a profile to associate with task"
                            : null
                        }
                        error={!!fieldState.error}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent={"space-between"}
              rowGap={fullScreen ? 2 : 0}
            >
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
                    sx={{ width: fullScreen ? "100%" : "23.5ch" }}
                  />
                )}
              />
              <Controller
                control={control}
                name="deadline"
                render={({ field: { value, onChange, ref } }) => (
                  <DatePicker
                    disablePast
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                    label="Deadline"
                  />
                )}
              />
            </Grid>
            <Grid item width={"100%"}>
              <Controller
                control={control}
                name="description"
                rules={{
                  required: true,
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    helperText={
                      fieldState.error
                        ? "Missing task description. What are we doing?"
                        : null
                    }
                    error={!!fieldState.error}
                    rows={4}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container direction={"column"} alignItems={"end"}>
          <Grid item>
            <Controller
              control={control}
              name="completed"
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e, checked) => field.onChange(checked)}
                    />
                  }
                  label="Completed"
                />
              )}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
