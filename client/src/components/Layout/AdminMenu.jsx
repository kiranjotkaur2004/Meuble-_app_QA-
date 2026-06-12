import React from "react";
import { NavLink } from "react-router-dom";
import style from "./AdminMenu.module.css";

export default function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <h2 className={style.admin}>Admin Panel</h2>
        <div class="list-group">
          <NavLink
            to="/dashboard/admin/create-category"
            class={`list-group-item  ${style.lists}`}
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            class={`list-group-item  ${style.lists}`}
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            class={`list-group-item  ${style.lists}`}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-users"
            class={`list-group-item  ${style.lists}`}
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}
