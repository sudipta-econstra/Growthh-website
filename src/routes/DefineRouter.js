import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import ThankYou from '../pages/landing/Home/ThankYou';
import Dashboardv2 from '../pages/Dashboardv2';
import EmployeesKpi from "../pages/managementDashboard/EmployeesKpi";
import BottleNeckReport from "../pages/managementDashboard/BottleNeckReport";
import MyTaskWorkflow from '../pages/myTask/MyTaskWorkflow';
import MyWorkflowTaskDetails from '../pages/myTask/MyWorkflowTaskDetails';
import MyChecklistTask from "../pages/myTask/MyChecklistTask";
import MyTaskTrackerList from '../pages/myTask/MyTaskTrackerList';
import TaskManagerWorkflow from '../pages/taskManager/workflow/TaskManagerWorkflow';
import NewWorkflowTemplate from '../pages/taskManager/workflow/NewWorkflowTemplate';
import NewWorkflowTask from '../pages/taskManager/workflow/NewWorkflowTask';
import EditWorkflowTask from '../pages/taskManager/workflow/EditWorkflowTask';
import TaskManagerChecksheet from '../pages/taskManager/checksheet/TaskManagerChecksheet';
import AddNewChecksheet from '../pages/taskManager/checksheet/AddNewChecksheet';
import DashboardFlow from '../pages/Dashboardv2-flow';
import DashboardCalendar from '../pages/Dashboardv2-calendar';

import AdminLogin from '../pages/admin/AdminLogin';
import ResetPassword from '../pages/admin/ResetAdminPassword';
import ForgotAdminPassword from '../pages/admin/ForgotAdminPassword';
import VerifyAdminOtp from '../pages/admin/VerifyAdminOtp'
// import Module from '../pages/admin/Module';
// import Plan from '../pages/admin/Plan'

import UserAdminLogin from '../pages/auth/UserAdminLogin';
import AdminPlan from '../pages/admin/AdminPlan';
import AdminModule from '../pages/admin/AdminModule';
import AdminCompany from '../pages/admin/AdminCompany';
import AdminReport from '../pages/admin/AdminReport';
import Page404 from '../pages/PageNotFound/Page404';



const LandingBusinessManagementSoftware = React.lazy(() => import('../pages/BusinessManagementSoftware/LandingBusinessManagementSoftware'));
const LandingAutomateBusinessTasks = React.lazy(() => import('../pages/AutomateBusinessTasks/LandingAutomateBusinessTasks'));
const LandingContactUsIndex = React.lazy(() => import('../pages/ContactUs/LandingContactUsIndex'));
const LandingRefundPolicyIndex = React.lazy(() => import('../pages/RefundPolicy/LandingRefundPolicyIndex'));
const LandingCancellationPolicyIndex = React.lazy(() => import('../pages/CancellationPolicy/LandingCancellationPolicyIndex'));
const LandingPricingPolicyIndex = React.lazy(() => import('../pages/PricingPolicy/LandingPricingPolicyIndex'));
const LandingPrivacyPolicyIndex = React.lazy(() => import('../pages/PrivacyPolicy/LandingPrivacyPolicyIndex'));
const LandingTermsConditionIndex = React.lazy(() => import('../pages/TermsCondition/LandingTermsConditionIndex'));
const UserDashboardIndex = React.lazy(() => import('../pages/UserDashboard/UserDashboardIndex'));
const SetPassword = React.lazy(() => import('../pages/auth/SetPassword'));
const VerifyOtp = React.lazy(() => import('../pages/auth/VerifyOtp'));
const LandingModuleIndex = React.lazy(() => import('../pages/LandingModule/LandingModuleIndex'));
const LandingCartIndex = React.lazy(() => import('../pages/LandingCart/LandingCartIndex'));

const LandingMain = React.lazy(() => import('../LandingMain'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'));

//all admin panel component call
const Dashboard = React.lazy(() => import('../pages/Dashboard'));

const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LandingMain />,
            index: true
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/admin/login',
            element: <AdminLogin />
        },
        {
            path: '/admin-login',
            element: <UserAdminLogin />,
        },
        {
            path: '/verify-otp',
            element: <VerifyOtp />,
        },
        {
            path: '/admin/verify-otp',
            element: <VerifyAdminOtp />,
        },
        {
            path: '/set-password',
            element: <SetPassword />,
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />,
        },
        {
            path: '/admin/forgot-password',
            element: <ForgotAdminPassword />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/thank-you',
            element: <ThankYou />,
        },
        {
            path: '/modules',
            element: <LandingModuleIndex />,
        },
        {
            path: '/cart',
            element: <LandingCartIndex />,
        },
        {
            path: '/admin/reset-password',
            element: <ResetPassword />
        },
        {
            path: '/user-dashboard',
            element: <UserDashboardIndex />
        },
        {
            path: '/terms-condition',
            element: <LandingTermsConditionIndex />
        },
        {
            path: '/privacy-policy',
            element: <LandingPrivacyPolicyIndex />
        },
        {
            path: '/pricing-policy',
            element: <LandingPricingPolicyIndex />
        },
        {
            path: '/cancellation-policy',
            element: <LandingCancellationPolicyIndex />
        },
        {
            path: '/refund-policy',
            element: <LandingRefundPolicyIndex />
        },
        {
            path: '/contact-us',
            element: <LandingContactUsIndex />
        },
        {
            path: '/404',
            element: <Page404 />
        },
        {
            path: '/task-management-software',
            element: <LandingAutomateBusinessTasks />
        },
        {
            path: '/business-management-software',
            element: <LandingBusinessManagementSoftware />
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/admin/dashboard',
                    element: <AdminReport/>
                },
                {
                    path: '/admin/dashboard/plan',
                    element: <AdminPlan/>
                },
                {
                    path: '/admin/dashboard/company',
                    element: <AdminCompany/>
                },
                {
                    path: '/admin/dashboard/module',
                    element: <AdminModule/>
                },
                // {
                //     path: '/admin/dashboard/plan',
                //     element: <Plan/>
                // },
                {
                    path: '/dashboard',
                    element: <Dashboard />
                },
                {
                    path: '/dashboard-task',
                    element: <Dashboardv2 />
                },
                {
                    path: '/dashboard-flow',
                    element: <DashboardFlow />
                },
                {
                    path: '/dashboard-calendar',
                    element: <DashboardCalendar />
                },
                {
                    path: '/employees-kpi',
                    element: <EmployeesKpi />
                },
                {
                    path: '/bottle-neck-report',
                    element: <BottleNeckReport />
                },
                {
                    path: '/my-workflow-task',
                    element: <MyTaskWorkflow />
                },
                {
                    path: '/my-workflow-task-details',
                    element: <MyWorkflowTaskDetails />
                },
                {
                    path: '/my-checklist-task',
                    element: <MyChecklistTask />
                },
                {
                    path: '/my-task-tracker',
                    element: <MyTaskTrackerList />
                },

                {
                    path: '/workflow',
                    element: <TaskManagerWorkflow />
                },
                {
                    path: '/new-workflow-template',
                    element: <NewWorkflowTemplate />
                },
                {
                    path: '/create-new-workflow-task',
                    element: <NewWorkflowTask />
                },
                {
                    path: '/edit-workflow-task',
                    element: <EditWorkflowTask />
                },
                {
                    path: '/checksheet',
                    element: <TaskManagerChecksheet />
                },
                {
                    path: '/add-new-checksheet',
                    element: <AddNewChecksheet />
                },
            ]
        },
        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }
    ]
);

export default router;