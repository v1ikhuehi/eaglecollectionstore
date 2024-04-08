"use client";

import GoogleMap from "@/components/GoogleMap/GoogleMap";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SocialIcon } from "react-social-icons";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  const handleContactUs = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return toast.error("Name is required. Please enter first and last name", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!email) {
      return toast.error("Email is required. Please enter email", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!mobile) {
      return toast.error(
        "Phone number is required. Please enter phone number",
        {
          style: {
            border: "1px solid #f72585",
            padding: "16px",
            color: "#f72585",
          },
          iconTheme: {
            primary: "#f72585",
            secondary: "#FFFAEE",
          },
        }
      );
    }

    if (!message) {
      return toast.error("Message is required, Please enter a message", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    const response = await axios.post("/api/send", {
      firstName,
      lastName,
      email,
      mobile,
      message,
    });

    if (response.status === 200) {
      setFirstName(""), setLastName("");
      setEmail("");
      setMobile("");
      setMessage("");
      toast.success(`Hi ${firstName}, message sent successfully`, {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
    }
  };
  return (
    <div className="  mx-5 mt-5 mb-10 ">
      <div>
        <h2 className="text-center sm:pb-5 pb-2 font-bold text-2xl ">
          Contact Us
        </h2>

        <form
          onSubmit={handleContactUs}
          className="pt-5 pb-10 bg-white p-5"
          data-aos="fade-up"
        >
          <div className="sm:flex justify-between gap-2">
            <div className="w-full">
              <label htmlFor="firstName" name="firstName">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" name="lastName">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:flex justify-between gap-2">
            <div className="w-full">
              <label htmlFor="email" name="email">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="mobile" name="mobile">
                Phone Number
              </label>
              <input
                type="phone"
                placeholder="Enter Phone Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" name="message">
              What can we help you with?
            </label>
          </div>
          <textarea
            name="message"
            id=""
            cols="10"
            rows="5"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3 py-1 bg-dark-green rounded-md text-white w-full"
            >
              Send
            </button>
          </div>
        </form>
        <div
          className="sm:flex justify-around items-center gap-5 py-5 bg-white my-5"
          data-aos="fade-up"
        >
          <div
            className="flex flex-col justify-center items-center gap-2"
            data-aos="fade-right"
          >
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-main-pink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <p className="text-lg">210-310-9644</p>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-light-green"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <p className="text-lg">info@eaglecollectionstore.com</p>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-main-pink"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <div className="flex flex-col">
                <p className="text-lg">11329 Bissonnet Street,</p>
                <p className="text-lg ">Houston, TX 77099</p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col justify-center text-center gap-2 sm:mt-0 mt-5"
            data-aos="fade-left"
          >
            <h2 className=" text-xl text-light-green">Our Social Media</h2>
            <div className="flex gap-1 justify-center items-center">
              <SocialIcon
                network="facebook"
                url="https://www.facebook.com/profile.php?id=100064705848755&mibextid=ZbWKwL"
                target="_blank"
              />
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/eaglecollectionstore?igsh=MWhqZDU3M2F3OGx5dQ%3D%3D&utm_source=qr"
                target="_blank"
              />
              <SocialIcon
                network="whatsapp"
                url="https://wa.me/12103109644"
                target="_blank"
              />
              <SocialIcon
                network="tiktok"
                url="https://www.tiktok.com/@eaglecollections_store?_t=8j44epTfpTq&_r=1"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5" data-aos="fade-up">
        <h2 className="text-center py-5 font-bold text-xl ">
          Find us on Google
        </h2>
        <GoogleMap />
      </div>
    </div>
  );
}
