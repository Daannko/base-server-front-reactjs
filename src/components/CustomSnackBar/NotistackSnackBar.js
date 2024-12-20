import { SnackbarProvider } from "notistack";

const MAX_SNACK = 3;
const AUTO_HIDE_DURATION = 3000;
const POSITION = {
  vertical: "top",
  horizontal: "right"
};

export default function NotistackWrapper({ children }) {
  return (
    <SnackbarProvider
      maxSnack={MAX_SNACK}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION}
    >
      {children}
    </SnackbarProvider>
  );
}
