import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Calendar from "rsuite/Calendar";
import Whisper from "rsuite/Whisper";
import Popover from "rsuite/Popover";
import Badge from "rsuite/Badge";
import { DateTime } from "luxon";
import {
  useGetAppointmentsByMonthQuery,
  useGetTasksByDeadlineMonthQuery,
} from "../../../store/api";
import Skeleton from "@mui/material/Skeleton";
// TODO:
// onrowclick should open a dialog with list of appointments for the day in order of when it starts

// Calendar accepts a renderCell function

type CellItem = {
  identifier: string;
  profileName: string;
  time: string;
};

const AppCalendar = () => {
  // list of appointments query
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const {
    data: appointments,
    refetch: refetchAppointments,
    isLoading: appointmentsLoading,
  } = useGetAppointmentsByMonthQuery(timestamp);
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading: tasksLoading,
  } = useGetTasksByDeadlineMonthQuery(timestamp);

  function getCellItems(date: Date) {
    // TODO: sort cellItems by time
    const cellItems: CellItem[] = [];
    const checkDay = date.getDate();
    const checkMonth = date.getMonth() + 1;
    if (appointments && tasks) {
      // check appointments dateTime that match with checkDay & month
      appointments.forEach((appointment) => {
        const { dateTime, profile } = appointment;
        // dateTime comes back as string from query
        if (dateTime && typeof dateTime == "string") {
          const appointmentDate = DateTime.fromISO(dateTime);
          if (
            checkDay == appointmentDate.day &&
            checkMonth == appointmentDate.month &&
            profile
          ) {
            const time = appointmentDate.toFormat("h:mm a");
            cellItems.push({
              identifier: "Appointment",
              time,
              profileName: profile?.firstName + " " + profile?.lastName,
            });
          }
        }
      });
      // check tasks deadline that match with checkDay & month

      tasks.forEach((task) => {
        const { deadline, profile } = task;
        // tasks may not have deadline
        if (deadline && typeof deadline == "string") {
          const deadlineDate = DateTime.fromISO(deadline);
          if (
            checkDay == deadlineDate.day &&
            checkMonth == deadlineDate.month
          ) {
            const time = deadlineDate.toFormat("h:mm a");
            cellItems.push({
              identifier: "Task",
              time,
              profileName: profile?.firstName + " " + profile?.lastName,
            });
          }
        }
      });
    }
    return cellItems;
  }

  function renderCell(date: Date) {
    const list = getCellItems(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.identifier} - {item.profileName}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul
          className="calendar-todo-list"
          style={{
            listStyle: "none",
          }}
        >
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge
                color={item.identifier == "Appointment" ? "blue" : "red"}
              />{" "}
              <b>{item.time}</b> - {item.profileName}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }
  function handleMonthChange(date: Date) {
    // get Task deadline due for month
    // get appointments for month
    const monthsTimestamp = date.getTime();
    setTimestamp(monthsTimestamp);
    refetchAppointments();
    refetchTasks();
  }
  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        minWidth: "100%",
      }}
    >
      <Grid item>
        <Typography variant="h5">Calendar</Typography>
      </Grid>
      {
        // render legend for calendar
      }
      {tasksLoading || appointmentsLoading ? (
        <Grid>
          <Skeleton variant="rectangular" width="100%" height="50vh" />
        </Grid>
      ) : (
        <Calendar
          bordered
          renderCell={renderCell}
          onMonthChange={handleMonthChange}
        />
      )}
    </Grid>
  );
};

export default AppCalendar;
