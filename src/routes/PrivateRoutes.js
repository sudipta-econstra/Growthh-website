import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
//import About from '../pages/About';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import EmployeesKpi from "../pages/managementDashboard/EmployeesKpi";
import BottleNeckReport from "../pages/managementDashboard/BottleNeckReport";
import MyTaskWorkflow from "../pages/myTask/MyTaskWorkflow";
import MyWorkflowTaskDetails from "../pages/myTask/MyWorkflowTaskDetails";
import MyChecklistTask from "../pages/myTask/MyChecklistTask";
import MyTaskTrackerList from "../pages/myTask/MyTaskTrackerList";
import TaskManagerWorkflow from "../pages/taskManager/workflow/TaskManagerWorkflow";//edited by neeraj 16/05/24
import NewWorkflowTemplate from "../pages/taskManager/workflow/NewWorkflowTemplate";//edited by neeraj 16/05/24
import NewWorkflowTask from "../pages/taskManager/workflow/NewWorkflowTask";//edited by neeraj 16/05/24
import EditWorkflowTask from "../pages/taskManager/workflow/EditWorkflowTask";
import TaskManagerChecksheet from "../pages/taskManager/checksheet/TaskManagerChecksheet";
import AddNewChecksheet from "../pages/taskManager/checksheet/AddNewChecksheet";


function PrivateRoutes() {
  //const [color, setColor] = useState(true)
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper p-4">
        <div className="content">
          <Routes>
            <Route index  path="/dashboard" element={<Dashboard />} />
            <Route path="/employees-kpi" element={<EmployeesKpi />} />
            <Route path="/bottle-neck-report" element={<BottleNeckReport />} />
            <Route path="/my-workflow-task" element={<MyTaskWorkflow />} />
            <Route path="/my-workflow-task-details" element={<MyWorkflowTaskDetails />} />
            <Route path="/my-checklist-task" element={<MyChecklistTask />} />
            <Route path="/my-task-tracker" element={<MyTaskTrackerList />} />
            <Route path="/workflow" element={<TaskManagerWorkflow />} />
            <Route path="/new-workflow-template" element={<NewWorkflowTemplate />} />
            <Route path="/create-new-workflow-task" element={<NewWorkflowTask />} />
            <Route path="/edit-workflow-task" element={<EditWorkflowTask />} />
            <Route path="/checksheet" element={<TaskManagerChecksheet />} />
            <Route path="/add-new-checksheet" element={<AddNewChecksheet />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivateRoutes;
