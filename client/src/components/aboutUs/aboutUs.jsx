import React, {useEffect} from "react";
import "./aboutUs.css";
import Foto1 from "../../images/Alexis.jpg";
import Foto2 from "../../images/Teo.jpg";
import Foto3 from "../../images/Gaston.jpg";
import Foto4 from "../../images/Ema.jpg";
import Foto5 from "../../images/Enzo.jpg";
import {gsap} from "gsap";
import { useHistory } from "react-router-dom";

export default function AboutUs() {
 
  useEffect(() => {
    const Card = document.querySelector(".container")
    
    gsap.from(Card,{opacity : 0, y:50, duration : 3})
  },[])
  const history = useHistory()

  function handleButtonHome(e) {
    e.preventDefault();
    history.push("/home");
  }
  return (
    <div>
      <div className='container'>
        <div className='card'>
          <img src={Foto1} alt='Alexis Zanotti' className='card__image' />
          <p className='card__name'>Alexis Zanotti</p>
          <div>
            <div className='grid-child-posts'>Full-Stack Developer</div>
          </div>
          <ul className='social-icons'>
            <li>
              <a target='_blank' href='https://www.instagram.com/alexiszanotti/?hl=es'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://www.linkedin.com/in/alexis-zanotti/'>
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://github.com/alexiszanotti'>
                <i className='fa fa-github'></i>
              </a>
            </li>
          </ul>

          <button className='btn draw-border'>
            <a className='contact-link' href='mailto:alexiszanotti@gmail.com'>
              Contact
            </a>
          </button>
        </div>
        <div className='card'>
          <img src={Foto2} alt='Mateo Dellacqua' className='card__image' />
          <p className='card__name'>Mateo Dellacqua</p>
          <div>
            <div className='grid-child-posts'>Full-Stack Developer</div>
          </div>
          <ul className='social-icons'>
            <li>
              <a target='_blank' href='https://www.instagram.com/teodellacqua/'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://www.linkedin.com/in/mateo-dellacqua-castro/'>
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://github.com/teodc888'>
                <i className='fa fa-github'></i>
              </a>
            </li>
          </ul>
          <button className='btn draw-border'>
            <a className='contact-link' href='mailto:teodellacqua8@gmail.com'>
              Contact
            </a>
          </button>
        </div>
        <div className='card'>
          <img src={Foto3} alt='Gaston Digilio' className='card__image' />
          <p className='card__name'>Gaston Digilio</p>
          <div>
            <div className='grid-child-posts'>Full-Stack Developer</div>
          </div>
          <ul className='social-icons'>
            <li>
              <a target='_blank' href='https://www.instagram.com/gastondigilio/'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
            <li>
              <a
                target='_blank'
                href='https://www.linkedin.com/in/gast%C3%B3n-oscar-digilio-488214b7/'
              >
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://github.com/gastondigilio'>
                <i className='fa fa-github'></i>
              </a>
            </li>
          </ul>
          <button className='btn draw-border'>
            <a className='contact-link' href='mailto:gastondigilio@gmail.com'>
              Contact
            </a>
          </button>
        </div>
        <div className='card'>
          <img src={Foto4} alt='Emmanuel Germano' className='card__image' />
          <p className='card__name'>Emanuel Germano</p>
          <div>
            <div className='grid-child-posts'>Full-Stack Developer</div>
          </div>
          <ul className='social-icons'>
            <li>
              <a target='_blank' href='https://www.instagram.com/emanuelgermano90/'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://www.linkedin.com/in/emanuelgermano/'>
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://github.com/emanuelgermano90'>
                <i className='fa fa-github'></i>
              </a>
            </li>
          </ul>
          <button className='btn draw-border'>
            <a className='contact-link' href='mailto:emanuelgermano90@gmail.com'>
              Contact
            </a>
          </button>
        </div>
        <div className='card'>
          <img src={Foto5} alt='Enzo Vazquez' className='card__image' />
          <p className='card__name'>Enzo Vazquez</p>
          <div>
            <div className='grid-child-posts'>Full-Stack Developer</div>
          </div>
          <ul className='social-icons'>
            <li>
              <a target='_blank' href='#'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://www.linkedin.com/in/enzo-vazquez'>
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
            <li>
              <a target='_blank' href='https://github.com/enzo388'>
                <i className='fa fa-github'></i>
              </a>
            </li>
          </ul>
          <button className='btn draw-border'>
            <a className='contact-link' href='mailto:enzo.vazquez.388@gmail.com'>
              Contact
            </a>
          </button>
        </div>
      </div>
      <button onClick={handleButtonHome} className='btn6'>
        Home
      </button>
    </div>
  );
}
