import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Row, Col, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import WizardSteps from "../../components/WizardSteps";

import Layout from "../../hoc/Layout";

import styles from "./index.module.scss";

class WizardProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        {
          name: "Marketing Vietnam Nikon",
          link: "/",
          image: "/assets/images/icon-nikon.png",
        },
        {
          name: "Marketing Vietnam Nikon",
          link: "/",
          image: "/assets/images/icon-nikon.png",
        },
        {
          name: "Marketing Vietnam Nikon",
          link: "/",
          image: "/assets/images/icon-nikon.png",
        },
        {
          name: "Marketing Vietnam Nikon",
          link: "/",
          image: "/assets/images/icon-nikon.png",
        },
        {
          name: "Marketing Vietnam Nikon",
          link: "/",
          image: "/assets/images/icon-nikon.png",
        },
      ],
    };
  }

  render() {
    let { projects } = this.state;

    return (
      <Layout>
        <WizardSteps />
        <div className="bg-white d-flex flex-column m-4 p-4">
          <form>
            <div className="input-group w-25 mx-auto my-5">
              <input
                type="text"
                className="form-control border-end-0"
                placeholder="Search projects"
                id="keyword"
              />
              <button
                type="button"
                id="button-search"
                className="btn btn_search border-1 border-start-0 border-gray text-green px-3"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
          <div className="w-50 mx-auto my-5 py-4">
            <Row className="justify-content-center">
              <Col lg={6} className="mb-4">
                <Link
                  className="border-da-1 p-4 h-100 text-center position-relative d-block text-body text-decoration-none"
                  to={{ pathname: "/wizard", step: 1 }}
                >
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ps-2">Create projects</span>
                  </div>
                </Link>
              </Col>

              {projects.map((value, key) => {
                return (
                  <Col lg={6} className="mb-4">
                    <Link
                      className="shadow-sm p-4 h-100 d-block text-body text-decoration-none"
                      to={{ pathname: "/wizard", step: 2 }}
                    >
                      <Image src={value.image} className="pe-2" height="50" />
                      {value.name}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withTranslation("common")(WizardProjectPage);
