import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import api from "../api/axiosConfig";

const Reports = () => {
  const { hasPermission } = useAuth();
  const [reports, setReports] = useState([]);
  const canWrite = hasPermission("reports", true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await api.get("/reports");
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  const handleCreateReport = async () => {
    try {
      const { data } = await api.post("/reports");
      alert(data.message);
    } catch (error) {
      alert("You do not have permission to create a report.");
      console.error("Failed to create report", error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      {canWrite && <button onClick={handleCreateReport}>Create Report</button>}
      <ul>
        {reports.map((report) => (
          <li key={report.id}>{report.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
