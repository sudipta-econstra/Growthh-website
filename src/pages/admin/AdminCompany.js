import React, { useState, useEffect } from "react";
import AdminAllCompany from "./AdminAllCompany";
import AdminActiveCompany from './AdminActiveCompany';
import { Tab, Tabs } from "react-bootstrap";
import AdminRejectCompany from "./AdminRejectCompany";

const AdminCompany = () => {
    const [activeTab, setActiveTab] = useState("All");

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
                    eventKey="All"
                    title={
                        <span className="btn-todo">
                            <i className="fi fi-rr-dot-circle me-1"></i>All
                        </span>
                    }
                >
                    <div className="card">
                        <div className="card-body p-0">
                            <AdminAllCompany activeTab={activeTab} />
                        </div>
                    </div>
                </Tab>
                <Tab
                    eventKey="Active"
                    title={
                        <span className="btn-inprogress">
                            <i className="fi fi-rr-process me-1"></i>Active Company
                        </span>
                    }
                >
                    <div className="card">
                        <div className="card-body p-0">
                            <AdminActiveCompany activeTab={activeTab} />
                        </div>
                    </div>
                </Tab>
                <Tab
                    eventKey="Suspended"
                    title={
                        <span className="btn-completed">
                            <i className="fi fi-rs-check-circle me-1"></i>Suspended
                        </span>
                    }
                ><div className="card">
                        <div className="card-body p-0">
                    <AdminRejectCompany activeTab={activeTab} />
                    </div>
                    </div>
                </Tab>
            </Tabs>
        </>
    );
};

export default AdminCompany;