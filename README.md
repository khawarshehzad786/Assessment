# Booking Calendar App

A modern, responsive booking calendar application built with Next.js, React, and Tailwind CSS. This application provides a comprehensive solution for managing bookings and appointments with a clean, user-friendly interface.

## Features

- **Weekly Calendar View**: Display appointments in a weekly calendar format with time slots from 06:00 to 20:00
- **Booking Management**: Add, edit, and delete bookings with detailed information
- **Customer & Staff Management**: Associate bookings with customers and staff members
- **Status Tracking**: Track booking statuses (Need Approval, Confirmed, In Progress, Completed, Cancelled)
- **Service Types**: Categorize bookings by service type
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Persists booking data in the browser's local storage
- **Toast Notifications**: Provides feedback for user actions with toast notifications

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS
- **date-fns**: Modern JavaScript date utility library
- **Framer Motion**: Animation library for React
- **Sonner**: Toast notification library

## Project Structure

\`\`\`
calendar-app/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── add-event-modal.tsx     # Modal for adding/editing events
│   ├── calendar-app.tsx        # Main calendar application component
│   ├── calendar-view.tsx       # Calendar view with controls
│   ├── sidebar.tsx             # Sidebar navigation component
│   ├── weekly-calendar.tsx     # Weekly calendar grid component
│   └── ui/                     # UI components from shadcn/ui
├── contexts/             # React contexts
│   └── calendar-context.tsx    # Calendar state management
├── hooks/                # Custom React hooks
│   └── use-sidebar.tsx         # Hook for sidebar state
├── lib/                  # Utility functions
│   └── utils.ts                # Helper utilities
└── public/               # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/calendar-app.git
   cd calendar-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Adding a Booking

1. Click on an empty time slot or the "Add Booking" button
2. Fill in the booking details in the modal:
   - Select a customer
   - Select a staff member
   - Set date and time
   - Choose services
   - Set status
3. Click "Save" to create the booking

### Editing a Booking

1. Click on an existing booking in the calendar
2. Modify the details in the modal
3. Click "Update" to save changes or "Delete" to remove the booking

### Filtering and Navigation

- Use the week navigation controls to move between weeks
- Use the "Filter" button to filter bookings
- View booking counts by status (Upcoming, Completed, Cancelled)

## Customization

### Adding New Service Types

To add new service types, update the `EventType` type in `contexts/calendar-context.tsx`:

\`\`\`typescript
export type EventType = "Luxury & Beard SPA" | "Message SPA" | "Haircut" | "Rebooking" | "Block" | "Extra Time" | "Your New Service";
\`\`\`

### Adding New Status Types

To add new status types, update the `EventStatus` type in `contexts/calendar-context.tsx`:

\`\`\`typescript
export type EventStatus = "Need Approval" | "Confirmed" | "In Progress" | "Completed" | "Cancelled" | "Your New Status";
\`\`\`

Then update the `getStatusIcon` and `getStatusColor` functions to handle the new status.

## Future Enhancements

- Calendar sync with external services (Google Calendar, Outlook, etc.)
- Multi-day events
- Recurring events
- Dark mode support
- Mobile-optimized view
- Export to iCal/CSV

## License

This project is licensed under the MIT License - see the LICENSE file for details.
