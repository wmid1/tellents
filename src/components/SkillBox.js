import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setProfCategories,
  selectProfCategories,
  selectSubSkills,
  setQueryTags,
  setTag,
  delTag,
  delSkill,
} from '../actions/actions';
import { takeUser, setUserSkills } from '../api';
import SearchTags from './SearchTags';
import '../styles/styles.css';

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
    firstSkillId: '',
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

  deleteSkill = id => {
    const {
      userInfo: { categories },
      delSkills,
    } = this.props;
    delSkills(id);
    setUserSkills(categories).then(() => {
      this.setState({ step: 0 });
    });
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

  /* Tags */
  deleteTag = skillTag => {
    const {
      props: { delTags },
      state: { firstSkillId },
    } = this;
    delTags(firstSkillId, skillTag);
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
    const { professionCategories } = this.props.userInfo;
    const {
      state: { step, userLoaded, firstSkillId, disabledBtnDone },
      stepChange,
      setSkillOne,
      sendUserSkills,
      choiceFirstSkill,
      choiceSecondSkills,
      deleteTag,
      deleteSkill,
    } = this;

    /* Steps with skills */
    const stepZero = professionCategories.map(
      skill =>
        skill.selected && (
          <div className="skill-subcat skill-subcat--item " key={skill.id}>
            <div className="flexbox justify-space-between">
              <div className="skill-block">
                <div className="skill-block-title ">{skill.name}</div>
                <div className="skill-block-list">
                  {skill.skill_categories.map(
                    addedSkill =>
                      addedSkill.selected && (
                        <div className="checkbox-block" key={addedSkill.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={addedSkill.id}
                            defaultChecked={true}
                            disabled="disabled"
                          />
                          <label htmlFor={addedSkill.id}>
                            <span className="checkbox-circle">
                              <span className="icon icon-check-mark" />
                            </span>
                            <span className="checkbox-text">{addedSkill.name}</span>
                          </label>
                        </div>
                      ),
                  )}
                </div>
              </div>
              <div className="skill-sub-block">
                <div className="skill-block-title ">Skills</div>
                <div className="skill-tags-block clearfix">
                  {skill.skill_tags.map(skillTag => (
                    <div key={skillTag.id} className="skill-tag">
                      {skillTag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="skill-block-footer ">
              <Link to="#" onClick={() => deleteSkill(skill.id)}>
                Delete
              </Link>
              <Link to="#" onClick={() => setSkillOne(skill.id)}>
                Edit
              </Link>
            </div>
          </div>
        ),
    );

    const stepOne = (
      <div>
        <div className="step-one justify-space-between">
          <div className="skill-block skill-cat">
            <div className="skill-block-title">Choose Your Skill Category</div>
            <div className="skill-block-list">
              <form>
                {professionCategories.map(skill => (
                  <div className="checkbox-block" key={skill.id} onClick={() => choiceFirstSkill(skill.id)}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id={skill.id}
                      value={skill.name}
                      defaultChecked={firstSkillId !== '' && true}
                    />
                    <label htmlFor={skill.id}>
                      <span className="checkbox-circle">
                        <span className="icon icon-check-mark" />
                      </span>
                      <span className="checkbox-text"> {skill.name} </span>
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-blue btn-bold btn-next step-2-toggler step-toggler"
          disabled={firstSkillId === ''}
          onClick={setSkillOne}
        >
          Next
        </button>
      </div>
    );

    const stepTwo = professionCategories.map(
      skill =>
        skill.id === firstSkillId && (
          <div className="skill-subcat skill-subcat--item " key={skill.id}>
            <div className="flexbox justify-space-between">
              <div className="skill-block">
                <div className="skill-block-title ">{skill.name}</div>
                <div className="skill-block-list">
                  {skill.skill_categories.map(subSkill => (
                    <div className="checkbox-block" key={subSkill.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="exampleRadios"
                        id={subSkill.id}
                        value={subSkill.selected}
                        onChange={() => choiceSecondSkills(skill.id, subSkill.id, subSkill.selected)}
                        defaultChecked={subSkill.selected && true}
                      />
                      <label htmlFor={subSkill.id}>
                        <span className="checkbox-circle">
                          <span className="icon icon-check-mark" />
                        </span>
                        <span className="checkbox-text"> {subSkill.name} </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="skill-sub-block">
                <form className="form-group">
                  <SearchTags firstSkillId={firstSkillId} />
                </form>
                <div className="skill-tags-block clearfix">
                  {skill.skill_tags.map(skillTag => (
                    <div key={skillTag.id} className="skill-tag">
                      {skillTag.name}
                      <span className="close-tag" onClick={() => deleteTag(skillTag)}>
                        ×
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
    );

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
          {userLoaded && step === 0 && stepZero}
          {step === 1 && stepOne}
          {step === 2 && stepTwo}
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
  delTags: (id, skillTag) => dispatch(delTag(id, skillTag)),
  delSkills: id => dispatch(delSkill(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillBox);
