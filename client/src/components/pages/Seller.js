import React, { Fragment } from "react";
import Vid from "./cover_video.mp4";

const Seller = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //     password2: "",
  //   });

  //   const { email, password } = formData;

  //   const onChange = (e) =>
  //     setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Success");
  };

  return (
    <Fragment>
      <div>
        <div>
          <video
            style={{
              alignItem: "center",
              justifyContent: "center",
              position: "realative",
              zIndex: -1,
              width: "100%",
            }}
            autoPlay="true"
            loop
            muted
            src={Vid}
          />
        </div>
        <section className="container">
          <div>
            <h1 className="large text-primary">Become a Seller!</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Create Your Seller Profile
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input type="text" placeholder="Name" name="name" required />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  required
                />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Contact No"
                    name="contactNo"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Expertise: Illustrator, Photoshop, After Effects or Premere Pro (Type One or more)"
                    name="expertise"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Work Time: (Select Full Time or Part Time)"
                    name="workTime"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="English Knowledge: (Select Begginer, Average or Expert)"
                    name="english"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Exam Date: (Select a Date and Time to Participate for the Examination)"
                    name="exam"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Employed Organizations: (If there is any)"
                    name="employed"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Experience: (Average or Expert)"
                    name="experience"
                    required
                  />
                </div>
                <small className="form-text">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Seller;
