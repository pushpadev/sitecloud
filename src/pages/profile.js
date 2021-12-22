import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router';

import { Row, Col, Input, Button } from "antd";
const Profile = () => {
    let navigate = useNavigate();

    return (
        <React.Fragment>
            {/*Setting page starts*/}
            <div className="figma_font">
                <section className="background_color  p-3 ">
                    {/*address block*/}
                    <div className="setting_address_body mb-3  shadow-lg">
                        <div className="flex">
                            <div className="w-1/12 p-2"><svg width="63" height="68" viewBox="0 0 63 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.2616 3.62182C31.9771 3.62164 32.6803 3.80116 33.2999 4.14233L57.4668 17.4462C58.0866 17.7874 58.601 18.2781 58.9588 18.869C59.3165 19.4599 59.505 20.1302 59.505 20.8125V47.4203C59.505 48.1025 59.3165 48.7728 58.9588 49.3638C58.601 49.9545 58.0866 50.4453 57.4668 50.7864L33.2999 64.0903C32.68 64.4314 31.9771 64.6111 31.2615 64.6111C30.5459 64.6111 29.8429 64.4314 29.2231 64.0903L5.05621 50.7864C4.4365 50.4453 3.92188 49.9545 3.56411 49.3638C3.20633 48.7728 3.01798 48.1025 3.018 47.4203V20.8125C3.01799 20.1302 3.20633 19.4599 3.56411 18.869C3.92191 18.2781 4.4365 17.7874 5.05621 17.4462L29.2231 4.14233C29.8429 3.80119 30.546 3.62167 31.2616 3.62182ZM31.2616 0.744202C30.0164 0.744665 28.7931 1.05721 27.7144 1.65051L3.54721 14.9544C2.47006 15.5496 1.57556 16.4038 0.953087 17.4318C0.33062 18.4598 0.00197781 19.6255 0 20.8125V47.4203C0.00204146 48.6074 0.330749 49.7733 0.95327 50.8011C1.57579 51.8292 2.47034 52.6833 3.54753 53.2785L27.7144 66.5824C28.793 67.1761 30.0163 67.4884 31.2616 67.4884C32.507 67.4884 33.7303 67.1761 34.8089 66.5824L58.9758 53.2785C60.0531 52.6836 60.9479 51.8292 61.5706 50.8014C62.1932 49.7733 62.522 48.6074 62.5242 47.4203V20.8125C62.5223 19.6255 62.1936 18.4598 61.5712 17.4318C60.9485 16.4038 60.054 15.5496 58.977 14.9544L34.8101 1.65051C33.7315 1.05725 32.5082 0.744708 31.2629 0.744202H31.2616Z" fill="url(#paint0_linear_317_2966)" />
                                <defs>
                                    <linearGradient id="paint0_linear_317_2966" x1="31.2621" y1="67.4884" x2="31.2621" y2="0.744202" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B0D8BC" />
                                        <stop offset="0.5" stop-color="#56C3E6" />
                                        <stop offset="0.996" stop-color="#4C99D4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            </div>
                            <div className="w-9/12 p-3">
                                <p className="setting_address_h1">Hi Daniel Ricciardo<span className="setting_address_h2 pl-3">New Australian Construction Company LLC</span></p>
                                <div className="flex">
                                    <div><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.99665 0.767853C12.2277 0.767853 15.6574 4.1975 15.6574 8.42857C15.6574 11.6657 13.3827 15.1936 8.89237 19.0499C8.64268 19.2643 8.32434 19.3821 7.99518 19.3819C7.66602 19.3816 7.34789 19.2632 7.09858 19.0483L6.80158 18.7906C2.51001 15.0349 0.335938 11.5934 0.335938 8.42857C0.335938 4.1975 3.76558 0.767853 7.99665 0.767853ZM7.99665 5.48214C7.21521 5.48214 6.46577 5.79256 5.91321 6.34513C5.36065 6.89769 5.05022 7.64713 5.05022 8.42857C5.05022 9.21001 5.36065 9.95944 5.91321 10.512C6.46577 11.0646 7.21521 11.375 7.99665 11.375C8.77809 11.375 9.52753 11.0646 10.0801 10.512C10.6327 9.95944 10.9431 9.21001 10.9431 8.42857C10.9431 7.64713 10.6327 6.89769 10.0801 6.34513C9.52753 5.79256 8.77809 5.48214 7.99665 5.48214Z" fill="#33323D" />
                                    </svg>
                                    </div>
                                    <div> <p className="setting_address_h3 pl-5">1256 William St, Sydney, NSW 2001</p></div>
                                </div>
                                <div className="flex pt-1">
                                    <div><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.8307 0.333344H3.16406C2.50102 0.333344 1.86514 0.596736 1.3963 1.06558C0.927455 1.53442 0.664063 2.1703 0.664062 2.83334V11.1667C0.664063 11.8297 0.927455 12.4656 1.3963 12.9344C1.86514 13.4033 2.50102 13.6667 3.16406 13.6667H14.8307C15.4938 13.6667 16.1297 13.4033 16.5985 12.9344C17.0673 12.4656 17.3307 11.8297 17.3307 11.1667V2.83334C17.3307 2.1703 17.0673 1.53442 16.5985 1.06558C16.1297 0.596736 15.4938 0.333344 14.8307 0.333344ZM14.2724 2.00001L8.9974 5.95834L3.7224 2.00001H14.2724ZM14.8307 12H3.16406C2.94305 12 2.73109 11.9122 2.57481 11.7559C2.41853 11.5997 2.33073 11.3877 2.33073 11.1667V3.04168L8.4974 7.66668C8.64164 7.77486 8.81709 7.83334 8.9974 7.83334C9.17771 7.83334 9.35315 7.77486 9.4974 7.66668L15.6641 3.04168V11.1667C15.6641 11.3877 15.5763 11.5997 15.42 11.7559C15.2637 11.9122 15.0517 12 14.8307 12Z" fill="#33323D" />
                                    </svg>

                                    </div>
                                    <div>  <p className="setting_address_h4 pl-5">companymail@nacc.com</p></div>
                                </div>


                            </div>

                            <div className="w-2/12 p-3">
                                <div className="flex">
                                    <div><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.75 1.91666C13.0815 1.58514 13.5312 1.3989 14 1.3989C14.2321 1.3989 14.462 1.44462 14.6765 1.53346C14.891 1.6223 15.0858 1.75251 15.25 1.91666C15.4142 2.08081 15.5444 2.27569 15.6332 2.49017C15.722 2.70464 15.7678 2.93452 15.7678 3.16666C15.7678 3.39881 15.722 3.62868 15.6332 3.84316C15.5444 4.05763 15.4142 4.25251 15.25 4.41666L4.83333 14.8333L1.5 15.6667L2.33333 12.3333L12.75 1.91666Z" stroke="#1875F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></div>
                                    <div className="setting_address_editor pl-5"><p >Edit Basic Info</p></div>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/*subcription plan block*/}
                    <div className="subricption_plan_body mb-3 shadow-lg ">
                        <p className="subricption_plan_h1">Subscription plan</p>
                        <p className="subricption_plan_label pt-2">Current Plan</p>
                        <div className="flex pt-4">
                            <div className="w-10/12 flex">
                                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 10H6" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 6H3" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 14H3" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 18H6" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg></div>
                                <div><p className="setting_address_h3 pl-5">Gold Membership</p></div>

                            </div>
                            <div className="w-2/12 p-3">
                                <div className="flex">
                                    <div><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.75 1.91666C13.0815 1.58514 13.5312 1.3989 14 1.3989C14.2321 1.3989 14.462 1.44462 14.6765 1.53346C14.891 1.6223 15.0858 1.75251 15.25 1.91666C15.4142 2.08081 15.5444 2.27569 15.6332 2.49017C15.722 2.70464 15.7678 2.93452 15.7678 3.16666C15.7678 3.39881 15.722 3.62868 15.6332 3.84316C15.5444 4.05763 15.4142 4.25251 15.25 4.41666L4.83333 14.8333L1.5 15.6667L2.33333 12.3333L12.75 1.91666Z" stroke="#1875F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></div>
                                    <div className="setting_address_editor pl-5"><p >Change Plan</p></div>
                                </div>

                            </div>
                        </div>
                        <hr></hr>
                        <p className="subricption_plan_label pt-6">Card Info</p>
                        <div className="flex">
                            <div className="w-10/12 flex pt-4">
                                <div><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.75 1H2.25C1.42157 1 0.75 1.67157 0.75 2.5V11.5C0.75 12.3284 1.42157 13 2.25 13H15.75C16.5784 13 17.25 12.3284 17.25 11.5V2.5C17.25 1.67157 16.5784 1 15.75 1Z" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                </div>
                                <div ><p className="setting_address_h3 pl-5">****  -  ****  -  ****  -  2147</p></div>

                            </div>
                            <div className="w-2/12 p-3">
                                <div className="flex">
                                    <div><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.75 1.91666C13.0815 1.58514 13.5312 1.3989 14 1.3989C14.2321 1.3989 14.462 1.44462 14.6765 1.53346C14.891 1.6223 15.0858 1.75251 15.25 1.91666C15.4142 2.08081 15.5444 2.27569 15.6332 2.49017C15.722 2.70464 15.7678 2.93452 15.7678 3.16666C15.7678 3.39881 15.722 3.62868 15.6332 3.84316C15.5444 4.05763 15.4142 4.25251 15.25 4.41666L4.83333 14.8333L1.5 15.6667L2.33333 12.3333L12.75 1.91666Z" stroke="#1875F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></div>
                                    <div className="setting_address_editor pl-5"><p >Edit Card Info</p></div>
                                </div>

                            </div>
                        </div>
                        <hr></hr>
                        <p className="setting_address_editor pt-6">+ &nbsp;&nbsp;Add New Payment Method</p>
                    </div>
                    {/*transction history block*/}
                    <div className="transction_history_body mb-3 shadow-lg">
                        <p className="subricption_plan_h1">Transaction History</p>
                        <div>
                            <p className="subricption_plan_label pt-3">12 Aug 2021</p>
                            <div className="flex pt-5">
                                <div className="w-1/12 ">
                                    <p className="setting_address_h3 ">#534864343 </p>
                                </div>
                                <div className="w-11/12"><p className="setting_address_h3 pl-10">-Monthly Charges</p></div>
                            </div>
                            <hr></hr>
                        </div>
                        <div>
                            <p className="subricption_plan_label pt-5">12 July 2021</p>
                            <div className="flex pt-5">
                                <div className="w-1/12 ">
                                    <p className="setting_address_h3 ">#534864343 </p>
                                </div>
                                <div className="w-11/12"><p className="setting_address_h3 pl-10">-Monthly Charges</p></div>
                            </div>
                            <hr></hr>
                        </div>
                        <div>
                            <p className="subricption_plan_label pt-5">12 June 2021</p>
                            <div className="flex pt-5">
                                <div className="w-1/12 ">
                                    <p className="setting_address_h3 ">#534864343 </p>
                                </div>
                                <div className="w-11/12"><p className="setting_address_h3 pl-10">-Monthly Charges</p></div>
                            </div>
                            <hr></hr>
                        </div>
                        <div>
                            <p className="subricption_plan_label pt-5">12 Mayg 2021</p>
                            <div className="flex pt-5">
                                <div className="w-1/12 ">
                                    <p className="setting_address_h3 ">#534864343 </p>
                                </div>
                                <div className="w-11/12"><p className="setting_address_h3 pl-10">-Monthly Charges</p></div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                    {/*Need help block*/}
                    <div className="need_help_body mb-3 shadow-lg ">
                        <p className="subricption_plan_h1">Need Help ?</p>
                        <div>
                            <p className="subricption_plan_label pt-3">Customer Support Number</p>
                            <div className="flex pt-5">
                                <div ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2895 3.75C12.0221 3.89292 12.6953 4.25119 13.2231 4.77895C13.7508 5.30671 14.1091 5.97995 14.252 6.7125M11.2895 0.75C12.8115 0.919077 14.2307 1.60063 15.3142 2.68276C16.3977 3.76488 17.081 5.18326 17.252 6.705M16.502 12.69V14.94C16.5029 15.1489 16.4601 15.3556 16.3764 15.547C16.2927 15.7384 16.17 15.9102 16.0161 16.0514C15.8622 16.1926 15.6805 16.3001 15.4826 16.367C15.2847 16.4339 15.0751 16.4588 14.867 16.44C12.5592 16.1892 10.3423 15.4006 8.39452 14.1375C6.5824 12.986 5.04603 11.4496 3.89453 9.6375C2.62701 7.6809 1.83821 5.45325 1.59203 3.135C1.57328 2.9276 1.59793 2.71857 1.6644 2.52122C1.73087 2.32387 1.8377 2.14252 1.9781 1.98872C2.1185 1.83491 2.28938 1.71203 2.47987 1.62789C2.67036 1.54375 2.87628 1.5002 3.08453 1.5H5.33453C5.6985 1.49642 6.05137 1.62531 6.32735 1.86265C6.60332 2.09999 6.78358 2.42959 6.83452 2.79C6.92949 3.51005 7.10561 4.21705 7.35953 4.8975C7.46043 5.16594 7.48227 5.45769 7.42246 5.73816C7.36264 6.01863 7.22367 6.27608 7.02202 6.48L6.06953 7.4325C7.13719 9.31016 8.69187 10.8648 10.5695 11.9325L11.522 10.98C11.7259 10.7784 11.9834 10.6394 12.2639 10.5796C12.5443 10.5198 12.8361 10.5416 13.1045 10.6425C13.785 10.8964 14.492 11.0725 15.212 11.1675C15.5763 11.2189 15.9091 11.4024 16.1469 11.6831C16.3848 11.9638 16.5112 12.3222 16.502 12.69Z" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                </div>
                                <div ><p className="setting_address_h3 pl-5">+1 14384 13135</p></div>
                            </div>
                            <hr></hr>
                        </div>
                        <div>
                            <p className="subricption_plan_label pt-6">Customer Support Number</p>
                            <div className="flex pt-5">
                                <div ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2895 3.75C12.0221 3.89292 12.6953 4.25119 13.2231 4.77895C13.7508 5.30671 14.1091 5.97995 14.252 6.7125M11.2895 0.75C12.8115 0.919077 14.2307 1.60063 15.3142 2.68276C16.3977 3.76488 17.081 5.18326 17.252 6.705M16.502 12.69V14.94C16.5029 15.1489 16.4601 15.3556 16.3764 15.547C16.2927 15.7384 16.17 15.9102 16.0161 16.0514C15.8622 16.1926 15.6805 16.3001 15.4826 16.367C15.2847 16.4339 15.0751 16.4588 14.867 16.44C12.5592 16.1892 10.3423 15.4006 8.39452 14.1375C6.5824 12.986 5.04603 11.4496 3.89453 9.6375C2.62701 7.6809 1.83821 5.45325 1.59203 3.135C1.57328 2.9276 1.59793 2.71857 1.6644 2.52122C1.73087 2.32387 1.8377 2.14252 1.9781 1.98872C2.1185 1.83491 2.28938 1.71203 2.47987 1.62789C2.67036 1.54375 2.87628 1.5002 3.08453 1.5H5.33453C5.6985 1.49642 6.05137 1.62531 6.32735 1.86265C6.60332 2.09999 6.78358 2.42959 6.83452 2.79C6.92949 3.51005 7.10561 4.21705 7.35953 4.8975C7.46043 5.16594 7.48227 5.45769 7.42246 5.73816C7.36264 6.01863 7.22367 6.27608 7.02202 6.48L6.06953 7.4325C7.13719 9.31016 8.69187 10.8648 10.5695 11.9325L11.522 10.98C11.7259 10.7784 11.9834 10.6394 12.2639 10.5796C12.5443 10.5198 12.8361 10.5416 13.1045 10.6425C13.785 10.8964 14.492 11.0725 15.212 11.1675C15.5763 11.2189 15.9091 11.4024 16.1469 11.6831C16.3848 11.9638 16.5112 12.3222 16.502 12.69Z" stroke="#33323D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                </div>
                                <div ><p className="setting_address_h3 pl-5">+1 14384 13135</p></div>
                            </div>
                          
                        </div>
                    </div>
                    {/* change password and logut button area*/}
                    <div className="flex p-3">
                        <div className="w-2/12 setting_btn"><button className="setting_btn_text p-3">Change Password</button></div>
                        <div className="w-10/12"></div>
                        <div className="w-2/12 setting_btn"><button className="setting_btn_text py-3 px-12">Logout</button></div>
                    </div>

                </section>
            </div>
            {/*Setting page ends*/}
            {/* Edit Basic Information card starts */}
            <div className="figma_font">
                <section className="p-3 px-20">
                    <div className="edit_basic_body shadow-2xl py-10 px-20">

                        <div className="  flex flex-col justify-center items-center ">
                            <p className="edit_basic_h1">Edit Basic Information</p>
                            <div className="edit_basic_hlogo flex pt-24 pb-12">
                                <div>Change Company logo</div>
                            </div>

                        </div>
                        <hr></hr>

                        <div className="input_container pt-8">
                            <label className="form_label ">Account Name</label>
                            <div className="pt-3">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;Daniel Ricciardo"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="input_container pt-3">
                            <label className="form_label ">Company Address</label>
                            <div className="pt-3 ">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;1256 William St, Sydney, NSW 2001"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="pt-6 flex text-center">
                            <div className="w-1/2 "><button className="edit_basic_cancel_bt pt-3">Cancel</button></div>
                            <div className="w-1/2 "><div className="edit_basic_save_bt"><button className="edit_basic_save-text pt-3">Save</button></div></div>

                        </div>


                    </div>
                </section>
            </div>
            {/* Edit Basic Information card ends */}

            {/* Edit Card Information card starts */}
            <div className="figma_font">
                <section className="p-3 px-20">
                    <div className="edit_card_body shadow-2xl py-10 px-20">

                        <div className="  flex flex-col justify-center items-center ">
                            <p className="edit_card_h1">Edit Card Information</p>
                        </div>
                        <div className="input_container pt-9">
                            <label className="form_label ">Card number</label>
                            <div className="pt-3">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;1338  -  9583  -  9446  - 6436"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="input_container pt-3">
                            <label className="form_label ">Expiry Date</label>
                            <div className="pt-3 ">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;09-26"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="input_container pt-3">
                            <label className="form_label ">Name on Card</label>
                            <div className="pt-3 ">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;Ricardo"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="pt-6 flex text-center">
                            <div className="w-1/2 "><button className="edit_basic_cancel_bt pt-3">Cancel</button></div>
                            <div className="w-1/2 "><div className="edit_basic_save_bt"><button className="edit_basic_save-text pt-3">Save</button></div></div>

                        </div>


                    </div>
                </section>
            </div>
            {/* Edit Card Information card ends */}

            {/* Change password card starts */}
            <div className="figma_font">
                <section className="p-3 px-20">
                    <div className="change_password_body shadow-2xl py-10 px-20">

                        <div className="  flex flex-col justify-center items-center ">
                            <p className="edit_card_h1">Change Password</p>
                        </div>
                        <div className="input_container pt-9">
                            <label className="form_label ">Enter Current Password</label>
                            <div className="pt-3">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;********"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="input_container pt-3">
                            <label className="form_label ">Enter New Password</label>
                            <div className="pt-3 ">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;************"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="input_container pt-3">
                            <label className="form_label ">Enter New Password</label>
                            <div className="pt-3 ">
                                <Input
                                    placeholder="&nbsp;&nbsp;&nbsp;************"
                                    className="edit_basic_border "
                                /></div>
                        </div>
                        <div className="pt-6 flex text-center">
                            <div className="w-1/2 "><button className="edit_basic_cancel_bt pt-3">Cancel</button></div>
                            <div className="w-1/2 "><div className="edit_basic_save_bt"><button className="edit_basic_save-text pt-3">Save</button></div></div>

                        </div>


                    </div>
                </section>
            </div>
            {/* Change password card ends */}

        </React.Fragment>
    )
}

export default Profile;

