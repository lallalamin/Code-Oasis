export const initializeGoogleAnalytics = (measurementId) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", measurementId);
    }
  };

  export default initializeGoogleAnalytics;
  