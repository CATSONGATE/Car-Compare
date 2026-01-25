import Providers from './providers';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="eg">
      <body>
        <Providers>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Car Compare</Typography>
            </Toolbar>
          </AppBar>
          {children}
        </Providers>
      </body>
    </html>
  );
}