const attachEventListener = ({ elementId, events = "click", cb }) => {
  if (Array.isArray(events))
    return events.map((event) => attachEventListener(elementId, event, cb));
  document.getElementById(elementId).addEventListener(events, cb);
};

export default attachEventListener;
