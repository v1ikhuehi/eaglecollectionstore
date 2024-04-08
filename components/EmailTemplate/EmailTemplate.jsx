import React from "react";

export default function EmailTemplate({
  firstName,
  lastName,
  email,
  mobile,
  message,
}) {
  return (
    <div>
      <p>
        A message from {firstName} {lastName}
      </p>
      <p>
        contact email: {email} and phone number: {mobile}
      </p>
      <p>{message}</p>
    </div>
  );
}
