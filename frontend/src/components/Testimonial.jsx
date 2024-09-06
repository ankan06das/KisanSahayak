import ProfilePic from "../assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Testimonial = () => {
  useEffect(() => {
    AOS.init({duration: 1000,delay: 300});
    AOS.refresh();
  }, []);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const TestimonialData = [
    {
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },
    {
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },
    {
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },{
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },{
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },{
      image: ProfilePic,
      review: "Lorem ipsum dolor sit amet consectetur. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "John Doe"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
    ]
  };

  return (
    <div className="work-section-wrapper" data-aos="fade-up" id="testimonial-id">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">Say Something</h1>
        <p className="primary-text">
          Here are some reviews by our service users.
        </p>
      </div>
      <Slider {...settings}>
      {TestimonialData.map((data, _idx) => (
          <div className="testimonial-section-bottom">
            <img src={data.image} alt={_idx} />
            <p>{data.review}</p>
            <div className="testimonials-stars-container">
              {data.stars}
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
        </Slider>
        {/*<img src={ProfilePic} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>*/}
    </div>
  );
};

export default Testimonial;