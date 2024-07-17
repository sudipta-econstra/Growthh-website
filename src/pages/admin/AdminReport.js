import React, { useState, useEffect } from "react";
import AdminAllCompany from "./AdminAllCompany";
import AdminActiveCompany from './AdminActiveCompany';
import { Tab, Tabs } from "react-bootstrap";
import AdminRejectCompany from "./AdminRejectCompany";
import AdminOrderHistory from "./AdminOrderHistory";
import AdminPurchaseList from "./AdminPurchaseList";

const AdminReport = () => {
    const [activeTab, setActiveTab] = useState("order");

    const handleSelect = (k) => {
        setActiveTab(k);
    };

    return (
        <>
            <Tabs
                activeKey={activeTab}
                onSelect={handleSelect}
                id="process-tab"
                className="gth-rounded-tab"
            >
                <Tab
                    eventKey="order"
                    title={
                        <span className="btn-todo">
                            <i className="fi fi-rr-dot-circle me-1"></i>Order History
                        </span>
                    }
                >
                    <div className="card">
                        <div className="card-body p-0">
                            <AdminOrderHistory activeTab={activeTab}/>
                        </div>
                    </div>
                </Tab>
                <Tab
                    eventKey="purchase"
                    title={
                        <span className="btn-inprogress">
                            <i className="fi fi-rr-process me-1"></i>Purchase List
                        </span>
                    }
                >
                    <div className="card">
                        <div className="card-body p-0">
                            <AdminPurchaseList activeTab={activeTab}/>
                        </div>
                    </div>
                </Tab>
                
            </Tabs>
        </>
    );
};

export default AdminReport;