// import React, { Component, lazy } from 'react';
// import { withTranslation } from 'react-i18next';
// import { Accordion, Tab } from 'bootstrap';

// import '../../../../utils/canva';

// import './index.scss';

// const Facebook = lazy(() => import('./ContentFormDescriptionSocial/facebook'));
// const Twitter = lazy(() => import('./ContentFormDescriptionSocial/twitter'));

// const Youtube = lazy(() => import('./ContentFormDescriptionSocial/youtube'));

// const Wordpress = lazy(() => import('./ContentFormDescriptionCMS/wordpress'));
// const Joomla = lazy(() => import('./ContentFormDescriptionCMS/joomla'));

// const Mailchimp = lazy(() => import('./ContentFormDescriptionMail/mailchimp'));

// class ContentFormDescription extends Component {
//   data = null;

//   constructor(props) {
//     super(props);

//     this.field = this.props.field;
//     this.data = {
//       social: {
//         facebook: {
//           data: '',
//           media: [],
//         },
//         twitter: {
//           data: '',
//           media: [],
//         },
//         youtube: {
//           data: '',
//           media: [],
//         },
//       },
//       cms: {
//         joomla: {
//           data: '',
//           media: [],
//         },
//         wordpress: {
//           data: '',
//           media: [],
//         },
//       },
//       mail: {
//         mailchimp: {
//           data: '',
//           media: [],
//         },
//       },
//     };

//     this.handleChanged = this.handleChanged.bind(this);

//     this.viewModel = props.field.viewModel ? props.field.viewModel : null;

//     console.log('[ContentFormDescription] viewModel', this.viewModel);
//   }

//   handleChanged(value, type) {
//     const data = this.data;

//     Object.keys(data[type]).map((row) => {
//       return (data[type][row] = value);
//     });

//     this.field.changed(data);
//   }

//   renderChannel(value, channel) {
//     const props = {
//       value: value,
//       field: this.field,
//       changed: this.handleChanged,
//     };
//     switch (channel) {
//       case 'facebook':
//         return <Facebook {...props} />;
//       case 'twitter':
//         return <Twitter {...props} />;
//       case 'youtube':
//         return <Youtube {...props} />;
//       case 'joomla':
//         return <Joomla {...props} />;
//       case 'wordpress':
//         return <Wordpress {...props} />;
//       case 'mailchimp':
//         return <Mailchimp {...props} />;
//       default:
//         return null;
//     }
//   }

//   render() {
//     const newArrayConnectChannels = this.viewModel ? this.viewModel.newArrayConnectChannels : null;

//     console.log('[ContentFormDescription] newArrayConnectChannels...', newArrayConnectChannels);

//     const { t } = this.props;
//     console.log('[ContentFormDescription] render...', this.data);

//     return (
//       this.data && (
//         <div className="accordion" id="accordionContentFormDescription">
//           {Object.keys(this.data).map((key, index) => {
//             return (
//               <div className="accordion-item">
//                 <h2 className="accordion-header" id={`heading${key}`}>
//                   <button
//                     className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${key}`}
//                     aria-expanded="true"
//                     aria-controls={`collapse${key}`}
//                   >
//                     {t(`txt_${key}`)}
//                   </button>
//                 </h2>
//                 <div
//                   id={`collapse${key}`}
//                   className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
//                   aria-labelledby={`#heading${key}`}
//                   data-bs-parent="#accordionContentFormDescription"
//                 >
//                   <div className="accordion-body wrapper_tabs">
//                     <ul class="nav nav-tabs" id={`tab${index}`} role="tablist">
//                       {Object.keys(this.data[key]).map((channel, i) => {
//                         return (
//                           <li class="nav-item" role="presentation">
//                             <button
//                               class={`nav-link ${i === 0 ? 'active' : ''}`}
//                               id={`${channel}-tab`}
//                               data-bs-toggle="tab"
//                               data-bs-target={`#${channel}`}
//                               type="button"
//                               role="tab"
//                               aria-controls={`${channel}`}
//                               aria-selected="true"
//                             >
//                               {channel}
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>

//                     <div class="tab-content">
//                       {Object.keys(this.data[key]).map((channel, i) => {
//                         return (
//                           <div
//                             class={`tab-pane ${i === 0 ? 'active' : ''}`}
//                             id={`${channel}`}
//                             role="tabpanel"
//                             aria-labelledby={`${channel}-tab`}
//                           >
//                             {this.renderChannel(this.data[key][channel], channel)}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )
//     );
//   }
// }
// export default withTranslation('common')(ContentFormDescription);

import React, { Component, lazy } from 'react';
import '../../../../utils/canva';

import './index.scss';

class ContentFormDescription extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.viewModel = props.field.viewModel ? props.field.viewModel : null;
  }

  render() {
    return (
      <div>
        <h1>Hello Content Description</h1>
        <textarea
          className="form-control rounded-0 mb-2"
          rows="5"
          // onChange={this.handleChange}
          // onBlur={this.field.blurred}
          // defaultValue={this.value.data}
          ref={this.editorRef}
        />
      </div>
    );
  }
}

export default ContentFormDescription;
