import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Redirects from "@/components/Redirects";
import Layout from "@/components/Layout";
import { Notifications } from "@mantine/notifications";
import { ICONS } from "@/constants/icons";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        fontFamily: "'Poppins', sans-serif",
        fontSizes: {
          xs: "0.5rem",
          sm: "0.75rem",
          md: "0.875rem",
          lg: "1rem",
          xl: "1.125rem",
        },
        primaryColor: "orange",
        components: {
          TextInput: {
            defaultProps: {
              variant: "filled",
              size: "md",
            },
          },
          Textarea: {
            defaultProps: {
              variant: "filled",
              size: "md",
            },
          },
          PasswordInput: {
            defaultProps: {
              variant: "filled",
              size: "md",
              visibilityToggleIcon: ({ reveal }: { reveal: boolean }) =>
                reveal ? <ICONS.EYE_OFF /> : <ICONS.EYE_ON />,
            },
          },
          NumberInput: {
            defaultProps: {
              variant: "filled",
              size: "md",
            },
          },
          FileInput: {
            defaultProps: {
              variant: "filled",
              size: "md",
            },
          },
          DateInput: {
            defaultProps: {
              variant: "filled",
              size: "md",
              locale: "fr",
            },
          },
          Button: {
            defaultProps: {
              size: "sm",
            },
          },
          Select: {
            defaultProps: {
              size: "md",
              variant: "filled",
            },
          },
          MultiSelect: {
            defaultProps: {
              size: "md",
              variant: "filled",
            },
          },
          Modal: {
            defaultProps: {
              overlayProps: {
                color: "#f1f3f5",
                opacity: 0.55,
                blur: 3,
              },
            },
          },
          Switch: {
            defaultProps: {
              size: "md",
            },
          },
          DateTimePicker: {
            defaultProps: {
              size: "md",
              variant: "filled",
            },
          },
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications autoClose={2000} />
      <Redirects>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Redirects>
    </MantineProvider>
  );
}
