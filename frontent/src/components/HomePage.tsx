import React from "react";
import "../styles/HomePage.sass";

const HomePage: React.FC = () => {
    return (
        <div className="homePage">
            {/* <div className="mainLogo"></div> */}
            <div className="details">
                <div className="details_info">
                    <h2>Bar mleczny Miś</h2>
                    <p>Kuźnicza 48</p>
                    <p>50-120</p>
                    <p>Wrocław</p>
                </div>

                <div className="map">
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe
                                width="600"
                                height="500"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=Ku%C5%BAnicza%2048,%2050-120%20Wroc%C5%82aw&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                frameBorder={0}
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
