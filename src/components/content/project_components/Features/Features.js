import React, { Component } from 'react';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import './features.scss';
import Header from '../../../Header/Header';
import { getUId } from '../../../../utils/uid.utils';
import { createProjectFeature, findProjectFeatures, updateProjectFeature, deleteProjectFeature, findProjectFeature } from '../../../../services/project.feature.services';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state={
        features: []
      }

      this.handleAddFeatureButton = this.handleAddFeatureButton.bind(this);
      this.handleChangeFeature = this.handleChangeFeature.bind(this);
      this.handleDeleteFeatureButton= this.handleDeleteFeatureButton.bind(this);
  }

componentWillMount() {
  const projectid = this.props.match.params.projectid || 1;
  const featureExamples = [
    {feature_data: 'example: Force Sensitivity'},
    {feature_data: 'example: Galactic Security'}
  ];

  findProjectFeatures(projectid)
    .then( res => {
      if(res.status !== 200) {
        console.log(res);
      }
      else {
        if(res.data.length > 0) {
          this.setState({ features: res.data });
        }
        else {
          this.setState({ features: featureExamples })
        }
      }
    })
    .catch(err => {throw err});
}

handleAddFeatureButton() {
  const projectid = this.props.match.params.projectid || 1;
  const reqBody = {
    featureData: ''
  }


  createProjectFeature( projectid, reqBody )
      .then(res => {
          if(res.status !== 200) {
            console.log(res);
          } else {
             const newState = this.state.features;
             newState.push(res.data[0]);
             this.setState({ features: newState });
          }
      })
      .catch(err => {throw err});
}

handleChangeFeature(e, index, field) {
  const newState = this.state.features;
  newState[index][field] = e.target.value;
  this.setState({ features: newState });
}

submitChangeFeature(e, index) {
  const projectid = this.props.match.params.projectid;
  const featureid = Number(e.target.id);
  const {feature_data} = this.state.features[index];
  const reqBody = {
    featureData: feature_data
  }

  updateProjectFeature(projectid, featureid, reqBody)
      .then(res => {
          if(res.status !== 200) {
              console.log(res);
          }
      })
      .catch(err => {throw err});
}

handleDeleteFeatureButton(e, index) {
  const projectid = Number(this.props.match.params.projectid);
  const featureid = Number(e.target.id);
  const newState = this.state.features;
  newState.splice(index, 1);
  this.setState({ features: newState });

  deleteProjectFeature(projectid, featureid)
      .then(res => {
          if(res.status !== 200) {
              console.log(res);
          }
      })
      .catch(err => {throw err});
}


  render() {
    const features = this.state.features;

    const displayFeatures = features.map( feature => {
      const index = features.indexOf(feature);
      return(
          <div className="features-item" key={`feature-${index}`}>
              <section>
                  <label>{(index + 1) + '.'}</label>
                  <input id={feature.id} name="feature_data" value={feature.feature_data} onChange={e => this.handleChangeFeature(e, index)}/>
              </section>
              <button id={feature.id} onClick={e => this.submitChangeFeature(e, index)}> Save </button>
              <button className="delete-x" id={feature.id} onClick={e => this.handleDeleteFeatureButton(e, index)}> &times; </button>
          </div>
      );
  });

    return (
      <div>
      <Header />
      <div className="main-fix">
        <ProjectSetupSidebar />
          <div className="features-container">
            <div className="container-wrapper">
                <div className="project-section-header">
                  <label>Features</label> 
                </div>
                    <div className="features-area drop-shadow">
                      <div className="features-wrapper">
                        <div className="features-list">

                          {displayFeatures}

                        </div>
                        <div className="features-footer">
                              <button className="add-button" onClick={this.handleAddFeatureButton}> <span/>  Add Feature </button>
                        </div>
                      </div>
                    </div>

                
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default Features;