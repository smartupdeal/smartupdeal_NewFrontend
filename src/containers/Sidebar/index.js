import React, { useState } from "react";
import { NavItem, NavLink, Nav, Input, Label, Card, CardHeader, CardBody } from "reactstrap";
import { ProSidebarProvider, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import classNames from "classnames";
import Button from "../../components/Common/Button";
import { CloseIcon } from "../../components/Common/Icon";
// import RangeSlider from "../../components/Common/RangeSlider";
import Summary from "../../components/Store/ProductReviews/Summary";
import { Link } from "react-router-dom";

const hoemAutomationArray = [
    "Smart Assistant",
    "Smart Wearables",
    "Smart Lights",
    "Smart Switches",
    "Smart Locks",
    "Sensor & Alarms",
    "Smart Monitoring Camera",
    "Security & Surveillance"
]

const smartAutomationArray = [
    "Smart Healthcare",
    "Smart Cities",
    "Asset Tracking",
    "Remote Management",
    "Energy Management",
    "Process Management",
    "Waste Management"
];

const rateMarks = {
    0: {
        label: (
            <strong>
                5
                <i
                    className='fa fa-star fa-1x'
                    style={{ display: 'contents' }}
                    aria-hidden='true'
                ></i>
            </strong>
        )
    },
    20: {
        label: (
            <strong>
                4<i className='fa fa-star fa-1x' aria-hidden='true'></i>
            </strong>
        )
    },
    40: {
        label: (
            <strong>
                3<i className='fa fa-star fa-1x' aria-hidden='true'></i>
            </strong>
        )
    },
    60: {
        label: (
            <strong>
                2<i className='fa fa-star fa-1x' aria-hidden='true'></i>
            </strong>
        )
    },
    80: {
        label: (
            <strong>
                1<i className='fa fa-star fa-1x' aria-hidden='true'></i>
            </strong>
        )
    },
    100: { label: <strong>Any</strong> }
};

const SideBar = ({ isOpen, toggle,openSidebar,closeSidebar }) => {

    const [showMore, setShoMore] = useState(false);
    const [showMore1, setShoMore1] = useState(false);

    return <div className={classNames("c", { "is-open": isOpen })} style={{ backgroundColor: '#fff', width: '100%', boxShadow: '0px 4px 16px rgb(43 52 69 / 10%)' }}>
        <div className="sidebar-header-top">
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '10%'
            }}>Categories</h1>
            {openSidebar && (
                <Button className="close_button" borderless variant='empty' ariaLabel='close the menu' icon={<CloseIcon />} onClick={closeSidebar} />
            )}
        </div>
        <div className="side-menu" style={{ marginLeft: '5%' }}>
            <ProSidebarProvider>
                <Menu>
                    <MenuItem> Use-Cases </MenuItem>
                    <SubMenu label="Smart Home Automation">
                        {hoemAutomationArray.slice(0, showMore ? hoemAutomationArray.length : 3).map((data, index) => {
                            return <MenuItem key={index}>{data}</MenuItem>
                        })}
                        <a style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '10px', marginRight: '10%' }} onClick={() => setShoMore(!showMore)}><span style={{ color: 'blue' }}>{showMore ? "Show Less" : "Show More"}</span></a>
                    </SubMenu>
                    <MenuItem> Smart Office Automation</MenuItem>
                    {showMore1 && <div>
                        <MenuItem> Smart Retail Automation</MenuItem>
                        <MenuItem> Smart Hotel Automation</MenuItem>
                        <MenuItem> Smart Building Automation</MenuItem>
                        <MenuItem> Smart Industrial Automation</MenuItem>
                        <SubMenu label="Smart Class Automation">
                            {smartAutomationArray.slice(0, showMore ? smartAutomationArray.length : 3).map((data, index) => {
                                return <MenuItem key={index}>{data}</MenuItem>
                            })}
                            <a style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '10px', marginRight: '10%' }} onClick={() => setShoMore(!showMore)}><span style={{ color: 'blue' }}>{showMore ? "Show Less" : "Show More"}</span></a>
                        </SubMenu>
                    </div>}
                    <a style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '10px', marginRight: '10%' }} onClick={() => setShoMore1(!showMore1)}><span style={{ color: 'blue' }}>{showMore1 ? "Show Less" : "Show More"}</span></a>

                </Menu>
            </ProSidebarProvider>
        </div>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '10%'
            }}>Price</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Input type="number" name="number" id="startRange" placeholder="Start range" style={{ width: '35%', padding: '15px', border: '1px solid black', borderRadius: '10px' }} />
            {/* <i class="fa fa-minus" aria-hidden="true" style={{paddingTop:'5%'}}></i> */}

            <Input type="number" name="number" id="startRange" placeholder="End range" style={{ width: '35%', padding: '15px', border: '1px solid black', borderRadius: '10px' }} />
        </div>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '10%'
            }}>Refine</h1>
        </div>
        <div style={{ marginLeft: '20%' }}>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    All
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    On Sale
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Featured
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    New Arrivals
                </Label>

            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Best Sellers
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Most Popular
                </Label>
            </div>
        </div>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '10%'
            }}>Deal Type</h1>
        </div>
        <div style={{ marginLeft: '20%' }}>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    All
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Live
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Session
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Direct
                </Label>

            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Auction
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Deep Discount
                </Label>
            </div>
        </div>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '10%'
            }}>Solution</h1>
        </div>
        <div style={{ marginLeft: '20%' }}>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    All
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Product
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Service
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Apps
                </Label>

            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Training
                </Label>
            </div>
            <div>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Event
                </Label>
            </div>
        </div>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h1 style={{
                marginBottom: '10px',
                marginTop: '0px',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '1.5',
                textTransform: 'none',
                whiteSpace: 'normal',
                marginLeft: '5%'
            }}>Ratings</h1>
        </div>
        <div style={{ marginLeft: '10%', marginTop: '10%', paddingBottom: '10%', marginRight: '5%' }}>
            <div className='mx-2 mb-4'>
                {/* <RangeSlider
                    type='slider'
                    marks={rateMarks}
                    step={20}
                    defaultValue={100}
                    onChange={v => {
                        filterProducts('rating', rating(v));
                    }}
                /> */}
            </div>
        </div>
    </div>
};


export default SideBar;
