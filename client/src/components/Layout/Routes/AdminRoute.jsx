import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../../Spinner";

export default function AdminRoute() {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`/api/auth/admin-auth`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Authentication Error:", error);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  return <Outlet />;
}
