import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
  const handleExportToCalendar = (event) => {
    // Format event data into an .ics file
    const eventData = {
      title: event.title,
      start: event.start,
      end: event.end,
    };

    const icsContent = generateICS(eventData);

    // Create a Blob containing the .ics content
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Open the URL in a new window/tab
    window.open(url);

    // Provide feedback to the user
    alert('Event exported to iPhone Calendar!');
  };

  const generateICS = (eventData) => {
    // Format the eventData into iCalendar format
    // Here you would construct the .ics file content based on the event details
    // This might involve formatting the event start and end times, title, description, etc.
    // For example, you might use the BEGIN:VCALENDAR, BEGIN:VEVENT, END:VCALENDAR, END:VEVENT format
    // You can find more information on iCalendar format online
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={[
          // Your event data here
        ]}
        eventClick={handleExportToCalendar}
      />
    </div>
  );
}

export default Calendar;
