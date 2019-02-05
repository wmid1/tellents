import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProfCategories, selectProfCategories, selectSubSkills, setQueryTags, setTag } from '../../actions/actions';
import { takeUser, setUserSkills } from '../../api';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import '../../styles/styles.css';

class SkillBox extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
    sendFirstSkill: PropTypes.func,
    selectFirstSkill: PropTypes.func,
    selectSecondSkills: PropTypes.func,
    setTags: PropTypes.func,
    delTags: PropTypes.func,
    delSkills: PropTypes.func,
  };

  state = {
    value: '',
    skillOne: {},
    step: 0,
    userLoaded: false,
    selectedSubSkills: [],
    firstSkillId: 0,
    disabledBtnDone: true,
  };

  /* Change steps */
  stepChange = value => {
    this.setState({ step: this.state.step + value });
  };

  setSkillOne = id => {
    this.setState({ step: 2 });
    if (id > 0) {
      this.setState({ firstSkillId: id });
    }
  };

  /* Skills */
  selectSkill = skill => {
    this.setState({ value: skill.name });
    this.setState({ id: skill.id });
    this.setState({ skillOne: skill });
    this.setState({ selectedSubSkills: skill.skill_categories });
  };

  choiceFirstSkill = id => {
    this.props.selectFirstSkill(this.state.skillOne, id);
    this.setState({ firstSkillId: id });
  };

  choiceSecondSkills = (id, subSkillId, subSelected) => {
    const { selectSecondSkills } = this.props;
    selectSecondSkills(id, subSkillId, subSelected);
    this.setState({ disabledBtnDone: false });
  };

  /* Send skills and tags */
  sendUserSkills = () => {
    const {
      userInfo: { categories },
      sendFirstSkill,
    } = this.props;
    setUserSkills(categories).then(() => {
      this.setState({ step: 0 });
      takeUser().then(response => {
        sendFirstSkill(response.data.profession_categories);
        this.setState({ userLoaded: true });
      });
    });
  };

  componentDidMount() {
    if (localStorage.getItem('auth')) {
      takeUser().then(response => {
        this.props.sendFirstSkill(response.data.profession_categories);
        this.setState({ userLoaded: true });
      });
    }
  }

  render() {
    const {
      state: { step, userLoaded, firstSkillId, disabledBtnDone },
      stepChange,
      setSkillOne,
      sendUserSkills,
      choiceFirstSkill,
      choiceSecondSkills,
    } = this;
    /* Final return */
    return (
      <div className="tab-content my-central-info">
        <div className="tab-pane my-tab step-1-open active" id="skills">
          <div className="steps-nav flexbox justify-space-between">
            <div className="steps-nav-title">Your Shared Skills</div>
            <div className="steps-nav-btn">
              {step !== 0 && (
                <div className="btn-group clearfix">
                  <button type="button" className="btn btn-blue-border btn-bold" onClick={() => stepChange(-1)}>
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={disabledBtnDone}
                    className="btn btn-blue btn-bold"
                    onClick={sendUserSkills}
                  >
                    Done
                  </button>
                </div>
              )}
              {userLoaded && step === 0 && (
                <button type="button" className="btn btn-blue btn-bold" onClick={() => stepChange(1)}>
                  Add
                </button>
              )}
            </div>
          </div>
          {userLoaded && step === 0 && <StepZero setSkillOne={setSkillOne} />}
          {step === 1 && (
            <StepOne choiceFirstSkill={choiceFirstSkill} firstSkillId={firstSkillId} setSkillOne={setSkillOne} />
          )}
          {step === 2 && <StepTwo firstSkillId={firstSkillId} choiceSecondSkills={choiceSecondSkills} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
    userInfo: store.userInfo,
  };
}
const mapDispatchToProps = dispatch => ({
  sendFirstSkill: skill => dispatch(setProfCategories(skill)),
  selectFirstSkill: (skills, id) => dispatch(selectProfCategories(skills, id)),
  selectSecondSkills: (id, subSkillId, subSelected) => dispatch(selectSubSkills(id, subSkillId, subSelected)),
  setTags: tags => dispatch(setQueryTags(tags)),
  selectTag: (id, tag) => dispatch(setTag(id, tag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillBox);
