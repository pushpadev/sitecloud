import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { makeStyles } from '@mui/styles';
import IosShareIcon from '@mui/icons-material/IosShare';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { MENUBAR_WIDTH } from "../constant";
import axios from "axios";


const useStyles = makeStyles({
    root: {
        // margin: 2,
        // backgroundColor: '#FAFAFA;',
        // width: `calc(100vw - ${MENUBAR_WIDTH}px)`
    },
});
const AttendanceTable = () => {
    const classes = useStyles();

    const [loader, setLoader] = useState(true);
    const [tableVisiable, setTableVisiable] = useState(false);

    const [liveAttendenceData, setLiveAttendenceData] = useState([]);

    const getLiveAttendenceDatas = async () => {
        try {
            const responseview = await axios.get(
                "https://run.mocky.io/v3/d27c5795-ba97-4c1e-b323-de279404a3bc"
            );
            setLiveAttendenceData(responseview.data);
            console.log("list", responseview.data);
            if (responseview) {
                setLoader(false);
                setTableVisiable(true);
            }
        } catch (error) {
            console.log("list", error);
        }
    }

    useEffect(() => {
        getLiveAttendenceDatas();
    }, [])

    return (
        <>
            {
                loader &&
                <h1>Loading...</h1>
            }

            {
                tableVisiable &&
                <>

                    <section className={classes.root}>
                        <div className='attendence_table'>
                            <Table borderless responsive>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Company Name</th>
                                        <th>Worker/Visitor</th>
                                        <th>Inducted</th>
                                        <th>Daily Prestart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liveAttendenceData.map((e) => {


                                        return (
                                            <>
                                                <tr key={e.id}>
                                                    <td >
                                                        <img src={e.image} alt="user_img" className='table_user_avatar' />

                                                        <div className='attendance_username'> {e.name}</div>
                                                    </td>
                                                    <td className='attendance_companyName'> {e.company} </td>
                                                    <td className='worker_visitor'>{e.worker}</td>
                                                    <td>
                                                        {
                                                            e.inducted_status == "active" ?
                                                                <div className=' inactive_indicator'></div>
                                                                :
                                                                <div className='active_indicator'></div>
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            e.daily_prestart == "active" ?
                                                                <div className=' inactive_indicator'></div>
                                                                :
                                                                <div className='active_indicator'></div>
                                                        }

                                                    </td>

                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </Table>
                            {/* <div className="share_icon_btn">
                                <Button variant="primary">
                                    <SendRoundedIcon />
                                </Button>
                            </div>
                            <div className="download_icon_btn">
                                <Button variant="primary">
                                    <IosShareIcon />
                                </Button>
                            </div> */}
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default AttendanceTable
