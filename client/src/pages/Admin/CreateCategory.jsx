import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
import style from "./CreateCategory.module.css";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in category creation:", error);
      toast.error("Error creating category. Please try again.");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data.success && Array.isArray(data?.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
        toast.error("Invalid category data received");
      }
    } catch (error) {
      console.error("Error in getting categories:", error);
      toast.error("Error fetching categories. Please try again.");
      setCategories([]);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName) {
      toast.error("Updated category name is required");
      return;
    }
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        setUpdatedName("");
        setSelected(null);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category. Please try again.");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category. Please try again.");
    }
  };

  return (
    <Layout title="Dashboard - Manage Categories ">
      <div className="container-fluid mt-4 p-5  pt-5">
        <div className="row">
          <div className="col-md-3 pt-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-5 border-danger shadow border">
            <h1 className={`${style.txt}`}>Manage Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-success ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No categories found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Modal
              visible={visible}
              onCancel={() => {
                setVisible(false);
                setUpdatedName("");
                setSelected(null);
              }}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}
