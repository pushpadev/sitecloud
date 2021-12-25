import React from "react";
import { Row, Col } from "react-bootstrap"
import { MENUBAR_WIDTH } from "../constant";
import { useNavigate } from "react-router-dom";
import { makeStyles, withStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        // margin: 2,
        backgroundColor: '#FAFAFA;',
        width: `calc(100vw - ${MENUBAR_WIDTH}px)`
    },
});



const MarkerMap = () => {
    const classes = useStyles();


    return (
        <section className={classes.root}>
            <div
                containerStyle={{
                    width: `calc(100vw - ${MENUBAR_WIDTH}px)`
                }}
            >

                <div className="attendence_details">
                    <h2>Site Attendence: Melbourne F1 Track</h2>
                    <address>Address: 12 Aughtie Dr, Albert Park VIC 3206, Australia
                    </address>
                    <div className="mt-4 site_detail">
                        {/* */}
                        <div class="d-flex bd-highlight">
                            <div class="flex-fill bd-highlight">
                                <span >
                                    <b>214</b>
                                    <br />
                                    <small>

                                        People on site
                                    </small>
                                </span>
                            </div>
                            <div class="flex-fill bd-highlight worker_detail">
                                <span >
                                    <b>199</b>
                                    <br />
                                    <small>

                                        Workers
                                    </small>
                                </span>
                            </div>
                            <div class="flex-fill bd-highlight visitors_detail">
                                <span>
                                    <b>15</b>
                                    <br />
                                    <small>

                                        Visitors
                                    </small>
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3">
                        <span className="worker_progress progress_bar">

                        </span>
                        <span className="visiter_progress progress_bar">

                        </span>

                    </div>
                </div>
            </div>

        </section>
    );
}

export default MarkerMap;
