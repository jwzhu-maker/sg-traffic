import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Router from "next/router";

import ProgressBar from "@badrap/bar-of-progress";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// const progress = new ProgressBar({
//   size: 4,
//   color: "#FE595E",
//   className: "z-0",
//   delay: 1000,
// });

// Router.events.on("routerChangeStart", progress.start);
// Router.events.on("routerChangeComplete", progress.finish);
// Router.events.on("routerChangeError", progress.finish);

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: true,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
