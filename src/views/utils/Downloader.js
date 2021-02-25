import { Button, Col } from 'antd'
import React from 'react'
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function Downloader({realLink}) {

    const handleSaveClick = () => {
        const varUA = navigator.userAgent.toLowerCase();
        if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
            html2canvas(document.querySelector('.checker'), {
                onrendered: function (canvas) {
                    let a = document.createElement('a');
                    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")
                    a.download = `character${realLink ? "_result" : "_table"}.png`;
                    a.click();
                }
            })
        } else {
            domtoimage.toJpeg(document.querySelector('.checker'), { quality: 1 })
            .then(function (dataUrl) {
               var link = document.createElement('a');
               link.download = `character${realLink ? "_result" : "_table"}.png`;
               link.href = dataUrl;
               link.click();
           });
        }
    }

    return (
        <Col xs={9} md={4} style={{marginBottom: "10px"}}>
            <div className="buttonbar">
                <Button type="primary" onClick={handleSaveClick} style={{margin:"1rem auto"}}>Download</Button>
            </div>
        </Col>
    )
}

export default Downloader
