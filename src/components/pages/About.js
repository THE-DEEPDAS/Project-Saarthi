import React from 'react';
import page6Image from './images/page6.png';
import BottomLeftImage from './images/Bottom-left.png';
import BottomRightImage from './images/Bottom-right.png';
import TopImage from './images/top.png';
import readyToWorkImage from './images/Ready to work with us.png';
import './ui/About.css';

const About = () => {
  return (
    <div className='main'>
      {/* Page 1 
      <div className='page1' style={{ backgroundImage: `url(${readyToWorkImage})` }}>
        <div className='page1_maintext'>
          Bridging the gap between students and essential learning resources.
        </div>
      </div>

      */}

      
      {/* Page 2: About Us */}
      <div className='page2'>
        <div className='page2_maintext'>
          About Our Products
        </div>

        <img src={page6Image} className="middleobject" alt="Top Center Object" />

        <div className="page2_boxes">
          <div className="twobox">Highest Quality</div>
          <div className="twobox">Easy on Budget</div>
          <div className="twobox">Does the job</div>
        </div>
      </div>

      {/* Page 4 */}
      <div className='page4'>
        <div className='page4_maintext'>What We've Done</div>
        <div className='page4_boxes'>
          <div className="box-left">
            <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 17.0022C21.999 19.8731 19.9816 22.2726 17.2872 22.8616L16.6492 20.9476C17.8532 20.7511 18.8765 20.0171 19.4649 19H17C15.8954 19 15 18.1046 15 17V13C15 11.8954 15.8954 11 17 11H19.9381C19.446 7.05369 16.0796 4 12 4C7.92038 4 4.55399 7.05369 4.06189 11H7C8.10457 11 9 11.8954 9 13V17C9 18.1046 8.10457 19 7 19H4C2.89543 19 2 18.1046 2 17V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V12.9987V13V17V17.0013V17.0022Z"></path></svg>
            </div>
            <div className='num'>
              234
            </div>
            <div className='text'>
            Customers served
            </div>
          </div>
          <div className="box-stack">
            <div className="box">
              <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                      <path d="M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z"></path>
                  </svg>
              </div>
              <div className='num'>
                234
              </div>
              <div className='text'>
                Products sold
              </div>
            </div>
            <div className="box">
              <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11H1L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11H20V20ZM12 17L15.3588 13.6412C16.2374 12.7625 16.2374 11.3379 15.3588 10.4592C14.4801 9.58056 13.0555 9.58056 12.1768 10.4592L12 10.636L11.8232 10.4592C10.9445 9.58056 9.51992 9.58056 8.64124 10.4592C7.76256 11.3379 7.76256 12.7625 8.64124 13.6412L12 17Z"></path></svg>
              </div>
              <div className='num'>
                234
              </div>
              <div className='text'>
                Households Improved
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: What We've Done */}
      
      <div class="page5">
          <div class="page5_maintext">Revolutionizing education by bridging the gap between students and essential learning resources.</div>
          <img src={BottomLeftImage} className="corner-object object-bottom-left" alt="Bottom Left Object" />
          <img src={BottomRightImage} className="corner-object object-bottom-right" alt="Bottom Right Object" />
          <img src={TopImage} className="corner-object object-top-center" alt="Top Center Object" />

      </div>
      
      
      



    </div>
  );
};

export default About;
