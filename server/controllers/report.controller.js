exports.getReports = (req, res) => {
  res.json([
    { id: 1, name: "Report 1" },
    { id: 2, name: "Report 2" },
  ]);
};

exports.createReport = (req, res) => {
  res.status(201).json({ message: "Report created successfully" });
};
