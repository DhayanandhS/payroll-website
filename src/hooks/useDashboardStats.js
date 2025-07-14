import { useEffect, useState } from "react";
import axios from "axios";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    users: 0,
    employees: 0,
    policies: 0,
    logs: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, empRes, policyRes, logRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users", getAuthHeaders()),
          axios.get("http://localhost:8080/api/employees", getAuthHeaders()),
          axios.get("http://localhost:8080/api/policies", getAuthHeaders()),
          axios.get("http://localhost:8080/api/audit-logs", getAuthHeaders()),
        ]);
        setStats({
          users: usersRes.data.length,
          employees: empRes.data.length,
          policies: policyRes.data.length,
          logs: logRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    fetchCounts();
  }, []);

  return stats;
}
