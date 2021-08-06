import React from 'react';
import { withTranslation } from 'react-i18next';
import TitleAccount from '../../components/TitlePageAccount';

import './index.scss';

import Line from '../../components/Line';
import ButtonNormal from '../../components/ButtonNormal';


class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
   
  }

  

  onKeyPress = (e) => {
    if (e.which === 13) {
     
    }
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="row">
        <div className="col-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="d-block">
            <TitleAccount
              title={t('txt_welcome_to_easii')}
              title_below={t('txt_sign_in_to_see_latest_updates')}
            />
            <Line text={t('txt_or_sign_in_with')} />

            <ButtonNormal
              text={t('txt_sign_in')}
              onClick={this.handleSubmit}
              className="w-100 btn-success"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(WelcomePage);
