import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'



export default function Addemployee() {

    const [isLoading, setLoading] = useState(false);

    const [empid, setempid] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [emptype, setemptype] = useState("");
    const [nic, setnic] = useState("");
    const [mobile, setmobile] = useState("");
    const [bank, setbank] = useState("");
    const [branch, setbranch] = useState("");
    

    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!empid || !firstname || !lastname || !emptype || !nic || !mobile || !bank || !branch) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                const newDetails = {
                    empid, firstname, lastname, emptype, nic, mobile, bank, branch
                }
                
                const data =  (await axios.post("http://localhost:5000/employees/add", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "New Employee added successfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="content">
            <h3>Add Employee</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">empid</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setempid(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">firstname</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setfirstname(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">lastname</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setlastname(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">emptype</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setemptype(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>Delux</option>
                        <option>Non-Delux</option>
                    </select>
                </div>
               
               
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">nic</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setnic(e.target.value) }} />
                </div>

              

                <br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">mobile</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setmobile(e.target.value) }} />
                </div>
              
               
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">bank</label>
                    <input type="textarea" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbank(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">branch</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbranch(e.target.value) }} />
                </div>

               
                


                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}