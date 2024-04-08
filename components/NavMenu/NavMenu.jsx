"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavMenu = ({ closeMenuCallback }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  useEffect(() => {
    if (!submenuOpen) {
      setSubmenuOpen(true);
    }
  }, [closeMenuCallback]);

  const menuLink = [
    {
      name: "Shop",
      submenu: true,
      sublinks: [
        {
          name: "Georges",
          link: "/george",
        },
        {
          name: "Laces",
          link: "/lace",
        },
        {
          name: "Bags",
          link: "/bag",
        },
        {
          name: "Accessories",
          link: "/accessories",
        },
        {
          name: "Slippers",
          link: "/slippers",
        },
        {
          name: "Gown Dress",
          link: "/dress",
        },
        {
          name: "Ankara",
          link: "/ankara",
        },
        {
          name: "Shoes",
          link: "/shoe",
        },
        {
          name: "Jewelries",
          link: "/jewelry",
        },
        {
          name: "Mens Shop",
          link: "/men",
        },
        {
          name: "Clutches",
          link: "/clutch",
        },

        {
          name: "Headtie Gele",
          link: "/headtie",
        },
      ],
    },
  ];
  return (
    <div className="">
      {menuLink.map((menu, index) => (
        <div key={index}>
          {menu.sublinks && (
            <div
              className={
                submenuOpen
                  ? "grid sm:grid-cols-6 grid-cols-3 gap-5 p-5 items-center bg-dark-green duration-50 "
                  : "hidden"
              }
              onMouseLeave={closeMenuCallback}
            >
              {menu.sublinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.link}
                    className="menuitems"
                    onClick={() => {
                      toggleSubmenu();
                    }}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
