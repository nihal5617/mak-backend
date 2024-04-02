import formatDate from "./formatDate.js";

const formatMessage = (name, email, phoneNumber, message) => {
  return `Name: ${name}<br>Email: ${email}<br>Phone Number: ${phoneNumber}<br>Message: ${message}<br>Date: ${formatDate(
    new Date()
  )}`;
};

export default formatMessage;