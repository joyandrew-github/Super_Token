import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Dashboard() {
  const { accessToken, refreshToken, setAccessToken, isLoading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            // Retry the profile fetch after token refresh
            const retryRes = await api.get("/profile", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            setData(retryRes.data);
          } else {
            // If refresh fails, clear token and redirect
            setAccessToken(null);
            localStorage.removeItem("accessToken");
            navigate("/login");
          }
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } else {
        console.error("Profile fetch failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (accessToken) {
        fetchProfile();
      } else {
        setLoading(false);
        navigate("/login");
      }
    }
  }, [accessToken, isLoading]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Dashboard!</h2>
            {data ? (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> {data.id}</p>
                  <p><span className="font-medium">Email:</span> {data.email}</p>
                  <p><span className="font-medium">Member since:</span> {new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No profile data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
