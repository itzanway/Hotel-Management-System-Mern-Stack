import React, { useState } from 'react';
import axios from 'axios';
import './payment.css'; // Assuming you have your CSS in a file named Home.css

export default function RoomBookings() {
    const [formVisible, setFormVisible] = useState(true);
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const [qrCodeSrc, setQrCodeSrc] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const generateQR = () => {
        setFormVisible(false);
        setQrCodeVisible(true);
        const link = "upi://pay?pa=a.r.rathore0407@okaxis%26am=1%26tn=" + number;
        const upi = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + link;
        setQrCodeSrc(upi);
    };

    const downloadNow = () => {
        if (number !== "" && name !== "" && email !== "" && id !== "") {
            axios.post("back.php", { name: name, num: number, email: email, id: id })
                .then(res => {
                    // Handle the response here
                    if (res.data.success) { // Assuming the response has a 'success' property
                        alert('Download successful!');
                    } else {
                        alert('Download failed. Please try again.');
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('An error occurred. Please try again.');
                });
        } else {
            alert("Fill all fields correctly");
        }
    };

    return (
        <section className='pay'>
            <h1>Payment</h1>
            {formVisible && (
                <div className="form">
                    <div className="flex m20">
                        <label>Full Name*</label>
                        <input type="text" name="name" placeholder="Full Name" className="m10 name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex m20">
                        <label>Number(With ISD)*</label>
                        <input type="text" name="phone" placeholder="Ex- +919064973840" className="m10 number" onChange={(e) => setNumber(e.target.value)} />
                    </div>
                    <div className="flex m20">
                        <label>Email*</label>
                        <input type="email" name="email" placeholder="Email" className="m10 email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex m20">
                        <button className="generate_qr next-download" onClick={generateQR}>NEXT</button>
                    </div>
                </div>
            )}
            {qrCodeVisible && (
                <div className="qr_code m20">
                    <p>Scan the QR Code with any UPI App and pay the amount then download the source code.</p>
                    <center><img src={qrCodeSrc} alt="QR CODE" className="get_qr m10" /></center>
                    <div className="flex m20">
                        <label>UTR/REFERENCE/TRANSACTION ID**</label>
                        <input type="number" name="email" placeholder="UTR/REFERENCE/TRANSACTION ID**" className="m10 id" onChange={(e) => setId(e.target.value)} />
                    </div>
                    <button className="download_now m20 next-download" onClick={downloadNow}>Download Now</button>
                </div>
            )}
        </section>
    );
}
