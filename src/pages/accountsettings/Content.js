import React from "react";
import "./Content.css";
import Divider from "@mui/material/Divider";

function Content() {
  return (
    <>
      <div className="d-flex contentdiv">
        {/* <div>
        <img src="https://img.icons8.com/external-soft-fill-juicy-fish/50/000000/external-mountain-graphs-and-charts-soft-fill-soft-fill-juicy-fish.png" />
      </div> */}
        <div>
          <img
            className="mainlogo"
            alt="tutor"
            src="https://img.icons8.com/external-soft-fill-juicy-fish/70/000000/external-mountain-graphs-and-charts-soft-fill-soft-fill-juicy-fish.png"
          />
        </div>
        <div className="d-flex flex-column align-items-start w-100 mt-2">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex">
              <div>
                <h4 className="pl-5">
                  Hi Daniel Ricciardo <small>New Australian Construction</small>
                </h4>
              </div>
            </div>
            <small className="bluetext">Edit Basic Info</small>
          </div>
          <h6 className="pl-5">1256 william st,Sydney,NSW 2001</h6>
          <h6 className="pl-5">companymail@nacc.com</h6>
        </div>
      </div>
      <div className="contentdiv">
        <div>
          <h4>Subscription plan</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small>Current plan</small>
            <h6>Gold Membership</h6>
          </div>
          <div>
            <small className="bluetext">Change plan</small>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small>Card Info</small>
            <h6>**** **** **** 2147</h6>
          </div>
          <div>
            <small className="bluetext">Edit Card Info</small>
          </div>
        </div>
        <Divider />
        <small className="bluetext">+ Add New Payment Method</small>
      </div>
      <div className="contentdiv">
        <div>
          <h4>Transaction History</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small>12 Aug 2021</small>
            <h6>
              #5678326589 <span>-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small>12 Aug 2021</small>
            <h6>
              #5678326589 <span>-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small>12 Aug 2021</small>
            <h6>
              #5678326589 <span className="ml-5">-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small>12 Aug 2021</small>
            <h6>
              #5678326589 <span className="ml-5">-Monthly Charges</span>
            </h6>
          </div>
        </div>
      </div>
      <div className="contentdiv">
        <div>
          <h4>Need Help ?</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small>Customer Support Number</small>
            <h6>+1 14384 13135</h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small>Customer Support Email</small>
            <h6>gethelp@company.com</h6>
          </div>
        </div>
        <div className="mt-3 contentdiv">
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary">change pasword</button>
            <button className="btn btn-outline-primary">Log out</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
