type EventProps = {
  name: string;
  [key: string]: any;
};

export function trackEvent(props: EventProps) {
  if (process.env.NODE_ENV === "development") {
    console.log("Track Event:", props);
  }
  // In a real app, you would send this to your analytics provider (e.g., PostHog, Google Analytics)
}
