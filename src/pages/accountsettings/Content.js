import React from "react";
import "./Content.css";
import Divider from "@mui/material/Divider";

function Content() {
  return (
    <>
      <div className="d-flex contentdiv">
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
                <h4 className="pl-5 contentheading">
                  Hi Daniel Ricciardo{" "}
                  <small className="companyname">
                    New Australian Construction
                  </small>
                </h4>
              </div>
            </div>
            <small className="bluetext">
              <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/20/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-2.png" />
              Edit Basic Info
            </small>
          </div>
          <h6 className="pl-5 contentdetail">
            <img src="https://img.icons8.com/material-sharp/20/000000/marker.png" />
            1256 william st,Sydney,NSW 2001
          </h6>
          <h6 className="pl-5 contentdetail">
            <img src="https://img.icons8.com/material-outlined/20/000000/mail.png" />
            companymail@nacc.com
          </h6>
        </div>
      </div>
      <div className="contentdiv">
        <div>
          <h4 className="contentheading">Subscription plan</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">Current plan</small>
            <h6 className="contentdetail mt-2">
              <img src="https://img.icons8.com/ios-glyphs/20/000000/align-center.png" />
              Gold Membership
            </h6>
          </div>
          <div>
            <small className="bluetext">
              <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/20/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-2.png" />
              Change plan
            </small>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">Card Info</small>
            <h6 className="contentdetail mt-2">
              <img src="https://img.icons8.com/material-outlined/24/000000/bank-card-back-side.png" />
              **** **** **** 2147
            </h6>
          </div>
          <div>
            <small className="bluetext">
              <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/20/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-2.png" />
              Edit Card Info
            </small>
          </div>
        </div>
        <Divider />
        <small className="bluetext mt-2">+ Add New Payment Method</small>
      </div>
      <div className="contentdiv">
        <div>
          <h4 className="contentheading">Transaction History</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">12 Aug 2021</small>
            <h6 className="contentdetail mt-2">
              #5678326589 <span className="charges">-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">12 Aug 2021</small>
            <h6 className="contentdetail mt-2">
              #5678326589 <span className="charges">-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">12 Aug 2021</small>
            <h6 className="contentdetail mt-2">
              #5678326589 <span className="charges">-Monthly Charges</span>
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">12 Aug 2021</small>
            <h6 className="contentdetail mt-2">
              #5678326589 <span className="charges">-Monthly Charges</span>
            </h6>
          </div>
        </div>
      </div>
      <div className="contentdiv">
        <div>
          <h4 className="contentheading">Need Help ?</h4>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">Customer Support Number</small>
            <h6 className="contentdetail mt-2">
              <img src="https://img.icons8.com/external-those-icons-fill-those-icons/20/000000/external-call-mobile-telephone-those-icons-fill-those-icons.png" />
              +1 14384 13135
            </h6>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between">
          <div>
            <small className="contentsubheading">Customer Support Email</small>
            <h6 className="contentdetail mt-2">
              <img src="https://img.icons8.com/material-outlined/20/000000/mail.png" />
              gethelp@company.com
            </h6>
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
